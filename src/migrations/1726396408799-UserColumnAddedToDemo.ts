import { MigrationInterface, QueryRunner } from "typeorm"

export class UserColumnAddedToDemo1726396408799 implements MigrationInterface {
    name = "UserColumnAddedToDemo1726396408799"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "demo_submissions" ADD "user_id" uuid`)
        await queryRunner.query(
            `ALTER TABLE "demo_submissions" ADD CONSTRAINT "FK_b4488eb0cce994664028c2955d5" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "demo_submissions" DROP CONSTRAINT "FK_b4488eb0cce994664028c2955d5"`,
        )
        await queryRunner.query(`ALTER TABLE "demo_submissions" DROP COLUMN "user_id"`)
    }
}
