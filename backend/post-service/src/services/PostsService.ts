import postsRepository from "@/repositories/PostsRepository";
import { Prisma } from "@prisma/client";

class PostsService {

  async getAll() {
    return postsRepository.getAll();
  }

  async getById(id: number) {
    return postsRepository.getById(id);
  }

 async create(data: {
  title: string;
  content: string;
  authorId?: string;
}) {
  const { title, content, authorId } = data;

  return postsRepository.create({
    title,
    content,
    author: authorId
      ? { connect: { id: authorId } }
      : undefined,
  });
}
  async update(
  id: number,
  data: { title?: string; content?: string; authorId?: string }
) {
  const { title, content, authorId } = data;

  return postsRepository.update(id, {
    title,
    content,
    author: authorId
      ? { connect: { id: authorId } }
      : undefined,
  });
}
  async delete(id: number) {
    return postsRepository.delete(id);
  }

  async search(term: string) {
    if (!term || term.trim() === "") return [];
    return postsRepository.search(term);
  }

  async getByAuthorId(authorId: string) {
    return postsRepository.getByAuthorId(authorId);
}

}
export default new PostsService();