import './App.css';

import {createBrowserRouter, createRoutesFromElements,RouterProvider, Route} from 'react-router-dom';

import Navbar from './navbar/Navbar';
import RecipeOverview from './RecipeOverview/RecipeOverview';

function App() {

	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/" element={<RecipeOverview />}>
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
