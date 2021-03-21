import React, {Component} from 'react';
import {SafeAreaView, StyleSheet,  View, ScrollView} from 'react-native';
import {
    Divider,
    Layout,
    Text,
    TopNavigation,
    Icon,
    TopNavigationAction, Card,
} from '@ui-kitten/components';
import styles from "../../src/styles";
import {SubscriptionWarningCard} from "../../Components/Card";


export default class Notifications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false, name: "", target: 0, stored: 0

        };
    }

    componentDidMount() {
    }

    GoBackIcon = props => <Icon {...props} name="arrow-back-outline"/>;

    renderLeftActions = () => (
        <React.Fragment>
            <TopNavigationAction
                icon={this.GoBackIcon}
                onPress={() => this.props.navigation.goBack()}
            />
        </React.Fragment>
    );

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <TopNavigation
                    title={<Text style={styles.miniTitle}>Bildirimler & Firsatlar</Text>}
                    alignment="center"
                    accessoryLeft={this.renderLeftActions}
                />
                <Divider/>
                <Layout style={styles.layout}>
                    <ScrollView style={styles.container}>
                        <View style={{width: '100%', paddingHorizontal: 16}}>
                            <SubscriptionWarningCard/>
                            <Card style={CardStyles.smallCard}>
                                <View style={CardStyles.smallCardInnerContainer}>
                                    <View
                                        style={{
                                            height: '100%',
                                            width: 60,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                        <Icon
                                            style={CardStyles.icon}
                                            fill="#000"
                                            name="checkmark-circle-outline"
                                        />
                                    </View>
                                    <Text category={'h6'} style={{flex: 1, color: '#000'}}>
                                        yFuture sayesinde kazandigin birikimlerini Vakif Bank'in sadece 25 yasindan kucuk genclere sundugu birikim hesabinda degerlendirmek ister misin?
                                    </Text>
                                </View>
                            </Card>
                        </View>
                        <View style={{height: 75}}/>
                    </ScrollView>
                </Layout>
            </SafeAreaView>
        );
    }
}


const CardStyles = StyleSheet.create({
    subscriptionButton: {
        width: 150,
        margin: 16,
    },
    card: {
        flex: 1,
        margin: 10,
        borderRadius: 20,
    },
    smallCard: {
        width: '100%',
        height: 175,
        backgroundColor: '#FFD930',
        borderRadius: 20,
        marginTop: 10,
        marginBottom: 10,
    },
    smallCardInnerContainer: {
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: 40,
        height: 40,
        color: '#FFF',
    },
    cardInnerContainer: {
        height: 100,
    },
    image: {
        height: '100%',
        resizeMode: 'contain',
        padding: 10,
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 15,
    },
    footerControl: {},
    amountText: {alignSelf: 'flex-end', flex: 1},
    content: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 16,
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});

