import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLang } from '../contexts/LanguageContext';
import { trackEvent } from '../lib/analytics';
import SEO from '../components/SEO';
import ErrorBoundary from '../components/ErrorBoundary';
import WaveformScope from '../components/UI/WaveformScope';
import Slider from '../components/UI/Slider';
import { getCircuitSVG } from '../components/Circuits/CircuitSVGs';
import {
  DEFAULT_PARAMS, calculateGain, calculatePhase, isSaturated,
  formatResistor, paramsToQuery, queryToParams,
  type SimParams, type CircuitType, type Waveform
} from '../lib/simulator';
import './Simulator.css';

function getGainFormula(p: SimParams): { formula: string; computed: string } {
  switch (p.circuit) {
    case 'inverting': {
      const g = -(p.rf / p.rin);
      return {
        formula: 'A = −Rf / Rin',
        computed: `${formatResistor(p.rf)} / ${formatResistor(p.rin)} = ${g.toFixed(2)}×`,
      };
    }
    case 'noninv': {
      const g = 1 + p.rf / p.rin;
      return {
        formula: 'A = 1 + Rf / Rin',
        computed: `1 + ${formatResistor(p.rf)} / ${formatResistor(p.rin)} = +${g.toFixed(2)}×`,
      };
    }
    case 'buffer':
      return { formula: 'A = 1', computed: 'unity gain — no resistors' };
    case 'comp':
      return { formula: 'Vout = ±Vcc', computed: `open loop  →  ±${p.vcc} V` };
    case 'cascade': {
      const g1 = p.rf  / p.rin;
      const g2 = p.rf2 / p.rin2;
      return {
        formula: 'A = (Rf1/Rin1)·(Rf2/Rin2)',
        computed: `${g1.toFixed(2)} × ${g2.toFixed(2)} = +${(g1 * g2).toFixed(2)}×`,
      };
    }
  }
}

const CIRCUITS: { key: CircuitType; label_tr: string; label_en: string }[] = [
  { key: 'inverting', label_tr: 'Eviren Yükselteç',      label_en: 'Inverting Amplifier' },
  { key: 'noninv',   label_tr: 'Evirmeyen Yükselteç',    label_en: 'Non-Inverting Amplifier' },
  { key: 'buffer',   label_tr: 'Gerilim İzleyici',        label_en: 'Voltage Follower' },
  { key: 'comp',     label_tr: 'Karşılaştırıcı',          label_en: 'Comparator' },
  { key: 'cascade',  label_tr: 'Kaskad (2 Kat)',          label_en: '2-Stage Cascade' },
];

export default function Simulator() {
  const { lang, t } = useLang();
  const [searchParams, setSearchParams] = useSearchParams();
  const scopeRef = useRef<HTMLDivElement>(null);

  const [params, setParams] = useState<SimParams>(() => ({
    ...DEFAULT_PARAMS,
    ...queryToParams(searchParams.toString()),
  }));
  const [frozen, setFrozen] = useState(false);
  const [speed,  setSpeed]  = useState(1);
  const [copied, setCopied] = useState(false);

  const update = (patch: Partial<SimParams>) => {
    setParams(p => ({ ...p, ...patch }));
  };

  useEffect(() => {
    setSearchParams(paramsToQuery(params), { replace: true });
  }, [params, setSearchParams]);

  const gain      = calculateGain(params);
  const phase     = calculatePhase(params);
  const saturated = isSaturated(params);
  const voutAmp   = Math.min(params.vcc, Math.abs(gain) * params.vinAmp);

  const shareUrl = () => {
    const url = `${window.location.origin}/simulator?${paramsToQuery(params)}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    trackEvent('share_url_copied', { circuit: params.circuit });
  };

  const downloadPNG = () => {
    const canvas = scopeRef.current?.querySelector('canvas');
    if (!canvas) return;
    canvas.toBlob(blob => {
      if (!blob) return;
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `opamp-scope-${params.circuit}.png`;
      a.click();
      trackEvent('scope_screenshot_downloaded', { circuit: params.circuit });
    });
  };

  return (
    <div className="sim-page">
      <SEO
        title={t.sim_title}
        description={lang === 'tr'
          ? 'Canlı op-amp simülatörü — inverting, noninverting, buffer, karşılaştırıcı ve kaskad topolojileri.'
          : 'Live op-amp simulator — inverting, non-inverting, buffer, comparator and cascade topologies.'}
        path="/simulator"
        lang={lang}
      />
      <div className="sim-header">
        <div>
          <h1 className="sim-title">{t.sim_title}</h1>
          <p className="sim-lede">{t.sim_lede}</p>
        </div>
        <div className="sim-actions">
          <button className="btn btn-ghost" onClick={downloadPNG} aria-label={t.sim_download}>
            {t.sim_download}
          </button>
          <button className="btn btn-ghost" onClick={shareUrl} aria-label={copied ? 'Bağlantı kopyalandı' : t.sim_share}>
            {copied ? '✓ Kopyalandı' : t.sim_share}
          </button>
        </div>
      </div>

      <div className="sim-layout">
        {/* ====== LEFT: Circuit selector ====== */}
        <aside className="sim-circuits">
          <div className="panel-label">{t.sim_circuit}</div>
          {CIRCUITS.map((c, i) => (
            <button
              key={c.key}
              className={`sim-circ-btn${params.circuit === c.key ? ' active' : ''}`}
              onClick={() => { update({ circuit: c.key }); trackEvent('simulator_circuit_change', { circuit: c.key }); }}
              aria-label={lang === 'tr' ? c.label_tr : c.label_en}
              aria-pressed={params.circuit === c.key}
            >
              <span className="circ-num">{String(i+1).padStart(2,'0')}</span>
              {lang === 'tr' ? c.label_tr : c.label_en}
            </button>
          ))}

          <div className="sim-schematic">
            {getCircuitSVG(params.circuit)}
          </div>

          <div className="sim-formula">
            <div className="sim-formula-main">{getGainFormula(params).formula}</div>
            <div className="sim-formula-computed">{getGainFormula(params).computed}</div>
          </div>
        </aside>

        {/* ====== MIDDLE: Parameters ====== */}
        <aside className="sim-params">
          <div className="panel-label">{t.sim_params}</div>

          <div className="param-group">
            <div className="param-group-label">{t.sim_waveform}</div>
            <div className="wave-btns">
              {(['sine','square','triangle','sawtooth'] as Waveform[]).map(w => (
                <button
                  key={w}
                  className={`wave-btn${params.waveform === w ? ' active' : ''}`}
                  onClick={() => update({ waveform: w })}
                >
                  {t[`sim_${w}` as keyof typeof t] as string}
                </button>
              ))}
            </div>
          </div>

          <div className="param-group">
            <Slider label={t.sim_vin_amp} value={params.vinAmp} min={0.1} max={5} step={0.05}
              format={v => `${v.toFixed(2)} V`} onChange={v => update({ vinAmp: v })} />
            <Slider label={t.sim_freq} value={params.freq} min={10} max={10000} log
              format={v => v >= 1000 ? `${(v/1000).toFixed(1)} kHz` : `${Math.round(v)} Hz`}
              onChange={v => update({ freq: v })} />
            <Slider label={t.sim_vcc} value={params.vcc} min={5} max={18} step={1}
              format={v => `±${v} V`} onChange={v => update({ vcc: v })} />
          </div>

          {params.circuit !== 'buffer' && params.circuit !== 'comp' && (
            <div className="param-group">
              <Slider label={t.sim_rin} value={params.rin} min={1000} max={100000} log
                format={v => formatResistor(Math.round(v))} onChange={v => update({ rin: Math.round(v) })} />
              <Slider label={t.sim_rf} value={params.rf} min={1000} max={1000000} log
                format={v => formatResistor(Math.round(v))} onChange={v => update({ rf: Math.round(v) })} />
            </div>
          )}

          {params.circuit === 'comp' && (
            <div className="param-group">
              <Slider label={t.sim_vref} value={params.vref} min={-params.vcc} max={params.vcc} step={0.1}
                format={v => `${v.toFixed(1)} V`} onChange={v => update({ vref: v })} />
            </div>
          )}

          {params.circuit === 'cascade' && (
            <div className="param-group">
              <div className="param-group-label">Stage 1</div>
              <Slider label="Rin1" value={params.rin} min={1000} max={100000} log
                format={v => formatResistor(Math.round(v))} onChange={v => update({ rin: Math.round(v) })} />
              <Slider label="Rf1" value={params.rf} min={1000} max={1000000} log
                format={v => formatResistor(Math.round(v))} onChange={v => update({ rf: Math.round(v) })} />
              <div className="param-group-label" style={{ marginTop: '0.75rem' }}>Stage 2</div>
              <Slider label="Rin2" value={params.rin2} min={1000} max={100000} log
                format={v => formatResistor(Math.round(v))} onChange={v => update({ rin2: Math.round(v) })} />
              <Slider label="Rf2" value={params.rf2} min={1000} max={1000000} log
                format={v => formatResistor(Math.round(v))} onChange={v => update({ rf2: Math.round(v) })} />
            </div>
          )}
        </aside>

        {/* ====== RIGHT: Scope ====== */}
        <div className="sim-scope-panel">
          <div className="panel-label">{t.sim_scope}</div>

          <div className="scope-canvas" ref={scopeRef}>
            <ErrorBoundary>
              <WaveformScope params={params} frozen={frozen} speed={speed} width={600} height={220} />
            </ErrorBoundary>
          </div>

          {/* ── Scope controls ── */}
          <div className="scope-controls">
            <button
              className={`scope-ctrl-btn${frozen ? ' active' : ''}`}
              onClick={() => setFrozen(f => !f)}
              aria-label={frozen ? 'Dinamik moda geç' : 'Statik moda geç'}
              aria-pressed={frozen}
            >
              {frozen ? '▶ Dinamik' : '⏸ Statik'}
            </button>
            <div className="scope-speed-group">
              <span className="scope-speed-label mono">Hız</span>
              {([0.25, 0.5, 1, 2, 4] as const).map(s => (
                <button
                  key={s}
                  className={`scope-speed-btn${speed === s ? ' active' : ''}${frozen ? ' dimmed' : ''}`}
                  onClick={() => { setSpeed(s); if (frozen) setFrozen(false); }}
                  title={frozen ? 'Hızı değiştirmek için Dinamik moda geçer' : undefined}
                  aria-label={`Hız ${s === 0.25 ? '¼×' : s === 0.5 ? '½×' : `${s}×`}`}
                  aria-pressed={speed === s}
                >
                  {s === 0.25 ? '¼×' : s === 0.5 ? '½×' : `${s}×`}
                </button>
              ))}
            </div>
          </div>

          <div className="scope-metrics">
            <div className={`metric${saturated ? ' saturated' : ''}`}>
              <span className="metric-label">{t.sim_gain}</span>
              <span className="metric-val">
                {params.circuit === 'comp' ? '∞ (open loop)' :
                  isFinite(gain) ? `${gain >= 0 ? '+' : ''}${gain.toFixed(2)}×` : '—'}
              </span>
            </div>
            <div className="metric">
              <span className="metric-label">{t.sim_vout_amp}</span>
              <span className="metric-val">{voutAmp.toFixed(2)} V</span>
            </div>
            <div className="metric">
              <span className="metric-label">{t.sim_phase}</span>
              <span className="metric-val">{params.circuit === 'comp' ? '—' : `${phase}°`}</span>
            </div>
            {saturated && (
              <div className="metric saturated-badge">{t.sim_saturated}</div>
            )}
          </div>

          <div className="scope-legend">
            <span className="legend-vin">── Vin</span>
            <span className="legend-vout">── Vout</span>
            <span className="legend-rail">- - ±Vcc rail</span>
          </div>
        </div>
      </div>
    </div>
  );
}
