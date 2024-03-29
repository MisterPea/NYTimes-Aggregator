import React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import Articles from './Articles';
import HorizontalScrollMenu from './HorizontalScrollMenu';

export default function SectionMenu() {
  const { section } = useParams();

  const sections = [
    { linkName: 'arts', displayName: 'Arts' },
    { linkName: 'automobiles', displayName: 'Automobiles' },
    { linkName: 'books', displayName: 'Books' },
    { linkName: 'business', displayName: 'Business' },
    { linkName: 'fashion', displayName: 'Fashion' },
    { linkName: 'food', displayName: 'Food' },
    { linkName: 'health', displayName: 'Health' },
    { linkName: 'insider', displayName: 'Times Insider' },
    { linkName: 'magazine', displayName: 'Magazine' },
    { linkName: 'movies', displayName: 'Movies' },
    { linkName: 'nyregion', displayName: 'NY Region' },
    { linkName: 'obituaries', displayName: 'Obituaries' },
    { linkName: 'opinion', displayName: 'Opinion' },
    { linkName: 'politics', displayName: 'Politics' },
    { linkName: 'realestate', displayName: 'Real Estate' },
    { linkName: 'science', displayName: 'Science' },
    { linkName: 'sports', displayName: 'Sports' },
    { linkName: 'sundayreview', displayName: 'Sunday Review' },
    { linkName: 'technology', displayName: 'Technology' },
    { linkName: 'theater', displayName: 'Theater' },
    { linkName: 't-magazine', displayName: 'T-Magazine' },
    { linkName: 'travel', displayName: 'Travel' },
    { linkName: 'upshot', displayName: 'Upshot' },
    { linkName: 'us', displayName: 'U.S.' },
    { linkName: 'world', displayName: 'World' },
  ];

  const matchingQuery = sections.find((e) => e.linkName === section);
  if (!matchingQuery) {
    return <Redirect to="/us" />;
  }

  return (
    <div className="menu-wrapper">
      <HorizontalScrollMenu sections={sections} section={section} />
      <Articles key="articles" section={section} />
    </div>
  );
}
