import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import RootTabs from '../../RootTabs';

class AppContainer extends Component {
    constructor(props) {
        super(props);
    }

    addRecipe() {
        this.props.addRecipe();
    }

    render() {
        return <View>
            <Text style={{marginTop: 20}}>
                I am app container! Recipe count: {this.props.recipeCount}
            </Text>
            <Button title="click me" onPress={() => {this.addRecipe()}} />
        </View>;
        // return <RootTabs />;
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect((state) => {
    return {
        recipeCount: state.recipeCount
    };
}, mapDispatchToProps)(AppContainer);