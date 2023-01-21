import {useNavigate} from 'react-router-dom';

import {useGetRecipePage} from '../modules/api';

import {useParams} from 'react-router-dom';

import styles from './RecipeOverview.module.css';

import RecipeCard from './RecipeCard/RecipeCard';
import { useState } from 'react';
import Throbber from "../modules/throbber/throbber";
import Modal from 'modules/Modal/Modal';
import Pagination from "../modules/pagination/pagination";

export default function RecipeOverview() {

    const [itemsPerPage, setItemsPerPage] = useState(15);

	let navigate = useNavigate();
	let {query, page} = useParams();
	let [recipes, error] = useGetRecipePage({q: query, page: page, size: itemsPerPage});

	if (recipes && recipes.recipes) {
		return (
			<div>
                <div className={styles["filter-top"]}>
                    <div>{recipes.totalItems} Rezepte gefunden</div>
                    <div>
                        <label htmlFor={"itemsPerPage"}>Anzahl Rezepte pro Seite </label>
                        <select id={"itemsPerPage"} value={itemsPerPage} onChange={(event) => {setItemsPerPage(event.target.value)}}>
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
        return (<Modal className="error" show={true}>{error}</Modal>);
    }else {
        return (<Throbber/>);
	}
}
