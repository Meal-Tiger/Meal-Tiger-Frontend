import style from './RecipeDescription.module.css';

export default function IngredientItem({amount, unit, ingredient}){
    return (
        <tr className={style.ingredientRow}>
            <td  className={style.ingredientColumnLeft}>
                {amount} {unit}
            </td>
            <td className={style.ingredientColumnRight}>
                {ingredient}
            </td>
        </tr>
    );
}