import React, {Component} from 'react';
import {Alert} from 'react-native';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import LoginNavigator from './Screens/Navigators/LoginNavigator';
import MainNavigator from './Screens/Navigators/MainNavigator';
import {StoreData, GetData} from './Utils/AsyncStorage';
import theme from './src/themes/theme';
import {client} from './back-end/OurApi';
import {gql} from "@apollo/client";
import auth from '@react-native-firebase/auth';


/**GLOBALS START*/
global.email = '';
global.userId = '';
global.tckn = '';
global.realName = '';
global.password = '';
global.friendsAdded = false;
global.subscriptionWarningEnabled = false;
/**GLOBALS END*/

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {isLoggedIn: false};
    }

    componentDidMount() {
        this.checkCredentials();
    }

    /** ASYNC STORAGE START*/
    clearLoginInfo() {
        StoreData('email', '');
        StoreData('user_id', '');
        StoreData('tckn', '');
        StoreData('real_name', '');
        StoreData('password', '');
        global.email = '';
        global.userId = '';
        global.tckn = '';
        global.realName = '';
        global.password = '';
        this.setState({isLoggedIn: false});
    }

    saveLoginInfo(user) {
        StoreData('email', user.email);
        StoreData('user_id', user.id);
        StoreData('tckn', user.tckn);
        StoreData('real_name', user.name);
        StoreData('password', user.password);
        global.email = user.email;
        global.userId = user.id;
        global.tckn = user.tckn;
        global.realName = user.name;
        global.password = user.password;
        this.setState({isLoggedIn: true});
    }

    /** ASYNC STORAGE END*/

    // Login from async storage
    async checkCredentials() {
        let email = await GetData('email');
        let password = await GetData('password');
        if (
            email !== null &&
            email !== '' &&
            password !== null &&
            password !== ''
        ) {
            let user = {email: email, password: password};
            await auth()
            .signInWithEmailAndPassword(email, password)
            .then(res => {
                console.log('User account signed in!');
                client
                .query({
                    query: gql`
                        query MyQuery($email: String, $password: String) {
                            users(
                                where: {email: {_eq: $email}, _and: {password: {_eq: $password}}}
                            ) {
                                email
                                real_name
                                password
                                tckn
                                user_id
                            }
                        }
                    `,
                    variables: {user},
                })
                .then(result => {
                    if (result.data.users.length === 1) {
                        let user = result.data.users[0];
                        this.saveLoginInfo(user);
                    } else {
                        Alert.alert('Email veya sifre yanlis.');
                    }
                })
                .catch(result => {
                    Alert.alert('Bir hata olustu.');
                });
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    Alert.alert('Email already in use, please try sign-in.');
                } else if (error.code === 'auth/invalid-email') {
                    Alert.alert('Email address is invalid');
                } else {
                    Alert.alert('A problem occurred.');
                }
                console.error(error);
            });
        }
    }

    async logInUserWithPassword(email, password, callback) {
        let user = {email: email, password: password};
        await auth()
        .signInWithEmailAndPassword(email, password)
        .then(res => {
            console.log('User account signed in!');
            client
            .query({
                query: gql`
                    query MyQuery($email: String, $password: String) {
                        users(
                            where: {email: {_eq: $email}, _and: {password: {_eq: $password}}}
                        ) {
                            email
                            real_name
                            password
                            tckn
                            user_id
                        }
                    }
                `,
                variables: {user},
            })
            .then(result => {
                if (result.data.users.length === 1) {
                    let user = result.data.users[0];
                    this.saveLoginInfo(user);
                    callback();
                } else {
                    Alert.alert('Email veya sifre yanlis.');
                    callback();
                }
            })
            .catch(result => {
                Alert.alert('Bir hata olustu.');
                callback();
            });
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                Alert.alert('Email already in use, please try sign-in.');
            } else if (error.code === 'auth/invalid-email') {
                Alert.alert('Email address is invalid');
            } else {
                Alert.alert('A problem occurred.');
            }
            console.log(error);
        });
    }

    async register(name, tckn, email, password, callback) {
        // Firebase part
        await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
            console.log('User account created & signed in!');
            let user = {
                name: name,
                tckn: tckn,
                email: email,
                password: password,
                user_id: res.user.uid
            };
            // Our end
            client.mutate({
                mutation: gql`
                    mutation RegisterUser($name: String, $tckn:String, $email:String, $password: String, $user_id:String,) {
                        insert_users(objects: {user_id: $user_id, tckn: $tckn, password: $password, real_name: $name, email: $email}) {
                            returning {
                                user_id
                                tckn
                                password
                                real_name
                                email
                            }
                        }
                    }
                `,
                variables: user,
            })
            .then(result => {
                console.log(result);
                this.saveLoginInfo(user);
                callback();
            })
            .catch(result => {
                console.log(result);
                this.clearLoginInfo();
            });
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                Alert.alert('Email already in use, please try sign-in.');
            } else if (error.code === 'auth/invalid-email') {
                Alert.alert('Email address is invalid');
            } else {
                Alert.alert('An undefined problem occurred.');
            }
            callback();
            console.log(error);
        });
    }

    logout = () => {
        this.clearLoginInfo();
        this.setState({isLoggedIn: false});
    };

    render() {
        return (
            <>
                <IconRegistry icons={EvaIconsPack}/>
                <ApplicationProvider {...eva} theme={theme.light}>
                    {this.state.isLoggedIn ? (
                        <MainNavigator
                            mainFunctions={{
                                logout: () => this.logout(),
                            }}
                        />
                    ) : (
                        <LoginNavigator
                            mainFunctions={{
                                logInUser: (email, password, callback) =>
                                    this.logInUserWithPassword(email, password, callback),
                                register: (name, tckn, email, password, callback) =>
                                    this.register(name, tckn, email, password, callback),
                            }}
                        />
                    )}
                </ApplicationProvider>
            </>
        );
    }
}
