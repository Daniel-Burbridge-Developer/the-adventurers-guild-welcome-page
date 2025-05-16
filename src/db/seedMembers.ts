import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { members } from './schema';
import memberList from './initialmembers.json' assert { type: 'json' };

async function main() {
  const db = drizzle({
    connection: {
      url: process.env.TURSO_DATABASE_URL!,
      authToken: process.env.TURSO_AUTH_TOKEN!,
    },
  });

  // Prepare the data for bulk insert
  const rows = memberList.map((m) => ({
    memberId: m.memberId,
    name: m.name,
    guildRank: m.guildRank ?? null,
    contactScroll: m.contactScroll,
    race: m.race,
    class: m.class,
    level: m.level ?? 1,
    kills: m.kills ?? 0,
    title: m.title ?? null,
    pronouns: Array.isArray(m.pronouns) ? m.pronouns.join(',') : null,
    avatarUrl: m.avatarUrl ?? null,
    profileBannerUrl: m.profileBannerUrl ?? null,
    bio: m.bio ?? null,
    location: null, // Not present in JSON
    joinDate: undefined, // Use DB default
    lastActive: undefined, // Use DB default
  }));

  // Bulk insert
  await db.insert(members).values(rows);

  console.log(`Inserted ${rows.length} members.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
