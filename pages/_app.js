import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { useContext } from 'react';
import { Layout } from '../components';
import { GeolocationProvider } from '../components/context/GeolocationProvider';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
     
        <Component {...pageProps} />
    
    </SessionProvider>
  );
}

export default MyApp;
