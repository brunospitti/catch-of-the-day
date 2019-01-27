import React from 'react';
import PropTypes from 'prop-types';

class EditFishForm extends React.Component {

    static propTypes = {
        fish: PropTypes.shape({
            image: PropTypes.string,
            name: PropTypes.string,
            price: PropTypes.number,
            desc: PropTypes.string,
            status: PropTypes.string,
        }),
        updateFish: PropTypes.func,
        index: PropTypes.string,
        deleteFish: PropTypes.func
    };

    handleChange = e => {
        // update that fish
        if(e.currentTarget.name === 'price'){
            // 1. Take a copy of the current fish
            const updatedFish = {
                ...this.props.fish,

                //computed property name
                [e.currentTarget.name]: parseInt( e.currentTarget.value, 0 )
            };
            this.props.updateFish(this.props.index, updatedFish);
        } else {
            // 1. Take a copy of the current fish
            const updatedFish = {
                ...this.props.fish,

                //computed property name
                [e.currentTarget.name]: e.currentTarget.value
            };
            this.props.updateFish(this.props.index, updatedFish);
        }
    }

    render(){
        // destructuring the props to only call the param I need, instead of 'this.props.fish.whatever' every time
        const {image, name, price, desc, status} = this.props.fish;

        return(
            <div className="fish-edit">
                <input
                    type="text"
                    name="name"
                    onChange={ this.handleChange }
                    value={ name }
                />
                <input
                    type="text"
                    name="price"
                    onChange={ this.handleChange }
                    value={ price }
                />
                <select
                    name="status"
                    onChange={ this.handleChange }
                    value={ status }>
                    <option value="available">Fresh</option>
                    <option value="unavailable">Sold out!</option>
                </select>
                <textarea
                    name="desc"
                    onChange={ this.handleChange }
                    value={ desc }>
                </textarea>
                <input
                    type="text"
                    name="image"
                    onChange={ this.handleChange }
                    value={ image }
                />
                <button onClick={ () => this.props.deleteFish(this.props.index) }>Remove fish</button>
            </div>
        )
    }
}

export default EditFishForm;