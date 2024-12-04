import { MigrationInterface, QueryRunner } from "typeorm"

export class JSONBToSimple1726996446787 implements MigrationInterface {
    name = "JSONBToSimple1726996446787"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "business_address"`)
        await queryRunner.query(`ALTER TABLE "organization" ADD "business_address" text`)
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "billing_address"`)
        await queryRunner.query(`ALTER TABLE "organization" ADD "billing_address" text`)
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "contact"`)
        await queryRunner.query(`ALTER TABLE "organization" ADD "contact" text`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "contact"`)
        await queryRunner.query(`ALTER TABLE "organization" ADD "contact" jsonb`)
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "billing_address"`)
        await queryRunner.query(`ALTER TABLE "organization" ADD "billing_address" jsonb`)
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "business_address"`)
        await queryRunner.query(`ALTER TABLE "organization" ADD "business_address" jsonb`)
    }
}
