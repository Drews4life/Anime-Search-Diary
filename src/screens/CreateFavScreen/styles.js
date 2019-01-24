import { StyleSheet, Dimensions } from 'react-native'

const { height, width } = Dimensions.get('window')

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        //justifyContent: 'center',
    },
    submitButton: {
        width: width * .9,
        height: height * .06,
        backgroundColor: 'rgb(0, 131, 255)',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15
    },
    whiteTxt: {
        color: 'rgb(255,255,255)',
        fontWeight: '400',
        fontSize: 20,

    },
    dropDownBig: {
        width: width * .9,
        paddingHorizontal: 5
    },
    inputsSame: {
        width: width * .9,
        height: height * .045,
        marginVertical: 10,
        fontWeight: '500',
        fontSize: 20,
        paddingHorizontal: 5
    },
    errorTitle: {
        borderRadius: 5,
        borderColor: 'rgb(206, 0, 0)',
        backgroundColor: 'rgb(255, 201, 201)'
    },
})