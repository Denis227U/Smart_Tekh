import path from 'path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,

  cacheComponents: true,

  sassOptions: {
    additionalData: `
      @use "@/src/app/styles/helpers/functions" as *;
      @use "@/src/app/styles/helpers/media" as *;
      @use "@/src/app/styles/helpers/mixins" as *;
      @use "@/src/app/styles/reset" as *;
    `,
  },

  // Configuration for Turbopack (dev mode)
  turbopack: {
    root: path.join(__dirname),
    rules: {
      '*.svg': {
        loaders: [
          {
            loader: '@svgr/webpack',
            options: {
              svgo: true,
              svgoConfig: {
                plugins: [
                  {
                    name: 'convertColors',
                    params: {
                      currentColor: true,
                    },
                  },
                  {
                    name: 'removeViewBox',
                    active: false,
                  },
                ],
              },
              titleProp: true,
            },
          },
        ],
        as: '*.js',
      },
    },
  },
  // Configuration for Webpack (build mode)
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgo: true,
            svgoConfig: {
              plugins: [
                { name: 'convertColors', params: { currentColor: true } },
              ],
            },
          },
        },
      ],
    });
    return config;
  },
};

export default nextConfig;
