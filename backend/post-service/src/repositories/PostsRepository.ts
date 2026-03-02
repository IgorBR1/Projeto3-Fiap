import prisma from "@/database/prisma";
import { Prisma } from "@prisma/client";

class PostsRepository {
  async getAll() {
    return prisma.post.findMany({  include: {
      author: true,
    },
      orderBy: { id: "asc" },
    });
  }

  async getById(id: number) {
    return prisma.post.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.PostCreateInput) {
    return prisma.post.create({
      data,
    });
  }

  async update(id: number, data: Prisma.PostUpdateInput) {
    return prisma.post.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return prisma.post.delete({
      where: { id },
    });
  }

  async search(term: string) {
    return prisma.post.findMany({
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

export default new PostsRepository();