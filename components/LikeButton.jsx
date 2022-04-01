import React from 'react'
import { useSession} from 'next-auth/react'
import styles from './LikeButton.module.css'


const LikeButton = ({art}) => {

  console.log(art)
    const { data: session, status } = useSession(); 
     console.log(session);
    const loading = status === 'loading';
    if (loading) return null;




  return (
    <div>  
    {session?.user?.name ?
   <button className={styles.likeButton}>LIKE {art.artData.likes.length}</button>
      : <></>}
        </div>
        )
}

export default LikeButton