import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare, hash } from 'bcrypt';
import { GraphQLClient, gql } from 'graphql-request';
import GitHubProvider from 'next-auth/providers/github';

const client = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
  },
});

const GetUserByEmail = gql`
   query GetUser($username: String!) {
     user: nextUsers(
         where: {OR:[{username: $username},{email:$username}]}
        
    ) {
       id
      username
      email
      password
      
     }
   }
`;

// const GetUser = gql`
//   query GetUser($username: String!) {
//     userData: nextUsers(
//         where: {OR:[{username: $username},{email:$username}]
//       stage: DRAFT
//     ) {
//       id
//       password
//     }
//   }
// `;
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

const options={
  theme: {
    colorScheme: "auto", // "auto" | "dark" | "light"
    brandColor: "#ccff02", // Hex color value
    logo: "" // Absolute URL to logo image
  }}

export default NextAuth({
  theme: {
    colorScheme: "auto", // "auto" | "dark" | "light"
    brandColor: "#ccff02", // Hex color value
    logo: "",}, // Absolute URL to logo image,
  providers: [
    CredentialsProvider({
      name: 'your account',
      credentials: {
        username: {
            label: "Username",
            type: "text",
            placeholder: "jamie@graphcms.com"
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password',
        },
    },
      authorize: async ({ username, password }) => {
        const { user } = await client.request(GetUserByEmail, {
          username,
                 });
      
        if (user[0]) {
            console.error('ERROR')

        //   const { newUser } = await client.request(
        //     CreateNextUserByEmail,
        //     {
        //       email,
        //       password: await hash(password, 12),
        //     }
        //   );
      
        //   return {
        //     id: newUser.id,
        //     username: email,
        const isValid = await compare(password, user[0].password);
    
        if (!isValid) {
         return null
        
        }
      
        return {
          name:user[0].username,
          email:user[0].email,
        };
        //     email,
        //   };
        } else {
            return null
        }
        
      },
      
    }),
  ],
});