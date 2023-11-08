import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnToUserTable1678165368104 implements MigrationInterface {
  name = 'AddColumnToUserTable1678165368104';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'email',
        type: 'varchar',
        isNullable: false, // set to true if the column can be null
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'email');
  }
}
