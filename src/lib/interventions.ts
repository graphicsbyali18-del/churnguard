import { getOrCreateSettings, upsertMember, logEvent, getMembersByCompany, type Member } from "./store";

export function calculateHealthScore(member: Member): number {
  const now = Date.now();
  const lastActivity = new Date(member.lastActivityAt).getTime();
  const daysSinceActivity = (now - lastActivity) / (1000 * 60 * 60 * 24);

  let score = 80;
  if (daysSinceActivity > 14) score -= 40;
  else if (daysSinceActivity > 7) score -= 25;
  else if (daysSinceActivity > 3) score -= 10;
  if (member.onboardingCompleted) score += 10;
  if (member.status === "canceled") score = Math.min(score, 20);
  return Math.max(0, Math.min(100, Math.round(score)));
}

export async function runHealthCheck(companyId: string) {
  const settings = getOrCreateSettings(companyId);
  const members = getMembersByCompany(companyId);
  const threshold = settings.healthThreshold || 40;
  let intervened = 0;

  for (const member of members) {
    if (member.status !== "active") continue;
    const newScore = calculateHealthScore(member);
    const previousScore = member.healthScore;
    member.healthScore = newScore;
    upsertMember(member);
    if (previousScore >= threshold && newScore < threshold) {
      await triggerReEngagement(member, companyId);
      intervened++;
    }
  }

  logEvent({ type: "health_check_run", data: { companyId, checked: members.length, intervened } });
  return { checked: members.length, intervened };
}

export async function triggerReEngagement(member: Member, companyId: string) {
  const message = `Hey! We noticed you haven't been around much lately. Is everything okay? We're here if you need help getting more value from the community. Just reply to this message.`;
  logEvent({
    type: "reengagement_triggered",
    data: { userId: member.id, companyId, healthScore: member.healthScore, messagePreview: message.slice(0, 80) },
  });
  console.log(`[ChurnGuard] Re-engagement triggered for ${member.id} (score: ${member.healthScore})`);
}

export function recordActivity(userId: string, companyId: string) {
  const members = getMembersByCompany(companyId);
  const member = members.find((m) => m.id === userId);
  if (!member) return;
  member.lastActivityAt = new Date().toISOString();
  member.healthScore = calculateHealthScore(member);
  upsertMember(member);
  logEvent({ type: "activity_recorded", data: { userId, companyId, newScore: member.healthScore } });
}