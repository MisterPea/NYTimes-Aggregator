import React, { useState, useEffect } from "react";
import { grabTopStories } from "./api";
import ModalSelectionLogin from "./ModalSelectionLogin";

export default function Articles({ section }) {
  const [topStoriesData, setTopStoriesData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalFacets, setModalFacets] = useState({});

  useEffect(() => {
    grabTopStories(section).then((dataPromise) => {
      setTopStoriesData(dataPromise);
    });
  }, [section]);

  const handleModalClose = () => {
    setShowModal(false);
    setModalFacets({});
  };

  return (
    <div className="article-wrapper">
      <ModalSelectionLogin modalFacets={modalFacets} closeModal={handleModalClose} />
      <ul>
        {topStoriesData.map(
          (
            {
              title,
              abstract,
              multimedia,
              url,
              byline,
              des_facet,
              org_facet,
              per_facet,
              geo_facet,
            },index) => (
            <li key={index}>
              <div
                onClick={() => {
                  window.open(url, "_blank");
                }}>
                <h2>{title}</h2>
                <p>{abstract}</p>
                <img src={multimedia ? multimedia[1].url : ""}></img>
              </div>
              <div className="modal-button">
                <button
                  className="add-reading-alert"
                  onClick={() => {
                    setShowModal(true) ? showModal !== true : null;
                    setModalFacets(
                      { byline: byline ,
                       des_facet: des_facet ,
                      org_facet: org_facet ,
                      per_facet: per_facet ,
                      geo_facet: geo_facet,
                      title }
                    );
                  }}
                >
                  +
                </button>
              </div>
            </li>
          )
        )}
      </ul>
    </div>
  );
}
