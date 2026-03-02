import { Router } from "express";
import postsRoutes from "./posts.routes";
import usersRoutes from "@/routes/users.routes";

const routes = Router();

routes.use("/posts", postsRoutes);
routes.use("/users", usersRoutes); // Adiciona as rotas de usuários

export default routes;
