import React from 'react';
import {cleanup, render} from '@testing-library/react';
import IngredientsContainerEditable from "../recipe-editor/IngredientsContainerEditable";

afterEach(() => {
    cleanup()
})

jest.mock('../recipe-editor/options', () => ({
    options: ['g', 'kg', 'ml', 'l']
}));

jest.mock('../recipe-editor/RecipeEditor', () => ({
    RecipeContext: {
        recipe: {}
    }
}))

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useContext: () => {
        return {
            recipe: {
                title: "",
                description: "",
                difficulty: 0,
                rating: 5,
                time: 0,
                ingredients: []
            },
            setRecipe: () => {
            },
        }
    }
}))
test('renders without crashing', () => {

        const { asFragment } = render(
                <IngredientsContainerEditable />
        );
        expect(asFragment()).toMatchSnapshot();
});