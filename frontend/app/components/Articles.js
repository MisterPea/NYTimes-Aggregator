import React, { useState, useEffect } from "react";
import { grabTopStories } from "./api";

export default function Articles({ section }) {
  const [topStoriesData, setTopStoriesData] = useState([]);
  useEffect(() => {
    grabTopStories(section).then((dataPromise) => {
      setTopStoriesData(dataPromise);
    });
  }, [section]);

  return (
    <div className="article-wrapper">
      <ul>
        {topStoriesData.map(({ title, abstract, multimedia, url }, index) => (
          <li key={index} onClick={ () => { window.open(url, "_blank") } }>
            <h2>{ title }</h2>
            <p>{ abstract }</p>
            <img src={ multimedia ? multimedia[1].url : "" }></img>
          </li>
        ))}
      </ul>
    </div>
  );
}
