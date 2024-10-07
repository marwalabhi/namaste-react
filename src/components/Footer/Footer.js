import useOnlineStatus from "../../utils/useOnlineStatus";
import "./Footer.css";

const Footer = () => {

  const onlineStatus = useOnlineStatus();

    return (
      <footer>
        <div className="footerPart">
          <a href="#">FAQ</a>
          <a href="#">Contact Us</a>
          <a href="#">Offer Terms</a>
          <a href="#">Partner with us</a>
          <a href="#">Refund & Cancellation</a>
          <a href="#">&copy;2024 KhammaGhani</a>
          <a href="#">Online Status: {onlineStatus? "✅":"🔴" }</a>
        </div>
      </footer>
    );
  };

  export default Footer;