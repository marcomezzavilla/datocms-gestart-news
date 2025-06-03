import { graphql } from '~/lib/datocms/graphql';
import { TagFragment } from '~/lib/datocms/commonFragments';

/**
 * The GraphQL query that will be executed for this route to generate the page
 * content and metadata.
 *
 * Thanks to gql.tada, the result will be fully typed!
 */
export const query = graphql(
  /* GraphQL */ `
    query BasicPageQuery {
      page: changelogPage {
        _seoMetaTags {
          ...TagFragment
        }
        title
        _firstPublishedAt
      }
      changelogs: allChangelogs {
        id
        title
        _firstPublishedAt
      }
    }
  `,
  [TagFragment],
);
