import { useMutation } from "@tanstack/react-query";

import { signIn, signUp } from "@/api";
import { SignUpData, SignInData } from "@/types";
import { useNavigation } from "@react-navigation/native";

export function useSignIn() {
  return useMutation({
    mutationFn: (data: SignInData) => signIn(data),
    onError: (err: any) => { console.error(err.response.data); },
  });
}

export function useSignUp() {
  const { navigate } = useNavigation()

  return useMutation({
    mutationKey: ["SIGN_UP"],
    mutationFn: async (data: SignUpData) => signUp(data),
    onSuccess: () => { navigate('SignIn') },
    onError: (err: any) => { console.error('Error: ', err.response.data) },
  });
}
