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
    expect(formHeader).toHaveTextContent(/contact form/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);
    const firstNameField = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstNameField, "Mark");

    const errorMessages = await screen.findAllByTestId('error');
    expect(errorMessages).toHaveLength(1);
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);
    const button = screen.queryByText(/submit/i);
    userEvent.click(button);

    const errorMessages = await screen.findAllByTestId('error');
    expect(errorMessages).toHaveLength(3);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);
    const firstNameField = screen.getByLabelText(/First Name*/i);
    const lastNameField = screen.getByLabelText(/Last Name*/i);
    userEvent.type(firstNameField, "Marcus");
    userEvent.type(lastNameField, "Tucker");
    const button = screen.queryByText(/submit/i);
    userEvent.click(button);
    
    const emailErrors = await screen.findAllByTestId('error');
    expect(emailErrors).toHaveLength(1);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm email="Stuff@"/>);
    const emailField = screen.getByLabelText(/Email*/i);
    userEvent.type(emailField, "stuff@")

    const emailErrors = await screen.findAllByTestId('error');
    expect(emailErrors).toContain(/email must be a valid email address/i);
});

// test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
//     render(<ContactForm firstName="Marcus" email="stuff@things.com"/>);
//     const button = screen.queryByText(/submit/i);
//     userEvent.click(button);
//     const lastNameErrors = screen.queryByText(/lastname/i);
//     expect(lastNameErrors).toBeVisible;
// });

// test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {

// });

// test('renders all fields text when all fields are submitted.', async () => {

// });
