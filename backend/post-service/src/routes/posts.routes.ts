import { Router } from "express";
import PostsController from "@/controllers/PostsController";

const router = Router();

/**
 * @swagger
 * /posts/search:
 *   get:
 *     summary: Busca posts por palavra-chave
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: Termo de busca
 *     responses:
 *       200:
 *         description: Lista de posts encontrados
 */
router.get("/search", PostsController.search);

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Lista todos os posts
 *     responses:
 *       200:
 *         description: Lista de posts retornada com sucesso
 */
router.get("/", PostsController.getAll);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Retorna um post pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do post
 *     responses:
 *       200:
 *         description: Post encontrado
 *       404:
 *         description: Post não encontrado
 */
router.get("/:id", PostsController.getById);

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Cria um novo post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               author:
 *                 type: string
 *     responses:
 *       201:
 *         description: Post criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post("/", PostsController.create);

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Atualiza um post existente
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               author:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post atualizado com sucesso
 *       404:
 *         description: Post não encontrado
 */
router.put("/:id", PostsController.update);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Exclui um post
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do post
 *     responses:
 *       200:
 *         description: Post excluído com sucesso
 *       404:
 *         description: Post não encontrado
 */
router.delete("/:id", PostsController.delete);

router.get("/author/:authorId", PostsController.getMyPosts);
/** 
 * @swagger
 * /posts/author/{authorId}:
 *  get:
 *   summary: Retorna os posts de um autor específico
 *  parameters:
 *    - in: path
 *     name: authorId
 *    schema:
 *     type: string
 *    required: true
 *   description: ID do autor
 * responses:
 *  200:
 *   description: Lista de posts do autor retornada com sucesso
 *  404:
 *  description: Autor não encontrado
 * 
 * 
 */

export default router;

