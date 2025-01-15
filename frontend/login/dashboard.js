// Inside dashboard.js (or your dashboard-related JS file)

// Check if the user is logged in
function checkAuth() {
    const token = localStorage.getItem("authToken");
    if (!token) {
        // Redirect to login page if not authenticated
        window.location.href = "./login/login.html";
    }
}

// Call checkAuth on page load to ensure the user is authenticated
window.onload = checkAuth;

// Function to fetch data from a protected route
async function fetchProtectedData() {
    const token = localStorage.getItem("authToken");

    if (!token) {
        // Token is not found, you may want to handle this by redirecting to login
        console.error("No auth token found.");
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/protected-route', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}` // Attach the token to the request header
            }
        });

        const data = await response.json();

        if (response.ok) {
            // Handle successful response
            console.log(data);
        } else {
            // Handle error response
            console.error("Error:", data.message);
        }
    } catch (error) {
        // Handle network or other errors
        console.error("Network Error:", error);
    }
}

// Call the function to fetch protected data
fetchProtectedData();

// Logout function to remove the token from localStorage
function logout() {
    localStorage.removeItem("authToken");
    window.location.href = "./login/login.html"; // Redirect to login page
}
