import React from 'react';
import { render, cleanup } from '@testing-library/react';
import IngredientItem from "../recipe-full-view/recipe-description/IngredientItem";

test('renders IngredientItem', () => {
    const { getByText } = render(<IngredientItem amount="1" unit="cup" name="sugar" />);
    const amount = getByText("1 cup");
    const name = getByText("sugar");

    expect(amount).toBeInTheDocument();
    expect(name).toBeInTheDocument();
});

afterEach(cleanup);