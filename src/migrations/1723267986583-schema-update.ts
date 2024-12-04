import { MigrationInterface, QueryRunner } from "typeorm"

export class SchemaUpdate1723267986583 implements MigrationInterface {
    name = "SchemaUpdate1723267986583"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "epa_emissions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "gasId" uuid NOT NULL, "year" integer NOT NULL, "gwp" numeric(50,10) NOT NULL, "unit" character varying(50) NOT NULL, CONSTRAINT "PK_3c2c02326c6057710fed4591ab0" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `CREATE TABLE "epa_gases" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "chemicalFormula" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_1e749242ec7e1197cd68b26e3f8" UNIQUE ("name"), CONSTRAINT "PK_83be810408034a8b759605be316" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `CREATE TABLE "activities" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_a7455bc944cd82d40cc41e83c46" UNIQUE ("name"), CONSTRAINT "PK_7f4004429f731ffb9c88eb486a8" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `CREATE TABLE "defra_gases" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "chemicalFormula" character varying, "activityId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_3ce177f6624f573b64a256f361d" UNIQUE ("name"), CONSTRAINT "PK_3d8411de8f8230d10d3c2b70074" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `CREATE TABLE "defra_emissions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "gasId" uuid NOT NULL, "year" integer NOT NULL, "kyoto_gwp" numeric(50,10) NOT NULL DEFAULT '0', "non_kyoto_gwp" numeric(50,10) NOT NULL DEFAULT '0', "unit" character varying(50) NOT NULL, CONSTRAINT "PK_860192bc2df1f58202e2c013827" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `CREATE TABLE "equipment_type" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "unit" character varying NOT NULL DEFAULT 'kg', "minCapacity" numeric(50,10) NOT NULL, "maxCapacity" numeric(50,10) NOT NULL, "installationEmissionFactor" numeric(50,10) NOT NULL, "operatingEmissions" numeric(50,10) NOT NULL, "refrigerantRemainingAtDisposal" numeric(50,10) NOT NULL, "recoveryEfficiency" numeric(50,10) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_ce2b5e7a7ca480169494f39fad5" UNIQUE ("name"), CONSTRAINT "PK_ee23d8bc7edce7f6f0d2e90c573" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `CREATE TABLE "results" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "unit" character varying NOT NULL, "method" integer NOT NULL, "numberOfMonths" integer, "inventoryChange" numeric(50,10), "transferredAmount" numeric(50,10), "capacity" numeric(50,10), "newUnitsCharge" numeric(50,10), "newUnitsCapacity" numeric(50,10), "existingUnitsRecharge" numeric(50,10), "disposedUnitsCapacity" numeric(50,10), "disposedUnitsRecovered" numeric(50,10), "result" numeric(50,10) NOT NULL, "equipmentId" uuid, "gasId" uuid, "activityId" uuid, CONSTRAINT "PK_e8f2a9191c61c15b627c117a678" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `ALTER TABLE "epa_emissions" ADD CONSTRAINT "FK_c6669db63fd5fa2657825353165" FOREIGN KEY ("gasId") REFERENCES "epa_gases"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
        await queryRunner.query(
            `ALTER TABLE "defra_gases" ADD CONSTRAINT "FK_702f0da2b4c22f99867c6851301" FOREIGN KEY ("activityId") REFERENCES "activities"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        )
        await queryRunner.query(
            `ALTER TABLE "defra_emissions" ADD CONSTRAINT "FK_3cc4d29136ef04d005273fd3f30" FOREIGN KEY ("gasId") REFERENCES "defra_gases"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
        await queryRunner.query(
            `ALTER TABLE "results" ADD CONSTRAINT "FK_9373c67a2b45a843fcad712e2be" FOREIGN KEY ("equipmentId") REFERENCES "equipment_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
        await queryRunner.query(
            `ALTER TABLE "results" ADD CONSTRAINT "FK_165e8b6be01cd1b6822acd414b7" FOREIGN KEY ("gasId") REFERENCES "epa_gases"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
        await queryRunner.query(
            `ALTER TABLE "results" ADD CONSTRAINT "FK_91b9f421ba60f30137d167fdd87" FOREIGN KEY ("activityId") REFERENCES "activities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "results" DROP CONSTRAINT "FK_91b9f421ba60f30137d167fdd87"`,
        )
        await queryRunner.query(
            `ALTER TABLE "results" DROP CONSTRAINT "FK_165e8b6be01cd1b6822acd414b7"`,
        )
        await queryRunner.query(
            `ALTER TABLE "results" DROP CONSTRAINT "FK_9373c67a2b45a843fcad712e2be"`,
        )
        await queryRunner.query(
            `ALTER TABLE "defra_emissions" DROP CONSTRAINT "FK_3cc4d29136ef04d005273fd3f30"`,
        )
        await queryRunner.query(
            `ALTER TABLE "defra_gases" DROP CONSTRAINT "FK_702f0da2b4c22f99867c6851301"`,
        )
        await queryRunner.query(
            `ALTER TABLE "epa_emissions" DROP CONSTRAINT "FK_c6669db63fd5fa2657825353165"`,
        )
        await queryRunner.query(`DROP TABLE "results"`)
        await queryRunner.query(`DROP TABLE "equipment_type"`)
        await queryRunner.query(`DROP TABLE "defra_emissions"`)
        await queryRunner.query(`DROP TABLE "defra_gases"`)
        await queryRunner.query(`DROP TABLE "activities"`)
        await queryRunner.query(`DROP TABLE "epa_gases"`)
        await queryRunner.query(`DROP TABLE "epa_emissions"`)
    }
}
