import { useEffect } from 'react';
import Protected from './components/protected';
import Public from './components/public';
import useAuth from './hooks/useAuth';

function App() {
  const { isLogin, keycloak, logout } = useAuth();

  useEffect(() => {
    if (keycloak) {
      // Suscribirse a eventos de actualización de token
      keycloak.onTokenExpired = () => {
        keycloak.updateToken(70).catch(() => {
          keycloak.login();
        });
      };
    }
  }, [keycloak]);

  if (!keycloak) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {isLogin ? (
        <Protected />
      ) : (
        <Public />
      )}
      <button onClick={logout}>Logout</button>
    </>
  );
}

export default App;
