import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const SearchBar = () => {
  return (
    <View style={styles.searchContainer}>
      <TextInput placeholder="Search..." style={styles.searchInput} />
      <Ionicons name="search" size={30} color={Colors.blue} />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchContainer: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 10,

    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    padding: 0,
  },
});
