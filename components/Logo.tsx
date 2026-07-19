export default function Logo() {
  return (
    <svg className="logomark" viewBox="0 0 160 145" aria-hidden="true">
      <defs>
        <linearGradient id="crownFill" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--gold-bright)" />
          <stop offset="100%" stopColor="var(--gold)" />
        </linearGradient>
      </defs>

      <g opacity={0.25} stroke="var(--purple-soft)" fill="none" strokeWidth={0.6}>
        <circle cx="80" cy="100" r="56" />
      </g>

      <path
        d="M25,88 A55,55 0 0 1 135,88"
        fill="none"
        stroke="var(--gold)"
        strokeWidth={2.2}
        strokeLinecap="round"
      />

      <path
        d="M25,88 L8,48 L44,68 L60,30 L72,60 L80,15 L88,60 L100,30 L116,68 L152,48 L135,88 Z"
        fill="url(#crownFill)"
        stroke="var(--gold-bright)"
        strokeWidth={1.4}
        strokeLinejoin="round"
      />

      <text
        x="80"
        y="118"
        fontFamily="Cormorant Garamond, serif"
        fontSize="24"
        fontWeight={700}
        fill="var(--gold)"
        letterSpacing="5"
        textAnchor="middle"
      >
        WES
      </text>
    </svg>
  )
}
