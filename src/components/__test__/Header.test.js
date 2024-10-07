import { Provider } from "react-redux";
import Header from "../Header/Header";
import { fireEvent, render, screen } from "@testing-library/react";
import appStore from "../../utils/Redux Store/appStore";
import "@testing-library/jest-dom";

jest.mock("../../assets/plate.svg", () => "path/to/mocked/svg");
jest.mock("../../assets/groce.svg", () => "path/to/mocked/svg");
jest.mock("../Header/Header.css", () => {""});

import { BrowserRouter } from "react-router-dom";

it("Should change Sign In button/link to username on click", () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );

  const signInButton = screen.getByRole("link", {name: "Sign In"});
//   const loginButton = screen.getByText("Sign In");

  fireEvent.click(signInButton);

  const signOutButton = screen.getByRole("link", {name: "User: default user"})

  expect(signOutButton).toBeInTheDocument();

});

it("Should have cart items 0 when header component render", () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
        </Provider>
      </BrowserRouter>
    );

    const cartItems = screen.getByText("0", {className: "plate_count"});
    // const cartItems = screen.getByText(/0/, /Cart/);
    
    expect(cartItems).toBeInTheDocument();
  
  });



