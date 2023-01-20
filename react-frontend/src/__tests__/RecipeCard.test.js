import React from 'react';
import { render, cleanup } from '@testing-library/react';
import RecipeCard from "../RecipeOverview/RecipeCard/RecipeCard";

afterEach(cleanup);

jest.mock('../modules/api', () => ({
    useGetRecipe: () => {return [
        {
            "id": "63c6e3d6430aa840641e8b13",
            "title": "Mock recipe",
            "userId": "16844c69-480d-4bee-abb9-f76b955969ed",
            "ingredients": [
                {
                    "amount": 5,
                    "unit": "Beet/e",
                    "name": "Test"
                }
            ],
            "description": "Dies ist ein Test",
            "difficulty": 2,
            "time": 60,
            "images": [],
        }, null]},
    getFormatedTime: jest.fn(time => `${time} minutes`)
}));

describe('RecipeCard component', () => {
    it('renders without crashing', () => {
        const { asFragment } = render(
            <RecipeCard
                title="Test Recipe"
                time={30}
                rating={4}
                onClick={() => {}}
            />
        );
        expect(asFragment()).toMatchSnapshot();
    });
});