import { useEffect } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";

import { useCourses } from "@/queries/getCourses";

import { useAuthStore } from "@/store/authStore";
import { useCourseStore } from "@/store/courseStore";

export function Home() {
  const { data, error, isLoading, refetch } = useCourses();

  const user = useAuthStore((state) => state.user);
  const courses = useCourseStore((state) => state.courses);
  const loadCourses = useCourseStore((state) => state.loadCourses);
  const signOut = useAuthStore((state) => state.signOut);

  const expiredToken = error?.message === 'Request failed with status code 401' ? 'Token expired...' : 'An erro occurred...';

  useEffect(() => {
    if (data) { loadCourses(data); }
  }, [data]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={signOut}>
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Welcome to the app</Text>

      <Text style={styles.text}>ID: {user?.id}</Text>
      <Text style={styles.text}>Username: {user?.username}</Text>

      {isLoading && <ActivityIndicator color='#000' size='large' />}

      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.text}>{item.name}</Text>
          </View>
        )}
        ListEmptyComponent={!isLoading ? <Text style={{ marginTop: 24, color: 'red' }}>{expiredToken}</Text> : null}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 22,
    fontWeight: '500',
  },
  button: {
    height: 50,
    marginVertical: 32,
    backgroundColor: '#333',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
})
