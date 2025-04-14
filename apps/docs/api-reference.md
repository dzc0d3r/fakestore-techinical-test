# API Reference

## Shared API Client
The `@weasydoo/api` package provides a type-safe client for interacting with the e-commerce API.

### Key Features
- Automatic type inference
- Request/response validation with Zod
- Error handling utilities

### Example Usage
```typescript
import { useProducts } from '@weasydoo/api';

function ProductList() {
  const { data: products, isLoading } = useProducts();
  
  if (isLoading) return <LoadingSpinner />;
  
  return (
    <ul>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ul>
  );
}
```

## Endpoints
| Endpoint       | Method | Description          |
|----------------|--------|----------------------|
| `/products`    | GET    | List all products    |
| `/products/:id`| GET    | Get product details  |
| `/cart`        | GET    | Get cart contents    |
| `/cart`        | POST   | Add item to cart     |
| `/auth/login`  | POST   | User authentication  |