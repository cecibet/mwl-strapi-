import { mergeConfig, type UserConfig } from 'vite';
import { prismjsPlugin } from 'vite-plugin-prismjs';

export default (config: UserConfig) => {
  return mergeConfig(config, {
    plugins: [
      prismjsPlugin({
        languages: ['javascript', 'css', 'markup', 'bash', 'json'],
      }),
    ],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  });
};
