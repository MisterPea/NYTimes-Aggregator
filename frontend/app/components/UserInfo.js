import React, { useContext, useEffect } from "react";
import {Redirect} from "react-router-dom"
import uidContextProvider from "./api/UidContext";

export default function UserInfo() {
    const {uidContext} = useContext(uidContextProvider)

  return (
    <div>
      {!uidContext && <Redirect to="/" />}
      USER INFO for {uidContext}
    </div>
  );
}
