import React, { useState } from "react";
import useLocalStorage from 'use-local-storage'
  
export const ThemeContext = React.createContext();

export const ThemeContextProvider = ({ children }) => {
    const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');
  
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};