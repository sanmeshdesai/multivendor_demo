import type { ReactNode } from "react";
import Link from "next/link";
import VendorSidebar from "./VendorSideBar";


export default function VendorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <VendorSidebar />

      <div className="min-w-0 flex-1">
        {/* Mobile navigation header */}
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-5 md:hidden">
          <span className="font-bold text-indigo-600">MultiStore</span>

          <Link
            href="/"
            className="text-sm text-gray-600"
          >
            Storefront
          </Link>
        </header>

        {children}
      </div>
    </div>
  );
}