import React from 'react';
import PropTypes from 'prop-types';

const Header = props => (
    <header className="top">
        {/* weird styling made by wesbos */}
        <h1>Catch
            <span className="ofThe">
                <span className="of">of</span>
                <span className="the">the</span>
            </span> 
            day
        </h1>
        <h3 className="tagline">
            <span>{ props.tagline }</span>
        </h3>
    </header>
);

// checking if the type of props is the expected
// as Header is a stateless component, this has to go after the const
Header.propTypes = {
    tagline: PropTypes.string.isRequired
}

export default Header;