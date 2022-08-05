import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CriandoUsuarios1659658478067 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "usuarios",
        columns: [
          { name: "id", type: "uuid", isPrimary: true },
          { name: "nome", type: "varchar" },
          { name: "email", type: "varchar", isUnique: true },
          { name: "senha", type: "varchar" },
          { name: "created_at", type: "timestamp", default: "now()" },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("usuarios");
  }
}
