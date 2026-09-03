import { Router } from "express";

import authMiddleware from "../../middleware/auth.middleware.js";
import { requirePermission } from "../../middleware/authorize.middleware.js";
import * as dashboardController from "./dashboard.controller.js";

const router = Router();

router.get(
  "/summary",
  authMiddleware,
  requirePermission({ callLogs: ["read"] }),
  dashboardController.getDashboardSummary
);

export default router;
