import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import NewPostPage from "./pages/NewPostPage";
import LoginPage from "./pages/LoginPage";
import PrivateRoutes from "./auth/PrivateRoutes";
import Layout from "./Layout/Layout";
import PostDetails from "./Components/PostDetails";
import ErrorPage from "./pages/ErrorPage";
import ProductList from "./pages/ProductList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoutes>
            <HomePage />
          </PrivateRoutes>
        ),
      },
      {
        path: "/new-post",
        element: (
          <PrivateRoutes adminOnly={true}>
            <NewPostPage />
          </PrivateRoutes>
        ),
      },
      {
        path: "/postDetails/:postId",
        element: (
          <PrivateRoutes>
            <PostDetails />
          </PrivateRoutes>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/ProductList",
    element: <ProductList />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
