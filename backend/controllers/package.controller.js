//Baskar L
// import Package from "../models/package.model.js";
// import braintree from "braintree";
// import dotenv from "dotenv";
// import Booking from "../models/booking.model.js";
// dotenv.config();

// //payment gateway
// var gateway = new braintree.BraintreeGateway({
//   environment: braintree.Environment.Sandbox,
//   merchantId: process.env.BRAINTREE_MERCHANT_ID,
//   publicKey: process.env.BRAINTREE_PUBLIC_KEY,
//   privateKey: process.env.BRAINTREE_PRIVATE_KEY,
// });

// //create package
// export const createPackage = async (req, res) => {
//   try {
//     const {
//       packageName,
//       packageDescription,
//       packageDestination,
//       packageDays,
//       packageNights,
//       packageAccommodation,
//       packageTransportation,
//       packageMeals,
//       packageActivities,
//       packagePrice,
//       packageDiscountPrice,
//       packageOffer,
//       packageImages,
//     } = req.body;

//     if (
//       !packageName ||
//       !packageDescription ||
//       !packageDestination ||
//       !packageAccommodation ||
//       !packageTransportation ||
//       !packageMeals ||
//       !packageActivities ||
//       !packageOffer === "" ||
//       !packageImages
//     ) {
//       return res.status(200).send({
//         success: false,
//         message: "All fields are required!",
//       });
//     }
//     if (packagePrice < packageDiscountPrice) {
//       return res.status(200).send({
//         success: false,
//         message: "Regular price should be greater than discount price!",
//       });
//     }
//     if (packagePrice <= 0 || packageDiscountPrice < 0) {
//       return res.status(200).send({
//         success: false,
//         message: "Price should be greater than 0!",
//       });
//     }
//     if (packageDays <= 0 && packageNights <= 0) {
//       return res.status(200).send({
//         success: false,
//         message: "Provide days and nights!",
//       });
//     }

//     const newPackage = await Package.create(req.body);
//     if (newPackage) {
//       return res.status(201).send({
//         success: true,
//         message: "Package created successfully",
//       });
//     } else {
//       return res.status(500).send({
//         success: false,
//         message: "Soemthing went wrong",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// //get all packages
// export const getPackages = async (req, res) => {
//   try {
//     const searchTerm = req.query.searchTerm || "";
//     const limit = parseInt(req.query.limit) || 9;
//     const startIndex = parseInt(req.query.startIndex) || 0;

//     let offer = req.query.offer;
//     if (offer === undefined || offer === "false") {
//       offer = { $in: [false, true] };
//     }

//     const sort = req.query.sort || "createdAt";

//     const order = req.query.order || "desc";

//     const packages = await Package.find({
//       $or: [
//         { packageName: { $regex: searchTerm, $options: "i" } },
//         { packageDestination: { $regex: searchTerm, $options: "i" } },
//       ],
//       packageOffer: offer,
//     })
//       .sort({ [sort]: order })
//       .limit(limit)
//       .skip(startIndex);
//     if (packages) {
//       return res.status(200).send({
//         success: true,
//         packages,
//       });
//     } else {
//       return res.status(500).send({
//         success: false,
//         message: "No Packages yet",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// //get package data
// export const getPackageData = async (req, res) => {
//   try {
//     const packageData = await Package.findById(req?.params?.id);
//     if (!packageData) {
//       return res.status(404).send({
//         success: false,
//         message: "Package not found!",
//       });
//     }
//     return res.status(200).send({
//       success: true,
//       packageData,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// //update package
// export const updatePackage = async (req, res) => {
//   try {
//     const findPackage = await Package.findById(req.params.id);
//     if (!findPackage)
//       return res.status(404).send({
//         success: false,
//         message: "Package not found!",
//       });

//     const updatedPackage = await Package.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     res.status(200).send({
//       success: true,
//       message: "Package updated successfully!",
//       updatedPackage,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// //delete package
// export const deletePackage = async (req, res) => {
//   try {
//     const deletePackage = await Package.findByIdAndDelete(req?.params?.id);
//     return res.status(200).send({
//       success: true,
//       message: "Package Deleted!",
//     });
//   } catch (error) {
//     cnsole.log(error);
//   }
// };

// //payment gateway api
// //token
// export const braintreeTokenController = async (req, res) => {
//   try {
//     gateway.clientToken.generate({}, function (err, response) {
//       if (err) {
//         res.status(500).send(err);
//       } else {
//         res.send(response);
//       }
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };


// //1
// import Package from "../models/package.model.js";
// import braintree from "braintree";
// import dotenv from "dotenv";

// dotenv.config();

// // Initialize Braintree Gateway
// const gateway = new braintree.BraintreeGateway({
//   environment: braintree.Environment.Sandbox,
//   merchantId: process.env.BRAINTREE_MERCHANT_ID,
//   publicKey: process.env.BRAINTREE_PUBLIC_KEY,
//   privateKey: process.env.BRAINTREE_PRIVATE_KEY,
// });

// // Create a package
// export const createPackage = async (req, res) => {
//   try {
//     const {
//       packageName,
//       packageDescription,
//       packageDestination,
//       packageDays,
//       packageNights,
//       packageAccommodation,
//       packageTransportation,
//       packageMeals,
//       packageActivities,
//       packagePrice,
//       packageDiscountPrice,
//       packageOffer,
//       packageImages,
//     } = req.body;

//     // Validate required fields
//     if (
//       !packageName ||
//       !packageDescription ||
//       !packageDestination ||
//       !packageAccommodation ||
//       !packageTransportation ||
//       !packageMeals ||
//       !packageActivities ||
//       !packageImages?.length
//     ) {
//       return res.status(400).json({ success: false, message: "All fields are required!" });
//     }

//     if (packagePrice <= 0 || packageDiscountPrice < 0) {
//       return res.status(400).json({ success: false, message: "Prices must be positive numbers!" });
//     }

//     if (packagePrice < packageDiscountPrice) {
//       return res.status(400).json({ success: false, message: "Regular price must be greater than discount price!" });
//     }

//     if (packageDays <= 0 || packageNights <= 0) {
//       return res.status(400).json({ success: false, message: "Provide valid days and nights!" });
//     }

//     const newPackage = await Package.create(req.body);

//     res.status(201).json({
//       success: true,
//       message: "Package created successfully!",
//       data: newPackage,
//     });
//   } catch (error) {
//     console.error("Error creating package:", error);
//     res.status(500).json({ success: false, message: "Server error. Please try again later." });
//   }
// };

// // Get all packages with filters
// export const getPackages = async (req, res) => {
//   try {
//     const searchTerm = req.query.searchTerm || "";
//     const limit = parseInt(req.query.limit) || 9;
//     const startIndex = parseInt(req.query.startIndex) || 0;
//     const offer = req.query.offer === "true" ? true : req.query.offer === "false" ? false : { $in: [true, false] };
//     const sort = req.query.sort || "createdAt";
//     const order = req.query.order === "asc" ? 1 : -1;

//     const packages = await Package.find({
//       $or: [
//         { packageName: { $regex: searchTerm, $options: "i" } },
//         { packageDestination: { $regex: searchTerm, $options: "i" } },
//       ],
//       packageOffer: offer,
//     })
//       .sort({ [sort]: order })
//       .limit(limit)
//       .skip(startIndex);

//     if (!packages.length) {
//       return res.status(404).json({ success: false, message: "No packages found!" });
//     }

//     res.status(200).json({ success: true, data: packages });
//   } catch (error) {
//     console.error("Error fetching packages:", error);
//     res.status(500).json({ success: false, message: "Server error. Please try again later." });
//   }
// };

// // Get a single package by ID
// export const getPackageData = async (req, res) => {
//   try {
//     const packageData = await Package.findById(req.params.id);

//     if (!packageData) {
//       return res.status(404).json({ success: false, message: "Package not found!" });
//     }

//     res.status(200).json({ success: true, data: packageData });
//   } catch (error) {
//     console.error("Error fetching package data:", error);
//     res.status(500).json({ success: false, message: "Server error. Please try again later." });
//   }
// };

// // Update a package
// export const updatePackage = async (req, res) => {
//   try {
//     const updatedPackage = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });

//     if (!updatedPackage) {
//       return res.status(404).json({ success: false, message: "Package not found!" });
//     }

//     res.status(200).json({ success: true, message: "Package updated successfully!", data: updatedPackage });
//   } catch (error) {
//     console.error("Error updating package:", error);
//     res.status(500).json({ success: false, message: "Server error. Please try again later." });
//   }
// };

// // Delete a package
// export const deletePackage = async (req, res) => {
//   try {
//     const deletedPackage = await Package.findByIdAndDelete(req.params.id);

//     if (!deletedPackage) {
//       return res.status(404).json({ success: false, message: "Package not found!" });
//     }

//     res.status(200).json({ success: true, message: "Package deleted successfully!" });
//   } catch (error) {
//     console.error("Error deleting package:", error);
//     res.status(500).json({ success: false, message: "Server error. Please try again later." });
//   }
// };

// // Braintree Payment Gateway - Generate Token
// export const braintreeTokenController = async (req, res) => {
//   try {
//     gateway.clientToken.generate({}, (err, response) => {
//       if (err) {
//         console.error("Error generating Braintree token:", err);
//         return res.status(500).json({ success: false, message: "Failed to generate token." });
//       }

//       res.status(200).json({ success: true, token: response.clientToken });
//     });
//   } catch (error) {
//     console.error("Error in Braintree token generation:", error);
//     res.status(500).json({ success: false, message: "Server error. Please try again later." });
//   }
// };









import Package from "../models/package.model.js";
import braintree from "braintree";
import dotenv from "dotenv";
import Booking from "../models/booking.model.js";
dotenv.config();

//payment gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

//create package
export const createPackage = async (req, res) => {
  // try {
  //   const {
  //     packageName,
  //     packageDescription,
  //     packageDestination,
  //     packageDays,
  //     packageNights,
  //     packageAccommodation,
  //     packageTransportation,
  //     packageMeals,
  //     packageActivities,
  //     packagePrice,
  //     packageDiscountPrice,
  //     packageOffer,
  //     packageImages,
  //   } = req.body;

  //   if (
  //     !packageName ||
  //     !packageDescription ||
  //     !packageDestination ||
  //     !packageAccommodation ||
  //     !packageTransportation ||
  //     !packageMeals ||
  //     !packageActivities ||
  //     !packageOffer === "" ||
  //     !packageImages
  //   ) {
  //     return res.status(200).send({
  //       success: false,
  //       message: "All fields are required!",
  //     });
  //   }
  //   if (packagePrice < packageDiscountPrice) {
  //     return res.status(200).send({
  //       success: false,
  //       message: "Regular price should be greater than discount price!",
  //     });
  //   }
  //   if (packagePrice <= 0 || packageDiscountPrice < 0) {
  //     return res.status(200).send({
  //       success: false,
  //       message: "Price should be greater than 0!",
  //     });
  //   }
  //   if (packageDays <= 0 && packageNights <= 0) {
  //     return res.status(200).send({
  //       success: false,
  //       message: "Provide days and nights!",
  //     });
  //   }

  //   const newPackage = await Package.create(req.body);
  //   if (newPackage) {
  //     return res.status(201).send({
  //       success: true,
  //       message: "Package created successfully",
  //     });
  //   } else {
  //     return res.status(500).send({
  //       success: false,
  //       message: "Something went wrong",
  //     });
  //   } }    catch (error) {
  //   console.log(error);
  // }


  try {
    const {
      packageName,
      packageDescription,
      packageDestination,
      packageDays,
      packageNights,
      packageAccommodation,
      packageTransportation,
      packageMeals,
      packageActivities,
      packagePrice,
      packageDiscountPrice,
      packageOffer,
      packageImages,
    } = req.body;

    // Validate required fields
    if (
      !packageName ||
      !packageDescription ||
      !packageDestination ||
      !packageAccommodation ||
      !packageTransportation ||
      !packageMeals ||
      !packageActivities ||
      packageOffer === undefined ||
      !Array.isArray(packageImages) || 
      packageImages.length === 0
    ) {
      return res.status(400).send({
        success: false,
        message: "All required fields must be provided!",
      });
    }

    // Validate price values
    if (packagePrice <= 0 || packagePrice < packageDiscountPrice) {
      return res.status(400).send({
        success: false,
        message: "Regular price should be greater than discount price and greater than zero.",
      });
    }

    // Validate days and nights
    if (packageDays <= 0 || packageNights <= 0) {
      return res.status(400).send({
        success: false,
        message: "Days and nights must be greater than zero.",
      });
    }

    // Create package
    const newPackage = new Package({
      packageName,
      packageDescription,
      packageDestination,
      packageDays,
      packageNights,
      packageAccommodation,
      packageTransportation,
      packageMeals,
      packageActivities,
      packagePrice,
      packageDiscountPrice,
      packageOffer,
      packageImages,
    });

    await newPackage.save(); // Save to MongoDB

    res.status(201).send({
      success: true,
      message: "Package created successfully!",
      package: newPackage,
    });
  } catch (error) {
    console.error("Error creating package:", error.message);
    res.status(500).send({
      success: false,
      message: "An error occurred while creating the package.",
    });
  }

 
};

//get all packages
export const getPackages = async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm || "";
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    let offer = req.query.offer;
    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    }

    const sort = req.query.sort || "createdAt";

    const order = req.query.order || "desc";

    const packages = await Package.find({
      $or: [
        { packageName: { $regex: searchTerm, $options: "i" } },
        { packageDestination: { $regex: searchTerm, $options: "i" } },
      ],
      packageOffer: offer,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);
    if (packages) {
      return res.status(200).send({
        success: true,
        packages,
      });
    } else {
      return res.status(500).send({
        success: false,
        message: "No Packages yet",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//get package data
export const getPackageData = async (req, res) => {
  try {
    const packageData = await Package.findById(req?.params?.id);
    if (!packageData) {
      return res.status(404).send({
        success: false,
        message: "Package not found!",
      });
    }
    return res.status(200).send({
      success: true,
      packageData,
    });
  } catch (error) {
    console.log(error);
  }
};


// // ✅ Get all packages with Pagination, Sorting & Filtering
// export const getPackages = async (req, res) => {
//   try {
//     const searchTerm = req.query.searchTerm || "";
//     const limit = Math.min(parseInt(req.query.limit) || 9, 100); // Max limit: 100
//     const startIndex = parseInt(req.query.startIndex) || 0;

//     let offerFilter = {};
//     if (req.query.offer === "true") offerFilter.packageOffer = true;
//     if (req.query.offer === "false") offerFilter.packageOffer = false;

//     const sortField = req.query.sort || "createdAt";
//     const sortOrder = req.query.order === "asc" ? 1 : -1;

//     // Filtering Query
//     const filter = {
//       $or: [
//         { packageName: { $regex: searchTerm, $options: "i" } },
//         { packageDestination: { $regex: searchTerm, $options: "i" } },
//       ],
//       ...offerFilter,
//     };

//     // Fetch data
//     const packages = await Package.find(filter)
//       .sort({ [sortField]: sortOrder })
//       .limit(limit)
//       .skip(startIndex)
//       .lean(); // Optimize query performance

//     // Get total count
//     const total = await Package.countDocuments(filter);

//     return res.status(200).json({
//       success: true,
//       packages,
//       total,
//       page: Math.floor(startIndex / limit) + 1,
//       totalPages: Math.ceil(total / limit),
//     });
//   } catch (error) {
//     console.error("❌ Error fetching packages:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };

// // ✅ Get Single Package Data
// export const getPackageData = async (req, res) => {
//   try {
//     const packageData = await Package.findById(req.params.id).lean();
//     if (!packageData) {
//       return res.status(404).json({
//         success: false,
//         message: "Package not found!",
//       });
//     }
//     return res.status(200).json({
//       success: true,
//       packageData,
//     });
//   } catch (error) {
//     console.error("❌ Error fetching package data:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };




//update package
export const updatePackage = async (req, res) => {
  try {
    const findPackage = await Package.findById(req.params.id);
    if (!findPackage)
      return res.status(404).send({
        success: false,
        message: "Package not found!",
      });

    const updatedPackage = await Package.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Package updated successfully!",
      updatedPackage,
    });
  } catch (error) {
    console.log(error);
  }
};

//delete package
export const deletePackage = async (req, res) => {
  try {
    const deletePackage = await Package.findByIdAndDelete(req?.params?.id);
    return res.status(200).send({
      success: true,
      message: "Package Deleted!",
    });
  } catch (error) {
    cnsole.log(error);
  }
};

//payment gateway api
//token
export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};