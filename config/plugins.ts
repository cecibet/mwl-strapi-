import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  'table-field': {
    enabled: true,
  },

  meilisearch: {
    config: {
      host: env('MEILISEARCH_HOST', ''),
      apiKey: env('MEILISEARCH_API_KEY', ''),

      industry: {
        indexName: 'industries',
        entriesQuery: {
          populate: {
            popular_analyses: true,
            table_sections: true,
          },
        },
        transformEntry({ entry }) {
          return {
            id: entry.id,
            name: entry.name,
            slug: entry.slug,
            seo_title: entry.seo_title ?? '',
            shipping_address: entry.shipping_address ?? '',
            catalog_url: entry.catalog_url ?? '',
            popular_analyses_text: entry.popular_analyses
              ?.map((a: { text: string }) => a.text).join(' ') ?? '',
            table_titles: entry.table_sections
              ?.map((s: { title?: string }) => s.title ?? '').join(' ') ?? '',
            table_content: entry.table_sections
              ?.map((s: { note?: string; content?: string; clarifications?: string }) =>
                [s.note, s.content, s.clarifications].filter(Boolean).join(' ')
              ).join(' ') ?? '',
          };
        },
        settings: {
          searchableAttributes: [
            'name', 'seo_title', 'shipping_address', 'catalog_url',
            'popular_analyses_text', 'table_titles', 'table_content',
          ],
          displayedAttributes: ['id', 'name', 'slug'],
        },
      },

      'blog-post': {
        indexName: 'blog-posts',
        entriesQuery: {
          populate: { tags: true },
        },
        transformEntry({ entry }) {
          return {
            id: entry.id,
            title: entry.title,
            slug: entry.slug,
            excerpt: entry.excerpt ?? '',
            tags_text: entry.tags
              ?.map((t: { name: string }) => t.name).join(' ') ?? '',
          };
        },
        settings: {
          searchableAttributes: ['title', 'excerpt', 'tags_text'],
          displayedAttributes: ['id', 'title', 'slug', 'excerpt'],
        },
      },

      laboratory: {
        indexName: 'laboratories',
        transformEntry({ entry }) {
          return { id: entry.id, name: entry.name, slug: entry.slug };
        },
        settings: {
          searchableAttributes: ['name'],
          displayedAttributes: ['id', 'name', 'slug'],
        },
      },

      resource: {
        indexName: 'resources',
        transformEntry({ entry }) {
          return {
            id: entry.id,
            title: entry.title,
            description: entry.description ?? '',
            resource_type: entry.resource_type ?? '',
          };
        },
        settings: {
          searchableAttributes: ['title', 'description', 'resource_type'],
          displayedAttributes: ['id', 'title', 'description', 'resource_type'],
        },
      },

      video: {
        indexName: 'videos',
        transformEntry({ entry }) {
          return {
            id: entry.id,
            title: entry.title,
            description: entry.description ?? '',
            youtube_url: entry.youtube_url ?? '',
          };
        },
        settings: {
          searchableAttributes: ['title', 'description'],
          displayedAttributes: ['id', 'title', 'description', 'youtube_url'],
        },
      },

      'team-member': {
        indexName: 'team-members',
        transformEntry({ entry }) {
          return {
            id: entry.id,
            name: entry.name,
            title: entry.title ?? '',
          };
        },
        settings: {
          searchableAttributes: ['name', 'title'],
          displayedAttributes: ['id', 'name', 'title'],
        },
      },
    },
  },
});

export default config;
