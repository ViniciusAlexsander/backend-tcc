import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Sessions1662680481974 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'sessions',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'group_id', type: 'uuid' },
          { name: 'movie_id', type: 'varchar' },
          { name: 'assisted_in_id', type: 'varchar', isNullable: true },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
        ],
        foreignKeys: [
          {
            name: 'FKGroup',
            referencedTableName: 'groups',
            referencedColumnNames: ['id'],
            columnNames: ['group_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('sessions');
  }
}
