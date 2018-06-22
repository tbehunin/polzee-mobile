import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import Home from '../components/Home';
import CognitoAuth, { providerImage } from './CognitoAuth';
import { logOut } from '../actions/cognito/actions';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
});

const AppContainer = ({ authState, onLogOut }) => (
    <View style={styles.container}>
        {authState === 'authenticated' ?
            <Home providerImage={providerImage} onLogOut={onLogOut} /> :
            <CognitoAuth />
        }
    </View>
);

AppContainer.propTypes = {
    authState: PropTypes.string.isRequired,
    onLogOut: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    authState: state.cognito.authState,
});
const mapDispatchToProps = dispatch => ({
    onLogOut: () => dispatch(logOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
