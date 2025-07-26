import jwt from 'jsonwebtoken';
import 'dotenv/config';

const homeMiddleware = (req, res, next) => {
  try {
    const headers = req.headers['authorization'];
    if (!headers) {
      return res.status(401).json({
        success: false,
        message: "Authorization header is missing"
      })
    }
    console.log("Headers: ", headers);
    const token = headers.split(" ")[1];
    console.log("Token: ", token);
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token creation failed"
      })
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decodedToken) {
      console.log("Token verification failed");
      return res.status(401).json({
        success: false,
        message: "Token verification failed. Invalid token"
      })
    }

    req.userInfo = decodedToken;
    console.log(req.userInfo);
    next();
  }
  catch (error) {
    console.log("Error in home middleware: ", error);
    return res.this.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}

export default homeMiddleware;
