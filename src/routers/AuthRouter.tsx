import NotFound from "@/Layouts/NotFound";
import { Login, SignUp } from "@/pages/auth";
import LoginLayout from "@/pages/auth/AuthLayout";
import CategorySelect from "@/pages/auth/CategorySelect";
import ProfileSetup from "@/pages/auth/ProfileSetup";
import { Navigate, RouteObject } from "react-router-dom";

const AuthRouter: RouteObject[] = [
  {
    path: "/auth",
    element: <LoginLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="login" />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "profile-setup",
        element: <ProfileSetup />,
      },
      { path: "select-category", element: <CategorySelect /> },
    ],
  },
  {
    path: "*",
    element: <NotFound/>
  }
];

export default AuthRouter;
