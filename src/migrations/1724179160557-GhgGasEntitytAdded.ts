import { MigrationInterface, QueryRunner } from "typeorm"

export class GhgGasEntitytAdded1724179160557 implements MigrationInterface {
    name = "GhgGasEntitytAdded1724179160557"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "ghg_gases" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "chemicalFormula" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_4e40f12d21acb7b5cf585569396" UNIQUE ("name"), CONSTRAINT "PK_552dec939ec0ad7a6edd5c906f6" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `CREATE TABLE "ghg_emissions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "unit" character varying(50) DEFAULT 'kg', "gwp" numeric(50,10) NOT NULL, "gasId" uuid, CONSTRAINT "PK_ce4b2ac4ff5366771c5e05b7172" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `ALTER TABLE "ghg_emissions" ADD CONSTRAINT "FK_9741c7ce061ef54f384ca0fef12" FOREIGN KEY ("gasId") REFERENCES "ghg_gases"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "ghg_emissions" DROP CONSTRAINT "FK_9741c7ce061ef54f384ca0fef12"`,
        )
        await queryRunner.query(`DROP TABLE "ghg_emissions"`)
        await queryRunner.query(`DROP TABLE "ghg_gases"`)
    }
}
