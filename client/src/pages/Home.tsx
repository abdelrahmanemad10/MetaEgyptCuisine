import { Helmet } from "react-helmet";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Menu from "@/components/home/Menu";
import Gallery from "@/components/home/Gallery";
import Chefs from "@/components/home/Chefs";
import Testimonials from "@/components/home/Testimonials";
import Reservation from "@/components/home/Reservation";
import Order from "@/components/home/Order";
import Map from "@/components/home/Map";
import { useEffect } from "react";

const Home = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Meta Restaurant - Fine Dining in Sheikh Zayed, Egypt</title>
        <meta name="description" content="Experience exquisite dining at Meta Restaurant in Sheikh Zayed, Egypt. Featuring a blend of traditional and modern cuisine in an elegant atmosphere." />
        <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
      </Helmet>
      
      <Navbar />
      <Hero />
      <About />
      <Menu />
      <Gallery />
      <Chefs />
      <Testimonials />
      <Reservation />
      <Order />
      <Map />
      <Footer />
    </>
  );
};

export default Home;
