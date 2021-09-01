import React from "react";
import "./css/trend.css";

function Trend({ title, tweet__volume }) {
  return (
    <div className="trend">
      <div className="trend__title">
        <h3>{title}</h3> <span>&bull; Trending</span>
      </div>
      <div className="trend__tweetVolume">{tweet__volume} tweets</div>
    </div>
  );
}

export default Trend;
