import { Hero, Footer } from "@/components";
import Nav from "@/components/Nav";

const Home = () => {
  return (
    <div className="flex flex-col w-full min-h-screen dark:bg-dark-bg">
      <Nav />
      <Hero />
      <Footer />
    </div>
  );
};

export default Home;
