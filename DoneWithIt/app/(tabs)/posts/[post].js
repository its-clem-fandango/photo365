import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { ref, getDownloadURL } from "firebase/storage";

import { fetchPosts } from "../../post-fetch";
import { storage } from "../../../firebaseConfig";

export default function Postfeed() {
  const [posts, setPosts] = useState([]);
  const [imageURLs, setImageURLs] = useState({}); // Store image URLs as an object

  /*   const staticPosts = [
    {
      id: 1,
      title: "Post 1",
      imageURL:
        "https://firebasestorage.googleapis.com/v0/b/donewithit-912b6.appspot.com/o/images%2F2024-01-28T20%3A24%3A23.583Z?alt=media&token=2bced0ca-f601-4d11-b6e3-171326a8cf0e",
    },
    {
      id: 2,
      title: "Post 2",
      imageURL:
        "https://cdn.midjourney.com/4cd2c8b7-4cde-4f66-ab45-681706e9c470/0_1.webp",
    },
    {
      id: 3,
      title: "Post 3",
      imageURL:
        "https://cdn.midjourney.com/876eacf5-938a-4a28-a2f2-bea427cca7fc/0_2.webp",
    },
    {
      id: 4,
      title: "Post 4",
      imageURL:
        "https://cdn.midjourney.com/198f32a6-b89c-4686-9c82-829506df4e4f/0_3.webp",
    },
    {
      id: 5,
      title: "Post 5",
      imageURL:
        "https://cdn.midjourney.com/23eb1e77-0873-476f-8eba-716625922a1a/0_1.webp",
    },
  ];
 */
  useEffect(() => {
    const getPosts = async () => {
      const fetchedPosts = await fetchPosts();
      setPosts(fetchedPosts);

      const downloadURLPromises = fetchedPosts.map(async (post) => {
        const imageRef = ref(storage, post.imageURL); // Use the imported storage object
        const downloadURL = await getDownloadURL(imageRef);
        return { id: post.id, url: downloadURL };
      });

      const downloadURLs = await Promise.all(downloadURLPromises);

      // Convert array to object with id as key and URL as value
      const urlsObject = downloadURLs.reduce((acc, item) => {
        acc[item.id] = item.url;
        return acc;
      }, {});

      setImageURLs(urlsObject);
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
      data={posts} //change to posts
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
