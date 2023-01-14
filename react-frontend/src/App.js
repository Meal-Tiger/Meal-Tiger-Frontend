import './App.css';

import {Route, BrowserRouter, Routes} from 'react-router-dom';

import Navbar from './navbar/Navbar';
import RecipeOverview from './RecipeOverview/RecipeOverview';
import RecipeFullView from './recipe-full-view/RecipeFullView';
import RecipeEditor from 'recipe-editor/RecipeEditor';
import ErrorBoundary from "./modules/ErrorBoundary/ErrorBoundary";
import Footer from "./footer/Footer";
import SiteNotice from "./footer/SiteNotice/SiteNotice";
import DataPrivacy from "./footer/DataPrivacy/DataPrivacy";


function App() {

	return (
			<BrowserRouter>
				<ErrorBoundary> <Navbar/> </ErrorBoundary>
					<div className='main-content'>
						<ErrorBoundary>
							<Routes>
								<Route path="/" element={<RecipeOverview/>}/>
								<Route path="/imprint" element={<SiteNotice/>}/>
								<Route path="/privacy" element={<DataPrivacy/>}/>
								<Route path="/page/:page" element={<RecipeOverview />}/>
								<Route path="/recipe/:recipeId" element={<RecipeFullView />}/>
								<Route path="/add-recipe" element={<RecipeEditor/>}/>
								<Route path="/search/:query/page/:page" element={<RecipeOverview />}/>
                				<Route path="/add-recipe" element={<RecipeEditor/>}/>
						    	<Route path="/search/:query/page/:page" element={<RecipeOverview />}/>
							</Routes>
						</ErrorBoundary>
					</div>
				<ErrorBoundary> <Footer/> </ErrorBoundary>
			</BrowserRouter>
	);
}

export default App;
