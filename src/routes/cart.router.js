import express from "express";
import {
    createCart,
    getCartById,
    addProductToCart,
    updateCart,
    updateProductQuantity,
    deleteProductFromCart,
    deleteCart
} from "../controllers/cart.controller.js";

const router = express.Router();

router.get("/:cid", getCartById);

router.post("/", createCart);

router.post("/:cid/products/:pid", addProductToCart);

router.put("/:cid", updateCart);

router.put("/:cid/products/:pid", updateProductQuantity);

router.delete("/:cid/products/:pid", deleteProductFromCart);

router.delete("/:cid", deleteCart);

export default router;