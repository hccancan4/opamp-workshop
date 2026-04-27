import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../contexts/LanguageContext';
import SEO from '../components/SEO';
import './Applications.css';

/* ─── Palette ─────────────────────────────────────────────────────────────── */
const C = {
  paper:   '#F2EDE3',
  rule:    '#C8BFA8',
  rsoft:   '#D9D1BC',
  inkDim:  '#8A8170',
  inkMut:  '#5A5246',
  volt:    '#1F4BD8',
  copper:  '#B4531A',
  moss:    '#3F6B3A',
  crimson: '#B8223C',
};

/* ─── High-DPI canvas setup ───────────────────────────────────────────────── */
function setupCanvas(canvas: HTMLCanvasElement) {
  const rect = canvas.getBoundingClientRect();
  const dpr  = window.devicePixelRatio || 1;
  const W    = rect.width;
  const H    = rect.height;
  if (canvas.width !== Math.round(W * dpr) || canvas.height !== Math.round(H * dpr)) {
    canvas.width  = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
  }
  const ctx = canvas.getContext('2d')!;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, W, H };
}

/* ─── Shared helpers ──────────────────────────────────────────────────────── */
function drawGrid(ctx: CanvasRenderingContext2D, x0: number, y0: number,
  w: number, h: number, cols = 10, rows = 8) {
  ctx.strokeStyle = C.rsoft; ctx.lineWidth = 0.5;
  for (let i = 1; i < cols * 2; i += 2) {
    const x = x0 + (i / (cols * 2)) * w;
    ctx.beginPath(); ctx.moveTo(x, y0); ctx.lineTo(x, y0 + h); ctx.stroke();
  }
  for (let j = 1; j < rows * 2; j += 2) {
    const y = y0 + (j / (rows * 2)) * h;
    ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x0 + w, y); ctx.stroke();
  }
  ctx.strokeStyle = C.rule; ctx.lineWidth = 0.75;
  for (let i = 0; i <= cols; i++) {
    const x = x0 + (i / cols) * w;
    ctx.beginPath(); ctx.moveTo(x, y0); ctx.lineTo(x, y0 + h); ctx.stroke();
  }
  for (let j = 0; j <= rows; j++) {
    const y = y0 + (j / rows) * h;
    ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x0 + w, y); ctx.stroke();
  }
}

function drawZero(ctx: CanvasRenderingContext2D, x0: number, cy: number, x1: number) {
  ctx.strokeStyle = C.rule; ctx.lineWidth = 1; ctx.setLineDash([5, 4]);
  ctx.beginPath(); ctx.moveTo(x0, cy); ctx.lineTo(x1, cy); ctx.stroke();
  ctx.setLineDash([]);
}

function drawVoltTicks(ctx: CanvasRenderingContext2D, cy: number, scale: number,
  range: number, xRight: number, unit: 'V' | 'mV' = 'V') {
  ctx.font = '9px "IBM Plex Mono",monospace'; ctx.textAlign = 'right';
  const ticks = [-range, -range / 2, 0, range / 2, range];
  for (const v of ticks) {
    const y = cy - v * scale;
    const abs = Math.abs(v);
    let lbl: string;
    if (unit === 'mV') lbl = v === 0 ? '0' : `${v > 0 ? '+' : ''}${Math.round(v * 1000)}m`;
    else               lbl = v === 0 ? '0' : `${v > 0 ? '+' : ''}${abs % 1 === 0 ? abs : abs.toFixed(1)}`;
    ctx.fillStyle = 'rgba(242,237,227,0.8)';
    ctx.fillRect(xRight - 30, y - 7, 28, 10);
    ctx.fillStyle = C.inkDim;
    ctx.fillText(lbl, xRight - 2, y + 3);
  }
  ctx.textAlign = 'left';
}

function fmtV(v: number) { return v >= 1 ? `${v.toFixed(3)} V` : `${(v * 1000).toFixed(1)} mV`; }
function fmtR(ohm: number) {
  if (ohm >= 1_000_000) return `${(ohm / 1_000_000).toFixed(1)} MΩ`;
  if (ohm >= 1_000)     return `${Math.round(ohm / 1000)} kΩ`;
  return `${ohm} Ω`;
}

/* ─── Insight badge ───────────────────────────────────────────────────────── */
function Badge({ variant, label }: { variant: 'green'|'red'|'orange'|'blue'|'gray'; label: string }) {
  return <span className={`insight-badge badge--${variant}`}>{label}</span>;
}

/* ═══════════════════════════════════════════════════════════════════════════
   1 · Audio Preamp
   ═══════════════════════════════════════════════════════════════════════════ */
function AudioPreamp() {
  const { lang } = useLang();
  const [gain,    setGain]    = useState(10);
  const [micSens, setMicSens] = useState(0.01);
  const [vcc,     setVcc]     = useState(15);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phaseRef  = useRef(0);
  const rafRef    = useRef<number>(0);

  const draw = useCallback(function drawFrame() {
    const canvas = canvasRef.current; if (!canvas) return;
    const { ctx, W, H } = setupCanvas(canvas);
    const H2 = H / 2, cy1 = H2 / 2, cy2 = H2 + H2 / 2, PAD = 14;
    const rawVout   = gain * micSens;
    const clipping  = rawVout > vcc;
    const voutPeak  = Math.min(vcc, rawVout);
    const voutRange = clipping ? vcc : Math.max(voutPeak, 1e-9);
    const scaleIn   = (H2 / 2 - PAD) / Math.max(micSens, 1e-9);
    const scaleOut  = (H2 / 2 - PAD) / voutRange;

    ctx.fillStyle = C.paper; ctx.fillRect(0, 0, W, H);
    drawGrid(ctx, 0, 0,  W, H2, 10, 4);
    drawGrid(ctx, 0, H2, W, H2, 10, 4);
    ctx.strokeStyle = C.rule; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(0, H2); ctx.lineTo(W, H2); ctx.stroke();
    drawZero(ctx, 0, cy1, W);
    drawZero(ctx, 0, cy2, W);

    if (clipping) { ctx.fillStyle = 'rgba(184,34,60,0.07)'; ctx.fillRect(0, H2, W, H2); }

    ctx.strokeStyle = 'rgba(180,83,26,0.28)'; ctx.lineWidth = 1; ctx.setLineDash([6, 5]);
    ctx.beginPath(); ctx.moveTo(0, cy2 - vcc * scaleOut); ctx.lineTo(W, cy2 - vcc * scaleOut); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, cy2 + vcc * scaleOut); ctx.lineTo(W, cy2 + vcc * scaleOut); ctx.stroke();
    ctx.setLineDash([]);

    const vinPath = new Path2D(), voutPath = new Path2D();
    for (let i = 0; i <= W; i++) {
      const t    = (i / W) * Math.PI * 6 + phaseRef.current;
      const vin  = micSens * Math.sin(t);
      const vout = Math.max(-vcc, Math.min(vcc, gain * vin));
      const y1   = cy1 - vin  * scaleIn;
      const y2   = cy2 - vout * scaleOut;
      if (i === 0) { vinPath.moveTo(i, y1); voutPath.moveTo(i, y2); }
      else          { vinPath.lineTo(i, y1); voutPath.lineTo(i, y2); }
    }
    ctx.strokeStyle = C.volt;   ctx.lineWidth = 2;   ctx.stroke(vinPath);
    ctx.strokeStyle = C.copper; ctx.lineWidth = 2.5; ctx.stroke(voutPath);

    const vinLbl  = micSens >= 0.001 ? `${(micSens*1000).toFixed(0)} mV pk` : `${(micSens*1e6).toFixed(0)} µV pk`;
    const voutLbl = clipping ? `CLIPPED  ±${vcc} V` : `${fmtV(voutPeak)} pk`;
    ctx.font = '10px "IBM Plex Mono",monospace';
    ctx.fillStyle = 'rgba(242,237,227,0.85)'; ctx.fillRect(2, 2, 190, 16);
    ctx.fillStyle = C.volt; ctx.fillText(`CH1  Vin   ${vinLbl}`, 5, 13);
    ctx.fillStyle = 'rgba(242,237,227,0.85)'; ctx.fillRect(2, H2 + 2, 210, 16);
    ctx.fillStyle = clipping ? C.crimson : C.copper;
    ctx.fillText(`CH2  Vout  ${voutLbl}`, 5, H2 + 13);
    drawVoltTicks(ctx, cy1, scaleIn,  micSens,   W, 'mV');
    drawVoltTicks(ctx, cy2, scaleOut, voutRange, W, 'V');

    phaseRef.current += 0.04;
    rafRef.current = requestAnimationFrame(drawFrame);
  }, [gain, micSens, vcc]);

  useEffect(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw]);

  // ── Derived values for insight card ──
  const rawVout   = gain * micSens;
  const clipping  = rawVout > vcc;
  const nearClip  = !clipping && rawVout / vcc > 0.85;
  const voutPk    = Math.min(vcc, rawVout);
  const gainDb    = 20 * Math.log10(Math.max(gain, 1));
  const clipThreshold = Math.ceil(vcc / micSens);

  // Equivalent resistors (Rin = 10 kΩ assumed)
  const rin = 10_000;
  const rf  = (gain - 1) * rin;

  const badgeVariant: 'green'|'orange'|'red' = clipping ? 'red' : nearClip ? 'orange' : 'green';
  const badgeLabel = clipping
    ? (lang === 'tr' ? '● KLİPLEME' : '● CLIPPING')
    : nearClip
      ? (lang === 'tr' ? '● SINIRA YAKIN' : '● NEAR LIMIT')
      : (lang === 'tr' ? '● LİNEER' : '● LINEAR');

  const formulaLine = gain === 1
    ? `Av = 1×  ${lang === 'tr' ? '(buffer — Rf = 0)' : '(buffer — Rf = 0)'}`
    : `Av = 1 + Rf/Rin = 1 + ${fmtR(rf)} / ${fmtR(rin)} = ${gain}×`;

  const explain = clipping
    ? (lang === 'tr'
        ? `Teorik çıkış ${fmtV(rawVout)} olmalıydı ama Vcc = ±${vcc} V bunu sınırlıyor. Çıkış kare dalgaya dönüşür — bu distorsiyon demektir.`
        : `Theoretical output should be ${fmtV(rawVout)} but Vcc = ±${vcc} V clamps it. Output becomes a square wave — that's distortion.`)
    : (lang === 'tr'
        ? `${(micSens*1000).toFixed(0)} mV'lik mikrofon sinyali ${gain}× yükseltilerek ${fmtV(voutPk)} çıkış üretiyor. Vcc sınırının %${Math.round(voutPk/vcc*100)}'inde, klipleme yok.`
        : `A ${(micSens*1000).toFixed(0)} mV mic signal is amplified ${gain}× to produce ${fmtV(voutPk)} output — ${Math.round(voutPk/vcc*100)}% of the Vcc rail, no clipping.`);

  const tip = clipping
    ? (lang === 'tr'
        ? `Vcc'yi ±${Math.ceil(rawVout)+1} V'a çıkar veya kazancı ${Math.floor(vcc/micSens)}×'e indir → lineer bölgeye geri dön.`
        : `Raise Vcc to ±${Math.ceil(rawVout)+1} V or reduce gain to ${Math.floor(vcc/micSens)}× → return to linear operation.`)
    : (lang === 'tr'
        ? `Kazancı ${clipThreshold + 1}×'in üstüne çıkar → kliplemenin nasıl distorsiyon yarattığını gör.`
        : `Raise gain above ${clipThreshold + 1}× → see how clipping creates distortion.`);

  return (
    <div className="app-demo">
      <div className="demo-scope demo-scope--tall">
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>

      {/* ── Insight card ── */}
      <div className="demo-insight">
        <div className="insight-status">
          <Badge variant={badgeVariant} label={badgeLabel} />
          <span className="mono insight-subtitle">
            {lang === 'tr' ? 'Evirmeyen Yükselteç' : 'Non-Inverting Amplifier'}
          </span>
        </div>

        <div className="insight-calc">
          <div><span className="ic-key">{formulaLine}</span>
            <span className="ic-dim">  = +{gainDb.toFixed(1)} dB</span>
          </div>
          <div>
            Vin = <span className="ic-val">{(micSens*1000).toFixed(0)} mV</span>
            {'  ×  '}{gain}{'  →  '}
            {lang === 'tr' ? 'teorik ' : 'theoretical '}
            <span className={clipping ? 'ic-bad' : 'ic-val'}>{fmtV(rawVout)}</span>
          </div>
          <div>
            Vout =&nbsp;
            <span className={clipping ? 'ic-bad' : 'ic-ok'}>{fmtV(voutPk)}</span>
            {'  '}
            {clipping
              ? <span className="ic-bad">(Vcc = ±{vcc} V {lang==='tr'?'ile sınırlı':'clamped'})</span>
              : <span className="ic-ok">(≤ ±{vcc} V ✓)</span>
            }
          </div>
        </div>

        <p className="insight-explain">{explain}</p>
        <div className="insight-tip">💡 {tip}</div>
      </div>

      {/* ── Controls ── */}
      <div className="demo-controls">
        <div className="demo-slider-row">
          <span>{lang === 'tr' ? 'Mikrofon hassasiyeti' : 'Mic sensitivity'}</span>
          <input type="range" min={0.001} max={0.1} step={0.001} value={micSens}
            onChange={e => setMicSens(+e.target.value)} />
          <span className="mono">{(micSens * 1000).toFixed(0)} mV</span>
        </div>
        <div className="demo-slider-row">
          <span>{lang === 'tr' ? 'Kazanç (Av)' : 'Gain (Av)'}</span>
          <input type="range" min={1} max={200} value={gain}
            onChange={e => setGain(+e.target.value)} />
          <span className="mono">{gain}×</span>
        </div>
        <div className="demo-slider-row">
          <span>Vcc</span>
          <input type="range" min={5} max={18} step={1} value={vcc}
            onChange={e => setVcc(+e.target.value)} />
          <span className="mono">±{vcc} V</span>
        </div>
      </div>

      <Link to={`/simulator?c=noninv&va=${micSens}&vcc=${vcc}`} className="btn btn-ghost demo-sim-link">
        {lang === 'tr' ? 'Simülatörde aç →' : 'Open in simulator →'}
      </Link>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   2 · Schmitt Trigger
   ═══════════════════════════════════════════════════════════════════════════ */
function SchmittTrigger() {
  const { lang } = useLang();
  const [vhigh, setVhigh] = useState(2);
  const [vlow,  setVlow]  = useState(-2);
  const [noisy, setNoisy] = useState(true);
  const canvasRef      = useRef<HTMLCanvasElement>(null);
  const phaseRef       = useRef(0);
  const rafRef         = useRef<number>(0);
  // Persist hysteretic state ACROSS frames (critical for accuracy)
  const schmittStateRef  = useRef(false);
  const prevOutRef       = useRef<'high'|'low'>('low');
  const [schmittOut, setSchmittOut] = useState<'high'|'low'>('low');

  const draw = useCallback(function drawFrame() {
    const canvas = canvasRef.current; if (!canvas) return;
    const { ctx, W, H } = setupCanvas(canvas);
    const LEFT = 38, pw = W - LEFT, cy = H / 2, VRANGE = 5.5;
    const scale = (H / 2 - 12) / VRANGE, VOUT = 5;

    ctx.fillStyle = C.paper; ctx.fillRect(0, 0, W, H);
    drawGrid(ctx, LEFT, 0, pw, H, 10, 8);
    drawZero(ctx, LEFT, cy, W);

    const yhigh = cy - vhigh * scale;
    const ylow  = cy - vlow  * scale;
    ctx.fillStyle = 'rgba(63,107,58,0.07)';
    ctx.fillRect(LEFT, yhigh, pw, ylow - yhigh);
    ctx.strokeStyle = 'rgba(63,107,58,0.55)'; ctx.lineWidth = 1.2; ctx.setLineDash([5, 4]);
    ctx.beginPath(); ctx.moveTo(LEFT, yhigh); ctx.lineTo(W, yhigh); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(LEFT, ylow);  ctx.lineTo(W, ylow);  ctx.stroke();
    ctx.setLineDash([]);
    ctx.font = '9px "IBM Plex Mono",monospace'; ctx.fillStyle = C.moss;
    ctx.fillText(`V+ ${vhigh.toFixed(1)} V`, LEFT + 4, yhigh - 3);
    ctx.fillText(`V− ${vlow.toFixed(1)} V`,  LEFT + 4, ylow  + 11);

    ctx.strokeStyle = 'rgba(180,83,26,0.3)'; ctx.lineWidth = 1; ctx.setLineDash([6, 5]);
    ctx.beginPath(); ctx.moveTo(LEFT, cy - VOUT * scale); ctx.lineTo(W, cy - VOUT * scale); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(LEFT, cy + VOUT * scale); ctx.lineTo(W, cy + VOUT * scale); ctx.stroke();
    ctx.setLineDash([]);

    const N = Math.round(pw);
    const vinPath = new Path2D(), voutPath = new Path2D();
    // Start from persisted state (true hysteresis across frames)
    let state = schmittStateRef.current;
    for (let i = 0; i <= N; i++) {
      const t     = (i / N) * Math.PI * 4 + phaseRef.current;
      const noise = noisy ? (Math.random() - 0.5) * 0.38 : 0;
      const vin   = Math.sin(t) * 3 + noise;
      if (vin >  vhigh) state = true;
      if (vin <  vlow)  state = false;
      const vout = state ? VOUT : -VOUT;
      const x = LEFT + i;
      const y1 = cy - vin  * scale;
      const y2 = cy - vout * scale;
      if (i === 0) { vinPath.moveTo(x, y1); voutPath.moveTo(x, y2); }
      else          { vinPath.lineTo(x, y1); voutPath.lineTo(x, y2); }
    }
    // Persist state for next frame
    schmittStateRef.current = state;
    const newOut = state ? 'high' : 'low';
    if (prevOutRef.current !== newOut) {
      prevOutRef.current = newOut;
      setSchmittOut(newOut);
    }

    ctx.strokeStyle = C.copper; ctx.lineWidth = 2.5; ctx.stroke(voutPath);
    ctx.strokeStyle = C.volt;   ctx.lineWidth = 2;   ctx.stroke(vinPath);

    ctx.font = '9px "IBM Plex Mono",monospace'; ctx.textAlign = 'right';
    [-5, -2.5, 0, 2.5, 5].forEach(v => {
      const y = cy - v * scale;
      ctx.fillStyle = 'rgba(242,237,227,0.82)'; ctx.fillRect(0, y - 8, LEFT - 2, 11);
      ctx.fillStyle = C.inkDim;
      ctx.fillText(v === 0 ? '0 V' : `${v > 0 ? '+' : ''}${v} V`, LEFT - 3, y + 3);
    });
    ctx.textAlign = 'left';

    ctx.font = '10px "IBM Plex Mono",monospace';
    ctx.fillStyle = 'rgba(242,237,227,0.85)'; ctx.fillRect(LEFT + 2, 2, 220, 28);
    ctx.fillStyle = C.volt;   ctx.fillText(lang === 'tr' ? 'Vin  sinüs + gürültü' : 'Vin  sine + noise', LEFT + 6, 13);
    ctx.fillStyle = C.copper; ctx.fillText(lang === 'tr' ? 'Vout dijital çıkış ±5 V' : 'Vout digital output ±5 V', LEFT + 6, 26);

    phaseRef.current += 0.025;
    rafRef.current = requestAnimationFrame(drawFrame);
  }, [vhigh, vlow, noisy, lang]);

  useEffect(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw]);

  // ── Derived values for insight card ──
  const hysteresis  = vhigh - vlow;
  const noiseMargin = hysteresis / 2;
  const isHigh      = schmittOut === 'high';
  // Noise amplitude ≈ 0.19 V (half of (Math.random()-0.5)*0.38)
  const noiseAmp    = 0.19;
  const safeFromNoise = noiseAmp < noiseMargin;

  const explain = lang === 'tr'
    ? `Vin, ${isHigh ? `üst eşiği (VH = +${vhigh.toFixed(1)} V) geçtiğinde HIGH olur` : `alt eşiğin (VL = ${vlow.toFixed(1)} V) altına düştüğünde LOW olur`}. Eşikler arasındayken çıkış değişmez — bu histerezis sayesinde gürültüye karşı bağışıklık sağlanır.`
    : `Vin goes HIGH when it ${isHigh ? `exceeds the upper threshold (VH = +${vhigh.toFixed(1)} V)` : `falls below the lower threshold (VL = ${vlow.toFixed(1)} V)`}. Between thresholds, output doesn't change — that's hysteresis giving noise immunity.`;

  const tip = !noisy
    ? (lang === 'tr'
        ? `Gürültü modunu aç → histerezis olmasaydı ne olurdu düşün.`
        : `Enable noise input → think about what would happen without hysteresis.`)
    : safeFromNoise
      ? (lang === 'tr'
          ? `Pencereyi ${(noiseAmp * 2 * 0.9).toFixed(1)} V'ın altına indir → gürültünün hatalı tetiklemeye yol açtığını gör.`
          : `Narrow the window below ${(noiseAmp * 2 * 0.9).toFixed(1)} V → watch noise cause false triggering.`)
      : (lang === 'tr'
          ? `Pencere (${hysteresis.toFixed(1)} V) gürültü genliğinden (±${noiseAmp.toFixed(2)} V) küçük — hatalı geçişler oluşuyor!`
          : `Window (${hysteresis.toFixed(1)} V) is smaller than noise (±${noiseAmp.toFixed(2)} V) — false transitions occurring!`);

  return (
    <div className="app-demo">
      <div className="demo-scope">
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>

      {/* ── Insight card ── */}
      <div className="demo-insight">
        <div className="insight-status">
          {/* Big output indicator */}
          <div className={`schmitt-out-indicator ${isHigh ? 's-high' : 's-low'}`}>
            {isHigh ? '▲' : '▼'} OUTPUT: {isHigh ? `HIGH +5 V` : `LOW −5 V`}
          </div>
        </div>

        <div className="insight-calc">
          <div>
            VH <span className="ic-dim">(üst eşik)</span> = <span className="ic-ok">+{vhigh.toFixed(1)} V</span>
            {'    '}
            VL <span className="ic-dim">(alt eşik)</span> = <span className="ic-bad">{vlow.toFixed(1)} V</span>
          </div>
          <div>
            {lang==='tr' ? 'Histerezis' : 'Hysteresis'} = VH − VL = <span className="ic-val">{hysteresis.toFixed(1)} V</span>
          </div>
          <div>
            {lang==='tr' ? 'Gürültü toleransı' : 'Noise margin'} = ±<span className={safeFromNoise ? 'ic-ok' : 'ic-bad'}>{noiseMargin.toFixed(2)} V</span>
            {noisy && <>{'  '}<span className="ic-dim">(gürültü ≈ ±{noiseAmp.toFixed(2)} V)</span></>}
          </div>
          {noisy && (
            <div>
              {safeFromNoise
                ? <span className="ic-ok">✓ {lang==='tr' ? 'Gürültü güvenle bastırılıyor' : 'Noise safely rejected'}</span>
                : <span className="ic-bad">⚠ {lang==='tr' ? 'Pencere çok dar — hatalı geçiş!' : 'Window too narrow — false triggers!'}</span>
              }
            </div>
          )}
        </div>

        <p className="insight-explain">{explain}</p>
        <div className="insight-tip">💡 {tip}</div>
      </div>

      {/* ── Controls ── */}
      <div className="demo-controls">
        <div className="demo-slider-row">
          <span>{lang === 'tr' ? 'Üst eşik V+' : 'Upper threshold V+'}</span>
          <input type="range" min={0.2} max={4.8} step={0.1} value={vhigh}
            onChange={e => setVhigh(+e.target.value)} />
          <span className="mono">{vhigh.toFixed(1)} V</span>
        </div>
        <div className="demo-slider-row">
          <span>{lang === 'tr' ? 'Alt eşik V−' : 'Lower threshold V−'}</span>
          <input type="range" min={-4.8} max={-0.2} step={0.1} value={vlow}
            onChange={e => setVlow(+e.target.value)} />
          <span className="mono">{vlow.toFixed(1)} V</span>
        </div>
        <div className="demo-toggle-row">
          <label>
            <input type="checkbox" checked={noisy} onChange={e => setNoisy(e.target.checked)} />
            {lang === 'tr' ? ' Gürültülü giriş (±0.19 V)' : ' Noisy input signal (±0.19 V)'}
          </label>
        </div>
      </div>

      <Link to="/simulator?c=comp" className="btn btn-ghost demo-sim-link">
        {lang === 'tr' ? 'Simülatörde aç →' : 'Open in simulator →'}
      </Link>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   3 · Sallen-Key Alçak Geçiren Filtre
   ═══════════════════════════════════════════════════════════════════════════ */
function SallenKeyFilter() {
  const { lang } = useLang();
  const [fc, setFc] = useState(1000);
  const [ft, setFt] = useState(500);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phaseRef  = useRef(0);
  const rafRef    = useRef<number>(0);

  const filterGain  = useCallback((f: number, cutoff: number) =>
    1 / Math.sqrt(1 + (f / cutoff) ** 4), []);
  const filterPhase = useCallback((f: number, cutoff: number) => {
    const r = f / cutoff;
    return -Math.atan2(2 * r, 1 - r * r) * (180 / Math.PI);
  }, []);

  const draw = useCallback(function drawFrame() {
    const canvas = canvasRef.current; if (!canvas) return;
    const { ctx, W, H } = setupCanvas(canvas);
    const SPLIT = H * 0.58, LEFT = 40, BOT = 18, pw = W - LEFT;
    const gainVal  = filterGain(ft, fc);
    const phaseVal = filterPhase(ft, fc);
    const dbVal    = 20 * Math.log10(Math.max(gainVal, 1e-6));
    const VIN_AMP  = 1.0, VOUT_AMP = gainVal * VIN_AMP;

    // ── Waveform section ──
    ctx.fillStyle = C.paper; ctx.fillRect(0, 0, W, SPLIT);
    const cyW = SPLIT / 2, scaleW = (SPLIT / 2 - 14) / 1.1;
    drawGrid(ctx, LEFT, 0, pw, SPLIT, 10, 6);
    drawZero(ctx, LEFT, cyW, W);
    ctx.strokeStyle = `rgba(31,75,216,0.2)`; ctx.lineWidth = 1; ctx.setLineDash([6, 5]);
    ctx.beginPath(); ctx.moveTo(LEFT, cyW - scaleW); ctx.lineTo(W, cyW - scaleW); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(LEFT, cyW + scaleW); ctx.lineTo(W, cyW + scaleW); ctx.stroke();
    ctx.setLineDash([]);

    const phaseShift = phaseVal * (Math.PI / 180);
    const vinPath = new Path2D(), voutPath = new Path2D();
    for (let i = 0; i <= pw; i++) {
      const tNorm = i / pw;
      const vin   = VIN_AMP  * Math.sin(tNorm * Math.PI * 6 + phaseRef.current);
      const vout  = VOUT_AMP * Math.sin(tNorm * Math.PI * 6 + phaseRef.current + phaseShift);
      const x = LEFT + i;
      const y1 = cyW - vin  * scaleW;
      const y2 = cyW - vout * scaleW;
      if (i === 0) { vinPath.moveTo(x, y1); voutPath.moveTo(x, y2); }
      else          { vinPath.lineTo(x, y1); voutPath.lineTo(x, y2); }
    }
    ctx.strokeStyle = C.volt;   ctx.lineWidth = 2;   ctx.stroke(vinPath);
    ctx.strokeStyle = C.copper; ctx.lineWidth = 2.5; ctx.stroke(voutPath);

    ctx.font = '9px "IBM Plex Mono",monospace'; ctx.textAlign = 'right';
    [-1, -0.5, 0, 0.5, 1].forEach(v => {
      const y = cyW - v * scaleW;
      ctx.fillStyle = 'rgba(242,237,227,0.82)'; ctx.fillRect(0, y - 7, LEFT - 2, 10);
      ctx.fillStyle = C.inkDim;
      ctx.fillText(v === 0 ? '0' : `${v > 0 ? '+' : ''}${v}V`, LEFT - 3, y + 3);
    });
    ctx.textAlign = 'left';

    ctx.font = '10px "IBM Plex Mono",monospace';
    ctx.fillStyle = 'rgba(242,237,227,0.88)'; ctx.fillRect(LEFT + 2, 2, 240, 28);
    ctx.fillStyle = C.volt;   ctx.fillText(`Vin   1.00 V pk`, LEFT + 6, 13);
    ctx.fillStyle = C.copper;
    const voutLbl = VOUT_AMP >= 0.01
      ? `Vout  ${VOUT_AMP.toFixed(3)} V pk  (${dbVal.toFixed(1)} dB)`
      : `Vout  ${(VOUT_AMP*1000).toFixed(1)} mV pk  (${dbVal.toFixed(1)} dB)`;
    ctx.fillText(voutLbl, LEFT + 6, 26);
    ctx.font = '9px "IBM Plex Mono",monospace'; ctx.textAlign = 'right';
    ctx.fillStyle = C.inkMut;
    ctx.fillText(`φ = ${phaseVal.toFixed(1)}°`, W - 4, 13);
    ctx.textAlign = 'left';

    // ── Divider ──
    ctx.strokeStyle = C.rule; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, SPLIT); ctx.lineTo(W, SPLIT); ctx.stroke();

    // ── Bode section ──
    const bH = H - SPLIT - BOT, by0 = SPLIT;
    const fMin = 10, fMax = 100_000, dbMin = -60, dbMax = 6, dbRng = dbMax - dbMin;
    const fToX  = (f: number) => LEFT + Math.log(f / fMin) / Math.log(fMax / fMin) * pw;
    const dbToY = (db: number) => by0 + bH - ((db - dbMin) / dbRng) * bH;

    ctx.fillStyle = C.paper; ctx.fillRect(0, SPLIT, W, H - SPLIT);

    ctx.strokeStyle = C.rule; ctx.lineWidth = 0.75;
    [6, 0, -20, -40, -60].forEach(db => {
      const y = dbToY(db);
      ctx.beginPath(); ctx.moveTo(LEFT, y); ctx.lineTo(W, y); ctx.stroke();
    });
    [10, 100, 1000, 10000, 100000].forEach(f => {
      const x = fToX(f);
      ctx.beginPath(); ctx.moveTo(x, by0); ctx.lineTo(x, by0 + bH); ctx.stroke();
    });
    ctx.strokeStyle = C.rsoft; ctx.lineWidth = 0.4;
    [20,30,40,50,60,70,80,90,200,300,400,500,600,700,800,900,
     2000,3000,4000,5000,6000,7000,8000,9000,
     20000,30000,40000,50000,60000,70000,80000,90000].forEach(f => {
      const x = fToX(f);
      ctx.beginPath(); ctx.moveTo(x, by0); ctx.lineTo(x, by0 + bH); ctx.stroke();
    });

    ctx.strokeStyle = C.rule; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(LEFT, dbToY(0)); ctx.lineTo(W, dbToY(0)); ctx.stroke();

    ctx.strokeStyle = 'rgba(63,107,58,0.45)'; ctx.lineWidth = 1; ctx.setLineDash([5, 4]);
    ctx.beginPath(); ctx.moveTo(LEFT, dbToY(-3)); ctx.lineTo(W, dbToY(-3)); ctx.stroke();
    ctx.setLineDash([]);
    ctx.font = '8px "IBM Plex Mono",monospace'; ctx.fillStyle = C.moss;
    ctx.fillText('−3 dB', LEFT + 3, dbToY(-3) - 2);

    const fcX = fToX(fc);
    ctx.strokeStyle = 'rgba(180,83,26,0.7)'; ctx.lineWidth = 1.5; ctx.setLineDash([5, 4]);
    ctx.beginPath(); ctx.moveTo(fcX, by0); ctx.lineTo(fcX, by0 + bH); ctx.stroke();
    ctx.setLineDash([]);
    const ftX = fToX(ft);
    ctx.strokeStyle = 'rgba(31,75,216,0.5)'; ctx.lineWidth = 1.5; ctx.setLineDash([3, 3]);
    ctx.beginPath(); ctx.moveTo(ftX, by0); ctx.lineTo(ftX, by0 + bH); ctx.stroke();
    ctx.setLineDash([]);

    const bodePath = new Path2D();
    for (let i = 0; i <= pw; i++) {
      const f  = fMin * (fMax / fMin) ** (i / pw);
      const db = 20 * Math.log10(Math.max(filterGain(f, fc), 1e-9));
      const x  = LEFT + i;
      const y  = dbToY(Math.max(dbMin - 1, db));
      if (i === 0) bodePath.moveTo(x, y);
      else bodePath.lineTo(x, y);
    }
    ctx.strokeStyle = C.volt; ctx.lineWidth = 2.5; ctx.stroke(bodePath);

    ctx.beginPath(); ctx.arc(fcX, dbToY(-3.01), 4, 0, Math.PI * 2);
    ctx.fillStyle = C.copper; ctx.fill();
    ctx.strokeStyle = C.paper; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.beginPath(); ctx.arc(ftX, dbToY(dbVal), 4, 0, Math.PI * 2);
    ctx.fillStyle = C.volt; ctx.fill();
    ctx.strokeStyle = C.paper; ctx.lineWidth = 1.5; ctx.stroke();

    const fcLbl = fc >= 1000 ? `fc=${(fc/1000).toFixed(1)}k` : `fc=${fc}`;
    ctx.font = '9px "IBM Plex Mono",monospace'; ctx.fillStyle = C.copper;
    const fcLW = ctx.measureText(fcLbl).width;
    ctx.fillText(fcLbl, fcX + fcLW + 4 > W ? fcX - fcLW - 4 : fcX + 3, by0 + 11);

    const ftLbl = ft >= 1000 ? `ft=${(ft/1000).toFixed(1)}k` : `ft=${ft}`;
    ctx.fillStyle = C.volt;
    const ftLW = ctx.measureText(ftLbl).width;
    ctx.fillText(ftLbl, ftX + ftLW + 4 > W ? ftX - ftLW - 4 : ftX + 3, by0 + 22);

    ctx.textAlign = 'right';
    [6, 0, -20, -40, -60].forEach(db => {
      const y = dbToY(db);
      ctx.fillStyle = 'rgba(242,237,227,0.82)'; ctx.fillRect(0, y - 7, LEFT - 2, 10);
      ctx.fillStyle = C.inkDim; ctx.fillText(`${db}`, LEFT - 3, y + 3);
    });
    ctx.textAlign = 'center';
    [{ f: 10, l: '10' }, { f: 100, l: '100' }, { f: 1000, l: '1k' }, { f: 10000, l: '10k' }, { f: 100000, l: '100k' }]
      .forEach(({ f, l }) => { ctx.fillText(l, fToX(f), H - 4); });
    ctx.fillText('Hz', W - 10, H - 4);
    ctx.textAlign = 'left';

    const T = 1 / ft;
    phaseRef.current += T * 0.04;
    rafRef.current = requestAnimationFrame(drawFrame);
  }, [fc, ft, filterGain, filterPhase]);

  useEffect(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw]);

  // ── Derived values for insight card ──
  const gainVal  = filterGain(ft, fc);
  const dbVal    = 20 * Math.log10(Math.max(gainVal, 1e-6));
  const ratio    = ft / fc;
  const passPct  = (gainVal * 100).toFixed(1);
  const phaseVal = filterPhase(ft, fc);

  // Region classification
  const atCutoff = Math.abs(ratio - 1) < 0.1;
  const inPass   = ratio < 0.9;
  const inStop   = ratio > 1.1;

  const badgeVariant: 'blue'|'gray'|'orange' = atCutoff ? 'orange' : inPass ? 'blue' : 'gray';
  const badgeLabel = atCutoff
    ? (lang === 'tr' ? '● KESİM NOKTASI' : '● AT CUTOFF')
    : inPass
      ? (lang === 'tr' ? '● GEÇİŞ BANDI' : '● PASS-BAND')
      : (lang === 'tr' ? '● DURMA BANDI' : '● STOP-BAND');

  const fcStr = fc >= 1000 ? `${(fc/1000).toFixed(1)} kHz` : `${fc} Hz`;
  const ftStr = ft >= 1000 ? `${(ft/1000).toFixed(1)} kHz` : `${ft} Hz`;

  const explain = atCutoff
    ? (lang === 'tr'
        ? `ft = fc = ${fcStr}. Bu nokta filtrenin kesim frekansı: sinyal tam −3 dB zayıflıyor, yani güç yarıya iniyor. Genlik ise ${gainVal.toFixed(3)}× (≈ 0.707×).`
        : `ft = fc = ${fcStr}. This is the filter's cutoff: signal is exactly −3 dB attenuated, meaning half power. Amplitude is ${gainVal.toFixed(3)}× (≈ 0.707×).`)
    : inPass
      ? (lang === 'tr'
          ? `${ftStr} test frekansı, fc = ${fcStr} kesiminin altında — geçiş bandında. Sinyal %${passPct} oranında geçiyor, sadece ${Math.abs(dbVal).toFixed(2)} dB kayıp var.`
          : `${ftStr} test frequency is below the fc = ${fcStr} cutoff — in the pass-band. Signal passes at ${passPct}%, only ${Math.abs(dbVal).toFixed(2)} dB of loss.`)
      : (lang === 'tr'
          ? `${ftStr} test frekansı, fc = ${fcStr} kesiminin üstünde — durma bandında. 2. derece filtre −40 dB/dekad eğimiyle zayıflatıyor: sinyal sadece %${passPct} geçiyor.`
          : `${ftStr} is above the fc = ${fcStr} cutoff — in the stop-band. 2nd-order rolloff at −40 dB/decade: only ${passPct}% of signal passes.`);

  const tip = inPass && ratio < 0.5
    ? (lang === 'tr'
        ? `ft'yi fc = ${fcStr}'ye yaklaştır → −3 dB noktasını tam olarak gör.`
        : `Move ft closer to fc = ${fcStr} → observe the exact −3 dB point.`)
    : atCutoff
      ? (lang === 'tr'
          ? `ft'yi 10×fc'ye çıkar → −40 dB/dekad eğimini ve 2. derece filtrenin gücünü gör.`
          : `Set ft to 10×fc → see the −40 dB/decade rolloff and the power of a 2nd-order filter.`)
      : inStop && ratio > 5
        ? (lang === 'tr'
            ? `fc'yi ${ftStr} test frekansına yaklaştır → geçiş bandından durma bandına geçişi izle.`
            : `Move fc closer to ${ftStr} → watch the signal cross from pass-band to stop-band.`)
        : (lang === 'tr'
            ? `ft = 3×fc noktasında kazanç tam olarak −40 dB/dekad formülüne göre hesaplanır.`
            : `At ft = 3×fc the gain follows exactly the −40 dB/decade rolloff formula.`);

  return (
    <div className="app-demo">
      <div className="demo-scope demo-scope--bode">
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>

      {/* ── Insight card ── */}
      <div className="demo-insight">
        <div className="insight-status">
          <Badge variant={badgeVariant} label={badgeLabel} />
          <span className="mono insight-subtitle">Sallen-Key 2. Derece LPF</span>
        </div>

        <div className="insight-calc">
          <div>
            ft = <span className="ic-val" style={{color: C.volt}}>{ftStr}</span>
            {'    '}
            fc = <span className="ic-val" style={{color: C.copper}}>{fcStr}</span>
            {'    '}
            ft/fc = <span className="ic-val">{ratio.toFixed(2)}</span>
          </div>
          <div>
            |H| = 1/√(1 + (ft/fc)⁴) = 1/√(1 + {(ratio**4).toFixed(2)}) = <span className="ic-val">{gainVal.toFixed(4)}×</span>
          </div>
          <div>
            = <span className={inPass ? 'ic-ok' : atCutoff ? 'ic-val' : 'ic-bad'}>{dbVal.toFixed(2)} dB</span>
            {'    '}
            φ = <span className="ic-dim">{phaseVal.toFixed(1)}°</span>
          </div>
          <div>
            Vout = <span className="ic-val">{gainVal.toFixed(3)}</span> × 1 V =&nbsp;
            <span className={inPass ? 'ic-ok' : 'ic-bad'}>{fmtV(gainVal)}</span>
            <span className="ic-dim"> ({passPct}%)</span>
          </div>
        </div>

        <p className="insight-explain">{explain}</p>
        <div className="insight-tip">💡 {tip}</div>
      </div>

      {/* ── Controls ── */}
      <div className="demo-controls">
        <div className="demo-slider-row">
          <span>{lang === 'tr' ? 'Kesim frekansı (fc)' : 'Cutoff frequency (fc)'}</span>
          <input type="range" min={20} max={20000} value={fc}
            onChange={e => setFc(+e.target.value)} />
          <span className="mono" style={{ color: C.copper }}>
            {fc >= 1000 ? `${(fc/1000).toFixed(1)} kHz` : `${fc} Hz`}
          </span>
        </div>
        <div className="demo-slider-row">
          <span>{lang === 'tr' ? 'Test frekansı (ft)' : 'Test frequency (ft)'}</span>
          <input type="range" min={10} max={50000} value={ft}
            onChange={e => setFt(+e.target.value)} />
          <span className="mono" style={{ color: C.volt }}>
            {ft >= 1000 ? `${(ft/1000).toFixed(1)} kHz` : `${ft} Hz`}
          </span>
        </div>
      </div>

      <Link to="/simulator?c=noninv&f=1000" className="btn btn-ghost demo-sim-link">
        {lang === 'tr' ? 'Simülatörde aç →' : 'Open in simulator →'}
      </Link>
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────────── */
export default function Applications() {
  const { lang, t } = useLang();
  const [active, setActive] = useState<'preamp' | 'schmitt' | 'filter'>('preamp');

  const APPS = [
    { key: 'preamp'  as const, title: t.app_preamp_title,  lede: t.app_preamp_lede,  tag: lang === 'tr' ? 'Evirmeyen Yükselteç' : 'Non-Inverting Amp' },
    { key: 'schmitt' as const, title: t.app_schmitt_title, lede: t.app_schmitt_lede, tag: lang === 'tr' ? 'Karşılaştırıcı'      : 'Comparator' },
    { key: 'filter'  as const, title: t.app_filter_title,  lede: t.app_filter_lede,  tag: 'Sallen-Key LPF' },
  ];

  return (
    <div className="apps-page wrap" style={{ paddingTop: '4rem', paddingBottom: '6rem' }}>
      <SEO
        title={t.appspage_title}
        description={lang === 'tr'
          ? 'Ses preamp\'i, Schmitt tetikleyici ve Sallen-Key filtre — formüllerin hayata geçtiği üç interaktif demo.'
          : 'Audio preamp, Schmitt trigger and Sallen-Key filter — three interactive demos where formulas come alive.'}
        path="/applications"
        lang={lang}
      />
      <p className="eyebrow"><span className="num">—</span>{t.apps_eye}</p>
      <h1 className="heading">{t.appspage_title}</h1>
      <p className="lede" style={{ marginBottom: '3rem' }}>{t.appspage_lede}</p>

      <div className="app-tabs">
        {APPS.map(app => (
          <button key={app.key}
            className={`app-tab${active === app.key ? ' active' : ''}`}
            onClick={() => setActive(app.key)}>
            <span className="app-tab-tag mono">{app.tag}</span>
            <span className="app-tab-title">{app.title}</span>
          </button>
        ))}
      </div>

      <div className="app-demo-panel">
        <div className="demo-header">
          <h2>{APPS.find(a => a.key === active)?.title}</h2>
          <p>{APPS.find(a => a.key === active)?.lede}</p>
        </div>
        {active === 'preamp'  && <AudioPreamp />}
        {active === 'schmitt' && <SchmittTrigger />}
        {active === 'filter'  && <SallenKeyFilter />}
      </div>
    </div>
  );
}
