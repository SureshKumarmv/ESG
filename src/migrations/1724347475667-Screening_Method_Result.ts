import { MigrationInterface, QueryRunner } from "typeorm"

export class ScreeningMethodResult1724347475667 implements MigrationInterface {
    name = "ScreeningMethodResult1724347475667"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "results" ADD "total_units" numeric(50,10)`)
        await queryRunner.query(`ALTER TABLE "results" ADD "refrigerant_charge" numeric(50,10)`)
        await queryRunner.query(`ALTER TABLE "results" ADD "installation_factor" numeric(50,10)`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "installation_factor"`)
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "refrigerant_charge"`)
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "total_units"`)
    }
}
