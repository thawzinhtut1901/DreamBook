import { RouteObject } from "react-router-dom";

import { CreateNewBook, Home, Library } from "../pages";
import { AuthLayout, Login, SignUp } from "@/pages/auth";
import AuthHOC from "./AuthHOC";
import BookReading from "@/pages/BookReading/BookReading";
import ChapterReading from "@/pages/BookReading/ChapterReading";
import BookReadingLayout from "@/pages/BookReading/BookReadingLayout";
import Chapter from "@/pages/BookReading/Chapter";
import NotFound from "@/Layouts/NotFound";
import CommentSection from "@/components/CommentSection";
import OtherUserProfile from "@/pages/OtherUserProfile";

const UserRouter: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/library/*",
    element: <Library />,
  },
  {
    path: "/book/:bookSlug",
    element: <BookReadingLayout />,
    children: [
      {
        index: true,
        element: <BookReading />,
      },
      {
        path: "comments",
        element: <CommentSection/>
      }
    ],
  },

  {
    path: "/:bookSlug/chapter",
    element: <ChapterReading />,
    children: [{ path: ":id", element: <Chapter /> }],
  },

  {
    path: "/book-create",
    element: (
      <AuthHOC>
        <CreateNewBook />
      </AuthHOC>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <SignUp />,
  },
  {
    path: "/register/create-account",
    element: <AuthLayout />,
  },
  {
    path: "/profile/:userId",
    element: <OtherUserProfile />,
  },

  {
    path: "*",
    element: <NotFound />,
  },
];

export default UserRouter;
