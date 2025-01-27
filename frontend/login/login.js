// Toggle password visibility
function togglePasswordVisibility() {
    const passwordInput = document.getElementById("password");
    const eyeIcon = document.getElementById("eyeIcon");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeIcon.classList.remove("fa-eye");
        eyeIcon.classList.add("fa-eye-slash");
    } else {
        passwordInput.type = "password";
        eyeIcon.classList.remove("fa-eye-slash");
        eyeIcon.classList.add("fa-eye");
    }
}

// Handle form submission and API call
document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent form submission
    
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    // API endpoint (replace this with your actual API endpoint)
    const apiEndpoint = "https://snapsafevj.onrender.com/login";
    
    // Prepare request payload
    const requestPayload = {
        email: username,
        password: password
    };

    try {
        const response = await fetch(apiEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestPayload)
        });

        const data = await response.json();
        
        // If the response is successful (e.g., status code 200)
        if (response.ok) {
            // Store token in localStorage
            localStorage.setItem("authToken", data.token); // Assuming the response contains the token as 'data.token'
            
            // Redirect to a protected page (replace with your URL)
            window.location.href = "nav.html";
;
        } else {
            // Display error message from API (if any)
            showError(data.message || "An error occurred, please try again.");
        }
    } catch (error) {
        // Handle errors (e.g., network failure)
        showError("An error occurred while communicating with the server.");
    }
});

// Function to display error messages
function showError(message) {
    const errorMessageElement = document.getElementById("errorMessage");
    errorMessageElement.textContent = message;
}
