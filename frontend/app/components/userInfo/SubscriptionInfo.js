import React, { useContext, useEffect, useRef, useState } from "react";
import uidContextProvider from "../api/UidContext";
import { AddToUser } from "../api/DatabaseActions";
import { GetActiveStatus, SetActiveStatus } from "../api/DatabaseActions";

export default function AccountInfo() {
  const { uidContext, setUidContext } = useContext(uidContextProvider);
  const [facetsClicked, setFacetsClicked] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [submittedButtonActive, setSubmittedButtonActive] = useState(false);
  const [subscriptionActive, setSubscriptionActive] = useState(null);
  const submittedResponse = useRef(null);
  const firstRun = useRef(true);
  const subscriptionLength = useRef(0);

  useEffect(() => {
    if (uidContext.subscriptions) {
      setFacetsClicked(uidContext.subscriptions);
    }

    // Sets initial subscription status.
    if (uidContext.uid) {
      if (subscriptionActive === null) {
        GetActiveStatus(uidContext.uid)
          .then((res) => {
            setSubscriptionActive(res);
          })
          .catch((err) => {
            console.error(`Error retreiving subscription status: ${err.code}`);
          });
      }
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

  useEffect(() => {
    subscriptionActive !== null &&
      (document.getElementById("active-subscription").checked = subscriptionActive);
  }, [subscriptionActive]);

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

  // Pause you email subscription. 
  const handlePauseSubscription = (e) => {
    SetActiveStatus(uidContext.uid, e.target.checked);
    setSubscriptionActive(e.target.checked);
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
                  <div>
                    <label>Pause Subscriptions</label>
                    <input
                      type="checkbox"
                      id="active-subscription"
                      onChange={(e) => {
                        handlePauseSubscription(e);
                      }}
                    />
                    {subscriptionActive ? (
                      <p>Your subscription is active.</p>
                    ) : (
                      <p>Your subscription is paused.</p>
                    )}
                  </div>
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
