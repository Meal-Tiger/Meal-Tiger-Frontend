import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useGetUserRecipesPage} from "../modules/api";
import UserRecipeCard from "./user-recipe-card/UserRecipeCard";
import Pagination from "../modules/pagination/pagination";

export default function UserRecipes() {
    const [itemsPerPage, setItemsPerPage] = useState(15);

    let {query, page} = useParams();
    let [recipes, error] = useGetUserRecipesPage({q: query, page: page, size: itemsPerPage});

    if (recipes) {

        return (
            <div>
                <UserRecipeCard recipes={recipes}/>
                <Pagination paginationObject={{object: recipes,error: error}}/>
            </div>
        )
    }

}