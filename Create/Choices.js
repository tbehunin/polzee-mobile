import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

class Choices extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            choices: [],
            newChoice: ''
        };
        this.handleNewChoiceChange = this.handleNewChoiceChange.bind(this);
        this.handleNewChoice = this.handleNewChoice.bind(this);
    }
  
    handleNewChoiceChange(text) {
        this.setState({newChoice: text});
    }

    handleNewChoice() {
        const nc = this.state.newChoice;
        if (!this.state.choices.some((item) => item.text.toLowerCase() === nc.toLowerCase())) {
            
            this.setState({
                choices: this.state.choices.concat([{id: this.state.choices.length, text: nc}]),
                newChoice: ''
            });
        }
    }

    render() {
    return (
        this.props.question.length > 0 ?
            <View>
                {this.state.choices.map((item) => <Text key={item.id}>{item.text}</Text>)}
                <TextInput placeholder="Another Choice" onChangeText={this.handleNewChoiceChange} value={this.state.newChoice} />
                {this.state.newChoice.length > 0 ? <Button title="Another Choice" onPress={this.handleNewChoice} /> : null}
            </View> : null);
    }
}

export default Choices;