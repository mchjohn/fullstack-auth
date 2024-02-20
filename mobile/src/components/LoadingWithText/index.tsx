import { StyleSheet, View, ActivityIndicator, Text } from "react-native";

export function LoadingWithText() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color='#000' size='large' />
      <Text style={styles.text}>Loading...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 18,
    marginLeft: 8,
    fontWeight: '500',
  },
})
