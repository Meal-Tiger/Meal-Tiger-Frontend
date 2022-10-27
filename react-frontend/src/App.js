import './App.css';

import {
  Route,
  NavLink,
  BrowserRouter
} from "react-router-dom";

import Navbar from './navbar/Navbar';
import RecipeCard from './RecipeOverview/RecipeCard/RecipeCard';

function App() {
  return (
    <div>
      <Navbar/>
      <BrowserRouter>
        <RecipeCard/>
      </BrowserRouter>
    </div>
  );
}

export default App;
