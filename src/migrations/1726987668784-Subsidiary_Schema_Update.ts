import { MigrationInterface, QueryRunner } from "typeorm"

export class SubsidiarySchemaUpdate1726987668784 implements MigrationInterface {
    name = "SubsidiarySchemaUpdate1726987668784"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subsidiary" ADD "country" character varying(255)`)
        await queryRunner.query(`ALTER TABLE "subsidiary" ADD "state" character varying(255)`)
        await queryRunner.query(`ALTER TABLE "subsidiary" ADD "address" character varying(255)`)
        await queryRunner.query(
            `ALTER TABLE "subsidiary" ADD "address_line_1" character varying(255)`,
        )
        await queryRunner.query(
            `ALTER TABLE "subsidiary" ADD "address_line_2" character varying(255)`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subsidiary" DROP COLUMN "address_line_2"`)
        await queryRunner.query(`ALTER TABLE "subsidiary" DROP COLUMN "address_line_1"`)
        await queryRunner.query(`ALTER TABLE "subsidiary" DROP COLUMN "address"`)
        await queryRunner.query(`ALTER TABLE "subsidiary" DROP COLUMN "state"`)
        await queryRunner.query(`ALTER TABLE "subsidiary" DROP COLUMN "country"`)
    }
}
