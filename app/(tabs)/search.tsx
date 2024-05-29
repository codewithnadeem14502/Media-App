import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import Colors from "@/constants/Colors";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";

const Search = () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: "",
        }}
      />

      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Discover the world</Text>
          <SearchBar />
          <Hero value={60} />
          <Text style={styles.title}>Trending Hastags</Text>
          <Hero value={220} />
          <Text style={styles.title}>Top Community</Text>
          <Hero value={220} />
        </View>
      </ScrollView>
    </>
  );
};

export default Search;

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingTop: 50,
    marginHorizontal: 10,
    paddingHorizontal: 5,
  },
  title: {
    fontSize: 25,
    color: Colors.blue,
    marginBottom: 10,
    marginTop: 20,
  },
});
