import React, { useState, useEffect } from "react";
import "./css/widgets.css";
import { Search } from "@material-ui/icons";
import Trend from "./Trend";

function Widgets() {
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    fetch("https://twitter-clone-api-455.herokuapp.com/getTrends")
      .then((res) => res.json())
      .then((data) => {
        data[0].trends.sort((a, b) =>
          a.tweet_volume < b.tweet_volume ? 1 : -1
        );
        let cnt = 0,
          availableTrends = [];
        for (const d of data[0].trends) {
          if (d.name.length > 15) continue;
          if (cnt === 5) break;
          ++cnt;
          availableTrends.push({
            key: d.name,
            title: d.name,
            tweet__volume: d.tweet_volume,
          });
        }
        setTrends(availableTrends);
      });
  }, []);

  return (
    <div className="widgets">
      <div className="widgets__input">
        <Search className="widgets__searchIcon" />
        <input placeholder="Search Twitter" type="text" />
      </div>
      <div className="widgets__widgetContainer">
        <h2>What's happening</h2>
        {trends.map((trend) => (
          <Trend
            key={trend.key}
            title={trend.title}
            tweet__volume={trend.tweet__volume}
          />
        ))}
        &nbsp;
      </div>
    </div>
  );
}

export default Widgets;
