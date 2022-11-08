import style from './RecipeDescription.module.css';
import IngredientItem from "./IngredientItem";

export default function IngredientsContainer({ingredientArray}) {
    const ingredientItems = ingredientArray.map(element => {
        return <IngredientItem amount={element.amount} unit={element.unit} name={element.name}/>;
    });
    return (
        <table className={style.ingredientTable}>
            <thead className={style.ingredientThead}>
            Zutaten
            </thead>
            <tbody>
                {ingredientItems}
            </tbody>
        </table>
    );
}