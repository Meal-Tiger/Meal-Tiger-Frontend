import style from './RecipeEditor.module.css';
import {useState} from "react";

export default function IngredientsContainerEditable({ingredientArray}) {

    const [ingredients, setIngredients] = useState([]);
    const [ingredient, setIngredient] = useState({
        amountUnit: "",
        name: ""
    })
    function handleChange(evt) {
        const value = evt.target.value;
        setIngredient({
            ...ingredient,
            [evt.target.name]: value
        });
    }


    const addIngredientItem = () =>{
        ingredients.push({
            amountUnit: ingredient.amountUnit,
            name: ingredient.name
        });
        console.log(ingredients);
    }

    return (
        <table className={style.ingredientTable}>
            <thead>
            <h2>Zutaten</h2>
            </thead>
            <tbody>
            {ingredients.map((item)=> {
                    <tr>
                        <td>
                            {item.amountUnit}
                        </td>
                        <td>
                            {item.name}
                        </td>
                    </tr>
            })}
            <tr>
                <td>
                    <input
                        type="text"
                        name="amountUnit"
                        value={ingredient.amountUnit}
                        onChange={handleChange}
                    />
                </td>
                <td>
                    <input
                        type="text"
                        name="name"
                        value={ingredient.name}
                        onChange={handleChange}
                    />
                </td>
                <td>
                    <button type={"button"} onClick={addIngredientItem}>Add</button>
                </td>
            </tr>
            </tbody>
        </table>
    );
}