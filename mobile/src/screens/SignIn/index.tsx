import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from "react-native";

import { useSignIn } from "@/mutations/auth";
import { useAuthStore } from "@/store/authStore";

export function SignIn() {
  const { navigate } = useNavigation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const setUser = useAuthStore(state => state.setUser);
  const { mutateAsync } = useSignIn()

  const handleSignIn = async () => {
    const { user } = await mutateAsync({ username, password })
    setUser(user)
  }

  const handleGoToSignUp = () => { navigate('SignUp') }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the app</Text>
      <Text style={styles.subtitle}>Sign in to continue</Text>

      <TextInput
        style={styles.input}
        placeholder="User name"
        autoCapitalize="none"
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkButton} activeOpacity={0.7} onPress={handleGoToSignUp}>
        <Text style={styles.linkButtonText}>Create an account</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
  },
  input: {
    height: 50,
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
    marginTop: 20,
    paddingHorizontal: 10,
  },
  button: {
    height: 50,
    backgroundColor: '#333',
    borderRadius: 8,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  linkButton: {
    height: 50,
    borderRadius: 8,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
})
