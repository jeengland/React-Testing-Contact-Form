import React from 'react';
import { render, fireEvent } from "@testing-library/react";
import ContactForm from './ContactForm';

test('Renders properly', () => {
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
    const consent = getByLabelText(/consent/);
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
    fireEvent.change(consent, {
        target: { name: 'consent', checked: true }
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
test('Form doesn\'t accept an invalid email/displays an error', async () => {
    const { getByLabelText, getByTestId, findByText } = render(<ContactForm />);
    // Get email field and submit button
    const email = getByLabelText(/email/i);
    const submit = getByTestId('submit');
    // Put in failing email value
    fireEvent.change(email,{ target: { name: 'email', value: 'email'}})
    // Submit and check for the correct error
    fireEvent.click(submit);
    await findByText(/error: pattern/i);
});

// Test to see of form rejects empty required fields
test('Form submits', async () => {
    const { getByTestId, findAllByText } = render(<ContactForm />)
    // Click the submit button
    fireEvent.click(getByTestId('submit'));
    // Check to make sure 3 errors appear
    await findAllByText(/error/i);
})