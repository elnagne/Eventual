import React, { useState } from "react";
  
export const SearchContext = React.createContext();

export const SearchContextProvider = ({ children }) => {
    const allFilters = {
        "Sport": true,
        "Entertainment": true,
        "Indoor Game": true,
        "Concert": true,
        "Charity": true
    };
    const [activeFilters, setActiveFilters] = useState(allFilters);
    const [womanOnly, setWomanOnly] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
  
    return (
        <SearchContext.Provider value={{ activeFilters, setActiveFilters, womanOnly, setWomanOnly, startDate, setStartDate, endDate, setEndDate, allFilters }}>
            {children}
        </SearchContext.Provider>
    );
};