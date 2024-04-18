import React from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import Routers from '../src/router/index';

function App() {
  return (
    <BrowserRouter>
      <Routers />
    </BrowserRouter>
  );
}

export default App;
