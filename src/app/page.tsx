import Footer from "@/components/ui/footer";
import Navbar from "@/components/ui/header";
import Hero from "@/components/ui/hero";
import LatestJobs from "@/components/ui/latest";
import RecommendedJobs from "@/components/ui/recommended";
import Sidebar from "@/components/ui/sidebar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <div className="flex m-10">
        <Sidebar />
        <div>
        <RecommendedJobs />
        <LatestJobs />
        </div>
        

      </div>
      <Footer />
    </div>
  );
}
