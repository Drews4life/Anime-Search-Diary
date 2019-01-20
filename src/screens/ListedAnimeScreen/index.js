import React, { Component } from 'react'
import { 
  Text, 
  View,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  CheckBox
} from 'react-native'

import { connect } from 'react-redux'
import Filter from '../../components/Filter'
import RadioGroup from 'react-native-radio-buttons-group';
import IconEntypo from 'react-native-vector-icons/Entypo';

import styles from './styles'

class ListedAnime extends Component {
  
  state = { 
    filter: '',
    chosenRadio: 'All',
    radioValues: [{
      label: 'All'
    }, {
      label: 'Finished'
    }, {
      label: 'Not Finished'
    }],
    valueForOne: [{
      label: 'Finished'
    }] 
  }

  onFilterChange = val => this.setState(
    prevState => ({...prevState, filter: val})
  )
  
  onRadioButtonPress = val =>  {
    let selected = 'All';
    if(val[1].selected) {
      selected = 'Finished'
    }
    if(val[2].selected) {
      selected = 'Not Finished'
    }

    this.setState(
      prevState => ({...prevState, chosenRadio: selected}),
    )
  }

  getValueFiltered = () => {
    switch (this.state.chosenRadio) {
      case 'Finished':
        return this.props.favorites.filter(item => item.finished)
      case 'Not Finished':
        return this.props.favorites.filter(item => !item.finished)
      default:
        return this.props.favorites;
    }
  }

  dynamicData = () => {
    const data = this.getValueFiltered();

    if(this.state.filter.trim() !== "") {
      return data.filter(item => {
        if(item.title.toLowerCase().includes(this.state.filter.toLowerCase())) {
          return item
        }
      })
    }

    return data;
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Filter 
            placeholder="Search"
            value={this.state.filter}
            onChangeText={this.onFilterChange}
            onCancel={() => this.onFilterChange('')}
          />
          <View>
            <RadioGroup
              flexDirection='row'
              radioButtons={this.state.radioValues}
              onPress={this.onRadioButtonPress}
            />
          </View>
        </View>

        <FlatList 
          data={this.dynamicData()}
          extraData={this.props}
          style={styles.listContainer}
          contentContainerStyle={styles.innerListContainer}
          keyExtractor={item => `${item.id}`}
          renderItem={({item}) => {
            console.log('item FL: ', item)
            return (
              <View style={styles.card}>
                <View style={styles.headerWrapper}>
                  <Text style={styles.headerText}>{item.title}</Text>
                </View>
                
                <View style={styles.episodesField}>
                  <Text style={styles.midText}>
                    Episodes Seen: {item.episodesSeen}{`/${item.episodes || '?' }`}
                  </Text>

                  <TouchableOpacity onPress={() => {}}>
                    <IconEntypo 
                      name="squared-plus"
                      size={25}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity>
                  <IconEntypo 
                      name="squared-minus"
                      size={25}
                      style={{marginLeft: 10}}
                    />
                  </TouchableOpacity>
                </View>

                <View>
                  <RadioGroup 
                    flexDirection='row'
                    radioButtons={this.state.valueForOne}
                    onPress={() => {}}
                  />
                </View>
              </View>
            )
          }}
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  favorites: Object.values(state.animeData.favorites)
})

export default connect(mapStateToProps)(ListedAnime)