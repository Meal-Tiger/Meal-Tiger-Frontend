import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from "../navbar/Navbar";

jest.mock('../navbar/Usermenu/Usermenu.js', () => {
    return function MockedUsermenu() {
        return <div data-testid="mocked-usermenu" />;
    };
});

describe('Navbar', () => {
    test('renders a logo image', () => {
        render(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        );
        const logoImg = screen.getByAltText('Meal-Tiger Logo');
        expect(logoImg).toBeInTheDocument();
    });

    test('renders a search bar', () => {
        render(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        );
        const searchbar = screen.getByPlaceholderText('Search..');
        expect(searchbar).toBeInTheDocument();
    });

    test('renders a user menu', () => {
        render(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        );
        const usermenu = screen.getByTestId('mocked-usermenu');
        expect(usermenu).toBeInTheDocument();
    });
});