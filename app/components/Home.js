import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const Home = ({ providerImage, onLogOut }) => (
    <View style={{ flexDirection: 'column' }}>
        <View style={{ alignItems: 'center', paddingBottom: 20 }}>
            <Image
                source={{ uri: providerImage }}
                style={{ width: 150, height: 150 }}
            />
        </View>
        <View style={{ alignItems: 'center' }}>
            <Text style={{ color: '#880E4F', fontWeight: 'bold', fontSize: 16, paddingBottom: 10 }}>
                Logged in successfully!
            </Text>
        </View>
        <TouchableOpacity onPress={onLogOut}>
            <View style={{ backgroundColor: '#880E4F', alignItems: 'center' }}>
                <Text style={{ fontSize: 26, color: 'white', paddingTop: 10, paddingBottom: 10 }}>
                    Log out
                </Text>
            </View>
        </TouchableOpacity>
    </View>
);

Home.propTypes = {
    providerImage: PropTypes.string.isRequired,
    onLogOut: PropTypes.func.isRequired,
};

export default Home;
