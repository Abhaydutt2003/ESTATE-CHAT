import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";



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

export const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      staus: "error",
      message: "Please provide all the required feilds !",
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });
    if (!user) {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid credentials!" });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid credentials!" });
    }

    //GENERATE THE COOKIE AND SEND TO THE USER
    //const maxAge = 1000 * 60 * 60 * 24 * 7;

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1d' }
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "none",
      secure: true,
    });
    console.log(res.cookie);
    const {password:_,...userInfo} = user;
    return res
      .status(200)
      .json({ status: "success", message: "User logged in successfully",userInfo});
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "error", message: "Failed to login!" });
  }
};

export const logout = (req, res) => {
  res
    .clearCookie("jwt")
    .status(200)
    .json({ status: "success", message: "user logged out successfully" });
};
