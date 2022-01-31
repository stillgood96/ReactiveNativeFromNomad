import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { useColorScheme }  from "react-native";
import Movies from "../screens/Movies";
import Search from "../screens/Search";
import Tv from "../screens/Tv";
import {Ionicons} from '@expo/vector-icons';
import Stack from './Stack.js';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    const isDark = useColorScheme() === "dark";
    
    return(
        <Tab.Navigator screenOptions = {{tabBarStyle : {
            backgroundColor : isDark ? "black" : "white" },
            tabBarActiveTintColor : isDark ? "yellow" : "black",
            tabBarInactiveTintColor : isDark ? "white" : "black",
            headerStyle : {
                backgroundColor : isDark ? "black" : "white"
            },
            headerTitleStyle : {
                color: isDark ? "white" : "black"
            },
            tabBarLabelStyle : {
                marginTop: -5,
                fontSize : 12,
                fontWeight : "600"
            }
        }}>
            <Tab.Screen name="Movies" component={Movies} options={{
                tabBarIcon : ({focused, color, size}) => {
                    console.log(focused, color, size);
                    return <Ionicons name={focused ? "film" : "film-outline"} color={color} size={size}/>
                }
            }}/>
            <Tab.Screen name="Tv" component={Tv} options={{
                tabBarIcon : ({focused, color, size}) => { 
                    return <Ionicons name="tv" color={color} size={size}/>
                }  
            }}/>
            <Tab.Screen name="Search" component={Search} options={{
                tabBarIcon : ({focused, color, size}) => { 
                    return <Ionicons name={focused ? "search" : "search-outline"} color={color} size={size}/>
                }  
            }}/>
        </Tab.Navigator>
    );
}
export default Tabs; 
