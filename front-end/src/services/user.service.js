import axios from 'axios';

export const userService = {
    login,
    logout,
    register,
};

function login(email, password) {

    return axios.post(`/api/users/login`, {user: {email, password}})
        .then(data => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(data.data));

            return data.data;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function register(user) {
    return axios.post(`/api/users`, { user }).then(data => {console.log(data)});
}