const API_BASE_URL = 'http://localhost:3000/api';
import { auth } from '../firebase';

const getAuthToken = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
        throw new Error('No user is signed in');
    }
    return await currentUser.getIdToken();
};

async function apiRequest(endpoint, options = {}) {
    const token = await getAuthToken();
    console.log('Auth Token:', token);

    const defaultHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    const config = {
        headers: { ...defaultHeaders, ...options.headers },
        ...options
    };

    if (config.body && typeof config.body === 'object') {
        config.body = JSON.stringify(config.body);
    }

    console.log('Request Config:', {
        url: `${API_BASE_URL}${endpoint}`,
        ...config,
    });

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
        console.error('Response Headers:', Object.fromEntries(response.headers.entries()));
        console.error('Response Status:', response.status);
        const errorText = await response.text();
        console.error('Response Body:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    return await response.json();
}

export async function get(endpoint) {
    return apiRequest(endpoint, { method: 'GET' });
}

export async function post(endpoint, data) {
    return apiRequest(endpoint, {
        method: 'POST',
        body: data
    });
}

// Example usage for saveSurvey
export async function saveSurvey(surveyData) {
    try {
        return await post('/survey', surveyData);
    } catch (error) {
        console.error('Error saving survey:', error);
        throw error;
    }
}

// Example of other API calls you might add:
// export async function getSurveys() {
//     try {
//         return await get('/surveys');
//     } catch (error) {
//         console.error('Error fetching surveys:', error);
//         throw error;
//     }
// }

// export async function updateSurvey(surveyId, surveyData) {
//     try {
//         return await post(`/survey/${surveyId}`, surveyData);
//     } catch (error) {
//         console.error('Error updating survey:', error);
//         throw error;
//     }
// } 