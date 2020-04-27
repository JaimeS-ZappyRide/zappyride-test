import React from 'react';
import './App.css';
import { ChargersDisplay } from './ChargersDisplay';
import Logo from './assets/logo_circle.png';

function App() {
  return (
    <React.Fragment>
      <div className="header">
        <img className="img" src={Logo}/>
        <div className="logo1">Ever</div>
        <div className="logo2">green</div>
      </div>
      <ChargersDisplay/>
    </React.Fragment>
  );
}

export default App;
