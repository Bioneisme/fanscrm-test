import { Api } from '../../../services/api';
import {
  GetMeResponse,
  IUserToken,
  IUser,
  LoginResponse,
} from '../types/auth.types';

export function setUserLocalStorage(user: IUser | null) {
  localStorage.setItem('u', JSON.stringify(user));
}

export function getUserLocalStorage() {
  const json = localStorage.getItem('u');

  if (!json) {
    return null;
  }

  const user = JSON.parse(json);

  return user ?? null;
}

export function setTokenLocalStorage(token: string | null) {
  localStorage.setItem('t', token ?? '');
}

export function getTokenLocalStorage() {
  return localStorage.getItem('t');
}

export async function LoginRequest(
  email: string,
  password: string,
): Promise<LoginResponse> {
  try {
    const request = await Api.post('auth/login', { email, password });
    return {
      user: request.data as IUserToken,
      error: null,
    };
  } catch (error: any) {
    return {
      error: error?.response?.data || 'Error',
      user: null,
    };
  }
}

export async function GetMeRequest(): Promise<GetMeResponse> {
  try {
    const request = await Api.get('auth/me', {
      headers: {
        Authorization: `Bearer ${getTokenLocalStorage()}`,
      },
    });

    return {
      user: request.data as IUser,
      error: null,
    };
  } catch (error: any) {
    return {
      error: error?.response?.data || 'Error',
      user: null,
    };
  }
}

export async function RegisterRequest(
  name: string,
  email: string,
  password: string,
): Promise<LoginResponse> {
  try {
    const request = await Api.post('auth/signup', { name, email, password });
    return {
      user: request.data as IUserToken,
      error: null,
    };
  } catch (error: any) {
    return {
      error: error?.response?.data || 'Error',
      user: null,
    };
  }
}
