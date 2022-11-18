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
    const [orderby, setOrderby] = useState("oldest");
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [city, setCity] = useState('');
  
    return (
        <SearchContext.Provider value={{ activeFilters, setActiveFilters, womanOnly, setWomanOnly, startDate, setStartDate, endDate, setEndDate, city, setCity, allFilters, orderby, setOrderby }}>
            {children}
        </SearchContext.Provider>
    );
};