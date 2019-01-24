import React, { Component } from 'react'
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    FlatList,
    ImageBackground,
} from 'react-native'
import ListItem from '../../components/ListItem'

import { connect } from 'react-redux'
import { fetchTopAnime, fetchFavorite, searchBy } from '../../actions';

import Filter from '../../components/Filter'
import { Dropdown } from 'react-native-material-dropdown';

import IconAntDesign from 'react-native-vector-icons/AntDesign'

import styles from './styles'
import { getIdForGenre } from '../../utils';

class Home extends React.Component {

    state = {
        filterValue: '',
        secondFilterVal: '',
        selectedQueryValue: '',
        queryTypes: [{
            value: 'Scheduled', //schedule/${day},
            label: 'Scheduled',
        }, {
            value: 'anime/genre',//Manga/${genre}/${page}
            label: 'Search Anime by genre',
        }, {
            value: 'manga/genre', //Anime/${genre}/${page}
            label: 'Search Manga by genre',
        }, {
            value: 'season',//season/2019/${season}
            label: 'Anime For Season',
        }],
        currentPage: 1
    }

    componentDidMount() {
        this.props.searchBy('schedule/monday', 'monday')
    }

    onChangeFilter = (type, val) => this.setState(
        prevState => ({ ...prevState, [type]: val })
    )

    onCancelClick = () => this.setState(
        prevState => ({ ...prevState, filterValue: '' })
    )

    onChangeDropDown = (type, val) => this.setState(
        prevState => ({ ...prevState, [type]: val, filterValue: '' })
    )

    restorePages = () => this.setState(
        prevState => ({ ...prevState, currentPage: 1 })
    )

    getPlaceholderValue = () => {
        switch (this.state.selectedQueryValue) {
            case 'season':
                return 'year';
            case 'manga/genre':
                return 'Search for  manga by genre';
            case 'anime/genre':
                return 'Search for  anime by genre';
            default:
                return 'Search for  Scheduled by day';
        }
    }

    onSearchSubmit = () => {
        if (this.state.filterValue.trim() !== '' && this.state.selectedQueryValue.trim() !== '') {
            const {
                filterValue,
                secondFilterVal,
                selectedQueryValue,
                currentPage
            } = this.state;

            let searchQuery = '';
            let type = ''

            if (selectedQueryValue === 'season') {
                searchQuery = `season/${filterValue}/${secondFilterVal}`
                type = 'anime'
            } else if (selectedQueryValue === 'manga/genre') {
                searchQuery = `genre/manga/${getIdForGenre(filterValue)}/${currentPage}`
                type = 'manga'
            } else if (selectedQueryValue === 'anime/genre') {
                searchQuery = `genre/anime/${getIdForGenre(filterValue)}/${currentPage}`
                type = 'anime'
            } else {
                searchQuery = `schedule/${filterValue || 'monday'}`
                type = filterValue.toLowerCase()
            }

            this.props.searchBy(searchQuery.toLowerCase(), type);

        }
    }

    render() {
        const isSeasonSelected = this.state.selectedQueryValue === 'season'
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                    <Filter
                        addViewStyles={isSeasonSelected ? styles.shortenFilter : {}}
                        inputStyles={isSeasonSelected ? styles.shortenInput : {}}
                        placeholder={this.getPlaceholderValue()}
                        keyboardType={isSeasonSelected ? 'number-pad' : 'default'}
                        value={this.state.filterValue}
                        showCancel={!isSeasonSelected}
                        onChangeText={val => this.onChangeFilter('filterValue', val)}
                        onCancel={this.onCancelClick}
                    />
                    {
                        this.state.selectedQueryValue === 'season' ? (
                            <Filter
                                addViewStyles={isSeasonSelected ? styles.shortenFilter : {}}
                                inputStyles={isSeasonSelected ? styles.shortenInput : {}}
                                showCancel={false}
                                placeholder={'season'}
                                value={this.state.secondFilterVal}
                                onChangeText={val => this.onChangeFilter('secondFilterVal', val)}
                            />
                        ) : null
                    }
                </View>

                <View style={styles.dropDownHolder}>
                    <Dropdown
                        containerStyle={styles.dropDownBig}
                        label='Filter'
                        value={this.state.selectedQueryValue}
                        onChangeText={val => this.onChangeDropDown('selectedQueryValue', val)}
                        data={this.state.queryTypes}
                    />
                    <TouchableOpacity onPress={this.onSearchSubmit} style={styles.buttonSearch}>
                        <Text style={styles.textSearch}>Search</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={this.props.searchData}
                    extraData={this.props}
                    refreshing={this.props.isLoading}
                    contentContainerStyle={styles.listView}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {

                    }}
                    keyExtractor={({ mal_id }) => `${mal_id}`}
                    renderItem={({ item, index }) => (<ListItem item={item} index={index} length={this.props.searchData.length}/>)}
                />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    searchData: state.searchData.filteredAnimes,
    isLoading: state.searchData.isLoading
})

const mapDispatchToProps = dispatch => ({
    fetchFavorite: () => dispatch(fetchFavorite()),
    searchBy: (query, type) => dispatch(searchBy(query, type))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)