import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, Alert, RefreshControl} from 'react-native';
import {
    Divider,
    Layout,
    Text,
    TopNavigation,
    List,
    ListItem,
    Icon,
    TopNavigationAction,
} from '@ui-kitten/components';
import {BankApiCard} from '../../../Components/Card';
import {FetchGet} from '../../../Utils/Fetch';
import styles from "../../../src/styles";

export default class AddBankAPI extends Component {
    constructor(props) {
        super(props);
        this.state = {
            banks: [
                {
                    name: 'Vakıf Bank',
                    image:
                        'data:image/png;base64,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',
                    id: 'yapi_kredi',
                    status: global.cardNumber != null ? 1 : 0,
                },
                {
                    name: 'Yapı Kredi',
                    image:
                        'https://project-lyda.s3.eu-central-1.amazonaws.com/yapi_kredi_bankasi.png',
                    id: 'yapi_kredi',
                    status: 2
                },
                {
                    name: 'Ziraat Bankası',
                    image:
                        'https://project-lyda.s3.eu-central-1.amazonaws.com/ziraatbank.png',
                    id: 'ziraat_bankasi',
                    status: 2,
                },
                {
                    name: 'İş Bankası',
                    image:
                        'https://project-lyda.s3.eu-central-1.amazonaws.com/isbank.jpg',
                    id: 'is_bankasi',
                    status: 2,
                },
                {
                    name: 'Garanti BBVA',
                    image:
                        'https://project-lyda.s3.eu-central-1.amazonaws.com/garanti.jpg',
                    id: 'garanti_bbva',
                    status: 2,
                },
                {
                    name: 'QNB Finansbank',
                    image:
                        'https://project-lyda.s3.eu-central-1.amazonaws.com/qnbfinans.png',
                    id: 'qnb_finans',
                    status: 2,
                },
                {
                    name: 'Enpara',
                    image:
                        'https://project-lyda.s3.eu-central-1.amazonaws.com/Enpara.com_logo.png',
                    id: 'enpara',
                    status: 2,
                },
            ],
            refreshing: true,
        };
    }

    componentDidMount() {
    }

    renderItem = ({item, index}) => (
        <BankApiCard
            cardProps={item}
            openQRScreen={() => this.openQRScreen(item.code)}
        />
    );

    openQRScreen(code) {
        this.props.navigation.navigate('ShowQRScreen', {code: code});
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
                    title={<Text style={styles.miniTitle}>Banka Ekle</Text>}
                    alignment="center"
                    accessoryLeft={this.renderLeftActions}
                />
                <Divider/>
                <Layout
                    style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <List
                        style={AddBankAPIStyles.listContainer}
                        data={this.state.banks}
                        extraData={this.state.banks}
                        renderItem={this.renderItem}
                    />
                </Layout>
            </SafeAreaView>
        );
    }
}

const AddBankAPIStyles = StyleSheet.create({
    listContainer: {
        flex: 1,
        width: '100%',
        paddingLeft: 20,
        paddingRight: 20,
    },
});
