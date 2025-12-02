import type { NextConfig } from 'next';
import { withContentCollections } from '@content-collections/next';
import withFlowbiteReact from 'flowbite-react/plugin/nextjs';

const nextConfig: NextConfig = {
  transpilePackages: ['flowbite-react'],
};

// withContentCollections must be the outermost plugin
// const plugins = [withFlowbiteReact, withContentCollections];
withContentCollections(nextConfig);

export default withFlowbiteReact(nextConfig);
