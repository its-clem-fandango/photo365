import { Camera } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  SafeAreaView,
  Image,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import { shareAsync } from "expo-sharing";
import { StatusBar } from "expo-status-bar";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebaseConfig";

import { createPost } from "../post-fetch";

export default function HomePage() {
  let cameraRef = useRef(null);
  const [hasCameraPermission, setHascameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      setHascameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: true,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);

    try {
      // Convert the image to a blob
      const response = await fetch(newPhoto.uri);
      const blob = await response.blob();

      // Get the storage reference and upload the image
      const imageRef = ref(storage, `images/${new Date().toISOString()}`);
      await uploadBytes(imageRef, blob);
      console.log("Image uploaded successfully");

      // Get the download URL after the image is uploaded
      const downloadURL = await getDownloadURL(imageRef);
      console.log(downloadURL);
      // Prepare post data
      const postData = {
        title: "New Post",
        imageURL: downloadURL,
      };

      // Send the post data to your backend
      console.log(postData);
      const postResponse = await createPost(postData);
      console.log("Post Created", postResponse);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  if (photo) {
    let sharePic = () => {
      shareAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    return (
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.preview}
          source={{ uri: "data:image/jpg;base64," + photo.base64 }}
        />
        <Button title="Share" onPress={sharePic} />
        {hasMediaLibraryPermission ? (
          <Button title="Save" onPress={savePhoto} />
        ) : undefined}
        <Button title="Discard" onPress={() => setPhoto(undefined)} />
      </SafeAreaView>
    );
  }
  return (
    <Camera
      style={styles.container}
      ref={cameraRef}
      autoFocus={Camera.Constants.AutoFocus.on}
    >
      <View style={styles.buttonContainer}>
        <Button title="Take Pic" onPress={takePic} />
      </View>
      <StatusBar style="auto" />
    </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    backgroundColor: "white",
    alignSelf: "flex-end",
  },
  preview: {
    alignSelf: "stretch",
    flex: 1,
  },
});

/*   <Link href="/posts/1">go to post 1</Link>
      <Pressable onPress={() => router.push("/posts/2)")}>
        <Text>Go to Post 2</Text>
      </Pressable> */
