import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, View, ScrollView} from 'react-native';
import {
    Divider,
    Layout,
    Text,
    TopNavigation,
    Icon,
    TopNavigationAction, Card,
} from '@ui-kitten/components';
import styles from "../../../src/styles";
import {
    FriendWarningCard,
} from '../../../Components/Card';


export default class Advice extends Component {
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
                    title={<Text style={styles.miniTitle}>Birikim Onerileri</Text>}
                    alignment="center"
                    accessoryLeft={this.renderLeftActions}
                />
                <Divider/>
                <Layout style={styles.layout}>
                    <ScrollView style={styles.container}>
                        <View style={{width: '100%', paddingHorizontal: 16}}>
                            <FriendWarningCard
                                text={"Ev dışındaki harcamaların arkdaşlarindan %35 daha fazla. Bu harcamalardan kısarak birikimlerine odaklanabilirsin."}/>
                            <FriendWarningCard
                                text={"Senin yas grubundaki gencler kozmetik harcamalarina aylik olarak %10 daha az harciyorlar. Kayak tatilin icin bu parayi biriktirebilirsin."}/>
                        </View>
                        <View style={{height: 75}}/>
                    </ScrollView>
                </Layout>
            </SafeAreaView>
        );
    }
}
