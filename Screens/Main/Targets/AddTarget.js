import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, Alert, RefreshControl} from 'react-native';
import {
  Divider,
  Layout,
  Text,
  TopNavigation,
  List,
  ListItem,
  Icon,
  TopNavigationAction,
} from '@ui-kitten/components';
import {BankApiCard} from '../../../Components/Card';
import {FetchGet} from '../../../Utils/Fetch';

export default class AddTarget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false
    };
  }

  componentDidMount() {}

  renderItem = ({item, index}) => (
    <BankApiCard
      cardProps={item}
    />
  );

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
      <SafeAreaView style={{flex: 1}}>
        <TopNavigation
          title="Yeni hedef ekle"
          alignment="center"
          accessoryLeft={this.renderLeftActions}
        />
        <Divider />
        <Layout
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <List
            style={AddTargetStyles.listContainer}
            data={this.state.banks}
            extraData={this.state.banks}
            renderItem={this.renderItem}
          />
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
});
