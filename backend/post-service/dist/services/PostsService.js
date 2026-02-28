"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PostsRepository_1 = __importDefault(require("@/repositories/PostsRepository"));
class PostsService {
    getAll() {
        return PostsRepository_1.default.getAll();
    }
    getById(id) {
        return PostsRepository_1.default.getById(id);
    }
    create(data) {
        return PostsRepository_1.default.create(data);
    }
    update(id, data) {
        return PostsRepository_1.default.update(id, data);
    }
    delete(id) {
        return PostsRepository_1.default.delete(id);
    }
    search(term) {
        if (!term || term.trim() === "")
            return [];
        return PostsRepository_1.default.search(term);
    }
}
exports.default = new PostsService();
