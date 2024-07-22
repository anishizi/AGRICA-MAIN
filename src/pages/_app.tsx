import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import '../styles/globals.css'; // Import global styles

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();
  const authPages = ['/login'];

  const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
    const { data: session, status } = useSession();
    const isUser = !!session?.user;

    useEffect(() => {
      if (status === 'loading') return; // Do nothing while loading
      if (!isUser && !authPages.includes(router.pathname)) {
        router.push('/login');
      }
    }, [isUser, status, router]);

    if (status === 'loading') {
      return <div>Loading...</div>;
    }

    if (!isUser && !authPages.includes(router.pathname)) {
      return <div>Loading...</div>; // Or you can redirect to a login page immediately
    }

    return children;
  };

  return (
    <SessionProvider session={session}>
      {router.pathname !== '/login' && <Navbar />}
      <AuthWrapper>
        <main className={router.pathname === '/login' ? 'login-page-main' : 'pt-[100px]'}>
          <Component {...pageProps} />
        </main>
      </AuthWrapper>
    </SessionProvider>
  );
}

export default MyApp;
