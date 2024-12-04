import { MigrationInterface, QueryRunner } from "typeorm"

export class PaginationAdded1725559863208 implements MigrationInterface {
    name = "PaginationAdded1725559863208"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "results" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
        )
        await queryRunner.query(
            `ALTER TABLE "results" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
        )
        await queryRunner.query(`ALTER TABLE "results" ADD "deletedAt" TIMESTAMP`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "deletedAt"`)
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "updatedAt"`)
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "createdAt"`)
    }
}
