import { groq } from "next-sanity";

/**
 * Visibilidade no site = documento Publishado no Sanity (perspective "published").
 */
const postFields = groq`
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  status,
  searchIntent,
  "likes": coalesce(likes, 0),
  "bodyText": pt::text(body),
  "author": author->{
    _id,
    name,
    bio,
    role,
    context,
    email,
    "imageUrl": image.asset->url
  },
  "category": category->{ _id, title, "slug": slug.current, description },
  "tags": tags[]->{ _id, title, "slug": slug.current },
  coverImage{
    alt,
    asset,
    "url": asset->url
  },
  seo{
    title,
    description,
    canonicalUrl,
    noIndex,
    "ogImageUrl": ogImage.asset->url
  },
  relatedLinks[]{
    label,
    href
  }
`;

const isVisiblePost = groq`_type == "post" && defined(slug.current)`;

export const postsQuery = groq`
  *[${isVisiblePost}]
  | order(publishedAt desc) {
    ${postFields}
  }
`;

export const postBySlugQuery = groq`
  *[${isVisiblePost} && slug.current == $slug][0] {
    ${postFields},
    body[]{
      ...,
      _type == "image" => {
        ...,
        "url": asset->url
      }
    }
  }
`;

export const postSlugsQuery = groq`
  *[${isVisiblePost}][].slug.current
`;

export const adjacentPostsQuery = groq`
{
  "previous": *[${isVisiblePost} && publishedAt < $publishedAt]
    | order(publishedAt desc)[0]{ title, "slug": slug.current, publishedAt },
  "next": *[${isVisiblePost} && publishedAt > $publishedAt]
    | order(publishedAt asc)[0]{ title, "slug": slug.current, publishedAt }
}
`;

export const relatedPostsQuery = groq`
  *[
    ${isVisiblePost}
    && _id != $postId
    && (
      category._ref == $categoryId
      || count((tags[]._ref)[@ in $tagIds]) > 0
    )
  ]
  | order(publishedAt desc)[0...3] {
    ${postFields}
  }
`;

export const categoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description
  }
`;

export const categoryBySlugQuery = groq`
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description
  }
`;

export const postsByCategoryQuery = groq`
  *[${isVisiblePost} && category->slug.current == $slug]
  | order(publishedAt desc) {
    ${postFields}
  }
`;

export const tagBySlugQuery = groq`
  *[_type == "tag" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current
  }
`;

export const postsByTagQuery = groq`
  *[${isVisiblePost} && $slug in tags[]->slug.current]
  | order(publishedAt desc) {
    ${postFields}
  }
`;

export const searchIndexQuery = groq`
  *[${isVisiblePost}] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    "bodyText": pt::text(body),
    "category": category->{ title, "slug": slug.current }
  }
`;

export const rssPostsQuery = groq`
  *[${isVisiblePost}] | order(publishedAt desc)[0...30] {
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    "bodyText": pt::text(body)
  }
`;
