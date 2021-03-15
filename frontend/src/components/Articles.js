import React, { useState, useEffect, useLayoutEffect } from "react";
import PropTypes from 'prop-types'
import { grabTopStories } from "./api/api";
import ModalSelectionLogin from "./ModalSelectionLogin";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Dialog } from '@material-ui/core';
import { Slide } from '@material-ui/core';
import { useLocation } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
})

export default function Articles({ section }) {
  const { state } = useLocation();
  const openLogin = state ? state.locationFrom : false
  const [topStoriesData, setTopStoriesData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalFacets, setModalFacets] = useState({});
  const [mapCompleted, setMapCompleted] = useState(false);

  useEffect(() => {
    // The isMounted flag is to prevent update on an unmounted component. 
    let isMounted = true;
    grabTopStories(section)
      .then((dataPromise) => {
        isMounted && setTopStoriesData(dataPromise);
      })
      .catch(err => {
        console.error(`There's been an error fetching NY Times's Top Stories: ${err}`)
      })
    
    return () => {
      isMounted = false;
    };
  }, [section]);

  useLayoutEffect(() => {
    if(topStoriesData !== []){
      if(mapCompleted === true){
      openLogin === true && setShowModal(true) 
      }
    }
  },[mapCompleted]);

  const handleModalClose = () => {
    setShowModal(false);
    setModalFacets({});
    window.history.replaceState({locationFrom:false},null)
  };

  const trackMapCompletion = (index, length) => {
    if(index === length - 1) {
      if(mapCompleted === false) {
        setMapCompleted(true);
      }
    }
  }

  return (
    <div className="article-wrapper">
    <Dialog
      open={showModal}
      onClose={handleModalClose}
      TransitionComponent={Transition}
    >
      <ModalSelectionLogin modalFacets={modalFacets} message={state ? "articles" : ""} closeModal={handleModalClose} />
    </Dialog>
      <ul>
        {topStoriesData.map(
          (
            { 
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
            },index,wholeArray
          ) => (
            <li className="article-list-item" key={index}>
              <p className="section-text">{`${section} ${subsection === "" ? "" : "• " + subsection}`}</p>
              <div className="main-card-area"
               >
                <div className="image-headline main-card-element">
                  <img src={multimedia ? multimedia[1].url : ""}></img>
                  <h2 className="article-headline">{title}</h2>
                </div>
                <p className="article-abstract main-card-element">{abstract}</p>
              </div>
              <div className="modal-button">
                <AddCircleIcon
                  style={{ fontSize: 32}}
                  className="add-reading-alert"
                  onClick={() => {
                    setShowModal(true) ? showModal !== true : null;
                    setModalFacets({
                      byline: byline,
                      des_facet: des_facet,
                      org_facet: org_facet,
                      per_facet: per_facet,
                      geo_facet: geo_facet,
                      title,
                    });
                  }}>
                  +
                </AddCircleIcon>
              </div>
              <div className="shadow-holder"  onClick={() => {
                  window.open(url, "_blank");
                }}></div>
                {trackMapCompletion(index, wholeArray.length)}
            </li>
          )
        )}
      </ul>
    </div>
  );
}

Articles.propTypes = {
  section: PropTypes.string,
}
