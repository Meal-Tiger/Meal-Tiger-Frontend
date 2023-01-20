import React from 'react';
import { render } from '@testing-library/react';
import RecipeOverview from "../RecipeOverview/RecipeOverview";
import {MemoryRouter} from "react-router-dom";

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
    useParams: () => ({query: 'lol', page:''})
}));

jest.mock('../modules/api', () => ({
    useGetRecipePage: () => {return [{
        "recipes": [
            {
                "id": "63c98870430aa840641e8b23",
                "title": "hubba bubba",
                "userId": "101adc4e-951d-48c5-8340-f5b4c3062d4c",
                "ingredients": [
                    {
                        "amount": 5,
                        "unit": "Blätter",
                        "name": "AAl"
                    }
                ],
                "description": "hubba bubba",
                "difficulty": 2,
                "time": 243,
                "images": []
            },
            {
                "id": "63c6e3d6430aa840641e8b13",
                "title": "Testrezept",
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
                "images": []
            }
        ],
        "totalItems": 18,
        "totalPages": 9,
        "currentPage": 0
    }, null]}
}));

jest.mock('../RecipeOverview/RecipeCard/RecipeCard', () => jest.fn());

test("Render RecipeOverview", () => {
    const {container} = render(<MemoryRouter><RecipeOverview/></MemoryRouter>);

    expect(container.firstChild).toBeTruthy();
});