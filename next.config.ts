import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/resources/introducing-cofounder-2",
        destination: "/resources/introducing-automyte-2",
        permanent: true,
      },
      {
        source: "/resources/an-update-on-cofounder-1",
        destination: "/resources/an-update-on-automyte-1",
        permanent: true,
      },
      {
        source: "/resources/cofounder-1-5-seed-round",
        destination: "/resources/automyte-1-5-seed-round",
        permanent: true,
      },
      {
        source: "/resources/cofounder-partners-with-ramp-to-offer-incorporation",
        destination: "/resources/automyte-partners-with-ledgerly-to-offer-incorporation",
        permanent: true,
      },
      {
        source: "/resources/yohei-nakajima-activegraph-cofounder",
        destination: "/resources/alex-mercer-activegraph-automyte",
        permanent: true,
      },
      {
        source: "/resources/daria-ansh-veery-safer-cosmetic-dentistry",
        destination: "/resources/elena-rostova-dentalflow-case-study",
        permanent: true,
      },
      {
        source: "/how-to/resources",
        destination: "/resources",
        permanent: true,
      },
    ];
  },
};

export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // Upload a larger set of source maps for prettier stack traces
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers
  tunnelRoute: "/monitoring",
});

