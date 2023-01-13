import React from 'react';
import {render, cleanup, getAllByRole} from '@testing-library/react';
import IngredientsContainer from "../recipe-full-view/recipe-description/IngredientsContainer";
import IngredientItem from "../recipe-full-view/recipe-description/IngredientItem";

test('renders IngredientsContainer', () => {
    const ingredientArray = [
        {amount: '1', unit: 'cup', name: 'sugar'},
        {amount: '2', unit: 'tbsp', name: 'flour'},
        {amount: '1/2', unit: 'tsp', name: 'salt'}
    ];

    const { getAllByRole } = render(<IngredientsContainer ingredientArray={ingredientArray} />);
    const ingredientItems = getAllByRole('table');

    expect(ingredientItems.length).toBe(1);
    expect(ingredientItems[0]).toHaveTextContent("Zutaten1 cupsugar2 tbspflour1/2 tspsalt");
    screen.debug;
});

afterEach(cleanup);
