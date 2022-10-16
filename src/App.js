import React from 'react'
import GlobalProvider from './Contexts/globalContext'

const App = () => {
  return (
    <GlobalProvider>
      <div className="App">
        <h1>APP</h1>
      </div>
    </GlobalProvider>
  );
}

export default App;
