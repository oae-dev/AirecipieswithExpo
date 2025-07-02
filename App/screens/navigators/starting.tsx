
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';


import { AuthcontextProvider } from '@/App/context/authcontext';
import { screens } from '../screenNames/screenNames';
import LoginScreen from '../startingScreens/LoginScreen';
import SignUpScreen from '../startingScreens/SignUpScreen';
import Splash from '../startingScreens/Splash';
import TabHome from './TabHome';



export type StackRootProps = {
  Splash: undefined,
  Login: undefined,
  SignUp: undefined,
  HomeTabs: undefined
  Detail: { recipeData: string };
}

const Stack = createStackNavigator<StackRootProps>();

const Starting = () => {
  return (
    <AuthcontextProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name={screens.Splash} component={Splash} />
          <Stack.Screen name={screens.Login} component={LoginScreen} />
          <Stack.Screen name={screens.SignUp} component={SignUpScreen} />

          <Stack.Screen name={screens.HomeTabs} component={TabHome} />
        </Stack.Navigator>
      </NavigationContainer>
      </AuthcontextProvider>
    
  );
};

export default Starting;
