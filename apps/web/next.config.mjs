/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
     remotePatterns: [
      {
        hostname: "fakestoreapi.com",
        protocol: "https",
      },
      {
        hostname: "placehold.co",
        protocol: "https",
      }
    ],
  }
};

export default nextConfig;
