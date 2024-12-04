import { MigrationInterface, QueryRunner } from "typeorm"

export class FacilitySchema1726990379387 implements MigrationInterface {
    name = "FacilitySchema1726990379387"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "facility" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying(500) NOT NULL, "facility_slug" character varying(500), "country" character varying(255), "state" character varying(255), "address" character varying(255), "phone" character varying(255), "contact_person" character varying(255), "contact_person_email" character varying(255), "address_line_1" character varying(255), "address_line_2" character varying(255), "calculate_esg" boolean DEFAULT false, "parent_id" uuid, CONSTRAINT "UQ_2e2dcb51a63a72826829a060d78" UNIQUE ("facility_slug"), CONSTRAINT "PK_07c6c82781d105a680b5c265be6" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `ALTER TABLE "subsidiary" ADD "calculate_esg" boolean DEFAULT false`,
        )
        await queryRunner.query(`ALTER TABLE "user" ADD "facility_id" uuid`)
        await queryRunner.query(
            `ALTER TABLE "facility" ADD CONSTRAINT "FK_5f0f2e3e5176391b7f3ebffa2d1" FOREIGN KEY ("parent_id") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
        await queryRunner.query(
            `ALTER TABLE "user" ADD CONSTRAINT "FK_1462295d0650df0f1ca78416a34" FOREIGN KEY ("facility_id") REFERENCES "facility"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "user" DROP CONSTRAINT "FK_1462295d0650df0f1ca78416a34"`,
        )
        await queryRunner.query(
            `ALTER TABLE "facility" DROP CONSTRAINT "FK_5f0f2e3e5176391b7f3ebffa2d1"`,
        )
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "facility_id"`)
        await queryRunner.query(`ALTER TABLE "subsidiary" DROP COLUMN "calculate_esg"`)
        await queryRunner.query(`DROP TABLE "facility"`)
    }
}
