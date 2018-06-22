import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
    text: {
        marginBottom: 10,
        height: 50,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#E0E0E0',
        paddingLeft: 10,
    },
});

export default class LoginForm extends React.Component {
    static propTypes = {
        providerImage: PropTypes.string.isRequired,
        authState: PropTypes.string.isRequired,
        authError: PropTypes.shape({
            message: PropTypes.string,
        }),
        onLogin: PropTypes.func.isRequired,
        onCreateAccount: PropTypes.func.isRequired,
        onMfaVerification: PropTypes.func.isRequired,
    }
    static defaultProps = {
        authError: null,
    }
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            verificationCode: '',
            authState: 'login',
        };
        this.formConfig = {
            login: {
                formEvent: () => this.props.onLogin(this.state.username, this.state.password),
                formText: 'Login',
                toggleComponent: (
                    <View>
                        <Text style={{ fontSize: 16 }}>Don't have an account?</Text>
                        <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => this.setState({ authState: 'createAccount' })}>
                            <Text style={{ color: '#880E4F', fontSize: 16, paddingTop: 10 }}>
                                Sign up!
                            </Text>
                        </TouchableOpacity>
                    </View>
                ),
            },
            createAccount: {
                formEvent: () => this.props.onCreateAccount(this.state.username, this.state.password),
                formText: 'Create Account',
                toggleComponent: (
                    <View>
                        <Text style={{ fontSize: 16 }}>Already have an account?</Text>
                        <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => this.setState({ authState: 'login' })}>
                            <Text style={{ color: '#880E4F', fontSize: 16, paddingTop: 10 }}>
                                Log in!
                            </Text>
                        </TouchableOpacity>
                    </View>
                ),
            },
            mfa: {
                formEvent: () => this.props.onMfaVerification(this.state.verificationCode),
                formText: 'Verify Account',
                toggleComponent: null,
            },
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.authState !== this.state.authState) {
            this.setState({
                authState: nextProps.authState,
                username: '',
                password: '',
                verificationCode: '',
            });
        }
    }
    onUsernameChangeText = (text) => {
        this.setState({ username: text });
    };
    onPasswordChangeText = (text) => {
        this.setState({ password: text });
    };
    onVerificationCodeChangeText = (text) => {
        this.setState({ verificationCode: text });
    };
    render() {
        return (
            <View style={{ flexDirection: 'column' }}>
                <View style={{ alignItems: 'center', paddingBottom: 20 }}>
                    <Image
                        source={{ uri: this.props.providerImage }}
                        style={{ width: 150, height: 150 }}
                    />
                </View>
                {this.props.authError &&
                    <View style={{ alignItems: 'center', marginBottom: 10 }}>
                        <Text style={{ color: '#880E4F', fontWeight: 'bold', fontSize: 16 }}>
                            {this.props.authError.message}
                        </Text>
                    </View>
                }
                {this.props.authState === 'mfa' ?
                    <View>
                        <TextInput
                            style={styles.text}
                            placeholder="Verification Code"
                            onChangeText={this.onVerificationCodeChangeText}
                            textAlign="center"
                            keyboardType="numeric"
                            value={this.state.verificationCode}
                        />
                    </View> :
                    <View>
                        <TextInput
                            style={styles.text}
                            placeholder="Username"
                            onChangeText={this.onUsernameChangeText}
                            textAlign="center"
                            autoCapitalize="none"
                            value={this.state.username}
                        />
                        <TextInput
                            style={styles.text}
                            placeholder="Password"
                            onChangeText={this.onPasswordChangeText}
                            textAlign="center"
                            secureTextEntry
                            value={this.state.password}
                        />
                    </View>
                }
                <TouchableOpacity onPress={this.formConfig[this.state.authState].formEvent}>
                    <View style={{ backgroundColor: '#880E4F', alignItems: 'center' }}>
                        <Text style={{ fontSize: 26, color: 'white', paddingTop: 10, paddingBottom: 10 }}>
                            {this.formConfig[this.state.authState].formText}
                        </Text>
                    </View>
                </TouchableOpacity>
                <View style={{ alignItems: 'center', marginTop: 10 }}>
                    {this.formConfig[this.state.authState].toggleComponent}
                </View>
            </View>
        );
    }
}
