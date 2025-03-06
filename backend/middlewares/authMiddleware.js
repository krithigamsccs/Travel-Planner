import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const requireSignIn = async (req, res, next) => {
  if (req?.cookies?.X_TTMS_access_token) {
    const token = await req.cookies.X_TTMS_access_token;
    if (!token)
      return res.status(401).send({
        success: false,
        message: "Unautorized: Token not provided!",
      });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err)
        return res.status(403).send({
          success: false,
          message: "Forbidden",
        });

      req.user = user;
      next();
    });
  } else {
    return res.status(401).send({
      success: false,
      message: "Unautorized: Token not provided!",
    });
  }
};

//Admin access
export const isAdmin = async (req, res, next) => {
  // console.log(req.user.id);
  try {
    const user = await User.findById(req.user.id);
    if (user.user_role === 1) {
      next();
    } else {
      return res.status(401).send({
        success: false,
        message: "Unautorized Access",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "Error in admin middleware",
      error,
    });
  }
};




// import jwt from "jsonwebtoken";
// import User from "../models/user.model.js";

// // Middleware to require sign-in
// export const requireSignIn = async (req, res, next) => {
//   // Check if token is in cookies
//   const token = req?.cookies?.X_TTMS_access_token;

//   if (!token) {
//     return res.status(401).send({
//       success: false,
//       message: "Unauthorized: Token not provided!",
//     });
//   }

//   // Verify the token
//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) {
//       return res.status(403).send({
//         success: false,
//         message: "Forbidden: Invalid or expired token!",
//       });
//     }

//     // Attach user data to request object for future use
//     req.user = user;
//     next(); // Continue to the next middleware or route handler
//   });
// };

// // Middleware to check if the user is an admin
// export const isAdmin = async (req, res, next) => {
//   try {
//     // Find the user from the database
//     const user = await User.findById(req.user.id);
    
//     if (user && user.user_role === 1) { // Assuming 1 is the admin role
//       next(); // User is an admin, proceed to the next handler
//     } else {
//       return res.status(403).send({
//         success: false,
//         message: "Unauthorized Access: Admin rights required!",
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({
//       success: false,
//       message: "Error in checking admin rights",
//       error: error.message,
//     });
//   }
// };
