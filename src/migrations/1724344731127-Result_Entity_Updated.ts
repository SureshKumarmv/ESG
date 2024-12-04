import { MigrationInterface, QueryRunner } from "typeorm"

export class ResultEntityUpdated1724344731127 implements MigrationInterface {
    name = "ResultEntityUpdated1724344731127"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "results" ADD "installation_refrigerant_used" numeric(50,10)`,
        )
        await queryRunner.query(
            `ALTER TABLE "results" ADD "installation_refrigerant_used_retrofit" numeric(50,10)`,
        )
        await queryRunner.query(
            `ALTER TABLE "results" ADD "installation_equipment_using_refrigerant" numeric(50,10)`,
        )
        await queryRunner.query(
            `ALTER TABLE "results" ADD "installation_equipment_using_refrigerant_retrofit" numeric(50,10)`,
        )
        await queryRunner.query(
            `ALTER TABLE "results" ADD "installation_total_emission" numeric(50,10)`,
        )
        await queryRunner.query(
            `ALTER TABLE "results" ADD "use_emission_recycling_recharge" numeric(50,10)`,
        )
        await queryRunner.query(
            `ALTER TABLE "results" ADD "final_sold_other_entities" numeric(50,10)`,
        )
        await queryRunner.query(
            `ALTER TABLE "results" ADD "final_use_different_refrigerant" numeric(50,10)`,
        )
        await queryRunner.query(
            `ALTER TABLE "results" ADD "final_use_retering_equipment" numeric(50,10)`,
        )
        await queryRunner.query(
            `ALTER TABLE "results" ADD "final_use_different_refrigerant_other" numeric(50,10)`,
        )
        await queryRunner.query(`ALTER TABLE "results" ADD "final_use_total" numeric(50,10)`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "final_use_total"`)
        await queryRunner.query(
            `ALTER TABLE "results" DROP COLUMN "final_use_different_refrigerant_other"`,
        )
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "final_use_retering_equipment"`)
        await queryRunner.query(
            `ALTER TABLE "results" DROP COLUMN "final_use_different_refrigerant"`,
        )
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "final_sold_other_entities"`)
        await queryRunner.query(
            `ALTER TABLE "results" DROP COLUMN "use_emission_recycling_recharge"`,
        )
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "installation_total_emission"`)
        await queryRunner.query(
            `ALTER TABLE "results" DROP COLUMN "installation_equipment_using_refrigerant_retrofit"`,
        )
        await queryRunner.query(
            `ALTER TABLE "results" DROP COLUMN "installation_equipment_using_refrigerant"`,
        )
        await queryRunner.query(
            `ALTER TABLE "results" DROP COLUMN "installation_refrigerant_used_retrofit"`,
        )
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "installation_refrigerant_used"`)
    }
}
