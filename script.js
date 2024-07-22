import React from "react";
import ReactDOM from "react-dom/client";

const ComInsideAnother = () => {
  return <i> I am component inside another component </i>
}

const FunComponent = () => (
  <div className="title">
    <h1 style={{color: "purple"}}>Swatantra Senani: बाल गंगाधर तिलक</h1>
    <h2 style={{background: "skyblue", fontFamily: "sans-serif", color: "darkblue"}}>samasya, sansadhano ki kami nhi hai kami hai to sirf: </h2>
    <h3 style={{color: "orangered", background: "yellow"}}>ichashakti ki </h3>
    {ComInsideAnother()}
  </div>
)

const title = (
  <div className="title">
    <h1>Swatantra Senani: Bal Gangadhar Tilak</h1>
    <h2>samasya, sansadhano ki kami nhi hai kami hai to sirf: </h2>
    <h3>ichashakti ki </h3>
    <FunComponent />
  </div>
)





const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(title);
