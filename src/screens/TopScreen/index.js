import React, { Component } from 'react'
import { 
  Text, 
  View,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  AsyncStorage,
  RefreshControl,
  Linking
} from 'react-native'

import { connect } from 'react-redux'
import { Dropdown } from 'react-native-material-dropdown'
import IconAntDesign from 'react-native-vector-icons/AntDesign'
import { fetchTopAnime, fetchFavorite, saveToFavorite, deleteFromFavorites, getAdditionalPage } from '../../actions';

import styles from './styles'

class ListedAnime extends Component {
  state = {
    selectedQueryValue: 'anime',
    queryTypes: [{
        value: 'Top 50 Anime'
    }, {
        value: 'Top 50 Manga\'s'
    }],
    currentPage: 1
  }   

  onChangeDropDown = (type, val) => {
    let query = ''
    if(val === 'Top 50 Anime') {
        query = 'anime'
    } else {
        query = 'manga'
    }

    this.setState(
        prevState => ({...prevState, [type]: query})
      )
  }

  componentDidMount() {
    this.props.fetchTopAnime(this.state.selectedQueryValue);
    this.props.fetchFavorite();
  }

  handleURlPress = url => {
    Linking.canOpenURL(url).then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log("Don't know how to open URI: " + this.props.url);
        }
      })
      .catch(e => console.log('e: ', e))
  }


  render() {
      console.log('is laoding: ', this.props.isLoading)
    return (
      <View>
        <View style={styles.dropDownHolder}>
          <Dropdown
            dropdownPosition={-3}
            containerStyle={styles.dropDownBig}
            label='Filter'
            onChangeText={val => this.onChangeDropDown('selectedQueryValue', val)}
            data={this.state.queryTypes}
          />
          <TouchableOpacity onPress={() => this.props.fetchTopAnime(this.state.selectedQueryValue)} style={styles.buttonSearch}>
            <Text style={styles.textSearch}>Search</Text>
          </TouchableOpacity>
        </View>
        <FlatList 
                data={this.props.anime}
                extraData={this.props}
                refreshing={this.props.isLoading}
                refreshControl={
                    <RefreshControl
                      refreshing={this.props.isLoading}
                    />
                  }
                contentContainerStyle={styles.listView}
                onEndReachedThreshold={0.5}
                onEndReached={() => {
                    this.setState(
                        prevState => ({...prevState, currentPage: prevState.currentPage + 1}),
                        () => this.props.fetchAdditionalPage(this.state.currentPage, this.state.selectedQueryValue || 'anime')
                    )
                }}
                keyExtractor={({mal_id}) => `${mal_id}`}
                renderItem={({item, index}) => {
                    //console.log('each item: ', item)
                    
                    return (
                        <View style={[styles.cardHolder, index === this.props.anime.length - 1 ? {marginBottom: 120} : {}]}>
                            <View style={styles.imageHolder}>
                                <ImageBackground
                                    style={styles.image}
                                    source={{ uri: item.image_url}}
                                />
                            </View>
                            <View style={styles.headerView}>
                                <Text style={styles.headerText}>{item.title}</Text>
                            </View>
                            <View style={styles.lowerDataset}>
                                <View style={styles.additionalDataHolder}>
                                    <Text style={styles.additionalDataText}>Ended: {item.end_date || 'Ongoing'}</Text>
                                    <Text style={styles.additionalDataText}>Score: {item.score}/10</Text>
                                    <Text style={styles.additionalDataText}>Type: {item.type}</Text>
                                    <Text style={styles.additionalDataText}>Rank: {item.rank}</Text>
                                    <Text style={styles.additionalDataText}>Episodes: {item.episodes || '?'}</Text>
                                </View>

                                <View style={styles.buttonsHolder}>
                                    <TouchableOpacity onPress={() => {
                                        if(this.props.favorites.hasOwnProperty(item.mal_id)) {
                                            this.props.deleteFromFavorite(item.mal_id)
                                        } else {
                                            this.props.addToFavorite(item)
                                        }
                                    }}>
                                        <IconAntDesign 
                                            name='heart' 
                                            size={25} 
                                            style={{marginLeft: 25}}
                                            color={this.props.favorites.hasOwnProperty(item.mal_id) ? 'red' : 'black'}
                                        /> 
                                    </TouchableOpacity>
                                    
                                    <TouchableOpacity onPress={() => this.handleURlPress(item.url)}>
                                        <IconAntDesign 
                                            name='sharealt' 
                                            size={25} 
                                            style={{marginLeft: 25}}
                                        />  
                                    </TouchableOpacity>   
                                </View>
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
  anime: state.animeData.animeTop,
  favorites: state.animeData.favorites,
  isLoading: state.animeData.isLoading
})

const mapDispatchToProps = dispatch => ({
  fetchTopAnime: page => dispatch(fetchTopAnime(page)),
  fetchFavorite: () => dispatch(fetchFavorite()),
  addToFavorite: item => dispatch(saveToFavorite(item)),
  deleteFromFavorite: id => dispatch(deleteFromFavorites(id)),
  fetchAdditionalPage: (page, param) => dispatch(getAdditionalPage(page, param))
})

export default connect (mapStateToProps, mapDispatchToProps)(ListedAnime)