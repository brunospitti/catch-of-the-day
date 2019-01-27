import React from 'react';
import PropTypes from 'prop-types';

import base from '../base';
import sampleFishes from '../sample-fishes';

import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';


class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    };

    static propTypes = {
        match: PropTypes.object
    }

    // sync the state of fishes as soon as App mounts using the store name as the first param on the database
    componentDidMount() {
        const { params } = this.props.match;
        // first reinstate our localStorage so that it gets the data back to localStorage
        const localStorageRef = localStorage.getItem(params.storeId);
        // if there is a localStorage, set the state of order to the one on the localStorage
        // parsing the string of the object, to an object again
        if(localStorageRef){
            this.setState({ order: JSON.parse(localStorageRef)});
        };
        
        // reference to a piece of data in firebase's database
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
    }

    componentDidUpdate() {
        // adding item of name 'store name' and value of 'order' object
        // transforming the object into a string, as the localStorage doesn't accept object as value
        localStorage.setItem( this.props.match.params.storeId, JSON.stringify(this.state.order) );
    }

    // remove the link from state to that specific store when user leaves the page
    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    addFish = fish => {
        // 1. Take a copy of the existing state
        let fishesState = {...this.state.fishes};
        // 2. Add our new fish to copy of state
        fishesState[`fish${Date.now()}`] = fish;
        // 3. Set the new fishesState to state
        this.setState({ fishes: fishesState });
    };

    updateFish = (fish, updatedFish) => {
        // 1. Take a copy of the existing state
        let fishesState = {...this.state.fishes};
        // 2. Update that state
        fishesState[fish] = updatedFish;
        // 3. Set that to state
        this.setState({ fishes: fishesState });
    }

    deleteFish = fish => {
        // 1. Take a copy of the existing state
        let fishesState = {...this.state.fishes};
        // 2. Update that state
        // For firebase to be able to delete, I had to set the fish to null
        fishesState[fish] = null;
        // 3. Set that to state
        this.setState({ fishes: fishesState });
    }

    loadSampleFishes = () => {
        this.setState({ fishes: sampleFishes });
    }

    addToOrder = fish => {
        // 1. Take a copy of the existing state
        let orderState = {...this.state.order};
        // 2. Either add to order, or update the number in the order
        orderState[fish] = orderState[fish] + 1 || 1;
        // 3. Set the new orderState to state
        this.setState({ order: orderState });
    }

    removeFromOrder = fish => {
        // 1. Take a copy of the existing state
        let orderState = {...this.state.order};
        // 2. Remove that item from order
        // delete object property method from js
        delete orderState[fish];
        // 3. Set the new orderState to state
        this.setState({ order: orderState });
    }

    render(){
        return(
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh seafood market"/>
                    <ul className="fishes">
                        {/* gets each key of an object so I can map through it as an Array */}
                        {Object.keys(this.state.fishes).map(
                            fish => <Fish 
                                        key={ fish }
                                        index={ fish }
                                        details={ this.state.fishes[fish] }
                                        addToOrder={ this.addToOrder }
                                    />
                        )}
                    </ul>
                </div>
                <Order
                    fishes={ this.state.fishes }
                    order={ this.state.order }
                    removeFromOrder={ this.removeFromOrder }
                />
                <Inventory
                    updateFish={ this.updateFish }
                    fishes={ this.state.fishes }
                    addFish={ this.addFish }
                    deleteFish={ this.deleteFish }
                    loadSampleFishes={ this.loadSampleFishes }
                    storeId={ this.props.match.params.storeId }
                />
            </div>
        )
    }
}

export default App;