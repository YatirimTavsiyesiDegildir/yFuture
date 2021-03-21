import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, Alert, RefreshControl, View} from 'react-native';
import {
    Divider,
    Layout,
    Text,
    TopNavigation,
    List,
    ListItem,
    Icon,
    TopNavigationAction, Input,
} from '@ui-kitten/components';
import {BankApiCard} from '../../../Components/Card';
import {FetchGet} from '../../../Utils/Fetch';

const TagIcon = props => <Icon {...props} name="pricetags"/>;
const HashIcon = props => <Icon {...props} name="hash-outline"/>;
const EmailIcon = props => <Icon {...props} name="email"/>;
const LockIcon = props => <Icon {...props} name="lock"/>;

export default class AddTarget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false
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
                    title="Yeni hedef ekle"
                    alignment="center"
                    accessoryLeft={this.renderLeftActions}
                />
                <Divider/>
                <Layout
                    style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Input
                        placeholder="Hedef"
                        value={this.state.name}
                        onChangeText={nextValue => this.setState({name: nextValue})}
                        accessoryLeft={TagIcon}
                        autoCapitalize="words"
                    />
                    <Input
                        placeholder="National Identification Number"
                        value={this.state.tckn}
                        onChangeText={nextValue => this.setState({tckn: nextValue})}
                        accessoryLeft={HashIcon}
                        autoCapitalize="none"
                        keyboardType={"number-pad"}
                    />
                    <Input
                        placeholder="E-mail"
                        value={this.state.email}
                        onChangeText={nextValue => this.setState({email: nextValue})}
                        accessoryLeft={EmailIcon}
                        autoCapitalize="none"
                    />
                    <Input
                        placeholder="Password"
                        value={this.state.password}
                        onChangeText={nextValue => this.setState({password: nextValue})}
                        secureTextEntry={true}
                        accessoryLeft={LockIcon}
                        autoCapitalize="none"
                    />
                </Layout>
            </SafeAreaView>
        );
    }
}

const AddTargetStyles = StyleSheet.create({
    listContainer: {
        flex: 1,
        width: '100%',
        paddingLeft: 20,
        paddingRight: 20,
    },
});
