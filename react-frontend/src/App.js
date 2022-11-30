import './App.css';

import {createBrowserRouter, createRoutesFromElements,RouterProvider, Route} from 'react-router-dom';

import Navbar from './navbar/Navbar';
import RecipeOverview from './RecipeOverview/RecipeOverview';
import RecipeFullView from './recipe-full-view/RecipeFullView';

function App() {

	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route>
				<Route path="/" element={<RecipeOverview />}/>
				<Route path="/recipe/:recipeid" element={<RecipeFullView />}/>
			</Route>
		)
	);

	return (
		<div>
			<Navbar/>
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
