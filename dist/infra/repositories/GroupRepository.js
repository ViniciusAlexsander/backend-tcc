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
exports.GroupRepository = void 0;
const Group_1 = require("../entities/Group");
const typeorm_1 = require("typeorm");
class GroupRepository {
    constructor() {
        this.repository = (0, typeorm_1.getRepository)(Group_1.Group);
    }
    index({ id, title }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.find({
                where: Object.assign(Object.assign({}, (id && { id })), (title && {
                    title: (0, typeorm_1.Raw)((alias) => `LOWER(${alias}) Like LOWER('%${title}%')`),
                })),
                relations: ['users', 'groupsUsers'],
            });
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.findOne(id);
        });
    }
    createGroup({ title, description }) {
        return __awaiter(this, void 0, void 0, function* () {
            const group = this.repository.create({
                title,
                description,
            });
            yield this.repository.save(group);
            return group;
        });
    }
    deleteGroup({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.delete(id);
        });
    }
}
exports.GroupRepository = GroupRepository;
