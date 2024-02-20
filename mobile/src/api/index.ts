import axios from "axios";

import { SignInData, SignInResponse, SignUpData } from "@/types";

const api = axios.create({
  baseURL: 'http://192.168.0.107:3000',
  // baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  }
})

async function signUp(_data: SignUpData) {
  const { data } = await api.post('/users', _data)
  return data;
}

async function signIn(_data: SignInData) {
  const { data } = await api.post<SignInResponse>('/signin', _data)
  return data;
}

async function refreshToken(refresh_token: string) {
  const { data } = await api.post('/refresh-token', { refresh_token })
  return data;
}

export {
  api,
  signUp,
  signIn,
  refreshToken,
}
