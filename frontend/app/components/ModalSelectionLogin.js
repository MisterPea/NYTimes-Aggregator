/**
 * This is a modal dialog whose props are recived from Article.js
 * @param {props<object>} modalFacets - which are the relatable search terms,
 * @param {props<function>} closeModal - which is callback to close the modal - close function is in Article.js
 * @return {jsx} Modal - with article topics (artifacts)
 */

import React, { useContext, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import Login from "./Login";
import uidContextProvider from "./api/UidContext";
import { AddToUser } from "./api/DatabaseActions";

export default function ModalSelectionLogin(props) {
  const { uidContext, setUidContext } = useContext(uidContextProvider);
  const [flattenedFacets, setFlattenedFacets] = useState([]);
  const [facetsClicked, setFacetsClicked] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const uid = useRef(null);
  const submittedResponse = useRef(null);

  useEffect(() => {
    setFacetsClicked(uidContext.subscriptions);
  }, [uidContext.subscriptions]);

  useEffect(() => {
    if (uidContext.uid !== null && uid.current === null) {
      uid.current = uidContext.uid;
    } else if (uidContext.uid === null && uid.current !== null) {
      clearCheckBoxes();
      handleCloseModal();
    }
  }, [uidContext.uid]);

  useEffect(() => {
    facetsClicked && checkCheckboxes();
  }, [facetsClicked]);

  useEffect(() => {
    // This statement takes all facets and converts them to objects (Byline has 'Article by' added)
    if (Object.entries(props.modalFacets).length !== 0) {
      const bylineRegex = /By.|,.+|"and".+/g;
      const { byline, des_facet, org_facet, per_facet, geo_facet } = props.modalFacets;
      const rawFacets = [des_facet, org_facet, per_facet, geo_facet];
      const filteredByline = byline.split(bylineRegex).filter((element) => {
        return element != "" && element != "By";
      });
      // * If there's more than one author...
      let appendedByline = filteredByline.map((author) => {
        return { searchFacet: author, displayFacet: `Articles by ${author}` };
      });
      const facets = rawFacets.map((facetArray) => {
        return facetArray.map((facet) => {
          return { searchFacet: facet, displayFacet: facet };
        });
      });
      setFlattenedFacets(appendedByline.concat(...facets));
    }
  }, []);

  const checkCheckboxes = () => {
    const checkBoxes = document.querySelectorAll(".modal-checkbox");
    checkBoxes.forEach((element) => {
      if (facetsClicked.includes(element.value)) {
        element.checked = true;
      }
    });
  };

  const clearCheckBoxes = () => {
    setFacetsClicked([]);
    const checkBoxes = document.querySelectorAll(".modal-checkbox");
    checkBoxes.forEach((element) => {
      element.checked = false;
    });
  };

  const handleUpdateCheckbox = (e) => {
    // If the clicked element is in array, we remove it, else we add it
    if (facetsClicked.includes(e.target.value)) {
      const index = facetsClicked.indexOf(e.target.value);
      let newArray = facetsClicked.slice();
      newArray.splice(index, 1);
      setFacetsClicked(newArray);
    } else {
      setFacetsClicked(facetsClicked.concat(e.target.value));
    }
  };

  const handleSubmit = () => {
    /**
     * On submit we pass all facets to Context.
     * It's not the best b/c we're passing the whole subscription
     * rather than just appending or removing elements from an array
     */
    setUidContext({ ...uidContext, subscriptions: facetsClicked });
    AddToUser(uidContext.uid, facetsClicked)
      .then(setSubmitted(true))
      .catch((err) => {
        submittedResponse.current = err
        setSubmitted(true);
      });
  };

  const handleCloseModal = () => {
    props.closeModal();
  };

  const postSubmit = (
    <div>
      <p>{submittedResponse ? `Your subcriptions have been updated`:`${submittedResponse}`}</p>
      <button onClick={handleCloseModal}>Close</button>
    </div>
  );

  return (
    <div>
      <div className="modal-wrapper">
        <button onClick={handleCloseModal}>close</button>
        {!uidContext.uid && <Login message={"You must be logged in to subscribe to topics."} />}
        <h4>Subsribe to articles relating to:</h4>
        <h3>{props.modalFacets.title}</h3>
        {!submitted ? (
          <>
            <ul className="checkbox-list">
              {flattenedFacets.map(({ searchFacet, displayFacet }) => (
                <li key={searchFacet}>
                  <input
                    type="checkbox"
                    className="modal-checkbox"
                    name={searchFacet}
                    value={searchFacet}
                    disabled={!uidContext.uid}
                    onChange={(e) => handleUpdateCheckbox(e)}></input>
                  <label htmlFor={searchFacet} className="modal-check-text">
                    {displayFacet}
                  </label>
                </li>
              ))}
            </ul>
            <button
              type="submit"
              id="submit-button"
              onClick={() => {
                handleSubmit();
              }}>
              Submit
            </button>
          </>
        ) : (
          postSubmit
        )}
      </div>
    </div>
  );
}

ModalSelectionLogin.propTypes = {
  closeModal: PropTypes.func,
  modalFacets: PropTypes.object,
};
