import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dimensions, StyleSheet, View, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Video } from 'expo';
import vidSrc from '../static/vid.mp4';
import { updateQuestion, updateOption } from '../actions/create/actions';

class VideoTest extends Component {
    static propTypes = {
        question: PropTypes.string,
        options: PropTypes.arrayOf(PropTypes.shape({
            optionId: PropTypes.number,
            optionText: PropTypes.string,
        })),
        updateQuestion: PropTypes.func,
        updateOption: PropTypes.func,
    }
    static defaultProps = {
        question: '',
        options: [],
        updateQuestion: () => {},
        updateOption: () => {},
    }
    state = {
        window: Dimensions.get('window'),
    };

    componentWillMount() {
        Dimensions.addEventListener('change', this.handler);
    }

    componentWillUnmount() {
        // Important to stop updating state after unmount
        Dimensions.removeEventListener('change', this.handler);
    }

    inputs = [];

    handler = ({ window }) => this.setState({ window });

    render() {
        const { width, height } = this.state.window;
        const mode = height > width ? 'portrait' : 'landscape';
        console.log(`New dimensions ${width}x${height} (${mode})`);
        return (
            <View style={{ flex: 1 }}>
                <Video
                    source={vidSrc}
                    shouldPlay
                    isLooping
                    resizeMode="cover"
                    style={[StyleSheet.absoluteFill, { width, height }]}
                />
                <KeyboardAvoidingView behavior="padding" style={{ flex: 1, paddingTop: 20 }}>
                    <ScrollView keyboardDismissMode="on-drag">
                        <TextInput
                            value={this.props.question}
                            placeholder="What would you like to ask?"
                            style={{ color: 'white', flex: 1, textAlign: 'center', fontSize: 30 }}
                            multiline
                            blurOnSubmit
                            returnKeyType="next"
                            placeholderTextColor="rgba(255, 255, 255, 0.5)"
                            onChangeText={text => this.props.updateQuestion(text)}
                            onSubmitEditing={() => this.inputs[0].focus()}
                        />
                        {this.props.options.map((option, index) => (
                            <TextInput
                                key={option.optionId}
                                placeholder={`Option ${index + 1}`}
                                style={{ color: 'white', flex: 1, textAlign: 'center', fontSize: 30 }}
                                returnKeyType="next"
                                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                                ref={(input) => { this.inputs[index] = input; }}
                                onChangeText={text => this.props.updateOption(text, index)}
                                onSubmitEditing={() => this.inputs[index + 1].focus()}
                                blurOnSubmit={false}
                                value={option.optionText}
                            />
                        ))}
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    question: state.create.question,
    options: state.create.options,
});
const mapDispatchToProps = dispatch => ({
    updateQuestion: question => dispatch(updateQuestion(question)),
    updateOption: (optionText, index) => dispatch(updateOption(optionText, index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoTest);
