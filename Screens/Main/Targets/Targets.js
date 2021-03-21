import React, {Component} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import {
    Divider,
    Layout,
    Text,
    TopNavigation,
    TopNavigationAction,
    Icon,
    Modal,
    Button,
    Card,
} from '@ui-kitten/components';
import styles from "../../../src/styles";
import * as Progress from 'react-native-progress';

const OtherPlusIcon = props => <Icon {...props} name="plus-outline"/>;

let i = 0;
let date = new Date();

export default class TargetScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {targets: [], progress1: 0, progress2: 0, progress3: 0};
    }

    componentDidMount() {
        this.setState({progress1: 0.9, progress2: 0.21, progress3: 0.85})
    }

    PlusIcon = props => <Icon {...props} name="plus-circle-outline"/>;

    renderRightActions = () => (
        <React.Fragment>
            <TopNavigationAction
                icon={this.PlusIcon}
                onPress={() => {
                    this.props.navigation.navigate('AddTarget');
                    this.setState({visible: true});
                }}
            />
        </React.Fragment>
    );

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <TopNavigation
                    title={<Text style={styles.miniTitle}>Birikim Hedeflerim</Text>}
                    alignment="center"
                    accessoryRight={this.renderRightActions}
                />
                <Divider/>
                <Layout style={styles.layout}>
                    <ScrollView style={styles.container}>
                        <Card style={[styles.card, {alignItems: 'flex-start'}]}>
                            <Text category={'h1'} style={[styles.titleTextMedium, {marginTop: 0}]}>Oyun
                                Bilgisayari</Text>
                            <Text category={'h1'} style={[styles.targetTitle, {color: "#7A0A20"}]}>Hedef: <Text>10000
                                TL</Text></Text>
                            <Text category={'h1'}
                                  style={[styles.targetTitle, {color: "#0B6F11"}]}>Biriktirilen: <Text>9000
                                TL</Text></Text>
                            <Progress.Bar progress={this.state.progress1} width={310} animated={true}
                                          color={"#0B6F11"}/>
                        </Card>
                        <View style={styles.divider}/>
                        <Card style={[styles.card, {alignItems: 'flex-start'}]}>
                            <Text category={'h1'} style={[styles.titleTextMedium, {marginTop: 0}]}>Bluetooth
                                Kulaklik</Text>
                            <Text category={'h1'} style={[styles.targetTitle, {color: "#7A0A20"}]}>Hedef: <Text>700
                                TL</Text></Text>
                            <Text category={'h1'}
                                  style={[styles.targetTitle, {color: "#0B6F11"}]}>Biriktirilen: <Text>150
                                TL</Text></Text>
                            <Progress.Bar progress={this.state.progress2} width={310} animated={true}
                                          color={"#0B6F11"}/>
                        </Card>
                        <View style={styles.divider}/>
                        <Card style={[styles.card, {alignItems: 'flex-start'}]}>
                            <Text category={'h1'}
                                  style={[styles.targetTitle, {color: "grey", fontSize: 14}]}>Toplu Birikim</Text>
                            <Text category={'h1'} style={[styles.titleTextMedium, {marginTop: 0}]}>Kayak Tatili</Text>
                            <Text category={'h1'} style={[styles.targetTitle, {color: "#7A0A20"}]}>Hedef: <Text>4500
                                TL</Text></Text>
                            <Text category={'h1'}
                                  style={[styles.targetTitle, {color: "#0B6F11"}]}>Biriktirilen: <Text>3900
                                TL</Text></Text>
                            <Progress.Bar progress={this.state.progress3} width={310} animated={true}
                                          color={"#0B6F11"}/>
                            <View style={{flexDirection: 'row', width: '100%', marginTop: 8}}>
                                <View style={styles.friendAvatarContainer}>
                                    <Image
                                        style={styles.friendAvatar}
                                        source={{
                                            uri: 'https://thispersondoesnotexist.com/image?ts=' + date.getMinutes().toString() + date.getSeconds().toString()
                                        }}
                                    />
                                </View>
                                <View style={styles.friendAvatarContainer}>
                                    <Image
                                        style={styles.friendAvatar}
                                        source={{
                                            uri: 'https://thispersondoesnotexist.com/image?ts=' + date.getSeconds().toString()
                                        }}
                                    />
                                </View>
                                <View style={styles.friendAvatarContainer}>
                                    <Image
                                        style={styles.friendAvatar}
                                        source={{
                                            uri: 'https://thispersondoesnotexist.com/image?ts=' + (i++).toString()
                                        }}
                                    />
                                </View>
                                <View style={styles.friendAvatarContainer}>
                                    <View
                                        style={[styles.friendAvatar, {
                                            backgroundColor: "#ababab",
                                            justifyContent: 'center'
                                        }]}

                                    >
                                        <OtherPlusIcon fill={'#222'} style={{height: 40, marginTop: 0}}/>
                                    </View>
                                </View>
                            </View>
                        </Card>
                        <View style={{height: 75}}/>
                    </ScrollView>
                </Layout>
            </SafeAreaView>
        );
    }
}

const ProfileStyles = StyleSheet.create({
    newContainer: {
        minHeight: 192,
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarContainer: {
        flex: 2,
        padding: 16,
    },
    infoContainer: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        padding: 16,
    },
    logoutContainer: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
    },
    avatar: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
        padding: 10,
        zIndex: 10,
        borderRadius: 1000,
    },
    avatarInnerContainer: {
        height: '100%',
        aspectRatio: 1,
        borderRadius: 1000,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
});
