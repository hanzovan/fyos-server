import { PostModel, UserModel } from "../models";

const getAllPosts = async () => {
    try {
        console.log("node-server > services > post > getAllPosts function")
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

const getSinglePost = async (slug: string) => {
  try {
    const post = await PostModel.findOne({ slug })
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