import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const ProtectedRoute: React.FC<{ requiredPermissions?: string[]; children: React.ReactNode }> = ({ requiredPermissions = [], children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push(`/login?redirect=${router.asPath}`);
      return;
    }

    if (session.user.role !== 'ADMIN') {
      const hasPermission = requiredPermissions.some(permission => session.user.permissions.includes(permission));
      if (!hasPermission) {
        router.push('/');
      }
    }
  }, [router, session, status, requiredPermissions]);

  if (status === 'loading' || !session) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
