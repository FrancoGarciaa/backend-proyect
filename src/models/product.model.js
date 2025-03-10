import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    description: String,
    stock: Number
});

productSchema.plugin(mongoosePaginate);
export const Product = mongoose.model("Product", productSchema);
