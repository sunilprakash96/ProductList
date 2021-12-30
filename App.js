import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import store from './src/store/store';
import {Provider} from 'react-redux';
import Otp from './src/screens/otp.screen';
import FlashMessage from 'react-native-flash-message';
import Toast from "react-native-toast-message"
import Login from './src/screens/login.screen';
import Register from './src/screens/register.screen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
    <FlashMessage />
      <Toast
        position='top'
        bottomOffset={20}
      />
      <NavigationContainer>
        <FlashMessage />
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Otp" component={Otp} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
