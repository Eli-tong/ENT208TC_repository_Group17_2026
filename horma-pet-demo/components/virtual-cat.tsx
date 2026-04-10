import type { PetMood } from "@/lib/types";

type Props = {
  mood: PetMood;
  className?: string;
};

/** Per-mood fur + outline colors — shifts warmth to make states read clearly at a glance. */
const fur = {
  sick: { cream: "#ebe4df", mid: "#ddd5cf", stroke: "#9a9088" },
  tired: { cream: "#f3ecf2", mid: "#e5dae6", stroke: "#a894a6" },
  normal: { cream: "#fdf6ec", mid: "#f0e6d8", stroke: "#c4b8a8" },
  energetic: { cream: "#fff6e8", mid: "#ffeccd", stroke: "#c4a06e" },
} as const;

/** Simple vector cat — strong silhouette + face changes per energy band; still one lightweight SVG. */
export function VirtualCat({ mood, className = "" }: Props) {
  const { cream, mid, stroke } = fur[mood];
  const nose = mood === "sick" ? "#dfa99e" : "#e8a598";
  const blush = "#f5c4c0";
  const ink = "#3d3830";
  const inkMuted = "#6b6358";

  /* Posture: low states sink; energetic perks up */
  const pose = {
    sick: { dy: 10, headRy: 52, bodyCx: 100, bodyCy: 184, bodyRx: 60, bodyRy: 44 },
    tired: { dy: 6, headRy: 53, bodyCx: 100, bodyCy: 180, bodyRx: 58, bodyRy: 42 },
    normal: { dy: 0, headRy: 54, bodyCx: 100, bodyCy: 176, bodyRx: 56, bodyRy: 42 },
    energetic: { dy: -4, headRy: 54, bodyCx: 100, bodyCy: 168, bodyRx: 54, bodyRy: 38 },
  }[mood];

  const ears =
    mood === "sick" ? (
      <>
        <path d="M54 84 L38 52 L76 72 Z" fill={mid} stroke={stroke} strokeWidth={2} strokeLinejoin="round" />
        <path d="M146 84 L162 52 L124 72 Z" fill={mid} stroke={stroke} strokeWidth={2} strokeLinejoin="round" />
        <path d="M56 78 L48 58 L68 68 Z" fill="#cabfbc" opacity={0.9} />
        <path d="M144 78 L152 58 L132 68 Z" fill="#cabfbc" opacity={0.9} />
      </>
    ) : mood === "tired" ? (
      <>
        <path d="M52 80 L44 48 L78 70 Z" fill={cream} stroke={stroke} strokeWidth={2} strokeLinejoin="round" />
        <path d="M148 80 L156 48 L122 70 Z" fill={cream} stroke={stroke} strokeWidth={2} strokeLinejoin="round" />
        <path d="M54 74 L50 54 L68 64 Z" fill={mid} opacity={0.55} />
        <path d="M146 74 L150 54 L132 64 Z" fill={mid} opacity={0.55} />
      </>
    ) : mood === "energetic" ? (
      <>
        <path d="M48 70 L34 34 L78 58 Z" fill={cream} stroke={stroke} strokeWidth={2} strokeLinejoin="round" />
        <path d="M152 70 L166 34 L122 58 Z" fill={cream} stroke={stroke} strokeWidth={2} strokeLinejoin="round" />
        <path d="M50 64 L42 42 L70 56 Z" fill="#ffd89c" opacity={0.5} />
        <path d="M150 64 L158 42 L130 56 Z" fill="#ffd89c" opacity={0.5} />
      </>
    ) : (
      <>
        <path d="M52 78 L42 40 L78 66 Z" fill={cream} stroke={stroke} strokeWidth={2} strokeLinejoin="round" />
        <path d="M148 78 L158 40 L122 66 Z" fill={cream} stroke={stroke} strokeWidth={2} strokeLinejoin="round" />
        <path d="M54 72 L48 48 L70 60 Z" fill={mid} opacity={0.45} />
        <path d="M146 72 L152 48 L130 60 Z" fill={mid} opacity={0.45} />
      </>
    );

  const tail =
    mood === "sick" ? (
      <path
        d="M132 188 Q148 202 155 222 L152 226 Q140 210 128 192"
        fill="none"
        stroke={stroke}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ) : mood === "tired" ? (
      <path
        d="M136 182 Q158 198 148 218 Q140 224 130 220"
        fill="none"
        stroke={stroke}
        strokeWidth={3}
        strokeLinecap="round"
      />
    ) : mood === "energetic" ? (
      <path
        d="M128 152 Q168 110 185 72"
        fill="none"
        stroke={stroke}
        strokeWidth={3.5}
        strokeLinecap="round"
      />
    ) : (
      <path
        d="M138 168 Q170 148 178 118"
        fill="none"
        stroke={stroke}
        strokeWidth={3}
        strokeLinecap="round"
      />
    );

  const eyes =
    mood === "sick" ? (
      <>
        <path
          d="M 74 98 Q 82 90 90 98"
          fill="none"
          stroke={inkMuted}
          strokeWidth={2.5}
          strokeLinecap="round"
        />
        <path
          d="M 110 98 Q 118 90 126 98"
          fill="none"
          stroke={inkMuted}
          strokeWidth={2.5}
          strokeLinecap="round"
        />
        <ellipse cx={82} cy={102} rx={3} ry={4} fill={inkMuted} opacity={0.35} />
        <ellipse cx={118} cy={102} rx={3} ry={4} fill={inkMuted} opacity={0.35} />
      </>
    ) : mood === "tired" ? (
      <>
        <path d="M74 98 Q82 88 90 98" fill="none" stroke={ink} strokeWidth={2.8} strokeLinecap="round" />
        <path d="M110 98 Q118 88 126 98" fill="none" stroke={ink} strokeWidth={2.8} strokeLinecap="round" />
      </>
    ) : mood === "energetic" ? (
      <>
        <circle cx={80} cy={92} r={8.5} fill="#fff" />
        <circle cx={120} cy={92} r={8.5} fill="#fff" />
        <circle cx={81} cy={92} r={5} fill={ink} />
        <circle cx={121} cy={92} r={5} fill={ink} />
        <circle cx={83} cy={89} r={1.8} fill="#fff" />
        <circle cx={123} cy={89} r={1.8} fill="#fff" />
        <circle cx={70} cy={100} r={6} fill={blush} opacity={0.9} />
        <circle cx={130} cy={100} r={6} fill={blush} opacity={0.9} />
      </>
    ) : (
      <>
        <ellipse cx={83} cy={96} rx={5} ry={5.5} fill={ink} />
        <ellipse cx={117} cy={96} rx={5} ry={5.5} fill={ink} />
        <circle cx={84} cy={94} r={1.6} fill="#f5f0e8" opacity={0.95} />
        <circle cx={118} cy={94} r={1.6} fill="#f5f0e8" opacity={0.95} />
      </>
    );

  const noseMouth =
    mood === "sick" ? (
      <>
        <path d="M100 112 L94 122 L106 122 Z" fill={nose} />
        <path d="M92 128 Q100 126 108 128" fill="none" stroke="#8b7355" strokeWidth={2} strokeLinecap="round" />
      </>
    ) : mood === "tired" ? (
      <>
        <path d="M100 110 L95 118 L105 118 Z" fill={nose} opacity={0.95} />
        <path d="M94 124 Q100 122 106 124" fill="none" stroke="#8b7355" strokeWidth={1.7} strokeLinecap="round" />
      </>
    ) : mood === "energetic" ? (
      <>
        <path d="M100 110 L94 120 L106 120 Z" fill={nose} />
        <path
          d="M84 124 Q100 142 116 124"
          fill="none"
          stroke="#8b7355"
          strokeWidth={2.4}
          strokeLinecap="round"
        />
      </>
    ) : (
      <>
        <path d="M100 108 L94 118 L106 118 Z" fill={nose} />
        <path d="M90 122 Q100 130 110 122" fill="none" stroke="#8b7355" strokeWidth={2} strokeLinecap="round" />
      </>
    );

  const extras =
    mood === "sick" ? (
      <g fill="none" stroke={inkMuted} strokeWidth={1.6} strokeLinecap="round" opacity={0.65}>
        <path d="M88 72 Q100 68 112 72" />
      </g>
    ) : mood === "tired" ? (
      <g fill={inkMuted} opacity={0.35} fontSize={11} fontFamily="ui-sans-serif, system-ui" textAnchor="middle">
        <text x={152} y={44}>
          z
        </text>
        <text x={162} y={36}>
          z
        </text>
      </g>
    ) : mood === "energetic" ? (
      <g stroke="#f59e0b" strokeWidth={1.8} strokeLinecap="round">
        <path d="M162 44 L168 54 M168 44 L162 54" />
        <path d="M38 48 L44 58 M44 48 L38 58" />
        <path d="M100 28 L104 38 M108 30 L98 34" />
      </g>
    ) : null;

  const whiskers = (
    <g
      stroke={stroke}
      strokeWidth={mood === "sick" ? 1 : 1.2}
      strokeLinecap="round"
      opacity={mood === "sick" ? 0.5 : 0.88}
    >
      {mood === "sick" ? (
        <>
          <path d="M48 110 L66 108" />
          <path d="M46 118 L64 116" />
          <path d="M152 110 L134 108" />
          <path d="M154 118 L136 116" />
        </>
      ) : mood === "tired" ? (
        <>
          <path d="M46 106 L68 102" />
          <path d="M44 114 L64 112" />
          <path d="M154 106 L132 102" />
          <path d="M156 114 L136 112" />
        </>
      ) : mood === "energetic" ? (
        <>
          <path d="M44 100 L70 94" />
          <path d="M42 108 L66 104" />
          <path d="M156 100 L130 94" />
          <path d="M158 108 L134 104" />
        </>
      ) : (
        <>
          <path d="M46 104 L68 100" />
          <path d="M44 112 L66 108" />
          <path d="M154 104 L132 100" />
          <path d="M156 112 L134 108" />
        </>
      )}
    </g>
  );

  const innerShade = (
    <ellipse
      cx={pose.bodyCx}
      cy={pose.bodyCy - 4}
      rx={pose.bodyRx * 0.68}
      ry={pose.bodyRy * 0.62}
      fill={mid}
      opacity={mood === "energetic" ? 0.5 : 0.38}
    />
  );

  const t = typeof pose.dy === "number" ? pose.dy : 0;

  return (
    <svg
      viewBox="0 0 200 240"
      className={`mx-auto drop-shadow-sm ${className}`}
      role="img"
      aria-label={`Virtual cat feeling ${mood}`}
    >
      <ellipse cx={100} cy={222} rx={48} ry={9} fill="#1c1917" opacity={mood === "energetic" ? 0.06 : 0.08} />

      <g
        style={{
          transform: `translateY(${t}px)`,
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {tail}
        <ellipse
          cx={pose.bodyCx}
          cy={pose.bodyCy}
          rx={pose.bodyRx}
          ry={pose.bodyRy}
          fill={cream}
          stroke={stroke}
          strokeWidth={2}
        />
        {innerShade}

        <ellipse cx={100} cy={96} rx={56} ry={pose.headRy} fill={cream} stroke={stroke} strokeWidth={2} />
        {ears}
        {extras}
        {eyes}
        {noseMouth}
        {whiskers}
      </g>
    </svg>
  );
}
