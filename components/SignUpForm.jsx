import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
// import { signIn } from 'next-auth/react';
//import { compare, hash } from 'bcrypt';
import { GraphQLClient, gql } from 'graphql-request';
import styles from './SignUpForm.module.css';
import { useRouter } from 'next/router';


const SignUpForm =  () => {

    const router = useRouter()

  const CreateNextUser = gql`
    mutation CreateNextUser(
      $username: String!
      $email: String!
      $password: String!
    ) {
      newUser: createNextUser(
        data: { username: $username, email: $email, password: $password }
      ) {
        id
      }
    }
  `;

//   const client = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT, {
//     headers: {
//       Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
//     },
//   });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onError = (errors, e) => console.log('HI THEREEEE!');
  const  onSubmit = async  (data, e) => postUser(data);

  const postUser = async (data) => {
      const {
         username, 
         password, 
         email 
      } = data
    try {
        // const { user } = await client.request(CreateNextUser, {
        // body: JSON.stringify({
        //     username,
        //     password: await hash(password, 12),
        //     email,
        // }),
        // headers: {
        //     'Content-Type': 'application/json',
        // },
        // method: 'POST'
        // });
        //   return {
        //     id: user.id,
        //     username,
        //     email,
        //   };

        fetch("/api/auth/signup", {
            method: "POST", 
            body: JSON.stringify (
                data
            )
        }).then(response=>{console.log(response);
        if (response.status==200) {
            router.push('/api/auth/signin')
            
           
    }   
})
    } catch (error) {
        console.log({error})
    }
};

      


  return (<div className={styles.card}>
      <h3 className={styles.header}>Sign Up</h3>
    <form onSubmit={(e)=>handleSubmit(onSubmit, onError)(e).catch((e)=>{console.log({e})})} className={styles.form}>
      <div >
        <label htmlFor="username" className={styles.label}>
          Username
        </label>
        <div className="">
          <input
            {...register('username', { required: true })}
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            className={styles.input}
          />
        </div>
        {errors.email && <span className="">This field is required</span>}
      </div>
      <div>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <div className="">
          <input
            {...register('email', { required: true })}
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className={styles.input}
          />
        </div>
        {errors.email && <span className="">This field is required</span>}
      </div>

      <div>
        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <div className="">
          <input
            {...register('password', { required: true })}
            id="password"
            name="password"
            type="password"
            autoComplete="email"
            className={styles.input}
          />
        </div>
        {errors.password && <span className="">This field is required</span>}
      </div>

      <div>
        <button type="submit" className={styles.button} disabled={loading}>
          Create free account
        </button>
      </div>
    </form>
    </div>
  );
};

export default SignUpForm;