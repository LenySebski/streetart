import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import useGeolocation from '../components/useGeolocation';


function AuthLinks() {  const { data: session, status } = useSession();  console.log(session);
  const loading = status === 'loading';
  if (loading) return null;

  return (    <>      {session ? (        
<p>          <span>Signed in as {session?.user?.name}</span>          <button onClick={signOut}>Sign out</button>        </p>      ) : (        <button onClick={signIn}>Sign in</button>      )}    </>  );}
export default function IndexPage() {  return <AuthLinks />;}