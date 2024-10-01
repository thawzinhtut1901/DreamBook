import { NavBar } from "@/components";
import { Outlet } from "react-router-dom";

const BookReadingLayout = () => {

  return (
    <div>
      <NavBar />
      <Outlet/>
    </div>
  );
};

export default BookReadingLayout;
