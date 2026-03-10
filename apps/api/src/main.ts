import {
  ApiResponse,
  DisplayProduct,
  PaginatedResponse,
  ProductFilter,
} from '@org/models';
import express from 'express';
import { ProductsService } from '@org/api-products';
import { createConfig, getConfig } from '@org/shared-config';
import { apiEnv } from './env';

// Initialize runtime config for the application here (apps read env and inject)
createConfig({
  host: apiEnv.host,
  port: apiEnv.port,
  mode: apiEnv.mode,
});

const app = express();
const productsService = new ProductsService();

// Middleware
app.use(express.json());

// CORS configuration for React app
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

// Products endpoints
app.get('/api/products', (req, res) => {
  try {
    const filter: ProductFilter = {};

    if (req.query.category) {
      filter.category = req.query.category as string;
    }
    if (req.query.minPrice) {
      filter.minPrice = Number(req.query.minPrice);
    }
    if (req.query.maxPrice) {
      filter.maxPrice = Number(req.query.maxPrice);
    }
    if (req.query.inStock !== undefined) {
      filter.inStock = req.query.inStock === 'true';
    }
    if (req.query.searchTerm) {
      filter.searchTerm = req.query.searchTerm as string;
    }

    const page = req.query.page ? Number(req.query.page) : 1;
    const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 10;

    const response: PaginatedResponse<DisplayProduct> =
      productsService.getProducts(filter, page, pageSize);

    return res.status(200).json(response);
  } catch (error: unknown) {
    const response: ApiResponse<null> = {
      data: null,
      success: false,
      error: 'An error occurred while fetching products',
    };
    console.error(
      'Error fetching products:',
      error instanceof Error ? error.message : error
    );

    return res.status(500).json(response);
  }
});

app.get('/api/products/categories', (req, res) => {
  try {
    const categories = productsService.getCategories();

    return res.status(200).json(categories);
  } catch (error) {
    const response: ApiResponse<null> = {
      data: null,
      success: false,
      error: 'An error occurred while fetching categories',
    };
    console.error(
      'Error fetching categories:',
      error instanceof Error ? error.message : error
    );
    return res.status(500).json(response);
  }
});

app.get('/api/products/:id', (req, res) => {
  try {
    const product = productsService.getProductById(req.params.id);

    if (!product.success || !product.data) {
      const response: ApiResponse<null> = {
        data: null,
        success: false,
        error: 'Product not found',
      };
      return res.status(404).json(response);
    }

    return res.json(product);
  } catch (error) {
    const response: ApiResponse<null> = {
      data: null,
      success: false,
      error: 'An error occurred while fetching the product',
    };
    console.error(
      'Error fetching product by ID:',
      error instanceof Error ? error.message : error
    );
    return res.status(500).json(response);
  }
});

const config = getConfig();
const host = config.host ?? apiEnv.host;
const port = config.port ?? apiEnv.port;

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
