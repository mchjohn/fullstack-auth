/** Interceptar uma requisição do axios e seta o access token no header. */
import { AxiosInstance } from 'axios';

import { TOKEN_KEY } from '@/constants';
import { storageService } from '@/services/storage/storageService';

function createInterceptorToAddAccessTokenToHeader(api: AxiosInstance) {
  api.interceptors.request.use(async function (config) {
    try {
      const accessToken = await storageService.getItem<string | null>(TOKEN_KEY);

      if (!accessToken) return config;

      config.headers = {
        ...(config.headers || {}),
        Authorization: `Bearer ${accessToken}`,
        access_token: accessToken,
      };

      return config;
    } catch (error) {
      console.error('Error on createInterceptorToAddAccessTokenToHeader', { error });
      return config;
    }
  });
}

export { createInterceptorToAddAccessTokenToHeader };
