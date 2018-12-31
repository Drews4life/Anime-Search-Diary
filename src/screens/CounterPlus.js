import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
        counter: 0
    };
  }

  render() {
    return (
      <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
      }}>
            <TouchableOpacity onPress={() => this.setState(
                prevState => ({...prevState, counter: prevState.counter + 1})
            )}>
                <Text> Plus: {this.state.counter} </Text>
            </TouchableOpacity>
      </View>
    );
  }
}
