// src/types/product.ts
export interface Product {
  _id?: string;
  name: string;
  brand: string;
  modelNumber?: string;
  description?: string;
  specifications: {
    ram?: string;
    storage?: string;
    processor?: string;
    battery?: string;
    display?: string;
    camera?: string;
    os?: string;
  };
  costPrice: number;
  sellingPrice: number;
  stock: number;
  imageUrls?: string[];
  createdAt: string; // use string instead of Date for serialization
}
