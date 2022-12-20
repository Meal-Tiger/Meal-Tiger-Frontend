import './App.css';

import {createBrowserRouter, createRoutesFromElements,RouterProvider, Route, BrowserRouter, Routes} from 'react-router-dom';

import Navbar from './navbar/Navbar';
import RecipeOverview from './RecipeOverview/RecipeOverview';
import RecipeFullView from './recipe-full-view/RecipeFullView';
import RecipeEditor from 'recipe-editor/RecipeEditor';

function App() {

	return (
			<BrowserRouter>
				<Navbar/>
				<Routes>
					<Route path="/" element={<RecipeOverview />}/>
					<Route path="/recipe/:recipeid" element={<RecipeFullView />}/>
					<Route path="/add-recipe" element={<RecipeEditor/>}/>
				</Routes>
			</BrowserRouter>
	);
}

export default App;
