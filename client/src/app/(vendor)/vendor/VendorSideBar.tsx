
"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const navigation = [
  { label: "Overview", href: "/vendor", icon: "▦" },
  { label: "Products", href: "/vendor/products", icon: "□" },
  { label: "Orders", href: "/vendor/orders", icon: "↔" },
  { label: "Analytics", href: "/vendor/analytics", icon: "▥" },
  { label: "Store Settings", href: "/vendor/settings", icon: "⚙" },
];

export default function VendorSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const SidebarContent = () => (
    <>
      <div className="flex h-16 items-center justify-between border-b border-gray-200 px-6">
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="text-xl font-bold text-indigo-600"
        >
          MultiStore
        </Link>

        <button
          onClick={() => setIsOpen(false)}
          className="md:hidden text-2xl text-gray-500"
          aria-label="Close sidebar"
        >
          ×
        </button>
      </div>

      <div className="border-b border-gray-200 p-5">
        <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
          Seller workspace
        </p>
        <p className="mt-2 font-semibold text-gray-900">My Store</p>
        <p className="mt-1 text-sm text-gray-500">Demo Vendor</p>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive =
            item.href === "/vendor"
              ? pathname === "/vendor"
              : pathname === item.href ||
                pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <span className="w-5 text-center text-lg" aria-hidden="true">
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-gray-200 p-4">
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-gray-600 hover:bg-gray-50"
        >
          <span aria-hidden="true">←</span>
          Back to marketplace
        </Link>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile hamburger */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open vendor menu"
        aria-expanded={isOpen}
        className="fixed left-4 top-4 z-40 flex size-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-xl text-gray-700 shadow-sm md:hidden"
      >
        ☰
      </button>

      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-gray-200 bg-white md:flex md:flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 md:hidden"
          onClick={() => setIsOpen(false)}
        >
          <aside
            className="flex h-full w-72 max-w-[85vw] flex-col bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  );
}
