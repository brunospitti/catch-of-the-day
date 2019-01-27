import React from 'react';
import PropTypes from 'prop-types';

import { formatPrice } from '../helpers';

class Fish extends React.Component {
    static propTypes = {
        // as details is an object, I'd like to check all of the properties of the object, and not just if details is an object
        // that's why I opted for a PropTypes.shape
        details: PropTypes.shape({
            image: PropTypes.string,
            name: PropTypes.string,
            price: PropTypes.number,
            desc: PropTypes.string,
            status: PropTypes.string
        }),
        addToOrder: PropTypes.func,
        index: PropTypes.string
    }
    render(){
        // destructuring the props to only call the param I need, instead of 'this.props.details.whatever' every time
        const {image, name, price, desc, status} = this.props.details;
        // will return true or false
        const isAvailable = status === 'available';
        return(
            <li className="menu-fish">
                <img src={ image } alt={ name }/>
                <h3 className="fish-name">
                    { name }
                    <span className="price">{ formatPrice(price) }</span>
                </h3>
                <p>{ desc }</p>
                <button
                    // only disabled when NOT available
                    disabled={ !isAvailable }
                    // on click, call addToOrder passing the index as parameter
                    onClick={() => this.props.addToOrder(this.props.index)}>
                    {/* text depends on availability */}
                    {isAvailable ? 'Add to Order' : 'Sold out!'}
                </button>
            </li>
        )
    }
}

export default Fish;