import { screen, cleanup } from "@testing-library/react";
import RecipeFullView from "../recipe-full-view/RecipeFullView";
import React from 'react';
import {render} from '@testing-library/react';

jest.mock('../recipe-full-view/image-slider/ImageSlider', () => () => {
    return <div role='mockedImageSlider'><mockedImageSlider/></div>;
});

jest.mock('../recipe-full-view/recipe-description/RecipeDescription', () => () => {
    return <div role='mockedRecipeDescription'><mockedRecipeDescription/></div>;
})

test('Renders the modules for RecipeOverview', () => {
    render(<RecipeFullView/>);

    const mockedImageSlider = screen.getByRole("mockedImageSlider");
    const mockedRecipeDescription = screen.getByRole("mockedRecipeDescription");

    expect(mockedImageSlider).toBeInTheDocument();
    expect(mockedRecipeDescription).toBeInTheDocument();
});

afterEach(() => {
    cleanup();
});
