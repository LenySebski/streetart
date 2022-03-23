import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
// Get all Art data
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

export const getArtDetails = async (slug) => {
  const query = gql`
    query getArtDetails($slug: String) {
      art(where: { slug: $slug }) {
        title
        author
        active
        description
        slug
        geolocation {
          latitude
          longitude
        }
        mainImage {
          url
        }
        image {
          url
        }
        createdAt
        categories {
          name
          slug
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.art;
};

export const getRecentArts = async () => {
  const query = gql`
    query GetRecentArts () {
      arts(orderBy: createdAt_ASC
      last:3) {
        title
        author
        slug
        mainImage{
          url
        }
        createdAt
      }
    }`;

  const result = await request(graphqlAPI, query);

  return result.arts;
};

export const getSimilarArts = async (categories, slug) => {
  const query = gql`
    query GetArtsDetails($slug: String!, $categories: [String!]) {
      arts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        title
        author
        slug
        mainImage {
          url
        }
        createdAt
      }
    }
  `;
  const result = await request(graphqlAPI, query, { categories, slug });

  return result.arts;
};

export const getCategories = async () => {
  const query = gql`
    query GetCategories() {
     categories{
       name
       slug
     }
    }`;
  const result = await request(graphqlAPI, query);

  return result.categories;
};
