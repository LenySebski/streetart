import { GraphQLClient, gql } from 'graphql-request';
import {hash, genSalt} from 'bcrypt';


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
const {
  username, 
  password, 
  email
} = JSON.parse(req.body)


const client = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
  },
});


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
    }
  )

  
    
}