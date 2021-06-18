import React from 'react';

import './App.scss';
import Routes from './routes/Routes';

const App = (): JSX.Element => {
  return (
    <div className="App">
      <div className="app-wrapper">
        <Routes />
      </div>
    </div>
  );
};

export default App;
