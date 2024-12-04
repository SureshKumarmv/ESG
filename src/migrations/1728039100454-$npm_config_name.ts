import { MigrationInterface, QueryRunner } from "typeorm"

export class $npmConfigName1728039100454 implements MigrationInterface {
    name = " $npmConfigName1728039100454"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "industry_type"`)
        await queryRunner.query(`ALTER TABLE "organization" ADD "industry_type" jsonb`)
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "employment_type"`)
        await queryRunner.query(`ALTER TABLE "organization" ADD "employment_type" jsonb`)
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "ownership_nature"`)
        await queryRunner.query(`ALTER TABLE "organization" ADD "ownership_nature" jsonb`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "ownership_nature"`)
        await queryRunner.query(
            `ALTER TABLE "organization" ADD "ownership_nature" character varying(255)`,
        )
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "employment_type"`)
        await queryRunner.query(
            `ALTER TABLE "organization" ADD "employment_type" character varying(255)`,
        )
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "industry_type"`)
        await queryRunner.query(
            `ALTER TABLE "organization" ADD "industry_type" character varying(255)`,
        )
    }
}
