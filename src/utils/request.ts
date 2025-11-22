// frontend/src/utils/request.ts
import { http, isHttpError } from 'tosslib';

const BASE_URL = 'http://localhost:5173';

// tosslib의 http를 래핑한 request 함수
export const request = async <T>(
  path: string,
  config?: {
    method?: 'get' | 'post' | 'delete' | 'patch';
    json?: unknown;
    headers?: Record<string, string>;
  }
): Promise<T> => {
  try {
    const url = `${BASE_URL}${path}`;
    const method = config?.method || 'get';

    const response = await http[method]<T>(url, {
      json: config?.json,
      headers: {
        ...config?.headers,
      },
    });

    return response;
  } catch (error) {
    if (isHttpError(error)) {
      console.error(error);
      throw error;
    } else {
      console.error(error);
      throw new Error('알 수 없는 에러입니다.');
    }
  }
};
