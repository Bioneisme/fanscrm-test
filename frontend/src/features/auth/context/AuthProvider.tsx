import React, { createContext, useEffect, useState } from 'react';
import { IContext, IAuthProvider, IUser } from '../types/auth.types';
import {
  GetMeRequest,
  getUserLocalStorage,
  LoginRequest,
  RegisterRequest,
  setTokenLocalStorage,
  setUserLocalStorage,
} from '../utils/auth.utils';

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<IUser | null>();

  useEffect(() => {
    const user = getUserLocalStorage();

    if (user) {
      setUser(user);
    }
  }, []);

  async function authenticate(email: string, password: string) {
    const response = await LoginRequest(email, password);
    if (response?.error) {
      throw new Error(response.error?.message || response.error);
    }

    setTokenLocalStorage(response.user?.token || null);
  }

  async function register(name: string, email: string, password: string) {
    const response = await RegisterRequest(name, email, password);
    if (response?.error) {
      throw new Error(response.error?.message || response.error);
    }

    setTokenLocalStorage(response.user?.token || null);
  }

  async function getMe() {
    const response = await GetMeRequest();
    if (response?.error) {
      throw new Error(response.error?.message || response.error);
    }

    const payload = { ...response.user };

    setUser(payload);
    setUserLocalStorage(payload);
  }

  function logout() {
    setTokenLocalStorage(null);
    setUser(null);
    setUserLocalStorage(null);
  }

  return (
    <AuthContext.Provider
      value={{ ...user, authenticate, register, logout, getMe }}
    >
      {children}
    </AuthContext.Provider>
  );
};
