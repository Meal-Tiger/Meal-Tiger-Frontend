import './App.css';

import {
  Route,
  NavLink,
  BrowserRouter
} from "react-router-dom";

import Navbar from './navbar/Navbar';

function App() {
  return (
    <div>
      <Navbar/>
      <BrowserRouter>
      </BrowserRouter>
    </div>
  );
}

export default App;
