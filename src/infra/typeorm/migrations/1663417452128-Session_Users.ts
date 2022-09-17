import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class SessionUsers1663417452128 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'session_users',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'session_id', type: 'uuid' },
          { name: 'user_id', type: 'uuid' },
          { name: 'rating', type: 'integer' },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
        ],
        foreignKeys: [
          {
            name: 'FKSession',
            referencedTableName: 'sessions',
            referencedColumnNames: ['id'],
            columnNames: ['session_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FKUser',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('session_users');
  }
}
