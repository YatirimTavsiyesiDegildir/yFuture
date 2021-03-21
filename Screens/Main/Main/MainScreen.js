import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ScrollView,
  View,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {
  Divider,
  Layout,
  TopNavigation,
  Icon,
  TopNavigationAction,
  Text,
} from '@ui-kitten/components';

import {
  LineChart,
  PieChart,
  ContributionGraph,
} from 'react-native-chart-kit';
import {
  SubscriptionWarningCard,
  FriendWarningCard,
} from '../../../Components/Card';

import {OurProgressChart} from "../../../src/component/ProgressChart";

export default class GraphsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {visible: false, visible2: false, refreshing: false};
  }

  componentDidMount() {}


  PlusIcon = props => <Icon {...props} name="plus-outline" />;

  renderRightActions = () => (
    <React.Fragment>
      <TopNavigationAction
        icon={this.PlusIcon}
        onPress={() => {
          this.props.navigation.navigate('AddBankAPI');
          this.setState({visible: true});
        }}
      />
    </React.Fragment>
  );

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <TopNavigation
          title="Finansal Durumum"
          alignment="center"
          accessoryRight={this.renderRightActions}
        />
        <Divider />
        <Layout
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          {//global.cardNumber != null || this.state.visible
            true ? (
            <ScrollView
              style={GraphsStyles.listContainer}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={() => this.setState({refreshing: false})}
                />
              }>
              {global.subscriptionWarningEnabled || this.state.visible2 ? (
                <SubscriptionWarningCard />
              ) : (
                <View style={{height: 20}} />
              )}
              <Text category="h4" style={GraphsStyles.sectionTitle}>
                Aylık Birikim Degişimi
              </Text>
              <LineChart
                data={{
                  labels: ['Eylül', 'Ekim', 'Kasım', 'Aralık', 'Ocak'],
                  datasets: [
                    {
                      data: [100, 500, 500, 4750, 4500],
                    },
                  ],
                }}
                width={Dimensions.get('window').width - 40} // from react-native
                height={220}
                yAxisLabel=""
                yAxisSuffix=""
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                  backgroundColor: '#FFD6D9',
                  backgroundGradientFrom: '#FF708D',
                  backgroundGradientTo: '#DB2C66',
                  decimalPlaces: 0, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) =>
                    `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: '6',
                    strokeWidth: '2',
                    stroke: '#ffa726',
                  },
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
              />

              <View style={{height: 40}} />
              <Text category="h4" style={GraphsStyles.sectionTitle}>
                Bu Ayın Harcamaları
              </Text>
              {global.friendsAdded ? <FriendWarningCard /> : null}

              <PieChart
                data={[
                  {
                    name: 'Market',
                    amount: 600,
                    color: '#ffe0b2',
                    legendFontColor: '#ffe0b2',
                    legendFontSize: 15,
                  },
                  {
                    name: 'Eglence',
                    amount: 1000,
                    color: '#ffb74d',
                    legendFontColor: '#ffb74d',
                    legendFontSize: 15,
                  },
                  {
                    name: 'Ulasim',
                    amount: 300,
                    color: '#ff9800',
                    legendFontColor: '#ff9800',
                    legendFontSize: 15,
                  },
                  {
                    name: 'Fatura',
                    amount: 550,
                    color: '#f57c00',
                    legendFontColor: '#f57c00',
                    legendFontSize: 15,
                  },
                ]}
                width={Dimensions.get('window').width - 40}
                height={300}
                chartConfig={{
                  backgroundColor: '#e26a00',
                  backgroundGradientFrom: '#fb8c00',
                  backgroundGradientTo: '#ffa726',
                  decimalPlaces: 2, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                }}
                accessor={'amount'}
                paddingLeft={40}
                paddingRight={40}
              />

              <View style={{height: 40}} />
              <View style={{flexDirection: 'row', width: '100%'}}>
                <Text
                  category="h4"
                  style={[GraphsStyles.sectionTitle, {flex: 1}]}>
                  Harcama Alışkanlıkları
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('PastPurchasesScreen');
                    this.setState({visible2: true});
                  }}>
                  <Icon
                    style={{height: 30, width: 30}}
                    fill="#000"
                    name="arrow-forward-outline"
                  />
                </TouchableOpacity>
              </View>

              <ContributionGraph
                values={[
                  {date: '2017-01-02', count: 1},
                  {date: '2017-01-03', count: 2},
                  {date: '2017-01-04', count: 3},
                  {date: '2017-01-05', count: 4},
                  {date: '2017-01-06', count: 5},
                  {date: '2017-01-30', count: 2},
                  {date: '2017-01-31', count: 3},
                  {date: '2017-03-01', count: 2},
                  {date: '2017-04-02', count: 4},
                  {date: '2017-03-05', count: 2},
                  {date: '2017-02-30', count: 4},
                ]}
                endDate={new Date('2017-04-01')}
                numDays={105}
                width={Dimensions.get('window').width - 40}
                height={220}
                chartConfig={{
                  backgroundColor: '#ab47bc',
                  backgroundGradientFrom: '#8e24aa',
                  backgroundGradientTo: '#6a1b9a',
                  decimalPlaces: 2, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) =>
                    `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: '6',
                    strokeWidth: '2',
                    stroke: '#ffa726',
                  },
                }}
              />

              <View style={GraphsStyles.divider} />
              <Text category="h4" style={GraphsStyles.sectionTitle}>
                Birikim Hedefleri
              </Text>
              <OurProgressChart/>
              <View style={{height: 75}} />
            </ScrollView>
          ) : (
            <Text category={'h5'} style={{textAlign: 'center'}}>
              Lütfen bir bankanın API'ile bağlantı kurun.
            </Text>
          )}
        </Layout>
      </SafeAreaView>
    );
  }
}

const GraphsStyles = StyleSheet.create({
  divider: {
    height:40
  },
  listContainer: {
    flex: 1,
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
  },
  sectionTitle: {
    textAlign: 'center',
  },
});
