import { MigrationInterface, QueryRunner } from "typeorm"

export class $npmConfigName1733218264162 implements MigrationInterface {
    name = " $npmConfigName1733218264162"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "epa_emissions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "year" integer NOT NULL, "gwp" numeric(50,10) NOT NULL, "unit" character varying(50) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "gasId" uuid, CONSTRAINT "PK_3c2c02326c6057710fed4591ab0" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `CREATE TABLE "epa_gases" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "chemicalFormula" character varying, CONSTRAINT "UQ_1e749242ec7e1197cd68b26e3f8" UNIQUE ("name"), CONSTRAINT "PK_83be810408034a8b759605be316" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `CREATE TABLE "activities" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_a7455bc944cd82d40cc41e83c46" UNIQUE ("name"), CONSTRAINT "PK_7f4004429f731ffb9c88eb486a8" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `CREATE TABLE "defra_gases" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "chemicalFormula" character varying, "activityId" uuid NOT NULL, CONSTRAINT "UQ_3ce177f6624f573b64a256f361d" UNIQUE ("name"), CONSTRAINT "PK_3d8411de8f8230d10d3c2b70074" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `CREATE TABLE "defra_emissions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "year" integer NOT NULL, "kyoto_gwp" numeric(50,10) NOT NULL DEFAULT '0', "non_kyoto_gwp" numeric(50,10) NOT NULL DEFAULT '0', "unit" character varying(50) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "gasId" uuid, CONSTRAINT "PK_860192bc2df1f58202e2c013827" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `CREATE TABLE "equipment_type" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "unit" character varying NOT NULL DEFAULT 'kg', "minCapacity" numeric(50,10) NOT NULL, "maxCapacity" numeric(50,10) NOT NULL, "installationEmissionFactor" numeric(50,10) NOT NULL, "operatingEmissions" numeric(50,10) NOT NULL, "refrigerantRemainingAtDisposal" numeric(50,10) NOT NULL, "recoveryEfficiency" numeric(50,10) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_ce2b5e7a7ca480169494f39fad5" UNIQUE ("name"), CONSTRAINT "PK_ee23d8bc7edce7f6f0d2e90c573" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `CREATE TABLE "ghg_equipment_type" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "unit" character varying NOT NULL DEFAULT 'kg', "minCharge" numeric(50,10) NOT NULL, "maxCharge" numeric(50,10) NOT NULL, "minAssemblyRate" numeric(50,10) NOT NULL, "maxAssemblyRate" numeric(50,10) NOT NULL, "minAnnualLeakageRate" numeric(50,10) NOT NULL, "maxAnnualLeakageRate" numeric(50,10) NOT NULL, "minRecycylingEfficiency" numeric(50,10) NOT NULL, "maxRecycylingEfficiency" numeric(50,10) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_366834a08fe7f2f29abb959c383" UNIQUE ("name"), CONSTRAINT "PK_dbbd9b2496f0c6f84bac7433256" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `CREATE TABLE "facility" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying(500) NOT NULL, "facility_slug" character varying(500), "country" character varying(255), "state" character varying(255), "address" character varying(255), "phone" character varying(255), "type" character varying(255), "phone_country_code" character varying(255), "contact_person" character varying(255), "contact_person_email" character varying(255), "address_line_1" character varying(255), "address_line_2" character varying(255), "calculate_esg" boolean DEFAULT false, "parent_id" uuid, "subsidiary_id" uuid, CONSTRAINT "UQ_2e2dcb51a63a72826829a060d78" UNIQUE ("facility_slug"), CONSTRAINT "PK_07c6c82781d105a680b5c265be6" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `CREATE TABLE "subsidiary" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying(500) NOT NULL, "subsidiary_slug" character varying(500), "business_operation" character varying(500), "incorporation_date" date, "ownership_percentage" integer NOT NULL, "country" character varying(255), "state" character varying(255), "address" character varying(255), "address_line_1" character varying(255), "address_line_2" character varying(255), "calculate_esg" boolean DEFAULT false, "parent_id" uuid, CONSTRAINT "UQ_d02789785f43bcee024d32e60a1" UNIQUE ("subsidiary_slug"), CONSTRAINT "PK_fa9258079144978ccfcb18e32a8" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `CREATE TYPE "public"."user_role_enum" AS ENUM('envistide', 'superadmin', 'admin', 'fac_admin', 'validator', 'provider', 'user')`,
        )
        await queryRunner.query(
            `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "role" "public"."user_role_enum" NOT NULL DEFAULT 'user', "first_name" character varying(50) NOT NULL, "last_name" character varying(50) NOT NULL, "username" character varying(50), "email" character varying(100), "password" character varying(100) NOT NULL, "phone_country_code" character varying(5) NOT NULL, "phone_number" character varying NOT NULL, "otp" integer, "password_reset_count" integer DEFAULT '0', "otp_generated_at" bigint, "organization_id" uuid, "subsidiary_id" uuid, "facility_id" uuid, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `CREATE TABLE "organization" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying(500) NOT NULL, "organization_slug" character varying(500), "organization_legal_name" character varying(255) NOT NULL, "organization_abbreviated_name" character varying(255), "country" character varying(255), "state" character varying(255), "address" character varying(255), "address_line_1" character varying(255), "address_line_2" character varying(255), "industry_type" jsonb, "employment_type" jsonb, "ownership_nature" jsonb, "total_employees" integer, "website" character varying(255), "linkedin" character varying(255), "business_address" text, "billing_address" text, "contact" jsonb, "service" text, "corporate_identity_number" character varying(255), "year_of_incorporation" character varying(255), "currency" character varying(255), "paid_up_capital" character varying(255), "financial_year_start" character varying(255), "financial_year_end" character varying(255), "stocks_share" character varying(255), "mailing_address" character varying(255), "fax" character varying(255), CONSTRAINT "UQ_5c0d43ae0a55b580eb31d696a87" UNIQUE ("organization_slug"), CONSTRAINT "PK_472c1f99a32def1b0abb219cd67" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `CREATE TYPE "public"."results_status_enum" AS ENUM('draft', 'pending', 'completed', 'rejected')`,
        )
        await queryRunner.query(
            `CREATE TABLE "results" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" "public"."results_status_enum" NOT NULL DEFAULT 'draft', "unit" character varying NOT NULL, "remarks" character varying, "result_type" character varying NOT NULL, "method" integer NOT NULL, "number_of_months" integer, "gas" character varying, "attachment" character varying, "activity" character varying, "inventory_change" numeric(50,10), "transferred_amount" numeric(50,10), "capacity" numeric(50,10), "new_units_charge" numeric(50,10), "new_units_capacity" numeric(50,10), "existing_units_recharge" numeric(50,10), "disposed_units_capacity" numeric(50,10), "disposed_units_recovered" numeric(50,10), "decrease_inventory_at_begining" numeric(50,10), "decrease_inventory_at_end" numeric(50,10), "result_decrease_inventory" numeric(50,10), "purchases_producers_in_bulk" numeric(50,10), "purchases_equipment_refrigerant" numeric(50,10), "purchases_contractors_refrigerant" numeric(50,10), "purchases_offsite_recycling" numeric(50,10), "result_purchaes" numeric(50,10), "sales_equipment_other" numeric(50,10), "sales_sold_other" numeric(50,10), "sales_refrigerant_returned_supplier" numeric(50,10), "sales_recycling" numeric(50,10), "sales_sent_offsite" numeric(50,10), "result_sales" numeric(50,10), "increase_charge_new_equipment" numeric(50,10), "increase_full_charge" numeric(50,10), "increase_original_total_full_charge" numeric(50,10), "increase_different_refrigerant" numeric(50,10), "result_increase" numeric(50,10), "emissions" numeric(50,10), "installation_refrigerant_used" numeric(50,10), "installation_refrigerant_used_retrofit" numeric(50,10), "installation_equipment_using_refrigerant" numeric(50,10), "installation_equipment_using_refrigerant_retrofit" numeric(50,10), "installation_total_emission" numeric(50,10), "use_emission_recycling_recharge" numeric(50,10), "final_sold_other_entities" numeric(50,10), "final_use_different_refrigerant" numeric(50,10), "final_use_retering_equipment" numeric(50,10), "final_use_different_refrigerant_other" numeric(50,10), "final_use_total" numeric(50,10), "total_units" numeric(50,10), "refrigerant_charge" numeric(50,10), "installation_factor" numeric(50,10), "annual_leakage_rate" numeric(50,10), "time_since_recharge_years" numeric(50,10), "recycling_efficiency" numeric(50,10), "destruction" numeric(50,10), "area" numeric(50,10), "year" integer, "result" numeric(50,10) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "organinzation_id" uuid, "subsidiary_id" uuid, "facility_id" uuid, "equipment_id" uuid, "ghgEquipment_id" uuid, CONSTRAINT "PK_e8f2a9191c61c15b627c117a678" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `CREATE TABLE "ghg_gases" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "chemicalFormula" character varying, CONSTRAINT "UQ_4e40f12d21acb7b5cf585569396" UNIQUE ("name"), CONSTRAINT "PK_552dec939ec0ad7a6edd5c906f6" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `CREATE TABLE "ghg_emissions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "unit" character varying(50) DEFAULT 'kg', "gwp" numeric(50,10) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "gasId" uuid, CONSTRAINT "PK_ce4b2ac4ff5366771c5e05b7172" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `CREATE TABLE "demo_submissions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "first_name" character varying(50) NOT NULL, "last_name" character varying(50) NOT NULL, "company" character varying(150) NOT NULL, "company_slug" character varying NOT NULL, "email" character varying(100) NOT NULL, "designation" character varying NOT NULL, "phone_country_code" character varying(5) NOT NULL, "phone_number" character varying NOT NULL, "guests" jsonb, "credentials_generated" boolean DEFAULT false, "user_id" uuid, CONSTRAINT "UQ_46ac7d0aa93279c2c5059b63947" UNIQUE ("company_slug"), CONSTRAINT "UQ_ea448f4aaf70ae68ee3d0c636ad" UNIQUE ("email"), CONSTRAINT "PK_3d98cbbc7f81f2a8952749c9a8a" PRIMARY KEY ("id"))`,
        )
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
            `CREATE TABLE "stationary_defra_result" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "consumed_amount" numeric(50,10), "year" integer, "unit" text NOT NULL, "calculated_emission" numeric(50,10), "status" "public"."stationary_defra_result_status_enum" NOT NULL DEFAULT 'draft', "remarks" character varying, "activity_id" uuid, "fuel_id" uuid, CONSTRAINT "PK_3d1407f96d82532c5e58a96a799" PRIMARY KEY ("id"))`,
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
            `ALTER TABLE "facility" ADD CONSTRAINT "FK_5f0f2e3e5176391b7f3ebffa2d1" FOREIGN KEY ("parent_id") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
        await queryRunner.query(
            `ALTER TABLE "facility" ADD CONSTRAINT "FK_c28669ecde2aa708949064b579d" FOREIGN KEY ("subsidiary_id") REFERENCES "subsidiary"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
        await queryRunner.query(
            `ALTER TABLE "subsidiary" ADD CONSTRAINT "FK_f9f87d1163f4e0caf26b6205986" FOREIGN KEY ("parent_id") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
        await queryRunner.query(
            `ALTER TABLE "user" ADD CONSTRAINT "FK_3e103cdf85b7d6cb620b4db0f0c" FOREIGN KEY ("organization_id") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
        await queryRunner.query(
            `ALTER TABLE "user" ADD CONSTRAINT "FK_a7b48190c6dd876ca4e52586195" FOREIGN KEY ("subsidiary_id") REFERENCES "subsidiary"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
        await queryRunner.query(
            `ALTER TABLE "user" ADD CONSTRAINT "FK_1462295d0650df0f1ca78416a34" FOREIGN KEY ("facility_id") REFERENCES "facility"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
        await queryRunner.query(
            `ALTER TABLE "results" ADD CONSTRAINT "FK_5ed565c92bddfe7d2bad52221e9" FOREIGN KEY ("organinzation_id") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
        await queryRunner.query(
            `ALTER TABLE "results" ADD CONSTRAINT "FK_dc65803642f2e0b3dc826bd1605" FOREIGN KEY ("subsidiary_id") REFERENCES "subsidiary"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
        await queryRunner.query(
            `ALTER TABLE "results" ADD CONSTRAINT "FK_2c7f7e8697e49df442f58fddd5c" FOREIGN KEY ("facility_id") REFERENCES "facility"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
        await queryRunner.query(
            `ALTER TABLE "results" ADD CONSTRAINT "FK_ce51789e88df31e8f418ecbecde" FOREIGN KEY ("equipment_id") REFERENCES "equipment_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
        await queryRunner.query(
            `ALTER TABLE "results" ADD CONSTRAINT "FK_45e5cb06625a1f3b594cfa15932" FOREIGN KEY ("ghgEquipment_id") REFERENCES "ghg_equipment_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
        await queryRunner.query(
            `ALTER TABLE "ghg_emissions" ADD CONSTRAINT "FK_9741c7ce061ef54f384ca0fef12" FOREIGN KEY ("gasId") REFERENCES "ghg_gases"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
        await queryRunner.query(
            `ALTER TABLE "demo_submissions" ADD CONSTRAINT "FK_b4488eb0cce994664028c2955d5" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
