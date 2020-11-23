import { createContext } from 'react'

const uidContextProvider = createContext({
    uidContext: null,
    setUidContext: () => {}
})

export default uidContextProvider