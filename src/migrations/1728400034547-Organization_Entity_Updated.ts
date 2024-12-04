import { MigrationInterface, QueryRunner } from "typeorm"

export class OrganizationEntityUpdated1728400034547 implements MigrationInterface {
    name = "OrganizationEntityUpdated1728400034547"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "organization" ADD "corporate_identity_number" character varying(255)`,
        )
        await queryRunner.query(
            `ALTER TABLE "organization" ADD "year_of_incorporation" character varying(255)`,
        )
        await queryRunner.query(`ALTER TABLE "organization" ADD "currency" character varying(255)`)
        await queryRunner.query(
            `ALTER TABLE "organization" ADD "paid_up_capital" character varying(255)`,
        )
        await queryRunner.query(
            `ALTER TABLE "organization" ADD "financial_year_start" character varying(255)`,
        )
        await queryRunner.query(
            `ALTER TABLE "organization" ADD "financial_year_end" character varying(255)`,
        )
        await queryRunner.query(
            `ALTER TABLE "organization" ADD "stocks_share" character varying(255)`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "stocks_share"`)
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "financial_year_end"`)
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "financial_year_start"`)
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "paid_up_capital"`)
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "currency"`)
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "year_of_incorporation"`)
        await queryRunner.query(
            `ALTER TABLE "organization" DROP COLUMN "corporate_identity_number"`,
        )
    }
}
