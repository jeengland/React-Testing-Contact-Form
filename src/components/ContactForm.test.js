import React from 'react';
import { render, fireEvent } from "@testing-library/react";
import ContactForm from './ContactForm';

// Test to see if form accepts submissions
test('Correctly accepts submissions', () => {
    const { getByLabelText, getByText } = render(<ContactForm />);
    // Grab the forms from the component
    const formLabels = [/first name/i, /last name/i, /email/i, /message/i];
    const forms = formLabels.map((label) => {
        getByLabelText(label);
    })
});

// Test to see if form rejects invalid email

// Test to see of form rejects empty fields