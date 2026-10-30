
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Package,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  MoreHorizontal,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

type Product = {
  id: string;
  name: string;
  category: string;
  sku: string;
  price: number;
  stock: number;
  status: "Active" | "Draft";
  image: string;
};

const initialProducts: Product[] = [
  {
    id: "PRD-001",
    name: "Premium Cotton T-Shirt",
    category: "Fashion",
    sku: "TSH-001",
    price: 499,
    stock: 42,
    status: "Active",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=160&h=160&fit=crop",
  },
  {
    id: "PRD-002",
    name: "Wireless Headphones",
    category: "Electronics",
    sku: "ELC-002",
    price: 2499,
    stock: 8,
    status: "Active",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=160&h=160&fit=crop",
  },
  {
    id: "PRD-003",
    name: "Organic Cashews 500g",
    category: "Food & Snacks",
    sku: "FOD-003",
    price: 450,
    stock: 65,
    status: "Active",
    image: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=160&h=160&fit=crop",
  },
  {
    id: "PRD-004",
    name: "Ceramic Coffee Mug",
    category: "Home & Kitchen",
    sku: "HOM-004",
    price: 399,
    stock: 0,
    status: "Active",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=160&h=160&fit=crop",
  },
  {
    id: "PRD-005",
    name: "Daily Skincare Set",
    category: "Beauty & Personal Care",
    sku: "BTY-005",
    price: 1199,
    stock: 24,
    status: "Active",
    image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=160&h=160&fit=crop",
  },
  {
    id: "PRD-006",
    name: "Classic Running Shoes",
    category: "Fashion",
    sku: "FSH-006",
    price: 3299,
    stock: 12,
    status: "Draft",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=160&h=160&fit=crop",
  },
  {
    id: "PRD-007",
    name: "Kitchen Storage Containers",
    category: "Home & Kitchen",
    sku: "HOM-007",
    price: 799,
    stock: 31,
    status: "Active",
    image: "https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?w=160&h=160&fit=crop",
  },
  {
    id: "PRD-008",
    name: "Everyday Backpack",
    category: "Fashion",
    sku: "FSH-008",
    price: 1499,
    stock: 5,
    status: "Active",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=160&h=160&fit=crop",
  },
];

const categories = [
  "All categories",
  "Fashion",
  "Groceries",
  "Food & Snacks",
  "Home & Kitchen",
  "Beauty & Personal Care",
  "Electronics",
];

const statusStyles = {
  Active: "bg-emerald-50 text-emerald-700",
  Draft: "bg-gray-100 text-gray-600",
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function VendorProductsPage() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All categories");
  const [stockFilter, setStockFilter] = useState("All stock");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [menuId, setMenuId] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [notice, setNotice] = useState("");

  const filteredProducts = useMemo(() => {
    const term = search.toLowerCase().trim();

    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(term) ||
        product.sku.toLowerCase().includes(term);

      const matchesCategory =
        category === "All categories" || product.category === category;

      const matchesStock =
        stockFilter === "All stock" ||
        (stockFilter === "In stock" && product.stock > 10) ||
        (stockFilter === "Low stock" &&
          product.stock > 0 &&
          product.stock <= 10) ||
        (stockFilter === "Out of stock" && product.stock === 0);

      const matchesStatus =
        statusFilter === "All statuses" || product.status === statusFilter;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStock &&
        matchesStatus
      );
    });
  }, [products, search, category, stockFilter, statusFilter]);

  const activeCount = products.filter(
    (product) => product.status === "Active"
  ).length;

  const lowStockCount = products.filter(
    (product) => product.stock > 0 && product.stock <= 10
  ).length;

  const outOfStockCount = products.filter(
    (product) => product.stock === 0
  ).length;

  function deleteProduct(id: string) {
    const product = products.find((item) => item.id === id);
    if (!product) return;

    if (window.confirm(`Delete "${product.name}" from this demo list?`)) {
      setProducts((current) => current.filter((item) => item.id !== id));
      setMenuId(null);
      setNotice("Product removed from the demo list.");
    }
  }

  function saveEdit() {
    if (!editingProduct || !editingProduct.name.trim()) {
      setNotice("Product name cannot be empty.");
      return;
    }

    setProducts((current) =>
      current.map((product) =>
        product.id === editingProduct.id ? editingProduct : product
      )
    );
    setEditingProduct(null);
    setNotice("Product updated in the demo list.");
  }

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Products
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your catalogue, pricing and inventory.
            </p>
          </div>

          <Link
            href="/vendor/products/new"
            className="inline-flex w-fit items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            <Plus size={17} />
            Add product
          </Link>
        </div>

        {/* Notice */}
        {notice && (
          <div className="mb-5 flex items-center justify-between rounded-lg border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm text-indigo-800">
            {notice}
            <button
              type="button"
              onClick={() => setNotice("")}
              aria-label="Dismiss notification"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Summary cards */}
        <div className="mb-7 grid grid-cols-2 gap-4 xl:grid-cols-4">
          <SummaryCard
            title="Total products"
            value={products.length}
            icon={<Package size={19} />}
            iconClass="bg-indigo-50 text-indigo-600"
          />
          <SummaryCard
            title="Active products"
            value={activeCount}
            icon={<CheckCircle2 size={19} />}
            iconClass="bg-emerald-50 text-emerald-600"
          />
          <SummaryCard
            title="Low stock"
            value={lowStockCount}
            icon={<AlertTriangle size={19} />}
            iconClass="bg-amber-50 text-amber-600"
          />
          <SummaryCard
            title="Out of stock"
            value={outOfStockCount}
            icon={<XCircle size={19} />}
            iconClass="bg-red-50 text-red-600"
          />
        </div>

        {/* Table */}
        <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="border-b border-gray-200 p-4 sm:p-5">
            <h2 className="font-semibold text-gray-900">All products</h2>
            <p className="mt-1 text-sm text-gray-500">
              Search, filter and manage your products.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <div className="relative sm:col-span-2 xl:col-span-1">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search name or SKU..."
                  aria-label="Search products"
                  className="w-full rounded-lg border border-gray-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                aria-label="Filter by category"
                className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-indigo-500"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <select
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value)}
                aria-label="Filter by stock"
                className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-indigo-500"
              >
                {["All stock", "In stock", "Low stock", "Out of stock"].map(
                  (item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  )
                )}
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                aria-label="Filter by product status"
                className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-indigo-500"
              >
                {["All statuses", "Active", "Draft"].map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-5 py-4 font-medium">Product</th>
                  <th className="px-5 py-4 font-medium">Category</th>
                  <th className="px-5 py-4 font-medium">Price</th>
                  <th className="px-5 py-4 font-medium">Stock</th>
                  <th className="px-5 py-4 font-medium">Status</th>
                  <th className="px-5 py-4 text-right font-medium">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50/70">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="size-12 shrink-0 rounded-lg border border-gray-100 bg-gray-50 object-cover"
                          onError={(e) => {
                            e.currentTarget.style.visibility = "hidden";
                          }}
                        />
                        <div>
                          <p className="font-medium text-gray-900">
                            {product.name}
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                            SKU: {product.sku}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {product.category}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 font-semibold text-gray-900">
                      {formatPrice(product.price)}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`font-medium ${
                          product.stock === 0
                            ? "text-red-600"
                            : product.stock <= 10
                              ? "text-amber-600"
                              : "text-gray-700"
                        }`}
                      >
                        {product.stock}
                      </span>
                      <p className="mt-1 text-xs text-gray-400">
                        {product.stock === 0
                          ? "Out of stock"
                          : product.stock <= 10
                            ? "Low stock"
                            : "In stock"}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[product.status]}`}
                      >
                        {product.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <div className="relative inline-block">
                        <button
                          type="button"
                          onClick={() =>
                            setMenuId(
                              menuId === product.id ? null : product.id
                            )
                          }
                          aria-label={`Actions for ${product.name}`}
                          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                        >
                          <MoreHorizontal size={19} />
                        </button>

                        {menuId === product.id && (
                          <div className="absolute right-0 z-20 mt-1 w-40 rounded-lg border border-gray-200 bg-white p-1 text-left shadow-lg">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingProduct({ ...product });
                                setMenuId(null);
                              }}
                              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              <Pencil size={15} />
                              Edit product
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteProduct(product.id)}
                              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                              <Trash2 size={15} />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-5 py-16 text-center">
                      <Package
                        size={30}
                        className="mx-auto text-gray-300"
                      />
                      <p className="mt-3 font-medium text-gray-800">
                        No products found
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        Try changing your search or filters.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setSearch("");
                          setCategory("All categories");
                          setStockFilter("All stock");
                          setStatusFilter("All statuses");
                        }}
                        className="mt-3 text-sm font-medium text-indigo-600"
                      >
                        Clear filters
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="border-t border-gray-200 px-5 py-4 text-xs text-gray-500">
            Showing {filteredProducts.length} of {products.length} products · Demo data
          </div>
        </section>
      </div>

      {/* Edit product modal */}
      {editingProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/40 p-4"
          onClick={() => setEditingProduct(null)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-product-title"
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2
                id="edit-product-title"
                className="text-lg font-bold text-gray-900"
              >
                Edit product
              </h2>
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                aria-label="Close edit form"
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <label
                  htmlFor="edit-name"
                  className="text-sm font-medium text-gray-700"
                >
                  Product name
                </label>
                <input
                  id="edit-name"
                  value={editingProduct.name}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      name: e.target.value,
                    })
                  }
                  className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="edit-price"
                  className="text-sm font-medium text-gray-700"
                >
                  Price (₹)
                </label>
                <input
                  id="edit-price"
                  type="number"
                  min="0"
                  value={editingProduct.price}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      price: Number(e.target.value),
                    })
                  }
                  className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="edit-stock"
                  className="text-sm font-medium text-gray-700"
                >
                  Stock quantity
                </label>
                <input
                  id="edit-stock"
                  type="number"
                  min="0"
                  value={editingProduct.stock}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      stock: Math.max(0, Number(e.target.value)),
                    })
                  }
                  className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="edit-status"
                  className="text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <select
                  id="edit-status"
                  value={editingProduct.status}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      status: e.target.value as Product["status"],
                    })
                  }
                  className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500"
                >
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveEdit}
                className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                Save changes
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

function SummaryCard({
  title,
  value,
  icon,
  iconClass,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  iconClass: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm text-gray-500">{title}</p>
        <div className={`rounded-lg p-2 ${iconClass}`}>{icon}</div>
      </div>
      <p className="mt-4 text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}
