import './App.css';

import {
  BrowserRouter
} from "react-router-dom";

import Navbar from './navbar/Navbar';
import RecipeOverview from './RecipeOverview/RecipeOverview';

function App() {
  return (
    <div>
      <Navbar/>
      <BrowserRouter>
        <RecipeOverview/>
      </BrowserRouter>
    </div>
  );
}

export default App;
