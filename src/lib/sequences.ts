import { getOrCreateSettings, upsertMember, logEvent, type Member } from "./store";
import { sendSequenceStep } from "./messaging";

export async function startOnboarding(params: {
  userId: string;
  companyId: string;
  membershipId?: string;
}) {
  const { userId, companyId, membershipId } = params;
  const settings = getOrCreateSettings(companyId);

  if (!settings.onboardingEnabled) {
    logEvent({ type: "onboarding_skipped", data: { userId, companyId, reason: "disabled" } });
    return;
  }

  const member: Member = {
    id: userId,
    companyId,
    membershipId,
    status: "active",
    joinedAt: new Date().toISOString(),
    healthScore: 80,
    lastActivityAt: new Date().toISOString(),
    onboardingCompleted: false,
  };

  upsertMember(member);
  logEvent({ type: "member_joined", data: { userId, companyId, membershipId } });

  console.log(`[ChurnGuard] Onboarding started for user ${userId} in company ${companyId}`);

  for (const [i, step] of settings.sequence.entries()) {
    if (step.delayHours === 0) {
      await sendSequenceStep({
        userId,
        companyId,
        type: step.type,
        content: step.content,
      });
    } else {
      console.log(`  Step ${i + 1}: scheduled in ${step.delayHours}h → ${step.type}`);
      logEvent({
        type: "sequence_step_scheduled",
        data: { userId, companyId, stepIndex: i, delayHours: step.delayHours, type: step.type },
      });
    }
  }

  logEvent({
    type: "onboarding_planned",
    data: { userId, companyId, steps: settings.sequence.length },
  });
}

export async function markMemberLeft(params: { userId: string; companyId: string }) {
  const { userId, companyId } = params;
  logEvent({ type: "member_left", data: { userId, companyId } });
  console.log(`[ChurnGuard] Member left: ${userId} from ${companyId}`);
}