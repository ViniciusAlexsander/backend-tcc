import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class MovieComments1663417939357 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'movie_comments',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'movie_id', type: 'uuid' },
          { name: 'user_id', type: 'uuid' },
          { name: 'comment', type: 'integer' },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
        ],
        foreignKeys: [
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
    await queryRunner.dropTable('movie_comments');
  }
}
