import bcrypt from "bcryptjs";
import User from "../models/user.modal.js";
import { errorHandler } from "../utils/error.js";
import Listing from "../models/listing.model.js";

export const test = (req, res) => {
  res.json({
    message: "Api route is working!",
  });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only update your own account!"));
  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return next(errorHandler(404, "User not found!"));
    }

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only delete your own account!"));
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("User has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const getUserListings = async (req, res, next) => {
  console.log("getUserListings called with userId:", req.params.id);
  console.log("Request user ID:", req.user.id);
  if (req.user.id === req.params.id) {
    try {
      console.log("Fetching listings for user:", req.params.id);
      const listings = await Listing.find({ userRef: req.params.id });
      console.log("Found listings:", listings.length);
      console.log("Listings data:", JSON.stringify(listings, null, 2));

      // Let's also check if there are any listings in the database at all
      const allListings = await Listing.find({});
      console.log("Total listings in database:", allListings.length);
      console.log(
        "All listings userRefs:",
        allListings.map((l) => l.userRef)
      );

      res.status(200).json(listings);
    } catch (error) {
      console.error("Error fetching listings:", error);
      next(error);
    }
  } else {
    console.log("Unauthorized access attempt");
    return next(errorHandler(401, "You can only view your own listings!"));
  }
};

// Debug function to check userRef format
export const debugUserListings = async (req, res, next) => {
  try {
    const userId = req.params.id;
    console.log("Debug - Looking for userRef:", userId, typeof userId);

    // Try different query methods
    const listingsString = await Listing.find({ userRef: userId });
    const listingsRegex = await Listing.find({
      userRef: { $regex: new RegExp(userId, "i") },
    });

    // Get all listings to see the actual userRef format
    const allListings = await Listing.find({});

    console.log("Listings with exact string match:", listingsString.length);
    console.log("Listings with regex match:", listingsRegex.length);
    console.log(
      "All userRefs in database:",
      allListings.map((l) => ({ userRef: l.userRef, type: typeof l.userRef }))
    );

    res.status(200).json({
      userId,
      userIdType: typeof userId,
      exactMatches: listingsString.length,
      regexMatches: listingsRegex.length,
      allUserRefs: allListings.map((l) => ({
        userRef: l.userRef,
        type: typeof l.userRef,
      })),
    });
  } catch (error) {
    console.error("Debug error:", error);
    next(error);
  }
};
