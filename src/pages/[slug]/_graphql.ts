import { graphql } from '~/lib/datocms/graphql';
import { TagFragment } from '~/lib/datocms/commonFragments';
import { ImageBlockFragment } from '~/components/blocks/ImageBlock/fragments';
import { VideoBlockFragment } from '~/components/blocks/VideoBlock/fragments';
import { BlogPageInlineFragment } from '~/components/inlineRecord/BlogPageInline/fragments';
import { DocPageInlineFragment } from '~/components/inlineRecord/DocPageInline/fragments';

/**
 * The GraphQL query that will be executed for this route to generate the page
 * content and metadata.
 *
 * Thanks to gql.tada, the result will be fully typed!
 */
export const query = graphql(
  /* GraphQL */ `
    query ChangelogItem($slug: String!) {
      page: changelog(filter: { slug: { eq: $slug } }) {
        _seoMetaTags {
          ...TagFragment
        }
        title
        abstract
        createdAt
        body {
          value
          blocks {
            ... on RecordInterface {
              id
              __typename
            }
            ... on ImageBlockRecord {
              ...ImageBlockFragment
            }
            ... on VideoBlockRecord {
              ...VideoBlockFragment
            }
          }
          links {
            ... on RecordInterface {
              id
              __typename
            }
            ... on BlogPostRecord {
              ...BlogPageInlineFragment
            }
            ... on DocPageRecord {
              ...DocPageInlineFragment
            }
          }
          __typename
        }
        _firstPublishedAt
      }
    }
  `,
  [
    TagFragment,
    ImageBlockFragment,
    VideoBlockFragment,
    BlogPageInlineFragment,
    DocPageInlineFragment,
  ],
);
