import type { PhoneNumberPurchase } from "../../../prisma/generated/prisma/client.js";
import { TelephonyProvider } from "../../../prisma/generated/prisma/client.js";
import formatPhoneNumber from "../../common/utils/formatPhoneNumber.js";
import { telnyxClient } from "../../config/telnyx.js";
import { twilioClient } from "../../config/twilio.js";
import {
  VOBIZ_AUTH_ID,
  vobizAccountPath,
  vobizFetch,
} from "../../config/vobiz.js";
import { isProviderNotFoundError } from "./provider-error.js";

export type ProviderPurchaseResult =
  | {
      state: "acquired";
      resourceId: string;
      orderId?: string;
      friendlyName: string;
    }
  | {
      state: "pending";
      resourceId?: string;
      orderId?: string;
      friendlyName?: string;
    }
  | {
      state: "failed";
      orderId?: string;
      errorCode: string;
      errorMessage: string;
    };

export interface NumberPurchaseProviderGateway {
  recover(
    purchase: PhoneNumberPurchase,
  ): Promise<ProviderPurchaseResult | null>;
  purchase(purchase: PhoneNumberPurchase): Promise<ProviderPurchaseResult>;
}

type TelnyxOrder = {
  id?: string;
  customer_reference?: string;
  status?: "pending" | "success" | "failure";
  phone_numbers?: Array<{
    id?: string;
    phone_number?: string;
    status?: string;
  }>;
};

const customerReference = (nonce: string) =>
  `quickvoice-number-purchase:${nonce}`;

const twilioFriendlyReference = (nonce: string) =>
  `QuickVoice purchase ${nonce}`;

function telnyxOrderResult(
  order: TelnyxOrder,
  phoneNumber: string,
): ProviderPurchaseResult {
  const orderedNumber = order.phone_numbers?.find(
    (candidate) => candidate.phone_number === phoneNumber,
  );

  if (order.status === "failure" || orderedNumber?.status === "failure") {
    return {
      state: "failed",
      orderId: order.id,
      errorCode: "TELNYX_ORDER_FAILED",
      errorMessage: "Telnyx could not complete the phone number order",
    };
  }

  if (
    order.status === "pending" ||
    orderedNumber?.status === "pending" ||
    !orderedNumber?.id
  ) {
    return {
      state: "pending",
      orderId: order.id,
      resourceId: orderedNumber?.id,
      friendlyName: formatPhoneNumber(phoneNumber),
    };
  }

  return {
    state: "acquired",
    orderId: order.id,
    resourceId: orderedNumber.id,
    friendlyName: formatPhoneNumber(phoneNumber),
  };
}

async function recoverTwilio(
  purchase: PhoneNumberPurchase,
): Promise<ProviderPurchaseResult | null> {
  const matches = await twilioClient.incomingPhoneNumbers.list({
    phoneNumber: purchase.phoneNumber,
    limit: 2,
  });
  const exact = matches.find(
    (candidate) =>
      candidate.phoneNumber === purchase.phoneNumber &&
      candidate.friendlyName === twilioFriendlyReference(purchase.quoteNonce),
  );
  return exact
    ? {
        state: "acquired",
        resourceId: exact.sid,
        friendlyName: exact.friendlyName ?? purchase.phoneNumber,
      }
    : null;
}

async function findTelnyxOrder(
  purchase: PhoneNumberPurchase,
): Promise<TelnyxOrder | null> {
  if (purchase.providerOrderId) {
    try {
      const response = await telnyxClient.numberOrders.retrieve(
        purchase.providerOrderId,
      );
      if (
        response.data?.customer_reference ===
        customerReference(purchase.quoteNonce)
      ) {
        return response.data;
      }
    } catch (error) {
      if (!isProviderNotFoundError(error)) throw error;
    }
  }

  const response = await telnyxClient.numberOrders.list({
    filter: { customer_reference: customerReference(purchase.quoteNonce) },
    "page[size]": 2,
  });
  return (
    response.data.find(
      (candidate) =>
        candidate.customer_reference === customerReference(purchase.quoteNonce),
    ) ?? null
  );
}

async function recoverTelnyx(
  purchase: PhoneNumberPurchase,
): Promise<ProviderPurchaseResult | null> {
  const order = await findTelnyxOrder(purchase);
  if (order) {
    const orderResult = telnyxOrderResult(order, purchase.phoneNumber);
    if (orderResult.state !== "pending") return orderResult;
  }

  const response = await telnyxClient.phoneNumbers.list({
    filter: { phone_number: purchase.phoneNumber },
    "page[size]": 2,
  });
  const exact = response.data.find(
    (candidate) =>
      candidate.phone_number === purchase.phoneNumber &&
      (candidate.customer_reference ===
        customerReference(purchase.quoteNonce) ||
        order?.phone_numbers?.some(
          (ordered) => ordered.phone_number === purchase.phoneNumber,
        )),
  );
  if (exact?.status === "purchase-failed" || exact?.status === "deleted") {
    return {
      state: "failed",
      orderId: order?.id,
      errorCode: "TELNYX_ORDER_FAILED",
      errorMessage: "Telnyx could not complete the phone number order",
    };
  }
  if (exact?.status === "purchase-pending") {
    return {
      state: "pending",
      orderId: order?.id,
      resourceId: exact.id,
      friendlyName: formatPhoneNumber(purchase.phoneNumber),
    };
  }
  if (exact) {
    return {
      state: "acquired",
      orderId: order?.id,
      resourceId: exact.id,
      friendlyName: formatPhoneNumber(purchase.phoneNumber),
    };
  }
  return order ? telnyxOrderResult(order, purchase.phoneNumber) : null;
}

// ── Vobiz ────────────────────────────────────────────────────────────────────

type VobizNumber = {
  number?: string;
  did?: string;
  alias?: string;
  status?: string;
};

async function recoverVobiz(
  purchase: PhoneNumberPurchase,
): Promise<ProviderPurchaseResult | null> {
  if (!VOBIZ_AUTH_ID) return null;
  try {
    const base = vobizAccountPath();
    const owned = await vobizFetch<{ objects?: VobizNumber[] }>(
      `${base}/numbers?number=${encodeURIComponent(purchase.phoneNumber)}&limit=2`,
    );
    const exact = owned.objects?.find(
      (n) =>
        (n.number ?? n.did ?? "") === purchase.phoneNumber,
    );
    if (exact) {
      return {
        state: "acquired",
        resourceId: purchase.phoneNumber,
        friendlyName:
          exact.alias ?? formatPhoneNumber(purchase.phoneNumber),
      };
    }
  } catch {
    // Number not found — fall through to null so the saga retries purchase
  }
  return null;
}

async function purchaseVobiz(
  purchaseRecord: PhoneNumberPurchase,
): Promise<ProviderPurchaseResult> {
  if (!VOBIZ_AUTH_ID) {
    return {
      state: "failed",
      errorCode: "VOBIZ_NOT_CONFIGURED",
      errorMessage:
        "VOBIZ_AUTH_ID / VOBIZ_AUTH_TOKEN environment variables are not set",
    };
  }

  const base = vobizAccountPath();

  // First verify the number is in Vobiz inventory
  const inventory = await vobizFetch<{ objects?: VobizNumber[] }>(
    `${base}/inventory/numbers?number=${encodeURIComponent(purchaseRecord.phoneNumber)}&limit=2`,
  );
  const inventoryMatch = inventory.objects?.find(
    (n) => (n.number ?? n.did ?? "") === purchaseRecord.phoneNumber,
  );
  if (!inventoryMatch) {
    return {
      state: "failed",
      errorCode: "VOBIZ_NUMBER_NOT_IN_INVENTORY",
      errorMessage: `Phone number ${purchaseRecord.phoneNumber} not found in Vobiz inventory`,
    };
  }

  // Purchase the number
  await vobizFetch<unknown>(`${base}/numbers/purchase-from-inventory`, {
    method: "POST",
    body: JSON.stringify({
      numbers: [{ number: purchaseRecord.phoneNumber }],
    }),
  });

  return {
    state: "acquired",
    resourceId: purchaseRecord.phoneNumber,
    friendlyName: formatPhoneNumber(purchaseRecord.phoneNumber),
  };
}

// ── Provider switch ───────────────────────────────────────────────────────────

async function recover(
  purchase: PhoneNumberPurchase,
): Promise<ProviderPurchaseResult | null> {
  if (purchase.provider === TelephonyProvider.TWILIO) {
    return recoverTwilio(purchase);
  }
  if (purchase.provider === TelephonyProvider.VOBIZ) {
    return recoverVobiz(purchase);
  }
  return recoverTelnyx(purchase);
}

async function purchase(
  purchaseRecord: PhoneNumberPurchase,
): Promise<ProviderPurchaseResult> {
  if (purchaseRecord.provider === TelephonyProvider.TWILIO) {
    const purchased = await twilioClient.incomingPhoneNumbers.create({
      phoneNumber: purchaseRecord.phoneNumber,
      friendlyName: twilioFriendlyReference(purchaseRecord.quoteNonce),
    });
    return {
      state: "acquired",
      resourceId: purchased.sid,
      friendlyName: formatPhoneNumber(purchaseRecord.phoneNumber),
    };
  }

  if (purchaseRecord.provider === TelephonyProvider.VOBIZ) {
    return purchaseVobiz(purchaseRecord);
  }

  const reference = customerReference(purchaseRecord.quoteNonce);
  const order = await telnyxClient.numberOrders.create(
    {
      customer_reference: reference,
      phone_numbers: [{ phone_number: purchaseRecord.phoneNumber }],
    },
    // The customer reference makes the operation discoverable after an
    // ambiguous response; the request key additionally lets Telnyx collapse
    // retries when supported by the endpoint.
    { idempotencyKey: reference },
  );
  if (!order.data) {
    return {
      state: "pending",
      friendlyName: formatPhoneNumber(purchaseRecord.phoneNumber),
    };
  }
  return telnyxOrderResult(order.data, purchaseRecord.phoneNumber);
}

export const numberPurchaseProviderGateway: NumberPurchaseProviderGateway = {
  recover,
  purchase,
};
