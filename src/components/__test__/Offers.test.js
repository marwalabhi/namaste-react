import { render, screen} from "@testing-library/react";
import Offers from "../Offers/Offers";
import "@testing-library/jest-dom";

describe("Offers Page Test Case", () => {

  beforeAll(() => {
    console.log("Before All");
  });
  beforeEach(() => {
    console.log("Before Each");
  });
  afterAll(() => {
    console.log("After All");
  });
  afterEach(() => {
    console.log("After Each");
  });

  test("Should load input name inside Offers component", () => {

    render(<Offers/>);
  
    const inputName = screen.getByPlaceholderText("enter name");
  
    // Asserition
    expect(inputName).toBeInTheDocument();
  
  });
  
  it("Should load 2 input boxes on the Offers component", () => {
    render(<Offers/>);
  
    //Querying
    const inputBoxes = screen.getAllByRole("textbox");
  
    console.log(inputBoxes.length);
  
    //Assertion
    expect(inputBoxes.length).toBe(2);
    
  
  });

});



