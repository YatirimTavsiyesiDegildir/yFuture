import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, Alert, RefreshControl, View, ScrollView, Image} from 'react-native';
import {
    Divider,
    Layout,
    Text,
    TopNavigation,
    List,
    ListItem,
    Icon,
    TopNavigationAction, Input, Button, Card,
} from '@ui-kitten/components';
import {BankApiCard} from '../../../Components/Card';
import {FetchGet} from '../../../Utils/Fetch';
import {client} from '../../../back-end/OurApi';
import {gql} from "@apollo/client";
import styles from "../../../src/styles";

const TagIcon = props => <Icon {...props} name="pricetags"/>;
const HashIcon = props => <Icon {...props} name="hash-outline"/>;

export default class AddTarget extends Component {
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
                    title={<Text style={styles.miniTitle}>Yeni Hedef Ekle</Text>}
                    alignment="center"
                    accessoryLeft={this.renderLeftActions}
                />
                <Divider/>
                <Layout style={styles.layout}>
                    <ScrollView style={styles.container}>

                        <View style={styles.divider}/>
                        <Card style={[styles.card]}>
                            <Text category={'h3'} style={styles.titleTextMedium}>Yeni Birikim Hedefiniz: </Text>
                            <Input
                                placeholder="Hedef"
                                value={this.state.name}
                                onChangeText={nextValue => this.setState({name: nextValue})}
                                accessoryLeft={TagIcon}
                                autoCapitalize="none"
                                style={styles.input}
                            />
                            <Input
                                placeholder="Birikim Hedefi"
                                value={this.state.target}
                                onChangeText={nextValue => this.setState({target: nextValue})}
                                accessoryLeft={HashIcon}
                                autoCapitalize="none"
                                keyboardType={"number-pad"}
                                style={styles.input}
                            />
                            <Input
                                placeholder="Elinizdeki Miktar"
                                value={this.state.stored}
                                onChangeText={nextValue => this.setState({stored: nextValue})}
                                accessoryLeft={HashIcon}
                                autoCapitalize="none"
                                keyboardType={"number-pad"}
                                style={styles.input}
                            />
                            <View style={{width: '100%', alignItems: 'center', justifyContent: 'center',flexDirection: 'row'}}>
                                <Button
                                    style={styles.submitButton}
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
                                    <Text style={styles.submitButtonText}>Ekle</Text>
                                </Button>
                            </View>
                        </Card>
                        <View style={{height: 75}}/>
                    </ScrollView>
                </Layout>
            </SafeAreaView>
        );
    }
}

