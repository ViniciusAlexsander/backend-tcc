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
exports.TokensUsers1662226887373 = void 0;
const typeorm_1 = require("typeorm");
class TokensUsers1662226887373 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
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
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('tokens_users');
        });
    }
}
exports.TokensUsers1662226887373 = TokensUsers1662226887373;
