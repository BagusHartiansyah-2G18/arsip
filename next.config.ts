import type { NextConfig } from "next";
// import { withMicrofrontends } from '@vercel/microfrontends/next/config';
// import { withVercelToolbar } from '@vercel/toolbar/plugins/next';

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb'
    },
    useLightningcss: true,
    optimizePackageImports: []
  },
  typedRoutes: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '172.222.8.105',
        port: '1907',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'peaceful-api.sumbawabaratkab.go.id',
        pathname: '/uploads/**',
      },
      // Add support for environment-based API URLs
      ...(process.env.NEXT_PUBLIC_API_BASE_URL ? [
        {
          protocol: new URL(process.env.NEXT_PUBLIC_API_BASE_URL).protocol.replace(':', '') as 'http' | 'https',
          hostname: new URL(process.env.NEXT_PUBLIC_API_BASE_URL).hostname,
          port: new URL(process.env.NEXT_PUBLIC_API_BASE_URL).port || undefined,
          pathname: '/uploads/**',
        }
      ] : []),
    ],
  },
   eslint: {
    ignoreDuringBuilds: true,
  },

};

export default nextConfig
export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/profile/:path*"],
};


// export default withVercelToolbar()(
//   withMicrofrontends(nextConfig, { debug: true }),
// );
