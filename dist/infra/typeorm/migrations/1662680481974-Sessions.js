"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sessions1662680481974 = void 0;
const typeorm_1 = require("typeorm");
class Sessions1662680481974 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: 'sessions',
                columns: [
                    { name: 'id', type: 'uuid', isPrimary: true },
                    { name: 'group_id', type: 'uuid' },
                    { name: 'movie_id', type: 'varchar' },
                    { name: 'total_rating', type: 'integer', isNullable: true },
                    { name: 'assisted_in_id', type: 'varchar', isNullable: true },
                    { name: 'session_day', type: 'timestamp' },
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
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('sessions');
        });
    }
}
exports.Sessions1662680481974 = Sessions1662680481974;
