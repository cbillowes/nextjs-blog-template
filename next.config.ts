import type { NextConfig } from 'next';
import { withContentCollections } from '@content-collections/next';
import withFlowbiteReact from 'flowbite-react/plugin/nextjs';

const nextConfig: NextConfig = {
  transpilePackages: ['flowbite-react'],
  images: {
    domains: [
      'localhost',
      process.env.SEARCH_DOMAIN?.replace(/^https?:\/\//, '') || '',
    ],
  },
};

// withContentCollections must be the outermost plugin
// const plugins = [withFlowbiteReact, withContentCollections];
withContentCollections(nextConfig);

export default withFlowbiteReact(nextConfig);
