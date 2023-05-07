import React from 'react';
import PropTypes from 'prop-types';
import { Route, Navigate } from 'react-router-dom';

class PrivateRoute extends Route {
    render() {
        const { component: Component, isAuthenticated, ...rest } = this.props;

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

        return <Route {...rest} render={renderComponent} />;
    }
}

PrivateRoute.propTypes = {
    component: PropTypes.elementType,
    isAuthenticated: PropTypes.bool,
    location: PropTypes.shape({
        pathname: PropTypes.string,
    }).isRequired,
};

export default PrivateRoute;
