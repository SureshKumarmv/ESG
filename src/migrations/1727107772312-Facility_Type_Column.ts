import { MigrationInterface, QueryRunner } from "typeorm"

export class FacilityTypeColumn1727107772312 implements MigrationInterface {
    name = "FacilityTypeColumn1727107772312"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "facility" ADD "type" character varying(255)`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "facility" DROP COLUMN "type"`)
    }
}
