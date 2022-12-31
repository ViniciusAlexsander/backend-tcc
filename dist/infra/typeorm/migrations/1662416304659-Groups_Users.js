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
exports.GroupsUsers1662416304659 = void 0;
const typeorm_1 = require("typeorm");
class GroupsUsers1662416304659 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: 'groups_users',
                columns: [
                    { name: 'id', type: 'uuid', isPrimary: true },
                    { name: 'user_id', type: 'uuid' },
                    { name: 'group_id', type: 'uuid' },
                    { name: 'is_admin', type: 'boolean', default: false },
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
            yield queryRunner.dropTable('groups_users');
        });
    }
}
exports.GroupsUsers1662416304659 = GroupsUsers1662416304659;
