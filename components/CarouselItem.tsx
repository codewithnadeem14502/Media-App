import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { OnPressFunction, Post } from "@/types/post";

interface Props {
  post: Post;
  onPress: OnPressFunction;
}

const { width: screenWidth } = Dimensions.get("window");
const imageWidth = screenWidth - 20; // Subtract padding from left and right

const CarouselItem = ({ post, onPress }: Props) => {
  const [liked, setLiked] = useState(false);
  const lastTap = useRef<number | null>(null);

  const handleLikePress = () => {
    setLiked(!liked);
  };

  const handleDoubleTap = () => {
    const now = Date.now();
    if (lastTap.current && now - lastTap.current < 300) {
      setLiked(true);
    } else {
      lastTap.current = now;
    }
  };

  const handlePress = () => {
    onPress(parseInt(post.id));
    handleDoubleTap();
  };

  // Check if post and url are valid
  if (!post || !post.download_url || !post.id) {
    console.log("Invalid post data");
    return null; // Or render a placeholder/error component
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image
        source={{ uri: post.download_url }}
        style={[styles.image, { width: imageWidth, aspectRatio: 4 / 5 }]}
        onError={(error) => console.log("Image loading error:", error)}
      />

      <View style={styles.overlay}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{post.author}</Text>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity>
            <Ionicons name="person-add-outline" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="chatbubble-outline" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLikePress}>
            <Ionicons
              name={liked ? "heart" : "heart-outline"}
              size={30}
              color={liked ? "red" : "white"}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="share-social-outline" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="arrow-redo-outline" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 10,
    paddingLeft: 10,
    paddingRight: 10,
    // overflow: "hidden",
  },
  image: {
    borderRadius: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: 20,
  },
  titleContainer: {
    flex: 1,
  },
  iconContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
    marginBottom: 20,
    paddingRight: 10,
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 4,
  },
});

export default CarouselItem;
