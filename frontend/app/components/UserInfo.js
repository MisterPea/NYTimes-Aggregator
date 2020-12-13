import React, { useState } from "react";
import AccountInfo from "./userInfo/AccountInfo"
import SubscriptionInfo from "./userInfo/SubscriptionInfo"

export default function UserInfo() {
  const [currentPanel, setCurrentPanel] = useState("sub")
  
  const handleClick = (btn) => {
    setCurrentPanel(btn)
  }
  
  return (
    <div>
        <menu>
            <button onClick={() => {handleClick('sub')}}>Subscription Info</button>
            <button onClick={() => {handleClick('info')}}>Account Info</button>
        </menu>
        <div>
        {/* <AccountInfo /> */}
          {currentPanel === "info" ? <AccountInfo /> : <SubscriptionInfo />}
        </div>
    </div>
  );
}
