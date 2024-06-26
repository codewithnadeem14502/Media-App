import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import MainScreen from "./mainscreen";
import ProfileScreen from "./profile";
import SearchScreen from "./search";

const Tab = createBottomTabNavigator();

const CustomTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        let iconName: "home" | "search" | "user" = "home"; // Initialize with a default value

        if (route.name === "index") {
          iconName = "home";
        } else if (route.name === "search") {
          iconName = "search";
        } else if (route.name === "profile") {
          iconName = "user";
        }

        const color = isFocused ? Colors.blue : "#999";

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tab}
          >
            <FontAwesome name={iconName} size={30} color={color} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const Layout = () => {
  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
      <Tab.Screen name="search" component={SearchScreen} />
      <Tab.Screen name="index" component={MainScreen} />
      <Tab.Screen name="profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default Layout;

// Styles
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: Colors.bgColor,
    paddingHorizontal: 20,
  },
  tab: {
    alignItems: "center",
    paddingVertical: 10,
  },
});
