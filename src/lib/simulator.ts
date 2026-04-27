export type CircuitType = 'inverting' | 'noninv' | 'buffer' | 'comp' | 'cascade';
export type Waveform = 'sine' | 'square' | 'triangle' | 'sawtooth';

export interface SimParams {
  circuit: CircuitType;
  rin: number;   // ohms
  rf: number;    // ohms
  rin2: number;  // ohms (cascade stage 2)
  rf2: number;   // ohms (cascade stage 2)
  vcc: number;   // volts (positive rail)
  vinAmp: number; // volts peak
  freq: number;  // hz
  waveform: Waveform;
  vref: number;  // volts (comparator)
}

export const DEFAULT_PARAMS: SimParams = {
  circuit: 'inverting',
  rin: 10000,
  rf: 47000,
  rin2: 10000,
  rf2: 47000,
  vcc: 15,
  vinAmp: 1,
  freq: 1000,
  waveform: 'sine',
  vref: 0,
};

export function calculateGain(p: SimParams): number {
  switch (p.circuit) {
    case 'inverting': return -(p.rf / p.rin);
    case 'noninv':    return 1 + p.rf / p.rin;
    case 'buffer':    return 1;
    case 'comp':      return Infinity;
    case 'cascade':   return (-(p.rf / p.rin)) * (-(p.rf2 / p.rin2));
  }
}

export function calculatePhase(p: SimParams): number {
  switch (p.circuit) {
    case 'inverting': return 180;
    case 'comp':      return 0;
    default:          return 0;
  }
}

export function generateVin(t: number, p: SimParams): number {
  const T = 1 / p.freq;
  const phase = (t % T) / T; // 0..1
  switch (p.waveform) {
    case 'sine':     return p.vinAmp * Math.sin(2 * Math.PI * t * p.freq);
    case 'square':   return p.vinAmp * (phase < 0.5 ? 1 : -1);
    case 'triangle': return p.vinAmp * (phase < 0.5 ? 4 * phase - 1 : 3 - 4 * phase);
    case 'sawtooth': return p.vinAmp * (2 * phase - 1);
  }
}

export function generateVout(vin: number, p: SimParams): number {
  let vout: number;
  if (p.circuit === 'comp') {
    vout = vin > p.vref ? p.vcc : -p.vcc;
  } else {
    const gain = calculateGain(p);
    vout = gain * vin;
  }
  return Math.max(-p.vcc, Math.min(p.vcc, vout));
}

export function isSaturated(p: SimParams): boolean {
  if (p.circuit === 'comp') return true;
  const gain = Math.abs(calculateGain(p));
  return gain * p.vinAmp >= p.vcc;
}

export function formatResistor(ohms: number): string {
  if (ohms >= 1_000_000) return (ohms / 1_000_000).toFixed(1) + 'MΩ';
  if (ohms >= 1_000) return (ohms / 1_000).toFixed(1) + 'kΩ';
  return ohms + 'Ω';
}

export function paramsToQuery(p: SimParams): string {
  const q = new URLSearchParams({
    c: p.circuit,
    rin: String(p.rin),
    rf: String(p.rf),
    rin2: String(p.rin2),
    rf2: String(p.rf2),
    vcc: String(p.vcc),
    va: String(p.vinAmp),
    f: String(p.freq),
    w: p.waveform,
    vref: String(p.vref),
  });
  return q.toString();
}

export function queryToParams(search: string): Partial<SimParams> {
  const q = new URLSearchParams(search);
  const out: Partial<SimParams> = {};
  const c = q.get('c');
  if (c) out.circuit = c as CircuitType;
  if (q.get('rin')) out.rin = Number(q.get('rin'));
  if (q.get('rf'))  out.rf  = Number(q.get('rf'));
  if (q.get('rin2')) out.rin2 = Number(q.get('rin2'));
  if (q.get('rf2'))  out.rf2  = Number(q.get('rf2'));
  if (q.get('vcc'))  out.vcc  = Number(q.get('vcc'));
  if (q.get('va'))   out.vinAmp = Number(q.get('va'));
  if (q.get('f'))    out.freq   = Number(q.get('f'));
  if (q.get('w'))    out.waveform = q.get('w') as Waveform;
  if (q.get('vref')) out.vref   = Number(q.get('vref'));
  return out;
}
