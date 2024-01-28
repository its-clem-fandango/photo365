import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { ref, getDownloadURL } from "firebase/storage";

import { fetchPosts } from "../../post-fetch";
import { storage } from "../../../firebaseConfig";

export default function Postfeed() {
  const [posts, setPosts] = useState([]);
  const [imageURLs, setImageURLs] = useState({}); // Store image URLs as an object

  useEffect(() => {
    const getPosts = async () => {
      const fetchedPosts = await fetchPosts();
      setPosts(fetchedPosts);

      const downloadURLs = {};
      await Promise.all(
        fetchedPosts.map(async (post) => {
          const imageRef = ref(storage, post.imageURL); // Use the imported storage object
          downloadURLs[post.id] = await getDownloadURL(imageRef);
        })
      );
      setImageURLs(downloadURLs); // Update state with the fetched URLs
    };

    getPosts();
  }, []);

  const renderItem = ({ item }) => {
    const postImageURL = imageURLs[item.id]; // Use the URL from the state
    return (
      <View style={styles.postContainer}>
        <Image
          source={{ uri: postImageURL }}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
    );
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  postContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginVertical: 5,
  },
  date: {
    color: "grey",
  },
});
