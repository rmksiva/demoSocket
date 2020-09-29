import { StatusBar } from 'expo-status-bar';
import React, { Children } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeProvider } from "react-native-elements";
import AppHeader from './components/AppHeader';
import ProductListAsync from './components/ProductListAsync';

export default function App() {
  return (
    <View>
      <ThemeProvider>
        <AppHeader></AppHeader>
        <ProductListAsync></ProductListAsync>

      </ThemeProvider>


      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
