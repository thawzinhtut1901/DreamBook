import Menu from "@/components/Menu";
import { NavBar } from "@/components";

const Nav = () => {
  return (
    <div className="sticky top-0 z-50 w-full">
      <Menu />
      <NavBar />
    </div>
  );
};

export default Nav;
