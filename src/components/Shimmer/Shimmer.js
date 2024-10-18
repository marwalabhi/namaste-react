import "./Shimmer.css";

const ShimmerUI = () => {
  return (
    <div className="shimmer-ui-container">
      <h1 className="loading">Looking for great food near you ...</h1>

      <div className="shimmer_container">
        <div className="shimmer-card"></div>
        <div className="shimmer-card"></div>
        <div className="shimmer-card"></div>
        <div className="shimmer-card"></div>
        <div className="shimmer-card"></div>
      </div>
      <div className="shimmer_container">
        <div className="shimmer-card"></div>
        <div className="shimmer-card"></div>
        <div className="shimmer-card"></div>
        <div className="shimmer-card"></div>
        <div className="shimmer-card"></div>
      </div>
    </div>
  );
};

export default ShimmerUI;
