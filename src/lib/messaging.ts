import { logEvent } from "./store";

export type OutboundMessage = {
  toUserId: string;
  companyId: string;
  channel: "dm" | "email" | "chat";
  content: string;
  scheduledFor?: string;
};

export async function queueMessage(msg: OutboundMessage) {
  logEvent({
    type: "message_queued",
    data: {
      toUserId: msg.toUserId,
      companyId: msg.companyId,
      channel: msg.channel,
      contentPreview: msg.content.slice(0, 100),
      scheduledFor: msg.scheduledFor || "immediate",
    },
  });
  console.log(`[ChurnGuard] Message queued → ${msg.channel} to ${msg.toUserId}`);
}

export async function sendSequenceStep(params: {
  userId: string;
  companyId: string;
  type: "dm" | "email" | "note";
  content: string;
}) {
  if (params.type === "note") {
    logEvent({
      type: "internal_note",
      data: { userId: params.userId, companyId: params.companyId, content: params.content },
    });
    return;
  }
  await queueMessage({
    toUserId: params.userId,
    companyId: params.companyId,
    channel: params.type,
    content: params.content,
  });
}