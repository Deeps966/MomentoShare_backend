CREATE TABLE "user" (
  "id" BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "email" varchar(255) NOT NULL,
  "mobile" integer NOT NULL,
  "first_name" varchar(20) NOT NULL,
  "last_name" varchar(20),
  "gender" varchar(20) NOT NULL,
  "username" varchar(50) UNIQUE NOT NULL,
  "password" varchar(20) NOT NULL,
  "image" varchar(255),
  "acc_active" Boolean DEFAULT true,
  "is_reported" Boolean DEFAULT false,
  "is_blocked" Boolean DEFAULT false,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "group" (
  "id" BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "created_by" bigint NOT NULL,
  "updated_by" bigint NOT NULL,
  "name" varchar(50) NOT NULL,
  "description" varchar(255),
  "image" varchar(255),
  "group_type" varchar(20) NOT NULL,
  "members_count" integer NOT NULL DEFAULT 1,
  "invite_code" varchar(50),
  "anyone_can_join" Boolean DEFAULT false,
  "anyone_can_change" Boolean DEFAULT false,
  "hide_delete_folder" Boolean DEFAULT false,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "group_role" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "name" varchar(20) UNIQUE NOT NULL,
  "type" varchar(20) UNIQUE NOT NULL
);

CREATE TABLE "group_member" (
  "id" BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "group_id" bigint NOT NULL,
  "user_id" bigint NOT NULL,
  "role_id" integer NOT NULL,
  "joined_at" timestamp DEFAULT (now()),
  "group_left" Boolean DEFAULT false,
  "notification_type" varchar(20)
);

CREATE TABLE "group_post" (
  "id" BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "group_id" bigint NOT NULL,
  "user_id" bigint NOT NULL,
  "image_url" varchar(255) UNIQUE NOT NULL,
  "image_filetype" varchar(20),
  "image_size" integer
);

COMMENT ON COLUMN "group"."image" IS 'varchar(255) for Mysql,Base64 String';

COMMENT ON COLUMN "group"."group_type" IS 'Public: Members can see ALL Photos,
Private: Members can only see their OWN photos ';

COMMENT ON COLUMN "group"."invite_code" IS 'Group Code for Invite';

COMMENT ON COLUMN "group"."anyone_can_join" IS 'Anyone with link can join';

COMMENT ON COLUMN "group"."anyone_can_change" IS 'Anyone can change Name and Icon';

COMMENT ON COLUMN "group"."hide_delete_folder" IS 'Hide deleted images and videos folder';

COMMENT ON COLUMN "group_member"."group_left" IS 'Acitve, Left';

COMMENT ON COLUMN "group_member"."notification_type" IS 'Mute, UnMute';

ALTER TABLE "group" ADD FOREIGN KEY ("created_by") REFERENCES "user" ("id");

ALTER TABLE "group" ADD FOREIGN KEY ("updated_by") REFERENCES "user" ("id");

ALTER TABLE "group_member" ADD FOREIGN KEY ("group_id") REFERENCES "group" ("id");

ALTER TABLE "group_member" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "group_member" ADD FOREIGN KEY ("role_id") REFERENCES "group_role" ("id");

ALTER TABLE "group_post" ADD FOREIGN KEY ("group_id") REFERENCES "group" ("id");

ALTER TABLE "group_post" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");
