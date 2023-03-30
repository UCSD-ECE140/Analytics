document.addEventListener('DOMContentLoaded', () => {
    // Get form and message elements
    const registrationForm = document.getElementById('registration-form');
    const registrationMessage = document.getElementById('registration-message');

    // Define function to validate form data
    function validateFormData(formData) {

        // Validate first name (any non-empty string is valid)
        const firstName = formData.get('first-name');
        if (!firstName) {
            return 'Please provide a valid first name';
        }

        // Validate last name (any non-empty string is valid)
        const lastName = formData.get('last-name');
        if (!lastName) {
            return 'Please provide a valid last name';
        }

        // Validate student id (numerical input with minimum length of 5)
        const studentId = parseInt(formData.get('student-id'));
        if (isNaN(studentId) || studentId.toString().length < 5) {
            return 'Please provide a valid student ID (minimum length of 5)';
        }

        // Validate email (unique and valid format)
        const email = formData.get('email');
        if (!email || !email.includes('@')) {
            return 'Please provide a valid email address';
        }
        const existingAccounts = JSON.parse(localStorage.getItem('accounts') || '[]');
        if (existingAccounts.some(account => account.email === email)) {
            return 'An account with this email already exists';
        }

        // Validate username (unique)
        const username = formData.get('username');
        if (!username) {
            return 'Please provide a valid username';
        }
        if (existingAccounts.some(account => account.username === username)) {
            return 'This username is already taken';
        }

        // Validate password (any non-empty string is valid)
        const password = formData.get('password');
        if (!password) {
            return 'Please provide a valid password';
        }

        // If all data is valid, return null
        return null;
    }

    // Define function to handle form submission
    function handleFormSubmission(event) {
        event.preventDefault();
        const formData = new FormData(registrationForm);
        const validationError = validateFormData(formData);
        if (validationError) {
            registrationMessage.innerText = validationError;
            registrationMessage.style.color = 'darkred';
        } else {
            // Encrypt password before saving
            const password = formData.get('password');
            const encryptedPassword = btoa(password);

            // Create new account object and save to local storage
            const newAccount = {
                firstName: formData.get('first-name'),
                lastName: formData.get('last-name'),
                studentId: parseInt(formData.get('student-id')),
                email: formData.get('email'),
                username: formData.get('username'),
                password: encryptedPassword,
            };
            const existingAccounts = JSON.parse(localStorage.getItem('accounts') || '[]');
            existingAccounts.push(newAccount);
            localStorage.setItem('accounts', JSON.stringify(existingAccounts));

            // Show success message
            registrationMessage.innerText = 'Account created successfully';
            registrationMessage.style.color = 'darkgreen';
            registrationForm.reset();
        }
    }

    // Add form submission event listener
    registrationForm.addEventListener('submit', handleFormSubmission);
});