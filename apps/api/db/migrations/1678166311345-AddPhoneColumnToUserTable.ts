import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddPhoneColumnToUserTable1678166311345
  implements MigrationInterface
{
  name = 'AddPhoneColumnToUserTable1678166311345';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'phone',
        type: 'varchar',
        isNullable: false, // set to true if the column can be null
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'phone');
  }
}
