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
import ListItem from '../../components/ListItem'

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

  

  render() {
     //AsyncStorage.removeItem('favorites')
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
                renderItem={({item, index}) => (<ListItem item={item}  index={index} length={this.props.anime.length} />)}
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