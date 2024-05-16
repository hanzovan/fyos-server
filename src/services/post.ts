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
        console.log("\n\nnode-server > services > post > getAllPosts > data:", data)
        return { isError: false, data, message: "Success", status: 200 };
      } catch (error) {
        return { isError: false, data: null, message: error instanceof Error ? error.message : "Unknown error occurred", status: 500 };
      }
}

const PostService = { getAllPosts };

export { PostService };