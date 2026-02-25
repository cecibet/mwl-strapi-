import type { StrapiApp } from '@strapi/strapi/admin';

export default {
  config: {
    locales: [],
    translations: {
      en: {
        // Industry content type — field labels
        "hero_image": "Hero / Banner Image",
        "page_image": "Page Card Image",
        "intro_text": "Intro Text",
        "popular_analyses": "Popular Analyses (bullet list)",
        "submittal_forms": "Submittal Forms",
        "guides_resources": "Guides & Resources",
        "sample_amount_notes": "Sample Amount Notes",
        "shipping_address": "Shipping Address",
        "table_sections": "Pricing / Analysis Tables",
        "catalog_url": "Catalog PDF URL",
        "seo_title": "SEO Title",
        "seo_description": "SEO Description",

        // Table Section component — field labels
        "note": "Intro Note",
        "content": "Table Content (Markdown)",
        "clarifications": "Footnotes / Clarifications",
      },
    },
  },
  bootstrap(app: StrapiApp) {},
};
