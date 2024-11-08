import React from "react";
import "./UserClass.css";

class UserClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {
        name: "Dummy user",
        location: "Default",
        avatar_url: "image",
        repos_url: "link",
      },
    };
  }

  async componentDidMount() {
    const response = await fetch("https://api.github.com/users/marwalabhi");
    const json = await response.json(); // read response body and parse the JSON: .json= body reading method

    // response.json() - parse the response as JSON object
    this.setState({
      userInfo: json,
    });
  }

  componentDidUpdate() {
    // console.log("Comoponent Did Update");
  }

  componentWillUnmount() {
    // console.log("Comoponent Will Unmount");
  }

  render() {
    const { name, location, avatar_url, repos_url } = this.state.userInfo;

    return (
      <div className="user-card">
        <img className="userImg" src={avatar_url} />
        <div className="card_content">
          <h2 className="git">Name: {name}</h2>
          <h3 className="git">Location: {location}</h3>
          <h4 className="git">Contact: @marwalabhi</h4>
          <h4 className="git">
            Repo Link:{" "}
            <span style={{ color: "blue", cursor: "pointer" }}>
              {repos_url}
            </span>
          </h4>
        </div>
      </div>
    );
  }
}

export default UserClass;
