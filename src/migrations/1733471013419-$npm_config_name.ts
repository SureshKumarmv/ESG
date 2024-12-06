import { MigrationInterface, QueryRunner } from "typeorm"

export class $npmConfigName1733471013419 implements MigrationInterface {
    name = " $npmConfigName1733471013419"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "Mobile_Vehicle_Emission_Defra" DROP COLUMN "kgco2eCO2"`,
        )
        await queryRunner.query(`ALTER TABLE "Mobile_Vehicle_Emission_Defra" ADD "kgco2eCO2" json`)
        await queryRunner.query(
            `ALTER TABLE "Mobile_Vehicle_Emission_Defra" DROP COLUMN "kgco2eCH4"`,
        )
        await queryRunner.query(`ALTER TABLE "Mobile_Vehicle_Emission_Defra" ADD "kgco2eCH4" json`)
        await queryRunner.query(
            `ALTER TABLE "Mobile_Vehicle_Emission_Defra" DROP COLUMN "kgco2eN2O"`,
        )
        await queryRunner.query(`ALTER TABLE "Mobile_Vehicle_Emission_Defra" ADD "kgco2eN2O" json`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "Mobile_Vehicle_Emission_Defra" DROP COLUMN "kgco2eN2O"`,
        )
        await queryRunner.query(
            `ALTER TABLE "Mobile_Vehicle_Emission_Defra" ADD "kgco2eN2O" numeric(50,10) NOT NULL`,
        )
        await queryRunner.query(
            `ALTER TABLE "Mobile_Vehicle_Emission_Defra" DROP COLUMN "kgco2eCH4"`,
        )
        await queryRunner.query(
            `ALTER TABLE "Mobile_Vehicle_Emission_Defra" ADD "kgco2eCH4" numeric(50,10) NOT NULL`,
        )
        await queryRunner.query(
            `ALTER TABLE "Mobile_Vehicle_Emission_Defra" DROP COLUMN "kgco2eCO2"`,
        )
        await queryRunner.query(
            `ALTER TABLE "Mobile_Vehicle_Emission_Defra" ADD "kgco2eCO2" numeric(50,10) NOT NULL`,
        )
    }
}
