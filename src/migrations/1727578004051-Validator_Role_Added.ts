import { MigrationInterface, QueryRunner } from "typeorm"

export class ValidatorRoleAdded1727578004051 implements MigrationInterface {
    name = "ValidatorRoleAdded1727578004051"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TYPE "public"."user_role_enum" RENAME TO "user_role_enum_old"`,
        )
        await queryRunner.query(
            `CREATE TYPE "public"."user_role_enum" AS ENUM('envistide', 'superadmin', 'admin', 'fac_admin', 'validator', 'user')`,
        )
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" DROP DEFAULT`)
        await queryRunner.query(
            `ALTER TABLE "user" ALTER COLUMN "role" TYPE "public"."user_role_enum" USING "role"::"text"::"public"."user_role_enum"`,
        )
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'user'`)
        await queryRunner.query(`DROP TYPE "public"."user_role_enum_old"`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TYPE "public"."user_role_enum_old" AS ENUM('envistide', 'superadmin', 'admin', 'fac_admin', 'user')`,
        )
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" DROP DEFAULT`)
        await queryRunner.query(
            `ALTER TABLE "user" ALTER COLUMN "role" TYPE "public"."user_role_enum_old" USING "role"::"text"::"public"."user_role_enum_old"`,
        )
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'user'`)
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`)
        await queryRunner.query(
            `ALTER TYPE "public"."user_role_enum_old" RENAME TO "user_role_enum"`,
        )
    }
}