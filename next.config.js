/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    MONGO_URI:
      "mongodb+srv://tushar:tushar123@cluster0.ebzef.mongodb.net/gadgets_store",
  },
};

module.exports = nextConfig;
