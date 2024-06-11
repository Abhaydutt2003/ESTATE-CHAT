import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({
      staus: "error",
      message: "Please provide all the required feilds !",
    });
  }
  try {
    //hash the user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //create a new user and save to to the db
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    console.log(newUser);
    return res
      .status(201)
      .json({ status: "success", message: "User created successfully" });
  } catch (error) {
    // console.log(error?.code);
    if (error?.code === "P2002") {
      return res.status(400).json({
        status: "error",
        message: "Credentials already in use",
      });
    }
    return res.status(500).json({
      status: "error",
      message: "Failed to create user",
    });
  }
};

export const login = (req, res) => {
    
};

export const logout = (req, res) => {};
