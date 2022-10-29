import './App.css';

import {
  Route,
  NavLink,
  BrowserRouter
} from "react-router-dom";

import Navbar from './navbar/Navbar';
import RecipeOverview from './RecipeOverview/RecipeOverview';

function App() {
  return (
    <div>
      <Navbar/>
       <RecipeEditor/>
      <BrowserRouter>
        <RecipeOverview/>
      </BrowserRouter>
    </div>
  );
}

export default App;
