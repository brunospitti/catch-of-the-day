import React from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { formatPrice } from '../helpers';


class Order extends React.Component {

    static propTypes = {
        fishes: PropTypes.object,
        order: PropTypes.object,
        removeFromOrder: PropTypes.func
    }

    // function to clean the map inside of the return
    renderOrder = (key) => {
        // what fish
        const fish = this.props.fishes[key];
        // what quantity
        const count = this.props.order[key];
        const isAvailable = fish && fish.status === 'available';
        const transitionOption = {
            classNames: "order",
            key: key,
            timeout: {enter:500, exit:500}
        }

        //make sure the fish is loaded before printing the order on the page
        if (!fish) return null;

        if(!isAvailable){
            return (
                // instead of writting the properties of CSSTransition, this was set on the top as an object and spread here and the one below
                <CSSTransition {...transitionOption}>
                    <li key={key}>
                        Sorry {fish ? fish.name : 'fish'} is no longer available
                    </li>
                </CSSTransition>
            );
        }
        return (
            
            <CSSTransition {...transitionOption}>
                <li key={key}>
                    <span>
                        <TransitionGroup component="span" className="count">
                            <CSSTransition classNames="count" key={ count } timeout={ {enter:500, exit:500} }>
                                <span>{ count }</span>
                            </CSSTransition>
                        </TransitionGroup>
                        lbs {fish.name}
                        <span>{formatPrice(count * fish.price)}</span>
                        <button className="delete" onClick={ () => this.props.removeFromOrder(key) }>&times;</button>
                    </span>
                </li>
            </CSSTransition>
        );
    }

    render(){
        //creating some consts that will be needed to display the correct total and fishes
        //what fish is in the order [fish', fish3, etc]
        const orderIds = Object.keys(this.props.order);
        // function to sum up the total price of the order
        const total = orderIds.reduce((prevTotal, key) => {
            const fish = this.props.fishes[key];
            const count = this.props.order[key];
            // if it's available
            const isAvailable = fish && fish.status === 'available';
            if(isAvailable){
                return prevTotal + (count * fish.price);
            }
            return prevTotal;
            //starting amount is 0
        }, 0);

        return(
            <div className="order-wrap">
                <h2>Your Order</h2>
                {/* Animation - instead of an <ul> tag, we'll be using the TransitionGroup with a component="ul" */}
                <TransitionGroup component="ul" className="order">
                    { orderIds.map(this.renderOrder) }
                </TransitionGroup>
                <div className="total">
                    Total:
                    <strong>{ formatPrice(total) }</strong>
                </div>
                
            </div>
        )
    }
}

export default Order;