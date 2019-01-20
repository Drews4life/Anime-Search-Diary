import React, { Component } from 'react'
import { 
    Text, 
    View,
    StyleSheet,
    TextInput,
    Dimensions,
    TouchableOpacity 
} from 'react-native'

import IconEvilIcons from 'react-native-vector-icons/EvilIcons';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';

const {height, width} = Dimensions.get('window')

export default props => (
    <View style={styles.container}>
        <IconEvilIcons 
            name="search" 
            size={20}
            style={styles.icon}
        />
        <TextInput 
            style={[styles.input, props.inputStyles]}
            value={props.value}
            onChangeText={props.onChangeText}
            placeholder={props.placeholder || 'Search'}
            underlineColorAndroid="transparent"
        />
        <TouchableOpacity onPress={props.onCancel}>
            <IconMaterialIcons 
                name={'cancel'} 
                size={20}
                style={styles.icon}
            />
        </TouchableOpacity>
    </View>
)

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        flexDirection: 'row',
        width: width * .85,
        height: height * .045,
        borderRadius: 15,
        backgroundColor: '#c9cacc',
        justifyContent: 'center',
    },
    input: {
        width: width * .60,
        alignSelf: 'center',
        marginHorizontal: 10,
    },
    icon: {
        marginTop: 6
    }
})