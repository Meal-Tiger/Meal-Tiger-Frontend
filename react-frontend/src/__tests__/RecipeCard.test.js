import React from 'react';
import {cleanup, render} from '@testing-library/react';
import RecipeCard from "../RecipeOverview/RecipeCard/RecipeCard";

test('renders RecipeCard component', () => {
    const title = 'Test recipe';
    const time = 60;
    const rating = 4;
    const { getByText } = render(<RecipeCard title={title} time={time} rating={rating} onClick={() => {}} />);

    expect(getByText(title)).toBeInTheDocument();
    expect(getByText('1 Stunde')).toBeInTheDocument();
    expect(getByText(`${rating}/5`)).toBeInTheDocument();
});

afterEach(cleanup);