'use client';

import { useState, useMemo } from 'react';
import Header from "@/components/layout/store/Header";
import CategoryNav from "@/components/layout/store/CategoryNav";
import AnnouncementBar from "@/components/layout/store/AnnouncementBar";
import ProductCard from "@/components/products/ProductCard";
import { products } from "@/data/products";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedVendor, setSelectedVendor] = useState<string>("All");

  // Extract unique categories and vendors dynamically
  const categories = useMemo(() => {
    return ["All", ...Array.from(new Set(products.map((p) => p.category)))];
  }, []);

  const vendors = useMemo(() => {
    return ["All", ...Array.from(new Set(products.map((p) => p.vendor)))];
  }, []);

  // Filter products based on active selections
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchVendor =
        selectedVendor === "All" || product.vendor === selectedVendor;
      return matchCategory && matchVendor;
    });
  }, [selectedCategory, selectedVendor]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <CategoryNav
        categories={categories}
        activeCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <AnnouncementBar />

      <section className="px-4 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          {/* Header & Controls */}
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-8 pb-6 border-b border-gray-200">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                {selectedCategory === "All" ? "All Marketplace Products" : selectedCategory}
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Showing {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
              </p>
            </div>

            {/* Vendor Filter Pill Bar */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mr-1">
                Vendor:
              </span>
              {vendors.map((vendor) => (
                <button
                  key={vendor}
                  onClick={() => setSelectedVendor(vendor)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                    selectedVendor === vendor
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {vendor}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
              {filteredProducts.map((product) => (
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
            <div className="py-16 text-center">
              <p className="text-lg font-medium text-gray-600">No products match your current filters.</p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedVendor("All");
                }}
                className="mt-4 text-xs font-semibold text-indigo-600 hover:underline"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}