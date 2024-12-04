import { MigrationInterface, QueryRunner } from "typeorm"

export class GuestArrayAdded1727583604213 implements MigrationInterface {
    name = "GuestArrayAdded1727583604213"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "demo_submissions" ADD "guests" jsonb`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "demo_submissions" DROP COLUMN "guests"`)
    }
}
