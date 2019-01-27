import React from 'react';
import PropTypes from 'prop-types';

import firebase from 'firebase';
import base, { firebaseApp } from '../base';

import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';

class Inventory extends React.Component {
    static propTypes = {
        fishes: PropTypes.object,
        updateFish: PropTypes.func,
        deleteFish: PropTypes.func,
        addFish: PropTypes.func,
        loadSampleFishes: PropTypes.func
    };

    state = {
        uid: null,
        owner: null
    };

    // everytime we load the page, firebase will se if we're logged in and authenticated
    // if it's true, it will bring the user, do all the checks and log in if everything's right
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                this.authHandler({ user });
            }
        });
    };

    authHandler = async (authData) => {
        // 1. Look up the current store in the firebase database
        const store = await base.fetch(this.props.storeId, { context: this });
        
        // 2. Claim it if there's no owner
        if (!store.owner) {
            await base.post( `${ this.props.storeId }/owner`, {
                data: authData.user.uid
            })
        }

        // 3. Set the state of the inventory component to reflect the current user
        this.setState({
            uid: authData.user.uid,
            owner: store.owner || authData.user.uid
        })
    };

    authenticate = provider => {
        // normally it would be like new firebase.auth.FacebookAuthProvider()
        // but as it's a variable, this method below is used
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler)
    };

    logout = async () => {
        await firebase.auth().signOut();
        this.setState({ uid: null });
    };

    render(){

        const logout = <button onClick={ this.logout }>Log out!</button>;

        // 1. Check if they are logged in
        if (!this.state.uid) {
            return(
                <Login authenticate={ this.authenticate }/>
            )
        }

        // 2. Check if they are not the owner of the store
        if (this.state.uid !== this.state.owner){
            return (
                <div>
                    <p>Sorry you're not the owner! :(</p>
                    { logout }
                </div>
            )
        }

        // 3. They must be the owner, render inventory
        return(
            <div className="inventory">
                <h2>Inventory</h2>
                { logout }
                {Object.keys(this.props.fishes).map(
                    fish => <EditFishForm 
                                key={ fish }
                                index={ fish }
                                fish={ this.props.fishes[fish] }
                                updateFish={ this.props.updateFish }
                                deleteFish={ this.props.deleteFish }
                            />
                )}
                <AddFishForm addFish={ this.props.addFish } />
                <button
                    onClick={ this.props.loadSampleFishes }>
                    Load sample Fishes
                </button>
            </div>
        )
    }
}

export default Inventory;