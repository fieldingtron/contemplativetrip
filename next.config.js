/** @type {import('next').NextConfig} */

const domains = (process.env.DOMAIN_URLS || "")
  .split(",")
  .map((domain) => domain.trim())
  .filter(Boolean);

module.exports = {
  reactStrictMode: true,
  images: {
    deviceSizes: [320, 420, 768, 1024, 1200],
    qualities: [100, 75],
    loader: "default",
    remotePatterns: domains.map((domain) => ({
      protocol: "https",
      hostname: domain,
      pathname: "/**",
    })),
  },
};
