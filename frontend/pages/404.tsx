import { ALL_PROJECTS_QUERY } from '@graphql/all_projects';
import { initializeApollo } from '../src/lib/apolloClient'
import { ApolloError } from '@apollo/client';

import siteMenus from '@content/siteMenus.json'
import Page404 from "@components/templates/Page404/Component";

export default function NotFound (): JSX.Element {
  return (
    <Page404 />
  )
}

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  try {
    const result = await apolloClient.query({
      query: ALL_PROJECTS_QUERY,
    })

    return {
      props: {
        initializeApolloState: apolloClient.cache.extract(),
        basicPage: result.basicPage,
        menus: result.menus.data
      },
      revalidate: 1
    }
  } catch (error) {
    if (error instanceof ApolloError) {
      console.error('Apollo Error:', error);
    } else {
      console.error('Error:', error);
    }

    return {
      props: {
        initialApolloState: apolloClient.cache.extract(),
        menus: siteMenus.data
      },
      revalidate: 1,
    };
  }
}