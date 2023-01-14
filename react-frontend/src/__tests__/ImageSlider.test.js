import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ImageSlider from "../recipe-full-view/image-slider/ImageSlider";
import { useGetRecipe } from '../modules/api';

jest.mock('../modules/api', () => ({
    useGetRecipe: jest.fn(),
}));

describe('ImageSlider', () => {

    test('Render ImageSlider with recipe', () => {
        useGetRecipe.mockImplementation(() => ({
            title: 'Mock Recipe',
        }));

        const { getByText } = render(<ImageSlider />);
        const recipeTitle = getByText('Mock Recipe');

        expect(recipeTitle).toBeInTheDocument();
    });
});

afterEach(cleanup);