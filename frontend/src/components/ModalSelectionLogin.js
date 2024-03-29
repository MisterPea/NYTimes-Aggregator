/**
 * This is a dialog whose props are recived from Article.js
 * @param {props<object>} modalFacets - which are the relatable search terms,
 * @param {props<function>} closeModal - which is callback to close the modal - close function is in Article.js
 * @return {jsx} Modal - with article topics (artifacts)
 */
 import React, { useContext, useEffect, useState, useRef } from "react";
 import PropTypes from "prop-types";
 import Login from "./Login";
 import uidContextProvider from "./api/UidContext";
 import { AddToUser } from "./api/DatabaseActions";
 import CancelIcon from '@material-ui/icons/Cancel';
 import { DialogActions} from '@material-ui/core';
 import SubmitButton from './material_ui_hoc/SubmitButton';
 import Checkbox from "../components/material_ui_hoc/Checkbox";
 
 export default function ModalSelectionLogin(props) {
   const { uidContext, setUidContext } = useContext(uidContextProvider);
   const [flattenedFacets, setFlattenedFacets] = useState([]);
   const [facetsClicked, setFacetsClicked] = useState([]);
   const [submitted, setSubmitted] = useState(false);
   const facetsClickedModalScope = useRef([]);
   const uid = useRef(null);
   const submittedResponse = useRef(null);
   const subscriptionLength = useRef(0);
   const runOnce = useRef(false);
   const initialFacetsClicked = useRef([]);
   const [submitDisabled, setSubmitDisabled] = useState(true);
 
   useEffect(() => {
     setFacetsClicked(uidContext.subscriptions);
     subscriptionLength.current = uidContext.subscriptions.length;
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
     if (!runOnce.current) {
       if (facetsClicked && facetsClicked.length === subscriptionLength.current) {
         checkCheckboxesOnMount();
         runOnce.current = true;
       }
     }
   }, [facetsClicked]);
 
   useEffect(() => {
     // This statement takes all facets and converts them to objects (Byline has 'Article by' added)
     if (Object.entries(props.modalFacets).length !== 0) {
       const bylineRegex = /(?:By\s*|\sand\s*|,\s*)/g
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
     setSubmitDisabled(true);
   }, []);
 
   const checkCheckboxesOnMount = () => {
     const checkBoxes = document.querySelectorAll(".modal-checkbox");
     checkBoxes.forEach((element) => {
       if (uidContext.subscriptions.includes(element.value)) {
         element.checked = true;
         initialFacetsClicked.current.push(element.value); 
         facetsClickedModalScope.current.push(element.value)
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
 
   // If the clicked element is in array, we remove it, else we add it.
   // We also have to track the changes for one article at a time -
   const handleUpdateCheckbox = (e) => {
     if (facetsClicked.includes(e.target.value)) {
       let newArray = facetsClicked.slice();
       let newModalArray = facetsClickedModalScope.current;
       const index = newArray.indexOf(e.target.value);
       const modalIndex = newModalArray.indexOf(e.target.value);
       newArray.splice(index, 1);
       newModalArray.splice(modalIndex, 1);
       setFacetsClicked(newArray);
       facetsClickedModalScope.current = newModalArray;
     } else {
       setFacetsClicked(facetsClicked.concat(e.target.value));
       facetsClickedModalScope.current = facetsClickedModalScope.current.concat(e.target.value);
     }
     submitButtonActive();
   };
   
   const submitButtonActive = () => {
     const newCheckInCheckbox = initialFacetsClicked.current
         .filter((x) => !facetsClickedModalScope.current.includes(x))
         .concat(facetsClickedModalScope.current.filter((y) => !initialFacetsClicked.current.includes(y))).length === 0;
     setSubmitDisabled(newCheckInCheckbox);
   };
 
   /**
    * On submit we pass all facets to Context.
    * It's not the best b/c we're passing the whole subscription
    * rather than just appending or removing elements from an array
    */
   const handleSubmit = () => {
     setUidContext({ ...uidContext, subscriptions: facetsClicked });
     AddToUser(uidContext.uid, facetsClicked)
       .then(setSubmitted(true))
       .catch((err) => {
         submittedResponse.current = err;
         setSubmitted(true);
       });
   };
 
   const handleCloseModal = () => {
     props.closeModal();
   };
 
   const postSubmit = (
     <div>
       <p className="submit-confirm">{submittedResponse ? `Your subscriptions have been updated` : `${submittedResponse}`}</p>
       <SubmitButton type="submit" submitCallback={handleCloseModal}>Close</SubmitButton>
     </div>
   );

   
 
   return (
     <div>
       <div key="modal-wrapper-modalSelectionLogin" className="modal-wrapper">
       <DialogActions>
         <CancelIcon style={{fontSize: 30}} className="modal-close-button" onClick={handleCloseModal} />
       </DialogActions>
         {!uidContext.uid 
          ? <Login message={"You must be logged in to subscribe to topics."} />
          : <div>
          <h4 className="modal-cta">Subscribe to articles relating to:</h4>
         <div className="modal-headline-div">
         <h3 className="modal-headline">{props.modalFacets.title}</h3>
         </div>
         {!submitted ? (
           <>
            <div className="checkbox-list">
             <ul>
               {flattenedFacets.map(({ searchFacet, displayFacet }) => (
                 <li key={searchFacet}>
                  <Checkbox
                    searchFacet={searchFacet}
                    displayFacet={displayFacet}
                    uid={uidContext.uid}
                    updateCallback={handleUpdateCheckbox}
                    frontLabel={"false"}
                    />
                 </li>
               ))}
             </ul>
             </div>         
             <SubmitButton
              id={"submit-facets-button"}
              disabled={submitDisabled}
              submitCallback={handleSubmit}>
              Submit
            </SubmitButton>
           </>
         ) : (
           postSubmit
         )}
          </div>
          
          }
         
       </div>
     </div>
   );
 }
 
 ModalSelectionLogin.propTypes = {
   closeModal: PropTypes.func,
   modalFacets: PropTypes.object,
 };
 