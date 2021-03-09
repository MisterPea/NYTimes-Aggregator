import React from "react";
import PropTypes from "prop-types";

/**
 * Checkbox group abstraction
 * @param {string} displayFacet - Text for checkbox label.
 * @param {string} searchFacet - Lowercase, sluggified version of displayFacet-can be an id.
 * @param {string} uid - User id, if it's falsey, there is no user logged in.
 * @param {string} frontLabel - If you want the label in front. 
 * @param {function} updateCallback - Function called on checkbox click.
 * @returns Checkbox component.
 */
export default function Checkbox({ searchFacet, displayFacet=false, uid, updateCallback, frontLabel=false,}) {
  return (
    <label htmlFor={searchFacet} className="modal-check-text">
      {frontLabel && <span className="label-text front-label">{frontLabel}</span>}
      <input
        id={searchFacet}
        type="checkbox"
        className="modal-checkbox visually-hidden"
        name={searchFacet}
        value={searchFacet}
        disabled={!uid}
        onChange={(e) => updateCallback(e)}
      />
      <span className="modal-checkmark"></span>
      {displayFacet && <span className="label-text">{displayFacet}</span>}
    </label>
  );
}
Checkbox.propTypes = {
  searchFacet: PropTypes.string,
  displayFacet: PropTypes.string,
  uid: PropTypes.string,
  updateCallback: PropTypes.func,
  frontLabel: PropTypes.string,
};
