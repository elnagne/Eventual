import React, { useState } from "react";
  
export const RegisterContext = React.createContext();

export const RegisterContextProvider = ({children}) => {
    const [isModalOpen, setModalOpen] = useState(false);
  
    return (
        <RegisterContext.Provider value={{ isModalOpen, setModalOpen }}>
            {children}
        </RegisterContext.Provider>
    );
};