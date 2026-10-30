import Link from "next/link";

const stats = [
  {
    label: "Total Revenue",
    value: "₹48,590",
    change: "+12.5%",
    description: "vs. previous month",
  },
  {
    label: "Total Orders",
    value: "156",
    change: "+8.2%",
    description: "vs. previous month",
  },
  {
    label: "Total Products",
    value: "42",
    change: "",
    description: "Across all categories",
  },
  {
    label: "Pending Orders",
    value: "12",
    change: "",
    description: "Need your attention",
  },
];

const recentOrders = [
  {
    id: "#ORD-1001",
    customer: "Rahul Sharma",
    date: "29 Oct 2026",
    amount: 1299,
    status: "Processing",
  },
  {
    id: "#ORD-1002",
    customer: "Priya Patel",
    date: "29 Oct 2026",
    amount: 849,
    status: "Pending",
  },
  {
    id: "#ORD-1003",
    customer: "Amit Kumar",
    date: "28 Oct 2026",
    amount: 2199,
    status: "Shipped",
  },
  {
    id: "#ORD-1004",
    customer: "Sneha Joshi",
    date: "28 Oct 2026",
    amount: 599,
    status: "Delivered",
  },
];

export default function VendorDashboard() {
  return (
    <main className="min-h-screen">
      {/* Page heading */}
      <header className="flex flex-col gap-4 border-b border-gray-200 bg-white px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back! Here is your store overview.
          </p>
        </div>

        <Link
          href="/vendor/products/new"
          className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          + Add Product
        </Link>
      </header>

      <div className="space-y-8 p-5 sm:p-8">
        {/* Statistics */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-gray-200 bg-white p-5"
            >
              <p className="text-sm font-medium text-gray-500">
                {stat.label}
              </p>

              <p className="mt-3 text-2xl font-bold text-gray-900">
                {stat.value}
              </p>

              <p className="mt-2 text-xs text-gray-500">
                {stat.change && (
                  <span className="mr-1 font-semibold text-green-600">
                    {stat.change}
                  </span>
                )}
                {stat.description}
              </p>
            </div>
          ))}
        </section>

        {/* Recent orders */}
        <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
            <div>
              <h2 className="font-semibold text-gray-900">
                Recent Orders
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Keep track of your latest sales.
              </p>
            </div>

            <Link
              href="/vendor/orders"
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
            >
              View all
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-5 py-3 font-medium">Order</th>
                  <th className="px-5 py-3 font-medium">Customer</th>
                  <th className="px-5 py-3 font-medium">Date</th>
                  <th className="px-5 py-3 font-medium">Amount</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-5 py-4 font-medium text-indigo-600">
                      {order.id}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-gray-700">
                      {order.customer}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-gray-500">
                      {order.date}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 font-medium text-gray-900">
                      ₹{order.amount.toLocaleString("en-IN")}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                          order.status === "Delivered"
                            ? "bg-green-50 text-green-700"
                            : order.status === "Shipped"
                              ? "bg-blue-50 text-blue-700"
                              : order.status === "Pending"
                                ? "bg-amber-50 text-amber-700"
                                : "bg-indigo-50 text-indigo-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Inventory and quick actions */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h2 className="font-semibold text-gray-900">
              Inventory Overview
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Sample stock information for your store.
            </p>

            <div className="mt-5 space-y-4">
              {[
                { label: "In stock", count: 32, color: "bg-green-500" },
                { label: "Low stock", count: 7, color: "bg-amber-500" },
                { label: "Out of stock", count: 3, color: "bg-red-500" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-gray-600">{item.label}</span>
                    <span className="font-semibold text-gray-900">
                      {item.count} products
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className={`h-full rounded-full ${item.color}`}
                      style={{ width: `${(item.count / 42) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h2 className="font-semibold text-gray-900">Quick Actions</h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage your store more efficiently.
            </p>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Link
                href="/vendor/products"
                className="rounded-lg border border-gray-200 p-4 transition hover:border-indigo-300 hover:bg-indigo-50"
              >
                <p className="font-medium text-gray-900">Manage Products</p>
                <p className="mt-1 text-xs text-gray-500">
                  Update products and stock
                </p>
              </Link>

              <Link
                href="/vendor/orders"
                className="rounded-lg border border-gray-200 p-4 transition hover:border-indigo-300 hover:bg-indigo-50"
              >
                <p className="font-medium text-gray-900">Manage Orders</p>
                <p className="mt-1 text-xs text-gray-500">
                  Review customer orders
                </p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}