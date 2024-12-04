import { MigrationInterface, QueryRunner } from "typeorm"

export class SlugifyAdded1725711705121 implements MigrationInterface {
    name = "SlugifyAdded1725711705121"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "demo_submissions" ADD "company_slug" character varying NOT NULL`,
        )
        await queryRunner.query(`ALTER TABLE "demo_submissions" DROP COLUMN "company"`)
        await queryRunner.query(
            `ALTER TABLE "demo_submissions" ADD "company" character varying(150) NOT NULL`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "demo_submissions" DROP COLUMN "company"`)
        await queryRunner.query(
            `ALTER TABLE "demo_submissions" ADD "company" character varying NOT NULL`,
        )
        await queryRunner.query(`ALTER TABLE "demo_submissions" DROP COLUMN "company_slug"`)
    }
}
