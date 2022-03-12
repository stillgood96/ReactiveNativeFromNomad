import React from "react";
import {createNativeStackNavigator} from  "@react-navigation/native-stack";
import Detail from "../screens/Detail";
import { useColorScheme } from "react-native";

const NativeStack = createNativeStackNavigator();

const Stack = () => {
    const isDark = useColorScheme() === "dark";

    return(

    <NativeStack.Navigator screenOptions = {{
            headerBackTitleVisible: false,
            headerStyle : {
                backgroundColor : isDark ? "black" : "white"
            },
            headerTitleStyle : {
                color: isDark ? "white" : "black"
            },
        }}

        >
        <NativeStack.Screen name="Detail" component={Detail}/>
    </NativeStack.Navigator>)
}

export default Stack;