import { MigrationInterface, QueryRunner } from "typeorm"

export class SchemaUpdate1723270392511 implements MigrationInterface {
    name = "SchemaUpdate1723270392511"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "results" DROP CONSTRAINT "FK_165e8b6be01cd1b6822acd414b7"`,
        )
        await queryRunner.query(`ALTER TABLE "results" RENAME COLUMN "gasId" TO "gas"`)
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "gas"`)
        await queryRunner.query(`ALTER TABLE "results" ADD "gas" character varying`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "gas"`)
        await queryRunner.query(`ALTER TABLE "results" ADD "gas" uuid`)
        await queryRunner.query(`ALTER TABLE "results" RENAME COLUMN "gas" TO "gasId"`)
        await queryRunner.query(
            `ALTER TABLE "results" ADD CONSTRAINT "FK_165e8b6be01cd1b6822acd414b7" FOREIGN KEY ("gasId") REFERENCES "epa_gases"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
    }
}
