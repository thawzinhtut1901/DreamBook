import { useEffect, useRef } from "react";
import { LogoBlue } from "@/assets";
import { RxCross1 } from "react-icons/rx";
import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "../contexts/AuthContext";

const Menu = () => {
  const { showMenu, setShowMenu } = useAuth();
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <div
      ref={menuRef}
      className={`fixed inset-0 z-50 w-[65%] flex flex-col items-center dark:bg-black bg-white p-6 transition-transform duration-300 ${
        showMenu ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <button className="self-end mb-4" onClick={() => setShowMenu(false)}>
        <RxCross1 className="w-6 h-6 dark:text-white" />
      </button>
      <div className="w-[200px]">
        <NavLink onClick={() => setShowMenu(false)} to={"/"}>
          <img src={LogoBlue} alt="Logo" className="w-full" />
        </NavLink>
        <nav className="flex flex-col items-center gap-3 mt-5">
          <NavLink
            onClick={() => setShowMenu(false)}
            className={({ isActive }) =>
              isActive
                ? "w-32 h-10 rounded-md bg-primary text-primary-foreground "
                : "text-black dark:text-white"
            }
            to={"/"}
          >
            <Button variant={"ghost"}>Home</Button>
          </NavLink>
          <NavLink
            onClick={() => setShowMenu(false)}
            className={({ isActive }) =>
              isActive
                ? "w-32 h-10 rounded-md bg-primary text-primary-foreground"
                : "text-black dark:text-white"
            }
            to={"/library"}
          >
            <Button variant={"ghost"}>Library</Button>
          </NavLink>
          <NavLink
            onClick={() => setShowMenu(false)}
            className={({ isActive }) =>
              isActive
                ? "w-32 h-10 rounded-md bg-primary text-primary-foreground"
                : "text-black dark:text-white"
            }
            to={"/book-create"}
          >
            <Button variant={"ghost"}>Book Crafting</Button>
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Menu;
