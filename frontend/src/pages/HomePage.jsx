import { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";

// const categories = [
//   { href: "/jeans", name: "Products", imageUrl: "/jeans.jpg" },
//   { href: "/t-shirts", name: "Services", imageUrl: "/tshirts.jpg" },
//   { href: "/shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
//   { href: "/glasses", name: "Glasses", imageUrl: "/glasses.png" },
//   { href: "/jackets", name: "Jackets", imageUrl: "/jackets.jpg" },
//   { href: "/suits", name: "Suits", imageUrl: "/suits.jpg" },
//   { href: "/bags", name: "Bags", imageUrl: "/bags.jpg" },
// ];

const categories = [
  { href: "/products", name: "Products", imageUrl: "/jeans.jpg" },
  { href: "/services", name: "Services", imageUrl: "/tshirts.jpg" },
];

const HomePage = () => {
  const { fetchFeaturedProducts, products, isLoading } = useProductStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-center text-5xl sm:text-6xl font-bold text-gray-900 mb-4">
          Explore Car Parts by Category
        </h1>
        <p className="text-center text-xl text-gray-700 mb-12">
          Discover top-quality components for every make and model
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <CategoryItem category={category} key={category.name} />
          ))}
        </div>

        {!isLoading && products.length > 0 && (
          <FeaturedProducts featuredProducts={products} />
        )}
      </div>
    </div>
  );
};
export default HomePage;
