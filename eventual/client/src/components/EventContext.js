import React, { useState } from "react";
  
export const EventContext = React.createContext();

export const EventContextProvider = ({ children }) => {

    const [commentText, setCommentText] = useState('');
  
    return (
        <EventContext.Provider value={{ commentText, setCommentText }}>
            {children}
        </EventContext.Provider>
    );
};