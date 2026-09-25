// In-memory store with optional file persistence (file works locally; memory works on Vercel)
// For real production scale, replace with Postgres / Supabase.

import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const globalStore = globalThis as unknown as {
  __churnguard_store?: Map<string, unknown>;
};

if (!globalStore.__churnguard_store) {
  globalStore.__churnguard_store = new Map();
}

const mem = globalStore.__churnguard_store;

function canUseFs() {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    return true;
  } catch {
    return false;
  }
}

function filePath(name: string) {
  return path.join(DATA_DIR, `${name}.json`);
}

export function readJSON<T>(name: string, fallback: T): T {
  if (mem.has(name)) return mem.get(name) as T;
  try {
    if (canUseFs() && fs.existsSync(filePath(name))) {
      const data = JSON.parse(fs.readFileSync(filePath(name), "utf-8")) as T;
      mem.set(name, data);
      return data;
    }
  } catch {
    // ignore
  }
  return fallback;
}

export function writeJSON(name: string, data: unknown) {
  mem.set(name, data);
  try {
    if (canUseFs()) {
      fs.writeFileSync(filePath(name), JSON.stringify(data, null, 2));
    }
  } catch {
    // Vercel serverless filesystem may be read-only — memory still works for the instance
  }
}

export type Member = {
  id: string;
  companyId: string;
  membershipId?: string;
  status: "active" | "canceled" | "past_due";
  joinedAt: string;
  healthScore: number;
  lastActivityAt: string;
  onboardingCompleted: boolean;
};

export type SequenceStep = {
  delayHours: number;
  type: "dm" | "email" | "note";
  content: string;
};

export type CompanySettings = {
  companyId: string;
  onboardingEnabled: boolean;
  sequence: SequenceStep[];
  healthThreshold: number;
  createdAt: string;
};

const DEFAULT_SEQUENCE: SequenceStep[] = [
  {
    delayHours: 0,
    type: "dm",
    content:
      "Welcome to the community! 👋 We're glad you're here. Reply if you need any help getting started.",
  },
  {
    delayHours: 24,
    type: "dm",
    content:
      "Day 1 tip: Check out the pinned posts and introduce yourself so others can welcome you.",
  },
  {
    delayHours: 72,
    type: "dm",
    content:
      "How are you finding everything so far? Let us know if something is confusing — we're here to help.",
  },
  {
    delayHours: 168,
    type: "dm",
    content:
      "You've been here a week! Any feedback or questions? We want to make sure you're getting value.",
  },
];

export function getOrCreateSettings(companyId: string): CompanySettings {
  const all = readJSON<Record<string, CompanySettings>>("settings", {});
  if (!all[companyId]) {
    all[companyId] = {
      companyId,
      onboardingEnabled: true,
      sequence: DEFAULT_SEQUENCE,
      healthThreshold: 40,
      createdAt: new Date().toISOString(),
    };
    writeJSON("settings", all);
  }
  return all[companyId];
}

export function upsertMember(member: Member) {
  const all = readJSON<Record<string, Member>>("members", {});
  all[`${member.companyId}:${member.id}`] = member;
  writeJSON("members", all);
}

export function getMember(companyId: string, userId: string): Member | null {
  const all = readJSON<Record<string, Member>>("members", {});
  return all[`${companyId}:${userId}`] || null;
}

export function getMembersByCompany(companyId: string): Member[] {
  const all = readJSON<Record<string, Member>>("members", {});
  return Object.values(all).filter((m) => m.companyId === companyId);
}

export function logEvent(event: { type: string; data: Record<string, unknown>; at?: string }) {
  const logs = readJSON<Array<{ type: string; data: Record<string, unknown>; at: string }>>(
    "events",
    []
  );
  logs.unshift({ ...event, at: event.at || new Date().toISOString() });
  writeJSON("events", logs.slice(0, 500));
}