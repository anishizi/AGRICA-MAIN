import { useState, useEffect, FormEvent } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import '../styles/login.css'; // Import login-specific styles

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    document.body.classList.add('login-page');
    return () => {
      document.body.classList.remove('login-page');
    };
  }, []);

  useEffect(() => {
    if (session) {
      router.push('/');
    }
  }, [session, router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(''); // Clear any previous error messages

    if (!username || !password) {
      setErrorMessage('Veuillez saisir toutes les zones.');
      return;
    }

    const result = await signIn('credentials', {
      redirect: false,
      username,
      password,
    });

    if (result?.error) {
      console.error('Erreur de connexion:', result.error);
      setErrorMessage(result.error); // Set error message
    } else {
      router.push('/');
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (session) {
    return null; // Or a loading spinner
  }

  return (
    <div className="login-container">
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
      <div className="login-box mx-4 sm:mx-auto rounded-t-full rounded-b-lg">
        <div className="login-header">
          <img
            className="mx-auto"
            src="/1.svg"
            alt="Logo"
            style={{ width: '128px', height: '128px' }} // Doubling the original size
          />
          <h2 className="mt-6 text-2xl font-extrabold text-gray-900">
            Se connecter
          </h2>
        </div>
        <form className="form-container" onSubmit={handleSubmit}>
          {errorMessage && (
            <div className="text-red-500 text-sm mb-4">
              {errorMessage}
            </div>
          )}
          <div className="input-container">
            <div className="mb-4">
              <label htmlFor="username" className="sr-only">
                Nom d'utilisateur
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="input-field"
                placeholder="Nom d'utilisateur"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="sr-only">
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="input-field"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="submit-button"
            >
              Se connecter
            </button>
          </div>
        </form>
        <p className="text-center text-xs text-gray-500 mt-4">
          Copyright © 2024 Tous droits réservés.
        </p>
      </div>
    </div>
  );
};

export default Login;
