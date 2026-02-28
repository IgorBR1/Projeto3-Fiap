"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PostsService_1 = __importDefault(require("@/services/PostsService"));
class PostsController {
    async getAll(_req, res) {
        const posts = await PostsService_1.default.getAll();
        return res.json(posts);
    }
    async getById(req, res) {
        const id = Number(req.params.id);
        const post = await PostsService_1.default.getById(id);
        return res.json(post);
    }
    async create(req, res) {
        const { title, content } = req.body;
        const newPost = await PostsService_1.default.create({ title, content });
        return res.status(201).json(newPost);
    }
    async update(req, res) {
        const id = Number(req.params.id);
        const { title, content } = req.body;
        const updated = await PostsService_1.default.update(id, { title, content });
        return res.json(updated);
    }
    async delete(req, res) {
        const id = Number(req.params.id);
        const deleted = await PostsService_1.default.delete(id);
        return res.json(deleted);
    }
    async search(req, res) {
        const term = req.query.q;
        const posts = await PostsService_1.default.search(term);
        return res.json(posts);
    }
}
exports.default = new PostsController();
