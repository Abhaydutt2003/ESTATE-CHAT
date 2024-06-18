import prisma from "../lib/prisma.js";

export const addMessage = async (req, res) => {
  const tokenUserId = req.userId;
  const chatId = req.params.chatId;
  const text = req.body.text;
  try {
    const chat = await prisma.chat.findUnique({
      where: {
        id: chatId,
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
    });
    if (!chat)
      return res
        .status(404)
        .json({ status: "error", message: "Chat not found!" });

    const message = await prisma.message.create({
      data: {
        text,
        chatId,
        userId: tokenUserId,
      },
    });
    await prisma.chat.update({
      where: {
        id: chatId,
      },
      data: {
        seenBy: [tokenUserId],
        lastMessage: text,
      },
    });
    return res
      .status(200)
      .json({ status: "success", message: "created the message", message });
  } catch (error) {
    return res.status(500).json("Error adding the message!");
  }
};
