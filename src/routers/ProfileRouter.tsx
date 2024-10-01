import NotFound from "@/Layouts/NotFound";
import ProfileLayout from "@/Layouts/ProfileLayout";
import Books from "@/pages/profile/Books";
import ChangePassword from "@/pages/profile/ChangePassword";
import Fav from "@/pages/profile/Fav";
import History from "@/pages/profile/History";
import Info from "@/pages/profile/Info";
import Restore from "@/pages/profile/Restore";
import { Navigate, RouteObject } from "react-router-dom";

const ProfileRouter: RouteObject[] = [
  {
    path: "/me",
    element: <ProfileLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="info" />,
      },
      {
        path: "info",
        element: <Info />,
      },
      { path: "books", element: <Books /> },
      { path: "fav", element: <Fav /> },
      { path: "history", element: <History /> },
      { path: "change-password", element: <ChangePassword /> },
      { path: "restore", element: <Restore/> },
    ],
  },
  {
    path: "*",
    element: <NotFound/>
  }
];

export default ProfileRouter;
