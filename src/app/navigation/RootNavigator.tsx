import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ShiftsListScreen, ShiftDetailsScreen } from '~/pages';

export type RootStackParamList = {
  ShiftsList: undefined;
  ShiftDetails: { shiftId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ShiftsList"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerTintColor: '#1F2937',
          headerTitleStyle: {
            fontWeight: '700',
            fontSize: 18,
          },
          headerShadowVisible: true,
          contentStyle: {
            backgroundColor: '#F8F9FA',
          },
        }}
      >
        <Stack.Screen
          name="ShiftsList"
          component={ShiftsListScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ShiftDetails"
          component={ShiftDetailsScreen}
          options={{
            title: 'Детали смены',
            headerBackTitle: 'Назад',
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
