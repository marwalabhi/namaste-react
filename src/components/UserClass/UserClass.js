import React from "react";
import "./UserClass.css";

class UserClass extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.name + " constructor called with dummy");

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
    // console.log(this.props.name + " component did mount called");
    const data = await fetch("https://api.github.com/users/marwalabhi");
    const json = await data.json();
    console.log(
      "Component did mount -- data fetched -- <this.setState> -- state var is updated"
    );

    this.setState({
      userInfo: json,
    });
  }

  componentDidUpdate() {
    console.log("Comoponent Did Update");
  }

  componentWillUnmount() {
    console.log("Comoponent Will Unmount");
  }

  render() {
    const { name, location, avatar_url, repos_url } = this.state.userInfo;

    console.log(name + " render");
    console.log();
    
    
    return (
      <div className="user-card">
        <img className="userImg" src={avatar_url} />
        <div className="card_content">
          <h2 className="git">Name: {name}</h2>
          <h3 className="git">Location: {location}</h3>
          <h4 className="git">Contact: @abhiabhishek</h4>
          <h4 className="git">Repo Link: <span style={{color: "skyblue", cursor: "pointer"}}>{repos_url}</span></h4>
        </div>
      </div>
    );
  }
}

export default UserClass;
