import React from 'react';
import { render } from '@testing-library/react';
import IngredientsContainerEditable from "../recipe-editor/IngredientsContainerEditable";

test('renders IngredientsContainerEditable component', () => {
    const recipe = {
        ingredients: [
            {amount: '1', unit: 'g', name: 'sugar'},
            {amount: '2', unit: 'kg', name: 'flour'}
        ]
    };
    render(<IngredientsContainerEditable recipe={recipe} setRecipe={() => {}} />);
});