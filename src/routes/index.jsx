import { createBrowserRouter } from "react-router-dom";
import { QuranPage } from "../pages/quran";
import { BookmarkPage } from "../pages/bookmark";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "quran",
    element: <QuranPage />,
  },
  {
    path: "bookmark",
    element: <BookmarkPage />,
  },
]);
