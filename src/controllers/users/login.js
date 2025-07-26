import User from '../../models/user.js';
import bcrypt from 'bcryptjs';
import 'dotenv/config';
import jwt from 'jsonwebtoken';


const generateAccessToken = (user) => {
  return jwt.sign({
    userId: user._id,
    userName_from_access_token: user.userName,
    userRole_from_access_token: user.userRole,
    votingStatus_from_access_token: user.votingStatus,
  }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY
  })
}

const generateRefreshToken = (user) => {
  return jwt.sign({
    userId: user._id,
    userName_from_refresh_token: user.userName,
    userRole_from_refresh_token: user.userRole,
    votingStatus_from_refresh_token: user.votingStatus
  }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY
  })
}

const loginController = async (req, res) => {
  try {
    const { username, userpassword } = req.body;
    if (username === undefined || userpassword === undefined) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the required fields"
      })
    }
    const checkUser = await User.findOne({
      userName: username
    })

    if (!checkUser) {
      console.log("User does not exist");
      return res.status(400).json({
        success: false,
        message: "User does not exist"
      })
    }

    const checkUserPassword = await bcrypt.compare(userpassword, checkUser.userPassword);
    if (!checkUserPassword) {
      console.log("Incorrect password");
      return res.status(400).json({
        success: false,
        message: "Incorrect password"
      })
    }

    const accessToken = generateAccessToken(checkUser);
    const refreshToken = generateRefreshToken(checkUser);

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      loggedInUser : checkUser,
      tokens: {
        accessToken: accessToken,
        refreshToken: refreshToken,
      }
    })

  }
  catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}

export default loginController;