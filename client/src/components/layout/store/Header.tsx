export default function Header() {
    return (
        <header className="border-b border-gray-200 bg-indigo-50">

            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                
                {/* logo */}
                <a href="/" className="text-xl font-bold tracking-tight text-gray-900">
                    MultiStore
                </a>

                {/* Search Bar */}
                <form action="" className="hidden w-full max-w-md md:block">
                    <input type="search" placeholder="Search Products.."
                    className="w-full rounded-lg border border-gray-300 bg-gray-50
                    px-4 py-2 text-sm outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-100"  />
                </form>

                {/* Customer */}
                <nav className="flex items-center gap-8 yexy-sm font-medium text-gray-700">
                    <a href="/login" className="hover:text-indigo-600">
                        Profile
                    </a>
                    <a href="/cart" className="hover:text-indigo-600">
                        Cart
                    </a>
                </nav>

            </div>
            
        </header>
    )
}