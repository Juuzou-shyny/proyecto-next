/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true, // Ignorar errores de ESLint en la compilación
  },
};

module.exports = nextConfig;
