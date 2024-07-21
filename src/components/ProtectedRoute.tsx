import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const ProtectedRoute: React.FC<{ role: string; children: React.ReactNode }> = ({ role, children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') {
      return;
    }

    if (!session) {
      router.push(`/login?redirect=${router.asPath}`);
    } else if (session.user.role !== role) {
      router.push('/');
    }
  }, [router, session, status, role]);

  if (status === 'loading' || !session || session.user.role !== role) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
