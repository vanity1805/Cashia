import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';

import { AppProvider } from './AppContext';


// Screens
import Home from './Screens/Home';
import Form from './Screens/Form';
import Items from './Screens/Items';

const HomeStack = createNativeStackNavigator();
const FormStack = createNativeStackNavigator();
const ItemsStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Home Stack
function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#000', },
        headerTintColor: '#fff',
        contentStyle: { backgroundColor: '#FFFEF2' },
      }}
    >
      <HomeStack.Screen name="HomeMain" component={Home} options={{ title: 'cashia', 
        headerTitleStyle: {
          fontFamily: 'Cocogoose-Pro-Bold-trial', // Must match the font name you've loaded
          fontSize: 24,
        },
      }} />
    </HomeStack.Navigator>
  );
}

// Form Stack
function FormStackScreen() {
  return (
    <FormStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#000' },
        headerTintColor: '#fff',
        contentStyle: { backgroundColor: '#FFFEF2' },
      }}>
      <FormStack.Screen name="FormMain" component={Form} options={{ title: 'Form', 
      headerTitleStyle: {
          fontFamily: 'Cocogoose-Pro-Bold-trial', // Must match the font name you've loaded
          fontSize: 24,
        },
      }} />
    </FormStack.Navigator>
  );
}

// About Stack
function ItemsStackScreen() {
  return (
    <ItemsStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#000' },
        headerTintColor: '#fff',
        contentStyle: { backgroundColor: '#FFFEF2' },
      }}>
      <ItemsStack.Screen name="ItemsMain" component={Items} options={{ title: 'Items',
        headerTitleStyle: {
          fontFamily: 'Cocogoose-Pro-Bold-trial', // Must match the font name you've loaded
          fontSize: 24,
        },
      }} />
    </ItemsStack.Navigator>
  );
}

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              if (route.name === 'Home') {
                return <Feather name="home" size={size} color={color} />;
              } else if (route.name === 'Form') {
                return <AntDesign name="pluscircleo" size={size} color={color} />;
              } else if (route.name === 'Items') {
                return <Feather name="list" size={size} color={color} />;
              } else {
                return <AntDesign name="question" size={size} color={color} />;
              }
            },
            headerShown: false,
            tabBarStyle: {backgroundColor: '#000', 
                          elevation: 4,
                          borderTopWidth: 0,
                          height: 60,
                          paddingBottom: 10, 
                          paddingTop: 5,
                          },
            tabBarActiveTintColor: '#fff',
            tabBarInactiveTintColor: '#216C53',
          })}
        >
          <Tab.Screen name="Home" component={HomeStackScreen} />
          <Tab.Screen name="Form" component={FormStackScreen} options={{
            tabBarLabel: () => null, // hide label for Home only
            tabBarIcon: ({ color }) => (
                <AntDesign name="pluscircleo" size={28} color={color} />
            ),  
              tabBarItemStyle: {
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 5, // Optional: gives more spacing inside
            },
          }} />

          <Tab.Screen name="Items" component={ItemsStackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
