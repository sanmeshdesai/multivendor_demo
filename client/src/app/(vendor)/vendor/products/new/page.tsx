
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ImagePlus,
  Package,
  Save,
  Send,
  X,
} from "lucide-react";

const categories = [
  "Fashion",
  "Groceries",
  "Food & Snacks",
  "Home & Kitchen",
  "Beauty & Personal Care",
  "Electronics",
];

export default function AddProductPage() {
  const [imageUrl, setImageUrl] = useState("");
  const [featured, setFeatured] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"draft" | "published">(
    "draft"
  );

  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    originalPrice: "",
    stock: "",
    sku: "",
  });

  function updateField(
    field: keyof typeof form,
    value: string
  ) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(status: "draft" | "published") {
    if (
      !form.name.trim() ||
      !form.category ||
      !form.price ||
      !form.stock
    ) {
      setMessage("Please complete the product name, category, price and stock.");
      return;
    }

    if (
      Number(form.price) <= 0 ||
      Number(form.stock) < 0 ||
      (form.originalPrice && Number(form.originalPrice) < 0)
    ) {
      setMessage("Enter a valid price and stock quantity.");
      return;
    }

    if (
      form.originalPrice &&
      Number(form.originalPrice) < Number(form.price)
    ) {
      setMessage("Original price should be greater than or equal to selling price.");
      return;
    }

    setMessageType(status);
    setMessage(
      status === "published"
        ? "Product validated! Backend integration is needed to publish it."
        : "Product validated! Backend integration is needed to save the draft."
    );
  }

  const inputClass =
    "mt-2 w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

  const labelClass = "text-sm font-medium text-gray-700";

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Page heading */}
        <div className="mb-7">
          <Link
            href="/vendor/products"
            className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-indigo-600"
          >
            <ArrowLeft size={16} />
            Back to products
          </Link>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                Add product
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Add a new item to your marketplace store.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => handleSubmit("draft")}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                <Save size={16} />
                Save draft
              </button>

              <button
                type="button"
                onClick={() => handleSubmit("published")}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
              >
                <Send size={16} />
                Publish product
              </button>
            </div>
          </div>
        </div>

        {message && (
          <div
            role="status"
            className={`mb-6 flex items-start justify-between gap-4 rounded-lg border p-4 text-sm ${
              messageType === "published"
                ? "border-indigo-200 bg-indigo-50 text-indigo-800"
                : "border-gray-200 bg-white text-gray-700"
            }`}
          >
            <span>{message}</span>
            <button
              type="button"
              onClick={() => setMessage("")}
              aria-label="Dismiss message"
            >
              <X size={16} />
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
          {/* Main form */}
          <div className="space-y-6 lg:col-span-2">
            {/* Basic information */}
            <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-lg bg-indigo-50 p-2 text-indigo-600">
                  <Package size={20} />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">
                    Basic information
                  </h2>
                  <p className="text-sm text-gray-500">
                    Product name and description
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className={labelClass} htmlFor="name">
                    Product name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    className={inputClass}
                    placeholder="e.g. Premium Cotton T-Shirt"
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                  />
                </div>

                <div>
                  <label className={labelClass} htmlFor="description">
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows={5}
                    className={inputClass}
                    placeholder="Describe the product, its features, materials and benefits..."
                    value={form.description}
                    onChange={(e) =>
                      updateField("description", e.target.value)
                    }
                  />
                  <p className="mt-1.5 text-xs text-gray-400">
                    Provide clear and accurate product details.
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelClass} htmlFor="category">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="category"
                      className={inputClass}
                      value={form.category}
                      onChange={(e) =>
                        updateField("category", e.target.value)
                      }
                    >
                      <option value="">Select category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="brand">
                      Brand
                    </label>
                    <input
                      id="brand"
                      className={inputClass}
                      placeholder="Brand name"
                      value={form.brand}
                      onChange={(e) => updateField("brand", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Pricing and inventory */}
            <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
              <h2 className="font-semibold text-gray-900">
                Pricing & inventory
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Set prices and manage available stock.
              </p>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor="price">
                    Selling price (₹) <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="price"
                    type="number"
                    min="0.01"
                    step="0.01"
                    className={inputClass}
                    placeholder="499"
                    value={form.price}
                    onChange={(e) => updateField("price", e.target.value)}
                  />
                </div>

                <div>
                  <label className={labelClass} htmlFor="originalPrice">
                    Original price (₹)
                  </label>
                  <input
                    id="originalPrice"
                    type="number"
                    min="0"
                    step="0.01"
                    className={inputClass}
                    placeholder="799"
                    value={form.originalPrice}
                    onChange={(e) =>
                      updateField("originalPrice", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label className={labelClass} htmlFor="stock">
                    Stock quantity <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="stock"
                    type="number"
                    min="0"
                    step="1"
                    className={inputClass}
                    placeholder="100"
                    value={form.stock}
                    onChange={(e) => updateField("stock", e.target.value)}
                  />
                </div>

                <div>
                  <label className={labelClass} htmlFor="sku">
                    SKU
                  </label>
                  <input
                    id="sku"
                    className={inputClass}
                    placeholder="e.g. TSH-BLK-001"
                    value={form.sku}
                    onChange={(e) => updateField("sku", e.target.value)}
                  />
                </div>
              </div>
            </section>

            {/* Product image */}
            <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
              <h2 className="font-semibold text-gray-900">Product image</h2>
              <p className="mt-1 text-sm text-gray-500">
                Add an image using a publicly accessible image URL.
              </p>

              <label className={labelClass} htmlFor="imageUrl">
                Image URL
              </label>
              <input
                id="imageUrl"
                type="url"
                className={inputClass}
                placeholder="https://example.com/product.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />

              <div className="mt-4 flex min-h-48 items-center justify-center overflow-hidden rounded-xl border border-dashed border-gray-300 bg-gray-50">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Product preview"
                    className="max-h-72 w-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                    onLoad={(e) => {
                      e.currentTarget.style.display = "block";
                    }}
                  />
                ) : (
                  <div className="p-6 text-center">
                    <ImagePlus
                      size={32}
                      className="mx-auto text-gray-400"
                    />
                    <p className="mt-3 text-sm font-medium text-gray-600">
                      Image preview
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      Your product image will appear here.
                    </p>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Right column */}
          <aside className="space-y-6">
            <section className="rounded-xl border border-gray-200 bg-white p-5">
              <h2 className="font-semibold text-gray-900">
                Publishing settings
              </h2>

              <label className="mt-5 flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="mt-1 size-4 accent-indigo-600"
                />
                <span>
                  <span className="block text-sm font-medium text-gray-800">
                    Featured product
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-gray-500">
                    Mark this item for potential promotion on your storefront.
                  </span>
                </span>
              </label>
            </section>

            <section className="rounded-xl border border-gray-200 bg-white p-5">
              <h2 className="font-semibold text-gray-900">Before publishing</h2>
              <ul className="mt-4 space-y-3 text-sm text-gray-600">
                <li className="flex gap-2">
                  <span className="text-indigo-600">✓</span>
                  Use a clear product name.
                </li>
                <li className="flex gap-2">
                  <span className="text-indigo-600">✓</span>
                  Check your selling price.
                </li>
                <li className="flex gap-2">
                  <span className="text-indigo-600">✓</span>
                  Enter the correct stock quantity.
                </li>
                <li className="flex gap-2">
                  <span className="text-indigo-600">✓</span>
                  Use an accurate product image.
                </li>
              </ul>
            </section>

            <button
              type="button"
              onClick={() => handleSubmit("published")}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              <Send size={16} />
              Publish product
            </button>

            <p className="text-center text-xs leading-5 text-gray-400">
              Demo mode: products are not yet saved to a database.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}
