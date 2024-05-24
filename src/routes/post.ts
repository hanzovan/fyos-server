import express from "express";
import { authenticateUser } from "../middleware";
import { PostController } from "../controllers";
import { getSinglePostController } from "../controllers/post";

const postRouter = express.Router();

postRouter.get("/posts", authenticateUser, async (req, res, next) => {
    await PostController.getPostsController(req, res, next);
});

postRouter.get("/posts/:id", authenticateUser, getSinglePostController)

export { postRouter };