import React, {Component} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
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

const LogoutIcon = props => <Icon {...props} name="log-out"/>;
const LockIcon = props => <Icon {...props} name="lock"/>;
import styles from "../../src/styles";

export default class ProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {visible: false, badgeText: ''};
    }

    BackAction = () => (
        <TopNavigationAction
            icon={LogoutIcon}
            onPress={() => this.props.route.params.mainFunctions.logout()}
        />
    );

    ModalWithBackdropShowcase = (badgeString="", imgUri="", locked=false) => {
        return (
            <View style={[ProfileStyles.badgeContainer,locked ? {backgroundColor: '#7F7F7F77', borderRadius: 10} : null]}>
                {!locked ?
                    <>
                <TouchableOpacity
                    onPress={() =>
                        this.setState({visible: true, badgeText: badgeString})
                    }>
                    <Image
                        style={{height: 70, width: 70, margin: 10}}
                        source={{
                            uri: imgUri,
                        }}
                    />
                </TouchableOpacity>

                <Modal
                    visible={this.state.visible}
                    backdropStyle={ProfileStyles.backdrop}
                    onBackdropPress={() => this.setState({visible: false})}>
                    <Card disabled={true} style={{margin: 10}}>
                        <Text>{this.state.badgeText}</Text>
                    </Card>
                </Modal>
                    </> : <LockIcon fill={'#575757'} style={{height: '100%', width:'100%'}}/>}
            </View>
        );
    };

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <TopNavigation
                    title={<Text style={styles.miniTitle}>Profilim</Text>}
                    alignment="center"
                    accessoryRight={this.BackAction}
                />
                <Divider/>
                <Layout style={ProfileStyles.container}>
                    <View style={ProfileStyles.avatarContainer}>
                        <View style={ProfileStyles.avatarInnerContainer}>
                            <Image
                                style={ProfileStyles.avatar}
                                source={{
                                    uri: 'https://thispersondoesnotexist.com/image'
                                }}
                            />
                        </View>
                    </View>
                    <View style={ProfileStyles.infoContainer}>
                        <Text category={'h1'} style={ProfileStyles.realName}>{global.real_name}</Text>
                        {/*
                        <Text category={'label'} appearance={'hint'}>
                            {'@' + global.real_name}
                        </Text>
                        */}
                    </View>
                    <View style={ProfileStyles.logoutContainer}>
                        <Text category={'h3'} style={ProfileStyles.badgeTitle}>Rozetlerim</Text>
                        <View
                            style={{
                                height: '50%',
                                width: '100%',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                marginTop: 20,
                            }}>
                            {this.ModalWithBackdropShowcase(
                                'Tebrikler! Tüm aboneliklerin için hatırlatıcı kurdun.',
                                'https://project-lyda.s3.eu-central-1.amazonaws.com/badges/clap.jpeg',
                            )}
                            {this.ModalWithBackdropShowcase(
                                'Tebrikler! Bir hafta boyunca arkadaşlarından daha tasarruflu davrandın.',
                                'https://project-lyda.s3.eu-central-1.amazonaws.com/badges/flag.jpg',
                            )}
                            {this.ModalWithBackdropShowcase(
                                'Tebrikler! Lyda hesabını bir banka hesabına bağladın.',
                                'https://project-lyda.s3.eu-central-1.amazonaws.com/badges/natural.jpeg',
                            )}
                            {this.ModalWithBackdropShowcase(
                                '',
                                '',
                                true
                            )}
                        </View>
                        <View
                            style={{
                                height: '50%',
                                width: '100%',
                                flexDirection: 'row',
                                justifyContent: 'center',
                            }}>
                            {this.ModalWithBackdropShowcase(
                                '',
                                '',
                                true
                            )}
                            {this.ModalWithBackdropShowcase(
                                '',
                                '',
                                true
                            )}
                            {this.ModalWithBackdropShowcase(
                                '',
                                '',
                                true
                            )}
                            {this.ModalWithBackdropShowcase(
                                '',
                                '',
                                true
                            )}
                        </View>
                    </View>
                </Layout>
            </SafeAreaView>
        );
    }
}


const ProfileStyles = StyleSheet.create({
    badgeContainer: {
        height: 75,
        width: 75,
        margin: 10,
        justifyContent: 'center'
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30
    },
    avatarContainer: {
        flex: 2,
        padding: 20,
    },
    infoContainer: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        padding: 20,
        paddingTop: 0
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
    realName: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    badgeTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        width: '100%',
    }
});
