import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { inject, observer } from 'mobx-react/native';

@inject('Counter') @observer
export default class Minus extends Component {
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
            <TouchableOpacity onPress={() => this.props.onMinus}>
                <Text> Minus: {this.props.count} </Text>
            </TouchableOpacity>
      </View>
    );
  }
}
