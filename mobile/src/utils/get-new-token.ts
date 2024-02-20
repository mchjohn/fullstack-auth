/** Módulo utilizado para obter um novo token a partir do refresh token armazenado no AsyncStorage. */
import axios from 'axios';

import { storageService } from '@/services/storage/storageService';

/** Instância criada para não precisar importar de src/api/index.ts e gerar um "dependency cycle" */
const _axiosInstance = axios.create({
  baseURL: 'http://192.168.0.107:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

/** Pega o refresh token armazenado no AsyncStorage. */
async function _getRefreshTokenFromStorage() {
  const refresh_token = await storageService.getItem<string>('@app:refreshToken');

  if (!refresh_token) {
    throw new Error('Refresh token not found on storage');
  }
  return refresh_token;
}

/** Utilizando o refresh token, bate no endpoint que gera um novo token. */
async function _generateAccessTokenUsingRefreshToken(refresh_token: string) {
  const response = await _axiosInstance.post('/refresh-token', {
    headers: {
      refresh_token: `Bearer ${refresh_token}`,
    },
  });

  const newToken = response.data?.token as string;

  if (!newToken) {
    throw new Error('Cannot get new token from API response');
  }
  return newToken;
}

/** Atualiza o valor do access token no AsyncStorage. */
async function _updateAccessTokenOnStorage(accessToken: string) {
  return storageService.setItem('@app:token', accessToken);
}

/**
 * Gera um novo token a partir do refresh token armazenado no AsyncStorage.
 * O valor do token gerado é atualizado no AsyncStorage.
 * Esta função é utilizada quando o access_token armazenado está expirado e precisa ser renovado.
 * @returns O novo token gerado.
 */
async function getNewToken() {
  try {
    const refresh_token = await _getRefreshTokenFromStorage();

    const newAccessToken = await _generateAccessTokenUsingRefreshToken(refresh_token);
    if (!newAccessToken) throw new Error('Could not get new token');

    await _updateAccessTokenOnStorage(newAccessToken);

    return newAccessToken;
  } catch (error: any) {
    const parsedError = {
      message: error.response?.data.message || error.message,
      url: `${error.response?.config.baseURL || ''}${error.response?.config.url || ''}`,
      status: error.request?.status || error.response?.data.code || '',
      headers: error.response?.config.headers || '',
    };
    console.error('Error on generate new token', parsedError);

    throw new Error(JSON.stringify(parsedError));
  }
}

export { getNewToken };
