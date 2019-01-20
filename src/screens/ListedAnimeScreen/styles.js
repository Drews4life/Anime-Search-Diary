import {StyleSheet, Dimensions} from 'react-native'

const { height, width } = Dimensions.get('window')

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    listContainer: {
        width: width * .98
    },
    innerListContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: width * .85,
        height: height * .35,
        backgroundColor: '#e8e9ea',
        marginVertical: 10,
    },
    episodesField: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    midText: {
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 10,
        marginRight: 15
    },
    touchableWrapper: {
        backgroundColor: 'black',
        marginLeft: 10
    },
    keys: {
        fontSize: 25,
        color: 'rgba(255,255,255,1)'
    },
    headerWrapper: {
        marginVertical: 10
    },
    headerText: {
        alignSelf: 'center',
        fontSize: 22,
        fontWeight: 'bold'
    }
})