import React, { Component } from 'react';
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




export default class TargetScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { targets: [] };
  }

  ModalWithBackdropShowcase = (badgeString, imgUri) => {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() =>
            this.setState({ visible: true, badgeText: badgeString })
          }>
          <Image
            style={{ height: 100, width: 100, margin: 15 }}
            source={{
              uri: imgUri,
            }}
          />
        </TouchableOpacity>

        <Modal
          visible={this.state.visible}
          backdropStyle={styles.backdrop}
          onBackdropPress={() => this.setState({ visible: false })}>
          <Card disabled={true} style={{ margin: 10 }}>
            <Text>{this.state.badgeText}</Text>
          </Card>
        </Modal>
      </View>
    );
  };


  PlusIcon = props => <Icon {...props} name="plus-circle-outline" />;

  renderRightActions = () => (
    <React.Fragment>
      <TopNavigationAction
        icon={this.PlusIcon}
        onPress={() => {
          this.props.navigation.navigate('AddTarget');
          this.setState({ visible: true });
        }}
      />
    </React.Fragment>
  );

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <TopNavigation
          title="Birikim Hedeflerim"
          alignment="center"
          accessoryRight={this.renderRightActions}
        />
        <Divider />
        <Layout style={ProfileStyles.container}>
          <View style={ProfileStyles.logoutContainer}>

            <View
              style={{
                height: '100%',
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 20,
              }}>

            </View>
          </View>
        </Layout>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    minHeight: 192,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

const ProfileStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
