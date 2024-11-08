import "../Login/Login.css";
import xmark from "../../assets/xmark.png";

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
        <div className="login-signUp-cont">
          <div className="login-or-create-acc">
            <a className="login-signUp-close-btn" onClick={onClose}>
              <img className="xmark-login-page" src={xmark} />
            </a>
            <div className="login-head-top">Login</div>
            <div className="new-acc-creation-div">
              or <span className="creat-an-acc-text">create an account</span>
            </div>
          </div>
          <div className="login-signUp-form">
            <input
              className="input-login-email-phone"
              autoCapitalize="off"
              placeholder="Email address or Phone Number"
              type="text"
              required
            />
            <button className="login-btn-or">Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
