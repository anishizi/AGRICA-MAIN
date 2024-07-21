import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import '../styles/globals.css';
import Navbar from '../components/Navbar';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();
  const authPages = ['/login'];

  const AuthWrapper = ({ children }) => {
    const { data: session, status } = useSession();
    const isUser = !!session?.user;

    useEffect(() => {
      if (status === 'loading') return; // Do nothing while loading
      if (!isUser && !authPages.includes(router.pathname)) router.push('/login');
    }, [isUser, status, router]);

    if (status === 'loading' || (!isUser && !authPages.includes(router.pathname))) {
      return <div>Loading...</div>;
    }

    return children;
  };

  return (
    <SessionProvider session={session}>
      {router.pathname !== '/login' && <Navbar />}
      <AuthWrapper>
        <main className="pt-[100px]">
          <Component {...pageProps} />
        </main>
      </AuthWrapper>
    </SessionProvider>
  );
}

export default MyApp;
