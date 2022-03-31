import { GraphQLClient, gql } from 'graphql-request';
import {hash, genSalt} from 'bcrypt';
import jwt from 'jsonwebtoken';
import SignUpForm from '../../../components/SignUpForm';

import React from 'react'

export default async function handler(req, res) {
 

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
console.log(typeof req.body);
const {
  username, 
  password, 
  email
} = JSON.parse(req.body)

console.log(username)
const client = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
  },
});
console.log("hello")

  const { user } = await client.request(CreateNextUser, {
    // body: JSON.stringify({
        username,
        password: await hash(password, 12),
        email,
    // }),
    headers: {
        'Content-Type': 'application/json',
    },
    method: 'POST'
    });
    

    res.status(200).json({ name: 'John Doe' })
}