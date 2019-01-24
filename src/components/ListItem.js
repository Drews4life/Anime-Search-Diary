import React, { PureComponent } from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Linking,
    Dimensions,
    ImageBackground,
    TouchableOpacity,
    Animated
} from 'react-native'
import IconAntDesign from 'react-native-vector-icons/AntDesign'
import { connect } from 'react-redux'
import { saveToFavorite, deleteFromFavorites } from '../actions'

const { height, width } = Dimensions.get('window')

class ListItem extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {}

        this._animated = new Animated.Value(0)
    }

    componentDidMount() {
        Animated.timing(this._animated, {
            toValue: 1,
            duration: 800,
        }).start();
    }

    handleURlPress = url => {
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
              Linking.openURL(url);
            } else {
              console.log("Don't know how to open URI: " + url);
            }
          })
          .catch(e => console.log('e: ', e))
      }
    
    render() {
        const { item, index , length} = this.props;
        
        const rowStyles = [
            { opacity: this._animated },
            {
              transform: [
                { scale: this._animated },
                {
                  rotate: this._animated.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['35deg', '0deg'],
                    extrapolate: 'clamp',
                  })
                }
              ],
            },
          ];

        return (
        <Animated.View style={rowStyles}>
            <View style={[styles.cardHolder, index === length - 1 ? { marginBottom: 120 } : {}]}>
                <View style={styles.imageHolder}>
                    <ImageBackground
                        style={styles.image}
                        source={{ uri: item.image_url }}
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
                        <Text style={styles.additionalDataText}>{item.type === 'Manga' ? `` : `Episodes: ${item.episodes || '?'}`}</Text>
                    </View>

                    <View style={styles.buttonsHolder}>
                        <TouchableOpacity onPress={() => {
                            if (this.props.favorites.hasOwnProperty(item.mal_id)) {
                                this.props.deleteFromFavorite(item.mal_id)
                            } else {
                                this.props.addToFavorite(item)
                            }
                        }}>
                            <IconAntDesign
                                name='heart'
                                size={25}
                                style={{ marginLeft: 25 }}
                                color={this.props.favorites.hasOwnProperty(item.mal_id) ? 'red' : 'black'}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.handleURlPress(item.url)}>
                            <IconAntDesign
                                name='sharealt'
                                size={25}
                                style={{ marginLeft: 25 }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Animated.View>
        )
    }

}

const mapStateToProps = state => ({
    favorites: state.animeData.favorites,
})

const mapDispatchToProps = dispatch => ({
    addToFavorite: item => dispatch(saveToFavorite(item)),
    deleteFromFavorite: id => dispatch(deleteFromFavorites(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ListItem)


const styles = StyleSheet.create({
    listView: {
        marginTop: 35,
        width: width * .98,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardHolder: {
        width: width * .9,
        height: height * .6,
        marginTop: 20,
        backgroundColor: 'rgb(221, 221, 221)'
    },
    imageHolder: {
        width: '100%',
        height: '50%'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    headerView: {
        alignItems: 'center',
        marginTop: 5,
        marginHorizontal: 5,
    },
    headerText: {
        fontSize: 20,
        fontWeight: '600'
    },
    lowerDataset: {
        flexDirection: 'row',
        marginTop: 5,
        height: '31%',
        //backgroundColor: 'red'
    },
    additionalDataHolder: {
        width: '50%',
        marginLeft: 15
    },
    additionalDataText: {
        fontSize: 14,
        fontWeight: '500',
        marginTop: 7
    },
    buttonsHolder: {
        width: '50%',
        flexDirection: 'row',
        alignItems: 'flex-end',
        
    }
})