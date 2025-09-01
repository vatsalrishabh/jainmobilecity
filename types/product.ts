// src/types/product.ts
export interface Product {
  _id: string;
  name: string;
  brand: string;
  modelNumber?: string;
  description?: string;
  specifications: {
    ram: string;
    storage: string;
    processor?: string;
    battery?: string;
    display?: string;
    camera?: string;
    os?: string;
    weight?: string;
    color?: string;
    [key: string]: string | undefined; // allows adding extra specs dynamically
  };
  costPrice: number;        // MRP (original price)
  sellingPrice: number;     // Price after discount
  discountPercentage?: number; // Auto-calculated or stored discount %
  stock: number;
  imageUrls: string[];
  ratings?: {
    average: number; // e.g., 4.3
    count: number;   // number of reviews
  };
  createdAt?: string; // use string instead of Date for serialization
}
