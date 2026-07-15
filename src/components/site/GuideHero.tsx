import type { GuideIcon } from "@/data/guides";

interface Props {
  icon: GuideIcon;
  hue: number;
  className?: string;
  ariaLabel?: string;
}

// Free, no-AI SVG hero art. No text, no human figures.
export function GuideHero({ icon, hue, className, ariaLabel }: Props) {
  const bgLight = `hsl(${hue} 55% 22%)`;
  const bgDark = `hsl(${hue - 8} 60% 8%)`;
  const goldA = `hsl(${hue} 85% 62%)`;
  const goldB = `hsl(${hue + 6} 95% 78%)`;
  const gid = `g-${icon}-${hue}`;

  return (
    <svg
      viewBox="0 0 1280 720"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={ariaLabel}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`${gid}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={bgDark} />
          <stop offset="100%" stopColor={bgLight} />
        </linearGradient>
        <linearGradient id={`${gid}-gold`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={goldB} />
          <stop offset="100%" stopColor={goldA} />
        </linearGradient>
        <radialGradient id={`${gid}-glow`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor={goldB} stopOpacity="0.35" />
          <stop offset="100%" stopColor={goldA} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1280" height="720" fill={`url(#${gid}-bg)`} />
      <circle cx="960" cy="360" r="420" fill={`url(#${gid}-glow)`} />

      {/* Sand / horizon strokes */}
      <path
        d="M0,560 Q320,520 640,560 T1280,560 L1280,720 L0,720 Z"
        fill={goldA}
        opacity="0.08"
      />
      <path
        d="M0,610 Q400,570 800,600 T1280,610 L1280,720 L0,720 Z"
        fill={goldA}
        opacity="0.14"
      />

      {/* Dotted grid ornament */}
      <g fill={goldA} opacity="0.18">
        {Array.from({ length: 8 }).map((_, r) =>
          Array.from({ length: 20 }).map((__, c) => (
            <circle key={`${r}-${c}`} cx={80 + c * 60} cy={80 + r * 40} r="1.5" />
          )),
        )}
      </g>

      {/* Central emblem */}
      <g transform="translate(640 360)">
        <circle r="180" fill="none" stroke={goldA} strokeWidth="1.5" opacity="0.35" />
        <circle r="140" fill="none" stroke={goldA} strokeWidth="1" opacity="0.25" />
        <g transform="translate(-140 -140) scale(11.6)">
          <Icon icon={icon} fill={`url(#${gid}-gold)`} stroke={goldB} />
        </g>
      </g>
    </svg>
  );
}

function Icon({ icon, fill, stroke }: { icon: GuideIcon; fill: string; stroke: string }) {
  const common = { fill, stroke, strokeWidth: 0.6, strokeLinejoin: "round" as const };
  switch (icon) {
    case "car":
      return (
        <path
          {...common}
          d="M3 15 L4.5 10 Q5 8.5 6.5 8.5 L17.5 8.5 Q19 8.5 19.5 10 L21 15 L21 19 L18 19 L18 17.5 L6 17.5 L6 19 L3 19 Z M6.5 15 Q7.5 15 7.5 13.8 Q7.5 12.6 6.5 12.6 Q5.5 12.6 5.5 13.8 Q5.5 15 6.5 15 Z M17.5 15 Q18.5 15 18.5 13.8 Q18.5 12.6 17.5 12.6 Q16.5 12.6 16.5 13.8 Q16.5 15 17.5 15 Z"
        />
      );
    case "plane":
      return (
        <path
          {...common}
          d="M12 2 L13.5 10 L22 12 L13.5 14 L12 22 L10.5 14 L2 12 L10.5 10 Z"
        />
      );
    case "road":
      return (
        <path
          {...common}
          d="M6 3 L18 3 L21 21 L14 21 L13.5 15 L10.5 15 L10 21 L3 21 Z M11 5 L13 5 L13 8 L11 8 Z M11 10 L13 10 L13 13 L11 13 Z"
        />
      );
    case "palm":
      return (
        <path
          {...common}
          d="M12 22 L10 12 L14 12 Z M12 12 C6 10 4 6 6 4 C8 3 10 5 12 8 C14 5 16 3 18 4 C20 6 18 10 12 12 Z"
        />
      );
    case "water":
      return (
        <path
          {...common}
          d="M2 12 Q5 10 8 12 T14 12 T20 12 T22 12 L22 22 L2 22 Z M2 16 Q5 14 8 16 T14 16 T20 16 T22 16"
        />
      );
    case "sun":
      return (
        <>
          <circle {...common} cx="12" cy="12" r="5" />
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i * Math.PI) / 4;
            const x1 = 12 + Math.cos(a) * 8;
            const y1 = 12 + Math.sin(a) * 8;
            const x2 = 12 + Math.cos(a) * 10.5;
            const y2 = 12 + Math.sin(a) * 10.5;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={fill}
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            );
          })}
        </>
      );
    case "ring":
      return (
        <>
          <circle cx="12" cy="15" r="5.5" fill="none" stroke={fill} strokeWidth="1.6" />
          <path {...common} d="M9 8 L15 8 L13.5 11.5 L10.5 11.5 Z" />
        </>
      );
    case "briefcase":
      return (
        <path
          {...common}
          d="M4 8 L20 8 L20 20 L4 20 Z M9 8 L9 6 L15 6 L15 8 M4 13 L20 13"
        />
      );
    case "compass":
      return (
        <>
          <circle cx="12" cy="12" r="9" fill="none" stroke={fill} strokeWidth="1.6" />
          <path {...common} d="M12 5 L14 12 L12 19 L10 12 Z" />
          <circle cx="12" cy="12" r="1.4" fill={fill} />
        </>
      );
    case "wheel":
      return (
        <>
          <circle cx="12" cy="12" r="9" fill="none" stroke={fill} strokeWidth="1.6" />
          <circle cx="12" cy="12" r="3" fill={fill} />
          {Array.from({ length: 6 }).map((_, i) => {
            const a = (i * Math.PI) / 3;
            const x = 12 + Math.cos(a) * 8;
            const y = 12 + Math.sin(a) * 8;
            return (
              <line
                key={i}
                x1="12"
                y1="12"
                x2={x}
                y2={y}
                stroke={stroke}
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            );
          })}
        </>
      );
  }
}
