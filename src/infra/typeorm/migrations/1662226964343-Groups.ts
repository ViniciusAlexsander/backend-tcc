import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Groups1662226964343 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'groups',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'title', type: 'varchar' },
          { name: 'description', type: 'varchar', isNullable: true },
          // TO-DO add image
          { name: 'created_at', type: 'timestamp', default: 'now()' },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('groups');
  }
}
