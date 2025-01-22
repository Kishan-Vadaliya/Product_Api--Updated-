import Product from "../models/productModel";

interface QueryFeatures {
  search?: string;
  ratings?: string;
  priceMin?: number;
  priceMax?: number;
  sort?:
    | "name"
    | "priceAsc"
    | "priceDesc"
    | "createdAtAsc"
    | "updatedAtAsc"
    | "createdAtDesc"
    | "updatedAtDesc"
    | "ratingsAsc"
    | "ratingsDesc";
  page?: number;
  limit?: number;
  category?: "electronics" | "clothing";
  colors?: string[];
  variants?: string[];
  size?: string[];
}

const getFilteredSortedPaginatedProducts = async (queryFeatures: QueryFeatures) => {
  const { search, ratings, priceMin, priceMax, sort, page = 1, limit = 25, category, colors, variants, size } =
    queryFeatures;

    if(queryFeatures['page'] && queryFeatures['page'] > 0) {
      queryFeatures = {...queryFeatures, page: queryFeatures['page'] || 1}
    }

    if(queryFeatures['limit']  && queryFeatures['limit'] > 0) {
      queryFeatures = {...queryFeatures, limit: queryFeatures['page'] || 25}
    }

  const query: any = {};

  // Filter by product name (search)
  if (search) {
    query.name = { $regex: search, $options: "i" }; // Case-insensitive search
  }

  // Filter by product ratings
  if (ratings) {
    query.ratings = { $gte: parseFloat(ratings) };
  }

  // Filter by price range
  if (priceMin !== undefined || priceMax !== undefined) {
    query.price = {};
    if (priceMin !== undefined) {
      query.price.$gte = priceMin;
    }
    if (priceMax !== undefined) {
      query.price.$lte = priceMax;
    }
  }

  // Add base category filter
  if (category) {
    query.category = category;
  }

  // Additional filters for variants and colors (electronics) or size and colors (clothing)
  if (category === "electronics") {
    if (colors) {
      query.colors = { $in: colors }; // Filter by colors
    }
    if (variants) {
      query.variants = { $in: variants }; // Filter by variants
    }
  }

  if (category === "clothing") {
    if (colors) {
      query.colors = { $in: colors }; // Filter by colors
    }
    if (size) {
      query.size = { $in: size }; // Filter by size
    }
  }

  // Sorting options
  const sortOptionsMap = {
    name: { name: 1 },
    priceAsc: { price: 1 },
    priceDesc: { price: -1 },
    createdAtAsc: { createdAt: 1 },
    updatedAtAsc: { updatedAt: 1 },
    createdAtDesc: { createdAt: -1 },
    updatedAtDesc: { updatedAt: -1 },
    ratingsAsc: { ratings: 1 },
    ratingsDesc: { ratings: -1 },
  };

  const sortOption = sort ? sortOptionsMap[sort] : {};

  // Fetch filtered, sorted, and paginated products
  const products = await Product.find(query)
    .sort(sortOption)
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Product.countDocuments(query);

  return {
    products,
    total,
    page,
    limit,
  };
};

export default getFilteredSortedPaginatedProducts;
