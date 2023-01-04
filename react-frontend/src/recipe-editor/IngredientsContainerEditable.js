import style from './RecipeEditor.module.css';
import {useContext, useState} from "react";
import {RecipeContext} from "./RecipeEditor";
import {options} from "./options";

export default function IngredientsContainerEditable() {

    const selectOptions = options.map( (item) => {return{label:item, value:item,}});
    console.log(selectOptions);
    const { recipe, setRecipe } = useContext(RecipeContext);
    const [newIngredient, setNewIngredient] = useState({
        amount: "",
        unit: "",
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
            recipe.ingredients[index].amount = value;
            recipe.ingredients[index].unit = value
        }
        setRecipe({...recipe});
    }

    const addIngredientItem = () => {
        if (newIngredient.amount === "" ||newIngredient.unit === "" || newIngredient.name === "") return;
        recipe.ingredients.push({
            amount: newIngredient.amount,
            unit:newIngredient.unit,
            name: newIngredient.name
        })
        setRecipe({...recipe});
        setNewIngredient({
            amount: "",
            unit: "",
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
                        <input data-index={index} type="text" name="amount" value={item.amount}
                               onChange={handleExistingChange}/>
                    </td>
                    <td>
                        <select name="unit">selectOptions</select>
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
                    <input placeholder={"Anzahl"} type="text" name="amount"
                           value={newIngredient.amount} onChange={handleChange}/>
                </td>
                <td>
                    <select name="unit">{
                        options.map( (item) => {
                            <option value={item}>{item}</option>
                        })
                    }</select>
                </td>
                <td>
                    <input placeholder={"Zutat"} type="text" name="name" value={newIngredient.name}
                           onChange={handleChange}
                    />
                </td>
                <td>
                    <button className={"btn btn-primary"} type={"button"} onClick={addIngredientItem}>Hinzufügen</button>
                </td>
            </tr>
            </tbody>
        </table>
    );
}
