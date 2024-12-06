import { MigrationInterface, QueryRunner } from "typeorm"

export class $npmConfigName1733464807468 implements MigrationInterface {
    name = " $npmConfigName1733464807468"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "Mobile_Defra_Result" DROP CONSTRAINT "FK_3b0b319d237d630e225a8589355"`,
        )
        await queryRunner.query(
            `ALTER TABLE "Mobile_Defra_Result" DROP CONSTRAINT "FK_9bac8e5376075b61cae38a0a921"`,
        )
        await queryRunner.query(
            `ALTER TABLE "Mobile_Defra_Result" DROP CONSTRAINT "FK_3a0f03f79f74d416c6672dde821"`,
        )
        await queryRunner.query(`ALTER TABLE "Mobile_Defra_Result" ADD "activityId" uuid`)
        await queryRunner.query(`ALTER TABLE "Mobile_Defra_Result" ADD "vehicleId" uuid`)
        await queryRunner.query(`ALTER TABLE "Mobile_Defra_Result" ADD "variantId" uuid`)
        await queryRunner.query(
            `ALTER TABLE "Mobile_Vehicle_Variant_Defra" DROP CONSTRAINT "UQ_d92c6881b734b6fc055bf6e3602"`,
        )
        await queryRunner.query(
            `ALTER TABLE "Mobile_Defra_Result" ADD CONSTRAINT "FK_9e84fd0cde621ffce69b101fe65" FOREIGN KEY ("activityId") REFERENCES "Mobile_Activity_Defra"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
        await queryRunner.query(
            `ALTER TABLE "Mobile_Defra_Result" ADD CONSTRAINT "FK_e58bb0d7a867f1cca9c603e0b23" FOREIGN KEY ("vehicleId") REFERENCES "Mobile_Vehicle_Defra"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
        await queryRunner.query(
            `ALTER TABLE "Mobile_Defra_Result" ADD CONSTRAINT "FK_078d1d0c768f8166a3c66448436" FOREIGN KEY ("variantId") REFERENCES "Mobile_Vehicle_Variant_Defra"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "Mobile_Defra_Result" DROP CONSTRAINT "FK_078d1d0c768f8166a3c66448436"`,
        )
        await queryRunner.query(
            `ALTER TABLE "Mobile_Defra_Result" DROP CONSTRAINT "FK_e58bb0d7a867f1cca9c603e0b23"`,
        )
        await queryRunner.query(
            `ALTER TABLE "Mobile_Defra_Result" DROP CONSTRAINT "FK_9e84fd0cde621ffce69b101fe65"`,
        )
        await queryRunner.query(
            `ALTER TABLE "Mobile_Vehicle_Variant_Defra" ADD CONSTRAINT "UQ_d92c6881b734b6fc055bf6e3602" UNIQUE ("name")`,
        )
        await queryRunner.query(`ALTER TABLE "Mobile_Defra_Result" DROP COLUMN "variantId"`)
        await queryRunner.query(`ALTER TABLE "Mobile_Defra_Result" DROP COLUMN "vehicleId"`)
        await queryRunner.query(`ALTER TABLE "Mobile_Defra_Result" DROP COLUMN "activityId"`)
        await queryRunner.query(
            `ALTER TABLE "Mobile_Defra_Result" ADD CONSTRAINT "FK_3a0f03f79f74d416c6672dde821" FOREIGN KEY ("activity") REFERENCES "Mobile_Activity_Defra"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
        await queryRunner.query(
            `ALTER TABLE "Mobile_Defra_Result" ADD CONSTRAINT "FK_9bac8e5376075b61cae38a0a921" FOREIGN KEY ("vehicle") REFERENCES "Mobile_Vehicle_Defra"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
        await queryRunner.query(
            `ALTER TABLE "Mobile_Defra_Result" ADD CONSTRAINT "FK_3b0b319d237d630e225a8589355" FOREIGN KEY ("variant") REFERENCES "Mobile_Vehicle_Variant_Defra"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
    }
}
