import Link from "next/link";

const navigation = [
  { label: "Overview", href: "/vendor", icon: "▦" },
  { label: "Products", href: "/vendor/products", icon: "□" },
  { label: "Orders", href: "/vendor/orders", icon: "↔" },
  { label: "Analytics", href: "/vendor/analytics", icon: "▥" },
  { label: "Store Settings", href: "/vendor/settings", icon: "⚙" },
];

export default function VendorSidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-gray-200 bg-white md:flex md:flex-col">
      <div className="flex h-16 items-center border-b border-gray-200 px-6">
        <Link href="/" className="text-xl font-bold text-indigo-600">
          MultiStore
        </Link>
      </div>

      <div className="border-b border-gray-200 p-5">
        <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
          Seller workspace
        </p>
        <p className="mt-2 font-semibold text-gray-900">My Store</p>
        <p className="mt-1 text-sm text-gray-500">Demo Vendor</p>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item, index) => (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
              index === 0
                ? "bg-indigo-50 text-indigo-700"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <span className="w-5 text-center text-lg" aria-hidden="true">
              {item.icon}
            </span>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="border-t border-gray-200 p-4">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-gray-600 hover:bg-gray-50"
        >
          <span aria-hidden="true">←</span>
          Back to marketplace
        </Link>
      </div>
    </aside>
  );
}