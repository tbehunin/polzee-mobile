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
    }
  
    handleNewChoiceChange(text) {
        this.setState({newChoice: text});
    }

    handleNewChoice() {
        const nc = this.state.newChoice;
        if (!this.isDupe(nc)) {
            this.setState({
                choices: this.state.choices.concat([{id: this.state.choices.length, text: nc}]),
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

    render() {
        return (
            // <View style={{flex: 1}}>
            //     <FlatList style={{backgroundColor: 'yellow'}} data={this.state.choices} keyExtractor={item => item.id} renderItem={({item}) =>
            //         <View>
            //             <TextInput value={item.text} />
            //             <Button title="Delete" />
            //         </View>
            //         } /> 
            //     <View style={{flex: 1, flexDirection: 'row'}}>
            //         <TextInput style={{backgroundColor: 'red'}} placeholder="Choice" onChangeText={this.handleNewChoiceChange} value={this.state.newChoice} /> */}
            //         <View style={{flex: 1, backgroundColor: 'green'}}><Text>foo</Text></View>
            //         <View style={{flex: 1, backgroundColor: 'blue'}}><Text>bar</Text></View> */}
            //         <Button style={{flex: 1, backgroundColor: 'orange'}} title="Add" onPress={this.handleNewChoice} /> 
            //     </View> 
                
            // </View> : null);
            this.props.question.length > 0 ?
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
                </View> : null); 
            // <View style={{backgroundColor: 'pink'}}>
        // <Text style={{backgroundColor: 'pink'}}>hello World</Text>);
            // </View>);
    }
}

export default Choices;