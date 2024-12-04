import { MigrationInterface, QueryRunner } from "typeorm"

export class OrganizationSchemaUpdated_1726506516201 implements MigrationInterface {
    name = "OrganizationSchemaUpdated_1726506516201"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organization" ADD "business_address" text`)
        await queryRunner.query(`ALTER TABLE "organization" ADD "billing_address" text`)
        await queryRunner.query(`ALTER TABLE "organization" ADD "contact" text`)
        await queryRunner.query(`ALTER TABLE "organization" ADD "service" text`)
        await queryRunner.query(
            `ALTER TABLE "organization" ALTER COLUMN "organization_abbreviated_name" DROP NOT NULL`,
        )
        await queryRunner.query(`ALTER TABLE "organization" ALTER COLUMN "country" DROP NOT NULL`)
        await queryRunner.query(
            `ALTER TABLE "organization" ALTER COLUMN "headquarter_state" DROP NOT NULL`,
        )
        await queryRunner.query(
            `ALTER TABLE "organization" ALTER COLUMN "headquarter_address" DROP NOT NULL`,
        )
        await queryRunner.query(
            `ALTER TABLE "organization" ALTER COLUMN "headquarter_address_line_1" DROP NOT NULL`,
        )
        await queryRunner.query(
            `ALTER TABLE "organization" ALTER COLUMN "headquarter_address_line_2" DROP NOT NULL`,
        )
        await queryRunner.query(
            `ALTER TABLE "organization" ALTER COLUMN "industry_type" DROP NOT NULL`,
        )
        await queryRunner.query(
            `ALTER TABLE "organization" ALTER COLUMN "worker_type" DROP NOT NULL`,
        )
        await queryRunner.query(
            `ALTER TABLE "organization" ALTER COLUMN "ownership_nature" DROP NOT NULL`,
        )
        await queryRunner.query(
            `ALTER TABLE "organization" ALTER COLUMN "total_employees" DROP NOT NULL`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "organization" ALTER COLUMN "total_employees" SET NOT NULL`,
        )
        await queryRunner.query(
            `ALTER TABLE "organization" ALTER COLUMN "ownership_nature" SET NOT NULL`,
        )
        await queryRunner.query(
            `ALTER TABLE "organization" ALTER COLUMN "worker_type" SET NOT NULL`,
        )
        await queryRunner.query(
            `ALTER TABLE "organization" ALTER COLUMN "industry_type" SET NOT NULL`,
        )
        await queryRunner.query(
            `ALTER TABLE "organization" ALTER COLUMN "headquarter_address_line_2" SET NOT NULL`,
        )
        await queryRunner.query(
            `ALTER TABLE "organization" ALTER COLUMN "headquarter_address_line_1" SET NOT NULL`,
        )
        await queryRunner.query(
            `ALTER TABLE "organization" ALTER COLUMN "headquarter_address" SET NOT NULL`,
        )
        await queryRunner.query(
            `ALTER TABLE "organization" ALTER COLUMN "headquarter_state" SET NOT NULL`,
        )
        await queryRunner.query(`ALTER TABLE "organization" ALTER COLUMN "country" SET NOT NULL`)
        await queryRunner.query(
            `ALTER TABLE "organization" ALTER COLUMN "organization_abbreviated_name" SET NOT NULL`,
        )
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "service"`)
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "contact"`)
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "billing_address"`)
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "business_address"`)
    }
}
