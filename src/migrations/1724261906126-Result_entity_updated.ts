import { MigrationInterface, QueryRunner } from "typeorm"

export class ResultEntityUpdated1724261906126 implements MigrationInterface {
    name = "ResultEntityUpdated1724261906126"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "results" ADD "decrease_inventory_at_begining" numeric(50,10)`,
        )
        await queryRunner.query(
            `ALTER TABLE "results" ADD "decrease_inventory_at_end" numeric(50,10)`,
        )
        await queryRunner.query(
            `ALTER TABLE "results" ADD "result_decrease_inventory" numeric(50,10)`,
        )
        await queryRunner.query(
            `ALTER TABLE "results" ADD "purchases_producers_in_bulk" numeric(50,10)`,
        )
        await queryRunner.query(
            `ALTER TABLE "results" ADD "purchases_equipment_refrigerant" numeric(50,10)`,
        )
        await queryRunner.query(
            `ALTER TABLE "results" ADD "purchases_contractors_refrigerant" numeric(50,10)`,
        )
        await queryRunner.query(
            `ALTER TABLE "results" ADD "purchases_offsite_recycling" numeric(50,10)`,
        )
        await queryRunner.query(`ALTER TABLE "results" ADD "result_purchaes" numeric(50,10)`)
        await queryRunner.query(`ALTER TABLE "results" ADD "sales_equipment_other" numeric(50,10)`)
        await queryRunner.query(`ALTER TABLE "results" ADD "sales_sold_other" numeric(50,10)`)
        await queryRunner.query(
            `ALTER TABLE "results" ADD "sales_refrigerant_returned_supplier" numeric(50,10)`,
        )
        await queryRunner.query(`ALTER TABLE "results" ADD "sales_recycling" numeric(50,10)`)
        await queryRunner.query(`ALTER TABLE "results" ADD "sales_sent_offsite" numeric(50,10)`)
        await queryRunner.query(`ALTER TABLE "results" ADD "result_sales" numeric(50,10)`)
        await queryRunner.query(
            `ALTER TABLE "results" ADD "increase_charge_new_equipment" numeric(50,10)`,
        )
        await queryRunner.query(`ALTER TABLE "results" ADD "increase_full_charge" numeric(50,10)`)
        await queryRunner.query(
            `ALTER TABLE "results" ADD "increase_original_total_full_charge" numeric(50,10)`,
        )
        await queryRunner.query(
            `ALTER TABLE "results" ADD "increase_different_refrigerant" numeric(50,10)`,
        )
        await queryRunner.query(`ALTER TABLE "results" ADD "result_increase" numeric(50,10)`)
        await queryRunner.query(`ALTER TABLE "results" ADD "emissions" numeric(50,10)`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "emissions"`)
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "result_increase"`)
        await queryRunner.query(
            `ALTER TABLE "results" DROP COLUMN "increase_different_refrigerant"`,
        )
        await queryRunner.query(
            `ALTER TABLE "results" DROP COLUMN "increase_original_total_full_charge"`,
        )
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "increase_full_charge"`)
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "increase_charge_new_equipment"`)
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "result_sales"`)
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "sales_sent_offsite"`)
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "sales_recycling"`)
        await queryRunner.query(
            `ALTER TABLE "results" DROP COLUMN "sales_refrigerant_returned_supplier"`,
        )
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "sales_sold_other"`)
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "sales_equipment_other"`)
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "result_purchaes"`)
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "purchases_offsite_recycling"`)
        await queryRunner.query(
            `ALTER TABLE "results" DROP COLUMN "purchases_contractors_refrigerant"`,
        )
        await queryRunner.query(
            `ALTER TABLE "results" DROP COLUMN "purchases_equipment_refrigerant"`,
        )
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "purchases_producers_in_bulk"`)
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "result_decrease_inventory"`)
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "decrease_inventory_at_end"`)
        await queryRunner.query(
            `ALTER TABLE "results" DROP COLUMN "decrease_inventory_at_begining"`,
        )
    }
}
