import style from './RecipeDescription.module.css';

export default function IngredientItem({amount, unit, name}){
    return (
        <tr className={style.ingredientRow}>
            <td  className={style.ingredientColumnLeft}>
                {amount} {unit}
            </td>
            <td className={style.ingredientColumnRight}>
                {name}
            </td>
        </tr>
    );
}