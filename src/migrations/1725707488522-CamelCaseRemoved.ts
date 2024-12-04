import { MigrationInterface, QueryRunner } from "typeorm"

export class CamelCaseRemoved1725707488522 implements MigrationInterface {
    name = "CamelCaseRemoved1725707488522"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "deletedAt"`)
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "createdAt"`)
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "updatedAt"`)
        await queryRunner.query(
            `ALTER TABLE "results" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
        )
        await queryRunner.query(
            `ALTER TABLE "results" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`,
        )
        await queryRunner.query(`ALTER TABLE "results" ADD "deleted_at" TIMESTAMP`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "deleted_at"`)
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "updated_at"`)
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "created_at"`)
        await queryRunner.query(
            `ALTER TABLE "results" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
        )
        await queryRunner.query(
            `ALTER TABLE "results" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
        )
        await queryRunner.query(`ALTER TABLE "results" ADD "deletedAt" TIMESTAMP`)
    }
}
