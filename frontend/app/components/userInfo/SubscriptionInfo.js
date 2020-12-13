import React, { useContext, useEffect, useRef, useState } from "react";
import uidContextProvider from "../api/UidContext";
import { AddToUser } from "../api/DatabaseActions";

export default function AccountInfo() {
  const { uidContext, setUidContext } = useContext(uidContextProvider);
  const [facetsClicked, setFacetsClicked] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [submittedButtonActive, setSubmittedButtonActive] = useState(false);
  const submittedResponse = useRef(null);
  const firstRun = useRef(true);
  const subscriptionLength = useRef(0);

  useEffect(() => {
    if (uidContext.subscriptions) {
      setFacetsClicked(uidContext.subscriptions);
    }
  }, [uidContext.uid]);

  useEffect(() => {
    if (facetsClicked && facetsClicked.length > 0 && firstRun.current) {
      checkCheckboxes();
      firstRun.current = false;
      subscriptionLength.current = facetsClicked.length;
    }
    submitButtonControlTest();
  }, [facetsClicked]);

  // Helper function to check checkboxes on inital load
  // We do this b/c checked={true} is unchangable.
  const checkCheckboxes = () => {
    const checkBoxes = document.querySelectorAll(".modal-checkbox");
    checkBoxes.forEach((element) => {
      if (facetsClicked.includes(element.value)) {
        element.checked = true;
      }
    });
  };

  //   Helper function to enable/disable Submit Button
  const submitButtonControlTest = () => {
    if (facetsClicked && facetsClicked.length < subscriptionLength.current) {
      setSubmittedButtonActive(false);
    } else {
      setSubmittedButtonActive(true);
    }
  };

  const handleUpdateCheckbox = (e) => {
    /********** TODO: Filter instead of creating new array...  **********/
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
        submittedResponse.current = err;
        setSubmitted(true);
      });
  };

  const postSubmit = (
    //   TODO: postSubmit directions.
    <div>
      <p>{submittedResponse ? `Your subcriptions have been updated` : `${submittedResponse}`}</p>
    </div>
  );

  return (
    <>
      <h4>Your subscription info.</h4>
      {uidContext.subscriptions.length === 0 ? (
        <p>{"You aren't currently subscibed to any topics."}</p>
      ) : (
        <>
          {submitted
            ? postSubmit
            : uidContext.subscriptions !== [] && (
                <>
                  <p>Your current subscriptions are:</p>
                  <p>Uncheck to unsubscribe.</p>
                  <ul>
                    {uidContext.subscriptions.map((topic) => (
                      <li key={topic}>
                        <div>
                          <label htmlFor={topic}>{topic}</label>
                        </div>
                        <div>
                          <input
                            type="checkbox"
                            name={topic}
                            value={topic}
                            className="modal-checkbox"
                            onChange={(e) => {
                              handleUpdateCheckbox(e);
                            }}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => {
                      handleSubmit();
                    }}
                    disabled={submittedButtonActive}>
                    Submit
                  </button>
                </>
              )}
        </>
      )}
    </>
  );
}
