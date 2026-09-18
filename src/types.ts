export type ProductCategory = 'todos' | 'feminino' | 'masculino' | 'alfaiataria' | 'linho' | 'acessorios';

export type ProductSize = 'PP' | 'P' | 'M' | 'G' | 'GG';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'feminino' | 'masculino' | 'alfaiataria' | 'linho' | 'acessorios';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  secondaryImage?: string;
  tag?: string;
  description: string;
  composition: string;
  sizes: ProductSize[];
  colors: ProductColor[];
  details: string[];
}

export interface CartItem {
  id: string; // unique combo of product.id + size + color
  product: Product;
  selectedSize: ProductSize;
  selectedColor: ProductColor;
  quantity: number;
}

export interface Review {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  productName: string;
  comment: string;
  verified: boolean;
  avatar: string;
}
