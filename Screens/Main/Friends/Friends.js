import React, {Component} from 'react';
import {
    SafeAreaView,
    Alert,
    RefreshControl,
    StyleSheet,
    View,
} from 'react-native';
import {
    Divider,
    Layout,
    TopNavigation,
    List,
    TopNavigationAction,
    Icon,
    Text,
    Card,
    Button,
    Modal,
} from '@ui-kitten/components';
import {FriendCard} from '../../../src/component/Card';
import {client} from '../../../back-end/OurApi';
import {gql} from '@apollo/client';
import styles from "../../../src/styles";

const AddFriendIcon = props => <Icon {...props} name="person-add-outline"/>;

export default class FriendsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            friends: [
                {name: 'Cinar Kiziltepe'}
                , {name: 'Ada Topcu'}
                , {name: 'Ege Kaan Gurkan'}
                , {name: 'Yashar Kardar'}
                , {name: 'Beril Karabulut'}],
            friendRequests: [],
            refreshing: false,
            renderData: [],
            visible: false,
        };
    }

    componentDidMount() {
        //this.getList();
    }

    getFriends() {
        if (global.friendsAdded) {
            client
            .query({
                query: gql`
                    query MyQuery($id: Int) {
                        followers(where: {follower_id: {_eq: $id}}) {
                            followed_to_user {
                                name
                                id
                            }
                        }
                    }
                `,
                variables: {
                    id: global.user_id,
                },
            })
            .then(result => {
                let followed = result.data.followers;
                this.setState({
                    friends: followed,
                    refreshing: false,
                });
            })
            .catch(result => {
                Alert.alert('Bir hata oluştu.');
            });
        }
    }

    getList() {
        this.setState({refreshing: true});
        this.getFriends();
    }

    renderFriendCard = ({item, index}) => {
        console.log(Math.random().toString());
        return (
            <FriendCard
                cardProps={item}
                functions={{
                    respondToFriendRequest: (target, response) =>
                        this.respondToFriendRequest(target, response),
                }}
                refreshing={this.state.refreshing}
            />
        );
    };

    navigateAddFriends = () => (
        <TopNavigationAction
            icon={AddFriendIcon}
            onPress={() => this.setState({visible: true})}
        />
    );

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <TopNavigation
                    title={<Text style={styles.miniTitle}>Arkadaşlarım</Text>}
                    alignment="center"
                    accessoryRight={this.navigateAddFriends}
                />
                <Divider/>
                <Layout
                    style={styles.layout}>
                    <List
                        style={FriendsStyles.listContainer}
                        data={this.state.friends}
                        extraData={this.state.friends}
                        renderItem={this.renderFriendCard}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={() => this.getFriends()}
                            />
                        }
                    />

                </Layout>
                <Modal
                    visible={this.state.visible}
                    backdropStyle={FriendsStyles.backdrop}
                    onBackdropPress={() => this.setState({visible: false})}
                    style={{width: '90%'}}>
                    <Card disabled={true} style={{margin: 10}}>
                        <Text category={'h6'}>
                            Rehberinde bulunan arkadaşlarını eklemek ister misin?
                        </Text>
                        <View style={{height: 30}}/>
                        <Button
                            size="small"
                            appearance={'filled'}
                            status={'success'}
                            onPress={() => {
                                global.friendsAdded = true;
                                this.setState({visible: false});
                                this.getFriends();
                            }}>
                            Rehbere İzin Ver
                        </Button>
                    </Card>
                </Modal>
            </SafeAreaView>
        );
    }
}


const FriendsStyles = StyleSheet.create({
    listContainer: {
        flex: 1,
        width: '100%',
    },
    container: {},
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});
