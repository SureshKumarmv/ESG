import { MigrationInterface, QueryRunner } from "typeorm"

export class GhgGasPaginationAdded1732354896755 implements MigrationInterface {
    name = "GhgGasPaginationAdded1732354896755"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ghg_gases" DROP COLUMN "createdAt"`)
        await queryRunner.query(`ALTER TABLE "ghg_gases" DROP COLUMN "updatedAt"`)
        await queryRunner.query(`ALTER TABLE "ghg_gases" DROP COLUMN "deletedAt"`)
        await queryRunner.query(
            `ALTER TABLE "ghg_gases" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
        )
        await queryRunner.query(
            `ALTER TABLE "ghg_gases" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`,
        )
        await queryRunner.query(`ALTER TABLE "ghg_gases" ADD "deleted_at" TIMESTAMP`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ghg_gases" DROP COLUMN "deleted_at"`)
        await queryRunner.query(`ALTER TABLE "ghg_gases" DROP COLUMN "updated_at"`)
        await queryRunner.query(`ALTER TABLE "ghg_gases" DROP COLUMN "created_at"`)
        await queryRunner.query(`ALTER TABLE "ghg_gases" ADD "deletedAt" TIMESTAMP`)
        await queryRunner.query(
            `ALTER TABLE "ghg_gases" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
        )
        await queryRunner.query(
            `ALTER TABLE "ghg_gases" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
        )
    }
}
