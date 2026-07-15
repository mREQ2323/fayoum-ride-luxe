import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { useLang } from "@/i18n/LanguageContext";

// Deterministic pseudo-random from slug (stable across visits/SSR)
function seededRand(slug: string, salt: string) {
  let h = 2166136261;
  const s = slug + "|" + salt;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 100000) / 100000;
}

export function getArticleRating(slug: string) {
  const r = seededRand(slug, "rating"); // 0..1
  const value = Math.round((4.9 + r * 0.1) * 10) / 10; // 4.9 or 5.0
  const count = Math.floor(540 + seededRand(slug, "count") * (2300 - 540));
  return { value, count };
}

export function ArticleRating({ slug }: { slug: string }) {
  const { lang } = useLang();
  const isAr = lang === "ar";
  const base = getArticleRating(slug);
  const storageKey = `rating:${slug}`;

  const [voted, setVoted] = useState(false);
  const [userStars, setUserStars] = useState(0);
  const [hover, setHover] = useState(0);
  const [bonusCount, setBonusCount] = useState(0);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        setVoted(true);
        setUserStars(parsed.stars ?? 5);
      }
    } catch {}
  }, [storageKey]);

  const handleVote = (stars: number) => {
    if (voted) {
      toast.error(isAr ? "لقد قمت بالتقييم بالفعل" : "You already rated this article");
      return;
    }
    try {
      localStorage.setItem(storageKey, JSON.stringify({ stars, at: Date.now() }));
    } catch {}
    setVoted(true);
    setUserStars(stars);
    setBonusCount(1);
    toast.success(
      isAr ? `شكراً لتقييمك ${stars} نجوم!` : `Thanks for rating ${stars} stars!`,
    );
  };

  const displayValue = base.value;
  const displayCount = base.count + bonusCount;
  const filled = Math.round(displayValue);

  return (
    <div className="my-8 rounded-2xl p-5 md:p-6 bg-card gold-border">
      <div className="flex flex-wrap items-center gap-4 justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className={`size-5 ${i <= filled ? "fill-gold text-gold" : "text-gold/40"}`}
              />
            ))}
          </div>
          <div className="text-sm">
            <span className="font-bold text-foreground text-lg">
              {displayValue.toFixed(1)}
            </span>
            <span className="text-muted-foreground">
              {" "}
              {isAr ? "من 5" : "out of 5"} · {displayCount.toLocaleString(isAr ? "ar-EG" : "en-US")}{" "}
              {isAr ? "تقييم" : "ratings"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {voted
              ? isAr
                ? `تقييمك: ${userStars} نجوم`
                : `Your rating: ${userStars}`
              : isAr
                ? "قيّم المقال:"
                : "Rate this:"}
          </span>
          <div
            className="flex items-center gap-0.5"
            onMouseLeave={() => setHover(0)}
          >
            {[1, 2, 3, 4, 5].map((i) => {
              const active = voted ? i <= userStars : i <= (hover || 0);
              return (
                <button
                  key={i}
                  type="button"
                  aria-label={`${i} stars`}
                  disabled={voted}
                  onMouseEnter={() => !voted && setHover(i)}
                  onClick={() => handleVote(i)}
                  className={`p-0.5 transition-transform ${voted ? "cursor-not-allowed" : "hover:scale-125"}`}
                >
                  <Star
                    className={`size-6 ${active ? "fill-gold text-gold" : "text-gold/40"}`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
