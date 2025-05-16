import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { eq } from 'drizzle-orm';
import { members } from './schema';
import memberList from './initialmembers.json' assert { type: 'json' };

async function main() {
  const db = drizzle({
    connection: {
      url: process.env.TURSO_DATABASE_URL!,
      authToken: process.env.TURSO_AUTH_TOKEN!,
    },
  });

  for (const m of memberList) {
    await db
      .update(members)
      .set({
        firstName: m.firstName,
        lastName: m.lastName,
        guildRank: m.guildRank ?? null,
        contactScroll: m.contactScroll,
        race: m.race,
        class: m.class,
        level: m.level ?? 1,
        kills: m.kills ?? 0,
        title: m.title ?? null,
        pronouns: Array.isArray(m.pronouns) ? JSON.stringify(m.pronouns) : '[]',
        avatarUrl: m.avatarUrl ?? null,
        profileBannerUrl: m.profileBannerUrl ?? null,
        bio: m.bio ?? null,
        // Do not update joinDate or lastActive unless you want to overwrite them
      })
      .where(eq(members.memberId, m.memberId));
  }

  console.log(`Updated ${memberList.length} members.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
