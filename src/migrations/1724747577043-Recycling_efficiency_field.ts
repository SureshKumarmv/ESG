import { MigrationInterface, QueryRunner } from "typeorm"

export class RecyclingEfficiencyField1724747577043 implements MigrationInterface {
    name = "RecyclingEfficiencyField1724747577043"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "results" RENAME COLUMN "time_since_recycling_efficiency" TO "recycling_efficiency"`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "results" RENAME COLUMN "recycling_efficiency" TO "time_since_recycling_efficiency"`,
        )
    }
}
