import React from 'react';
import { render, cleanup } from '@testing-library/react';
import RecipeEditor from "../recipe-editor/RecipeEditor";

jest.mock("../modules/api", () => ({
    postRecipe: jest.fn(() => Promise.resolve(null)),
}));

jest.mock("../modules/events", () => ({
    useEvent: jest.fn(),
}));

jest.mock("../modules/api", () => ({
    postRecipe: jest.fn(() => Promise.resolve(null)),
}));

jest.mock("react-router", () => ({
    useNavigate: jest.fn(() => Promise.resolve(null)),
    useParams: () => {return {recipeId: null}},
}));

jest.mock('../recipe-editor/IngredientsContainerEditable', () => () => <div />);

jest.mock("../recipe-editor/uploadedImages", () => () => <div />);

jest.mock("../navbar/Usermenu/LoginWithKeycloak/LoginWithKeycloak", () => () => <div />);

jest.mock("../modules/Modal/Modal", () => jest.fn((props) => <div {...props} />));


afterEach(() => {
    jest.clearAllMocks()
    cleanup()
});

describe('RecipeEditor component', () => {

    it('renders without crashing', () => {
        const { asFragment } = render(<RecipeEditor />);
        expect(asFragment()).toMatchSnapshot();
    });
});