import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getArts = async () => {
  const query = gql`
    query allArts {
      artsConnection {
        edges {
          node {
            active
            description
            id
            slug
            title
            geolocation {
              latitude
              longitude
            }
            image {
              url
            }
            author
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query);

  return result.artsConnection.edges;
};
