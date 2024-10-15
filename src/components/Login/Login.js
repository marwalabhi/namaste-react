import "../Login/Login.css";

const Login = ({ onClose, isLogin }) => {
  const loginStyle = {
    transform: isLogin ? "translateX(0%)" : "translateX(100%)",
    transition: "transform ease-out .3s",
  };

  return (
    <div
      className="black-overlay"
      style={{
        opacity: isLogin ? 1 : 0,
        visibility: isLogin ? "visible" : "hidden",
      }}
      onClick={onClose}
    >
      <div
        className="white-loginbar"
        onClick={(evt) => evt.stopPropagation()}
        style={loginStyle}
      >
        <button onClick={onClose}>Close</button>
        <h2>Login</h2>
        <label>
          Name:
          <input type="text" placholder="Phone number"></input>
        </label>
        <label>
          Password:
          <input type="password" placholder="Phone number"></input>
        </label>
        <div>or create an account</div>
        <button style={{ backgroundColor: "orange" }}>Login</button>
      </div>
    </div>
  );
};

export default Login;
