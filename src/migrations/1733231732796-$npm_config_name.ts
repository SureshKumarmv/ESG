import { MigrationInterface, QueryRunner } from "typeorm"

export class $npmConfigName1733231732796 implements MigrationInterface {
    name = " $npmConfigName1733231732796"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "Mobile_Ev_Defra_Factor" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "kgco2e" numeric(50,10) NOT NULL, "year" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_a436107751887a42f01b554a44e" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `CREATE TABLE "Mobile_Defra_KWH" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "kgco2e" numeric(50,10) NOT NULL, "year" integer NOT NULL, "unit" character varying NOT NULL, "type" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_9b58df04e72458249529fb4554d" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `CREATE TABLE "Mobile_Vehicle_Defra" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "activityId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_b97a2e5deed8a1e0f462102c3f7" UNIQUE ("name"), CONSTRAINT "PK_deb7ed849e52088ed6d0c01b96a" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `CREATE TABLE "Mobile_Vehicle_Variant_Defra" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "vehicleId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_18aa5ca98cbf58ad410813ba06e" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `CREATE TABLE "Mobile_Defra_Result" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "consumer" character varying NOT NULL, "ghgProtocolScope" character varying NOT NULL, "type" character varying NOT NULL, "electricVehicleType" character varying NOT NULL, "electricityPercentage" integer NOT NULL, "fuelPercentage" integer NOT NULL, "year" integer NOT NULL, "noOfDays" integer NOT NULL, "startDate" date NOT NULL, "endDate" date NOT NULL, "activity" character varying NOT NULL, "vehicle" character varying NOT NULL, "variant" character varying NOT NULL, "unit" character varying NOT NULL, "consumption" double precision NOT NULL, "result" double precision NOT NULL, "CO2output" double precision NOT NULL, "N2Ooutput" double precision NOT NULL, "CH4output" double precision NOT NULL, CONSTRAINT "PK_f413cb9210d0a8a4466fd0cd0ee" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `CREATE TABLE "Mobile_Vehicle_Emission_Defra" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "kgco2e" numeric(50,10) NOT NULL, "kgco2eCO2" numeric(50,10) NOT NULL, "kgco2eCH4" numeric(50,10) NOT NULL, "kgco2eN2O" numeric(50,10) NOT NULL, "vehicleId" uuid NOT NULL, "year" integer NOT NULL, "variantId" uuid NOT NULL, "unit" character varying(50) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_2acaaf72f0ba9dd392f637f62bc" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `CREATE TABLE "Mobile_Delivery_Activity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_b80fd141d828c11e03a7864134f" UNIQUE ("name"), CONSTRAINT "PK_e961a9549a1a85d98c8dddb6a71" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `CREATE TABLE "Mobile_Delivery_Types" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "activityId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_ecb8fa4f76a21426f016b7ffca0" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `CREATE TABLE "Mobile_Delivery_Variant" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "activityId" uuid NOT NULL, "TypeId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_3fdb06e91843380049591a2389e" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `CREATE TABLE "Mobile_Delivery_Emmission" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "kgco2e" numeric(50,10) NOT NULL, "CO2output" numeric(50,10) NOT NULL, "CH4output" numeric(50,10) NOT NULL, "N2Ooutput" numeric(50,10) NOT NULL, "activityId" uuid NOT NULL, "year" integer NOT NULL, "unit" character varying(50) NOT NULL, "TypeId" character varying NOT NULL, "variantId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "typeId" uuid, CONSTRAINT "PK_67f3c21004bb2e524cd586ac9fc" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `CREATE TABLE "Mobile_Delivery_Result" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "year" integer NOT NULL, "consumer" character varying NOT NULL, "ghgProtocolScope" character varying NOT NULL, "startDate" date NOT NULL, "endDate" date NOT NULL, "noOfDays" integer NOT NULL, "activity" character varying, "types" character varying, "variant" character varying, "unit" character varying, "distanceTravelled" double precision, "result" double precision NOT NULL, "CO2output" numeric(50,10) NOT NULL, "CH4output" numeric(50,10) NOT NULL, "N2Ooutput" numeric(50,10) NOT NULL, CONSTRAINT "PK_cb5c36a2beec4f6d61c9a39c7bd" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `CREATE TABLE "Mobile_SECR_Activity_Defra" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_922060a2ad291454f9ffa83d198" UNIQUE ("name"), CONSTRAINT "PK_1131b72e5fd2e48cc914697645f" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `CREATE TABLE "Mobile_SECR_Vehicle_Defra" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "activityId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_b85ee54eb130334bde84d51037f" UNIQUE ("name"), CONSTRAINT "PK_b72b7a748a253db6225089bd9f1" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `CREATE TABLE "Mobile_Vehicle_Variant_SECR_Defra" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "vehicleId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_39f0418dcf99b79f9ecc12d01ad" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `CREATE TABLE "Mobile_Vehicle_SECR_Emission_Defra" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "kgco2e" numeric(50,10) NOT NULL, "vehicleId" uuid NOT NULL, "year" integer NOT NULL, "variantId" uuid NOT NULL, "unit" character varying(50) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_58ef5fc82f5ded73e130825c4c9" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `CREATE TABLE "Mobile_SECR_Fuel_Factor_Defra" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "kgco2e" numeric(50,10) NOT NULL, "year" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_57709ccda925c47d709b7b447c4" UNIQUE ("name"), CONSTRAINT "PK_db79d2d741550807e607be10c72" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `CREATE TABLE "Mobile_Defra_SECR_Result" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "consumer" character varying NOT NULL, "ghgProtocolScope" character varying NOT NULL, "year" integer NOT NULL, "noOfDays" integer NOT NULL, "startDate" date NOT NULL, "endDate" date NOT NULL, "activity" character varying, "vehicle" character varying, "fuelName" character varying, "variant" character varying, "unit" character varying, "fuelUnit" character varying, "consumption" double precision, "fuelConsumed" double precision, "result" double precision NOT NULL, CONSTRAINT "PK_2a1aa715ea64e38855a2748589a" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `ALTER TABLE "Mobile_Vehicle_Defra" ADD CONSTRAINT "FK_0583716568a104d07636952442d" FOREIGN KEY ("activityId") REFERENCES "Mobile_Activity_Defra"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        )
        await queryRunner.query(
            `ALTER TABLE "Mobile_Vehicle_Variant_Defra" ADD CONSTRAINT "FK_2cf414dbe79b6f8bf6516df9dd5" FOREIGN KEY ("vehicleId") REFERENCES "Mobile_Vehicle_Defra"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        )
        await queryRunner.query(
            `ALTER TABLE "Mobile_Defra_Result" ADD CONSTRAINT "FK_3a0f03f79f74d416c6672dde821" FOREIGN KEY ("activity") REFERENCES "Mobile_Activity_Defra"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
        await queryRunner.query(
            `ALTER TABLE "Mobile_Defra_Result" ADD CONSTRAINT "FK_9bac8e5376075b61cae38a0a921" FOREIGN KEY ("vehicle") REFERENCES "Mobile_Vehicle_Defra"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
        await queryRunner.query(
            `ALTER TABLE "Mobile_Defra_Result" ADD CONSTRAINT "FK_3b0b319d237d630e225a8589355" FOREIGN KEY ("variant") REFERENCES "Mobile_Vehicle_Variant_Defra"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
        await queryRunner.query(
            `ALTER TABLE "Mobile_Vehicle_Emission_Defra" ADD CONSTRAINT "FK_d313bf5422f4faa02f841f7e423" FOREIGN KEY ("vehicleId") REFERENCES "Mobile_Vehicle_Defra"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        )
        await queryRunner.query(
            `ALTER TABLE "Mobile_Vehicle_Emission_Defra" ADD CONSTRAINT "FK_c0e367c18d5ef128064da51e2c0" FOREIGN KEY ("variantId") REFERENCES "Mobile_Vehicle_Variant_Defra"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        )
        await queryRunner.query(
            `ALTER TABLE "Mobile_Delivery_Types" ADD CONSTRAINT "FK_78d11ac57d3d30d05b832ae9ea9" FOREIGN KEY ("activityId") REFERENCES "Mobile_Delivery_Activity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        )
        await queryRunner.query(
            `ALTER TABLE "Mobile_Delivery_Variant" ADD CONSTRAINT "FK_03eeb2624715507551cc1a7b41f" FOREIGN KEY ("activityId") REFERENCES "Mobile_Delivery_Activity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        )
        await queryRunner.query(
            `ALTER TABLE "Mobile_Delivery_Variant" ADD CONSTRAINT "FK_21f8b6d8c05905b949a67e1b1b5" FOREIGN KEY ("TypeId") REFERENCES "Mobile_Delivery_Types"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        )
        await queryRunner.query(
            `ALTER TABLE "Mobile_Delivery_Emmission" ADD CONSTRAINT "FK_836b43a2f5f48f4db55541c1a71" FOREIGN KEY ("activityId") REFERENCES "Mobile_Delivery_Activity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        )
        await queryRunner.query(
            `ALTER TABLE "Mobile_Delivery_Emmission" ADD CONSTRAINT "FK_d4de48450908e3bcd20b21d6be6" FOREIGN KEY ("typeId") REFERENCES "Mobile_Delivery_Types"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        )
        await queryRunner.query(
            `ALTER TABLE "Mobile_Delivery_Emmission" ADD CONSTRAINT "FK_fa3679057ff5e80f8327825832e" FOREIGN KEY ("variantId") REFERENCES "Mobile_Delivery_Variant"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        )
        await queryRunner.query(
            `ALTER TABLE "Mobile_SECR_Vehicle_Defra" ADD CONSTRAINT "FK_b7bc92a814a53c4e7ea4e210760" FOREIGN KEY ("activityId") REFERENCES "Mobile_SECR_Activity_Defra"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        )
        await queryRunner.query(
            `ALTER TABLE "Mobile_Vehicle_Variant_SECR_Defra" ADD CONSTRAINT "FK_ab884f59b972d166a38985644c1" FOREIGN KEY ("vehicleId") REFERENCES "Mobile_SECR_Vehicle_Defra"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        )
        await queryRunner.query(
            `ALTER TABLE "Mobile_Vehicle_SECR_Emission_Defra" ADD CONSTRAINT "FK_bd9683e855a27626ae1533f3e55" FOREIGN KEY ("vehicleId") REFERENCES "Mobile_SECR_Vehicle_Defra"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        )
        await queryRunner.query(
            `ALTER TABLE "Mobile_Vehicle_SECR_Emission_Defra" ADD CONSTRAINT "FK_bbba1bbadb51ced7ff80b4537a5" FOREIGN KEY ("variantId") REFERENCES "Mobile_Vehicle_Variant_SECR_Defra"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "Mobile_Vehicle_SECR_Emission_Defra" DROP CONSTRAINT "FK_bbba1bbadb51ced7ff80b4537a5"`,
        )
        await queryRunner.query(
            `ALTER TABLE "Mobile_Vehicle_SECR_Emission_Defra" DROP CONSTRAINT "FK_bd9683e855a27626ae1533f3e55"`,
        )
        await queryRunner.query(
            `ALTER TABLE "Mobile_Vehicle_Variant_SECR_Defra" DROP CONSTRAINT "FK_ab884f59b972d166a38985644c1"`,
        )
        await queryRunner.query(
            `ALTER TABLE "Mobile_SECR_Vehicle_Defra" DROP CONSTRAINT "FK_b7bc92a814a53c4e7ea4e210760"`,
        )
        await queryRunner.query(
            `ALTER TABLE "Mobile_Delivery_Emmission" DROP CONSTRAINT "FK_fa3679057ff5e80f8327825832e"`,
        )
        await queryRunner.query(
            `ALTER TABLE "Mobile_Delivery_Emmission" DROP CONSTRAINT "FK_d4de48450908e3bcd20b21d6be6"`,
        )
        await queryRunner.query(
            `ALTER TABLE "Mobile_Delivery_Emmission" DROP CONSTRAINT "FK_836b43a2f5f48f4db55541c1a71"`,
        )
        await queryRunner.query(
            `ALTER TABLE "Mobile_Delivery_Variant" DROP CONSTRAINT "FK_21f8b6d8c05905b949a67e1b1b5"`,
        )
        await queryRunner.query(
            `ALTER TABLE "Mobile_Delivery_Variant" DROP CONSTRAINT "FK_03eeb2624715507551cc1a7b41f"`,
        )
        await queryRunner.query(
            `ALTER TABLE "Mobile_Delivery_Types" DROP CONSTRAINT "FK_78d11ac57d3d30d05b832ae9ea9"`,
        )
        await queryRunner.query(
            `ALTER TABLE "Mobile_Vehicle_Emission_Defra" DROP CONSTRAINT "FK_c0e367c18d5ef128064da51e2c0"`,
        )
        await queryRunner.query(
            `ALTER TABLE "Mobile_Vehicle_Emission_Defra" DROP CONSTRAINT "FK_d313bf5422f4faa02f841f7e423"`,
        )
        await queryRunner.query(
            `ALTER TABLE "Mobile_Defra_Result" DROP CONSTRAINT "FK_3b0b319d237d630e225a8589355"`,
        )
        await queryRunner.query(
            `ALTER TABLE "Mobile_Defra_Result" DROP CONSTRAINT "FK_9bac8e5376075b61cae38a0a921"`,
        )
        await queryRunner.query(
            `ALTER TABLE "Mobile_Defra_Result" DROP CONSTRAINT "FK_3a0f03f79f74d416c6672dde821"`,
        )
        await queryRunner.query(
            `ALTER TABLE "Mobile_Vehicle_Variant_Defra" DROP CONSTRAINT "FK_2cf414dbe79b6f8bf6516df9dd5"`,
        )
        await queryRunner.query(
            `ALTER TABLE "Mobile_Vehicle_Defra" DROP CONSTRAINT "FK_0583716568a104d07636952442d"`,
        )
        await queryRunner.query(`DROP TABLE "Mobile_Defra_SECR_Result"`)
        await queryRunner.query(`DROP TABLE "Mobile_SECR_Fuel_Factor_Defra"`)
        await queryRunner.query(`DROP TABLE "Mobile_Vehicle_SECR_Emission_Defra"`)
        await queryRunner.query(`DROP TABLE "Mobile_Vehicle_Variant_SECR_Defra"`)
        await queryRunner.query(`DROP TABLE "Mobile_SECR_Vehicle_Defra"`)
        await queryRunner.query(`DROP TABLE "Mobile_SECR_Activity_Defra"`)
        await queryRunner.query(`DROP TABLE "Mobile_Delivery_Result"`)
        await queryRunner.query(`DROP TABLE "Mobile_Delivery_Emmission"`)
        await queryRunner.query(`DROP TABLE "Mobile_Delivery_Variant"`)
        await queryRunner.query(`DROP TABLE "Mobile_Delivery_Types"`)
        await queryRunner.query(`DROP TABLE "Mobile_Delivery_Activity"`)
        await queryRunner.query(`DROP TABLE "Mobile_Vehicle_Emission_Defra"`)
        await queryRunner.query(`DROP TABLE "Mobile_Defra_Result"`)
        await queryRunner.query(`DROP TABLE "Mobile_Vehicle_Variant_Defra"`)
        await queryRunner.query(`DROP TABLE "Mobile_Vehicle_Defra"`)
        await queryRunner.query(`DROP TABLE "Mobile_Defra_KWH"`)
        await queryRunner.query(`DROP TABLE "Mobile_Ev_Defra_Factor"`)
    }
}
