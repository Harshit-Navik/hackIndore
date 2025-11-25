import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProcessSteps from "../components/ProcessSteps";
import Doctors from "../components/Doctors";
import Reviews from "../components/Reviews";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <ProcessSteps />
      <Doctors />
      <Reviews />
      <Footer />
    </>
  );
}
