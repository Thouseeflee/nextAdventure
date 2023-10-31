import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TripDetails from './screens/TripDetails';
import Destination from './screens/Destination';
import CreateEditDestination from './screens/CreateEditDestination';
import CreateEditTrip from './screens/CreateEditTrip';
import Trips from './screens/Trips';

const AppNav = () => {
  const Stack = createNativeStackNavigator();
  return (

    <NavigationContainer>
      <Stack.Navigator
        screenOptions={
          {
            headerShown: false,
            contenstStyle: { backgroundColor: "#fff" }
          }
        }
      >

        <Stack.Screen name='Trips' component={Trips} />
        <Stack.Screen name='TripDetails' component={TripDetails} />
        <Stack.Screen name='CreateEditTrip' component={CreateEditTrip} />
        <Stack.Screen name='CreateEditDestination' component={CreateEditDestination} />
        <Stack.Screen name='Destination' component={Destination} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNav

const styles = StyleSheet.create({
})