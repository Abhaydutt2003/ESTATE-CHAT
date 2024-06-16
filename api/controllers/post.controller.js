//all post endpoints or controllers
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const getPosts = async (req, res) => {
  const query = req.query;
  try {
    const posts = await prisma.post.findMany({
      where: {
        city: query.city || undefined,
        type: query.type || undefined,
        property: query.property || undefined,
        bedroom: parseInt(query.bedroom) || undefined,
        price: {
          gte: parseInt(query.minPrice) || undefined,
          lte: parseInt(query.maxPrice) || undefined,
        },
      },
    });
    res.status(200).json({
      status: "success",
      message: "Successfuly fetched the posts",
      posts,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "error", message: "Failed to get all the posts" });
  }
};

export const getPost = async (req, res) => {
  const id = req.param.id;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        postDetail: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });
    const token = req.cookies?.jwt;
    const saved = false;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (!err) {
          saved = await prisma.savedPost.findUnique({
            where: {
              userId_postId: {
                postId: IDBCursor,
                userId: payload.id,
              },
            },
          });
        }
      });
      res.status(200).json({
        status: "success",
        message: "Post fetched successfully",
        post,
        isSaved: saved ? true : false,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get post" });
  }
};

export const addPost = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId;
  try {
    const newPost = await prisma.post.create({
      data: {
        ...body.postData,
        userId: tokenUserId,
        postDetail: {
          create: body.postDetail,
        },
      },
    });
    res
      .status(200)
      .json({ status: "success", message: "post added succesfully", newPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Failed to create post" });
  }
};

export const updatePost = (req, res) => {
  try {
    res.status(200).json();
  } catch (error) {
    res.status(500).json({ message: "Failed to update post" });
  }
};

export const deletePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });
    if (post.userId !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }
    await prisma.post.delete({
      where: { id },
    });

    return res.status(200).json({ status: "success", message: "Post deleted" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "error", message: "Error deleting the post" });
  }
};
