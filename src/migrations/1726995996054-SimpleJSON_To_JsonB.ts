import { MigrationInterface, QueryRunner } from "typeorm"

export class SimpleJSONToJsonB1726995996054 implements MigrationInterface {
    name = "SimpleJSONToJsonB1726995996054"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "business_address"`)
        await queryRunner.query(`ALTER TABLE "organization" ADD "business_address" jsonb`)
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "billing_address"`)
        await queryRunner.query(`ALTER TABLE "organization" ADD "billing_address" jsonb`)
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "contact"`)
        await queryRunner.query(`ALTER TABLE "organization" ADD "contact" jsonb`)
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "service"`)
        await queryRunner.query(`ALTER TABLE "organization" ADD "service" jsonb`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "service"`)
        await queryRunner.query(`ALTER TABLE "organization" ADD "service" text`)
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "contact"`)
        await queryRunner.query(`ALTER TABLE "organization" ADD "contact" text`)
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "billing_address"`)
        await queryRunner.query(`ALTER TABLE "organization" ADD "billing_address" text`)
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "business_address"`)
        await queryRunner.query(`ALTER TABLE "organization" ADD "business_address" text`)
    }
}
