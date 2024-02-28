"use client";

import { createContext, useState, useContext } from "react";

const SearchContext = createContext();

export const useSearchContext = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  const [showSearchBar, setShowSearchBar] = useState(false);

  const toggleSearchBar = () => {
    setShowSearchBar((prevState) => !prevState);
  };

  return (
    <SearchContext.Provider value={{ showSearchBar, toggleSearchBar }}>
      {children}
    </SearchContext.Provider>
  );
};
