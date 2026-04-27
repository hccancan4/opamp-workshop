import type { CircuitType } from '../../lib/simulator';

export function InvertingSVG() {
  return (
    <svg viewBox="0 0 460 260" aria-hidden="true">
      <path d="M 200,85 L 200,195 L 295,140 Z" className="component"/>
      <text x="212" y="112" className="slabel" fontWeight="600">−</text>
      <text x="212" y="178" className="slabel" fontWeight="600">+</text>
      <path d="M 240,103 L 240,75" stroke="var(--ink-muted)" strokeWidth="1" strokeDasharray="2 3" fill="none"/>
      <path d="M 240,176 L 240,205" stroke="var(--ink-muted)" strokeWidth="1" strokeDasharray="2 3" fill="none"/>
      <text x="246" y="72" className="slabel" fontSize="10" fill="var(--ink-muted)">+Vcc</text>
      <text x="246" y="215" className="slabel" fontSize="10" fill="var(--ink-muted)">−Vee</text>
      <path d="M 20,110 L 60,110" className="wire-in"/>
      <circle cx="20" cy="110" r="3" fill="var(--volt)"/>
      <text x="15" y="103" className="sval" textAnchor="end">Vin</text>
      <path d="M 60,110 L 66,110 L 70,100 L 78,120 L 86,100 L 94,120 L 102,100 L 110,120 L 114,110 L 120,110" className="wire-in"/>
      <text x="90" y="94" className="sval" textAnchor="middle">Rin</text>
      <path d="M 120,110 L 200,110" className="wire-in"/>
      <circle cx="160" cy="110" r="3.5" fill="var(--ink)"/>
      <path d="M 160,110 L 160,40 L 215,40" className="wire"/>
      <path d="M 215,40 L 221,40 L 225,30 L 233,50 L 241,30 L 249,50 L 257,30 L 265,50 L 269,40 L 275,40" className="wire"/>
      <text x="245" y="26" className="slabel" textAnchor="middle">Rf</text>
      <path d="M 275,40 L 350,40 L 350,140" className="wire"/>
      <circle cx="350" cy="140" r="3.5" fill="var(--ink)"/>
      <path d="M 200,170 L 170,170 L 170,215" className="wire"/>
      <g stroke="var(--ink)" strokeWidth="1.5" fill="none">
        <path d="M 158,215 L 182,215"/>
        <path d="M 163,221 L 177,221"/>
        <path d="M 168,227 L 172,227"/>
      </g>
      <path d="M 295,140 L 420,140" className="wire-out"/>
      <circle cx="420" cy="140" r="3" fill="var(--copper)"/>
      <text x="425" y="133" className="svout">Vout</text>
    </svg>
  );
}

export function NonInvertingSVG() {
  return (
    <svg viewBox="0 0 460 260" aria-hidden="true">
      <path d="M 200,85 L 200,195 L 295,140 Z" className="component"/>
      <text x="212" y="112" className="slabel" fontWeight="600">−</text>
      <text x="212" y="178" className="slabel" fontWeight="600">+</text>
      <path d="M 240,103 L 240,75" stroke="var(--ink-muted)" strokeWidth="1" strokeDasharray="2 3" fill="none"/>
      <path d="M 240,176 L 240,205" stroke="var(--ink-muted)" strokeWidth="1" strokeDasharray="2 3" fill="none"/>
      <text x="246" y="72" className="slabel" fontSize="10" fill="var(--ink-muted)">+Vcc</text>
      <text x="246" y="215" className="slabel" fontSize="10" fill="var(--ink-muted)">−Vee</text>
      <path d="M 20,170 L 200,170" className="wire-in"/>
      <circle cx="20" cy="170" r="3" fill="var(--volt)"/>
      <text x="15" y="163" className="sval" textAnchor="end">Vin</text>
      <path d="M 200,110 L 160,110" className="wire"/>
      <circle cx="160" cy="110" r="3.5" fill="var(--ink)"/>
      <path d="M 160,110 L 130,110" className="wire"/>
      <path d="M 130,110 L 124,110 L 120,100 L 112,120 L 104,100 L 96,120 L 88,100 L 80,120 L 76,110 L 70,110" className="wire"/>
      <text x="100" y="94" className="slabel" textAnchor="middle">Rin</text>
      <path d="M 70,110 L 70,215" className="wire"/>
      <g stroke="var(--ink)" strokeWidth="1.5" fill="none">
        <path d="M 58,215 L 82,215"/>
        <path d="M 63,221 L 77,221"/>
        <path d="M 68,227 L 72,227"/>
      </g>
      <path d="M 160,110 L 160,40 L 215,40" className="wire"/>
      <path d="M 215,40 L 221,40 L 225,30 L 233,50 L 241,30 L 249,50 L 257,30 L 265,50 L 269,40 L 275,40" className="wire"/>
      <text x="245" y="26" className="slabel" textAnchor="middle">Rf</text>
      <path d="M 275,40 L 350,40 L 350,140" className="wire"/>
      <circle cx="350" cy="140" r="3.5" fill="var(--ink)"/>
      <path d="M 295,140 L 420,140" className="wire-out"/>
      <circle cx="420" cy="140" r="3" fill="var(--copper)"/>
      <text x="425" y="133" className="svout">Vout</text>
    </svg>
  );
}

export function BufferSVG() {
  return (
    <svg viewBox="0 0 460 260" aria-hidden="true">
      <path d="M 200,85 L 200,195 L 295,140 Z" className="component"/>
      <text x="212" y="112" className="slabel" fontWeight="600">−</text>
      <text x="212" y="178" className="slabel" fontWeight="600">+</text>
      <path d="M 240,103 L 240,75" stroke="var(--ink-muted)" strokeWidth="1" strokeDasharray="2 3" fill="none"/>
      <path d="M 240,176 L 240,205" stroke="var(--ink-muted)" strokeWidth="1" strokeDasharray="2 3" fill="none"/>
      <text x="246" y="72" className="slabel" fontSize="10" fill="var(--ink-muted)">+Vcc</text>
      <text x="246" y="215" className="slabel" fontSize="10" fill="var(--ink-muted)">−Vee</text>
      <path d="M 20,170 L 200,170" className="wire-in"/>
      <circle cx="20" cy="170" r="3" fill="var(--volt)"/>
      <text x="15" y="163" className="sval" textAnchor="end">Vin</text>
      <path d="M 200,110 L 160,110 L 160,40 L 350,40 L 350,140" className="wire"/>
      <circle cx="350" cy="140" r="3.5" fill="var(--ink)"/>
      <text x="255" y="32" className="slabel" fontSize="10" fill="var(--ink-muted)" textAnchor="middle">100% feedback · A = 1</text>
      <path d="M 295,140 L 420,140" className="wire-out"/>
      <circle cx="420" cy="140" r="3" fill="var(--copper)"/>
      <text x="425" y="133" className="svout">Vout</text>
    </svg>
  );
}

export function ComparatorSVG() {
  return (
    <svg viewBox="0 0 460 260" aria-hidden="true">
      <path d="M 200,85 L 200,195 L 295,140 Z" className="component"/>
      <text x="212" y="112" className="slabel" fontWeight="600">−</text>
      <text x="212" y="178" className="slabel" fontWeight="600">+</text>
      <path d="M 240,103 L 240,75" stroke="var(--ink-muted)" strokeWidth="1" strokeDasharray="2 3" fill="none"/>
      <path d="M 240,176 L 240,205" stroke="var(--ink-muted)" strokeWidth="1" strokeDasharray="2 3" fill="none"/>
      <text x="246" y="72" className="slabel" fontSize="10" fill="var(--ink-muted)">+Vcc</text>
      <text x="246" y="215" className="slabel" fontSize="10" fill="var(--ink-muted)">−Vee</text>
      <path d="M 20,170 L 200,170" className="wire-in"/>
      <circle cx="20" cy="170" r="3" fill="var(--volt)"/>
      <text x="15" y="163" className="sval" textAnchor="end">Vin</text>
      <path d="M 200,110 L 130,110" className="wire"/>
      <path d="M 130,110 L 130,80" className="wire"/>
      <path d="M 130,80 L 130,76 L 122,72 L 138,64 L 122,56 L 138,48 L 130,44 L 130,40" className="wire"/>
      <text x="110" y="62" className="slabel" fontSize="10" textAnchor="middle">R1</text>
      <path d="M 130,40 L 130,30" stroke="var(--ink-muted)" strokeWidth="1" strokeDasharray="2 3" fill="none"/>
      <text x="130" y="24" className="slabel" fontSize="10" fill="var(--ink-muted)" textAnchor="middle">+Vcc</text>
      <circle cx="130" cy="110" r="3.5" fill="var(--ink)"/>
      <text x="100" y="103" className="sval" textAnchor="end">Vref</text>
      <path d="M 130,110 L 130,145" className="wire"/>
      <path d="M 130,145 L 130,149 L 122,153 L 138,161 L 122,169 L 138,177 L 130,181 L 130,185" className="wire"/>
      <text x="110" y="170" className="slabel" fontSize="10" textAnchor="middle">R2</text>
      <path d="M 130,185 L 130,220" className="wire"/>
      <g stroke="var(--ink)" strokeWidth="1.5" fill="none">
        <path d="M 118,220 L 142,220"/>
        <path d="M 123,226 L 137,226"/>
        <path d="M 128,232 L 132,232"/>
      </g>
      <path d="M 295,140 L 420,140" className="wire-out"/>
      <circle cx="420" cy="140" r="3" fill="var(--copper)"/>
      <text x="425" y="133" className="svout">Vout</text>
      <text x="355" y="128" className="slabel" fontSize="9" fill="var(--ink-muted)" textAnchor="middle">→ ±Vcc</text>
    </svg>
  );
}

export function CascadeSVG() {
  return (
    <svg viewBox="0 0 640 300" aria-hidden="true">
      <path d="M 150,90 L 150,200 L 245,145 Z" className="component"/>
      <text x="162" y="117" className="slabel" fontWeight="600">−</text>
      <text x="162" y="183" className="slabel" fontWeight="600">+</text>
      <path d="M 190,108 L 190,80" stroke="var(--ink-muted)" strokeWidth="1" strokeDasharray="2 3" fill="none"/>
      <path d="M 190,181 L 190,210" stroke="var(--ink-muted)" strokeWidth="1" strokeDasharray="2 3" fill="none"/>
      <text x="196" y="77" className="slabel" fontSize="9" fill="var(--ink-muted)">+Vcc</text>
      <text x="196" y="220" className="slabel" fontSize="9" fill="var(--ink-muted)">−Vee</text>
      <path d="M 20,115 L 50,115" className="wire-in"/>
      <circle cx="20" cy="115" r="3" fill="var(--volt)"/>
      <text x="15" y="108" className="sval" textAnchor="end">Vin</text>
      <path d="M 50,115 L 56,115 L 60,105 L 68,125 L 76,105 L 84,125 L 92,105 L 100,125 L 104,115 L 110,115" className="wire-in"/>
      <text x="80" y="99" className="sval" textAnchor="middle">Rin1</text>
      <path d="M 110,115 L 150,115" className="wire-in"/>
      <circle cx="120" cy="115" r="3.5" fill="var(--ink)"/>
      <path d="M 120,115 L 120,45 L 165,45" className="wire"/>
      <path d="M 165,45 L 171,45 L 175,35 L 183,55 L 191,35 L 199,55 L 207,35 L 215,55 L 219,45 L 225,45" className="wire"/>
      <text x="195" y="30" className="slabel" fontSize="10" textAnchor="middle">Rf1</text>
      <path d="M 225,45 L 285,45 L 285,145" className="wire"/>
      <circle cx="285" cy="145" r="3.5" fill="var(--ink)"/>
      <path d="M 150,175 L 125,175 L 125,220" className="wire"/>
      <g stroke="var(--ink)" strokeWidth="1.5" fill="none">
        <path d="M 113,220 L 137,220"/>
        <path d="M 118,226 L 132,226"/>
        <path d="M 123,232 L 127,232"/>
      </g>
      <path d="M 245,145 L 335,145" className="wire-out"/>
      <text x="290" y="137" className="svout" textAnchor="middle" fontSize="10">Vmid</text>
      <path d="M 425,90 L 425,200 L 520,145 Z" className="component"/>
      <text x="437" y="117" className="slabel" fontWeight="600">−</text>
      <text x="437" y="183" className="slabel" fontWeight="600">+</text>
      <path d="M 465,108 L 465,80" stroke="var(--ink-muted)" strokeWidth="1" strokeDasharray="2 3" fill="none"/>
      <path d="M 465,181 L 465,210" stroke="var(--ink-muted)" strokeWidth="1" strokeDasharray="2 3" fill="none"/>
      <text x="471" y="77" className="slabel" fontSize="9" fill="var(--ink-muted)">+Vcc</text>
      <text x="471" y="220" className="slabel" fontSize="9" fill="var(--ink-muted)">−Vee</text>
      <path d="M 335,145 L 335,115 L 340,115" className="wire-in"/>
      <path d="M 340,115 L 346,115 L 350,105 L 358,125 L 366,105 L 374,125 L 382,105 L 390,125 L 394,115 L 400,115" className="wire-in"/>
      <text x="370" y="99" className="sval" textAnchor="middle">Rin2</text>
      <path d="M 400,115 L 425,115" className="wire-in"/>
      <circle cx="410" cy="115" r="3.5" fill="var(--ink)"/>
      <path d="M 410,115 L 410,45 L 445,45" className="wire"/>
      <path d="M 445,45 L 451,45 L 455,35 L 463,55 L 471,35 L 479,55 L 487,35 L 495,55 L 499,45 L 505,45" className="wire"/>
      <text x="475" y="30" className="slabel" fontSize="10" textAnchor="middle">Rf2</text>
      <path d="M 505,45 L 560,45 L 560,145" className="wire"/>
      <circle cx="560" cy="145" r="3.5" fill="var(--ink)"/>
      <path d="M 425,175 L 400,175 L 400,220" className="wire"/>
      <g stroke="var(--ink)" strokeWidth="1.5" fill="none">
        <path d="M 388,220 L 412,220"/>
        <path d="M 393,226 L 407,226"/>
        <path d="M 398,232 L 402,232"/>
      </g>
      <path d="M 520,145 L 615,145" className="wire-out"/>
      <circle cx="615" cy="145" r="3" fill="var(--copper)"/>
      <text x="620" y="138" className="svout">Vout</text>
      <text x="170" y="265" className="slabel" fontSize="10" fill="var(--ink-muted)" textAnchor="middle">KAT 1 · A₁ = −Rf1/Rin1</text>
      <text x="460" y="265" className="slabel" fontSize="10" fill="var(--ink-muted)" textAnchor="middle">KAT 2 · A₂ = −Rf2/Rin2</text>
    </svg>
  );
}

export function OpAmpSymbolSVG() {
  return (
    <svg viewBox="0 0 280 180" aria-hidden="true">
      <path d="M 60,30 L 60,150 L 200,90 Z" className="component" strokeWidth="2"/>
      <text x="75" y="62" className="slabel" fontWeight="700" fontSize="14">−</text>
      <text x="75" y="128" className="slabel" fontWeight="700" fontSize="14">+</text>
      <path d="M 10,55 L 60,55" className="wire-in"/>
      <path d="M 10,125 L 60,125" className="wire-in"/>
      <path d="M 200,90 L 260,90" className="wire-out"/>
      <text x="5" y="48" className="sval" fontSize="10">V−</text>
      <text x="5" y="118" className="sval" fontSize="10">V+</text>
      <text x="245" y="83" className="svout" fontSize="10">Vout</text>
      <path d="M 125,55 L 125,20" stroke="var(--ink-muted)" strokeWidth="1" strokeDasharray="3 4" fill="none"/>
      <path d="M 125,125 L 125,160" stroke="var(--ink-muted)" strokeWidth="1" strokeDasharray="3 4" fill="none"/>
      <text x="130" y="17" className="slabel" fontSize="9" fill="var(--ink-muted)">+Vcc</text>
      <text x="130" y="172" className="slabel" fontSize="9" fill="var(--ink-muted)">−Vee</text>
    </svg>
  );
}

export function getCircuitSVG(circuit: CircuitType) {
  switch (circuit) {
    case 'inverting': return <InvertingSVG />;
    case 'noninv':   return <NonInvertingSVG />;
    case 'buffer':   return <BufferSVG />;
    case 'comp':     return <ComparatorSVG />;
    case 'cascade':  return <CascadeSVG />;
  }
}
