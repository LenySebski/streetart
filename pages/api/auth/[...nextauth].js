// import NextAuth from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import { compare, hash } from 'bcrypt';
// import { GraphQLClient, gql } from 'graphql-request';
// import GitHubProvider from 'next-auth/providers/github';

// const client = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT, {
//   headers: {
//     Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
//   },
// });
// const GetUser = gql`
//   query GetUser($user: String!) {
//     userData: nextUsers(
//       where: { email: $user, OR: { username: $user } }
//       stage: DRAFT
//     ) {
//       id
//       password
//     }
//   }
// `;
// const CreateNextUser = gql`
//   mutation CreateNextUser(
//     $username: String!
//     $email: String!
//     $password: String!
//   ) {
//     newUser: createNextUser(
//       data: { username: $username, email: $email, password: $password }
//     ) {
//       id
//     }
//   }
// `;

// export default NextAuth({
//   providers: [
//     GitHubProvider({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET,
//     }),
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         username: {
//           label: 'Email or Username',
//           type: 'text',
//           placeholder: 'john@doe.com/John_Doe',
//         },
//         password: {
//           label: 'Password',
//           type: 'password',
//           placeholder: 'Password',
//         },
//       },
//       authorize: async ({ username, password }) => {
//         const { userData } = await client.request(GetUser, {
//           user,
//         });

//         if (!user) {
//           throw new Error(`Probably You don't have an account.`);
//         }

//         const isValid = await compare(password, userData.password);

//         if (!isValid) {
//           throw new Error('Wrong credentials. Try again.');
//         }

//         return {
//           id: userData.id,
//           name: userData.username,
//           email: userData.email,
//         };
//       },
//     }),
//   ],
// });
