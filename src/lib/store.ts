// Simple file-based store for MVP (replace with Postgres in production)
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function getFile(name: string) {
  ensureDir();
  return path.join(DATA_DIR, `${name}.json`);
}

export function readJSON<T>(name: string, fallback: T): T {
  try {
    const file = getFile(name);
    if (!fs.existsSync(file)) return fallback;
    return JSON.parse(fs.readFileSync(file, "utf-8")) as T;
  } catch {
    return fallback;
  }
}

export function writeJSON(name: string, data: any) {
  ensureDir();
  fs.writeFileSync(getFile(name), JSON.stringify(data, null, 2));
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
  { delayHours: 0, type: "dm", content: "Welcome to the community! 👋 We're glad you're here. Reply if you need any help getting started." },
  { delayHours: 24, type: "dm", content: "Day 1 tip: Check out the pinned posts and introduce yourself so others can welcome you." },
  { delayHours: 72, type: "dm", content: "How are you finding everything so far? Let us know if something is confusing — we're here to help." },
  { delayHours: 168, type: "dm", content: "You've been here a week! Any feedback or questions? We want to make sure you're getting value." },
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

export function getMembersByCompany(companyId: string): Member[] {
  const all = readJSON<Record<string, Member>>("members", {});
  return Object.values(all).filter((m) => m.companyId === companyId);
}

export function logEvent(event: { type: string; data: any; at?: string }) {
  const logs = readJSON<any[]>("events", []);
  logs.unshift({ ...event, at: event.at || new Date().toISOString() });
  writeJSON("events", logs.slice(0, 500));
}