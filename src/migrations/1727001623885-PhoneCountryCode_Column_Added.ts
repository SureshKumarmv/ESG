import { MigrationInterface, QueryRunner } from "typeorm"

export class PhoneCountryCodeColumnAdded1727001623885 implements MigrationInterface {
    name = "PhoneCountryCodeColumnAdded1727001623885"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "facility" ADD "phone_country_code" character varying(255)`,
        )
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "service"`)
        await queryRunner.query(`ALTER TABLE "organization" ADD "service" text`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "service"`)
        await queryRunner.query(`ALTER TABLE "organization" ADD "service" jsonb`)
        await queryRunner.query(`ALTER TABLE "facility" DROP COLUMN "phone_country_code"`)
    }
}
