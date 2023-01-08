import './App.css';

import {Route, BrowserRouter, Routes} from 'react-router-dom';

import Navbar from './navbar/Navbar';
import RecipeOverview from './RecipeOverview/RecipeOverview';
import RecipeFullView from './recipe-full-view/RecipeFullView';
import RecipeEditor from 'recipe-editor/RecipeEditor';
import Footer from "./footer/Footer";
import SiteNotice from "./footer/SiteNotice/SiteNotice";
import DataPrivacy from "./footer/DataPrivacy/DataPrivacy";

function App() {

	return (
			<BrowserRouter>
				<Navbar/>
				<div className='main-content'>
					<Routes>
						<Route path="/" element={<RecipeOverview/>}/>
						<Route path="/impressum" element={<SiteNotice/>}/>
						<Route path="/datenschutz" element={<DataPrivacy/>}/>
						<Route path="/page/:page" element={<RecipeOverview />}/>
						<Route path="/recipe/:recipeId" element={<RecipeFullView />}/>
						<Route path="/add-recipe" element={<RecipeEditor/>}/>
						<Route path="/search/:query/page/:page" element={<RecipeOverview />}/>
					</Routes>
				</div>
				<Footer/>
			</BrowserRouter>
	);
}

export default App;
