'use client';

import { useAuthStore } from '@/lib/store/authStore';
import { useLayoutEffect } from 'react';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const gender = useAuthStore(state => state.user?.babyGender) ?? 'unknown';

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = gender;
  }, [gender]);

  return children;
}
