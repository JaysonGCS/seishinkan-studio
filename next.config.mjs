/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: () => {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ['pino', 'pino-pretty', 'payload'],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      // child_process: false,
      // process: false,
      // fs: false,
      // util: false,
      // http: false,
      // https: false,
      // tls: false,
      // net: false,
      // crypto: false,
      // path: false,
      // os: false,
      // stream: false,
      // zlib: false,
      // dns: false,
    };
    return config;
  },
};

export default nextConfig;
