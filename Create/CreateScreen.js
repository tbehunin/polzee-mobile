import React from 'react';
import { View, Text, TextInput } from 'react-native';

class CreateScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: ''
    };

    this.handleChangeText = this.handleChangeText.bind(this);
  }

  handleChangeText(text) {
    this.setState({question: text});
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TextInput placeholder="What do you want to ask?" onChangeText={this.handleChangeText} />
        <Text>{this.state.question}</Text>
      </View>);
  }
}

export default CreateScreen;