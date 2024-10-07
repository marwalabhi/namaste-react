import { Component, useContext } from "react";
import UserClass from "../UserClass/UserClass.js";
import "./About.css";
import UserContext from "../../utils/UserContext.js";

class About extends Component {
  constructor(props) {
    super(props);
    // console.log("Parent Constructor");
  }
  componentDidMount() {
    // console.log("Parent Component did mount");
  }
  render() {
    // console.log("Parent render called");

    return (
      <div className="about--section">
        <h1 className="aboutUs">About Us</h1>
        <h2 className="des">Order rajasthani food from all over rajasthan</h2>
        <div className="loggedInUN">
          Logged In User:
          <UserContext.Consumer>
            {({ loggedInUser, setUserName }) => (
              <h3 className="uname">{loggedInUser}</h3>
            )}
          </UserContext.Consumer>
        </div>
        <div className="inputUserName">
          <label>
            Enter the UserName:{" "}
            <UserContext.Consumer>
              {({ setUserName, loggedInUser}) => <input type="text" value={loggedInUser} onChange={(e) => setUserName(e.target.value)}></input>}
            </UserContext.Consumer>
          </label>
        </div>

        <div>
          {/* <User name={"Abhiabhishek"} location={"Jaipur"} /> */}
          <UserClass />
          {/* <UserClass name={"Second Child"} location={"Noida"} /> */}
          {/* <UserClass name={"Third Child"} location={"Noida"} /> */}
        </div>
      </div>
    );
  }
}

export default About;
