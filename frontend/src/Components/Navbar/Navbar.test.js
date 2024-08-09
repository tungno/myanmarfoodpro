import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n'; // Ensure this is the correct path to your i18n configuration

test('renders Navbar with correct initial state', () => {
    console.log('Test is running'); // Add this line to check if the test file is being executed
    render(
        <I18nextProvider i18n={i18n}>
            <Navbar wishlistCount={2} basketCount={3} />
        </I18nextProvider>
    );

    expect(screen.getByText(/deliver_to/i)).toBeInTheDocument();
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    expect(screen.getByText(/2/)).toBeInTheDocument();
    expect(screen.getByText(/3/)).toBeInTheDocument();
});
