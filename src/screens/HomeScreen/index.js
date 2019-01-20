import React, { Component } from 'react'
import { 
    Text, 
    View, 
    ScrollView,
    TouchableOpacity,
    FlatList,
    ImageBackground
} from 'react-native'

import { connect } from 'react-redux'
import { fetchTopAnime, fetchFavorite } from '../../actions';

import Filter from '../../components/Filter'
import { Dropdown } from 'react-native-material-dropdown';

import IconAntDesign from 'react-native-vector-icons/AntDesign'

import styles from './styles'

class Home extends React.Component {

    state = {
        filterValue: '',
        selectedQueryValue: '',
        queryTypes: [{
            value: 'Profile'
        }, {
            value: 'Scheduled'
        }, {
            value: 'Search Anime by genre'
        }, {
            value: 'Search Manga by genre'
        }, {
            value: 'Anime For Season'
        }]
    }

    componentDidMount() {
    
    }

    onChangeFilter = val => this.setState(
        prevState => ({...prevState, filterValue: val})
    )

    onCancelClick = () => this.setState(
        prevState => ({...prevState, filterValue: ''})
    )

    onChangeDropDown = (type, val) => this.setState(
        prevState => ({...prevState, [type]: val})
    )

    componentDidMount() {
        
    }


    render() {
        
      return (
        <View style={styles.container}>
            <Filter
                placeholder={`Search for ${this.state.selectedQueryValue || 'Anime Top 50'}`}
                value={this.state.filterValue}
                onChangeText={this.onChangeFilter}
                onCancel={this.onCancelClick}
            />
            <View style={styles.dropDownHolder}>
                <Dropdown
                    containerStyle={styles.dropDownBig}
                    label='Filter'
                    value={this.state.selectedQueryValue}
                    onChangeText={val => this.onChangeDropDown('selectedQueryValue', val)}
                    data={this.state.queryTypes}
                />
                <TouchableOpacity onPress={() => {console.log('state: ', this.state)}} style={styles.buttonSearch}>
                    <Text style={styles.textSearch}>Search</Text>
                </TouchableOpacity>
            </View>
            <FlatList 
                data={this.props.anime}
                extraData={this.props}
                refreshing={this.props.isLoading}
                contentContainerStyle={styles.listView}
                onEndReachedThreshold={0.5}
                onEndReached={() => {

                }}
                keyExtractor={({mal_id}) => `${mal_id}`}
                renderItem={({item}) => {
                    //console.log('each item: ', item)
                    return (
                        <View style={styles.cardHolder}>
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
                                    <IconAntDesign name='heart' size={25} style={{marginLeft: 20}}/> 
                                    <IconAntDesign name='sharealt' size={25} style={{marginLeft: 20}}/>     
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
    isLoading: state.animeData.isLoading
})

const mapDispatchToProps = dispatch => ({
    fetchFavorite: () => dispatch(fetchFavorite())
})

export default connect (mapStateToProps, mapDispatchToProps)(Home)