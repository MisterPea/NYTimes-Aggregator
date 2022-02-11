/* eslint-disable react/function-component-definition */
import React, { useState, useEffect, useLayoutEffect, lazy } from 'react';
import PropTypes from 'prop-types';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Dialog, Slide } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
const SuccessSnackbar = lazy(() => import('./material_ui_hoc/SuccessSnackbar'));
const ModalSelectionLogin = lazy(() => import('./ModalSelectionLogin'));
import grabTopStories from './api/api';
import ArticleImage from './ArticleImage';

const Transition = React.forwardRef((props, ref) => <Slide direction="right" ref={ref} {...props} />);

export default function Articles({ section }) {
  const { state } = useLocation();
  const [topStoriesData, setTopStoriesData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showLoginSnackbar, setShowLoginSnackbar] = useState(false);
  const [modalFacets, setModalFacets] = useState({});
  const [mapCompleted, setMapCompleted] = useState(false);
  const [userMessage, setUserMessage] = useState('New User');

  useEffect(() => {
    // The isMounted flag is to prevent update on an unmounted component.
    let isMounted = true;
    grabTopStories(section)
      .then((dataPromise) => {
        if (isMounted) { setTopStoriesData(dataPromise.results); }
      })
      .catch((err) => {
        console.error(`There's been an error fetching NY Times Top Stories: ${err}`);
      });
    return () => {
      isMounted = false;
    };
  }, [section]);

  useLayoutEffect(() => {
    // Checking if we're coming from elsewhere.
    // Called after everything loads.
    if (topStoriesData !== []) {
      if (mapCompleted === true && state) {
        if (state.locationFrom === true) { setShowModal(true); }
        if (state.newUser) {
          (setUserMessage(`Hey, ${state.newUser}! Your account has been created.`));
        } else {
          setShowLoginSnackbar(true);
        }
      }
    }
  }, [mapCompleted]);

  function handleModalClose() {
    setShowModal(false);
    setModalFacets({});
    window.history.replaceState({ locationFrom: false }, null);
  }

  function handleLoginSnackbarClose() {
    setShowLoginSnackbar(false);
    window.history.replaceState({ newUser: null }, null);
  }

  // This tracks the completion of the article population.
  // Once done, we can trigger the opening of a Snackbar or Dialog.
  function trackMapCompletion(index, length) {
    if (index === length - 1) {
      if (mapCompleted === false) {
        setMapCompleted(true);
      }
    }
  }

  return (
    <div className="article-wrapper">
      <SuccessSnackbar
        onOpen={showLoginSnackbar}
        onClose={handleLoginSnackbarClose}
        message={userMessage}
      />
      <Dialog
        open={showModal}
        onClose={handleModalClose}
        TransitionComponent={Transition}
      >
        <ModalSelectionLogin modalFacets={modalFacets} message={state ? 'articles' : ''} closeModal={handleModalClose} />
      </Dialog>
      <ul>
        {topStoriesData.map(
          ({
            title,
            abstract,
            section,
            subsection,
            multimedia,
            url,
            byline,
            des_facet,
            org_facet,
            per_facet,
            geo_facet,
          }, index, wholeArray) => (
            <li
              className="article-list-item"
              aria-label={`${title} - ${abstract}`}
              key={title + section}
            >
              <section>
                <p className="section-text">{`${section} ${subsection === '' ? '' : `• ${subsection}`}`}</p>
                <div className="main-card-area">
                  <div className="image-headline main-card-element">
                    <ArticleImage images={multimedia} />
                    <header className="article-headline">{title}</header>
                  </div>
                  <p className="article-abstract main-card-element">{abstract}</p>
                </div>
                <div
                  className="modal-button"
                  aria-haspopup="true"
                >
                  <AddCircleIcon
                    style={{ fontSize: 32 }}
                    className="add-reading-alert"
                    onClick={() => {
                      setShowModal(true) ? showModal !== true : null;
                      setModalFacets({
                        byline,
                        des_facet,
                        org_facet,
                        per_facet,
                        geo_facet,
                        title,
                      });
                    }}
                  >
                    +
                  </AddCircleIcon>
                </div>
              </section>
              <div
                className="shadow-holder"
                onClick={() => {
                  window.open(url, '_blank');
                }}
              />
              {trackMapCompletion(index, wholeArray.length)}
            </li>
          ),
        )}
      </ul>
    </div>
  );
}

Articles.propTypes = {
  section: PropTypes.string.isRequired,
};
