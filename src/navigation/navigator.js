import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import createaccountScreen from '../screens/createaccount';
import App from '../screens/home';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
    return (
        <Stack.Navigator initialRouteName="home" screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="home"
                component={App} />
            <Stack.Screen
                name="createaccount"
                component={createaccountScreen} />
        </Stack.Navigator>
    );
}