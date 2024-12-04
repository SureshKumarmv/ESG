import { MigrationInterface, QueryRunner } from "typeorm"

export class ResultEntityUpdated1724483397379 implements MigrationInterface {
    name = "ResultEntityUpdated1724483397379"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "results" ADD "annual_leakage_rate" numeric(50,10)`)
        await queryRunner.query(
            `ALTER TABLE "results" ADD "time_since_recharge_years" numeric(50,10)`,
        )
        await queryRunner.query(
            `ALTER TABLE "results" ADD "time_since_recycling_efficiency" numeric(50,10)`,
        )
        await queryRunner.query(`ALTER TABLE "results" ADD "destruction" numeric(50,10)`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "destruction"`)
        await queryRunner.query(
            `ALTER TABLE "results" DROP COLUMN "time_since_recycling_efficiency"`,
        )
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "time_since_recharge_years"`)
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "annual_leakage_rate"`)
    }
}
