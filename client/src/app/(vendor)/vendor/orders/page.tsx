
"use client";

import { useMemo, useState } from "react";
import {
  Search,
  ShoppingBag,
  Clock3,
  Truck,
  CheckCircle2,
  Eye,
  X,
  ChevronDown,
  Package,
} from "lucide-react";

type OrderStatus =
  | "Pending"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

type Order = {
  id: string;
  customer: string;
  email: string;
  product: string;
  quantity: number;
  date: string;
  total: number;
  payment: "Paid" | "Pending" | "Refunded";
  status: OrderStatus;
};

const initialOrders: Order[] = [
  {
    id: "MS-1001",
    customer: "Aarav Sharma",
    email: "aarav@example.com",
    product: "Premium Cotton T-Shirt",
    quantity: 2,
    date: "2026-10-28",
    total: 998,
    payment: "Paid",
    status: "Processing",
  },
  {
    id: "MS-1002",
    customer: "Priya Patil",
    email: "priya@example.com",
    product: "Wireless Headphones",
    quantity: 1,
    date: "2026-10-28",
    total: 2499,
    payment: "Paid",
    status: "Pending",
  },
  {
    id: "MS-1003",
    customer: "Rohan Deshmukh",
    email: "rohan@example.com",
    product: "Organic Cashews",
    quantity: 3,
    date: "2026-10-27",
    total: 1350,
    payment: "Paid",
    status: "Shipped",
  },
  {
    id: "MS-1004",
    customer: "Sneha Joshi",
    email: "sneha@example.com",
    product: "Ceramic Coffee Mug",
    quantity: 2,
    date: "2026-10-26",
    total: 798,
    payment: "Pending",
    status: "Pending",
  },
  {
    id: "MS-1005",
    customer: "Vikram Kulkarni",
    email: "vikram@example.com",
    product: "Running Shoes",
    quantity: 1,
    date: "2026-10-25",
    total: 3299,
    payment: "Paid",
    status: "Delivered",
  },
  {
    id: "MS-1006",
    customer: "Neha Shah",
    email: "neha@example.com",
    product: "Skincare Essentials",
    quantity: 1,
    date: "2026-10-24",
    total: 1199,
    payment: "Refunded",
    status: "Cancelled",
  },
  {
    id: "MS-1007",
    customer: "Aditya More",
    email: "aditya@example.com",
    product: "Kitchen Storage Set",
    quantity: 2,
    date: "2026-10-23",
    total: 1598,
    payment: "Paid",
    status: "Processing",
  },
];

const statusStyles: Record<OrderStatus, string> = {
  Pending: "bg-amber-50 text-amber-700 ring-amber-600/20",
  Processing: "bg-blue-50 text-blue-700 ring-blue-600/20",
  Shipped: "bg-violet-50 text-violet-700 ring-violet-600/20",
  Delivered: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  Cancelled: "bg-red-50 text-red-700 ring-red-600/20",
};

const paymentStyles: Record<Order["payment"], string> = {
  Paid: "text-emerald-700",
  Pending: "text-amber-700",
  Refunded: "text-red-600",
};

const filters = [
  "All",
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

export default function VendorOrdersPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = useMemo(() => {
    const term = search.trim().toLowerCase();

    return orders.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(term) ||
        order.customer.toLowerCase().includes(term) ||
        order.product.toLowerCase().includes(term);

      const matchesStatus =
        statusFilter === "All" || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  const pendingCount = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const processingCount = orders.filter(
    (order) => order.status === "Processing"
  ).length;

  const deliveredCount = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  function updateStatus(orderId: string, status: OrderStatus) {
    setOrders((current) =>
      current.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );

    setSelectedOrder((current) =>
      current?.id === orderId ? { ...current, status } : current
    );
  }

  function formatDate(date: string) {
    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(`${date}T00:00:00`));
  }

  function formatPrice(price: number) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  }

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Orders
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage customer orders and track fulfillment.
            </p>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600">
            <ShoppingBag size={16} />
            {orders.length} demo orders
          </div>
        </div>

        {/* Summary cards */}
        <div className="mb-7 grid grid-cols-2 gap-4 xl:grid-cols-4">
          <SummaryCard
            title="Total orders"
            value={orders.length}
            icon={<ShoppingBag size={19} />}
            iconClass="bg-indigo-50 text-indigo-600"
          />
          <SummaryCard
            title="Pending"
            value={pendingCount}
            icon={<Clock3 size={19} />}
            iconClass="bg-amber-50 text-amber-600"
          />
          <SummaryCard
            title="Processing"
            value={processingCount}
            icon={<Package size={19} />}
            iconClass="bg-blue-50 text-blue-600"
          />
          <SummaryCard
            title="Delivered"
            value={deliveredCount}
            icon={<CheckCircle2 size={19} />}
            iconClass="bg-emerald-50 text-emerald-600"
          />
        </div>

        {/* Orders table */}
        <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="border-b border-gray-200 p-4 sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="font-semibold text-gray-900">
                  All orders
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Search orders and manage their status.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative">
                  <Search
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search orders..."
                    aria-label="Search orders"
                    className="w-full rounded-lg border border-gray-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 sm:w-64"
                  />
                </div>

                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    aria-label="Filter orders by status"
                    className="w-full appearance-none rounded-lg border border-gray-200 bg-white py-2.5 pl-3 pr-9 text-sm text-gray-700 outline-none focus:border-indigo-500 sm:w-44"
                  >
                    {filters.map((filter) => (
                      <option key={filter} value={filter}>
                        {filter === "All" ? "All statuses" : filter}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={15}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>
            </div>

            <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setStatusFilter(filter)}
                  className={`shrink-0 rounded-lg px-3 py-2 text-sm font-medium transition ${
                    statusFilter === filter
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px] text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-5 py-4 font-medium">Order</th>
                  <th className="px-5 py-4 font-medium">Customer</th>
                  <th className="px-5 py-4 font-medium">Product</th>
                  <th className="px-5 py-4 font-medium">Date</th>
                  <th className="px-5 py-4 font-medium">Total</th>
                  <th className="px-5 py-4 font-medium">Payment</th>
                  <th className="px-5 py-4 font-medium">Status</th>
                  <th className="px-5 py-4 text-right font-medium">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="transition hover:bg-gray-50/70"
                  >
                    <td className="whitespace-nowrap px-5 py-4 font-semibold text-indigo-600">
                      #{order.id}
                    </td>

                    <td className="px-5 py-4">
                      <p className="whitespace-nowrap font-medium text-gray-900">
                        {order.customer}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {order.email}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="max-w-52 font-medium text-gray-800">
                        {order.product}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        Qty: {order.quantity}
                      </p>
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-gray-600">
                      {formatDate(order.date)}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 font-semibold text-gray-900">
                      {formatPrice(order.total)}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4">
                      <span
                        className={`font-medium ${paymentStyles[order.payment]}`}
                      >
                        {order.payment}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${statusStyles[order.status]}`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedOrder(order)}
                        aria-label={`View order ${order.id}`}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                      >
                        <Eye size={14} />
                        View
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredOrders.length === 0 && (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-5 py-16 text-center"
                    >
                      <ShoppingBag
                        size={30}
                        className="mx-auto text-gray-300"
                      />
                      <p className="mt-3 font-medium text-gray-800">
                        No orders found
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        Try another search or status filter.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setSearch("");
                          setStatusFilter("All");
                        }}
                        className="mt-3 text-sm font-medium text-indigo-600 hover:text-indigo-700"
                      >
                        Clear filters
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-2 border-t border-gray-200 px-5 py-4 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
            <span>
              Showing {filteredOrders.length} of {orders.length} orders
            </span>
            <span>Demo data · No database connected</span>
          </div>
        </section>
      </div>

      {/* Order details modal */}
      {selectedOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/40 p-4"
          onClick={() => setSelectedOrder(null)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-modal-title"
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">Order details</p>
                <h2
                  id="order-modal-title"
                  className="mt-1 text-xl font-bold text-gray-900"
                >
                  #{selectedOrder.id}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                aria-label="Close order details"
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={19} />
              </button>
            </div>

            <div className="mt-6 space-y-5">
              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Customer
                </p>
                <p className="mt-2 font-semibold text-gray-900">
                  {selectedOrder.customer}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {selectedOrder.email}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Product
                </p>
                <p className="mt-2 font-medium text-gray-900">
                  {selectedOrder.product}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Quantity: {selectedOrder.quantity}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Order date</p>
                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {formatDate(selectedOrder.date)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Payment</p>
                  <p className={`mt-1 text-sm font-semibold ${paymentStyles[selectedOrder.payment]}`}>
                    {selectedOrder.payment}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Order total</p>
                  <p className="mt-1 text-lg font-bold text-gray-900">
                    {formatPrice(selectedOrder.total)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Current status</p>
                  <span
                    className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${statusStyles[selectedOrder.status]}`}
                  >
                    {selectedOrder.status}
                  </span>
                </div>
              </div>

              <div>
                <label
                  htmlFor="order-status"
                  className="text-sm font-medium text-gray-700"
                >
                  Update order status
                </label>
                <select
                  id="order-status"
                  value={selectedOrder.status}
                  onChange={(e) =>
                    updateStatus(
                      selectedOrder.id,
                      e.target.value as OrderStatus
                    )
                  }
                  className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                >
                  {(
                    [
                      "Pending",
                      "Processing",
                      "Shipped",
                      "Delivered",
                      "Cancelled",
                    ] as OrderStatus[]
                  ).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <p className="mt-2 text-xs leading-5 text-gray-500">
                  Changes are held in browser memory only and reset when the
                  page reloads.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedOrder(null)}
              className="mt-6 w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Done
            </button>
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
      <p className="mt-4 text-2xl font-bold tracking-tight text-gray-900">
        {value}
      </p>
    </div>
  );
}
