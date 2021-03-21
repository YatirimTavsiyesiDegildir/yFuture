import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';
import ProfileScreen from '../Main/Profile';
import CouponsScreen from '../Main/Main/MainScreen';
import AddBankAPI from '../Main/Main/AddBankAPI';
import FriendsScreen from '../Main/Friends/Friends';
import AddFriendsScreen from '../Main/Friends/AddFriends';
import PastPurchasesScreen from '../Main/Main/PastPurchases';
import TargetScreen from '../Main/Targets/Targets';
import AddTarget from '../Main/Targets/AddTarget';

import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createBottomTabNavigator();
const Stack = createStackNavigator();

// Bottom tab icons
const PersonIcon = props => <Icon {...props} name="person" />;
const TargetIcon = props => <Icon {...props} name="radio-button-on-outline" />;
const PeopleIcon = props => <Icon {...props} name="people-outline" />;
const CouponIcon = props => <Icon {...props} name="activity-outline" />;

const CouponsStack = props => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="CouponsScreen" component={CouponsScreen} />
    <Stack.Screen name="AddBankAPI" component={AddBankAPI} />
    <Stack.Screen name="PastPurchasesScreen" component={PastPurchasesScreen} />
  </Stack.Navigator>
);

const TargetStack = props => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="TargetScreen" component={TargetScreen} />
    <Stack.Screen name="AddTarget" component={AddTarget} />

  </Stack.Navigator>
);

const FriendsStack = props => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="FriendsScreen" component={FriendsScreen} />
    <Stack.Screen name="AddFriendsScreen" component={AddFriendsScreen} />
  </Stack.Navigator>
);

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab icon={PeopleIcon} />
    <BottomNavigationTab icon={TargetIcon} />
    <BottomNavigationTab icon={CouponIcon} />
    <BottomNavigationTab icon={PersonIcon} />
  </BottomNavigation>
);

const TabNavigator = props => (
  <Navigator tabBar={props => <BottomTabBar {...props} />}>
    <Screen name="FriendsScreen" component={FriendsStack} />
    <Screen name="TargetScreen" component={TargetStack} />
    <Screen name="CouponsScreen" component={CouponsStack} />
    <Screen
      name="ProfileScreen"
      component={ProfileScreen}
      initialParams={{
        mainFunctions: { logout: () => props.mainFunctions.logout() },
      }}
    />
  </Navigator>
);

const MainNavigator = props => (
  <NavigationContainer>
    <TabNavigator
      mainFunctions={{
        logout: () => props.mainFunctions.logout(),
      }}
    />
  </NavigationContainer>
);

export default MainNavigator;
