export const isLoggedIn = () => {
    return !!localStorage.getItem('authToken');
};

export const getAuthToken = () => {
    return localStorage.getItem('authToken');
};

export const logout = () => {
    localStorage.removeItem('authToken');
};
