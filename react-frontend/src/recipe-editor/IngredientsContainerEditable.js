import style from './RecipeEditor.module.css';
import {useState} from "react";

export default function IngredientsContainerEditable({ingredientArray}) {

    const [ingredients, setIngredients] = useState([]);
    const [newIngredient, setNewIngredient] = useState({
        amountUnit: "",
        name: ""
    })

    const handleChange = (event) => {
        const value = event.target.value;
        setNewIngredient({
            ...newIngredient,
            [event.target.name]: value
        });
    }

    const handleExistingChange = (event) => {
        let index = event.target.getAttribute("data-index");
        let value = event.target.value;
        if (event.target.name === "name") {
            ingredients[index].name = value;
        } else {
            ingredients[index].amountUnit = value;
        }
        setIngredients([
            ...ingredients
        ]);
    }

    const addIngredientItem = () => {
        if (newIngredient.amountUnit === "" || newIngredient.name === "") return;
        setIngredients([
            ...ingredients, {
                amountUnit: newIngredient.amountUnit,
                name: newIngredient.name
            }]);
        setNewIngredient({
            amountUnit: "",
            name: ""
        });
    }

    const removeIngredientItem = (event) => {
        let removeId = event.target.getAttribute("data-index");
        ingredients.splice(removeId, 1);
        setIngredients([
            ...ingredients
        ]);
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
            {ingredients.map((item, index) =>
                <tr key={index}>
                    <td>
                        <input data-index={index} type="text" name="amountUnit" value={item.amountUnit}
                               onChange={handleExistingChange}/>
                    </td>
                    <td>
                        <input data-index={index} type="text" name="name" value={item.name}
                               onChange={handleExistingChange}/>
                    </td>
                    <td>
                        <button className={style.btn} data-index={index} type={"button"}
                                onClick={removeIngredientItem}>Remove
                        </button>
                    </td>
                </tr>
            )}
            <tr>
                <td>
                    <input placeholder={"Anzahl und Einheit"} type="text" name="amountUnit"
                           value={newIngredient.amountUnit} onChange={handleChange}/>
                </td>
                <td>
                    <input placeholder={"Zutat"} type="text" name="name" value={newIngredient.name}
                           onChange={handleChange}
                    />
                </td>
                <td>
                    <button className={style.btn} type={"button"} onClick={addIngredientItem}>Add</button>
                </td>
            </tr>
            </tbody>
        </table>
    );
}