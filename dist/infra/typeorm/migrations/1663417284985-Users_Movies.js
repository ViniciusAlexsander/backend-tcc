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
exports.UsersMovies1663417284985 = void 0;
const typeorm_1 = require("typeorm");
class UsersMovies1663417284985 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: 'users_movies',
                columns: [
                    { name: 'id', type: 'uuid', isPrimary: true },
                    { name: 'user_id', type: 'uuid' },
                    { name: 'movie_id', type: 'varchar' },
                    { name: 'watched', type: 'boolean', default: null, isNullable: true },
                    { name: 'rating', type: 'integer', isNullable: true },
                    { name: 'favorite', type: 'boolean', default: false },
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
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('users_movies');
        });
    }
}
exports.UsersMovies1663417284985 = UsersMovies1663417284985;
