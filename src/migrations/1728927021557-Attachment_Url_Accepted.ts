import { MigrationInterface, QueryRunner } from "typeorm"

export class AttachmentUrlAccepted1728927021557 implements MigrationInterface {
    name = "AttachmentUrlAccepted1728927021557"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "results" ADD "remarks" character varying`)
        await queryRunner.query(`ALTER TABLE "results" ADD "attachment" character varying`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "attachment"`)
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "remarks"`)
    }
}
