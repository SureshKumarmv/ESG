import { MigrationInterface, QueryRunner } from "typeorm"

export class GhgEquipmentAdded1724816264088 implements MigrationInterface {
    name = "GhgEquipmentAdded1724816264088"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "results" ADD "ghgEquipmentId" uuid`)
        await queryRunner.query(
            `ALTER TABLE "results" ADD CONSTRAINT "FK_d32f75b4ef575414fd72beb7f4c" FOREIGN KEY ("ghgEquipmentId") REFERENCES "ghg_equipment_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "results" DROP CONSTRAINT "FK_d32f75b4ef575414fd72beb7f4c"`,
        )
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "ghgEquipmentId"`)
    }
}
