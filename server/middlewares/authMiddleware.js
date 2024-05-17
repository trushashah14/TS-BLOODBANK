const jwt = require("jsonwebtoken");

// This function acts as a middleware for Express.js applications
module.exports = function (req, res, next) {
  try {
    // Extract the authorization token from the request header
    const token = req.header("authorization").replace("Bearer ", "");

    // Verify the token using the JWT secret stored in the environment variable
    const decryptedData = jwt.verify(token, process.env.JWT_SECRET);

    // If verification is successful, attach the decoded user ID to the request body
    req.body.userId = decryptedData.userId;

    // Continue processing the request by calling the next middleware function
    next();
  } catch (error) {
    // Handle errors during token verification
    return res.send({
      success: false,
      message: error.message, // Send only a generic error message for security reasons
    });
  }
};