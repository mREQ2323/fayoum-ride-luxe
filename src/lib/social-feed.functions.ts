import { createServerFn } from "@tanstack/react-start";

type Meta = {
  url: string;
  platform: "instagram" | "tiktok" | "other";
  title?: string;
  description?: string;
  image?: string;
  author?: string;
};

function pick(html: string, re: RegExp): string | undefined {
  const m = html.match(re);
  return m?.[1] ? decode(m[1]) : undefined;
}
function decode(s: string) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

async function fetchTikTokOEmbed(url: string): Promise<Partial<Meta>> {
  try {
    const r = await fetch(
      `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`,
      { headers: { "user-agent": "Mozilla/5.0" } },
    );
    if (!r.ok) return {};
    const j: any = await r.json();
    return {
      title: j.title,
      image: j.thumbnail_url,
      author: j.author_name,
    };
  } catch {
    return {};
  }
}

async function fetchOG(url: string): Promise<Partial<Meta>> {
  try {
    const r = await fetch(url, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (compatible; LimousineFayoumBot/1.0; +https://www.limousinefayoum.com)",
        accept: "text/html,*/*",
      },
    });
    if (!r.ok) return {};
    const html = await r.text();
    return {
      title:
        pick(html, /<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)/i) ||
        pick(html, /<title>([^<]+)<\/title>/i),
      description: pick(
        html,
        /<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)/i,
      ),
      image: pick(
        html,
        /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)/i,
      ),
    };
  } catch {
    return {};
  }
}

export const fetchSocialMeta = createServerFn({ method: "GET" })
  .inputValidator((data: { url: string }) => data)
  .handler(async ({ data }): Promise<Meta> => {
    const url = data.url;
    const platform: Meta["platform"] = url.includes("tiktok.com")
      ? "tiktok"
      : url.includes("instagram.com")
        ? "instagram"
        : "other";

    let meta: Partial<Meta> = {};
    if (platform === "tiktok") {
      meta = await fetchTikTokOEmbed(url);
    }
    // Fallback / enrichment via OG tags
    if (!meta.image || !meta.title) {
      const og = await fetchOG(url);
      meta = { ...og, ...meta };
      if (!meta.image && og.image) meta.image = og.image;
      if (!meta.title && og.title) meta.title = og.title;
      if (!meta.description && og.description) meta.description = og.description;
    }

    return {
      url,
      platform,
      title: meta.title,
      description: meta.description,
      image: meta.image,
      author: meta.author,
    };
  });
