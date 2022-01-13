import { createContext } from 'react';

const uidContextProvider = createContext({
  uidContext: {
    name: null,
    uid: null,
    subscriptions: [],
  },
  setUidContext: () => {},
});

export default uidContextProvider;
