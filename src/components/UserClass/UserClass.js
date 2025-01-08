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
    const { name, location, avatar_url, html_url, login } = this.state.userInfo;

    return (
      <div className="user-card">
        <img className="userImg" src={avatar_url} />
        <div className="card_content">
          <div className="git">Name: {name}</div>
          <div className="git">Location: {location}</div>
          <div className="git">Contact: marwalabhi987@gmail.com</div>
          <div className="git">
            Repos Link:{" "}
            <a
              href={html_url}
              target="_blank"
              className="g-link-style-repo"
              rel="noopener noreferrer"
            >
              Go to GitHub
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default UserClass;
