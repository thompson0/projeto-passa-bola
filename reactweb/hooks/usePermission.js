// hooks/usePermission.js
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export function useRequireAuth(redirectTo = '/login') {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, redirectTo, router]);
  
  return { isLoading, isAuthenticated };
}

export function useRequireRole(requiredRole, redirectTo = '/login') {
  const { role, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!isLoading && isAuthenticated && role !== requiredRole) {
      const redirectPath = role === 'jogadora' ? '/inicio-jogadora' : '/inicio';
      router.push(redirectTo || redirectPath);
    }
  }, [role, isAuthenticated, isLoading, requiredRole, redirectTo, router]);
  
  return { isLoading, isAuthenticated, hasRequiredRole: role === requiredRole };
}