"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PostsController_1 = __importDefault(require("@/controllers/PostsController"));
const router = (0, express_1.Router)();
router.get("/search", PostsController_1.default.search);
router.get("/", PostsController_1.default.getAll);
router.get("/:id", PostsController_1.default.getById);
router.post("/", PostsController_1.default.create);
router.put("/:id", PostsController_1.default.update);
router.delete("/:id", PostsController_1.default.delete);
router.get("/test", () => console.log("test"));
exports.default = router;
