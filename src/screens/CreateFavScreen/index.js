import React, { Component } from 'react'
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native'
import { Dropdown } from 'react-native-material-dropdown'

import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation'
import { saveToFavorite } from '../../actions'


import styles from './styles';



class CreateFav extends Component {

    state = {
        seriesTypes: [{
            value: 'Manga'
        }, {
            value: 'Anime'
        }, {
            value: 'Movie'
        }, {
            value: "Other"
        }],
        titleName: '',
        episodes: '',
        link: '',
        selectedType: '',
        errorType: false,
        errorTitle: false
    }

    onInputValChange = (input, val) => {
        this.setState(
            prevState => ({ ...prevState, [input]: val,  errorTitle: false, errorType: false })
        )
    }

    onEpisodesChange = val => {
        console.log('val : ', val)
        let isNum = true;

        if (val.trim() !== '') {
            isNum = Number.isInteger(parseInt(val))
        }

        console.log('isNum: ', isNum)
        this.setState(
            prevState => ({ ...prevState, episodes: isNum ? val : '',  errorTitle: false, errorType: false })
        )
    }

    onChangeDropDown = val => {
        this.setState(
            prevState => ({...prevState, selectedType: val, errorTitle: false, errorType: false})
        )
    }

    submitFavorite = () => {
        if(
            this.state.titleName.trim() !== '' &&
            this.state.selectedType.trim() !== ''
        ) {
            let favType = {}
            let url = this.state.link.trim() !== '' ? this.state.link : null

            if(this.state.selectedType === 'Manga') {
                favType = {pages: this.state.episodes}
            } else {
                favType = {episodes: this.state.episodes}
            }

            let newFavorite = {
                mal_id: (Math.random() * 10000000000).toFixed(),
                title: this.state.titleName,
                type: this.state.selectedType,
                url,
                ...favType,
            }

            this.props.saveToFavorite(newFavorite)
            Navigation.pop(this.props.componentId)
        } else {
            this.setState(
                prevState => ({
                    ...prevState,    
                    errorTitle: this.state.titleName.trim() === '',
                    errorType: this.state.selectedType.trim() === ''
                })
            )
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.container}>
                    <View>
                        <TextInput
                            maxLength={60}
                            autoCorrect={false}
                            value={this.state.titleName}
                            onChangeText={val => this.onInputValChange('titleName', val)}
                            style={[styles.inputsSame, this.state.errorTitle ? styles.errorTitle : {}]}
                            placeholder='Title name'
                            underlineColorAndroid="transparent"
                        />
                        <TextInput
                            maxLength={10}
                            autoCorrect={false}
                            value={this.state.episodes}
                            onChangeText={this.onEpisodesChange}
                            style={[styles.inputsSame]}
                            placeholder={this.state.selectedType === 'Manga' ? 'Pages' : 'Episodes'}
                            underlineColorAndroid="transparent"
                            keyboardType="number-pad"
                        />
                        <Dropdown
                            onChangeText={this.onChangeDropDown}
                            label={'Title type'}
                            containerStyle={[styles.dropDownBig, this.state.errorType ? styles.errorTitle : {}]}
                            data={this.state.seriesTypes}
                        />
                        <TextInput
                            maxLength={200}
                            autoCorrect={false}
                            autoCapitalize={'none'}
                            value={this.state.link}
                            onChangeText={val => this.onInputValChange('link', val)}
                            style={[styles.inputsSame]}
                            placeholder='Link (optional)'
                            underlineColorAndroid="transparent"
                        />
                        <TouchableOpacity style={styles.submitButton} onPress={this.submitFavorite}>
                            <Text style={styles.whiteTxt}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    saveToFavorite: item => dispatch(saveToFavorite(item))
})

export default connect(null, mapDispatchToProps)(CreateFav);
