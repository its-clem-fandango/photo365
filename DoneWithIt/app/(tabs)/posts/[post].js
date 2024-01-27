import { useLocalSearchParams } from "expo-router";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { storage } from "../../../firebaseConfig"; // Import the Firebase storage
import { getStorage, ref, uploadBytes } from "firebase/storage";

export default function Postfeed() {
  const mockPosts = [
    {
      id: "1",
      title: "First Post",
      imageURL:
        "https://cdn.midjourney.com/7b6274ba-0a89-4a43-8cba-7e810c21b796/0_2.webp",
      date: "2024.01.01",
    },
    {
      id: "2",
      title: "Second Post",
      imageURL:
        "https://cdn.midjourney.com/c11cf271-89e0-4ed0-936c-bfc36be62255/0_3.webp",
      date: "2024.01.02",
    },
    {
      id: "3",
      title: "Third Post",
      imageURL:
        "https://cdn.midjourney.com/cb4d8f37-df22-4057-8d25-bff2a2902014/0_2.webp",
      date: "2024.01.03",
    },
    {
      id: "4",
      title: "Fourth Post",
      imageURL:
        "https://cdn.midjourney.com/384048aa-133c-4650-b7f8-dfa440e59aa1/0_0.webp",
      date: "2024.01.04",
    },
    {
      id: "5",
      title: "Fifth Post",
      imageURL:
        "https://cdn.midjourney.com/9db09bc6-efd6-42e5-a8d5-b4421e024af8/0_3.webp",
      date: "2024/01/05",
    },
    {
      id: "6",
      title: "Sixth Post",
      imageURL:
        "https://cdn.midjourney.com/c2972ad2-7c7e-4ff4-ba31-f9f320123cd4/0_2.webp",
      date: "2024/01/06",
    },
  ];

  const uploadTestFile = async () => {
    const testBlob = new Blob(["Hello, Firebase!"], { type: "text/plain" });
    const storageRef = ref(storage, "test/testfile.txt");

    try {
      await uploadBytes(storageRef, testBlob);
      console.log("Test file uploaded successfully");
    } catch (error) {
      console.error("Error uploading test file:", error);
    }
  };

  const { post } = useLocalSearchParams;
  return (
    <FlatList
      data={mockPosts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.postContainer}>
          <Image
            source={{ uri: item.imageURL }}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.date}>{item.date}</Text>
          <Pressable onPress={uploadTestFile}>
            <Text>Press me</Text>
          </Pressable>
        </View>
      )}
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
