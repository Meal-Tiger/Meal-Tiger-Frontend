import { render, cleanup } from '@testing-library/react';
import RecipeEditor from "../recipe-editor/RecipeEditor";

jest.mock('../modules/api', () => ({
    postRecipe: jest.fn()
}));

test('renders RecipeEditor and submits a recipe', () => {
    render(<RecipeEditor />);
});

afterEach(cleanup);