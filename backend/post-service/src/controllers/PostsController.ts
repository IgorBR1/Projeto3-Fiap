import { Request, Response } from "express";
import postsService from "@/services/PostsService";

class PostsController {

  async getAll(_req: Request, res: Response) {
    const posts = await postsService.getAll();
    return res.json(posts);
  }

  async getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const post = await postsService.getById(id);
    return res.json(post);
  }

  async create(req: Request, res: Response) {
    const { title, content } = req.body;
    const newPost = await postsService.create({ title, content });
    return res.status(201).json(newPost);
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { title, content } = req.body;

    const updated = await postsService.update(id, { title, content });
    return res.json(updated);
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    const deleted = await postsService.delete(id);
    return res.json(deleted);
  }

  async search(req: Request, res: Response) {
    const term = req.query.q as string;

    const posts = await postsService.search(term);
    return res.json(posts);
  }

}

export default new PostsController();
