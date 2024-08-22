import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client"; /* default import */
import Header from "./components/Header";
// import {Header} from "./components/Header"; /* yes we can use both, this is named import */
import AppBody from "./components/AppBody";
import Footer from "./components/Footer";
import About from "./components/About";
import Offers from "./components/Offers";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

const Grocery = lazy(() => import("./components/Grocery"));

const Applayout = () => {
  return (
    <div className="app">
      <Header /> {/* This is Component Composition */}
      {/**  if path is =  /   */}
      <Outlet />
      <Footer />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Applayout />,
    children: [
      {
        path: "/",
        element: <AppBody />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/offers",
        element: <Offers />,
      },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<h1> Loading..</h1>}>
            <Grocery />
          </Suspense>
        ),
      },
      {
        path: "/menu/:resId",
        element: <RestaurantMenu />,
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
