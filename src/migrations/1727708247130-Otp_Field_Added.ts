import { MigrationInterface, QueryRunner } from "typeorm"

export class OtpFieldAdded1727708247130 implements MigrationInterface {
    name = "OtpFieldAdded1727708247130"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "otp" integer`)
        await queryRunner.query(`ALTER TABLE "user" ADD "otp_generated_at" bigint`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "otp_generated_at"`)
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "otp"`)
    }
}
