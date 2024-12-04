import { MigrationInterface, QueryRunner } from "typeorm"
import { StationaryDefraActivity } from "../entity/stationary/StationaryDefraActivity.entity"
import { StationaryDefraFuel } from "../entity/stationary/StationaryDefraFuel.entity"
import { emissionData } from "../fixtures/stationary-defra-2023"
import { StationaryDefraEmission } from "../entity/stationary/StationaryDefraEmission.entity"

export class UnitEnumAdded1733055662148 implements MigrationInterface {
    name = "UnitEnumAdded1733055662148"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "stationary_defra_fuel" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "PK_88f8efd33b7848a721a1ebeefe4" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `CREATE TABLE "fuel_defra_emissions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "unit" character varying NOT NULL, "year" integer NOT NULL, "kg_co2e" numeric(50,10), "kg_co2_per_unit" numeric(50,10), "kg_ch4_per_unit" numeric(50,10), "kg_n2o_per_unit" numeric(50,10), "activity_id" uuid, "fuel_id" uuid, CONSTRAINT "PK_d02aab49d3d7b3ab21579cda6cf" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `CREATE TABLE "stationary_defra_activity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "PK_cf8a5fe830875450927542d67ff" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `CREATE TYPE "public"."stationary_defra_result_status_enum" AS ENUM('draft', 'pending', 'completed', 'rejected')`,
        )
        await queryRunner.query(
            `CREATE TABLE "stationary_defra_result" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "consumed_amount" numeric(50,10), "unit" text NOT NULL, "calculated_emission" numeric(50,10), "status" "public"."stationary_defra_result_status_enum" NOT NULL DEFAULT 'draft', "activity_id" uuid, "fuel_id" uuid, CONSTRAINT "PK_3d1407f96d82532c5e58a96a799" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `ALTER TABLE "fuel_defra_emissions" ADD CONSTRAINT "FK_d91427796f5a42137aa8c5ae0d1" FOREIGN KEY ("activity_id") REFERENCES "stationary_defra_activity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
        await queryRunner.query(
            `ALTER TABLE "fuel_defra_emissions" ADD CONSTRAINT "FK_4d421f1d1945f1c5b6daa2cdbe3" FOREIGN KEY ("fuel_id") REFERENCES "stationary_defra_fuel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
        await queryRunner.query(
            `ALTER TABLE "stationary_defra_result" ADD CONSTRAINT "FK_357381cf0798181bc2d3116d4f4" FOREIGN KEY ("activity_id") REFERENCES "stationary_defra_activity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
        await queryRunner.query(
            `ALTER TABLE "stationary_defra_result" ADD CONSTRAINT "FK_e0f00886f588d1d59c8f610f112" FOREIGN KEY ("fuel_id") REFERENCES "stationary_defra_fuel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )

        const actitvites = ["Liquid", "Gasesous"]
        // Insert fuel data into the "stationary_defra_fuel" table
        const fuels = [
            "Butane",
            "CNG",
            "LNG",
            "LPG",
            "Natural gas",
            "Natural gas (100% mineral blend)",
            "Other petroleum gas",
            "Propane",
            "Aviation spirit",
            "Aviation turbine fuel",
            "Burning oil",
            "Diesel (average biofuel blend)",
            "Diesel (100% mineral diesel)",
            "Fuel oil",
            "Gas oil",
            "Lubricants",
            "Naphtha",
            "Petrol (average biofuel blend)",
            "Petrol (100% mineral petrol)",
            "Processed fuel oils - residual oil",
            "Processed fuel oils - distillate oil",
            "Refinery miscellaneous",
            "Waste oils",
            "Marine gas oil",
            "Marine fuel oil",
        ]

        for (const activity of actitvites) {
            await queryRunner.manager.save(StationaryDefraActivity, { name: activity })
        }
        for (const fuel of fuels) {
            await queryRunner.manager.save(StationaryDefraFuel, { name: fuel })
        }

        for (const data of emissionData) {
            const fuel = await queryRunner.manager.findOne(StationaryDefraFuel, {
                where: { name: data.fuel },
            })
            const activity = await queryRunner.manager.findOne(StationaryDefraActivity, {
                where: { name: data.activity },
            })

            const emissionEntity = new StationaryDefraEmission()
            emissionEntity.unit = data.unit
            emissionEntity.year = data.year
            emissionEntity.activity = activity
            emissionEntity.kg_co2e = data.kg_co2e
            emissionEntity.kg_co2_per_unit = data.kg_co2_per_unit
            emissionEntity.kg_ch4_per_unit = data.kg_ch4_per_unit
            emissionEntity.kg_n2o_per_unit = data.kg_n2o_per_unit
            emissionEntity.fuel = fuel // Associate the fuel entity

            await queryRunner.manager.save(StationaryDefraEmission, emissionEntity)
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "stationary_defra_result" DROP CONSTRAINT "FK_e0f00886f588d1d59c8f610f112"`,
        )
        await queryRunner.query(
            `ALTER TABLE "stationary_defra_result" DROP CONSTRAINT "FK_357381cf0798181bc2d3116d4f4"`,
        )
        await queryRunner.query(
            `ALTER TABLE "fuel_defra_emissions" DROP CONSTRAINT "FK_4d421f1d1945f1c5b6daa2cdbe3"`,
        )
        await queryRunner.query(
            `ALTER TABLE "fuel_defra_emissions" DROP CONSTRAINT "FK_d91427796f5a42137aa8c5ae0d1"`,
        )
        await queryRunner.query(
            `ALTER TABLE "demo_submissions" DROP CONSTRAINT "FK_b4488eb0cce994664028c2955d5"`,
        )
        await queryRunner.query(
            `ALTER TABLE "ghg_emissions" DROP CONSTRAINT "FK_9741c7ce061ef54f384ca0fef12"`,
        )
        await queryRunner.query(
            `ALTER TABLE "results" DROP CONSTRAINT "FK_45e5cb06625a1f3b594cfa15932"`,
        )
        await queryRunner.query(
            `ALTER TABLE "results" DROP CONSTRAINT "FK_ce51789e88df31e8f418ecbecde"`,
        )
        await queryRunner.query(
            `ALTER TABLE "results" DROP CONSTRAINT "FK_2c7f7e8697e49df442f58fddd5c"`,
        )
        await queryRunner.query(
            `ALTER TABLE "results" DROP CONSTRAINT "FK_dc65803642f2e0b3dc826bd1605"`,
        )
        await queryRunner.query(
            `ALTER TABLE "results" DROP CONSTRAINT "FK_5ed565c92bddfe7d2bad52221e9"`,
        )
        await queryRunner.query(
            `ALTER TABLE "user" DROP CONSTRAINT "FK_1462295d0650df0f1ca78416a34"`,
        )
        await queryRunner.query(
            `ALTER TABLE "user" DROP CONSTRAINT "FK_a7b48190c6dd876ca4e52586195"`,
        )
        await queryRunner.query(
            `ALTER TABLE "user" DROP CONSTRAINT "FK_3e103cdf85b7d6cb620b4db0f0c"`,
        )
        await queryRunner.query(
            `ALTER TABLE "subsidiary" DROP CONSTRAINT "FK_f9f87d1163f4e0caf26b6205986"`,
        )
        await queryRunner.query(
            `ALTER TABLE "facility" DROP CONSTRAINT "FK_c28669ecde2aa708949064b579d"`,
        )
        await queryRunner.query(
            `ALTER TABLE "facility" DROP CONSTRAINT "FK_5f0f2e3e5176391b7f3ebffa2d1"`,
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
        await queryRunner.query(`DROP TABLE "stationary_defra_result"`)
        await queryRunner.query(`DROP TYPE "public"."stationary_defra_result_status_enum"`)
        await queryRunner.query(`DROP TABLE "stationary_defra_activity"`)
        await queryRunner.query(`DROP TABLE "fuel_defra_emissions"`)
        await queryRunner.query(`DROP TABLE "stationary_defra_fuel"`)
        await queryRunner.query(`DROP TABLE "demo_submissions"`)
        await queryRunner.query(`DROP TABLE "ghg_emissions"`)
        await queryRunner.query(`DROP TABLE "ghg_gases"`)
        await queryRunner.query(`DROP TABLE "results"`)
        await queryRunner.query(`DROP TYPE "public"."results_status_enum"`)
        await queryRunner.query(`DROP TABLE "organization"`)
        await queryRunner.query(`DROP TABLE "user"`)
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`)
        await queryRunner.query(`DROP TABLE "subsidiary"`)
        await queryRunner.query(`DROP TABLE "facility"`)
        await queryRunner.query(`DROP TABLE "ghg_equipment_type"`)
        await queryRunner.query(`DROP TABLE "equipment_type"`)
        await queryRunner.query(`DROP TABLE "defra_emissions"`)
        await queryRunner.query(`DROP TABLE "defra_gases"`)
        await queryRunner.query(`DROP TABLE "activities"`)
        await queryRunner.query(`DROP TABLE "epa_gases"`)
        await queryRunner.query(`DROP TABLE "epa_emissions"`)
    }
}
