import { useRef, useEffect, useCallback } from 'react';
import { type SimParams, generateVin, generateVout } from '../../lib/simulator';

interface WaveformScopeProps {
  params: SimParams;
  frozen: boolean;
  speed?: number;   // 0.25 | 0.5 | 1 | 2 | 4  (default 1)
  width?: number;
  height?: number;
}

export default function WaveformScope({
  params,
  frozen,
  speed = 1,
  width = 600,
  height = 220,
}: WaveformScopeProps) {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const phaseRef   = useRef(0);
  const rafRef     = useRef<number>(0);
  const frozenRef  = useRef(frozen);
  const speedRef   = useRef(speed);
  const mouseXRef  = useRef<number | null>(null);
  const drawRef    = useRef<() => void>(() => {});

  useEffect(() => { frozenRef.current = frozen; }, [frozen]);
  useEffect(() => { speedRef.current  = speed;  }, [speed]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // ── High-DPI sizing ────────────────────────────────────────────────
    const rect = canvas.getBoundingClientRect();
    const dpr  = window.devicePixelRatio || 1;
    const W_css = rect.width  || width;
    const H_css = rect.height || height;
    const W_px  = Math.round(W_css * dpr);
    const H_px  = Math.round(H_css * dpr);
    if (canvas.width !== W_px || canvas.height !== H_px) {
      canvas.width  = W_px;
      canvas.height = H_px;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const W = W_css;
    const H = H_css;
    const centerY = H / 2;
    const vcc     = params.vcc;

    const s = getComputedStyle(document.documentElement);
    const paperColor  = s.getPropertyValue('--paper').trim()     || '#F2EDE3';
    const ruleColor   = s.getPropertyValue('--rule').trim()      || '#C8BFA8';
    const ruleSoft    = s.getPropertyValue('--rule-soft').trim() || '#D9D1BC';
    const inkDim      = s.getPropertyValue('--ink-dim').trim()   || '#8A8170';
    const voltColor   = s.getPropertyValue('--volt').trim()      || '#1F4BD8';
    const copperColor = s.getPropertyValue('--copper').trim()    || '#B4531A';

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = paperColor;
    ctx.fillRect(0, 0, W, H);

    const ampScale = (H / 2 - 10) / vcc;
    const COLS = 10, ROWS = 8;

    // Minor grid
    ctx.strokeStyle = ruleSoft;
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= COLS * 2; i++) {
      if (i % 2 === 0) continue;
      const x = (i / (COLS * 2)) * W;
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let j = 0; j <= ROWS * 2; j++) {
      if (j % 2 === 0) continue;
      const y = (j / (ROWS * 2)) * H;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }

    // Major grid
    ctx.strokeStyle = ruleColor;
    ctx.lineWidth = 0.8;
    for (let i = 0; i <= COLS; i++) {
      const x = (i / COLS) * W;
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let j = 0; j <= ROWS; j++) {
      const y = (j / ROWS) * H;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }

    // ±Vcc rails (dashed)
    ctx.strokeStyle = 'rgba(180,83,26,0.35)';
    ctx.lineWidth = 1;
    ctx.setLineDash([6, 5]);
    const vccY = centerY - vcc * ampScale;
    const veeY = centerY + vcc * ampScale;
    ctx.beginPath(); ctx.moveTo(0, vccY); ctx.lineTo(W, vccY); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, veeY); ctx.lineTo(W, veeY); ctx.stroke();
    ctx.setLineDash([]);

    // 0V center line
    ctx.strokeStyle = ruleColor;
    ctx.lineWidth = 1.2;
    ctx.setLineDash([5, 4]);
    ctx.beginPath(); ctx.moveTo(0, centerY); ctx.lineTo(W, centerY); ctx.stroke();
    ctx.setLineDash([]);

    // Volt labels
    const labelVols = [vcc, vcc / 2, 0, -vcc / 2, -vcc];
    ctx.font = '9px "IBM Plex Mono", monospace';
    ctx.textAlign = 'left';
    for (const v of labelVols) {
      const ly  = centerY - v * ampScale;
      const lbl = v === 0 ? '0V' : `${v > 0 ? '+' : ''}${v}V`;
      const tw  = ctx.measureText(lbl).width;
      ctx.fillStyle = 'rgba(242,237,227,0.82)';
      ctx.fillRect(2, ly - 9, tw + 4, 11);
      ctx.fillStyle = inkDim;
      ctx.fillText(lbl, 3, ly);
    }

    // ── Waveforms ─────────────────────────────────────────────────────
    const N = W;
    const cycles  = 2.5;
    const T       = 1 / params.freq;
    const timeSpan = cycles * T;

    const vinPath  = new Path2D();
    const voutPath = new Path2D();

    for (let i = 0; i <= N; i++) {
      const t    = (i / N) * timeSpan + phaseRef.current;
      const vin  = generateVin(t, params);
      const vout = generateVout(vin, params);
      const x  = (i / N) * W;
      const y1 = centerY - vin  * ampScale;
      const y2 = centerY - vout * ampScale;
      if (i === 0) { vinPath.moveTo(x, y1); voutPath.moveTo(x, y2); }
      else          { vinPath.lineTo(x, y1); voutPath.lineTo(x, y2); }
    }

    ctx.strokeStyle = copperColor;
    ctx.lineWidth = 2.5;
    ctx.stroke(voutPath);

    ctx.strokeStyle = voltColor;
    ctx.lineWidth = 2;
    ctx.stroke(vinPath);

    // Legend (top-left)
    ctx.font = '10px "IBM Plex Mono", monospace';
    ctx.fillStyle = voltColor;
    ctx.fillText('Vin', 6, 14);
    ctx.fillStyle = copperColor;
    ctx.fillText('Vout', 6, 27);

    // ── Hover cursor ──────────────────────────────────────────────────
    const mx = mouseXRef.current;
    if (mx !== null && mx >= 0 && mx <= W) {
      const t    = (mx / W) * timeSpan + phaseRef.current;
      const vin  = generateVin(t, params);
      const vout = generateVout(vin, params);
      const y1   = centerY - vin  * ampScale;
      const y2   = centerY - vout * ampScale;

      ctx.strokeStyle = 'rgba(90,82,70,0.6)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath(); ctx.moveTo(mx, 0); ctx.lineTo(mx, H); ctx.stroke();
      ctx.setLineDash([]);

      ctx.beginPath(); ctx.arc(mx, y1, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = voltColor; ctx.fill();
      ctx.strokeStyle = paperColor; ctx.lineWidth = 1.5; ctx.stroke();

      ctx.beginPath(); ctx.arc(mx, y2, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = copperColor; ctx.fill();
      ctx.strokeStyle = paperColor; ctx.lineWidth = 1.5; ctx.stroke();

      const line1 = `Vin  ${vin  >= 0 ? ' ' : ''}${vin.toFixed(3)} V`;
      const line2 = `Vout ${vout >= 0 ? ' ' : ''}${vout.toFixed(3)} V`;
      ctx.font = '11px "IBM Plex Mono", monospace';
      const tw = Math.max(ctx.measureText(line1).width, ctx.measureText(line2).width);
      const bw = tw + 18, bh = 44;
      let bx = mx + 10;
      if (bx + bw > W - 4) bx = mx - bw - 10;
      const by = 8;

      ctx.fillStyle = 'rgba(26,26,26,0.9)';
      ctx.beginPath();
      ctx.roundRect(bx, by, bw, bh, 3);
      ctx.fill();

      ctx.fillStyle = voltColor;
      ctx.fillText(line1, bx + 9, by + 16);
      ctx.fillStyle = copperColor;
      ctx.fillText(line2, bx + 9, by + 32);
    }

    // ── Advance phase (only when live) ────────────────────────────────
    if (!frozenRef.current) {
      phaseRef.current += T * 0.04 * speedRef.current;
      rafRef.current = requestAnimationFrame(drawRef.current);
    }
  }, [params, width, height]);

  useEffect(() => { drawRef.current = draw; }, [draw]);

  // When frozen transitions false→true, snap phase to 0 for a clean frame
  const prevFrozenRef = useRef(frozen);
  useEffect(() => {
    const wasLive = !prevFrozenRef.current;
    prevFrozenRef.current = frozen;

    cancelAnimationFrame(rafRef.current);
    if (!frozen) {
      rafRef.current = requestAnimationFrame(drawRef.current);
    } else {
      if (wasLive) phaseRef.current = 0; // clean snapshot
      drawRef.current();
    }
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw, frozen]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseXRef.current = (e.clientX - rect.left);
    if (frozenRef.current) drawRef.current();
  };

  const handleMouseLeave = () => {
    mouseXRef.current = null;
    if (frozenRef.current) drawRef.current();
  };

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{ width: '100%', height: '100%', display: 'block', cursor: 'crosshair' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    />
  );
}
