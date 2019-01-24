import { 
    StyleSheet,
    Dimensions
} from 'react-native'

const { height, width } = Dimensions.get('window')

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    dropDownHolder: {
        marginVertical: 15,
        width: width * .85,
        height: height * .055,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    dropDownBig: {
        width: width * .60
    },
    dropDownSmall: {
        marginLeft: 10,
        width: width * .25,
    },
    buttonSearch: {
        marginTop: 18,
        width: width * .23,
        height: '100%',
        marginLeft: 10,
        backgroundColor: '#d4d5d8',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8
    },
    textSearch: {
        fontWeight: '600'
    },
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
        
    },
    shortenFilter: {
        width: width * .4,
        marginHorizontal: 10,
    },
    shortenInput: {
        width: width * .2
    }
})