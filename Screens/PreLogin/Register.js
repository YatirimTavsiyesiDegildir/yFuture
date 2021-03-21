import React, {Component} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Button,
  Divider,
  Icon,
  Input,
  Layout,
  Text,
} from '@ui-kitten/components';
import styles from "../../src/styles";

const PersonIcon = props => <Icon {...props} name="person-outline" />;
const HashIcon = props => <Icon {...props} name="hash-outline" />;
const EmailIcon = props => <Icon {...props} name="email" />;
const LockIcon = props => <Icon {...props} name="lock" />;


export default class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {name: '', tckn: '', email: '', password: '', loading: false};
  }
  navigateLogin = () => {
    this.props.navigation.navigate('Login');
  };
  render() {
    return (
        <SafeAreaView style={{flex: 1}}>
          <Divider />
          <Layout
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={LoginStyles.inputContainer}>
              <Text category="h1" style={styles.titleText}>
                Kayit Ol
              </Text>
              <Input
                  placeholder="Isminiz"
                  value={this.state.name}
                  onChangeText={nextValue => this.setState({name: nextValue})}
                  accessoryLeft={PersonIcon}
                  autoCapitalize="words"
                  textStyle={styles.textInput}
                  style={styles.input}
              />
              <Input
                  placeholder="TC. Kimlik Numaraniz"
                  value={this.state.tckn}
                  onChangeText={nextValue => this.setState({tckn: nextValue})}
                  accessoryLeft={HashIcon}
                  autoCapitalize="none"
                  keyboardType={"number-pad"}
                  textStyle={styles.textInput}
                  style={styles.input}
              />
              <Input
                  placeholder="E-mail"
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
                    style={styles.submitButton}
                    onPress={() => {
                      this.setState({loading: true});
                      this.props.route.params.mainFunctions.register(
                          this.state.name,
                          this.state.tckn,
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
                  <Text style={styles.submitButtonText}>
                    {this.state.loading ? '' : 'Register'}</Text>
                </Button>
              </View>
            </View>
          </Layout>
        </SafeAreaView>
    );
  }
}

const LoginStyles = StyleSheet.create({
  anonContinueText: {
    margin: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoOutline: {
    width: 250,
    height: 250,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    marginTop: 50,
    width: 200,
  },
  inputContainer: {
    flex: 2,
    width: '100%',
    alignItems: 'center',
    padding: 16,
  },
  bottomView: {
    position: 'absolute',
    bottom: 30,
    alignItems: 'center',
  },
});
