import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import RecipeDescription from "../recipe-full-view/recipe-description/RecipeDescription";

jest.mock('../recipe-full-view/recipe-description/RecipeDescription', () => ({
    useGetRecipe: jest.fn(() => ({
        title: "Test recipe",
        rating: 4,
        difficulty: 2,
        time: 60,
        ingredients: [
            { amount: '1', unit: 'cup', name: 'sugar' },
            { amount: '2', unit: 'tbsp', name: 'flour' },
            { amount: '1/2', unit: 'tsp', name: 'salt' }
        ],
        description: "Test recipe description"
    })),
    getFormatedTime: jest.fn((time) => `${time} minutes`)
}));

jest.mock('../recipe-full-view/recipe-description/RecipeDescription', () => () => {
    return (
        <div>
            <p>Test recipe</p>
            <p>4 / 5</p>
            <p>Schwierigkeit</p>
            <p>60 minutes</p>
            <p>Rezeptbeschreibung</p>
            <p>Test recipe description</p>
        </div>
    );
});



test('renders RecipeDescription', () => {
    render(<RecipeDescription />);

    expect(screen.getByText("Test recipe")).toBeInTheDocument();
    expect(screen.getByText("4 / 5")).toBeInTheDocument();
    expect(screen.getByText("Schwierigkeit")).toBeInTheDocument();
    expect(screen.getByText("60 minutes")).toBeInTheDocument();
    expect(screen.getByText("Rezeptbeschreibung")).toBeInTheDocument();
    expect(screen.getByText("Test recipe description")).toBeInTheDocument();
});

afterEach(cleanup);