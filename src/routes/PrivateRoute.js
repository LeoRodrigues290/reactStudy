import React from 'react';
import PropTypes from 'prop-types';
import { Route, Navigate } from 'react-router-dom';

function PrivateRoute({ component: Component, isAuthenticated, ...rest }) {
    const renderComponent = props => {
        return isAuthenticated ? <Component {...props} /> : (
            <Navigate
                to={{
                    pathname: '/authentication/simple/login',
                    state: { from: rest.location },
                }}
            />
        );
    };

    return <Route {...rest} element={renderComponent} />;
}

PrivateRoute.propTypes = {
    component: PropTypes.elementType,
    isAuthenticated: PropTypes.bool,
    location: PropTypes.shape({
        pathname: PropTypes.string,
    }).isRequired,
};

export default PrivateRoute;
