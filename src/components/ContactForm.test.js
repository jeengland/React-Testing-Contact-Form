import React from 'react';
import { render, fireEvent, wait } from "@testing-library/react";
import ContactForm from './ContactForm';

test('The element has rendered', () => {
    render(<ContactForm />)
})

// Test to see if form accepts submissions
test('Correctly accepts submissions', async () => {
    const { getByLabelText, getByTestId, findByText } = render(<ContactForm />);
    // Grab the forms and submit from the component
    const firstName = getByLabelText(/first name/i);
    const lastName = getByLabelText(/last name/i);
    const email = getByLabelText(/email/i);
    const message = getByLabelText(/message/i);
    const submit = getByTestId('submit');

    // Send in test values
    fireEvent.change(firstName, {
        target: { name: 'firstName', value: 'John'}
    });
    fireEvent.change(lastName, {
        target: { name: 'lastName', value: 'Doe'}
    });
    fireEvent.change(email, {
        target: { name: 'email', value: 'email@email.com'}
    });
    fireEvent.change(message, {
        target: { name: 'message', value: 'Hello world'}
    });
    // Submit 
    fireEvent.click(submit);
    // Wait for submission then check values
    await findByText(/john/i);
    await findByText(/doe/i);
    await findByText(/email@email.com/i);
    await findByText(/hello world/i);
    // Failing test 
    // await findByText(/banana/);
});

// Test to see if form rejects invalid email

// Test to see of form rejects empty required fields