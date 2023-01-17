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

import LoginContext from 'modules/LoginContext';
import { useState, useEffect } from 'react';
import { getAccessToken, logout } from 'modules/oidc';
import { useEvent } from 'modules/events';


function App() {

	const [loginStatus, setLoginStatus] = useState(false);

	useEffect(() => {
		getAccessToken().then((token) => {
			if(token){
				setLoginStatus(true);
			}
			else{
				logout();
			}
		});
	}, [])

	useEvent("login", () => {
		setLoginStatus(true);
	})
	
	useEvent("logout", () => {
		setLoginStatus(false);
	})

	return (
		<LoginContext.Provider value={{loginStatus: loginStatus, setLoginStatus: setLoginStatus}}>
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
		</LoginContext.Provider>
	);
}

export default App;
