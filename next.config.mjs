/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cloud.appwrite.io", // 通用域名
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "fra.cloud.appwrite.io", // ✅ 新增：报错提示的这个特定区域域名
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
