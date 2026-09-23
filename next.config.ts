import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // /team was split into /festival-team and /advisory-board — keep old links
  // and bookmarks working instead of 404ing.
  async redirects() {
    return [{ source: "/team", destination: "/festival-team", permanent: true }];
  },
};

export default nextConfig;
