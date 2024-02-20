import { useEffect } from 'react';
import { QueryClientProvider } from '@tanstack/react-query'

import { Routes } from '@/routes';

import { useAuthStore } from '@/store/authStore';

import { Loading } from '@/components/Loading';

import { queryClient } from '@/services/tanstack/queryClient'
import { asyncStorage } from '@/services/storage/asyncStorage';
import { initializeStorage } from '@/services/storage/storageService';

initializeStorage(asyncStorage)

export default function App() {
  const loadUser = useAuthStore((state) => state.loadUser)
  const isLoading = useAuthStore((state) => state.isLoading)

  useEffect(() => { loadUser() }, [])

  return (
    <QueryClientProvider client={queryClient}>
      {isLoading ? <Loading /> : <Routes />}
    </QueryClientProvider>
  );
}
