/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  images: {
    unoptimized: true, 
    remotePatterns: [
      {
        protocol: "https",
        hostname: "aimg.kwcdn.com",
      },
      {
        protocol: "https",
        hostname: "backend.dressfair.com",
      },
      {
        protocol: "https",
        hostname: "omsshared-images.s3.ap-southeast-1.amazonaws.com",
        pathname: "/**",
      },
      
    ],
  },
};

export default nextConfig;
