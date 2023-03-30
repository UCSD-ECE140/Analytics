// Get the current user's information from local storage
var currentUser = JSON.parse(localStorage.getItem("currentUser"));

// Get the form and input fields
var profileForm = document.getElementById("profileForm");
var usernameInput = document.getElementById("username");
var passwordInput = document.getElementById("password");
var emailInput = document.getElementById("email");

// Set the input field values to the current user's information
usernameInput.value = currentUser.username;
passwordInput.value = currentUser.password;
emailInput.value = currentUser.email;

// Add event listener to the profile form submission
profileForm.addEventListener("submit", function(event) {
    event.preventDefault();

    // Get the updated input field values
    var updatedUsername = usernameInput.value;
    var updatedPassword = passwordInput.value;
    var updatedEmail = emailInput.value;

    // Get the accounts from local storage
    var accounts = JSON.parse(localStorage.getItem("accounts"));

    // Find the current user's account in the accounts array
    var currentUserAccount = accounts.find(function(account) {
        return account.username === currentUser.username;
    });

    // Update the current user's account details
    currentUserAccount.username = updatedUsername;
    currentUserAccount.password = updatedPassword;
    currentUserAccount.email = updatedEmail;

    // Update local storage with the updated accounts array
    localStorage.setItem("accounts", JSON.stringify(accounts));

    // Update the current user's information in local storage
    currentUser.username = updatedUsername;
    currentUser.password = updatedPassword;
    currentUser.email = updatedEmail;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

});

// Get the logout button
var logoutButton = document.getElementById("logout");

// Add event listener to the logout button click
logoutButton.addEventListener("click", function(event) {
    event.preventDefault();

    // Remove the currentUser entry from local storage
    localStorage.removeItem("currentUser");

    // Redirect to the index.html page
    window.location.href = "./index.html";
});