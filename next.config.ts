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
};

export default nextConfig;
