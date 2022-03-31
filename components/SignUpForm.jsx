import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
// import { signIn } from 'next-auth/react';
//import { compare, hash } from 'bcrypt';
import { GraphQLClient, gql } from 'graphql-request';
// import styles from './SignUpForm.module.css';
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
  const callbackURL = 'http://localhost:3000/sign-in';

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

        fetch("http://localhost:3000/api/auth/signup", {
            method: "POST", 
            body: JSON.stringify (
                data
            )
        }).then(response=>{console.log(response);
        if (response.status==200) {
            router.push('/')
    }   if (response.status===500){ 
        console.log('ERRRRORO')
    }

})
    } catch (error) {
        console.log({error})
    }
};

      


  return (
    <form onSubmit={(e)=>handleSubmit(onSubmit, onError)(e).catch((e)=>{console.log({e})})} className="">
      <div>
        <label htmlFor="username" className="">
          Username
        </label>
        <div className="">
          <input
            {...register('username', { required: true })}
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            className=""
          />
        </div>
        {errors.email && <span className="">This field is required</span>}
      </div>
      <div>
        <label htmlFor="email" className="">
          Email
        </label>
        <div className="">
          <input
            {...register('email', { required: true })}
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className="a"
          />
        </div>
        {errors.email && <span className="">This field is required</span>}
      </div>

      <div>
        <label htmlFor="password" className="">
          Password
        </label>
        <div className="">
          <input
            {...register('password', { required: true })}
            id="password"
            name="password"
            type="password"
            autoComplete="email"
            className=""
          />
        </div>
        {errors.password && <span className="">This field is required</span>}
      </div>

      <div>
        <button type="submit" className="signupBtn" disabled={loading}>
          Create free account
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;