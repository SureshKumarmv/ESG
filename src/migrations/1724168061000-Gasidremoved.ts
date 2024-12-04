import { MigrationInterface, QueryRunner } from "typeorm"

export class Gasidremoved1724168061000 implements MigrationInterface {
    name = "Gasidremoved1724168061000"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "epa_emissions" DROP CONSTRAINT "FK_c6669db63fd5fa2657825353165"`,
        )
        await queryRunner.query(`ALTER TABLE "epa_emissions" ALTER COLUMN "gasId" DROP NOT NULL`)
        await queryRunner.query(
            `ALTER TABLE "epa_emissions" ADD CONSTRAINT "FK_c6669db63fd5fa2657825353165" FOREIGN KEY ("gasId") REFERENCES "epa_gases"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "epa_emissions" DROP CONSTRAINT "FK_c6669db63fd5fa2657825353165"`,
        )
        await queryRunner.query(`ALTER TABLE "epa_emissions" ALTER COLUMN "gasId" SET NOT NULL`)
        await queryRunner.query(
            `ALTER TABLE "epa_emissions" ADD CONSTRAINT "FK_c6669db63fd5fa2657825353165" FOREIGN KEY ("gasId") REFERENCES "epa_gases"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
    }
}
