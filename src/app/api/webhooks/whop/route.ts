import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { startOnboarding, markMemberLeft } from "@/lib/sequences";

function verifySignature(
  payload: string,
  signature: string | null,
  secret: string
): boolean {
  if (!signature || !secret) return false;
  try {
    const expected = crypto.createHmac("sha256", secret).update(payload).digest("hex");
    // timingSafeEqual throws if lengths differ — handle that safely
    const a = Buffer.from(signature);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return false;
    return crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

function extractMembership(event: Record<string, unknown>) {
  const data = (event.data as Record<string, unknown>) || {};
  const membership =
    (data.membership as Record<string, unknown>) ||
    (event.membership as Record<string, unknown>) ||
    data ||
    {};
  const user =
    (membership.user as Record<string, unknown>) ||
    (data.user as Record<string, unknown>) ||
    {};
  const company =
    (membership.company as Record<string, unknown>) ||
    (data.company as Record<string, unknown>) ||
    {};

  const userId =
    (membership.user_id as string) ||
    (user.id as string) ||
    (membership.userId as string);
  const companyId =
    (membership.company_id as string) ||
    (company.id as string) ||
    (membership.companyId as string) ||
    (membership.account_id as string) ||
    (data.company_id as string);
  const membershipId =
    (membership.id as string) || (membership.membership_id as string);

  return { userId, companyId, membershipId };
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature =
      req.headers.get("x-whop-signature") || req.headers.get("whop-signature");
    const webhookSecret = process.env.WHOP_WEBHOOK_SECRET;

    if (process.env.NODE_ENV === "production") {
      if (!webhookSecret || !verifySignature(rawBody, signature, webhookSecret)) {
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
      }
    }

    const event = JSON.parse(rawBody) as Record<string, unknown>;
    const eventType =
      (event.type as string) ||
      (event.event as string) ||
      (event.action as string);

    console.log("[ChurnGuard] Webhook:", eventType);

    switch (eventType) {
      case "membership.went_valid":
      case "membership.activated":
      case "membership_activated": {
        const { userId, companyId, membershipId } = extractMembership(event);
        if (userId && companyId) {
          await startOnboarding({ userId, companyId, membershipId });
        } else {
          console.warn("[ChurnGuard] Missing userId/companyId on join event", event);
        }
        break;
      }
      case "membership.went_invalid":
      case "membership.canceled":
      case "membership.deactivated":
      case "membership_deactivated": {
        const { userId, companyId } = extractMembership(event);
        if (userId && companyId) {
          await markMemberLeft({ userId, companyId });
        }
        break;
      }
      default:
        console.log("[ChurnGuard] Unhandled event:", eventType);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("[ChurnGuard] Webhook error:", error);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}