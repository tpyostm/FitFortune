import type { NextConfig } from "next";

/**
 * `BUILD_TARGET=pages` produces the fully static bundle GitHub Pages serves.
 * The default build stays a Cloudflare Worker build — `npm test` renders
 * through it.
 *
 * The site is published from the `tpyostm.github.io` user-site repo so it is
 * served from the domain root. Serving it under a subpath instead would need
 * `basePath`, and vinext 1.0.0-beta.2 cannot combine that with
 * `output: 'export'`: the prerender server mounts routes under the basePath
 * while the prerenderer requests them without it, so every route 404s, gets
 * silently skipped as "dynamic", and no HTML is emitted.
 *
 * `trailingSlash` breaks that same step the same way — the prerenderer asks
 * for `/today`, the server answers 308 to `/today/`, and any non-2xx is
 * treated as a skip.
 */
const isPagesBuild = process.env.BUILD_TARGET === "pages";

const nextConfig: NextConfig = {
  ...(isPagesBuild ? { output: "export" } : {}),
};

export default nextConfig;
