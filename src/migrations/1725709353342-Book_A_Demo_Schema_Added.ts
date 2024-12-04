import { MigrationInterface, QueryRunner } from "typeorm"

export class BookADemoSchemaAdded1725709353342 implements MigrationInterface {
    name = "BookADemoSchemaAdded1725709353342"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "demo_submissions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "first_name" character varying(50) NOT NULL, "last_name" character varying(50) NOT NULL, "company" character varying(50) NOT NULL, "email" character varying(100) NOT NULL, "designation" character varying NOT NULL, "phone_country_code" character varying(5) NOT NULL, "phone_number" character varying NOT NULL, CONSTRAINT "UQ_ea448f4aaf70ae68ee3d0c636ad" UNIQUE ("email"), CONSTRAINT "PK_3d98cbbc7f81f2a8952749c9a8a" PRIMARY KEY ("id"))`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "demo_submissions"`)
    }
}
