import style from './RecipeDescription.module.css';
import IngredientItem from "./IngredientItem";

export default function IngredientsContainer({ingredientArray}) {
    const ingredientItems = ingredientArray.map((element, index) => {
        return <IngredientItem amount={element.amount} unit={element.unit} name={element.name} key={index}/>;
    });
    return (
        <table className={style.ingredientTable}>
            <thead className={style.ingredientThead}>
            <tr><td>Zutaten</td></tr>
            </thead>
            <tbody>
                {ingredientItems}
            </tbody>
        </table>
    );
}