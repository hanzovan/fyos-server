import express from "express";
import { authenticateUser } from "../middleware";
import { PostController } from "../controllers";

const postRouter = express.Router();

postRouter.get("/posts", authenticateUser, async (req, res, next) => {
    await PostController.getPostsController(req, res, next);
});

export { postRouter };