/**
 * Main App Component
 * Shorthand - React Native Shift Finder App
 *
 * @format
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StoreProvider } from './providers';
import { RootNavigator } from './navigation';

function App() {
  return (
    <StoreProvider>
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <RootNavigator />
      </SafeAreaProvider>
    </StoreProvider>
  );
}

export default App;
