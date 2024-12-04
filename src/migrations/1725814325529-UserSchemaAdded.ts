import { MigrationInterface, QueryRunner } from "typeorm"

export class UserSchemaAdded1725814325529 implements MigrationInterface {
    name = "UserSchemaAdded1725814325529"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TYPE "public"."user_role_enum" AS ENUM('superadmin', 'admin', 'user')`,
        )
        await queryRunner.query(
            `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "role" "public"."user_role_enum" NOT NULL DEFAULT 'user', "first_name" character varying(50) NOT NULL, "last_name" character varying(50) NOT NULL, "email" character varying(100) NOT NULL, "password" character varying(100) NOT NULL, "phone_country_code" character varying(5) NOT NULL, "phone_number" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `ALTER TABLE "demo_submissions" ADD CONSTRAINT "UQ_46ac7d0aa93279c2c5059b63947" UNIQUE ("company_slug")`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "demo_submissions" DROP CONSTRAINT "UQ_46ac7d0aa93279c2c5059b63947"`,
        )
        await queryRunner.query(`DROP TABLE "user"`)
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`)
    }
}
