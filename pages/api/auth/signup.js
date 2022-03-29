import { GraphQLClient, gql } from 'graphql-request';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const { GRAPHCMS_ENDPOINT, GRAPHCMS_TOKEN, JWT_SECRET, JWT_EXPIRES_IN } =
  process.env;
const client = new GraphQLClient(GRAPHCMS_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${GRAPHCMS_TOKEN}`,
  },
});

const CreateNextUserMutation = gql`
  mutation CreateNextUser($userData: NextUserCreateInput!) {
    createNextUser(data: $userData) {
      id
      username
      email
      token
    }
  }
`;

export default async function handler(req, res) {
  const { email, password, username } = req.body;
  if (!email || !password || !username) {
    res.status(400).end();
  }
  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  const hashedPassword = await bcrypt.hash(password, 8);
  const userData = {
    email,
    username,
    password: hashedPassword,
    token,
  };
  const response = await client.request(CreateNextUserMutation, { userData });
  if (!response?.CreateNextUser?.id) {
    res.status(500);
  }
  res.status(200).json({ token });
}
