/* eslint-disable react/function-component-definition */
import React, { useState, useEffect, useLayoutEffect, lazy, useCallback } from 'react';
import PropTypes from 'prop-types';

import { Slide } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
const SuccessSnackbar = lazy(() => import('./material_ui_hoc/SuccessSnackbar'));
const ModalSelectionLogin = lazy(() => import('./ModalSelectionLogin'));
import DialogMemo from './DialogMemo';
import { useQuery, gql } from '@apollo/client';
import ArticleCard from './ArticleCard';

const Transition = React.forwardRef((props, ref) => <Slide direction="right" ref={ref} {...props} />);

const ARTICLES = gql`
  query getArticles($section: String!) {
    topStories(section: $section) {
      title
      abstract
      section
      subsection
      byline
      des_facet
      org_facet
      per_facet
      geo_facet
      url
      multimedia {
        url
      }
    }
  }
`;

const MemoizedArticleCard = React.memo(ArticleCard, (prevProps, nextProps) => {
  return prevProps.article === nextProps.article;
});

export default function Articles({ section }) {
  const { state } = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [showLoginSnackbar, setShowLoginSnackbar] = useState(false);
  const [modalFacets, setModalFacets] = useState({});
  const [userMessage, setUserMessage] = useState('New User');

  const { loading, error, data, refetch } = useQuery(ARTICLES, { variables: { section } });

  useEffect(() => {
    refetch({ section });
  }, [section]);

  useLayoutEffect(() => {
    // Checking if we're coming from elsewhere.
    // Called after everything loads.
    if (!loading && state) {
      if (state.locationFrom === true) { setShowModal(true); }
      if (state.newUser) {
        (setUserMessage(`Hey, ${state.newUser}! Your account has been created.`));
      } else {
        setShowLoginSnackbar(true);
      }
    }
  }, [loading]);

  const renderArticleCard = useCallback((article) => {

    return (
      <MemoizedArticleCard
        key={article.title}
        article={article}
        setShowModal={setShowModal}
        setModalFacets={setModalFacets}
      />
    );
  }, []);

  function handleModalClose() {
    setShowModal(false);
    setModalFacets({});
    window.history.replaceState({ locationFrom: false }, null);
  }

  function handleLoginSnackbarClose() {
    setShowLoginSnackbar(false);
    window.history.replaceState({ newUser: null }, null);
  }

  return (
    <div className="article-wrapper">
      <SuccessSnackbar
        onOpen={showLoginSnackbar}
        onClose={handleLoginSnackbarClose}
        message={userMessage}
      />
      <DialogMemo
        showModal={showModal}
        handleModalClose={handleModalClose}
        transition={Transition}
        modalFacets={modalFacets}
        state={state}
      />
      <ul>
        {!loading && data.topStories.map((article) => (
          renderArticleCard(article)
        ))}
      </ul>
    </div>
  );
}

Articles.propTypes = {
  section: PropTypes.string.isRequired,
};
