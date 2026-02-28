"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("@/database/prisma"));
class PostsRepository {
    async getAll() {
        return prisma_1.default.post.findMany({
            orderBy: { id: "asc" },
        });
    }
    async getById(id) {
        return prisma_1.default.post.findUnique({
            where: { id },
        });
    }
    async create(data) {
        return prisma_1.default.post.create({
            data,
        });
    }
    async update(id, data) {
        return prisma_1.default.post.update({
            where: { id },
            data,
        });
    }
    async delete(id) {
        return prisma_1.default.post.delete({
            where: { id },
        });
    }
    async search(term) {
        return prisma_1.default.post.findMany({
            where: {
                OR: [
                    { title: { contains: term, mode: "insensitive" } },
                    { content: { contains: term, mode: "insensitive" } },
                ],
            },
            orderBy: { id: "asc" },
        });
    }
}
exports.default = new PostsRepository();
