import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { startOnboarding, markMemberLeft } from "@/lib/sequences";

function verifySignature(payload: string, signature: string | null, secret: string): boolean {
  if (!signature) return false;
  try {
    const expected = crypto.createHmac("sha256", secret).update(payload).digest("hex");
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-whop-signature") || req.headers.get("whop-signature");
    const webhookSecret = process.env.WHOP_WEBHOOK_SECRET;

    if (process.env.NODE_ENV === "production") {
      if (!webhookSecret || !verifySignature(rawBody, signature, webhookSecret)) {
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
      }
    }

    const event = JSON.parse(rawBody);
    const eventType = event.type || event.event || event.action;
    console.log("[ChurnGuard] Webhook:", eventType);

    switch (eventType) {
      case "membership.went_valid":
      case "membership.activated": {
        const membership = event.data?.membership || event.membership || event.data || {};
        const userId = membership.user_id || membership.user?.id || membership.userId;
        const companyId = membership.company_id || membership.company?.id || membership.companyId || membership.account_id;
        const membershipId = membership.id || membership.membership_id;
        if (userId && companyId) {
          await startOnboarding({ userId, companyId, membershipId });
        }
        break;
      }
      case "membership.went_invalid":
      case "membership.canceled":
      case "membership.deactivated": {
        const membership = event.data?.membership || event.membership || event.data || {};
        const userId = membership.user_id || membership.user?.id || membership.userId;
        const companyId = membership.company_id || membership.company?.id || membership.companyId || membership.account_id;
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