import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useGetUserRecipesPage} from "../modules/api";
import styles from "./UserRecipes.module.css";
import UserRecipeCard from "./user-recipe-card/UserRecipeCard";

export default function UserRecipes() {
    const [itemsPerPage, setItemsPerPage] = useState(15);

    let navigate = useNavigate();
    let {query, page} = useParams();
    let [recipes, error] = useGetUserRecipesPage({q: query, page: page, size: itemsPerPage});

    if (recipes) {
        console.log(recipes);

        return (
            <div>
            <UserRecipeCard recipes={recipes}/>
            </div>
        )
    }

}