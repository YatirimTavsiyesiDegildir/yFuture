import React, {Component} from 'react';
import {
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
    Image,
    View,
    ActivityIndicator,
} from 'react-native';
import {
    Button,
    Divider,
    Layout,
    TopNavigation,
    Text,
    Input,
    Spinner,
    Icon,
} from '@ui-kitten/components';

import styles from "../../src/styles";

const EmailIcon = props => <Icon {...props} name="email"/>;
const LockIcon = props => <Icon {...props} name="lock"/>;

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {email: '', password: '', loading: false};
    }

    navigateRegister = () => {
        this.props.navigation.navigate('Register');
    };

    LoadingIndicator = props => (
        <View style={[props.style]}>
            <Spinner size="small"/>
        </View>
    );

    //TODO: Replace image with new one
    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <Divider/>
                <Layout style={LoginStyles.container}>
                    <View style={LoginStyles.logoContainer}>
                        <View style={LoginStyles.logoOutline}>
                            <Image
                                style={LoginStyles.logo}
                                resizeMode={'contain'}
                            />
                        </View>
                    </View>
                    <View style={LoginStyles.inputContainer}>
                        <Text category="h2" style={styles.titleText}>
                            Hoş Geldin!
                        </Text>
                        <Input
                            placeholder="Email"
                            value={this.state.email}
                            onChangeText={nextValue => this.setState({email: nextValue})}
                            accessoryLeft={EmailIcon}
                            autoCapitalize="none"
                            textStyle={styles.textInput}
                            style={styles.input}
                        />
                        <Input
                            placeholder="Sifre"
                            value={this.state.password}
                            onChangeText={nextValue => this.setState({password: nextValue})}
                            secureTextEntry={true}
                            accessoryLeft={LockIcon}
                            autoCapitalize="none"
                            textStyle={styles.textInput}
                            style={styles.input}
                        />

                        <View style={LoginStyles.bottomView}>
                            <Button
                                style={LoginStyles.button}
                                onPress={() => {
                                    this.setState({loading: true});
                                    this.props.route.params.mainFunctions.logInUser(
                                        this.state.email,
                                        this.state.password,
                                        () => {
                                            this.setState({loading: false});
                                        },
                                    );
                                }}
                                accessoryLeft={
                                    this.state.loading ? this.LoadingIndicator : null
                                }
                                appearance={this.state.loading ? 'ghost' : 'filled'}>
                                {this.state.loading ? '' : 'Giris Yap'}
                            </Button>
                            <TouchableOpacity onPress={this.navigateRegister}>
                                <Text style={styles.ghostText}>Hesabin yok mu? Kayit ol!</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Layout>
            </SafeAreaView>
        );
    }
}

const LoginStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoOutline: {
        width: 250,
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        overflow: 'hidden'
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 50
    },
    logo: {
        width: '100%',
        height: '100%',
        backgroundColor: 'grey'
    },
    inputContainer: {
        flex: 2,
        width: '100%',
        alignItems: 'center',
        padding: 20,
    },
    button: {
        width: 200,
        height: 45,
        marginTop: 0,
        marginBottom: 20,
    },
    bottomView: {
        position: 'absolute',
        bottom: 30,
        alignItems: 'center',
    },
});
