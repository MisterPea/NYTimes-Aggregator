import React, { useContext, useEffect, useRef, useState } from "react";
import uidContextProvider from "../api/UidContext";
import { AddToUser } from "../api/DatabaseActions";
import { GetActiveStatus, SetActiveStatus } from "../api/DatabaseActions";
import Checkbox from "../material_ui_hoc/Checkbox";
import SubmitButton from "../material_ui_hoc/SubmitButton"

export default function SubscriptionInfo() {
  const { uidContext, setUidContext } = useContext(uidContextProvider);
  const [facetsClicked, setFacetsClicked] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [submittedButtonActive, setSubmittedButtonActive] = useState(false);
  const [subscriptionActive, setSubscriptionActive] = useState(null);
  const submittedResponse = useRef(null);
  const firstRun = useRef(true);
  const subscriptionLength = useRef(0);

  useEffect(() => {
    let isMounted = true;
    if (uidContext.subscriptions) {
      setFacetsClicked(uidContext.subscriptions);
    }
    // Sets initial subscription status.
    if (uidContext.uid) {
      if (subscriptionActive === null) {
        GetActiveStatus(uidContext.uid)
          .then((res) => {
            isMounted && setSubscriptionActive(res);
          })
          .catch((err) => {
            console.error(`Error retreiving subscription status: ${err.code}`);
          })
      }
    }
    return () => {
      isMounted = false;
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
    const activeCheckbox = document.getElementById("active-subscription");
    if (subscriptionActive !== null && activeCheckbox) {
      document.getElementById("active-subscription").checked = subscriptionActive;
    }
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
            : uidContext.subscriptions !== [] && ( //This needs to change...we need to always have access to active subs button regardless of number of subscrioptions
                <>
                  <div className="pause-subscription">
                    <div className="top-pause-subscriptions">
                      <Checkbox
                        searchFacet={"active-subscription"}
                        updateCallback={handlePauseSubscription}
                        uid={"true"}
                        frontLabel={`${
                          subscriptionActive ? "Unclick to pause" : "Click to unpause"
                        } subscriptions`}
                      />
                    </div>
                    {subscriptionActive ? (
                      <p className="p-italic">Your subscription is active.</p>
                    ) : (
                      <p className="p-italic">Your subscription is paused.</p>
                    )}
                  </div>
                  <p className="current-subscriptions-title">Your current subscriptions are:</p>
                  <p className="subscription-direction">Uncheck to unsubscribe.</p>
                  <div className="subscription-list">
                    <ul>
                      {uidContext.subscriptions.map((topic) => (
                        <li key={topic}>
                          <Checkbox
                            displayFacet={topic}
                            searchFacet={topic}
                            uid={"true"}
                            updateCallback={handleUpdateCheckbox}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                  <SubmitButton disabled={submittedButtonActive} onClick={handleSubmit}>
                    Submit
                  </SubmitButton>
                </>
              )}
        </>
      )}
    </>
  );
}
