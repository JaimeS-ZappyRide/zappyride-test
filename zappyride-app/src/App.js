import React from 'react';
import { ChargersDisplay } from './ChargersDisplay';
import Logo from './assets/logo_circle.png';
import './App.css';

function App() {
  return (
    <React.Fragment>
      <div className="header">
        <img className="logoImg" alt="logo" src={Logo}/>
        <div className="logoGrey">Ever</div>
        <div className="logoGreen">green</div>
      </div>
      <ChargersDisplay/>
    </React.Fragment>
  );
}

export default App;
