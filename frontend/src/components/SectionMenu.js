import React from "react";
import Articles from "./Articles";
import { Link, useParams } from "react-router-dom";

export default function SectionMenu() {
  let { section } = useParams();

  const sections = [
    { linkName: "arts", displayName: "Arts" },
    { linkName: "automobiles", displayName: "Automobiles" },
    { linkName: "books", displayName: "Books" },
    { linkName: "business", displayName: "Business" },
    { linkName: "fashion", displayName: "Fashion" },
    { linkName: "food", displayName: "Food" },
    { linkName: "health", displayName: "Health" },
    { linkName: "home", displayName: "Front Page" },
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
      <ul>
        {sections.map(({ linkName, displayName }, index) => (
          <li key={index}>
            <Link to={`/${linkName}`}>{displayName}</Link>
          </li>
        ))}
      </ul>
      <Articles section={section} />
    </div>
  );
}
