import { MigrationInterface, QueryRunner } from "typeorm"

export class MailingFaxColumnsAdded1728402579470 implements MigrationInterface {
    name = "MailingFaxColumnsAdded1728402579470"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "organization" ADD "mailing_address" character varying(255)`,
        )
        await queryRunner.query(`ALTER TABLE "organization" ADD "fax" character varying(255)`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "fax"`)
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "mailing_address"`)
    }
}
