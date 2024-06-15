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

  console.log(id,tokenUserId);

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
