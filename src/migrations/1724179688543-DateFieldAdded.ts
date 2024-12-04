import { MigrationInterface, QueryRunner } from "typeorm"

export class DateFieldAdded1724179688543 implements MigrationInterface {
    name = "DateFieldAdded1724179688543"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "epa_emissions" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
        )
        await queryRunner.query(
            `ALTER TABLE "epa_emissions" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
        )
        await queryRunner.query(`ALTER TABLE "epa_emissions" ADD "deletedAt" TIMESTAMP`)
        await queryRunner.query(
            `ALTER TABLE "defra_emissions" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
        )
        await queryRunner.query(
            `ALTER TABLE "defra_emissions" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
        )
        await queryRunner.query(`ALTER TABLE "defra_emissions" ADD "deletedAt" TIMESTAMP`)
        await queryRunner.query(
            `ALTER TABLE "ghg_emissions" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
        )
        await queryRunner.query(
            `ALTER TABLE "ghg_emissions" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
        )
        await queryRunner.query(`ALTER TABLE "ghg_emissions" ADD "deletedAt" TIMESTAMP`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ghg_emissions" DROP COLUMN "deletedAt"`)
        await queryRunner.query(`ALTER TABLE "ghg_emissions" DROP COLUMN "updatedAt"`)
        await queryRunner.query(`ALTER TABLE "ghg_emissions" DROP COLUMN "createdAt"`)
        await queryRunner.query(`ALTER TABLE "defra_emissions" DROP COLUMN "deletedAt"`)
        await queryRunner.query(`ALTER TABLE "defra_emissions" DROP COLUMN "updatedAt"`)
        await queryRunner.query(`ALTER TABLE "defra_emissions" DROP COLUMN "createdAt"`)
        await queryRunner.query(`ALTER TABLE "epa_emissions" DROP COLUMN "deletedAt"`)
        await queryRunner.query(`ALTER TABLE "epa_emissions" DROP COLUMN "updatedAt"`)
        await queryRunner.query(`ALTER TABLE "epa_emissions" DROP COLUMN "createdAt"`)
    }
}
