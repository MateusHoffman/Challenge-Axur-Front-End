import React from 'react'
import GlobalProvider from './Contexts/globalContext'
import Home from './pages/Home';

const App = () => {
  return (
    <GlobalProvider>
      <div className="App">
        <Home />
      </div>
    </GlobalProvider>
  );
}

export default App;
