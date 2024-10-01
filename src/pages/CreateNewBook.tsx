import { CreateBook } from "@/components";
import Nav from "@/components/Nav";

const CreateNewBook = () => {
  return (
    <div className="flex flex-col w-full min-h-screen dark:bg-dark-bg">
      <Nav />
      <CreateBook />
    </div>
  );
};

export default CreateNewBook;
