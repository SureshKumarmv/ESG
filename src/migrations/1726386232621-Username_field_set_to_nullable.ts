import { MigrationInterface, QueryRunner } from "typeorm"

export class UsernameFieldSetToNullable1726386232621 implements MigrationInterface {
    name = "UsernameFieldSetToNullable1726386232621"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "username" DROP NOT NULL`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "username" SET NOT NULL`)
    }
}
