import PostsService from '../../src/services/PostsService';
import { Post } from '../../src/models/Post';

// Mock do repositório
jest.mock('../../src/repositories/PostsRepository', () => ({
  __esModule: true,
  default: {
    getAll: jest.fn(async () => [
      { id: 1, title: 'Primeiro Post', content: 'Conteúdo' }
    ]),
    getById: jest.fn(async (id: number) => ({
      id,
      title: 'Post ' + id,
      content: 'Conteúdo'
    })),
    create: jest.fn(async (data) => ({ ...data, id: 99 })),
    update: jest.fn(async (id, data) => ({ id, ...data })),
    delete: jest.fn(async () => true),
    search: jest.fn(async (term: string) => [
      { id: 2, title: 'Post com ' + term, content: 'Conteúdo' }
    ])
  }
}));

describe('PostsService', () => {

  it('deve retornar todos os posts', async () => {
    const posts = await PostsService.getAll();
    expect(posts.length).toBeGreaterThan(0);
    expect(posts[0].title).toBe('Primeiro Post');
  });

  it('deve retornar um post por ID', async () => {
    const post = await PostsService.getById(1);
    expect(post?.id).toBe(1);
    expect(post?.title).toBe('Post 1');
  });

  it('deve criar um novo post', async () => {
    const data: Post = { title: 'Novo', content: 'Teste' };
    const post = await PostsService.create(data);
    expect(post).toHaveProperty('id');
    expect(post.title).toBe('Novo');
  });

  it('deve atualizar um post existente', async () => {
    const data: Post = { title: 'Atualizado', content: 'Conteúdo atualizado' };
    const post = await PostsService.update(1, data);
    expect(post.id).toBe(1);
    expect(post.title).toBe('Atualizado');
  });

  it('deve excluir um post', async () => {
    const result = await PostsService.delete(1);
    expect(result).toBe(true);
  });

  it('deve buscar posts por termo', async () => {
    const results = await PostsService.search('teste');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].title).toContain('teste');
  });

  it('deve retornar array vazio se termo de busca for vazio', async () => {
    const results = await PostsService.search('');
    expect(results).toEqual([]);
  });

});