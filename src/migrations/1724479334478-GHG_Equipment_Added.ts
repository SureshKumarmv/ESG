import { MigrationInterface, QueryRunner } from "typeorm"

export class GHGEquipmentAdded1724479334478 implements MigrationInterface {
    name = "GHGEquipmentAdded1724479334478"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "ghg_equipment_type" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "unit" character varying NOT NULL DEFAULT 'kg', "minCharge" numeric(50,10) NOT NULL, "maxCharge" numeric(50,10) NOT NULL, "minAssemblyRate" numeric(50,10) NOT NULL, "maxAssemblyRate" numeric(50,10) NOT NULL, "minAnnualLeakageRate" numeric(50,10) NOT NULL, "maxAnnualLeakageRate" numeric(50,10) NOT NULL, "minRecycylingEfficiency" numeric(50,10) NOT NULL, "maxRecycylingEfficiency" numeric(50,10) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_366834a08fe7f2f29abb959c383" UNIQUE ("name"), CONSTRAINT "PK_dbbd9b2496f0c6f84bac7433256" PRIMARY KEY ("id"))`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "ghg_equipment_type"`)
    }
}
