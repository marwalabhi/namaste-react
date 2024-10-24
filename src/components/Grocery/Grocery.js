import UserContext from "../../utils/UserContext";
import { useContext, useEffect } from "react";
import styles from "./Grocery.module.css";
import { useRef } from "react";

const Grocery = () => {
  const { loggedInUser } = useContext(UserContext);

 let intervalRef = useRef(null);

  useEffect(() => {
     intervalRef.current = setInterval(
      () => console.log("setInterval executed after every sec", Math.round(Math.random()*100)),
      1000);
      console.log(intervalRef);
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleClick = () => {
    clearInterval(intervalRef.current);   
  };
  
  return (
    <>
      <h2 className={styles.grocery}>
        Our grocery online store, and we have a lot of child components inside
        this web page!!
      </h2>
      <h4 className={styles.gName}>User Name: {loggedInUser}</h4>
      <button onClick={handleClick}>Stop Printing</button>
    </>
  );
};

export default Grocery;
