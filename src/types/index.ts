import { Id } from "../../convex/_generated/dataModel";

export interface Product {
  _id: Id<"products">;
  name: string;
  slug: string;
  category: "headphones" | "speakers" | "earphones";
  categoryImage: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  new: boolean;
  price: number;
  description: string;
  features: string;
  includes: {
    quantity: number;
    item: string;
  }[];
  gallery: {
    first: ImageSet;
    second: ImageSet;
    third: ImageSet;
  };
  others: RelatedProduct[];
}

export interface ImageSet {
  mobile: string;
  tablet: string;
  desktop: string;
}

export interface RelatedProduct {
  slug: string;
  name: string;
  image: ImageSet;
}

export interface CartItem {
  productId: Id<"products">;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  _id?: Id<"orders">;
  orderId: string;
  status: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: {
    address: string;
    zipCode: string;
    city: string;
    country: string;
  };
  paymentMethod: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  vat: number;
  grandTotal: number;
  createdAt: number;
}

export interface CheckoutFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  zipCode: string;
  city: string;
  country: string;
  paymentMethod: "cash" | "emoney";
  eMoneyNumber?: string;
  eMoneyPin?: string;
}
