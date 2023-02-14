import React from 'react';
import {render, cleanup} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ImageSlider from '../recipe-full-view/image-slider/ImageSlider';


const mockrecipe = {
    id: '63c6e3d6430aa840641e8b13',
    title: 'Mock recipe',
    userId: '16844c69-480d-4bee-abb9-f76b955969ed',
    ingredients: [
        {
            amount: 5,
            unit: 'Beet/e',
            name: 'Test'
        }
    ],
    description: 'Dies ist ein Test',
    difficulty: 2,
    time: 60,
    images: [0]
}

describe('ImageSlider', () => {
	test('Render ImageSlider with recipe', () => {
		const {getByText} = render(<ImageSlider recipe={mockrecipe}/>);
		const recipeTitle = getByText('Mock recipe');

		expect(recipeTitle).toBeInTheDocument();
		screen.debug;
	});
});

afterEach(cleanup);
