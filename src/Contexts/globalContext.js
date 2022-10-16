import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const globalContext = createContext({});

function GlobalProvider({ children }) {
  const [stateX, setStateX] = useState([]);

  return (
    <globalContext.Provider
      value={ {
        stateX,
        setStateX,
      } }
    >
      {children}
    </globalContext.Provider>
  );
}

GlobalProvider.propTypes = {
  children: PropTypes,
}.isRequired;

export default GlobalProvider;