const adminMiddleware = (req, res, next) => {
  try {
    const userole = req.userInfo.userRole_from_access_token;
    if (userole === "admin") {
      next();
    }
    else {
    return res.status(403).json({
      success: false,
      message: "You are not authorized to access this resource since u are not an admin"
    })
  }
  }
  catch (error) {
    console.log("Error in admin middleware :", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}

export default adminMiddleware;

