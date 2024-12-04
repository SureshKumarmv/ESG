import { MigrationInterface, QueryRunner } from "typeorm"

export class EstimationMethodResult1724815206048 implements MigrationInterface {
    name = "EstimationMethodResult1724815206048"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "results" ADD "area" numeric(50,10)`)
        await queryRunner.query(`ALTER TABLE "results" ADD "year" integer`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "year"`)
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "area"`)
    }
}
