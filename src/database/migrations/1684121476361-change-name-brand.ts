import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeNameBrand1684121476361 implements MigrationInterface {
  name = 'ChangeNameBrand1684121476361';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "brand" DROP CONSTRAINT "UQ_5f468ae5696f07da025138e38f7"`,
    );
    await queryRunner.query(`ALTER TABLE "brand" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "brand" ADD "name" character varying(230) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "brand" ADD CONSTRAINT "UQ_5f468ae5696f07da025138e38f7" UNIQUE ("name")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "brand" DROP CONSTRAINT "UQ_5f468ae5696f07da025138e38f7"`,
    );
    await queryRunner.query(`ALTER TABLE "brand" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "brand" ADD "name" character varying(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "brand" ADD CONSTRAINT "UQ_5f468ae5696f07da025138e38f7" UNIQUE ("name")`,
    );
  }
}
