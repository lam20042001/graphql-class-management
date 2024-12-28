import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateStudentTable1735016514822 implements MigrationInterface {
  name = 'CreateStudentTable1735016514822';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "student" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "classid" integer, CONSTRAINT "UQ_eead2cd6e5be2c86303b786bff9" UNIQUE ("name"), CONSTRAINT "PK_3d8016e1cb58429474a3c041904" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "class" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_0b9024d21bdfba8b1bd1c300eae" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "student" ADD CONSTRAINT "FK_97d7c4427a252e27738a32a3959" FOREIGN KEY ("classid") REFERENCES "class"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "student" DROP CONSTRAINT "FK_97d7c4427a252e27738a32a3959"`,
    );
    await queryRunner.query(`DROP TABLE "class"`);
    await queryRunner.query(`DROP TABLE "student"`);
  }
}
