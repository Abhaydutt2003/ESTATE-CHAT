import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

// export const getUsers = async () => {
//   try {
//     //const users = await prisma.user.findMany();
//     res
//       .status(200)
//       .json({
//         status: "success",
//         message: "users fetched successfully",
//       });
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(500)
//       .json({ status: "error", message: "Failed to get users!" });
//   }
// };

// export const getUser = async () => {
//   try {
//     return res
//       .status(200)
//       .json({ status: "success", message: "User info fetched successfully" });
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(500)
//       .json({ status: "error", message: "Failed to get the user info !" });
//   }
// };

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  const { password, avatar, ...inputs } = req.body;

  console.log(id, tokenUserId);

  if (id !== tokenUserId) {
    return res
      .status(403)
      .json({ status: "error", message: "Not Authorized! " });
  }
  let updatedPassword = null;

  try {
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...inputs,
        ...(updatedPassword && { password: updatedPassword }),
        ...(avatar && { avatar }),
      },
    });
    const { password: _, ...userInfo } = updatedUser;
    return res.status(200).json({
      status: "success",
      message: "User info updated successfully",
      userInfo,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "error", message: "Failed to get update the user!" });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  if (id !== tokenUserId) {
    return res.status(403).json({ message: "Not Authorized!" });
  }

  try {
    await prisma.user.delete({ where: { id } });
    return res
      .status(200)
      .json({ status: "success", message: "Successfully deleted the user." });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "error", message: "Error deleting the user!" });
  }
};

export const savePost = async (req, res) => {
  const postId = req.body.postId;
  const tokenUserId = req.userId;
  try {
    const savedPost = await prisma.savedPost.findUnique({
      where: {
        userId_postId: {
          userId: tokenUserId,
          postId,
        },
      },
    });
    const resMessage = "Post saved successfully!";
    if (savedPost) {
      await prisma.savedPost.delete({
        where: {
          id: savedPost.id,
        },
      });
      resMessage = "Post deleted from saved posts";
    } else {
      await prisma.savedPost.create({
        data: {
          userId: tokenUserId,
          postId,
        },
      });
    }
    return res.status(200).json({ status: "success", message: resMessage });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        status: "error",
        message: "Error while performing the operation!",
      });
  }
};

export const profilePosts = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    const userPosts = await prisma.post.findMany({
      where: { user: tokenUserId },
    });
    const saved = await prisma.savedPost.findMany({
      where: { userId: tokenUserId },
      include: {
        post: true,
      },
    });
    const savedPosts = saved.map((item) => item.post);
    return res
      .ststus(200)
      .json({
        status: "success",
        message: "Successfully fetched all the posts!",
        userPosts,
        savedPosts,
      });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "error", message: "Failed to get profile posts!" });
  }
};

export const getNotificationNumber = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    const number = await prisma.chat.count({
      where: {
        userIDs: {
          hasSome: [tokenUserId],
        },
        NOT: {
          seenBy: {
            hasSome: [tokenUserId],
          },
        },
      },
    });
    return res
      .status(200)
      .json({
        status: "success",
        message: "successfully fetched notification number!",
        number,
      });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({
        status: "error",
        message: "Failed to get notification number !",
      });
  }
};
