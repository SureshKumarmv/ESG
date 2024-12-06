import { MigrationInterface, QueryRunner } from "typeorm"

export class $npmConfigName1733471078002 implements MigrationInterface {
    name = " $npmConfigName1733471078002"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Mobile_Vehicle_Emission_Defra" DROP COLUMN "unit"`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "Mobile_Vehicle_Emission_Defra" ADD "unit" character varying(50) NOT NULL`,
        )
    }
}
