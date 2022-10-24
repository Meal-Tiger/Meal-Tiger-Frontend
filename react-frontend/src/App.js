import './App.css';

import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";

import Navbar from './navbar/Navbar';

function App() {
  return (
    <div>
      <Navbar/>
      <HashRouter>

      </HashRouter>
    </div>
  );
}

export default App;
