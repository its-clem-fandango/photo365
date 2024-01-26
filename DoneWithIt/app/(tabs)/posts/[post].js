import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function PostPage() {
  const { post } = useLocalSearchParams;
  return (
    <View>
      <Text>Post goes here - {post}</Text>
    </View>
  );
}
