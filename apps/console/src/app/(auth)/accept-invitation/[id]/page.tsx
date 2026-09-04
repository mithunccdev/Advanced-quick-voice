"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Building2, CheckCircle2, AlertCircle, Loader2, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";
import { authClient } from "@/src/lib/auth-client";
import Logo1 from "@/src/components/logo1";
import { LANDING_URL } from "@/src/lib/links";

export default function AcceptInvitationPage() {
  const params = useParams();
  const router = useRouter();
  const invitationId = params?.id as string;

  const { data: session, isPending: isSessionLoading } = authClient.useSession();
  const [accepting, setAccepting] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleAccept = async () => {
    if (!invitationId) return;
    setAccepting(true);
    setErrorMsg(null);

    try {
      const { error } = await authClient.organization.acceptInvitation({
        invitationId,
      });

      if (error) {
        setErrorMsg(error.message || "Failed to accept invitation. It may have expired or been revoked.");
        toast.error(error.message || "Failed to accept invitation.");
        return;
      }

      setAccepted(true);
      toast.success("Successfully joined the organization!");
      setTimeout(() => {
        router.push("/agents");
      }, 1500);
    } catch (err: any) {
      setErrorMsg(err?.message || "An unexpected error occurred.");
      toast.error(err?.message || "Failed to accept invitation.");
    } finally {
      setAccepting(false);
    }
  };

  const handleReject = async () => {
    if (!invitationId) return;
    try {
      await authClient.organization.rejectInvitation({
        invitationId,
      });
      toast.info("Invitation declined.");
      router.push("/agents");
    } catch {
      router.push("/agents");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-muted/20">
      <div className="mb-6">
        <Link href={LANDING_URL} className="flex items-center gap-2">
          <Logo1 />
        </Link>
      </div>

      <Card className="w-full max-w-md shadow-lg border">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Building2 className="size-6" />
          </div>
          <CardTitle className="text-xl font-bold">Organization Invitation</CardTitle>
          <CardDescription>
            You have been invited to collaborate with a team on QuickVoice.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {accepted ? (
            <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-4 text-center space-y-2">
              <CheckCircle2 className="size-8 text-emerald-600 mx-auto" />
              <p className="font-semibold text-emerald-800 dark:text-emerald-300">Invitation Accepted!</p>
              <p className="text-xs text-muted-foreground">Redirecting to your workspace...</p>
            </div>
          ) : errorMsg ? (
            <div className="rounded-lg bg-destructive/10 border border-destructive/30 p-4 text-center space-y-2">
              <AlertCircle className="size-8 text-destructive mx-auto" />
              <p className="font-semibold text-destructive">Invitation Error</p>
              <p className="text-xs text-muted-foreground">{errorMsg}</p>
            </div>
          ) : isSessionLoading ? (
            <div className="flex items-center justify-center py-6 text-sm text-muted-foreground gap-2">
              <Loader2 className="size-4 animate-spin" />
              Checking your account...
            </div>
          ) : !session ? (
            <div className="space-y-4 text-center">
              <div className="rounded-lg bg-blue-500/10 border border-blue-500/20 p-3 text-xs text-blue-800 dark:text-blue-300 text-left flex gap-2">
                <ShieldCheck className="size-4 shrink-0 mt-0.5" />
                <span>Please log in or create an account with your invited email address to accept this invitation.</span>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Button variant="outline" asChild>
                  <Link href={`/login?callbackURL=/accept-invitation/${invitationId}`}>
                    Log In
                  </Link>
                </Button>
                <Button asChild>
                  <Link href={`/register?callbackURL=/accept-invitation/${invitationId}`}>
                    Register
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3 text-sm">
              <div className="rounded-lg border bg-muted/40 p-3 text-xs space-y-1">
                <p className="text-muted-foreground">Logged in as:</p>
                <p className="font-semibold text-foreground">{session.user.email}</p>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Click below to accept this invitation and access team agents, tools, and call logs.
              </p>
            </div>
          )}
        </CardContent>

        {session && !accepted && !errorMsg && (
          <CardFooter className="flex flex-col sm:flex-row gap-2 pt-2">
            <Button
              variant="outline"
              onClick={handleReject}
              disabled={accepting}
              className="w-full sm:w-1/2 text-xs"
            >
              Decline
            </Button>
            <Button
              onClick={handleAccept}
              disabled={accepting}
              className="w-full sm:w-1/2 text-xs gap-1.5"
            >
              {accepting ? (
                <>
                  <Loader2 className="size-3.5 animate-spin" />
                  Accepting...
                </>
              ) : (
                <>
                  Accept Invite
                  <ArrowRight className="size-3.5" />
                </>
              )}
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
