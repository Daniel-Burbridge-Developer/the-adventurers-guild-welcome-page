import {
  int,
  sqliteTable,
  text,
  integer,
  unique,
} from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

// Define the members table
export const members = sqliteTable('Members', {
  memberId: int('member_id').primaryKey({ autoIncrement: true }),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  inviteStatus: text('invite_status', {
    enum: [
      'invited', // Invited, awaiting response
      'requested', // Requested to join, awaiting approval
      'approved', // Request approved (joined via request)
      'accepted', // Invite accepted (joined via invite)
      'declined', // Invite declined
      'rejected', // Request rejected
      'pending', // General pending state
    ],
  })
    .notNull()
    .default('pending'),
  inviteSentAt: integer('invite_sent_at'), // Timestamp when invite was sent
  inviteRespondedAt: integer('invite_responded_at'), // Timestamp when invite was responded to
  guildRank: text('guild_rank'),
  contactScroll: text('contact_scroll').unique(),
  race: text('race').notNull(),
  class: text('class').notNull(),
  level: integer('level').default(1),
  kills: integer('kills').default(0),
  title: text('title'),
  pronouns: text('pronouns').default(sql`'[]'`),
  avatarUrl: text('avatar_url'),
  profileBannerUrl: text('profile_banner_url'),
  bio: text('bio'),
  lastActive: integer('last_active').default(Date.now()), // Store as integer (ms since epoch)
});

// Define the achievements table
export const achievements = sqliteTable('Achievements', {
  achievementId: int('achievement_id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  description: text('description').notNull(),
  imageUrl: text('image_url'), // URL to an image representing the achievement
});

// Define the join table for members and their achievements
export const memberAchievements = sqliteTable(
  'MemberAchievements',
  {
    memberId: integer('member_id')
      .notNull()
      .references(() => members.memberId),
    achievementId: integer('achievement_id')
      .notNull()
      .references(() => achievements.achievementId),
    dateEarned: integer('date_earned').default(Date.now()), // Store as integer (ms since epoch)
  },
  (table) => ({
    uniqueMemberAchievement: unique().on(table.memberId, table.achievementId),
  })
);
