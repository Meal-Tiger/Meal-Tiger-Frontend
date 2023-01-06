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

    function changePage(pageNumber){
        if(query){
            navigate(`/search/${query}/page/${pageNumber}`);
        }
        else {
            navigate(`/page/${pageNumber}`);
        }
    }

    function nextPage(){
        if (recipes.currentPage+1 === recipes.totalPages) return;
        if(query){
            navigate(`/search/${query}/page/${recipes.currentPage + 1}`);
        }
        else {
            navigate(`/page/${recipes.currentPage + 1}`);
        }
    }

    const beforePage = () => {
        if (recipes.currentPage-1 === -1) return;
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
				<div className={styles['next-page-container']}>
                    {recipes.currentPage === 0 ? null : <span className={`${styles["change-page"]} material-symbols-outlined`} onClick={beforePage}>navigate_before</span>}

                    {recipes.totalPages >= 4 && recipes.currentPage >= 2 ? <span onClick={() => changePage(0)}> 1... </span> : ""}

                    <div className={styles["inner-pagination"]}>

                        {recipes.currentPage <= 1  ?
                            <span onClick={recipes.currentPage === 0 ?  null : beforePage} className={recipes.currentPage === 0 ?  styles.active:null}>1</span>
                            : recipes.currentPage >= recipes.totalPages-2 ? <span onClick={ recipes.currentPage === recipes.totalPages-1 ? () => changePage(recipes.totalPages-3) : beforePage}>{recipes.totalPages-2}</span>
                                :<span onClick={beforePage}>{recipes.currentPage}</span>
                        }

                        {recipes.totalPages >= 2 ?
                        recipes.currentPage <= 1  ?
                            <span onClick={recipes.currentPage === 1 ? null : nextPage} className={recipes.currentPage === 1 ?  styles.active:null}>2</span>
                            : recipes.currentPage >= recipes.totalPages-1 ? <span onClick={ recipes.currentPage === recipes.totalPages-1 ? beforePage :null}>{recipes.totalPages-1}</span>
                            :<span className={styles.active}>{recipes.currentPage +1}</span>
                        : null}

                        {recipes.totalPages >= 3 ?
                        recipes.currentPage <= 1 ?
                            <span onClick={() => changePage(2)}>3</span>
                            :recipes.currentPage >= recipes.totalPages-2 ? <span onClick={ recipes.currentPage === recipes.totalPages -1 ?  null :nextPage} className={recipes.currentPage === recipes.totalPages -1 ? styles.active:null}>{recipes.totalPages}</span>
                            : <span onClick={nextPage}>{recipes.currentPage +2}</span>
                        : null}

                    </div>

                    {recipes.totalPages >= 4 && recipes.currentPage <= recipes.totalPages -3 ? <span onClick={() => changePage(recipes.totalPages-1)}> ...{recipes.totalPages}</span> : ""}

                    {recipes.currentPage === recipes.totalPages -1 ? null : <span className={`${styles["change-page"]} material-symbols-outlined`} onClick={nextPage}>navigate_next</span>}
                </div>
			</div>
		);
	} else {
        return (<Throbber/>);
	}
}
