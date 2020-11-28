// TODO: Add read for previously selected searches, if they are selected precheck the box.

/*  This is a modal dialog whose props are recived from Article.js
    The props are: modalFacets, which are the relatable search terms,
    closeModal, which is callback to close the modal - close function is in Article.js
    and authInfo which will either be null or will have user info. */

import React, { useState, useEffect, useContext } from "react";
import PropTypes from 'prop-types'
import Login from "./Login";
import uidContextProvider from "./api/UidContext";
import {AddToUser} from "./api/DatabaseActions"

export default function ModalSelectionLogin(props) {
  let flattenedFacets = [];
  const { uidContext } = useContext(uidContextProvider);
  const [facetsClicked, setFacetsClicked] = useState([]);
  const [checkboxDisabled, setCheckboxDisabled] = useState(false);

  useEffect(() => {
    // disable button when no boxes are checked.
    console.log(uidContext)
    document.getElementById("submit-button").disabled = facetsClicked.length === 0 || !uidContext.uid ? true : false;
    setCheckboxDisabled(!uidContext.uid ? true : false);
  }, [facetsClicked, uidContext]);

  const handleCloseModal = () => {
    props.closeModal();
  };

  if (Object.entries(props.modalFacets).length !== 0) {
    // This statement takes all facets and converts them to objects (Byline has 'Article by' added)
    const bylineRegex = /By.|,.+|"and".+/g;
    const { byline, des_facet, org_facet, per_facet, geo_facet } = props.modalFacets;
    const rawFacets = [des_facet, org_facet, per_facet, geo_facet];
    const filteredByline = byline.split(bylineRegex).filter((element) => {
      return element != "" && element != "By";
    });
    let appendedByline = filteredByline.map((author) => {
      return { searchFacet: author, displayFacet: `Articles by ${author}` };
    });
    const facets = rawFacets.map((facetArray) => {
      return facetArray.map((facet) => {
        return { searchFacet: facet, displayFacet: facet };
      });
    });
    flattenedFacets = appendedByline.concat(...facets);
  }

  const handleUpdateCheckbox = (e) => {
    // If the clicked element is in array, we remove it, else we add it.
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
    AddToUser(uidContext.uid,facetsClicked)
    console.log(uidContext.uid);
  };

  return (
    <div className="modal-wrapper">
      {!uidContext.uid && <Login message={"You must be logged in to subscribe to topics."} />}
      <button onClick={handleCloseModal}>close</button>
      <h4>Subsribe to articles relating to:</h4>
      <h3>{props.modalFacets.title}</h3>
      <ul>
        {flattenedFacets.map(({ searchFacet, displayFacet }, index) => (
          <li key={index}>
            <input
              type="checkbox"
              className="modal-checkbox"
              name={searchFacet}
              value={searchFacet}
              disabled={checkboxDisabled}
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
    </div>
  );
}

ModalSelectionLogin.propTypes = {
  closeModal: PropTypes.func,
  modalFacets: PropTypes.object
}