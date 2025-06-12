import React, {useState, useEffect, useRef} from 'react';
import Keycloak from 'keycloak-js';

const useAuth = () => {
    const [isLogin, setLogin] = useState(false);
    const [keycloak, setKeycloak] = useState(null);
    const isRun = useRef(false);

    useEffect(() => {
        if (isRun.current) return;
        isRun.current = true;

        const client = new Keycloak({
            url: import.meta.env.VITE_KEYCLOAK_URL,
            realm: import.meta.env.VITE_KEYCLOAK_REALM, 
            clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
        });

        client.init({ 
            onLoad: 'login-required',
            checkLoginIframe: false
        }).then((authenticated) => {
            setKeycloak(client);
            setLogin(authenticated);
        }).catch((error) => {
            console.error('Failed to initialize Keycloak:', error);
            setLogin(false);
            client.logout();
        });
    }, []);

    const logout = () => {
        keycloak.logout();
    }
    
    return { isLogin, keycloak, logout };
};

export default useAuth;