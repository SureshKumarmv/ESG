import { MigrationInterface, QueryRunner } from "typeorm"

export class FacilityAddedUnderSubsidiary1727578307561 implements MigrationInterface {
    name = "FacilityAddedUnderSubsidiary1727578307561"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "facility" ADD "subsidiary_id" uuid`)
        await queryRunner.query(
            `ALTER TABLE "facility" ADD CONSTRAINT "FK_c28669ecde2aa708949064b579d" FOREIGN KEY ("subsidiary_id") REFERENCES "subsidiary"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "facility" DROP CONSTRAINT "FK_c28669ecde2aa708949064b579d"`,
        )
        await queryRunner.query(`ALTER TABLE "facility" DROP COLUMN "subsidiary_id"`)
    }
}
