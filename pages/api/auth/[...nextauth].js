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
const GetUser = gql`
  query GetUser($username: String!) {
    userData: nextUsers(
        where: {OR:[{username: $username},{email:$username}]
      stage: DRAFT
    ) {
      id
      password
    }
  }
`;
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

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: 'your account',
      credentials: {
        username: {
          label: 'Username or email',
          type: 'text',
          placeholder: 'John_Doe/john@doe.com',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password',
        },
      },
      authorize: async ({ username, password }) => {
        const { user } = await client.request(GetUser, {
          username,
        });
        console.log({ user });

        if (!user) {
          throw new Error(`Probably You don't have an account.`);
        }

        const isValid = await compare(password, user.password);

        if (!isValid) {
          throw new Error('Wrong credentials. Try again.');
        }

        return {
          id: user.id,
          name: user.username,
          email: user.email,
        };
      },
    }),
  ],
});