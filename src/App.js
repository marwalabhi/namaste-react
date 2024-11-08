import React, { lazy, StrictMode, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom/client"; /* default import */
import Header from "./components/Header/Header.js";
import AppBody from "./components/AppBody/AppBody.js";
import Footer from "./components/Footer/Footer.js";
import About from "./components/About/About.js";
import Offers from "./components/Offers/Offers.js";
import Error from "./components/Error/Error.js";
import RestaurantMenu from "./components/RestaurantMenu/RestaurantMenu.js";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import UserContext from "./utils/UserContext";
import { Provider } from "react-redux";
import appStore from "./utils/Redux Store/appStore";
import Cart from "./components/Cart/Cart.js";
import "./components/Header/Header.css";

const Grocery = lazy(() => import("./components/Grocery/Grocery.js"));

const Applayout = () => {
  const [userName, setUserName] = useState();

  // authentication
  useEffect(() => {
    // Make an API call and send username and password
    const data = {
      name: "Abhishek Marwal",
    };
    setUserName(data.name);
  }, []);

  return (
    <Provider store={appStore}>
      <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
        {/* <StrictMode> */}
        {/* All of these checks are dev-only and do not impact the production build */}
        <div className="app">
          <Header /> {/* component composition */}
          <Outlet />
          <Footer />
        </div>
        {/* </StrictMode> */}
      </UserContext.Provider>
    </Provider>
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
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
