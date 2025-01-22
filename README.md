# Product Management API

A TypeScript-based RESTful API for managing products in an e-commerce platform. Built with Express.js and MongoDB, featuring robust validation, logging, and documentation.

## Features

### Core Features
- ✨ Complete CRUD operations for products
- 🔄 Bulk operations (create/delete multiple products)
- 🔍 Advanced filtering and search
- 📊 Sorting and pagination
- 🎯 Category-specific validation (electronics/clothing)

### Technical Features
- 🛡️ Joi validation
- 📝 Comprehensive error handling
- 🔒 Rate limiting
- 📊 Winston logging
- 📚 Swagger documentation
- 🔄 TypeScript type safety

## Project Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- TypeScript

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Kishan-Vadaliya/Product_Api--Updated-.git
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
NODE_ENV=development
```


## API Documentation

### Product Schema Validation
```typescript
// Product validation rules
{
    name: string;          // Required, pattern: /^[a-zA-Z0-9'&-\s]+$/
    brand: string;         // Required
    seller: string;        // Required
    product_description: string; // Required, min 10 chars
    price: number;         // Required, positive
    discount: number;      // Optional, 0-100
    ratings: number;       // Optional, 0-5
    cod_availability: boolean; // Required
    total_stock_availability: number; // Required, non-negative
    category: "electronics" | "clothing" | "others"; // Required
    isFeatured: boolean;   // Optional, default: false
    isActive: boolean;     // Required
    colors: string[];      // Required, min 1
    variants?: string[];   // Required for electronics
    size?: string[];      // Required for clothing
}
```

### Logging Configuration
```typescript
// Winston logger configuration
- Console logging with colors
- File logging:
  - Development: logs/dev-application.log
  - Production: logs/application.log
- Error logging: logs/error.log
- Log format: YYYY-MM-DD HH:mm:ss [LEVEL] [Module]: Message
```

## API Endpoints

| Method | Endpoint                    | Description                     |
|--------|----------------------------|---------------------------------|
| POST   | `/api/products/CreateProduct` | Create a single product        |
| POST   | `/api/products/CreateMultipleProducts` | Create multiple products |
| GET    | `/api/products/GetAllProducts` | Get all products with filters  |
| GET    | `/api/products/GetProductById/:id` | Get product by ID         |
| PUT    | `/api/products/UpdateProductById/:id` | Update product by ID   |
| DELETE | `/api/products/DeleteProductById/:id` | Delete product by ID   |
| DELETE | `/api/products/DeleteMultipleProducts` | Delete multiple products |

### Query Parameters
- `search`: Search in product names
- `priceMin`: Minimum price filter
- `priceMax`: Maximum price filter
- `ratings`: Filter by minimum rating
- `category`: Filter by category
- `sort`: Sort by various fields
- `page`: Page number
- `limit`: Items per page
- `colors`: Filter by colors
- `variants`: Filter by variants (electronics)
- `size`: Filter by sizes (clothing)

## Rate Limiting
- Window: 1 minute
- Max Requests: 10 per window
- Error Response: 429 Too Many Requests


## Development
```bash
# Start development server
npm run dev

# Build project
npm run build

# Start production server
npm start
```

## API Documentation
Access Postman documentation at:
[View Postman Documentation](https://documenter.getpostman.com/view/40407315/2sAYQcGWgc)

## Project Structure
```
/
├── config/
├── controllers/
├── error-handler/
├── middleware/
├── models/
├── routes/
├── utils/
├── validation/
├── index.ts
├── .env
├── .gitignore
├── package.json
└── tsconfig.json

```

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

Let me know if you'd like any sections expanded or modified!
