import { StyleSheet, View, ActivityIndicator } from "react-native";

export function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color='#000' size='large' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
