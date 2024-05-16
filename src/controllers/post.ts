import { NextFunction, Request, Response } from "express";
import { PostService } from "../services";

export const getPostsController = async (req: Request, res: Response, next: NextFunction) => {
    const result = await PostService.getAllPosts()
    if(result.isError) return res.status(result.status).send(result.message)
    return res.status(result.status).json(result.data)
}

const PostController = { getPostsController }

export { PostController };