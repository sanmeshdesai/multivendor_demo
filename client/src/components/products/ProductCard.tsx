
type ProductCardProps = {
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  vendor: string;
};

export default function ProductCard({
  name,
  price,
  originalPrice,
  image,
  category,
  vendor,
}: ProductCardProps) {
  return (
    <article className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:border-gray-300">
      {/* Product image */}
      <a href="/products" className="block overflow-hidden bg-gray-50">
        <img
          src={image}
          alt={name}
          className="aspect-square w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </a>

      {/* Product information */}
      <div className="p-4">
        <p className="text-xs font-medium text-gray-500">
          {category}
        </p>

        <h3 className="mt-2 line-clamp-2 text-sm font-semibold text-gray-900">
          {name}
        </h3>

        <p className="mt-1 text-xs text-gray-500">
          Sold by {vendor}
        </p>

        <div className="mt-3 flex items-center gap-2">
          <span className="text-base font-bold text-gray-900">
            ₹{price.toLocaleString("en-IN")}
          </span>

          {originalPrice && originalPrice > price && (
            <span className="text-sm text-gray-400 line-through">
              ₹{originalPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
