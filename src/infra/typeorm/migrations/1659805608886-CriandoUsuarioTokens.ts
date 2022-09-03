import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CriandoUsuarioTokens1659805608886 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "usuario_tokens",
        columns: [
          { name: "id", type: "uuid", isPrimary: true },
          { name: "refresh_token", type: "varchar" },
          { name: "usuario_id", type: "uuid" },
          { name: "data_expiracao", type: "timestamp" },
          { name: "criado_em", type: "timestamp", default: "now()" },
        ],
        foreignKeys: [
          {
            name: "FKUsuarioToken",
            referencedTableName: "usuarios",
            referencedColumnNames: ["id"],
            columnNames: ["usuario_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("usuario_tokens");
  }
}
