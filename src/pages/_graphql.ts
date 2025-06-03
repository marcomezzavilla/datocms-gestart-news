import { graphql } from '~/lib/datocms/graphql';
import { TagFragment } from '~/lib/datocms/commonFragments';

import { PageInlineFragment } from '~/components/inlineRecord/PageInline/fragments';
import { PageLinkFragment } from '~/components/linkToRecord/PageLink/fragments';
import { VideoBlockFragment } from '~/components/blocks/VideoBlock/fragments';
import { ImageBlockFragment } from '~/components/blocks/ImageBlock/fragments';
import { ImageGalleryBlockFragment } from '~/components/blocks/ImageGalleryBlock/fragments';

/**
 * The GraphQL query that will be executed for this route to generate the page
 * content and metadata.
 *
 * Thanks to gql.tada, the result will be fully typed!
 */
export const query = graphql(
  /* GraphQL */ `
    query BasicPageQuery {
      page {
        _seoMetaTags {
          ...TagFragment
        }
        title
        _firstPublishedAt
        structuredText {
          value
          blocks {
            ... on RecordInterface {
              id
              __typename
            }
            ... on ImageBlockRecord {
              ...ImageBlockFragment
            }
            ... on ImageGalleryBlockRecord {
              ...ImageGalleryBlockFragment
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
            ...PageLinkFragment
            ...PageInlineFragment
          }
        }
      }
    }
  `,
  [
    TagFragment,
    ImageBlockFragment,
    ImageGalleryBlockFragment,
    VideoBlockFragment,
    PageLinkFragment,
    PageInlineFragment,
  ],
);
