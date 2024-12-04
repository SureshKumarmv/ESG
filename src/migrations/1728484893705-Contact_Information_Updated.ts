import { MigrationInterface, QueryRunner } from "typeorm"

export class ContactInformationUpdated1728484893705 implements MigrationInterface {
    name = "ContactInformationUpdated1728484893705"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "contact"`)
        await queryRunner.query(`ALTER TABLE "organization" ADD "contact" jsonb`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "contact"`)
        await queryRunner.query(`ALTER TABLE "organization" ADD "contact" text`)
    }
}
