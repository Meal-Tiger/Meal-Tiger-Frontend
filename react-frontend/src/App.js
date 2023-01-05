import './App.css';

import {Route, BrowserRouter, Routes} from 'react-router-dom';

import Navbar from './navbar/Navbar';
import RecipeOverview from './RecipeOverview/RecipeOverview';
import RecipeFullView from './recipe-full-view/RecipeFullView';
import RecipeEditor from 'recipe-editor/RecipeEditor';

function App() {

	return (
			<BrowserRouter>
				<Navbar/>
				<div className='main-content'>
					<Routes>
						<Route path="/" element={<RecipeOverview/>}/>
						<Route path="/recipe/:recipeId" element={<RecipeFullView />}/>
						<Route path="/add-recipe" element={<RecipeEditor/>}/>
						<Route path="/search/:query" element={<RecipeOverview />}/>
					</Routes>
				</div>
			</BrowserRouter>
	);
}

export default App;
