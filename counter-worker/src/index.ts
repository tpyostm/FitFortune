/**
 * Counts the two /complete actions across every visitor.
 *
 * The page already kept per-browser tallies in localStorage, which can only
 * ever answer "how many times did *I* tap this". This is the shared tally.
 *
 * Deployed separately from the site — FITFORTUNE itself is static on GitHub
 * Pages and only calls this endpoint.
 */

type Action = "challenge" | "share";

const ACTIONS: readonly Action[] = ["challenge", "share"];

const ALLOWED_ORIGINS = [
  "https://tpyostm.github.io",
  "http://localhost:4500",
  "http://localhost:3000",
];

type Env = {
  DB: {
    prepare(query: string): {
      bind(...values: unknown[]): { run(): Promise<unknown>; all<T>(): Promise<{ results: T[] }> };
      all<T>(): Promise<{ results: T[] }>;
    };
  };
};

function corsHeaders(origin: string | null) {
  const allowed = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "access-control-allow-origin": allowed,
    "access-control-allow-methods": "GET, POST, OPTIONS",
    "access-control-allow-headers": "content-type",
    "access-control-max-age": "86400",
    "vary": "origin",
  };
}

function json(body: unknown, origin: string | null, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store", ...corsHeaders(origin) },
  });
}

async function readCounts(env: Env) {
  const { results } = await env.DB.prepare("SELECT action, n FROM counts").all<{ action: string; n: number }>();
  const counts: Record<Action, number> = { challenge: 0, share: 0 };
  for (const row of results) {
    if ((ACTIONS as readonly string[]).includes(row.action)) counts[row.action as Action] = row.n;
  }
  return counts;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("origin");
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (request.method === "GET" && url.pathname === "/counts") {
      return json(await readCounts(env), origin);
    }

    if (request.method === "POST" && url.pathname.startsWith("/hit/")) {
      const action = url.pathname.slice("/hit/".length);
      // Only the two known names are storable, so a stray caller cannot invent
      // rows or grow the table.
      if (!(ACTIONS as readonly string[]).includes(action)) {
        return json({ error: "unknown action" }, origin, 400);
      }

      // One statement, so concurrent taps cannot read the same value and
      // overwrite each other the way a read-then-write would.
      await env.DB
        .prepare("INSERT INTO counts (action, n) VALUES (?1, 1) ON CONFLICT(action) DO UPDATE SET n = n + 1")
        .bind(action)
        .run();

      return json(await readCounts(env), origin);
    }

    return json({ error: "not found" }, origin, 404);
  },
};
