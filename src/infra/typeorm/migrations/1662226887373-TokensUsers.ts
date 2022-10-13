import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class TokensUsers1662226887373 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tokens_users',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'refresh_token', type: 'varchar' },
          { name: 'user_id', type: 'uuid' },
          { name: 'expiration_date', type: 'timestamp' },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
        ],
        foreignKeys: [
          {
            name: 'FKTokenUser',
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
    await queryRunner.dropTable('tokens_users');
  }
}
