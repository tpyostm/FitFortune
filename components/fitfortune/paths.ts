/// <reference types="vite/client" />

const configuredBase = import.meta.env.BASE_URL ?? "/";
const basePath = configuredBase === "/" ? "" : configuredBase.replace(/\/$/, "");

export function assetPath(path: string) {
  if (!path.startsWith("/") || !basePath) return path;
  return `${basePath}${path}`;
}

export function appHref(path: string) {
  if (!path.startsWith("/") || !basePath) return path;

  const target = new URL(path, "https://fitfortune.local");
  let pagePath = target.pathname;

  if (pagePath === "/exercise") {
    pagePath = target.searchParams.get("mode") === "challenge"
      ? "/exercise/challenge/"
      : "/exercise/";
    target.search = "";
  } else if (pagePath !== "/" && !pagePath.endsWith("/")) {
    pagePath += "/";
  }

  return `${basePath}${pagePath}${target.search}${target.hash}`;
}

export function navigateTo(path: string) {
  window.location.assign(appHref(path));
}

export function appShareUrl() {
  return new URL(`${basePath}/`, window.location.origin).toString();
}
