import Footer from "@/components/ui/footer";
import Navbar from "@/components/ui/header";
import Hero from "@/components/ui/hero";
import LatestJobs from "@/components/ui/latest";
import RecommendedJobs from "@/components/ui/recommended";
import Jumbotron from "@/components/ui/Jumbroton";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      
      
        <RecommendedJobs />
        {/* <LatestJobs /> */}
        <Jumbotron />
        

      
      <Footer />
    </div>
  );
}
