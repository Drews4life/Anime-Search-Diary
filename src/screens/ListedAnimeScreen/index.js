import React, { Component } from 'react'
import { 
  Text, 
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native'

import { connect } from 'react-redux'
import Filter from '../../components/Filter'
import RadioGroup from 'react-native-radio-buttons-group';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconIonicons from 'react-native-vector-icons/Ionicons'
import { Navigation } from 'react-native-navigation'

import styles from './styles'
import { 
  addEpisodeSeen, 
  substractEpisodesSeen,
  finishedEpisode,
  unfinishedEpisode 
} from '../../actions';

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

  navigate = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'CreateFavorite',
        options: {
          topBar: {
            title: {
              text: 'Create new'
            }
          }
        }
      },
    })
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
          <TouchableOpacity style={styles.newButton} onPress={this.navigate}>
            <Text style={styles.whiteTxt}>ADD NEW</Text>
          </TouchableOpacity>
        </View>

        <FlatList 
          data={this.dynamicData()}
          extraData={this.props}
          style={styles.listContainer}
          contentContainerStyle={styles.innerListContainer}
          keyExtractor={item => `${item.id}`}
          renderItem={({item}) => {
            //console.log('item FL: ', item)
            return (
              <View style={styles.card}>
                <View style={styles.headerWrapper}>
                  <Text style={[styles.headerText, {textAlign: 'center'}]}>{item.title}</Text>
                </View>
                
                <View style={styles.episodesField}>
                  <Text style={styles.midText}>Type: {item.type}</Text>
                  <Text style={styles.midText}>
                    {item.type === 'Manga' ? `Pages read: ${item.pagesRead}/${item.pages || '?'}` : `Episodes Seen: ${item.episodesSeen}${`/${item.episodes || '?' }`}`}
                  </Text>

                  <TouchableOpacity onPress={() => this.props.addSeen(item.id, item.type)}>
                    <IconEntypo 
                      name="squared-plus"
                      size={25}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.props.removeSeen(item.id, item.type)}>
                  <IconEntypo 
                      name="squared-minus"
                      size={25}
                      style={{marginLeft: 10}}
                    />
                  </TouchableOpacity>
                </View>

                <View style={{alignSelf: 'center', flexDirection: 'row', marginTop: 10}}>
                  <Text style={styles.midText}>is Finished ?</Text>
                  {
                    item.finished ? (
                      <TouchableOpacity onPress={() => this.props.unfinish(item.id)}>
                        <IconIonicons 
                          name="ios-radio-button-on"
                          size={20}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity onPress={() => this.props.finish(item.id)}>
                        <IconIonicons 
                          name="ios-radio-button-off"
                          size={20}
                        />
                      </TouchableOpacity>
                    )
                  }
                </View>

                {
                  item.url !== null && item.url !== undefined ? (
                    <View style={{alignSelf: 'center'}}>
                      <TouchableOpacity onPress={() => {}}>
                        <Text style={[styles.midText, {color: 'blue', marginTop: 15}]}>Link</Text>
                      </TouchableOpacity>
                    </View>
                  ) : null
                }
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

const mapDispatchToProps = dispatch => ({
  addSeen: (id, type) => dispatch(addEpisodeSeen(id, type)),
  removeSeen: (id, type) => dispatch(substractEpisodesSeen(id, type)),
  finish: (id) => dispatch(finishedEpisode(id)),
  unfinish: (id) => dispatch(unfinishedEpisode(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(ListedAnime)