import { render, screen } from "@testing-library/react";
import RestaurantCard from "../RestaurantCard/RestaurantCard";
import { withPromotedLabel } from "../RestaurantCard/RestaurantCard";
import MOCK_DATA from "../__test__/mocks/resCardMock.json";
import "@testing-library/jest-dom";

jest.mock("../../assets/star.svg", () => "path/to/mocked/svg");
jest.mock("../RestaurantCard/RestaurantCard.css", () => {});


it("Should render Restaurant Card component with props Data", () => {

    render(<RestaurantCard resData={MOCK_DATA}/>);

    const name = screen.getByText("NIC Ice Creams");

    expect(name).toBeInTheDocument();

});

it("Should render Restaurant Card component with Open Now Label", () => {

    // test higher order component: withPromotedLabel()
    const CardPromoted = withPromotedLabel(RestaurantCard);

    render(<CardPromoted  resData = {MOCK_DATA}/>);

    const label = screen.getByText("Open Now");

    expect(label).toBeInTheDocument();

});
