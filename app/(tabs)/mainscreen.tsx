import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import CarouselItem from "@/components/CarouselItem";
import { Stack } from "expo-router";

interface Post {
  id: string;
  author: string;
  download_url: string;
}

const MainScreen = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [displayedPosts, setDisplayedPosts] = useState<Post[]>([]);
  const [showMoreCount, setShowMoreCount] = useState(5); // Number of additional posts to show
  const [loading, setLoading] = useState(false); // Loading state for the loader
  const postHeight = 500;

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    // Update displayed posts when 'showMoreCount' changes
    setDisplayedPosts(posts.slice(0, showMoreCount));
  }, [showMoreCount, posts]);

  const generateUniqueId = () => {
    return "_" + Math.random().toString(36).substr(2, 9);
  };

  const fetchImages = async () => {
    try {
      const response = await fetch(
        `https://picsum.photos/v2/list?limit=${showMoreCount}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }
      const data: Post[] = await response.json();

      // Assign unique IDs to posts
      const postsWithIds = data.map((post) => ({
        ...post,
        id: generateUniqueId(),
      }));

      setPosts(postsWithIds);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleLogout = () => {
    console.log("Logout button clicked!");
  };

  const handlePostPress = (postId: string) => {
    console.log("Post with ID", postId, "pressed!");
    // scrollToPost(postId);
  };

  const scrollToPost = (postId: string) => {
    if (scrollViewRef.current) {
      const index = posts.findIndex((post) => post.id === postId);
      if (index !== -1) {
        const offsetY = index * postHeight;
        scrollViewRef.current.scrollTo({ y: offsetY, animated: true });
      }
    }
  };

  const handleShowMore = async () => {
    setLoading(true); // Show loader when 'Show More' button is clicked

    // Simulate a delay of 2000 milliseconds
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      const response = await fetch(
        `https://picsum.photos/v2/list?limit=${showMoreCount + 10}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }
      const data: Post[] = await response.json();

      // Assign unique IDs to new posts
      const newPostsWithIds = data.map((post) => ({
        ...post,
        id: generateUniqueId(),
      }));

      setPosts((prevPosts) => [...prevPosts, ...newPostsWithIds]);
      setShowMoreCount((prevCount) => prevCount + 10);
    } catch (error) {
      console.error("Error fetching images:", error);
    }

    setLoading(false); // Hide loader after delay
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: "",
        }}
      />

      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Home</Text>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Ionicons name="log-out-outline" size={30} color={Colors.blue} />
          </TouchableOpacity>
        </View>
        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.carousel}>
            {displayedPosts.map((post) => (
              <CarouselItem
                key={post.id}
                post={post}
                onPress={() => handlePostPress(post.id)}
              />
            ))}
            {loading ? (
              <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={Colors.blue} />
              </View>
            ) : (
              <TouchableOpacity
                onPress={handleShowMore}
                style={styles.showMoreButton}
              >
                <Text style={styles.showMoreButtonText}>Show More</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 25,
    color: "blue",
  },
  logoutButton: {
    padding: 5,
  },
  scrollView: {
    flex: 1,
  },
  carousel: {
    alignItems: "center",
  },
  loaderContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  showMoreButton: {
    marginTop: 10,
    marginBottom: 20,
    padding: 10,
    backgroundColor: Colors.blue,
    borderRadius: 5,
    alignSelf: "center",
  },
  showMoreButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default MainScreen;
