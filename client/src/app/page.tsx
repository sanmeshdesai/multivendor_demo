import AnnouncementBar from "@/components/layout/store/AnnouncementBar";
import BestSellers from "@/components/layout/store/BestSeller";
import CategoryNav from "@/components/layout/store/CategoryNav";
import Header from "@/components/layout/store/Header";
import HeroBanner from "@/components/layout/store/HeroBanner";
import ShopByCategory from "@/components/layout/store/ShopByCategory";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <CategoryNav />
      <AnnouncementBar />
      <HeroBanner />
      <ShopByCategory />
      <BestSellers />
    </main>
  );
}
