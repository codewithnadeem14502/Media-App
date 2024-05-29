import Colors from "@/constants/Colors";
import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ImageData {
  id: string;
  author: string;
  download_url: string;
}

const { width: viewportWidth } = Dimensions.get("window");

const Hero = ({ value }: { value: number }) => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [showMoreCount, setShowMoreCount] = useState(0);
  const flatListRef = useRef<FlatList>(null); // Reference for FlatList

  useEffect(() => {
    fetchImages();
  }, [showMoreCount]);

  const fetchImages = async () => {
    try {
      const response = await fetch(
        `https://picsum.photos/v2/list?limit=${showMoreCount + 10}`
      );
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error(error);
    }
  };

  const scrollToImage = (index: number) => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ animated: true, index });
    }
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: ImageData | { type: string };
    index: number;
  }) => {
    if ("type" in item && item.type === "button") {
      return (
        <View style={styles.showMoreContainer}>
          <TouchableOpacity
            style={styles.showMoreButton}
            onPress={() => setShowMoreCount(showMoreCount + 10)}
          >
            <Text style={styles.showMoreText}>
              <Ionicons
                name="add-outline"
                size={20}
                color="#fff"
                style={styles.iconStyle}
              />{" "}
              Show More
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <TouchableOpacity onPress={() => scrollToImage(index)}>
        <View
          style={[
            styles.slide,
            {
              width: viewportWidth - value, // Use the dynamic value here
            },
          ]}
        >
          <Image
            source={{ uri: (item as ImageData).download_url }}
            style={styles.image}
          />
          <View style={styles.overlay}>
            <Text style={styles.overlayText}>{(item as ImageData).author}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const dataWithButton = [...images, { type: "button" }];

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef} // Set the FlatList reference
        data={dataWithButton}
        renderItem={renderItem}
        keyExtractor={(item, index) =>
          "id" in item ? item.id : `button-${index}`
        }
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carousel}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    height: 220,
  },
  carousel: {
    paddingVertical: 10,
  },
  iconStyle: {},
  slide: {
    borderRadius: 10,
    overflow: "hidden",
    marginRight: 10,
    position: "relative",
  },
  image: {
    width: "100%",
    height: 200,
  },
  overlay: {
    position: "absolute",
    bottom: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  overlayText: {
    color: "#fff",
    textAlign: "center",
  },
  showMoreContainer: {
    width: viewportWidth,
    justifyContent: "center",
    alignItems: "flex-start",
    marginHorizontal: 20,
  },
  showMoreButton: {
    backgroundColor: Colors.blue,
    width: 150,
    height: 50,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  showMoreText: {
    color: Colors.bgColor,
    fontWeight: "bold",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Hero;
