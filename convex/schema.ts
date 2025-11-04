import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  products: defineTable({
    name: v.string(),
    slug: v.string(),
    category: v.union(v.literal("headphones"), v.literal("speakers"), v.literal("earphones")),
    categoryImage: v.object({
      mobile: v.string(),
      tablet: v.string(),
      desktop: v.string(),
    }),
    new: v.boolean(),
    price: v.number(),
    description: v.string(),
    features: v.string(),
    includes: v.array(
      v.object({
        quantity: v.number(),
        item: v.string(),
      })
    ),
    gallery: v.object({
      first: v.object({
        mobile: v.string(),
        tablet: v.string(),
        desktop: v.string(),
      }),
      second: v.object({
        mobile: v.string(),
        tablet: v.string(),
        desktop: v.string(),
      }),
      third: v.object({
        mobile: v.string(),
        tablet: v.string(),
        desktop: v.string(),
      }),
    }),
    others: v.array(
      v.object({
        slug: v.string(),
        name: v.string(),
        image: v.object({
          mobile: v.string(),
          tablet: v.string(),
          desktop: v.string(),
        }),
      })
    ),
  }).index("by_slug", ["slug"]).index("by_category", ["category"]),

  orders: defineTable({
    orderId: v.string(),
    status: v.string(),
    customerName: v.string(),
    customerEmail: v.string(),
    customerPhone: v.string(),
    shippingAddress: v.object({
      address: v.string(),
      zipCode: v.string(),
      city: v.string(),
      country: v.string(),
    }),
    paymentMethod: v.string(),
    items: v.array(
      v.object({
        productId: v.id("products"),
        name: v.string(),
        price: v.number(),
        quantity: v.number(),
        image: v.string(),
      })
    ),
    subtotal: v.number(),
    shipping: v.number(),
    vat: v.number(),
    grandTotal: v.number(),
    createdAt: v.number(),
  }).index("by_order_id", ["orderId"]).index("by_email", ["customerEmail"]),
});
