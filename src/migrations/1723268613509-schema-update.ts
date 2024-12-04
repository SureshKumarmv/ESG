import { MigrationInterface, QueryRunner } from "typeorm"

export class SchemaUpdate1723268613509 implements MigrationInterface {
    name = "SchemaUpdate1723268613509"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "results" DROP CONSTRAINT "FK_91b9f421ba60f30137d167fdd87"`,
        )
        await queryRunner.query(`ALTER TABLE "results" RENAME COLUMN "activityId" TO "activity"`)
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "activity"`)
        await queryRunner.query(`ALTER TABLE "results" ADD "activity" character varying`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "results" DROP COLUMN "activity"`)
        await queryRunner.query(`ALTER TABLE "results" ADD "activity" uuid`)
        await queryRunner.query(`ALTER TABLE "results" RENAME COLUMN "activity" TO "activityId"`)
        await queryRunner.query(
            `ALTER TABLE "results" ADD CONSTRAINT "FK_91b9f421ba60f30137d167fdd87" FOREIGN KEY ("activityId") REFERENCES "activities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
    }
}
