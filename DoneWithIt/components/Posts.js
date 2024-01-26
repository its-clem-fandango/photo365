import { StatusBar } from "expo-status-bar";
import { FlatList, SafeAreaView } from "react-native";

export default function Posts() {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar,
  },
});
