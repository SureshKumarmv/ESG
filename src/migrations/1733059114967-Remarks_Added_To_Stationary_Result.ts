import { MigrationInterface, QueryRunner } from "typeorm"

export class RemarksAddedToStationaryResult1733059114967 implements MigrationInterface {
    name = "RemarksAddedToStationaryResult1733059114967"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stationary_defra_result" ADD "year" integer`)
        await queryRunner.query(
            `ALTER TABLE "stationary_defra_result" ADD "remarks" character varying`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stationary_defra_result" DROP COLUMN "remarks"`)
        await queryRunner.query(`ALTER TABLE "stationary_defra_result" DROP COLUMN "year"`)
    }
}
