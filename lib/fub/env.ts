import { FollowUpBossClient } from "./client";

/** Follow Up Boss API key (Vercel: FOLLOW_UP_BOSS_API_KEY). */
export function getFollowUpBossApiKey(): string {
  return (
    process.env.FOLLOW_UP_BOSS_API_KEY?.trim() ||
    process.env.FUB_API_KEY?.trim() ||
    ""
  );
}

export function getFollowUpBossSystemKey(): string | undefined {
  const key = process.env.FUB_SYSTEM_KEY?.trim();
  return key || undefined;
}

export const FUB_SYSTEM_NAME = "DrJanDuffyWebsite";

export function createFollowUpBossClient(): FollowUpBossClient {
  const apiKey = getFollowUpBossApiKey();
  if (!apiKey) {
    throw new Error("Missing FOLLOW_UP_BOSS_API_KEY / FUB_API_KEY");
  }
  return new FollowUpBossClient({
    apiKey,
    systemKey: getFollowUpBossSystemKey(),
  });
}
