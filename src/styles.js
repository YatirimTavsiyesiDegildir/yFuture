import {
    StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
    textInput: {
        height: 40,
    },
    input: {
        margin: 5
    },
    titleText: {
        fontSize: 40,
        fontWeight: 'bold',
        width: '100%',
        marginTop: 20,
        marginBottom: 20,
        textAlign: 'center'
    },
    ghostText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'grey'
    },
    infoText: {},
    miniTitle: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    submitButton: {
        borderRadius: 15,
        width: 200,
        height: 50,
        marginTop: 0,
        marginBottom: 20,
    },
    submitButtonText: {
        fontSize: 22,
        color: 'white',
        fontWeight: 'bold'
    },
    titleTextMedium: {
        fontSize: 20,
        fontWeight: 'bold',
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'left'
    },
    spendingDot: {width: 10, height: 10, borderRadius: 5, backgroundColor: '#ffe0b2', marginRight: 10},
    spendingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
        height: 12,
        marginVertical: 5
    },
    layout: {flex: 1, justifyContent: 'center', alignItems: 'center'},
    container: {flex: 1, width: '100%'},
    card: {
        marginHorizontal: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        borderRadius: 10
    }
});

export default styles;
