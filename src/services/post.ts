import { PostModel, UserModel } from "../models";

const getAllPosts = async () => {
    try {
        const result = await PostModel.find({})
          .populate({ path: "user", select: ["name", "email", "avatar", "_id"], model: UserModel })
          .lean()
          .exec();
        const data = result?.map((post) => ({
          ...post,
          id: post._id?.toString(),
          user: { ...post.user, id: post?.user?._id.toString() },
        }));
        return { isError: false, data, message: "Success", status: 200 };
      } catch (error) {
        return { isError: false, data: null, message: error instanceof Error ? error.message : "Unknown error occurred", status: 500 };
      }
}

const getSinglePost = async (id: string) => {
  try {
    const post = await PostModel.findById(id)
      .populate({ path: "user", select: ["name", "email", "avatar", "_id"], model: UserModel })
      .lean()
      .exec();

    if (!post) {
      return {
        isError: true,
        data: null,
        message: "Post not found",
        status: 404
      }
    }

    const data = {
      ...post,
      id: post._id?.toString(),
      user: { ...post.user, id: post?.user?._id.toString() }
    };

    return {
      isError: false,
      data,
      message: "Success",
      status: 200
    };
  } catch (error) {
    return {
      isError: true,
      data: null,
      message: error instanceof Error
        ? error.message
        : "An unknown error occurred",
      status: 500
    }
  }
}

const PostService = { getAllPosts, getSinglePost };

export { PostService };