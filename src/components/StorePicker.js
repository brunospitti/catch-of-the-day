import React from 'react';
import PropTypes from 'prop-types';

import { getFunName } from '../helpers';

class StorePicker extends React.Component {

    static propTypes = {
        history: PropTypes.object
    }

    myInput = React.createRef();

    goToStore = e => {
        // 1. Stop the form from submitting
        e.preventDefault();
        // 2. Get the text from that input
        const storeName = (this.myInput.value.value);
        // 3. Change the page to '/store/input-value'
        this.props.history.push(`/store/${storeName}`);
    }

    render(){
        return (
            // React.Fragment is used to wrap multiple sibling tags but it's not rendered on the page, so it keeps a clean HTML structure
            <React.Fragment>
                {/* comment in jsx */}
                {/* <p>Sibling tag using React.Fragment</p> */}
                <form className="store-selector" onSubmit={this.goToStore}>
                    <h2>Please enter a store</h2>
                    <input 
                        type="text"
                        required
                        placeholder="Store name"
                        defaultValue={getFunName()}
                        ref={this.myInput}
                    />
                    <button type="submit">Visit store</button>
                </form>
            </React.Fragment>
        )
    }
}

export default StorePicker;