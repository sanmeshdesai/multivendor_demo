
'use client';

import Header from "@/components/layout/store/Header";
import AnnouncementBar from "@/components/layout/store/AnnouncementBar";
import ProductCard from "@/components/products/ProductCard";
import { products } from "@/data/products";

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <AnnouncementBar />

      <section className="px-4 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">

          {/* Page Heading */}
          <div className="mb-8 border-b border-gray-200 pb-6">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              All Marketplace Products
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Explore products from all our vendors.
            </p>

            <p className="mt-2 text-xs font-medium text-gray-400">
              {products.length} products available
            </p>
          </div>

          {/* Product Grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  image={product.image}
                  category={product.category}
                  vendor={product.vendor}
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <h2 className="text-lg font-semibold text-gray-800">
                No products available
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Please check back later.
              </p>
            </div>
          )}

        </div>
      </section>
    </main>
  );
}
