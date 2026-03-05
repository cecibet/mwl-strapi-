import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  'table-field': {
    enabled: true,
  },

  ckeditor5: {
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
            submittal_forms: true,
            guides_resources: true,
          },
        },
        transformEntry({ entry }) {
          const stripHtml = (html?: string) =>
            html ? html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : '';
          return {
            id: entry.id,
            name: entry.name,
            slug: entry.slug,
            intro_text: stripHtml(entry.intro_text),
            submittal_forms_text: entry.submittal_forms
              ?.map((f: { label?: string }) => f.label ?? '').join(' ') ?? '',
            guides_resources_text: entry.guides_resources
              ?.map((f: { label?: string }) => f.label ?? '').join(' ') ?? '',
            sample_amount_notes: stripHtml(entry.sample_amount_notes),
          };
        },
        settings: {
          searchableAttributes: [
            'name', 'intro_text', 'submittal_forms_text',
            'guides_resources_text', 'sample_amount_notes',
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
          const stripHtml = (html?: string) =>
            html ? html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : '';
          return {
            id: entry.id,
            name: entry.name,
            slug: entry.slug,
            description: stripHtml(entry.description),
          };
        },
        settings: {
          searchableAttributes: ['name', 'description'],
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
