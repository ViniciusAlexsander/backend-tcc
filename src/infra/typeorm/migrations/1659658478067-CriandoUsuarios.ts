import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CriandoUsuarios1659658478067 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "tipo_perfil",
        columns: [
          { name: "id", type: "serial", isPrimary: true },
          { name: "descricao", type: "varchar" },
        ],
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "usuarios",
        columns: [
          { name: "id", type: "uuid", isPrimary: true },
          { name: "nome", type: "varchar" },
          { name: "email", type: "varchar", isUnique: true },
          { name: "senha", type: "varchar" },
          { name: "bio", type: "varchar" },
          { name: "tipo_perfil_id", type: "serial" },
          { name: "criado_em", type: "timestamp", default: "now()" },
        ],
        foreignKeys: [
          {
            name: "FKTipoPerfil",
            referencedTableName: "tipo_perfil",
            referencedColumnNames: ["id"],
            columnNames: ["tipo_perfil_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("usuarios");
    await queryRunner.dropTable("tipo_perfil");
  }
}
