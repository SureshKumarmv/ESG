import { MigrationInterface, QueryRunner } from "typeorm"

export class OrganizationSchmeaUpdate1726592496733 implements MigrationInterface {
    name = "OrganizationSchmeaUpdate1726592496733"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "worker_type"`)
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "headquarter_state"`)
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "headquarter_address"`)
        await queryRunner.query(
            `ALTER TABLE "organization" DROP COLUMN "headquarter_address_line_1"`,
        )
        await queryRunner.query(
            `ALTER TABLE "organization" DROP COLUMN "headquarter_address_line_2"`,
        )
        await queryRunner.query(`ALTER TABLE "organization" ADD "state" character varying(255)`)
        await queryRunner.query(`ALTER TABLE "organization" ADD "address" character varying(255)`)
        await queryRunner.query(
            `ALTER TABLE "organization" ADD "address_line_1" character varying(255)`,
        )
        await queryRunner.query(
            `ALTER TABLE "organization" ADD "address_line_2" character varying(255)`,
        )
        await queryRunner.query(
            `ALTER TABLE "organization" ADD "employment_type" character varying(255)`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "employment_type"`)
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "address_line_2"`)
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "address_line_1"`)
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "address"`)
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "state"`)
        await queryRunner.query(
            `ALTER TABLE "organization" ADD "headquarter_address_line_2" character varying(255)`,
        )
        await queryRunner.query(
            `ALTER TABLE "organization" ADD "headquarter_address_line_1" character varying(255)`,
        )
        await queryRunner.query(
            `ALTER TABLE "organization" ADD "headquarter_address" character varying(255)`,
        )
        await queryRunner.query(
            `ALTER TABLE "organization" ADD "headquarter_state" character varying(255)`,
        )
        await queryRunner.query(
            `ALTER TABLE "organization" ADD "worker_type" character varying(255)`,
        )
    }
}
