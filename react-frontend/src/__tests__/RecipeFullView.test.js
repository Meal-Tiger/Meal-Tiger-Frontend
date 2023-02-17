import { screen, cleanup } from "@testing-library/react";
import RecipeFullView from "../recipe-full-view/RecipeFullView";
import React from 'react';
import {render} from '@testing-library/react';

jest.mock('../recipe-full-view/image-slider/ImageSlider', () => () => {
    return <div role='mockedImageSlider'></div>;
});

jest.mock('../recipe-full-view/recipe-description/RecipeDescription', () => () => {
    return <div role='mockedRecipeDescription'></div>;
})

jest.mock('modules/api', () => ({
    ...jest.requireActual('modules/api'),
    useGetRecipe: () => {
        return [{
        title: "Test recipe",
        rating: 4,
        difficulty: 2,
        time: 60,
        images: [0],
        ingredients: [
            { amount: '1', unit: 'cup', name: 'sugar' },
            { amount: '2', unit: 'tbsp', name: 'flour' },
            { amount: '1/2', unit: 'tsp', name: 'salt' }
        ],
        description: "Test recipe description"
        }]
    }
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
    useLocation: () => ({pathname: 'lol', page:''}),
    useParams: () => ({query: 'lol', page:''})
}));

test('Renders the modules for recipe-overview', () => {
    render(<RecipeFullView/>);

    const mockedImageSlider = screen.getByRole("mockedImageSlider");
    const mockedRecipeDescription = screen.getByRole("mockedRecipeDescription");

    expect(mockedImageSlider).toBeInTheDocument();
    expect(mockedRecipeDescription).toBeInTheDocument();
});

afterEach(() => {
    cleanup();
});
