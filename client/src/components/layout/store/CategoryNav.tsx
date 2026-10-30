const categories = [
    "All Categories",
    "Best Seller",
    "New Release",
    "Fashion",
    "Food and Snacks",
    "Groceries"
];


export default function CategoryNav() {
    return(
        <div className="border-b border-gray-200 bg-white">

            <div className="mx-auto flex h-12 max-w-7xl items-center justify-center gap-12 overflow-x-auto whitespace-nowrap px-6 sm:px-10 lg:px-12">
                { categories.map((category) => ( 
                    <a key={category} 
                    href="#" className="text-sm font-medium text-gray-600"> 
                        {category}
                    </a>
                ))}

            </div>

        </div>
    )
}