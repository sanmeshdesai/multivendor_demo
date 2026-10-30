export default function HeroBanner() {
    return (
        <section className="px-4 py-8 sm:px-10 lg:px-12 lg:py-12">

            <div className="mx-auto flex max-w-7xl flex-col items-start justify-center gap-6
            overflow-hidden rounded-2xl bg-indigo-50 px-6 py-12 sm:px-10 lg:min-h-[360px]
            lg:flex-row lg:items-center lg:justify-between lg:px-16  ">
                
                <div className="max-w-xl">
                    <span className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                        Welcome to Store
                    </span>    
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                        Everything you love,
                        <br />
                        All in one place.
                    </h1>

                    <p className="mt-4 max-w-lg text-base leading-7 text-gray-600">
                        Discover fashion, groceries, delicious snacks and everyday essentials from a varity of sellers.
                    </p>

                    <a href="/products" className="mt-7 inline-flex items-center rounded-lg bg-indigo-600 px-6 py-3
                    text-sm font-semibold text-white transition hover:bg-indigo-700"> 
                    Explore products
                    <span className="ml-2" aria-hidden="true">→</span>
                    </a>

                </div>

                <div className="hidden h-48 w-48 shrink-0 items-center justify-center rounded-full
                bg-indigo-100 lg:flex xl:h-56 xl:w-56">
                    <span className="text-7xl" aria-hidden="true"> 🛍️ </span>
                </div>

            </div>
            
        </section>
    )
}