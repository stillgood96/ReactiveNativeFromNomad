import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import { Text, Image } from "react-native";
import * as Font from 'expo-font';
import {Ionicons} from '@expo/vector-icons'
import { Asset } from 'expo-asset';


export default function App() {
  const [ready, setReady] = useState(false);
  const onFinish = () => setReady(true);
  const startLoading = async () => {
    await Font.loadAsync(Ionicons.font);
    await Asset.loadAsync(requiredI('./images/어빙.jpeg'));
    await Image.prefetch("https://cdn.rookie.co.kr/news/photo/202102/57006_58898_5351.jpg")
    
  };

  if (!ready) {
    return (
      <AppLoading
        startAsync={startLoading}
        onFinish={onFinish}
        onError={console.log}
      />
    );
  }

  return <Text>We are done loading!</Text>;
}