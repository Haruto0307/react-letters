import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import Nav from '../components/nav/Navbar';

/**
 * The app component serves as a root for the project and renders either children or the error state
 * @method App
 * @module letters/components
 */
const App = props => {
    return (
        <div className="app">
            <Nav />
            {props.error || props.children}
        </div>
    );
};

App.propTypes = {
    children: PropTypes.node
};

export default connect(state => {
    return {
        error: state.error
    };
})(App);
