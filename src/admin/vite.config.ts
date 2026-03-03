import { mergeConfig, type UserConfig } from 'vite';
import { pluginPrismjs } from 'vite-plugin-prismjs';

export default (config: UserConfig) => {
  return mergeConfig(config, {
    plugins: [
      pluginPrismjs({
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
