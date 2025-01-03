import axios from 'axios';

// Endpoint URL
const api = 'http://127.0.0.1:8000/api/contact/';

export async function postData(data) {
    try {
        // Log context being sent
        console.log('Data being sent to the API:', data);

        // If CSRF token is needed, get it from a cookie or a hidden input field (assuming Django backend)
        const csrfToken = getCookie('csrftoken'); // Helper function to get the CSRF token from the cookie

        // Send POST request
        const response = await axios.post(api, data, {
            headers: {
                'Content-Type': 'application/json', // Ensure correct header
                'X-CSRFToken': csrfToken, // Include CSRF token in the request
            },
        });

        console.log('Response from API:', response.data); // Log success


        return response.data; // Return the response context

    } catch (error) {
        if (error.response) {
            // Server error
            console.error('Server responded with error status:', error.response.status);
            console.error('Error response context:', error.response.data); // Detailed error info
        } else if (error.request) {
            // No response from the server
            console.error('No response received from server.');
        } else {
            // General error (e.g., network issues)
            console.error('Error:', error.message);
        }
        throw error; // Rethrow the error to be handled by calling function
    }
}

// Helper function to retrieve CSRF token from cookies (for Django or similar frameworks)
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null; // Return null if no CSRF token is found
}
