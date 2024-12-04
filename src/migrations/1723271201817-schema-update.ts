import { MigrationInterface, QueryRunner } from "typeorm"

export class SchemaUpdate1723271201817 implements MigrationInterface {
    name = "SchemaUpdate1723271201817"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "results" ADD "resultType" character varying NOT NULL`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "resultType"`)
    }
}
