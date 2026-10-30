
"use client";

import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  IndianRupee,
  ShoppingBag,
  Package,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  CalendarDays,
} from "lucide-react";

type Period = "7 days" | "30 days" | "90 days";

const analyticsData: Record<
  Period,
  { labels: string[]; revenue: number[]; orders: number[] }
> = {
  "7 days": {
    labels: ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed"],
    revenue: [3200, 4800, 3900, 6500, 5100, 8200, 7400],
    orders: [8, 12, 10, 16, 13, 20, 18],
  },
  "30 days": {
    labels: ["1–5", "6–10", "11–15", "16–20", "21–25", "26–30"],
    revenue: [18500, 24000, 19800, 31200, 27500, 36800],
    orders: [42, 56, 48, 71, 65, 89],
  },
  "90 days": {
    labels: ["Aug 1–15", "Aug 16–31", "Sep 1–15", "Sep 16–30", "Oct 1–15", "Oct 16–30"],
    revenue: [52000, 61000, 58000, 72000, 68000, 91000],
    orders: [120, 145, 138, 166, 159, 214],
  },
};

const topProducts = [
  {
    name: "Premium Cotton T-Shirt",
    category: "Fashion",
    sold: 86,
    revenue: 42914,
    percentage: 88,
    color: "bg-indigo-500",
  },
  {
    name: "Wireless Headphones",
    category: "Electronics",
    sold: 64,
    revenue: 38400,
    percentage: 70,
    color: "bg-violet-500",
  },
  {
    name: "Organic Cashews 500g",
    category: "Food & Snacks",
    sold: 52,
    revenue: 23400,
    percentage: 56,
    color: "bg-emerald-500",
  },
  {
    name: "Ceramic Coffee Mug",
    category: "Home & Kitchen",
    sold: 38,
    revenue: 15162,
    percentage: 42,
    color: "bg-amber-500",
  },
];

const orderStatuses = [
  { label: "Delivered", count: 112, color: "bg-emerald-500" },
  { label: "Processing", count: 24, color: "bg-blue-500" },
  { label: "Pending", count: 12, color: "bg-amber-400" },
  { label: "Cancelled", count: 8, color: "bg-red-400" },
];

const categories = [
  { name: "Fashion", revenue: 52400, share: 42, color: "bg-indigo-500" },
  { name: "Electronics", revenue: 38600, share: 31, color: "bg-violet-500" },
  { name: "Food & Snacks", revenue: 21200, share: 17, color: "bg-emerald-500" },
  { name: "Home & Kitchen", revenue: 12500, share: 10, color: "bg-amber-400" },
];

function money(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function VendorAnalyticsPage() {
  const [period, setPeriod] = useState<Period>("30 days");
  const data = analyticsData[period];

  const totalRevenue = data.revenue.reduce((sum, value) => sum + value, 0);
  const totalOrders = data.orders.reduce((sum, value) => sum + value, 0);
  const maxRevenue = Math.max(...data.revenue);

  function exportReport() {
    const rows = [
      ["Period", period],
      ["Metric", "Value"],
      ["Revenue", totalRevenue],
      ["Orders", totalOrders],
      [],
      ["Interval", "Revenue (INR)", "Orders"],
      ...data.labels.map((label, index) => [
        label,
        data.revenue[index],
        data.orders[index],
      ]),
    ];

    const csv = rows
      .map((row) =>
        row
          .map((cell) => {
            const value = String(cell ?? "");
            return `"${value.replace(/"/g, '""')}"`;
          })
          .join(",")
      )
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `multistore-analytics-${period.replace(" ", "-")}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Heading and controls */}
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Analytics
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Track your store performance, sales and customer orders.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2.5">
              <CalendarDays size={16} className="text-gray-500" />
              <select
                aria-label="Analytics date range"
                value={period}
                onChange={(e) => setPeriod(e.target.value as Period)}
                className="bg-transparent text-sm font-medium text-gray-700 outline-none"
              >
                <option>7 days</option>
                <option>30 days</option>
                <option>90 days</option>
              </select>
            </div>

            <button
              type="button"
              onClick={exportReport}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              <Download size={16} />
              Export report
            </button>
          </div>
        </div>

        {/* Demo data notice */}
        <div className="mb-6 rounded-lg border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm text-indigo-800">
          Demo analytics · Sample figures for UI testing, not actual store
          transactions.
        </div>

        {/* KPI cards */}
        <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            title="Total revenue"
            value={money(totalRevenue)}
            subtitle="For selected period"
            icon={<IndianRupee size={19} />}
            iconClass="bg-indigo-50 text-indigo-600"
            trend="+12.8%"
            positive
          />
          <MetricCard
            title="Total orders"
            value={totalOrders.toLocaleString("en-IN")}
            subtitle="Orders in selected period"
            icon={<ShoppingBag size={19} />}
            iconClass="bg-blue-50 text-blue-600"
            trend="+8.4%"
            positive
          />
          <MetricCard
            title="Products sold"
            value={Math.round(totalOrders * 1.6).toLocaleString("en-IN")}
            subtitle="Estimated units in demo"
            icon={<Package size={19} />}
            iconClass="bg-violet-50 text-violet-600"
            trend="+6.2%"
            positive
          />
          <MetricCard
            title="Avg. order value"
            value={money(totalOrders ? totalRevenue / totalOrders : 0)}
            subtitle="Revenue divided by orders"
            icon={<Users size={19} />}
            iconClass="bg-emerald-50 text-emerald-600"
            trend="-2.1%"
            positive={false}
          />
        </div>

        {/* Revenue chart */}
        <section className="mb-6 rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="font-semibold text-gray-900">
                Revenue overview
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Revenue trend for the last {period.toLowerCase()}.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-emerald-700">
              <TrendingUp size={17} />
              <span>Sample trend</span>
            </div>
          </div>

          <div className="mt-7 flex h-64 gap-3 sm:gap-5">
            {/* Y-axis labels */}
            <div className="flex flex-col justify-between pb-7 text-right text-xs text-gray-400">
              <span>{money(maxRevenue)}</span>
              <span>{money(maxRevenue * 0.75)}</span>
              <span>{money(maxRevenue * 0.5)}</span>
              <span>{money(maxRevenue * 0.25)}</span>
              <span>₹0</span>
            </div>

            {/* Bars */}
            <div className="relative flex min-w-0 flex-1 items-end justify-around gap-2 border-b border-gray-200 pb-0">
              <div className="pointer-events-none absolute inset-0 flex flex-col justify-between pb-7">
                {[0, 1, 2, 3, 4].map((line) => (
                  <div
                    key={line}
                    className="border-t border-dashed border-gray-100"
                  />
                ))}
              </div>

              {data.revenue.map((revenue, index) => (
                <div
                  key={data.labels[index]}
                  className="group relative z-10 flex h-full min-w-0 flex-1 flex-col items-center justify-end"
                >
                  <div className="pointer-events-none absolute bottom-full z-20 mb-2 hidden whitespace-nowrap rounded-lg bg-gray-900 px-3 py-2 text-xs text-white shadow-lg group-hover:block">
                    {money(revenue)}
                    <span className="block mt-1 text-gray-300">
                      {data.orders[index]} orders
                    </span>
                  </div>

                  <div
                    className="w-full max-w-12 rounded-t-md bg-indigo-500 transition hover:bg-indigo-600"
                    style={{
                      height: `${Math.max((revenue / maxRevenue) * 100, 3)}%`,
                    }}
                    title={`${data.labels[index]}: ${money(revenue)}`}
                  />

                  <span className="h-7 pt-2 text-center text-[10px] text-gray-500 sm:text-xs">
                    {data.labels[index]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Product performance and order status */}
        <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-5">
          <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6 xl:col-span-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-gray-900">
                  Top-selling products
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Best performers in this sample dataset.
                </p>
              </div>
              <Package size={20} className="text-gray-400" />
            </div>

            <div className="mt-5 space-y-5">
              {topProducts.map((product, index) => (
                <div key={product.name}>
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-sm font-semibold text-gray-500">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900">
                        {product.name}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {product.category} · {product.sold} units sold
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">
                        {money(product.revenue)}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">Revenue</p>
                    </div>
                  </div>

                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className={`h-full rounded-full ${product.color}`}
                      style={{ width: `${product.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6 xl:col-span-2">
            <h2 className="font-semibold text-gray-900">
              Order breakdown
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Sample orders by fulfillment status.
            </p>

            <div className="mt-6">
              <div className="flex h-3 overflow-hidden rounded-full bg-gray-100">
                {orderStatuses.map((status) => (
                  <div
                    key={status.label}
                    className={status.color}
                    style={{
                      width: `${
                        (status.count /
                          orderStatuses.reduce(
                            (sum, item) => sum + item.count,
                            0
                          )) *
                        100
                      }%`,
                    }}
                    title={`${status.label}: ${status.count}`}
                  />
                ))}
              </div>

              <div className="mt-6 space-y-5">
                {orderStatuses.map((status) => {
                  const total = orderStatuses.reduce(
                    (sum, item) => sum + item.count,
                    0
                  );

                  return (
                    <div
                      key={status.label}
                      className="flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`size-2.5 rounded-full ${status.color}`}
                        />
                        <span className="text-sm text-gray-600">
                          {status.label}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-semibold text-gray-900">
                          {status.count}
                        </span>
                        <span className="ml-2 text-xs text-gray-400">
                          {Math.round((status.count / total) * 100)}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>

        {/* Category performance */}
        <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
          <div className="mb-5">
            <h2 className="font-semibold text-gray-900">
              Sales by category
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Illustrative revenue distribution across categories.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {categories.map((category) => (
              <div
                key={category.name}
                className="rounded-xl border border-gray-100 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm text-gray-600">{category.name}</p>
                  <span className="text-xs font-medium text-gray-500">
                    {category.share}%
                  </span>
                </div>

                <p className="mt-3 text-xl font-bold text-gray-900">
                  {money(category.revenue)}
                </p>

                <div className="mt-4 h-2 rounded-full bg-gray-100">
                  <div
                    className={`h-full rounded-full ${category.color}`}
                    style={{ width: `${category.share}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <p className="mt-5 text-center text-xs text-gray-400">
          MultiStore Vendor Analytics · All displayed figures are illustrative demo data.
        </p>
      </div>
    </main>
  );
}

function MetricCard({
  title,
  value,
  subtitle,
  icon,
  iconClass,
  trend,
  positive,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  iconClass: string;
  trend: string;
  positive: boolean;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-gray-500">{title}</p>
        <div className={`rounded-lg p-2 ${iconClass}`}>{icon}</div>
      </div>

      <p className="mt-4 text-2xl font-bold tracking-tight text-gray-900">
        {value}
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex items-center gap-1 text-xs font-semibold ${
            positive ? "text-emerald-600" : "text-red-600"
          }`}
        >
          {positive ? (
            <ArrowUpRight size={14} />
          ) : (
            <ArrowDownRight size={14} />
          )}
          {trend}
        </span>
        <span className="text-xs text-gray-400">{subtitle}</span>
      </div>
    </div>
  );
}
