import Navbar from "@/components/ui/header";
import Hero from "@/components/ui/hero";
import RecommendedJobs from "@/components/ui/recommended";
import Sidebar from "@/components/ui/sidebar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <div className="flex">
        <Sidebar />
        <RecommendedJobs />
      </div>
    </div>
  );
}
