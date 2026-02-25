import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Middlewares => {
  const allowedOrigins = env.array('CORS_ORIGINS', ['http://localhost:3000']);
  // Wildcard patterns, e.g. "https://*.lovable.app" — use * to match a single subdomain segment
  const allowedPatterns = env.array('CORS_ORIGIN_PATTERNS', []);

  return [
    'strapi::logger',
    'strapi::errors',
    'strapi::security',
    {
      name: 'strapi::cors',
      config: {
        origin: (ctx) => {
          const requestOrigin = ctx.request.header.origin;
          if (!requestOrigin) return false;

          // 1. Exact match against CORS_ORIGINS
          if (allowedOrigins.includes(requestOrigin)) return requestOrigin;

          // 2. Wildcard pattern match against CORS_ORIGIN_PATTERNS (e.g. "https://*.lovable.app")
          for (const pattern of allowedPatterns) {
            const escaped = pattern
              .replace(/[.+?^${}()|[\]\\]/g, '\\$&') // escape regex special chars except *
              .replace(/\*/g, '[^.]+');               // * matches one subdomain segment
            const regex = new RegExp(`^${escaped}$`);
            if (regex.test(requestOrigin)) return requestOrigin;
          }

          return false;
        },
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
        headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
        keepHeaderOnError: true,
      },
    },
    'strapi::poweredBy',
    'strapi::query',
    'strapi::body',
    'strapi::session',
    'strapi::favicon',
    'strapi::public',
  ];
};

export default config;
