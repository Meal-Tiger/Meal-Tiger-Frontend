import {render, screen} from "@testing-library/react";


import * as hooks from 'modules/api';
import * as router from 'react-router';

import RecipeOverview from "../RecipeOverview/RecipeOverview";

beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => jest.fn())
})

test("Render RecipeOverview", () => {

    jest.spyOn(hooks, 'useGetRecipePage').mockReturnValue({recipes:[{
            "id": 0,
            "title": "string",
            "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "ingredients": [
                {
                    "amount": 0,
                    "unit": "string",
                    "name": "string"
                }
            ],
            "description": "string",
            "difficulty": 3,
            "time": 1,
            "images": [
                "3fa85f64-5717-4562-b3fc-2c963f66afa6"
            ]
        },

            {
                "id": 2,
                "title": "string",
                "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "ingredients": [
                    {
                        "amount": 0,
                        "unit": "string",
                        "name": "string"
                    }
                ],
                "description": "string",
                "difficulty": 3,
                "time": 1,
                "images": [
                    "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                ]
            }
        ],
        "currentPage": 0,
        "totalItems": 2,
        "totalPages": 1
    });


    render(<RecipeOverview/>)

    screen.debug()
});