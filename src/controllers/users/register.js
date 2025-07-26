import User from '../../models/user.js';
import bcrypt from "bcryptjs";
import 'dotenv/config';
import jwt from 'jsonwebtoken';

const generateAccessToken = (user) => {
  return jwt.sign({
    userId: user._id,
    userName_from_access_token: user.userName,
    userRole_from_access_token: user.userRole
  }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY
  })
}

const generateRefreshToken = (user) => {
  return jwt.sign({
    userId: user._id,
    userName_from_refresh_token: user.userName,
    userRole_from_refresh_token: user.userRole
  }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY
  })
}


const registerController = async (req, res) => {
  try {
    const { username, useradhar, userpassword, userrole, votingstatus } = req.body;
    if (username === undefined || useradhar === undefined || userpassword === undefined || userrole === undefined ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the required fields"
      })
    }
    const checkUser = await User.findOne({
      userName: username
    })
    if (checkUser) {
      console.log("User already exists");
      return res.status(400).json({
        success: false,
        message: "User already exists"
      })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userpassword, salt);

    const newUser = await User.create({
      userName: username,
      userAdhar: useradhar,
      userPassword: hashedPassword,
      userRole: userrole,
      votingStatus: votingstatus
    })

    const accessToken = generateAccessToken(newUser);
    const refreshToken = generateRefreshToken(newUser);

    if (newUser) {
      console.log("User registered successfully");
      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        user_craeted :newUser,
        tokens: {
          accessToken: accessToken,
          refreshToken: refreshToken,
        }
      })
    }

    console.log("User registration failed");
    return res.status(400).json({
      success: false,
      message: "User registration failed"
    })


  }
  catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: " Internal Server Error"
    })
  }

}

export default registerController