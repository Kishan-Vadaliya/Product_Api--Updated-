import express from "express";
import mongoose from "mongoose";
import {
  createMultipleProducts,
  createProduct,
  deleteMultipleProducts,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/productController";
import { multipleValidateRequest, validateRequest } from "../middleware/validateRequest";

const router = express.Router();

// Route to create a product
router.post("/CreateProduct", validateRequest, createProduct);

// Route to create multiple products
router.post("/CreateMultipleProducts", multipleValidateRequest, createMultipleProducts);

// Route to get all products
router.get("/GetAllProducts", getAllProducts);

// Route to get a single product by ID
router.get("/GetProductById/:id", getProductById);

// Route to update a product by ID
router.put("/UpdateProductById/:id", validateRequest, updateProduct);

// Route to delete multiple products by ID
router.delete("/DeleteMultipleProducts", deleteMultipleProducts);

// Route to delete a product by ID
router.delete("/DeleteProductById/:id", deleteProduct);

export default router;
