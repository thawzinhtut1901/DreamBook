import { BookDashBoardLayout } from "@/Layouts";
import NotFound from "@/Layouts/NotFound";
import {
  BookDetailsPage,
  ChaptersPage,
  CommentsPage,
} from "@/pages/UserBookDashboard";
import { RouteObject } from "react-router-dom";

const BookRouter: RouteObject[] = [
  {
    path: "/book-dashboard/:bookSlug/",
    element: <BookDashBoardLayout />,
    children: [
      {
        path: "book-details",
        element: <BookDetailsPage />,
      },
      {
        path: "chapters",
        element: <ChaptersPage />,
      },
      {
        path: "comments",
        element: <CommentsPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound/>
  }
];

export default BookRouter;
