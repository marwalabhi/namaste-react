import UserContext from "../../utils/UserContext";
import { useContext } from "react";
import * as styles from "./Grocery.module.css"; // Named import for Tree Shaking

const Grocery = () => {
  const { loggedInUser } = useContext(UserContext);

  return (
    <>
      <h2 className={styles.grocery}>
        Our grocery online store, and we have a lot of child components inside
        this web page!!
      </h2>
      <h4 className={styles.gName}>User Name: {loggedInUser}</h4>
      <button>Stop Printing</button>
    </>
  );
};

export default Grocery;
