import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

//update uset details
export const updateUser = async (req, res) => {
  if (req.user.id !== req.params.id) {
    return res.status(401).send({
      success: false,
      message: "You can only update your own account please login again!",
    });
  }
  //   console.log(req.body.phone);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          address: req.body.address,
          phone: req.body.phone,
        },
      },
      { new: true }
    );

    const { password: pass, ...rest } = updatedUser._doc;

    res.status(201).send({
      success: true,
      message: "User Details Updated Successfully",
      user: rest,
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(200).send({
        success: true,
        message: "email already taken please login!",
      });
    }
  }
};

//update user profile photo
export const updateProfilePhoto = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      return res.status(401).send({
        success: false,
        message:
          "You can only update your own account profile photo please login again!",
      });
    }

    const updatedProfilePhoto = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const validUser = await User.findById(req.params.id);
    const { password: pass, ...rest } = validUser._doc;

    if (updatedProfilePhoto) {
      return res.status(201).send({
        success: true,
        message: "Profile photo updated",
        user: rest,
      });
    } else {
      return res.status(500).send({
        success: false,
        message: "Something went wrong",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// update user password
export const updateUserPassword = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      return res.status(401).send({
        success: false,
        message:
          "You can only update your own account password please login again!",
      });
    }

    const validUser = await User.findById(req.params.id);

    if (!validUser) {
      return res.status(404).send({
        success: false,
        message: "User Not Found!",
      });
    }

    const oldPassword = req.body.oldpassword;
    const newPassword = req.body.newpassword;

    const validPassword = bcryptjs.compareSync(oldPassword, validUser.password);
    if (!validPassword) {
      return res.status(200).send({
        success: false,
        message: "Invalid password",
      });
    }

    const updatedHashedPassword = bcryptjs.hashSync(newPassword, 10);
    const updatedPassword = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          password: updatedHashedPassword,
        },
      },
      { new: true }
    );

    return res.status(201).send({
      success: true,
      message: "Password Updated Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

//delete user
export const deleteUserAccount = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return res.status(401).send({
      success: false,
      message: "You can only delete your account!",
    });
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token"); //clear cookie before sending json
    res.status(200).send({
      success: true,
      message: "User account has been deleted!",
    });
  } catch (error) {
    console.log(error);
  }
};

//get all users admin
export const getAllUsers = async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm || "";
    const users = await User.find({
      user_role: 0,
      $or: [
        { username: { $regex: searchTerm, $options: "i" } },
        { email: { $regex: searchTerm, $options: "i" } },
        { phone: { $regex: searchTerm, $options: "i" } },
      ],
    });
    if (users && users.length > 0) {
      res.send(users);
    } else {
      res.status(200).send({
        success: false,
        message: "No Users Yet!",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//delete user admin
export const deleteUserAccountAdmin = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req?.params?.id);
    res.status(200).send({
      success: true,
      message: "User account has been deleted!",
    });
  } catch (error) {
    console.log(error);
  }
};




// //2
// import User from "../models/user.model.js";
// import fs from "fs";
// import path from "path";
// import bcryptjs from "bcryptjs";


// //update uset details
// export const updateUser = async (req, res) => {
//   if (req.user.id !== req.params.id) {
//     return res.status(401).send({
//       success: false,
//       message: "You can only update your own account please login again!",
//     });
//   }
//   //   console.log(req.body.phone);

//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: {
//           username: req.body.username,
//           email: req.body.email,
//           address: req.body.address,
//           phone: req.body.phone,
//         },
//       },
//       { new: true }
//     );

//     const { password: pass, ...rest } = updatedUser._doc;

//     res.status(201).send({
//       success: true,
//       message: "User Details Updated Successfully",
//       user: rest,
//     });
//   } catch (error) {
//     if (error.code === 11000) {
//       res.status(200).send({
//         success: true,
//         message: "email already taken please login!",
//       });
//     }
//   }
// };

// // update user profile photo
// export const updateProfilePhoto = async (req, res) => {
//   try {
//     if (req.user.id !== req.params.id) {
//       return res.status(401).send({
//         success: false,
//         message:
//           "You can only update your own account profile photo, please login again!",
//       });
//     }

//     // Ensure the profile photo is sent in base64 format
//     const { avatar } = req.body;

//     if (!avatar) {
//       return res.status(400).send({
//         success: false,
//         message: "No profile photo provided!",
//       });
//     }

//     // Find and update the user's profile photo
//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: {
//           avatar: avatar, // Saving the base64 string in the database
//         },
//       },
//       { new: true }
//     );

//     const { password: pass, ...rest } = updatedUser._doc;

//     return res.status(201).send({
//       success: true,
//       message: "Profile photo updated successfully",
//       user: rest,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({
//       success: false,
//       message: "Something went wrong while updating the profile photo.",
//     });
//   }




// };


// // update user password
// export const updateUserPassword = async (req, res) => {
//   try {
//     if (req.user.id !== req.params.id) {
//       return res.status(401).send({
//         success: false,
//         message:
//           "You can only update your own account password please login again!",
//       });
//     }

//     const validUser = await User.findById(req.params.id);

//     if (!validUser) {
//       return res.status(404).send({
//         success: false,
//         message: "User Not Found!",
//       });
//     }

//     const oldPassword = req.body.oldpassword;
//     const newPassword = req.body.newpassword;

//     const validPassword = bcryptjs.compareSync(oldPassword, validUser.password);
//     if (!validPassword) {
//       return res.status(200).send({
//         success: false,
//         message: "Invalid password",
//       });
//     }

//     const updatedHashedPassword = bcryptjs.hashSync(newPassword, 10);
//     const updatedPassword = await User.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: {
//           password: updatedHashedPassword,
//         },
//       },
//       { new: true }
//     );

//     return res.status(201).send({
//       success: true,
//       message: "Password Updated Successfully",
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// //delete user
// export const deleteUserAccount = async (req, res, next) => {
//   if (req.user.id !== req.params.id)
//     return res.status(401).send({
//       success: false,
//       message: "You can only delete your account!",
//     });
//   try {
//     await User.findByIdAndDelete(req.params.id);
//     res.clearCookie("access_token"); //clear cookie before sending json
//     res.status(200).send({
//       success: true,
//       message: "User account has been deleted!",
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// //get all users admin
// export const getAllUsers = async (req, res) => {
//   try {
//     const searchTerm = req.query.searchTerm || "";
//     const users = await User.find({
//       user_role: 0,
//       $or: [
//         { username: { $regex: searchTerm, $options: "i" } },
//         { email: { $regex: searchTerm, $options: "i" } },
//         { phone: { $regex: searchTerm, $options: "i" } },
//       ],
//     });
//     if (users && users.length > 0) {
//       res.send(users);
//     } else {
//       res.status(200).send({
//         success: false,
//         message: "No Users Yet!",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
// //delete user admin
// export const deleteUserAccountAdmin = async (req, res, next) => {
//   try {
//     await User.findByIdAndDelete(req?.params?.id);
//     res.status(200).send({
//       success: true,
//       message: "User account has been deleted!",
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };




// import User from "../models/user.model.js";
// import bcryptjs from "bcryptjs";

// // Update user details
// export const updateUser = async (req, res) => {
//   if (req.user.id !== req.params.id) {
//     return res.status(401).send({
//       success: false,
//       message: "You can only update your own account, please login again!",
//     });
//   }

//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: {
//           username: req.body.username,
//           email: req.body.email,
//           address: req.body.address,
//           phone: req.body.phone,
//         },
//       },
//       { new: true }
//     );

//     const { password: pass, ...rest } = updatedUser._doc;
//     res.status(200).send({
//       success: true,
//       message: "User details updated successfully",
//       user: rest,
//     });
//   } catch (error) {
//     if (error.code === 11000) {
//       res.status(400).send({
//         success: false,
//         message: "Email already taken, please login!",
//       });
//     } else {
//       res.status(500).send({
//         success: false,
//         message: "Something went wrong during the update!",
//       });
//     }
//   }
// };

// // Update user profile photo
// export const updateProfilePhoto = async (req, res) => {
//   try {
//     if (req.user.id !== req.params.id) {
//       return res.status(401).send({
//         success: false,
//         message: "You can only update your own profile photo, please login again!",
//       });
//     }

//     const { avatar } = req.body;

//     if (!avatar) {
//       return res.status(400).send({
//         success: false,
//         message: "No profile photo provided!",
//       });
//     }

//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.id,
//       { $set: { avatar } },
//       { new: true }
//     );

//     const { password: pass, ...rest } = updatedUser._doc;

//     return res.status(200).send({
//       success: true,
//       message: "Profile photo updated successfully",
//       user: rest,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({
//       success: false,
//       message: "Something went wrong while updating the profile photo.",
//     });
//   }
// };

// // Update user password
// export const updateUserPassword = async (req, res) => {
//   try {
//     if (req.user.id !== req.params.id) {
//       return res.status(401).send({
//         success: false,
//         message: "You can only update your own password, please login again!",
//       });
//     }

//     const validUser = await User.findById(req.params.id);

//     if (!validUser) {
//       return res.status(404).send({
//         success: false,
//         message: "User not found!",
//       });
//     }

//     const validPassword = bcryptjs.compareSync(req.body.oldpassword, validUser.password);
//     if (!validPassword) {
//       return res.status(400).send({
//         success: false,
//         message: "Invalid password!",
//       });
//     }

//     const updatedHashedPassword = bcryptjs.hashSync(req.body.newpassword, 10);
//     await User.findByIdAndUpdate(
//       req.params.id,
//       { $set: { password: updatedHashedPassword } },
//       { new: true }
//     );

//     return res.status(200).send({
//       success: true,
//       message: "Password updated successfully",
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({
//       success: false,
//       message: "Something went wrong while updating the password.",
//     });
//   }
// };

// // Delete user account
// export const deleteUserAccount = async (req, res, next) => {
//   if (req.user.id !== req.params.id) {
//     return res.status(401).send({
//       success: false,
//       message: "You can only delete your own account!",
//     });
//   }

//   try {
//     await User.findByIdAndDelete(req.params.id);
//     res.clearCookie("access_token"); // Clear cookie before sending response
//     return res.status(200).send({
//       success: true,
//       message: "User account has been deleted!",
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({
//       success: false,
//       message: "Something went wrong while deleting the account.",
//     });
//   }
// };

// // Get all users (admin only)
// export const getAllUsers = async (req, res) => {
//   try {
//     const searchTerm = req.query.searchTerm || "";
//     const users = await User.find({
//       user_role: 0,
//       $or: [
//         { username: { $regex: searchTerm, $options: "i" } },
//         { email: { $regex: searchTerm, $options: "i" } },
//         { phone: { $regex: searchTerm, $options: "i" } },
//       ],
//     });

//     if (users && users.length > 0) {
//       return res.status(200).send(users);
//     } else {
//       return res.status(404).send({
//         success: false,
//         message: "No users found!",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({
//       success: false,
//       message: "Something went wrong while fetching the users.",
//     });
//   }
// };

// // Admin delete user account
// export const deleteUserAccountAdmin = async (req, res) => {
//   try {
//     const deletedUser = await User.findByIdAndDelete(req.params.id);
//     if (!deletedUser) {
//       return res.status(404).send({
//         success: false,
//         message: "User not found!",
//       });
//     }

//     return res.status(200).send({
//       success: true,
//       message: "User account has been deleted by admin!",
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({
//       success: false,
//       message: "Something went wrong while deleting the user account.",
//     });
//   }
// };
