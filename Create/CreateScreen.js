import React from 'react';
import { View, Text, TextInput } from 'react-native';
import StatusBarBackground from '../StatusBarBackground';
import Choices from './Choices';

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
      <View>
        <StatusBarBackground />
        <TextInput style={{fontSize: 20}} placeholder="What do you want to ask?" textAlign="center" onChangeText={this.handleChangeText} />
        {this.state.question.length > 0 ? <Choices question={this.state.question} /> : null}
      </View>);
  }
}

export default CreateScreen;