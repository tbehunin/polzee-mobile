import React from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';

class Choices extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            choices: [],
            newChoice: ''
        };
        this.handleNewChoiceChange = this.handleNewChoiceChange.bind(this);
        this.handleNewChoice = this.handleNewChoice.bind(this);
        this.getPlaceholderText = this.getPlaceholderText.bind(this);
        this.isDupe = this.isDupe.bind(this);
        this.handleDeleteChoice = this.handleDeleteChoice.bind(this);
    }
  
    handleNewChoiceChange(text) {
        this.setState({newChoice: text});
    }

    handleNewChoice() {
        const nc = this.state.newChoice;
        if (!this.isDupe(nc)) {
            this.setState({
                choices: this.state.choices.concat([{id: Date().valueOf(), text: nc}]),
                newChoice: ''
            });
        }
    }

    getPlaceholderText() {
        return 'Choice ' + (this.state.choices.length + 1);
    }

    isDupe(text) {
        return this.state.choices.some((item) => item.text.toLowerCase() === text.toLowerCase());
    }

    handleDeleteChoice(event, choice) {
        let arr = this.state.choices.slice();
        arr.splice(arr.findIndex((item) => item.id === choice.id), 1);
        this.setState({choices: arr});
    }

    render() {
        return (
            <View>
                {this.state.choices.length > 0 ?
                    <View>
                        <FlatList data={this.state.choices} keyExtractor={item => item.id} renderItem={({item}) =>
                            <View style={{flexDirection: 'row'}}>
                                <View style={{flex: 1}}>
                                    <Button title="Favorite" onPress={this.handleDeleteChoice} />
                                </View>
                                <View style={{flex: 2, justifyContent: 'center'}}>
                                    <Text style={{fontSize: 20}}>{item.text}</Text>
                                </View>
                                <View style={{flex: 1}}>
                                    <Button title="Delete" onPress={(event) => this.handleDeleteChoice(event, item)} />
                                </View>
                            </View>
                        }/>
                    </View> : null
                }
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 2}}>
                        <TextInput style={{fontSize: 20}}
                            textAlign="center"
                            placeholder={this.getPlaceholderText()}
                            value={this.state.newChoice}
                            onChangeText={this.handleNewChoiceChange} />
                    </View>
                    <View style={{flex: 1}}>
                        {this.state.newChoice.length > 0 && !this.isDupe(this.state.newChoice) ? <Button title="Add" onPress={this.handleNewChoice} /> : null}
                    </View>
                </View>
            </View>
        );
    }
}

export default Choices;