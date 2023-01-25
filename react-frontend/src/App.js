import './App.css';

import {useEffect, useState} from 'react';

import {Route, BrowserRouter, Routes} from 'react-router-dom';

import Navbar from './navbar/Navbar';
import RecipeOverview from './recipe-overview/RecipeOverview';
import RecipeFullView from './recipe-full-view/RecipeFullView';
import RecipeEditor from 'recipe-editor/RecipeEditor';
import ErrorBoundary from './modules/ErrorBoundary/ErrorBoundary';
import Footer from './footer/Footer';
import SiteNotice from './footer/SiteNotice/SiteNotice';
import DataPrivacy from './footer/DataPrivacy/DataPrivacy';
import Modal from 'modules/Modal/Modal';
import LoginWithKeycloak from 'navbar/Usermenu/LoginWithKeycloak/LoginWithKeycloak';
import {getAccessToken} from 'modules/oidc';
import { useEvent } from 'modules/events';
import Profile from "./profile/Profile";

function App() {
	useEffect(() => {
		getAccessToken().then((token) => {
			if (token) sessionStorage.setItem('login', 'true');
			else sessionStorage.setItem('login', 'false');
		});
	}, []);

	const [showModal, setShowModal] = useState(false)

	useEvent("openLoginModal", () => {
		setShowModal(true)
	})

	useEvent("closeLoginModal", () => {
		setShowModal(false)
	})

	return (
		<BrowserRouter>
			<ErrorBoundary>
				{' '}
				<Navbar />{' '}
			</ErrorBoundary>

				<div className="main-content">
					<ErrorBoundary>
						<Routes>
							<Route path="/" element={<RecipeOverview />} />
							<Route path="/imprint" element={<SiteNotice />} />
							<Route path="/privacy" element={<DataPrivacy />} />
							<Route path="/page/:page" element={<RecipeOverview />} />
							<Route path="/recipe/:recipeId" element={<RecipeFullView />} />
							<Route path="/recipe/:recipeId/search/:query/page/:page" element={<RecipeFullView />} />
							<Route path="/recipe/:recipeId/page/:page" element={<RecipeFullView />} />
							<Route path="/add-recipe" element={<RecipeEditor />} />
							<Route path="/search/:query/page/:page" element={<RecipeOverview />} />
							<Route path="/add-recipe" element={<RecipeEditor />} />
							<Route path="/search/:query/page/:page" element={<RecipeOverview />} />
							<Route path="/profile" element={<Profile/>}/>
						</Routes>
					</ErrorBoundary>
				</div>

			<ErrorBoundary>
				<Modal show={showModal} setShow={setShowModal}>
					<h1>Login</h1>
					<LoginWithKeycloak />
				</Modal>
			</ErrorBoundary>

			<ErrorBoundary>
				<Footer />
			</ErrorBoundary>

		</BrowserRouter>
	);
}

export default App;
