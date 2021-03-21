import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {
    ProgressChart
} from 'react-native-chart-kit';

const OurProgressChart = props => (
    <ProgressChart
        data={{
            labels: ['Araba', 'PC', 'Tatil'], // optional
            data: [40000 / 300000, 0.6, 0.8],
        }}
        width={310}
        height={220}
        strokeWidth={16}
        radius={20}
        style={{borderRadius: 16}}
        chartConfig={{
            backgroundColor: '#B3FFD6',
            backgroundGradientFrom: '#51F0B0',
            backgroundGradientTo: '#00B383',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) =>
                `rgba(255, 255, 255, ${opacity})`,
            paddingLeft: -20,
        }}
        hideLegend={false}
        paddingRight={30}
        borderRadius={16}
    />
);

const ProgressChartStyles = StyleSheet.create({
    card: {
        flex: 1,
        margin: 10,
        borderRadius: 20,
        backgroundColor: 'white',
    },
    cardInnerContainer: {
        marginHorizontal: -24,
        marginVertical: -16,
        height: 200,
    },
    cardInnerContainerFriend: {
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: -14,
    },
    friendAvatarContainer: {
        width: 60,
        height: 60,
        shadowColor: '#000',
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 1,
        elevation: 1,
    },
    friendAvatar: {
        height: '100%',
        aspectRatio: 1,
        borderRadius: 30,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
    },
    footerControl: {},
    amountText: {alignSelf: 'flex-end', flex: 1},
    nameText: {
        marginLeft: 20,
        flex: 1,
    },
    icon: {
        height: 20,
        width: 20,
    },
    button: {
        height: 30,
        width: 70,
        marginHorizontal: 5,
    },
});

export {OurProgressChart};
