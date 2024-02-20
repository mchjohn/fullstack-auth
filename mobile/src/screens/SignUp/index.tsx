import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from "react-native";

import { useSignUp } from "@/mutations/auth";

export function SignUp() {
  const { navigate } = useNavigation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { isSuccess, mutateAsync } = useSignUp()

  const handleSignUp = async () => {
    await mutateAsync({ username, password })

    if (isSuccess) {
      navigate('SignIn')
    }
  }

  const handleGoToSignIn = () => { navigate('SignIn') }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the app</Text>
      <Text style={styles.subtitle}>Sign up to continue</Text>

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

      <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkButton} activeOpacity={0.7} onPress={handleGoToSignIn}>
        <Text style={styles.linkButtonText}>Log in your account</Text>
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
