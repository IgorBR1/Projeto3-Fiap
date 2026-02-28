import postsRepository from "@/repositories/PostsRepository";
import { Post } from "@/models/Post";

class PostsService {

  async getAll() {
    return postsRepository.getAll();
  }

  async getById(id: number) {
    return postsRepository.getById(id);
  }

  async create(data: Post) {
    return postsRepository.create(data);
  }

  async update(id: number, data: Post) {
    return postsRepository.update(id, data);
  }

  async delete(id: number) {
    return postsRepository.delete(id);
  }

  async search(term: string) {
    if (!term || term.trim() === "") return [];
    return postsRepository.search(term);
  }

}

export default new PostsService();
