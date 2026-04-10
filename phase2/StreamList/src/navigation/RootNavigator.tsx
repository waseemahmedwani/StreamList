import React, { type ComponentType } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { RouteProp } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
// @ts-expect-error -- react-native-vector-icons ships without TypeScript types (TS7016)
import IoniconsUntyped from 'react-native-vector-icons/Ionicons';
import { colors } from '../theme/colors';
import type {
  HomeStackParamList,
  ProfileStackParamList,
  RootTabParamList,
  SearchStackParamList,
  WatchlistStackParamList,
} from './types';

type IoniconsProps = {
  name: string;
  size?: number;
  color?: string;
};

const Ionicons = IoniconsUntyped as ComponentType<IoniconsProps>;

const Tab = createBottomTabNavigator<RootTabParamList>();
const HomeStack = createStackNavigator<HomeStackParamList>();
const SearchStack = createStackNavigator<SearchStackParamList>();
const WatchlistStack = createStackNavigator<WatchlistStackParamList>();
const ProfileStack = createStackNavigator<ProfileStackParamList>();

type DetailScreenRoute =
  | RouteProp<HomeStackParamList, 'Detail'>
  | RouteProp<SearchStackParamList, 'Detail'>
  | RouteProp<WatchlistStackParamList, 'Detail'>;

type TabBarIconProps = {
  color: string;
  size: number;
  focused: boolean;
};

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.surface,
  },
  detailScreen: {
    flex: 1,
  },
  label: {
    color: colors.on_surface,
  },
  tabBar: {
    backgroundColor: colors.surface_container,
  },
});

function PlaceholderLabel({ label }: { label: string }) {
  return (
    <View style={styles.placeholder}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

function HomeMainScreen() {
  return <PlaceholderLabel label="HomeMain" />;
}

function SearchMainScreen() {
  return <PlaceholderLabel label="SearchMain" />;
}

function WatchlistMainScreen() {
  return <PlaceholderLabel label="WatchlistMain" />;
}

function ProfileMainScreen() {
  return <PlaceholderLabel label="ProfileMain" />;
}

function DetailPlaceholderScreen({ route }: { route: DetailScreenRoute }) {
  return (
    <View
      style={styles.detailScreen}
      accessibilityLabel={`Detail movie ${String(route.params.movieId)}`}
    >
      <PlaceholderLabel label="Detail" />
    </View>
  );
}

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeMain" component={HomeMainScreen} />
      <HomeStack.Screen name="Detail" component={DetailPlaceholderScreen} />
    </HomeStack.Navigator>
  );
}

function SearchStackNavigator() {
  return (
    <SearchStack.Navigator screenOptions={{ headerShown: false }}>
      <SearchStack.Screen name="SearchMain" component={SearchMainScreen} />
      <SearchStack.Screen name="Detail" component={DetailPlaceholderScreen} />
    </SearchStack.Navigator>
  );
}

function WatchlistStackNavigator() {
  return (
    <WatchlistStack.Navigator screenOptions={{ headerShown: false }}>
      <WatchlistStack.Screen
        name="WatchlistMain"
        component={WatchlistMainScreen}
      />
      <WatchlistStack.Screen name="Detail" component={DetailPlaceholderScreen} />
    </WatchlistStack.Navigator>
  );
}

function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="ProfileMain" component={ProfileMainScreen} />
    </ProfileStack.Navigator>
  );
}

function HomeTabIcon({ color, size, focused }: TabBarIconProps) {
  return (
    <Ionicons
      name={focused ? 'home' : 'home-outline'}
      size={size}
      color={color}
    />
  );
}

function SearchTabIcon({ color, size, focused }: TabBarIconProps) {
  return (
    <Ionicons
      name={focused ? 'search' : 'search-outline'}
      size={size}
      color={color}
    />
  );
}

function WatchlistTabIcon({ color, size, focused }: TabBarIconProps) {
  return (
    <Ionicons
      name={focused ? 'bookmark' : 'bookmark-outline'}
      size={size}
      color={color}
    />
  );
}

function ProfileTabIcon({ color, size, focused }: TabBarIconProps) {
  return (
    <Ionicons
      name={focused ? 'person' : 'person-outline'}
      size={size}
      color={color}
    />
  );
}

export default function RootNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary_container,
        tabBarInactiveTintColor: colors.on_surface_variant,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{ tabBarIcon: HomeTabIcon }}
      />
      <Tab.Screen
        name="Search"
        component={SearchStackNavigator}
        options={{ tabBarIcon: SearchTabIcon }}
      />
      <Tab.Screen
        name="Watchlist"
        component={WatchlistStackNavigator}
        options={{ tabBarIcon: WatchlistTabIcon }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{ tabBarIcon: ProfileTabIcon }}
      />
    </Tab.Navigator>
  );
}
