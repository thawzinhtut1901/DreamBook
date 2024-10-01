import { LibraryLayout } from "@/Layouts";
import { Footer } from "@/components";
import Nav from "@/components/Nav";

const Library = () => {
  return (
    <div className="flex flex-col w-full min-h-screen dark:bg-dark-bg">
      <Nav />
      <LibraryLayout />
      <Footer />
    </div>
  );
};

export default Library;
