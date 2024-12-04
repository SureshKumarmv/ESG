import { MigrationInterface, QueryRunner } from "typeorm"

export class SubsidiaryFacilityAddedInResults1732352193991 implements MigrationInterface {
    name = "SubsidiaryFacilityAddedInResults1732352193991"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "results" ADD "subsidiary_id" uuid`)
        await queryRunner.query(`ALTER TABLE "results" ADD "facility_id" uuid`)
        await queryRunner.query(
            `ALTER TYPE "public"."results_status_enum" RENAME TO "results_status_enum_old"`,
        )
        await queryRunner.query(
            `CREATE TYPE "public"."results_status_enum" AS ENUM('draft', 'pending', 'completed', 'rejected')`,
        )
        await queryRunner.query(`ALTER TABLE "results" ALTER COLUMN "status" DROP DEFAULT`)
        await queryRunner.query(
            `ALTER TABLE "results" ALTER COLUMN "status" TYPE "public"."results_status_enum" USING "status"::"text"::"public"."results_status_enum"`,
        )
        await queryRunner.query(`ALTER TABLE "results" ALTER COLUMN "status" SET DEFAULT 'draft'`)
        await queryRunner.query(`DROP TYPE "public"."results_status_enum_old"`)
        await queryRunner.query(
            `ALTER TABLE "results" ADD CONSTRAINT "FK_dc65803642f2e0b3dc826bd1605" FOREIGN KEY ("subsidiary_id") REFERENCES "subsidiary"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
        await queryRunner.query(
            `ALTER TABLE "results" ADD CONSTRAINT "FK_2c7f7e8697e49df442f58fddd5c" FOREIGN KEY ("facility_id") REFERENCES "facility"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "results" DROP CONSTRAINT "FK_2c7f7e8697e49df442f58fddd5c"`,
        )
        await queryRunner.query(
            `ALTER TABLE "results" DROP CONSTRAINT "FK_dc65803642f2e0b3dc826bd1605"`,
        )
        await queryRunner.query(
            `CREATE TYPE "public"."results_status_enum_old" AS ENUM('draft', 'pending', 'completed')`,
        )
        await queryRunner.query(`ALTER TABLE "results" ALTER COLUMN "status" DROP DEFAULT`)
        await queryRunner.query(
            `ALTER TABLE "results" ALTER COLUMN "status" TYPE "public"."results_status_enum_old" USING "status"::"text"::"public"."results_status_enum_old"`,
        )
        await queryRunner.query(`ALTER TABLE "results" ALTER COLUMN "status" SET DEFAULT 'draft'`)
        await queryRunner.query(`DROP TYPE "public"."results_status_enum"`)
        await queryRunner.query(
            `ALTER TYPE "public"."results_status_enum_old" RENAME TO "results_status_enum"`,
        )
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "facility_id"`)
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "subsidiary_id"`)
    }
}
