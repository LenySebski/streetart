import React from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

import { useSession, signIn, signOut } from 'next-auth/react'


const Navbar = () =>{
  
  const { data: session, status } = useSession();  console.log(session);
  const loading = status === 'loading';
  if (loading) return null;


return  (
  <nav className={styles.container}>
    <div className="menu">
      <Link href="/">
        <a className={styles.navbarLink}>Map</a>
      </Link>
      <Link href="/gallery">
        <a className={styles.navbarLink}>Gallery</a>
      </Link>
    </div>
    {/* <Link href="/">
      <button className={styles.loginBtn}>Log in</button>
    </Link> */}

    {session ? (        
<div>
<h5 className={styles.loginInfo}> 
    Signed in as {session?.user?.name}
</h5> 
<button className={styles.loginBtn} onClick={signOut}>Sign out</button>     
</div>
  ) : (<div clas> <Link href="/signup">
<button  className={styles.loginBtn} >Sign up</button>
</Link>
<button  className={styles.loginBtn} onClick={signIn}>Sign in</button> </div> )}
  </nav>
)};

export default Navbar;
