document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById("login-form");
    const cancelButton = document.getElementById("cancelButton");
    const forgotPasswordButton = document.getElementById("forgotPasswordButton");
    // Function to retrieve data from localStorage
    function getLocalData(key) {
        return JSON.parse(localStorage.getItem(key));
    }

    // Function to validate login data
    function validateLogin(username, password) {
        // Retrieve accounts data from localStorage
        const accounts = getLocalData("accounts");

        // Check if username or email exists in accounts and matches the password
        const user = accounts.find(
            (acc) =>
            (acc.username === username || acc.email === username) &&
            acc.password === password
        );

        return user;
    }

    // Function to handle form submission
    function handleLogin(event) {
        event.preventDefault(); // Prevent form from submitting

        // Get form data
        const username = document.getElementById("username-input").value;
        const password = document.getElementById("password-input").value;

        // Validate login data
        const user = validateLogin(username, password);

        // If user is found, save user details to localStorage and redirect to profile.html
        if (user) {
            localStorage.setItem("currentUser", JSON.stringify(user));
            window.location.href = "./profile.html";
        } else {
            // Otherwise, display error message
            const errorMessage = document.getElementById("login-error-message");
            errorMessage.style.color = "red";
            errorMessage.innerText = "Invalid username or password.";
        }
    }

    // Function to handle cancel button click
    function goToIndex() {
        window.location.href = "./index.html";
    }

    // Define function to show forgot password dialog box
    function forgotPassword() {
        // Create dialog box
        var dialogBox = document.createElement("div");
        dialogBox.classList.add("dialog-box");

        // Create form
        var form = document.createElement("form");
        form.addEventListener("submit", submitForgotPassword);
        form.innerHTML = `
      <h2>Forgot Password</h2>
      <p>In order to reset your password, Please confirm the following information:</p>
      <label for="username-input">Username:</label>
      <input type="text" id="username-input" name="username" required>
      <label for="first-name-input">First Name:</label>
      <input type="text" id="first-name-input" name="firstName" required>
      <label for="last-name-input">Last Name:</label>
      <input type="text" id="last-name-input" name="lastName" required>
      <label for="email-input">Email:</label>
      <input type="email" id="email-input" name="email" required>
      <label for="student-id-input">Student ID:</label>
      <input type="text" id="student-id-input" name="studentId" required>
      <label for="new-password-input">New Password:</label>
      <input type="password" id="new-password-input" name="newPassword" required>
      <div class="error-message"></div>
      <div class="dialog-buttons">
        <button type="button" class="dialogButton" id="dcancelButton">Cancel</button>
        <button type="submit" class="dialogButton">Submit</button>
      </div>
    `;

        // Add form to dialog box
        dialogBox.appendChild(form);

        // Add dialog box to page
        document.body.appendChild(dialogBox);

        // Get reference to cancel button and add event listener
        const dcancelButton = document.getElementById("dcancelButton");
        dcancelButton.addEventListener("click", hideDialogBox);
    }

    // Define function to submit forgot password form
    function submitForgotPassword(event) {
        event.preventDefault();

        // Get user input from form
        var username = document.getElementById("username-input").value;
        var firstName = document.getElementById("first-name-input").value;
        var lastName = document.getElementById("last-name-input").value;
        var email = document.getElementById("email-input").value;
        var studentId = document.getElementById("student-id-input").value;
        var newPassword = document.getElementById("new-password-input").value;

        // Check if user input matches an account in local storage
        var accounts = JSON.parse(localStorage.getItem("accounts")) || [];
        var matchingAccount = accounts.find(function(account) {
            return (
                account.username === username &&
                account.firstName === firstName &&
                account.lastName === lastName &&
                account.email === email &&
                account.studentId === studentId
            );
        });

        // If user input matches an account, update password
        if (matchingAccount) {
            matchingAccount.password = newPassword;
            localStorage.setItem("accounts", JSON.stringify(accounts));
            hideDialogBox();
        } else {
            // If user input does not match an account, show error message
            var errorMessage = document.querySelector(".error-message");
            errorMessage.textContent =
                "Invalid input. Please check your username, first name, last name, email, and student ID.";
        }
    }

    // Define function to hide dialog box
    function hideDialogBox() {
        var dialogBox = document.querySelector(".dialog-box");
        dialogBox.parentElement.removeChild(dialogBox);
    }
    // Add event listener to form submission
    loginForm.addEventListener("submit", handleLogin);
    cancelButton.addEventListener("click", goToIndex);
    forgotPasswordButton.addEventListener("click", forgotPassword);

});