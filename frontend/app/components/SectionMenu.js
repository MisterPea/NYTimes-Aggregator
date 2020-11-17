/* 
SectionMenu.js is at the top of the component tree.
Article.js, embedded, recives section props from a selection.
It seems a little easier to have this arangement, rather than having compaonents at the same level.
 */

import React, { useState } from "react";
import Articles from "./Articles";
import NavBar from "./NavBar";

export default function SectionMenu() {
  const [section, setSection] = useState("home");
  const [auth, setAuth] = useState(null);

  const sections = [
    { linkName: "arts", displayName: "Arts" },
    { linkName: "automobiles", displayName: "Automobiles" },
    { linkName: "books", displayName: "Books" },
    { linkName: "business", displayName: "Business" },
    { linkName: "fashion", displayName: "Fashion" },
    { linkName: "food", displayName: "Food" },
    { linkName: "health", displayName: "Health" },
    { linkName: "home", displayName: "Home" },
    { linkName: "insider", displayName: "Times Insider" },
    { linkName: "magazine", displayName: "Magazine" },
    { linkName: "movies", displayName: "Movies" },
    { linkName: "nyregion", displayName: "NY Region" },
    { linkName: "obituaries", displayName: "Obituaries" },
    { linkName: "opinion", displayName: "Opinion" },
    { linkName: "politics", displayName: "Politics" },
    { linkName: "realestate", displayName: "Real Estate" },
    { linkName: "science", displayName: "Science" },
    { linkName: "sports", displayName: "Sports" },
    { linkName: "sundayreview", displayName: "Sunday Review" },
    { linkName: "technology", displayName: "Technology" },
    { linkName: "theater", displayName: "Theater" },
    { linkName: "t-magazine", displayName: "T-Magazine" },
    { linkName: "travel", displayName: "Travel" },
    { linkName: "upshot", displayName: "Upshot" },
    { linkName: "us", displayName: "U.S." },
    { linkName: "world", displayName: "World" },
  ];

  return (
    <div className="menu-wrapper">
      <NavBar />
      <ul>
        {sections.map(({ linkName, displayName }, index) => (
          <li
            key={index}
            onClick={() => {
              setSection(linkName);
            }}
            style={{ cursor: "pointer" }}>
            {displayName}
          </li>
        ))}
      </ul>
      <Articles section={section} />
    </div>
  );
}
