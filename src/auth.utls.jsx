import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
    // !!localStorage.getItem('authToken');
    return true;
};

export function AuthRoute({ children }) {
    return isAuthenticated() ? children : <Navigate to="/" />;
}
