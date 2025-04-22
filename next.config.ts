/** @type {import('next').NextConfig} */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Desabilitar ESLint durante build na Vercel
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
