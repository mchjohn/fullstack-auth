import { AxiosInstance } from 'axios';

import { getNewToken } from '@/utils/get-new-token';

/**
 * Interceptar uma resposta de uma requisição feita com o axios,
 * verificar se existe um erro de "Refresh Token invalid" e automaticamente
 * gerar um novo access token utilizando o refresh token.
 */
function createInterceptorToHandleRefreshToken(api: AxiosInstance) {
  api.interceptors.response.use(
    (response) => response,
    async function (error) {
      try {
        const updatedAccessToken = await getNewToken();

        // atualiza nos headers o novo token
        error.response.config.headers['Authorization'] = `Bearer ${updatedAccessToken}`;
        error.response.config.headers['access_token'] = updatedAccessToken;

        return api(error.response.config);
      } catch (err) {
        console.error('AxiosInterceptor. Error on get new token', { err });

        return Promise.reject(error);
      }
    },
  );
}

export { createInterceptorToHandleRefreshToken };
