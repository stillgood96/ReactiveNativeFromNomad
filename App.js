import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import { Text, Image, useColorScheme } from "react-native";
import * as Font from 'expo-font';
import {Ionicons, FontAwesome} from '@expo/vector-icons'
import { Asset, useAssets } from 'expo-asset';
import { NavigationContainer, DarkTheme, DefaultTheme } from "@react-navigation/native";
import Tabs from "./navigation/Tabs";
import Stack from "./navigation/Stack";
import Root from "./navigation/Root";
import { ThemeProvider } from "styled-components/native";
import { darkTheme, lightTheme } from "./Styled.js";
import { QueryClient, QueryClientProvider } from 'react-query'


const queryClient = new QueryClient();


export default function App() {
  const [assets, error] = useAssets([require('./images/irving.jpeg')]);
  const [loaded] = Font.useFonts(Ionicons.font);

  const isDark = useColorScheme() === "dark";
  if(!assets || !loaded) {
    return <AppLoading/>;
  }
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <NavigationContainer>
          <Root/>
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  ); 
}