import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  brand: string;
  seller: string;
  product_description: string;
  price: number;
  discount: number;
  ratings: number;
  cod_availability: boolean;
  total_stock_availability: number;
  category: string;
  isFeatured: boolean;
  isActive: boolean; 
  variants: string[]; // Array for multiple variant s
  colors: string[]; // Array for multiple colors
  size: string[]; // Array for multiple sizes
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema<IProduct> = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      unique: true,
    },
    brand: {
      type: String,
      required: true,
    },
    seller: {
      type: String,
      required: true,
    },
    product_description: {
      type: String,
      required: true,
      minlength: 10,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: Number,
      min: 0,
      max: 100,
    },
    ratings: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    cod_availability: {
      type: Boolean,
      required: true,
    },
    total_stock_availability: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      enum: ['electronics', 'clothing', 'others'], // Add enum validation
    },
    isFeatured: {
      type: Boolean,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
    variants: {
      type: [String],
      required: function() {
        return this.category === 'electronics'; // Conditional requirement based on category
      },
      default: undefined
    },
    colors: {
      type: [String],
      required: true,
    },
    size: {
      type: [String],
      required: function() {
        return this.category === 'clothing'; // Conditional requirement based on category
      },
      default: undefined
    },
  },
  { timestamps: true }
);

const productModel = mongoose.model<IProduct>("Product", ProductSchema);

export default productModel;
