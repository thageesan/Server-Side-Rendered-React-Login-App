import { authHeader } from './auth.service';

export const userService = {
    login,
    logout,
    getUserDetails
};

const config = {
    apiUrl: 'http://localhost:8000/api'
}

async function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    };

    try {
        const res = await fetch(`${config.apiUrl}/auth`, requestOptions);
        const user = await handleResponse(res);
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    } catch (e) {
        throw e;
    }
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getUserDetails() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/details`, requestOptions).then(handleResponse);
}

async function handleResponse(response) {
    if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        return location.reload(true);
    }

    if (!response.ok) throw (data && data.message) || response.statusText;

    try {
        const text = await response.text();
        return text && JSON.parse(text);
    } catch (e) {
        throw e;
    }
}