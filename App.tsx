import React from 'react';
import { useFonts } from "expo-font";
import { Inter_400Regular, Inter_500Medium } from "@expo-google-fonts/inter";
import { Rajdhani_500Medium, Rajdhani_700Bold } from "@expo-google-fonts/rajdhani";
import AppLoading from "expo-app-loading";
import { StatusBar, LogBox } from 'react-native';

import { AuthProvider } from "./src/hooks/auth";

import { Background } from "./src/components/Background";

import { Routes } from './src/routes'

LogBox.ignoreLogs(['https://auth.expo.io/@anonymous/gameplay-3a91fa68-277e-40d1-bc0f-be9000c727bf']);
export default function App() {

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Rajdhani_500Medium,
    Rajdhani_700Bold
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <Background>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </Background>
  );
}