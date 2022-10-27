import style from './RecipeDescription.module.css';
import IngredientItem from "./IngredientItem";

export default function IngredientsContainer({ingredientArray}) {
    const ingredientItems = ingredientArray.map(element => {
        return <IngredientItem amount={element.amount} unit={element.unit} ingredient={element.ingredient}/>;
    });
    return (
        <table className={style.ingredientTable}>
            <thead>
            <h2>Zutaten</h2>
            </thead>
            <tbody>
                {ingredientItems}
            </tbody>
        </table>
    );
}