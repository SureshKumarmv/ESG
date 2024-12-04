import { MigrationInterface, QueryRunner } from "typeorm"

export class UsernameField1726385896775 implements MigrationInterface {
    name = "UsernameField1726385896775"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "subsidiary" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying(500) NOT NULL, "subsidiary_slug" character varying(500), "business_operation" character varying(500), "incorporation_date" date, "ownership_percentage" integer NOT NULL, "parent_id" uuid, CONSTRAINT "UQ_d02789785f43bcee024d32e60a1" UNIQUE ("subsidiary_slug"), CONSTRAINT "PK_fa9258079144978ccfcb18e32a8" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `CREATE TABLE "organization" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying(500) NOT NULL, "organization_slug" character varying(500), "organization_legal_name" character varying(255) NOT NULL, "organization_abbreviated_name" character varying(255) NOT NULL, "country" character varying(255) NOT NULL, "headquarter_state" character varying(255) NOT NULL, "headquarter_address" character varying(255) NOT NULL, "headquarter_address_line_1" character varying(255) NOT NULL, "headquarter_address_line_2" character varying(255) NOT NULL, "industry_type" character varying(255) NOT NULL, "worker_type" character varying(255) NOT NULL, "ownership_nature" character varying(255) NOT NULL, "total_employees" integer NOT NULL, "website" character varying(255), "linkedin" character varying(255), CONSTRAINT "UQ_5c0d43ae0a55b580eb31d696a87" UNIQUE ("organization_slug"), CONSTRAINT "PK_472c1f99a32def1b0abb219cd67" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `ALTER TABLE "demo_submissions" ADD "credentials_generated" boolean DEFAULT false`,
        )
        await queryRunner.query(`ALTER TABLE "user" ADD "username" character varying(50) NOT NULL`)
        await queryRunner.query(
            `ALTER TABLE "user" ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username")`,
        )
        await queryRunner.query(`ALTER TABLE "user" ADD "organization_id" uuid`)
        await queryRunner.query(`ALTER TABLE "user" ADD "subsidiary_id" uuid`)
        await queryRunner.query(
            `ALTER TYPE "public"."user_role_enum" RENAME TO "user_role_enum_old"`,
        )
        await queryRunner.query(
            `CREATE TYPE "public"."user_role_enum" AS ENUM('envistide', 'superadmin', 'admin', 'fac_admin', 'user')`,
        )
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" DROP DEFAULT`)
        await queryRunner.query(
            `ALTER TABLE "user" ALTER COLUMN "role" TYPE "public"."user_role_enum" USING "role"::"text"::"public"."user_role_enum"`,
        )
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'user'`)
        await queryRunner.query(`DROP TYPE "public"."user_role_enum_old"`)
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "email" DROP NOT NULL`)
        await queryRunner.query(
            `ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`,
        )
        await queryRunner.query(
            `ALTER TABLE "subsidiary" ADD CONSTRAINT "FK_f9f87d1163f4e0caf26b6205986" FOREIGN KEY ("parent_id") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
        await queryRunner.query(
            `ALTER TABLE "user" ADD CONSTRAINT "FK_3e103cdf85b7d6cb620b4db0f0c" FOREIGN KEY ("organization_id") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
        await queryRunner.query(
            `ALTER TABLE "user" ADD CONSTRAINT "FK_a7b48190c6dd876ca4e52586195" FOREIGN KEY ("subsidiary_id") REFERENCES "subsidiary"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "user" DROP CONSTRAINT "FK_a7b48190c6dd876ca4e52586195"`,
        )
        await queryRunner.query(
            `ALTER TABLE "user" DROP CONSTRAINT "FK_3e103cdf85b7d6cb620b4db0f0c"`,
        )
        await queryRunner.query(
            `ALTER TABLE "subsidiary" DROP CONSTRAINT "FK_f9f87d1163f4e0caf26b6205986"`,
        )
        await queryRunner.query(
            `ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`,
        )
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "email" SET NOT NULL`)
        await queryRunner.query(
            `CREATE TYPE "public"."user_role_enum_old" AS ENUM('superadmin', 'admin', 'user')`,
        )
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" DROP DEFAULT`)
        await queryRunner.query(
            `ALTER TABLE "user" ALTER COLUMN "role" TYPE "public"."user_role_enum_old" USING "role"::"text"::"public"."user_role_enum_old"`,
        )
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'user'`)
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`)
        await queryRunner.query(
            `ALTER TYPE "public"."user_role_enum_old" RENAME TO "user_role_enum"`,
        )
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "subsidiary_id"`)
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "organization_id"`)
        await queryRunner.query(
            `ALTER TABLE "user" DROP CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb"`,
        )
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username"`)
        await queryRunner.query(
            `ALTER TABLE "demo_submissions" DROP COLUMN "credentials_generated"`,
        )
        await queryRunner.query(`DROP TABLE "organization"`)
        await queryRunner.query(`DROP TABLE "subsidiary"`)
    }
}
