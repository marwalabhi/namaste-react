import { Component } from "react";
import User from "./User";
import UserClass from "./UserClass";

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
      <div>
        <h1>About</h1>
        <h2>Order rajasthani food from all over rajasthan</h2>
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
