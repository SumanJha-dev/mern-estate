import express from "express";
import {
  createListing,
  deleteListing,
  getAllListings,
} from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createListing);
router.delete("/delete/:id", verifyToken, deleteListing);
router.get("/all", getAllListings); // Debug route to see all listings

export default router;
