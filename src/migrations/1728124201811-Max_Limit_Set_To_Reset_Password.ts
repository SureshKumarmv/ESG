import { MigrationInterface, QueryRunner } from "typeorm"

export class MaxLimitSetToResetPassword1728124201811 implements MigrationInterface {
    name = "MaxLimitSetToResetPassword1728124201811"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "password_reset_count" integer DEFAULT '0'`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password_reset_count"`)
    }
}
