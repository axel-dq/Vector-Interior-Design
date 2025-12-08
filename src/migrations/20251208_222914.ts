import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_payload_folders_folder_type" AS ENUM('media');
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_folders_folder_type" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_payload_folders_folder_type",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  ALTER TABLE "_main_page_images_v_blocks_animated_text_locales" DROP CONSTRAINT "_main_page_images_v_blocks_animated_text_locales_parent_id_fk";
  
  DROP INDEX "project_blocks_image_group_images_locales_locale_parent_id_unique";
  DROP INDEX "_project_v_blocks_image_group_images_locales_locale_parent_id_unique";
  DROP INDEX "_project_v_blocks_animated_text_locales_locale_parent_id_unique";
  DROP INDEX "main_page_images_blocks_image_locales_locale_parent_id_unique";
  DROP INDEX "main_page_images_blocks_about_us_locales_locale_parent_id_unique";
  DROP INDEX "main_page_images_blocks_animated_text_locales_locale_parent_id_unique";
  DROP INDEX "_main_page_images_v_blocks_image_locales_locale_parent_id_unique";
  DROP INDEX "_main_page_images_v_blocks_about_us_locales_locale_parent_id_unique";
  DROP INDEX "_main_page_images_v_blocks_animated_text_locales_locale_parent_id_unique";
  DROP INDEX "sculpture_blocks_sculpture_group_locales_locale_parent_id_unique";
  DROP INDEX "_sculpture_v_blocks_sculpture_locales_locale_parent_id_unique";
  DROP INDEX "_sculpture_v_blocks_sculpture_group_locales_locale_parent_id_unique";
  ALTER TABLE "payload_folders_folder_type" ADD CONSTRAINT "payload_folders_folder_type_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_folders"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_folders_folder_type_order_idx" ON "payload_folders_folder_type" USING btree ("order");
  CREATE INDEX "payload_folders_folder_type_parent_idx" ON "payload_folders_folder_type" USING btree ("parent_id");
  ALTER TABLE "_main_page_images_v_blocks_animated_text_locales" ADD CONSTRAINT "_main_page_images_v_blocks_animated_text_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_main_page_images_v_blocks_animated_text"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "project_blocks_image_group_images_locales_locale_parent_id_u" ON "project_blocks_image_group_images_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_project_v_blocks_image_group_images_locales_locale_parent_i" ON "_project_v_blocks_image_group_images_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_project_v_blocks_animated_text_locales_locale_parent_id_uni" ON "_project_v_blocks_animated_text_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "main_page_images_blocks_image_locales_locale_parent_id_uniqu" ON "main_page_images_blocks_image_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "main_page_images_blocks_about_us_locales_locale_parent_id_un" ON "main_page_images_blocks_about_us_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "main_page_images_blocks_animated_text_locales_locale_parent_" ON "main_page_images_blocks_animated_text_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_main_page_images_v_blocks_image_locales_locale_parent_id_un" ON "_main_page_images_v_blocks_image_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_main_page_images_v_blocks_about_us_locales_locale_parent_id" ON "_main_page_images_v_blocks_about_us_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_main_page_images_v_blocks_animated_text_locales_locale_pare" ON "_main_page_images_v_blocks_animated_text_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "sculpture_blocks_sculpture_group_locales_locale_parent_id_un" ON "sculpture_blocks_sculpture_group_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_sculpture_v_blocks_sculpture_locales_locale_parent_id_uniqu" ON "_sculpture_v_blocks_sculpture_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_sculpture_v_blocks_sculpture_group_locales_locale_parent_id" ON "_sculpture_v_blocks_sculpture_group_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload_kv" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_folders_folder_type" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_folders_folder_type" CASCADE;
  ALTER TABLE "_main_page_images_v_blocks_animated_text_locales" DROP CONSTRAINT "_main_page_images_v_blocks_animated_text_locales_parent_i_fk";
  
  DROP INDEX "project_blocks_image_group_images_locales_locale_parent_id_u";
  DROP INDEX "_project_v_blocks_image_group_images_locales_locale_parent_i";
  DROP INDEX "_project_v_blocks_animated_text_locales_locale_parent_id_uni";
  DROP INDEX "main_page_images_blocks_image_locales_locale_parent_id_uniqu";
  DROP INDEX "main_page_images_blocks_about_us_locales_locale_parent_id_un";
  DROP INDEX "main_page_images_blocks_animated_text_locales_locale_parent_";
  DROP INDEX "_main_page_images_v_blocks_image_locales_locale_parent_id_un";
  DROP INDEX "_main_page_images_v_blocks_about_us_locales_locale_parent_id";
  DROP INDEX "_main_page_images_v_blocks_animated_text_locales_locale_pare";
  DROP INDEX "sculpture_blocks_sculpture_group_locales_locale_parent_id_un";
  DROP INDEX "_sculpture_v_blocks_sculpture_locales_locale_parent_id_uniqu";
  DROP INDEX "_sculpture_v_blocks_sculpture_group_locales_locale_parent_id";
  ALTER TABLE "_main_page_images_v_blocks_animated_text_locales" ADD CONSTRAINT "_main_page_images_v_blocks_animated_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_main_page_images_v_blocks_animated_text"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "project_blocks_image_group_images_locales_locale_parent_id_unique" ON "project_blocks_image_group_images_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_project_v_blocks_image_group_images_locales_locale_parent_id_unique" ON "_project_v_blocks_image_group_images_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_project_v_blocks_animated_text_locales_locale_parent_id_unique" ON "_project_v_blocks_animated_text_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "main_page_images_blocks_image_locales_locale_parent_id_unique" ON "main_page_images_blocks_image_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "main_page_images_blocks_about_us_locales_locale_parent_id_unique" ON "main_page_images_blocks_about_us_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "main_page_images_blocks_animated_text_locales_locale_parent_id_unique" ON "main_page_images_blocks_animated_text_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_main_page_images_v_blocks_image_locales_locale_parent_id_unique" ON "_main_page_images_v_blocks_image_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_main_page_images_v_blocks_about_us_locales_locale_parent_id_unique" ON "_main_page_images_v_blocks_about_us_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_main_page_images_v_blocks_animated_text_locales_locale_parent_id_unique" ON "_main_page_images_v_blocks_animated_text_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "sculpture_blocks_sculpture_group_locales_locale_parent_id_unique" ON "sculpture_blocks_sculpture_group_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_sculpture_v_blocks_sculpture_locales_locale_parent_id_unique" ON "_sculpture_v_blocks_sculpture_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_sculpture_v_blocks_sculpture_group_locales_locale_parent_id_unique" ON "_sculpture_v_blocks_sculpture_group_locales" USING btree ("_locale","_parent_id");
  DROP TYPE "public"."enum_payload_folders_folder_type";`)
}
