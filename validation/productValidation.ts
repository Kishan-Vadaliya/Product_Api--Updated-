import Joi from "joi";

// Define validation schema for a single product
const singleProductSchema = {
    name: Joi.string().pattern(/^[a-zA-Z0-9'&-\s]+$/).required().messages({
        "string.pattern.base": "Product name must only contain letters, numbers, spaces, and basic punctuation",
        "string.empty": "Product name cannot be empty",
        "any.required": "Product name is required"
    }),
    brand: Joi.string().required().messages({
        "string.empty": "Brand cannot be empty",
        "any.required": "Brand is required"
    }),
    seller: Joi.string().required().messages({
        "string.empty": "Seller cannot be empty",
        "any.required": "Seller is required"
    }),
    product_description: Joi.string().min(10).required().messages({
        "string.empty": "Product description cannot be empty",
        "string.min": "Product description must be at least {#limit} characters long",
        "any.required": "Product description is required"
    }),
    price: Joi.number().positive().required().messages({
        "number.base": "Price must be a number",
        "number.positive": "Price must be greater than 0",
        "any.required": "Price is required"
    }),
    discount: Joi.number().min(0).max(100).optional().messages({
        "number.min": "Discount cannot be less than {#limit}",
        "number.max": "Discount cannot exceed {#limit}"
    }),
    ratings: Joi.number().min(0).max(5).optional().messages({
        "number.min": "Rating cannot be less than {#limit}",
        "number.max": "Rating cannot exceed {#limit}"
    }),
    cod_availability: Joi.boolean().required().messages({
        "boolean.base": "COD availability must be true or false",
        "any.required": "COD availability is required"
    }),
    total_stock_availability: Joi.number().integer().min(0).required().messages({
        "number.base": "Stock must be a number",
        "number.integer": "Stock must be a whole number",
        "number.min": "Stock cannot be negative",
        "any.required": "Stock availability is required"
    }),
    category: Joi.string()
        .valid('electronics', 'clothing', 'others')
        .required()
        .messages({
            "any.only": "Category must be one of: electronics, clothing, others",
            "any.required": "Category is required"
        }),
    isFeatured: Joi.boolean().default(false),
    isActive: Joi.boolean().required().messages({
        "boolean.base": "isActive must be true or false",
        "any.required": "isActive status is required"
    }),
    variants: Joi.when('category', {
        is: 'electronics',
        then: Joi.array().items(Joi.string().required()).min(1).required().messages({
            "array.base": "Variants must be an array of strings",
            "array.min": "At least one variant is required for electronics",
            "any.required": "Variants are required for electronics category"
        }),
        otherwise: Joi.forbidden().messages({
            "any.unknown": "Variants field is only allowed for electronics category"
        })
    }),
    colors: Joi.array().items(Joi.string().required()).min(1).required().messages({
        "array.base": "Colors must be an array",
        "array.min": "At least one color is required",
        "any.required": "Colors are required"
    }),
    size: Joi.when('category', {
        is: 'clothing',
        then: Joi.array().items(Joi.string().trim().min(1)).min(1).required().messages({
            "array.base": "Size must be an array of strings",
            "array.min": "At least one size is required for clothing",
            "any.required": "Size is required for clothing category"
        }),
        otherwise: Joi.forbidden().messages({
            "any.unknown": "Size field is only allowed for clothing category"
        })
    })
};

// Schema for single product validation
const productSchema = Joi.object(singleProductSchema);

// Schema for multiple products validation
const multipleProductSchema = Joi.array().items(productSchema).min(1).required().messages({
    "array.base": "Request body must be an array of products",
    "array.min": "At least one product is required",
    "any.required": "Product data is required"
});

export { productSchema, multipleProductSchema };