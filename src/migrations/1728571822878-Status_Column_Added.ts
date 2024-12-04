import { MigrationInterface, QueryRunner } from "typeorm"

export class StatusColumnAdded1728571822878 implements MigrationInterface {
    name = "StatusColumnAdded1728571822878"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "results" DROP CONSTRAINT "FK_9373c67a2b45a843fcad712e2be"`,
        )
        await queryRunner.query(
            `ALTER TABLE "results" DROP CONSTRAINT "FK_d32f75b4ef575414fd72beb7f4c"`,
        )
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "numberOfMonths"`)
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "inventoryChange"`)
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "transferredAmount"`)
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "newUnitsCharge"`)
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "newUnitsCapacity"`)
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "existingUnitsRecharge"`)
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "disposedUnitsCapacity"`)
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "disposedUnitsRecovered"`)
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "equipmentId"`)
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "ghgEquipmentId"`)
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "resultType"`)
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "name"`)
        await queryRunner.query(
            `CREATE TYPE "public"."results_status_enum" AS ENUM('draft', 'pending', 'completed')`,
        )
        await queryRunner.query(
            `ALTER TABLE "results" ADD "status" "public"."results_status_enum" NOT NULL DEFAULT 'draft'`,
        )
        await queryRunner.query(
            `ALTER TABLE "results" ADD "result_type" character varying NOT NULL`,
        )
        await queryRunner.query(`ALTER TABLE "results" ADD "number_of_months" integer`)
        await queryRunner.query(`ALTER TABLE "results" ADD "inventory_change" numeric(50,10)`)
        await queryRunner.query(`ALTER TABLE "results" ADD "transferred_amount" numeric(50,10)`)
        await queryRunner.query(`ALTER TABLE "results" ADD "new_units_charge" numeric(50,10)`)
        await queryRunner.query(`ALTER TABLE "results" ADD "new_units_capacity" numeric(50,10)`)
        await queryRunner.query(
            `ALTER TABLE "results" ADD "existing_units_recharge" numeric(50,10)`,
        )
        await queryRunner.query(
            `ALTER TABLE "results" ADD "disposed_units_capacity" numeric(50,10)`,
        )
        await queryRunner.query(
            `ALTER TABLE "results" ADD "disposed_units_recovered" numeric(50,10)`,
        )
        await queryRunner.query(`ALTER TABLE "results" ADD "organinzation_id" uuid`)
        await queryRunner.query(`ALTER TABLE "results" ADD "equipment_id" uuid`)
        await queryRunner.query(`ALTER TABLE "results" ADD "ghgEquipment_id" uuid`)
        await queryRunner.query(
            `ALTER TYPE "public"."user_role_enum" RENAME TO "user_role_enum_old"`,
        )
        await queryRunner.query(
            `CREATE TYPE "public"."user_role_enum" AS ENUM('envistide', 'superadmin', 'admin', 'fac_admin', 'validator', 'provider', 'user')`,
        )
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" DROP DEFAULT`)
        await queryRunner.query(
            `ALTER TABLE "user" ALTER COLUMN "role" TYPE "public"."user_role_enum" USING "role"::"text"::"public"."user_role_enum"`,
        )
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'user'`)
        await queryRunner.query(`DROP TYPE "public"."user_role_enum_old"`)
        await queryRunner.query(
            `ALTER TABLE "results" ADD CONSTRAINT "FK_5ed565c92bddfe7d2bad52221e9" FOREIGN KEY ("organinzation_id") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
        await queryRunner.query(
            `ALTER TABLE "results" ADD CONSTRAINT "FK_ce51789e88df31e8f418ecbecde" FOREIGN KEY ("equipment_id") REFERENCES "equipment_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
        await queryRunner.query(
            `ALTER TABLE "results" ADD CONSTRAINT "FK_45e5cb06625a1f3b594cfa15932" FOREIGN KEY ("ghgEquipment_id") REFERENCES "ghg_equipment_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "results" DROP CONSTRAINT "FK_45e5cb06625a1f3b594cfa15932"`,
        )
        await queryRunner.query(
            `ALTER TABLE "results" DROP CONSTRAINT "FK_ce51789e88df31e8f418ecbecde"`,
        )
        await queryRunner.query(
            `ALTER TABLE "results" DROP CONSTRAINT "FK_5ed565c92bddfe7d2bad52221e9"`,
        )
        await queryRunner.query(
            `CREATE TYPE "public"."user_role_enum_old" AS ENUM('envistide', 'superadmin', 'admin', 'fac_admin', 'validator', 'user')`,
        )
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" DROP DEFAULT`)
        await queryRunner.query(
            `ALTER TABLE "user" ALTER COLUMN "role" TYPE "public"."user_role_enum_old" USING "role"::"text"::"public"."user_role_enum_old"`,
        )
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'user'`)
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`)
        await queryRunner.query(
            `ALTER TYPE "public"."user_role_enum_old" RENAME TO "user_role_enum"`,
        )
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "ghgEquipment_id"`)
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "equipment_id"`)
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "organinzation_id"`)
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "disposed_units_recovered"`)
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "disposed_units_capacity"`)
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "existing_units_recharge"`)
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "new_units_capacity"`)
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "new_units_charge"`)
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "transferred_amount"`)
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "inventory_change"`)
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "number_of_months"`)
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "result_type"`)
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "status"`)
        await queryRunner.query(`DROP TYPE "public"."results_status_enum"`)
        await queryRunner.query(`ALTER TABLE "results" ADD "name" character varying NOT NULL`)
        await queryRunner.query(`ALTER TABLE "results" ADD "resultType" character varying NOT NULL`)
        await queryRunner.query(`ALTER TABLE "results" ADD "ghgEquipmentId" uuid`)
        await queryRunner.query(`ALTER TABLE "results" ADD "equipmentId" uuid`)
        await queryRunner.query(`ALTER TABLE "results" ADD "disposedUnitsRecovered" numeric(50,10)`)
        await queryRunner.query(`ALTER TABLE "results" ADD "disposedUnitsCapacity" numeric(50,10)`)
        await queryRunner.query(`ALTER TABLE "results" ADD "existingUnitsRecharge" numeric(50,10)`)
        await queryRunner.query(`ALTER TABLE "results" ADD "newUnitsCapacity" numeric(50,10)`)
        await queryRunner.query(`ALTER TABLE "results" ADD "newUnitsCharge" numeric(50,10)`)
        await queryRunner.query(`ALTER TABLE "results" ADD "transferredAmount" numeric(50,10)`)
        await queryRunner.query(`ALTER TABLE "results" ADD "inventoryChange" numeric(50,10)`)
        await queryRunner.query(`ALTER TABLE "results" ADD "numberOfMonths" integer`)
        await queryRunner.query(
            `ALTER TABLE "results" ADD CONSTRAINT "FK_d32f75b4ef575414fd72beb7f4c" FOREIGN KEY ("ghgEquipmentId") REFERENCES "ghg_equipment_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
        await queryRunner.query(
            `ALTER TABLE "results" ADD CONSTRAINT "FK_9373c67a2b45a843fcad712e2be" FOREIGN KEY ("equipmentId") REFERENCES "equipment_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
    }
}
