import React, {Component} from 'react';
import {Alert, YellowBox} from 'react-native';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import LoginNavigator from './Screens/Navigators/LoginNavigator';
import MainNavigator from './Screens/Navigators/MainNavigator';
import {FetchPost} from './Utils/Fetch';
import {StoreData, GetData} from './Utils/AsyncStorage';
import {call} from 'react-native-reanimated';
import theme from './src/themes/theme';
import {client} from './back-end/OurApi';
import {gql} from "@apollo/client";
import auth from '@react-native-firebase/auth';

YellowBox.ignoreWarnings(['Warning: ReactNative.createElement']);

/**GLOBALS START*/
global.email = '';
global.userId = 0;
global.tckn = '';
global.realName = '';
global.password = '';
global.username = '';
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

    clearLoginInfo() {
        StoreData('email', '');
        StoreData('user_id', '');
        StoreData('tckn', '');
        StoreData('real_name', '');
        StoreData('password', '');
        StoreData('username', '');
        global.email = '';
        global.userId = '';
        global.tckn = '';
        global.realName = '';
        global.password = '';
        global.username = '';
        this.setState({isLoggedIn: false});
    }

    saveLoginInfo(user) {
        StoreData('email', user.email);
        StoreData('user_id', user.id);
        StoreData('tckn', user.tckn);
        StoreData('real_name', user.name);
        StoreData('password', user.password);
        StoreData('username', user.username);
        global.email = user.email;
        global.userId = user.id;
        global.tckn = user.tckn;
        global.realName = user.name;
        global.password = user.password;
        global.username = user.username;
        this.setState({isLoggedIn: true});
    }

    async checkCredentials() {
        let email = await GetData('email');
        let password = await GetData('password');
        if (
            email !== null &&
            email !== '' &&
            password !== null &&
            password !== ''
        ) {
            client
            .query({
                query: gql`
                    query MyQuery($email: String, $password: String) {
                        users(
                            where: {
                                email: {_eq: $email}
                                _and: {_or: {password: {_eq: $password}}}
                            }
                        ) {
                            email
                            id
                            tckn
                            username
                            name
                            password
                            phonenumber
                        }
                    }
                `,
                variables: {
                    email: email,
                    password: password,
                },
            })
            .then(result => {
                if (result.data.users.length === 1) {
                    let user = result.data.users[0];
                    this.saveLoginInfo(user);
                } else {
                    this.clearLoginInfo();
                }
            })
            .catch(result => {
                this.clearLoginInfo();
            });
        }
    }

    logInUserWithPassword(email, password, callback) {
        this.saveLoginInfo({
            email: 't@t.com',
            user_id: 1,
            tckn: 0,
            real_name: 'Test',
            password: '0',
            username: 'test'
        });
        return;
        StoreData('email', user.email);
        StoreData('user_id', user.id);
        StoreData('tckn', user.tckn);
        StoreData('real_name', user.name);
        StoreData('password', user.password);
        StoreData('username', user.username);
        client
        .query({
            query: gql`
                query MyQuery($email: String, $password: String) {
                    users(
                        where: {
                            email: {_eq: $email}
                            _and: {_or: {password: {_eq: $password}}}
                        }
                    ) {
                        email
                        id
                        tckn
                        username
                        name
                        password
                        phonenumber
                    }
                }
            `,
            variables: {
                email: email,
                password: password,
            },
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
                        insert_users(objects: {user_id: $user_id, tckn: $tckn, password: $password, name: $name, email: $email}) {
                            returning {
                                user_id
                                tckn
                                password
                                name
                                email
                                id
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
