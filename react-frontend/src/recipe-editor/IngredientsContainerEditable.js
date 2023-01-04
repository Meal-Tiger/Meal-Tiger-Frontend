import style from './RecipeEditor.module.css';
import {useContext, useState} from "react";
import {RecipeContext} from "./RecipeEditor";

export default function IngredientsContainerEditable() {

    const { recipe, setRecipe } = useContext(RecipeContext);
    const [newIngredient, setNewIngredient] = useState({
        amountUnit: "",
        name: "",
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
            recipe.ingredients[index].name = value;
        } else {
            recipe.ingredients[index].amountUnit = value;
        }
        setRecipe({...recipe});
    }

    const addIngredientItem = () => {
        if (newIngredient.amountUnit === "" || newIngredient.name === "") return;
        recipe.ingredients.push({
            amountUnit:newIngredient.amountUnit,
            name: newIngredient.name
        })
        setRecipe({...recipe});
        setNewIngredient({
            amountUnit: "",
            name: ""
        });
    }

    const removeIngredientItem = (event) => {
        let removeId = event.target.getAttribute("data-index");
        recipe.ingredients.splice(removeId, 1);
        setRecipe({...recipe});
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
            {recipe.ingredients.map((item, index) =>
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
                        <button className={"btn btn-secondary"} data-index={index} type={"button"}
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
                    <button className={"btn btn-primary"} type={"button"} onClick={addIngredientItem}>Add</button>
                </td>
            </tr>
            </tbody>
        </table>
    );
}
