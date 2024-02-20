import { QueryClient } from '@tanstack/react-query'

const STALE_TIME = 1000 * 60 * 60 // 60 minutes

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: STALE_TIME,
    },
  },
})
