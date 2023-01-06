import {useNavigate} from 'react-router-dom';

import {useGetRecipePage} from '../modules/api';

import {useParams} from 'react-router-dom';

import styles from './RecipeOverview.module.css';

import RecipeCard from './RecipeCard/RecipeCard';
import { useState } from 'react';
import Throbber from "../modules/throbber/throbber";

export default function RecipeOverview() {

    const [itemsPerPage, setItemsPerPage] = useState(15);

	let navigate = useNavigate();
	let {query, page} = useParams();
	let recipes = useGetRecipePage({q: query, page: page, size: itemsPerPage});

    function nextPage(){

        if(query){
            navigate(`/search/${query}/page/${recipes.currentPage + 1}`);
        }
        else {
            navigate(`/page/${recipes.currentPage + 1}`);
        }
    }

    const beforePage = () => {
        if(query){
            navigate(`/search/${query}/page/${recipes.currentPage - 1} `)
        }
        else{
            navigate(`/page/${recipes.currentPage - 1}`)
        }
    }

	if (recipes) {
		return (
			<div>
				<div className={styles['recipe-overview-container']}>
					{recipes.recipes.map((recipe) => (
						<RecipeCard key={recipe.id} onClick={() => navigate(`/recipe/${recipe.id}`)} {...recipe} />
					))}
				</div>
				<div className={styles['next-page-container']}>
                    <select value={itemsPerPage} onChange={(event) => {setItemsPerPage(event.target.value)}}>
                        <option>15</option>
                        <option>50</option>
                        <option>100</option>
                    </select>
                    {recipes.currentPage === 0 ? null : <span className="material-symbols-outlined" onClick={beforePage}>navigate_before</span>}
                    <p>{`${recipes.currentPage +1} von ${recipes.totalPages}`}</p>
                    {recipes.currentPage === recipes.totalPages -1 ? null : <span className="material-symbols-outlined" onClick={nextPage}>navigate_next</span>}
				</div>
			</div>
		);
	} else {
        return (<Throbber/>);
	}
}
