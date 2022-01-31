import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Tabs from "./Tabs.js";
import Stack from "./Stack.js";

const Nav = createNativeStackNavigator();

const Root = () => <Nav.Navigator screenOptions={{headerShown : false}}>
    <Nav.Screen name="Tabs" component={Tabs}/>
    <Nav.Screen name="Stack" component={Stack}/>
</Nav.Navigator>;

export default Root;