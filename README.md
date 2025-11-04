# Audiophile E-Commerce Website

A pixel-perfect, full-stack e-commerce website built with Next.js, React, Convex, and Resend.

## Features

- 🛍️ **Full E-Commerce Functionality**: Browse products, add to cart, and complete checkout
- 💳 **Multiple Payment Methods**: Support for e-Money and Cash on Delivery
- 📧 **Email Confirmations**: Automated order confirmation emails with Resend
- 💾 **Database Integration**: Order and product management with Convex
- 🎨 **Pixel-Perfect Design**: Responsive design matching the Figma specifications
- ✅ **Form Validation**: Robust validation using React Hook Form and Zod
- ♿ **Accessible**: Screen-reader friendly with ARIA labels
- 📱 **Fully Responsive**: Works on mobile, tablet, and desktop

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS
- **Backend**: Convex
- **Email Service**: Resend
- **Form Validation**: React Hook Form + Zod
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- A Convex account ([convex.dev](https://convex.dev))
- A Resend account ([resend.com](https://resend.com))

### Installation

1. **Clone the repository**
   ```bash
   cd /Users/purity/Documents/HNG-13/FE/audiophile-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Convex**
   ```bash
   npx convex dev
   ```

   This will:
   - Create a new Convex project (or link to existing)
   - Generate your `NEXT_PUBLIC_CONVEX_URL`
   - Start the Convex development server

4. **Set up environment variables**

   Create a `.env.local` file in the root directory:
   ```bash
   cp .env.local.example .env.local
   ```

   Then edit `.env.local` and add your keys:
   ```env
   # Convex (automatically generated from npx convex dev)
   NEXT_PUBLIC_CONVEX_URL=your_convex_url_here

   # Resend (get from https://resend.com/api-keys)
   RESEND_API_KEY=your_resend_api_key_here

   # Your app URL (for email links)
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

5. **Seed the database**

   Run the seeding script to populate the database with sample products:
   ```bash
   npm run seed
   ```

   This will add 6 products to your Convex database:
   - 3 Headphones (XX99 Mark II, XX99 Mark I, XX59)
   - 2 Speakers (ZX9, ZX7)
   - 1 Earphones (YX1)

   The seed data is defined in `convex/seed.ts` with Unsplash image URLs.
   The seeding script is located at `scripts/runSeed.mjs`.

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open the app**

   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
audiophile-ecommerce/
├── convex/                    # Convex backend
│   ├── schema.ts             # Database schema
│   ├── products.ts           # Product queries/mutations
│   └── orders.ts             # Order queries/mutations
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── api/              # API routes
│   │   ├── category/         # Category pages
│   │   ├── products/         # Product detail pages
│   │   ├── checkout/         # Checkout page
│   │   ├── order-confirmation/ # Order confirmation page
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Home page
│   │   └── globals.css       # Global styles
│   ├── components/           # React components
│   │   ├── cart/             # Cart components
│   │   ├── emails/           # Email templates
│   │   ├── home/             # Home page components
│   │   ├── layout/           # Layout components
│   │   ├── products/         # Product components
│   │   └── providers/        # Context providers
│   ├── contexts/             # React contexts
│   │   └── CartContext.tsx   # Shopping cart state
│   ├── lib/                  # Utility functions
│   └── types/                # TypeScript types
├── public/                   # Static assets
│   └── images/               # Product images
├── .env.local.example        # Environment variables template
├── package.json              # Dependencies
├── tailwind.config.ts        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
└── README.md                 # This file
```

## Key Features Implementation

### Shopping Cart
- Managed via React Context (`CartContext.tsx`)
- Persists to localStorage
- Add/remove/update quantities
- Real-time total calculations

### Checkout Flow
1. User fills out checkout form
2. Client-side validation with Zod
3. Order saved to Convex database
4. Confirmation email sent via Resend
5. Redirect to order confirmation page

### Email Confirmation
- HTML email template with order details
- Includes order ID, items, totals, and shipping info
- Responsive design
- "View Your Order" CTA button

### Form Validation
- Required field validation
- Email format validation
- Phone number validation
- Conditional validation (e-Money fields)
- Inline error messages
- Accessible error handling

## Deployment

This project is deployed on Netlify.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_CONVEX_URL` | Convex deployment URL | Yes |
| `RESEND_API_KEY` | Resend API key for sending emails | Yes |
| `NEXT_PUBLIC_APP_URL` | Your app's URL (for email links) | Yes |

## Adding Products

Products can be added through:

1. **Convex Dashboard**: Manually add products through the Convex web interface
2. **API Mutations**: Use the `api.products.create` mutation
3. **Seed Script**: Create a script that imports product data

Product structure:
```typescript
{
  name: string,
  slug: string,
  category: "headphones" | "speakers" | "earphones",
  categoryImage: { mobile: string, tablet: string, desktop: string },
  new: boolean,
  price: number,
  description: string,
  features: string,
  includes: [{ quantity: number, item: string }],
  gallery: { first: ImageSet, second: ImageSet, third: ImageSet },
  others: [{ slug: string, name: string, image: ImageSet }]
}
```

## Troubleshooting

### Convex connection issues
- Ensure `npx convex dev` is running in a separate terminal
- Check that `NEXT_PUBLIC_CONVEX_URL` is set correctly

### Email not sending
- Verify your `RESEND_API_KEY` is correct
- Check Resend dashboard for delivery status
- Ensure email addresses are verified (if in sandbox mode)

### Images not loading
- Place product images in `/public/images/`
- Use correct paths in product data
- Check Next.js image configuration in `next.config.ts`

## License

This project is built for educational purposes as part of the HNG Internship Stage 3.

## Credits

- Design: [Frontend Mentor - Audiophile E-Commerce](https://www.frontendmentor.io/challenges/audiophile-ecommerce-website-C8cuSd_wx)
- Icons: [Lucide React](https://lucide.dev/)
- Backend: [Convex](https://convex.dev/)
- Email Service: [Resend](https://resend.com/)

## Support

For questions or issues:
- Check the [Next.js Documentation](https://nextjs.org/docs)
- Read the [Convex Documentation](https://docs.convex.dev/)
- Visit the [Resend Documentation](https://resend.com/docs)

---

Built using Next.js, React, Convex, and Resend
