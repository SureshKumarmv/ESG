import { MigrationInterface, QueryRunner } from "typeorm"

export class Gasidremovedfromdefra1724168190941 implements MigrationInterface {
    name = "Gasidremovedfromdefra1724168190941"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "defra_emissions" DROP CONSTRAINT "FK_3cc4d29136ef04d005273fd3f30"`,
        )
        await queryRunner.query(`ALTER TABLE "defra_emissions" ALTER COLUMN "gasId" DROP NOT NULL`)
        await queryRunner.query(
            `ALTER TABLE "defra_emissions" ADD CONSTRAINT "FK_3cc4d29136ef04d005273fd3f30" FOREIGN KEY ("gasId") REFERENCES "defra_gases"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "defra_emissions" DROP CONSTRAINT "FK_3cc4d29136ef04d005273fd3f30"`,
        )
        await queryRunner.query(`ALTER TABLE "defra_emissions" ALTER COLUMN "gasId" SET NOT NULL`)
        await queryRunner.query(
            `ALTER TABLE "defra_emissions" ADD CONSTRAINT "FK_3cc4d29136ef04d005273fd3f30" FOREIGN KEY ("gasId") REFERENCES "defra_gases"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
    }
}
