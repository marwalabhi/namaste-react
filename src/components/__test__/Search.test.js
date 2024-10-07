import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
// Integration Testing
import AppBody from "../AppBody/AppBody";
import MOCK_DATA from "../__test__/mocks/mockResListData.json";
import { act } from "react";
import { BrowserRouter } from "react-router-dom";

jest.mock("../../assets/star.svg", () => "path/to/mocked/svg");
jest.mock("../AppBody/AppBody.css", () => {
  "";
});
jest.mock("../RestaurantCard/RestaurantCard.css", () => {
  "";
});
jest.mock("../Shimmer/Shimmer.css", () => {
  "";
});
jest.mock("../../assets/cross1.svg", () => "path/to/mocked/svg");
jest.mock("../../assets/filter.svg", () => "path/to/mocked/svg");

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(MOCK_DATA);
    },
  });
});

it("Should search all Restaurants that sell pizza when search for", async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <AppBody />
      </BrowserRouter>
    )
  );
  //initially
  const cardsBeforeSearch = screen.getAllByTestId("#resCard");

  expect(cardsBeforeSearch.length).toBe(20);

  const searchBtn = screen.getByRole("button", { name: "Search" });

  const searchInput = screen.getByTestId("searchInput");

  fireEvent.change(searchInput, { target: { value: "pizza" } });

  fireEvent.click(searchBtn);

  // screen should load 6 res cards
  const cardsAfterSearch = screen.getAllByTestId("#resCard");
//   console.log(cardsAfterSearch);

  expect(cardsAfterSearch.length).toBe(6);
});


it("Should filter all top rated Restaurants by clicking on Rating 4.0+ button", async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <AppBody />
      </BrowserRouter>
    )
  );
  
  const cardsBeforeFilter = screen.getAllByTestId("#resCard");
  expect(cardsBeforeFilter.length).toBe(20);

  const topRatedBtn = screen.getByRole("button", {name: "Rating 4.0+"});
  fireEvent.click(topRatedBtn);

  const cardAfterFilter = screen.getAllByTestId("#resCard");
  expect(cardAfterFilter.length).toBe(18);


});
