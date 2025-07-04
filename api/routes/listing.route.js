import express from "express";
import {
  createListing,
  deleteListing,
  getAllListings,
  updateListing ,
  getListing
} from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createListing);
router.delete("/delete/:id", verifyToken, deleteListing);
router.get("/all", getAllListings);
router.post("/update/:id", verifyToken, updateListing);
router.get('/get/:id', getListing);

export default router;
