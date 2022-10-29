import './App.css';

import {
  Route,
  NavLink,
  BrowserRouter
} from "react-router-dom";

import Navbar from './navbar/Navbar';
import RecipeEditor from "./recipe-editor/RecipeEditor";

function App() {
  return (
    <div>
      <Navbar/>
       <RecipeEditor/>
      <BrowserRouter>
      </BrowserRouter>
    </div>
  );
}

export default App;
