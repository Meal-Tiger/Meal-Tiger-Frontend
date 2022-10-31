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

    const addIngredientItem = () => {
        setIngredients([...ingredients, {
            amountUnit: ingredient.amountUnit,
            name: ingredient.name
        }]);
        setIngredient({
            amountUnit: "",
            name: ""
        });
        console.log(ingredients);
    }

    return (
        <table className={style.ingredientTable}>
            <thead>
            <tr>
                <td>
                    <h2>Zutaten</h2>
                </td>
            </tr>
            </thead>
            <tbody>
            {ingredients.map((item) =>
                <tr>
                    <td>
                        {item.amountUnit}
                    </td>
                    <td>
                        {item.name}
                    </td>
                </tr>
            )}
            <tr>
                <td>
                    <input placeholder={"Anzahl und Einheit"} type="text" name="amountUnit"
                           value={ingredient.amountUnit} onChange={handleChange}/>
                </td>
                <td>
                    <input placeholder={"Zutat"} type="text" name="name" value={ingredient.name} onChange={handleChange}
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