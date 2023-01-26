import {useLocation, useNavigate} from 'react-router-dom';

import {useGetRecipePage} from '../modules/api';

import {useParams} from 'react-router-dom';

import styles from './RecipeOverview.module.css';

import RecipeCard from './RecipeCard/RecipeCard';
import { useState } from 'react';
import Throbber from "../modules/throbber/throbber";
import Pagination from "../modules/pagination/pagination";

export default function RecipeOverview() {

    const [itemsPerPage, setItemsPerPage] = useState(15);

	let navigate = useNavigate();
	let {query, page} = useParams();
	let [recipes, error] = useGetRecipePage({q: query, page: page, size: itemsPerPage});

    let urlPath = useLocation().pathname;
    const handleChange = (newItemsize) => {
        urlPath = (urlPath.split("page/"));
        urlPath = urlPath[0] + "page/0"
        setItemsPerPage(newItemsize);
        navigate(urlPath);
    }

	if (recipes && recipes.recipes) {
		return (
			<div>
                <div className={styles["filter-top"]}>
                    <div>{recipes.totalItems} Rezepte gefunden</div>
                    <div>
                        <label htmlFor={"itemsPerPage"}>Anzahl Rezepte pro Seite </label>
                        <select id={"itemsPerPage"} value={itemsPerPage} onChange={(event) => {handleChange(event.target.value)}}>
                            <option>15</option>
                            <option>50</option>
                            <option>100</option>
                        </select>
                    </div>
                </div>
				<div className={styles['recipe-overview-container']}>
					{recipes.recipes.map((recipe) => (
						<RecipeCard key={recipe.id} onClick={() => navigate(`/recipe/${recipe.id}`)} {...recipe} />
					))}
				</div>
				<Pagination paginationObject={{object: recipes,error: error}}/>
			</div>
		);
	} else if(error){
        return (
            <div>
                <div className={styles["filter-top"]}>
                    <div>0 Rezepte gefunden: {error}</div>
                </div>
                <div className={styles['no-recipe-container']}>
                    <h1>Kein Rezept gefunden</h1>
                    <div>
                        Versuche es mit einem anderen Suchbegriff.
                    </div>
                </div>
            </div>
        )
    }else {
        return (<Throbber/>);
	}
}
