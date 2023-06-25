import { createContext, useState} from "react";


export const StateContext = createContext();

const StateProvider = ({children}) => {
    const [showForm , setShowForm] = useState(false)
    const [showBtnRemove, setShowBtnRemove] = useState(false)
    return <StateContext.Provider value={{showForm, setShowForm, showBtnRemove, setShowBtnRemove}}>
        {children}
        </StateContext.Provider>
};

export default StateProvider;