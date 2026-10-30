const categories = [
    { name: "Fashion", icon: "👕" },
    { name: "Groceries", icon: "🥬" },
    { name: "Food & Snacks", icon:"🍿"  },
    { name: "Home & Kitchen", icon: "🏠" },
    { name: "Beauty & Personal Care", icon: "🧴" },
    { name: "Electronics", icon: "🎧" },
];

export default function ShopByCategory() {
    return(
        <section className="px-4 py-10 sm:px-10 lg:px-12">
            <div className="mx-auto max-w-7xl">
                <div className="mb-6">

                <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                    Shop By Category
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                    Explore products across all your favorite categories.
                </p>
                </div>


            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                {
                    categories.map((category) => (
                        <a key={category.name} href="/products"
                        className="flex min-h-36 flex-col items-center justify-center gap-3
                        rounded-xl border border-gray-200 bg-white p-4 text-center transition
                        hover:border-indigo-300 hover:bg-indigo-50">
                            <span className="text-3xl" aria-hidden="true">{category.icon}</span>

                            <span className="text-sm font-semibold text-gray-500">{category.name}</span>
                        </a>
                    ))
                }
                </div>
            </div>

        </section>
    )
}