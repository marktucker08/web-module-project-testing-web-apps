import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

// const button = screen.queryByText(/submit/i);
const firstNameErrors = screen.queryByText(/firstname/i);
const lastNameErrors = screen.queryByText(/lastname/i);
const emailErrors = screen.queryByText(/email address/i);

test('renders without errors', () => {
    render(<ContactForm />);
});

test('renders the contact form header', () => {
    render(<ContactForm />);
    const formHeader = screen.queryByText(/contact form/i);
    expect(formHeader).toBeTruthy;
    expect(formHeader).toBeInTheDocument;
    expect(formHeader).toBeVisible;
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm firstName="Mark" />);
    const firstNameErrors = screen.queryByText(/firstname/i);
    expect(firstNameErrors).toBeVisible;
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);
    const button = screen.queryByText(/submit/i);
    userEvent.click(button);
     // const firstNameErrors = screen.queryByText(/firstname/i);
    expect(firstNameErrors).toBeVisible;
    
    expect(lastNameErrors).toBeVisible;
    
    expect(emailErrors).toBeVisible;
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm firstName="Marcus" lastName="Tucker"/>);
    const button = screen.queryByText(/submit/i);
    userEvent.click(button);
    const emailErrors = screen.queryByText(/email address/i);
    expect(emailErrors).toBeVisible;
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm email="Stuff@"/>);
    const emailErrors = screen.queryByText(/email address/i);
    expect(emailErrors).toBeVisible;
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {

});

test('renders all fields text when all fields are submitted.', async () => {

});
