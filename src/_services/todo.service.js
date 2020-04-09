import config from 'config';
import { authHeader } from '../_helpers';
import { userService } from './';

export const todoService = {
    create,
    getAll,
    delete: _delete
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/todos`, requestOptions).then(handleResponse);
}

function create(todo) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(todo)
    };

    return fetch(`${config.apiUrl}/todos`, requestOptions).then(handleResponse);
}

function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/todos/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                
                userService.logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}