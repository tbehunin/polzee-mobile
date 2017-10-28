import React from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

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
        this.canAddChoice = this.canAddChoice.bind(this);
        this.handleDeleteChoice = this.handleDeleteChoice.bind(this);
        this.handleContinue = this.handleContinue.bind(this);
        this.toggleFavorite = this.toggleFavorite.bind(this);
    }
  
    handleNewChoiceChange(text) {
        this.setState({newChoice: text});
    }

    handleNewChoice() {
        if (this.canAddChoice()) {
            this.setState({
                choices: this.state.choices.concat([{id: Date().valueOf(), text: this.state.newChoice.trim(), favorite: false}]),
                newChoice: ''
            });
        }
    }

    getPlaceholderText() {
        return 'Choice ' + (this.state.choices.length + 1);
    }

    canAddChoice() {
        const choiceText = this.state.newChoice.trim();
        return choiceText !== '' && !this.state.choices.some((item) => item.text.toLowerCase() === choiceText.toLowerCase());
    }

    handleDeleteChoice(event, choice) {
        let arr = this.state.choices.slice();
        arr.splice(arr.findIndex((item) => item.id === choice.id), 1);
        this.setState({choices: arr});
    }

    handleContinue() {
        this.handleNewChoice(); // just in case they press continue before adding
        this.setState({choices: []});
    }

    toggleFavorite(event, choice) {
        let arr = this.state.choices.slice();
        const idx = arr.findIndex((item) => item.id === choice.id);
        arr[idx].favorite = !arr[idx].favorite;
        this.setState({choices: arr});
    }

    render() {
        return (
            <View>
                {this.state.choices.length > 0 ?
                    <View>
                        <FlatList data={this.state.choices} keyExtractor={item => item.id} renderItem={({item}) =>
                            <View style={{flexDirection: 'row'}}>
                                <View style={{flex: 1, alignItems: 'center'}}>
                                    {item.favorite ?
                                        <Icon.Button name="star" backgroundColor="transparent" size={30} onPress={(event) => this.toggleFavorite(event, item)} color="orange" /> :
                                        <Icon.Button name="star-o" backgroundColor="transparent" size={30} onPress={(event) => this.toggleFavorite(event, item)} color="orange" />
                                    }
                                </View>
                                <View style={{flex: 2, justifyContent: 'center'}}>
                                    <Text style={{fontSize: 20}}>{item.text}</Text>
                                </View>
                                <View style={{flex: 1, alignItems: 'center'}}>
                                    <Icon.Button name="trash" backgroundColor="transparent" size={30} onPress={(event) => this.handleDeleteChoice(event, item)} color="tomato" />
                                </View>
                            </View>
                        }/>
                    </View> : null
                }
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 2, padding: 10}}>
                        <TextInput style={{fontSize: 20}}
                            textAlign="center"
                            placeholder={this.getPlaceholderText()}
                            value={this.state.newChoice}
                            onChangeText={this.handleNewChoiceChange} />
                    </View>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        {this.canAddChoice() ?
                            <Icon.Button name="floppy-o" backgroundColor="transparent" size={30} onPress={this.handleNewChoice} color="steelblue" /> : null}
                    </View>
                </View>
                <View>
                    {this.state.choices.length >= 2 ?
                        <Button title="Continue" onPress={this.handleContinue} />
                         : null}
                </View>
            </View>
        );
    }
}

export default Choices;