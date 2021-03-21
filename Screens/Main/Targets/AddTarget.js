import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Alert, RefreshControl, View } from 'react-native';
import {
    Divider,
    Layout,
    Text,
    TopNavigation,
    List,
    ListItem,
    Icon,
    TopNavigationAction, Input, Button,
} from '@ui-kitten/components';
import { BankApiCard } from '../../../Components/Card';
import { FetchGet } from '../../../Utils/Fetch';
import { client } from '../../../back-end/OurApi';
import { gql } from "@apollo/client";

const TagIcon = props => <Icon {...props} name="pricetags" />;
const HashIcon = props => <Icon {...props} name="hash-outline" />;

export default class AddTarget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false, name: "", target: 0, stored: 0

        };
    }

    componentDidMount() {
    }

    GoBackIcon = props => <Icon {...props} name="arrow-back-outline" />;

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
            <SafeAreaView style={{ flex: 1 }}>
                <TopNavigation
                    title="Yeni hedef ekle"
                    alignment="center"
                    accessoryLeft={this.renderLeftActions}
                />
                <Divider />
                <Layout
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Input
                        placeholder="Hedef"
                        value={this.state.name}
                        onChangeText={nextValue => this.setState({ name: nextValue })}
                        accessoryLeft={TagIcon}
                        autoCapitalize="none"
                    />
                    <Input
                        placeholder="Birikim Hedefi"
                        value={this.state.target}
                        onChangeText={nextValue => this.setState({ target: nextValue })}
                        accessoryLeft={HashIcon}
                        autoCapitalize="none"
                        keyboardType={"number-pad"}
                    />
                    <Input
                        placeholder="Elinizdeki Miktar"
                        value={this.state.stored}
                        onChangeText={nextValue => this.setState({ stored: nextValue })}
                        accessoryLeft={HashIcon}
                        autoCapitalize="none"
                        keyboardType={"number-pad"}
                    />
                    <Button
                        onPress={() => {
                            console.log({
                                target_name: this.state.name,
                                target_value: this.state.target,
                                stored_value: this.state.stored,
                                user_id: global.user_id,
                            })
                            client.mutate({
                                mutation: gql`
                                    mutation MyMutation ($stored_value: String, $target_name:String, $target_value: String, $user_id:String,) {
                                        insert_saving_target(objects: {stored_value: $stored_value, target_name: $target_name, target_value: $target_value, user_id: $user_id}) {
                                            returning {
                                            user_id
                                            target_value
                                            target_name
                                            stored_value
                                            id
                                            }
                                        }
                                    }

                                `,
                                variables: {
                                    target_name: this.state.name,
                                    target_value: this.state.target,
                                    stored_value: this.state.stored,
                                    user_id: global.user_id,
                                },
                            })
                        }}>
                        {'Ekle'}
                    </Button>
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
    button: {
        width: 200,
        height: 45,
        marginTop: 0,
        marginBottom: 20,
    },
});
