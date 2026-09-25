import { NextRequest, NextResponse } from "next/server";
import { runHealthCheck } from "@/lib/interventions";

/**
 * Manual / scheduled health-score pass.
 * POST { "companyId": "biz_xxx" }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const companyId = body.companyId as string | undefined;
    if (!companyId) {
      return NextResponse.json(
        { error: "companyId is required" },
        { status: 400 }
      );
    }
    const result = await runHealthCheck(companyId);
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    console.error("[ChurnGuard] health-check error:", error);
    return NextResponse.json({ error: "Health check failed" }, { status: 500 });
  }
}