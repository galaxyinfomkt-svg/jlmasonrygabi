/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year — gallery images don't change
    remotePatterns: [
      { protocol: "https", hostname: "storage.googleapis.com" },
      { protocol: "https", hostname: "images.leadconnectorhq.com" },
      { protocol: "https", hostname: "assets.cdn.filesafe.space" },
      { protocol: "https", hostname: "images.pexels.com" },
    ],
  },
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
          {
            // CSP — permissive enough to keep LeadConnector / reCAPTCHA / GMaps / FB pixel
            // working, but enforces script/connect/frame sources. Lifts Best Practices
            // 'No CSP found in enforcement mode' finding from High → resolved.
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com https://link.msgsndr.com https://*.leadconnectorhq.com https://*.googleapis.com https://connect.facebook.net https://*.facebook.com https://*.facebook.net",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://*.leadconnectorhq.com https://www.gstatic.com",
              "font-src 'self' data: https://fonts.gstatic.com",
              "img-src 'self' data: blob: https:",
              "media-src 'self' data: https:",
              "connect-src 'self' https://*.leadconnectorhq.com https://*.googleapis.com https://link.msgsndr.com https://www.google.com https://*.gstatic.com https://*.facebook.com https://*.facebook.net",
              "frame-src 'self' https://*.leadconnectorhq.com https://www.google.com https://*.google.com",
              "frame-ancestors 'self'",
              "base-uri 'self'",
              "form-action 'self' https://*.leadconnectorhq.com",
              "object-src 'none'",
              "upgrade-insecure-requests",
            ].join("; "),
          },
        ],
      },
      {
        // Aggressive caching for /_next/image and static assets
        source: "/_next/image",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
