export interface Formula {
  label_tr: string;
  label_en: string;
  expr: string;
  vars?: string;
}

export interface Chapter {
  slug: string;
  title_tr: string;
  title_en: string;
  readTime: number;
  simLink?: string;
  body_tr: string;
  body_en: string;
  example_tr: string;
  example_en: string;
  formulas?: Formula[];
}

export const CHAPTERS: Chapter[] = [
  // ── 01 ──────────────────────────────────────────────────────────────────
  {
    slug: 'ideal-opamp',
    title_tr: 'İdeal Op-Amp Modeli',
    title_en: 'The Ideal Op-Amp',
    readTime: 5,
    body_tr: `İşlemsel yükselteç (op-amp), iki giriş arasındaki gerilim farkını çok büyük bir kazançla yükseltip tek bir çıkış sunan aktif bir devre elemanıdır. Analizleri basitleştirmek için "ideal op-amp" modeli kullanılır.

**İdeal op-amp'ın beş altın kuralı:**
1. Açık çevrim kazancı (Aol) = ∞
2. Giriş empedansı (Zin) = ∞ → giriş akımı = 0
3. Çıkış empedansı (Zout) = 0 → çıkış yük seçmez
4. Bant genişliği = ∞ → her frekansta aynı kazanç
5. Ofset gerilimi = 0 → iki giriş eşitlenirse çıkış tam sıfır

Bu kabuller, gerçek devre tasarımında ilk hesaplamalar için son derece iyi sonuçlar verir. Gerçek bir LM741 veya TL071 ile tasarladığınız devrenin ölçümleri bu idealden yalnızca birkaç yüzde sapacaktır.

**Temel çalışma prensibi:** Çıkış gerilimi Vout = Aol × (V⁺ − V⁻). Geri besleme varsa op-amp, bu farkı sıfırlamaya çalışır — bu "sanal kısa devre" ya da "sanal toprak" ilkesinin temelidir.`,
    body_en: `The operational amplifier (op-amp) is an active circuit element that amplifies the voltage difference between two inputs with very high gain and delivers a single output. We use the "ideal op-amp" model to simplify circuit analysis.

**The five golden rules of an ideal op-amp:**
1. Open-loop gain (Aol) = ∞
2. Input impedance (Zin) = ∞ → no input current flows
3. Output impedance (Zout) = 0 → output drives any load
4. Bandwidth = ∞ → same gain at all frequencies
5. Offset voltage = 0 → output is exactly zero when both inputs are equal

These assumptions yield excellent first-pass results in real circuit design. Measurements of a real LM741 or TL071 circuit deviate from the ideal by only a few percent.

**Core operating principle:** Output voltage Vout = Aol × (V⁺ − V⁻). With feedback, the op-amp continuously acts to drive this difference to zero — the foundation of the "virtual short" or "virtual ground" principle.`,
    formulas: [
      {
        label_tr: 'Temel Kazanç Denklemi',
        label_en: 'Fundamental Gain Equation',
        expr: 'Vout = Aol × (V⁺ − V⁻)',
        vars: 'Aol  — açık çevrim kazancı (10⁵ … 10⁶)\nV⁺   — artı (non-inverting) giriş gerilimi\nV⁻   — eksi (inverting) giriş gerilimi',
      },
      {
        label_tr: 'Negatif Geri Beslemede Denge Koşulu',
        label_en: 'Equilibrium Condition with Negative Feedback',
        expr: 'V⁺ = V⁻   (sanal kısa devre)',
        vars: 'Geri besleme varsa op-amp bu koşulu sağlamaya zorlar\nIdeal model: Aol → ∞ iken V⁺ − V⁻ → 0',
      },
    ],
    example_tr: `İdeal model kontrolü:
Aol = 100,000,  V⁺ = 0 V (toprak),  V⁻ = ?
Geri besleme devreyi dengede tutuyorsa → V⁻ = V⁺ = 0 V (sanal toprak).
Gerçek fark: 0 V (ideal) vs. ölçülen ~0.01 mV (gerçek) → %99.999 uyum.`,
    example_en: `Ideal model sanity check:
Aol = 100,000,  V⁺ = 0 V (ground),  V⁻ = ?
If feedback keeps the circuit in balance → V⁻ = V⁺ = 0 V (virtual ground).
Actual difference: 0 V (ideal) vs. measured ~0.01 mV (real) → 99.999% match.`,
  },

  // ── 02 ──────────────────────────────────────────────────────────────────
  {
    slug: 'virtual-ground',
    title_tr: 'Sanal Toprak',
    title_en: 'Virtual Ground',
    readTime: 5,
    simLink: '/simulator?c=inverting&rin=10000&rf=47000',
    body_tr: `Eviren yükseltecin eksi girişine bak: hiçbir şeye bağlı değil gibi görünse de, osiloskopla ölçtüğünde 0 V görürsün. Buna **sanal toprak** denir.

Neden 0 V? Op-amp'ın iki girişi arasındaki farkı devasa bir kazançla yükselttiğini hatırla. Negatif geri besleme, bu farkı sıfıra iterek denge sağlar. Artı giriş 0 V (gerçek toprak) olduğunda, eksi giriş de 0 V'a "sanal" olarak oturur.

**Önemli fark:** Sanal topraktan akım geçemez — gerçek topraktan farklı olarak bu düğüme akım verilmez/alınmaz. Rin üzerinden gelen akım tamamen Rf'e akar. Bu ilke; toplayıcı, integratör ve filtre devrelerinin temelini oluşturur.

**Neden "sanal" toprak işe yarar?** Çünkü geri besleme döngüsü sayesinde op-amp, eksi girişini 0 V'da tutmak için çıkış gerilimini otomatik olarak ayarlar. Siz bunu harici olarak yapmanıza gerek yok — devre kendi kendine dengeler.`,
    body_en: `Look at the inverting amplifier's minus input: it appears connected to nothing, yet a scope shows 0 V. This is the **virtual ground**.

Why 0 V? The op-amp amplifies the difference between its inputs by an enormous gain. Negative feedback drives this difference toward zero. When the non-inverting input is at 0 V (real ground), the inverting input is forced to 0 V "virtually."

**Key distinction:** No current can flow into the virtual ground node — unlike a real ground, no current is sourced or sunk here. All current entering through Rin must flow through Rf. This principle is the foundation of summing, integrator, and filter circuits.

**Why does "virtual" ground work?** Because the feedback loop causes the op-amp to automatically adjust its output voltage to keep the minus input at 0 V. You don't need to do this externally — the circuit self-balances.`,
    formulas: [
      {
        label_tr: 'Sanal Toprak Koşulu (Eviren Devre)',
        label_en: 'Virtual Ground Condition (Inverting Circuit)',
        expr: 'V⁻ = 0 V',
        vars: 'V⁺ = 0 V (toprak bağlantısı)\nNegatif geri besleme sayesinde V⁻ = V⁺ = 0 V',
      },
      {
        label_tr: 'Akım Sürekliliği (KCL)',
        label_en: 'Current Continuity (KCL)',
        expr: 'I_in = I_f  →  Vin/Rin = −Vout/Rf',
        vars: 'I_in — Rin üzerinden giren akım\nI_f  — Rf üzerinden geri besleme akımı\nSanal toprak: op-amp girişine akım girmez',
      },
    ],
    example_tr: `Rin = 10 kΩ, Rf = 47 kΩ, Vin = 1 V.
Sanal toprak → Rin üzerindeki gerilim = Vin − 0 = 1 V.
I_in = 1 V / 10 kΩ = 0.1 mA.
Bu akım Rf'ten geçer: Vout = −0.1 mA × 47 kΩ = −4.7 V.
Kazanç = −4.7 V / 1 V = −4.7 ✓`,
    example_en: `Rin = 10 kΩ, Rf = 47 kΩ, Vin = 1 V.
Virtual ground → voltage across Rin = Vin − 0 = 1 V.
I_in = 1 V / 10 kΩ = 0.1 mA.
All flows through Rf: Vout = −0.1 mA × 47 kΩ = −4.7 V.
Gain = −4.7 V / 1 V = −4.7 ✓`,
  },

  // ── 03 ──────────────────────────────────────────────────────────────────
  {
    slug: 'inverting-amp',
    title_tr: 'Eviren Yükselteç',
    title_en: 'Inverting Amplifier',
    readTime: 6,
    simLink: '/simulator?c=inverting&rin=10000&rf=47000',
    body_tr: `Eviren yükselteç, op-amp'ın en yaygın konfigürasyonlarından biridir. Giriş sinyali, **Rin** direnci üzerinden op-amp'ın eksi (−) girişine uygulanır. **Rf** direnci çıkış ile eksi giriş arasında geri besleme sağlar. Artı (+) giriş toprağa bağlıdır.

**Devre analizi (KCL ile):**
Sanal toprak ilkesinden V⁻ = 0 V. Rin üzerindeki akım I₁ = Vin/Rin. Op-amp girişine akım girmediğinden bu akımın tamamı Rf'ten geçmek zorundadır: I₂ = −Vout/Rf. KCL: I₁ = I₂ → Vout = −(Rf/Rin) × Vin.

**Tasarım notları:**
- Kazanç mutlak değer olarak −Rf/Rin'dir; işaret her zaman terslenmiştir
- Giriş empedansı ≈ Rin'dir (sanal toprak nedeniyle)
- Geri besleme direnci paralel dengeleme: V⁺ toprak yerine Rin ∥ Rf üzerinden bağlanırsa offset akımı hatası minimize edilir`,
    body_en: `The inverting amplifier is one of the most common op-amp configurations. The input signal is applied through **Rin** to the minus (−) input. **Rf** provides feedback from output to minus input. The plus (+) input is tied to ground.

**Circuit analysis (using KCL):**
Virtual ground gives V⁻ = 0 V. Current through Rin: I₁ = Vin/Rin. Since no current enters the op-amp input, all of it must flow through Rf: I₂ = −Vout/Rf. KCL: I₁ = I₂ → Vout = −(Rf/Rin) × Vin.

**Design notes:**
- Gain magnitude is Rf/Rin; polarity is always inverted
- Input impedance ≈ Rin (due to virtual ground)
- Feedback resistor bias compensation: connect V⁺ through Rin ∥ Rf to ground to minimize offset current error`,
    formulas: [
      {
        label_tr: 'Kapalı Çevrim Kazancı',
        label_en: 'Closed-Loop Gain',
        expr: 'Av = −Rf / Rin',
        vars: 'Rf  — geri besleme direnci\nRin — giriş direnci\n(−) işareti: faz terslemesi',
      },
      {
        label_tr: 'Giriş Empedansı',
        label_en: 'Input Impedance',
        expr: 'Zin = Rin',
        vars: 'Sanal toprak nedeniyle eksi giriş 0 V\'da görünür\nGiriş akımı tamamen Rin üzerinden çekilir',
      },
      {
        label_tr: 'Denge Noktası Direnci (Offset Azaltma)',
        label_en: 'Balance Resistor (Offset Reduction)',
        expr: 'R_bal = Rin ∥ Rf  =  Rin × Rf / (Rin + Rf)',
        vars: 'Artı girişi R_bal ile toprağa bağla\nBias akımı kaynaklı offset gerilimini minimize eder',
      },
    ],
    example_tr: `Hedef: Av = −10×, Rin = 10 kΩ.
Rf = 10 × 10 kΩ = 100 kΩ seç.
Denge direnci: R_bal = 10k ∥ 100k = 9.09 kΩ → 9.1 kΩ standart değer.
Vin = 500 mV sinüs → Vout = −5 V sinüs (ters fazda).`,
    example_en: `Target: Av = −10×, Rin = 10 kΩ.
Choose Rf = 10 × 10 kΩ = 100 kΩ.
Balance resistor: R_bal = 10k ∥ 100k = 9.09 kΩ → 9.1 kΩ standard value.
Vin = 500 mV sine → Vout = −5 V sine (inverted phase).`,
  },

  // ── 04 ──────────────────────────────────────────────────────────────────
  {
    slug: 'noninverting-amp',
    title_tr: 'Evirmeyen Yükselteç',
    title_en: 'Non-Inverting Amplifier',
    readTime: 5,
    simLink: '/simulator?c=noninv&rin=10000&rf=47000',
    body_tr: `Evirmeyen yükseltecin girişi artı (+) terminale bağlanır. Çıkış ile eksi (−) giriş arasına Rf, eksi giriş ile toprak arasına Rin yerleştirilir. Sonuç: giriş ile eş fazlı, +1 veya daha yüksek kazançlı bir çıkış.

**Devre analizi:**
Geri besleme bölücüsü Rin ve Rf, çıkışı eksi girişe katar. Denge için V⁻ = V⁺ = Vin. V⁻ gerilim bölücü ile: V⁻ = Vout × Rin/(Rin+Rf). Denklem kurulunca: Vout = (1 + Rf/Rin) × Vin.

**Eviren ile farkları:**
- Kazanç en az +1 (buffer dahil), sıfır veya negatif olamaz
- Giriş empedansı çok yüksektir (giriş doğrudan artı terminale)
- Faz terslemesi yoktur
- Buffer (gerilim izleyici) bu devrenin Rf=0, Rin=∞ özel durumudur`,
    body_en: `The non-inverting amplifier's input connects to the plus (+) terminal. Rf goes from output to minus (−) input; Rin goes from minus input to ground. Result: in-phase output with gain ≥ +1.

**Circuit analysis:**
Feedback divider (Rin, Rf) samples the output back to the minus input. For balance: V⁻ = V⁺ = Vin. Voltage divider at minus input: V⁻ = Vout × Rin/(Rin+Rf). Solving: Vout = (1 + Rf/Rin) × Vin.

**Differences from inverting:**
- Gain is always ≥ +1 (including unity/buffer), never zero or negative
- Input impedance is very high (input goes directly to plus terminal)
- No phase inversion
- Buffer (voltage follower) is the special case with Rf=0, Rin=∞`,
    formulas: [
      {
        label_tr: 'Kapalı Çevrim Kazancı',
        label_en: 'Closed-Loop Gain',
        expr: 'Av = 1 + Rf / Rin',
        vars: 'Rf  — geri besleme direnci\nRin — toprak direnci\nAv ≥ 1 her zaman',
      },
      {
        label_tr: 'Geriş Besleme Faktörü (β)',
        label_en: 'Feedback Factor (β)',
        expr: 'β = Rin / (Rin + Rf)',
        vars: 'β — çıkışın ne kadarının eksi girişe döndüğü\nAv = 1/β (ideal model)',
      },
      {
        label_tr: 'Buffer (Gerilim İzleyici)',
        label_en: 'Buffer (Voltage Follower)',
        expr: 'Rf = 0,  Rin = ∞  →  Av = 1',
        vars: 'Vout = Vin, giriş ve çıkış eş faz\nGiriş empedansı → ∞, çıkış empedansı → 0',
      },
    ],
    example_tr: `Hedef: Av = +6×, Rin = 10 kΩ.
6 = 1 + Rf/10k → Rf = 5 × 10k = 50 kΩ (standart: 47 kΩ → Av ≈ 5.7×)
Hassas istiyorsan: 49.9 kΩ (1% toleranslı) → Av ≈ 5.99×
Vin = 200 mV → Vout ≈ 1.2 V (eş fazda)`,
    example_en: `Target: Av = +6×, Rin = 10 kΩ.
6 = 1 + Rf/10k → Rf = 5 × 10k = 50 kΩ (standard: 47 kΩ → Av ≈ 5.7×)
For precision: use 49.9 kΩ (1% resistor) → Av ≈ 5.99×
Vin = 200 mV → Vout ≈ 1.2 V (in phase)`,
  },

  // ── 05 ──────────────────────────────────────────────────────────────────
  {
    slug: 'summing-amp',
    title_tr: 'Toplayıcı Yükselteç',
    title_en: 'Summing Amplifier',
    readTime: 5,
    simLink: '/simulator?c=inverting',
    body_tr: `Toplayıcı yükselteç, birden fazla giriş sinyalini ağırlıklı olarak toplar. Eviren yapının doğal bir uzantısıdır: sanal toprak ilkesi sayesinde her giriş akımı bağımsız olarak hesaplanır.

**Çalışma prensibi:** Her giriş kendi direnci üzerinden sanal toprak noktasına akım katar. Op-amp girişine akım girmediğinden tüm bu akımlar Rf'ten geçmek zorundadır. Vout = −Rf × (V1/R1 + V2/R2 + V3/R3).

**Eşit ağırlıklı toplayıcı:** Tüm giriş dirençleri eşit ise (R1 = R2 = R3 = R) kazanç eşit dağılır: Vout = −(Rf/R) × (V1 + V2 + V3). DAC (Sayısal-Analog Çevirici) devrelerinde bu topoloji kullanılır; her bit farklı ağırlıklı bir direnç alır.`,
    body_en: `The summing amplifier performs a weighted sum of multiple input signals. It is a natural extension of the inverting configuration: virtual ground means each input current is calculated independently.

**Operation:** Each input contributes a current through its own resistor to the virtual ground node. Since no current enters the op-amp input, all these currents must flow through Rf. Vout = −Rf × (V1/R1 + V2/R2 + V3/R3).

**Equal-weight summing:** If all input resistors are equal (R1 = R2 = R3 = R): Vout = −(Rf/R) × (V1 + V2 + V3). DAC circuits use this topology; each bit gets a binary-weighted resistor.`,
    formulas: [
      {
        label_tr: 'Ağırlıklı Toplama',
        label_en: 'Weighted Sum',
        expr: 'Vout = −Rf × (V1/R1 + V2/R2 + V3/R3)',
        vars: 'R1,R2,R3 — giriş dirençleri\nV1,V2,V3 — giriş gerilimleri\nRf       — geri besleme direnci',
      },
      {
        label_tr: 'Eşit Ağırlıklı Toplama',
        label_en: 'Equal-Weight Sum',
        expr: 'Vout = −(Rf / R) × (V1 + V2 + V3)',
        vars: 'R = R1 = R2 = R3 (eşit giriş dirençleri)',
      },
    ],
    example_tr: `Ses mikseri: iki kanal, R1 = R2 = 10 kΩ, Rf = 10 kΩ.
Kanal 1: V1 = 0.5 V, Kanal 2: V2 = 0.8 V.
Vout = −(10k/10k) × (0.5 + 0.8) = −1 × 1.3 = −1.3 V.
Kazanç 0 dB, sanal toprak her kanalı izole eder — kanallar birbirini etkilemez.`,
    example_en: `Audio mixer: two channels, R1 = R2 = 10 kΩ, Rf = 10 kΩ.
Channel 1: V1 = 0.5 V, Channel 2: V2 = 0.8 V.
Vout = −(10k/10k) × (0.5 + 0.8) = −1 × 1.3 = −1.3 V.
0 dB gain, virtual ground isolates each channel — channels don't interact.`,
  },

  // ── 06 ──────────────────────────────────────────────────────────────────
  {
    slug: 'difference-amp',
    title_tr: 'Fark Yükselteci',
    title_en: 'Difference Amplifier',
    readTime: 5,
    body_tr: `Fark yükselteci, iki giriş arasındaki gerilim farkını yükseltir ve ortak modu reddeder. Her iki giriş de hem Rin hem de Rf dirençleri ile biçimlendirilir.

**Çalışma:** V1 eksi girişe, V2 artı girişe uygulanır (her ikisi direnç bölücü üzerinden). Dört direnç eşit seçilirse (R1 = R2 = R3 = R4 = R): Vout = (V2 − V1).

**Gerçek CMRR için duyarlılık:** Direnç toleransları CMRR'yi doğrudan etkiler. %1 toleranslı dirençler teorik ∞ yerine ~40–46 dB CMRR sağlar. Yüksek hassasiyetli uygulamalar için hassas eşleşmiş direnç ağı (ör. INA series) kullanılır.`,
    body_en: `The difference amplifier amplifies the voltage difference between two inputs while rejecting common-mode signals. Both inputs are conditioned through Rin and Rf resistors.

**Operation:** V1 applied to minus input, V2 to plus input (each through a resistor divider). With all four resistors equal (R1 = R2 = R3 = R4 = R): Vout = (V2 − V1).

**CMRR sensitivity to resistor matching:** Resistor tolerances directly affect CMRR. 1% resistors yield ~40–46 dB CMRR instead of the theoretical ∞. High-precision applications use matched resistor networks (e.g., INA series).`,
    formulas: [
      {
        label_tr: 'Genel Kazanç Formülü',
        label_en: 'General Gain Formula',
        expr: 'Vout = (R4/R3) × (1 + R2/R1) / (1 + R4/R3) × V2 − (R2/R1) × V1',
        vars: 'R1,R2 — eksi giriş yolundaki dirençler\nR3,R4 — artı giriş yolundaki dirençler',
      },
      {
        label_tr: 'Eşit Direnç Durumu',
        label_en: 'Equal Resistor Case',
        expr: 'R1 = R2 = R3 = R4 = R  →  Vout = V2 − V1',
        vars: 'Birim fark kazancı\nOrtak mod tamamen reddedilir (ideal)',
      },
      {
        label_tr: 'Kazançlı Fark Yükselteci',
        label_en: 'Differential Amplifier with Gain',
        expr: 'R2/R1 = R4/R3 = Av  →  Vout = Av × (V2 − V1)',
        vars: 'Av — diferansiyel kazanç\nOran eşliği korunmalı: R2/R1 = R4/R3',
      },
    ],
    example_tr: `Köprü sensörü ölçümü: V1 = 2.48 V, V2 = 2.52 V (ortak mod = 2.5 V, fark = 40 mV).
Tüm dirençler 10 kΩ → Vout = V2 − V1 = 40 mV.
Av = 100 istiyorsan: R1 = R3 = 1 kΩ, R2 = R4 = 100 kΩ.
Vout = 100 × 40 mV = 4 V.`,
    example_en: `Bridge sensor measurement: V1 = 2.48 V, V2 = 2.52 V (common-mode = 2.5 V, diff = 40 mV).
All resistors 10 kΩ → Vout = V2 − V1 = 40 mV.
For Av = 100: use R1 = R3 = 1 kΩ, R2 = R4 = 100 kΩ.
Vout = 100 × 40 mV = 4 V.`,
  },

  // ── 07 ──────────────────────────────────────────────────────────────────
  {
    slug: 'integrator',
    title_tr: 'İntegratör',
    title_en: 'Integrator',
    readTime: 5,
    body_tr: `Op-amp integratörü, Rf yerine kondansatör (C) kullanarak giriş sinyalinin zamanla integralini alır. Bu devre aktif alçak geçiren filtre olarak ve dalga biçimi dönüştürücü olarak kullanılır.

**Çalışma prensibi:** Sanal toprak sayesinde Rin üzerindeki akım I = Vin/Rin. Bu akım kondansatörü şarj eder: Vout = −(1/RC) × ∫Vin dt. Kare dalga girişi → üçgen dalga çıkışı. Sinüs girişi → faz 90° gecikir ve genlik frekansla ters orantılı azalır.

**Pratik sorun: DC kararsızlığı.** Küçük bir ofset gerilimi bile zamanla kondansatörü doyurur ve çıkış raya vurur. Çözüm: Kondansatöre paralel büyük değerli bir Rf direnci eklemek (tipik 1 MΩ). Bu, düşük frekanslarda kazancı sınırlar.`,
    body_en: `The op-amp integrator replaces Rf with a capacitor (C) to compute the time integral of the input signal. Used as an active low-pass filter and waveform converter.

**Operation:** Virtual ground means current through Rin is I = Vin/Rin. This current charges the capacitor: Vout = −(1/RC) × ∫Vin dt. Square wave in → triangle wave out. Sine in → 90° phase lag, amplitude inversely proportional to frequency.

**Practical problem: DC instability.** Even a small offset voltage will charge the capacitor over time and rail the output. Solution: add a large Rf (typically 1 MΩ) in parallel with the capacitor to limit low-frequency gain.`,
    formulas: [
      {
        label_tr: 'İntegral Denklemi',
        label_en: 'Integration Equation',
        expr: 'Vout(t) = −(1 / RC) × ∫ Vin(t) dt',
        vars: 'R  — giriş direnci\nC  — geri besleme kondansatörü\nRC — zaman sabiti (saniye)',
      },
      {
        label_tr: 'Frekans Domeni (AC)',
        label_en: 'Frequency Domain (AC)',
        expr: 'Av(f) = −1 / (j·2π·f·RC)',
        vars: '|Av| = 1/(2πfRC) — frekansla ters orantılı\n−20 dB/dekad eğim (1. dereceden LP filtre)',
      },
      {
        label_tr: 'Kesim Frekansı (Rf paralel)',
        label_en: 'Corner Frequency (with parallel Rf)',
        expr: 'fc = 1 / (2π · Rf · C)',
        vars: 'fc altında → integratör gibi davranır\nfc üstünde → düz kazanç (−Rf/Rin)',
      },
    ],
    example_tr: `R = 10 kΩ, C = 100 nF → RC = 1 ms.
Kare dalga Vin: genlik ±1 V, frekans 1 kHz (T = 1 ms).
Her yarı periyotta (0.5 ms) üçgen dalga değişimi: ΔVout = Vin/(RC) × Δt = 1/(1ms) × 0.5ms = 0.5 V.
Çıkış ±0.5 V üçgen dalgası (giriş kare dalgasının integrali).`,
    example_en: `R = 10 kΩ, C = 100 nF → RC = 1 ms.
Square wave input: ±1 V amplitude, 1 kHz (T = 1 ms).
Per half-period (0.5 ms) triangle change: ΔVout = Vin/(RC) × Δt = 1/(1ms) × 0.5ms = 0.5 V.
Output is ±0.5 V triangle wave (integral of the square wave input).`,
  },

  // ── 08 ──────────────────────────────────────────────────────────────────
  {
    slug: 'differentiator',
    title_tr: 'Diferansiyatör',
    title_en: 'Differentiator',
    readTime: 4,
    body_tr: `Diferansiyatör, integratörün tersidir: giriş kondesansatör, geri besleme dirençtir. Çıkış, girişin zamansal türevine orantılıdır.

**Çalışma:** Kondansatör akımı I = C × dVin/dt. Bu akım Rf üzerinden geçer: Vout = −Rf × C × dVin/dt. Üçgen dalga → kare dalga. Sinüs → faz 90° ilerler, genlik frekansla orantılı artar.

**Gürültü sorunu:** Türev işlemi yüksek frekanslara karşı hassastır — diferansiyatör gürültüyü yükseltir. Giriş kondansatörüne seri küçük bir Rin direnci eklemek (RC filtre), yüksek frekanslarda kazancı sınırlar ve devreyi kararlı tutar.

**Kullanım alanları:** Kenar algılama devreleri, hız/ivme hesaplama, frekans bağımlı kazanç devreleri.`,
    body_en: `The differentiator is the inverse of the integrator: input has a capacitor, feedback uses a resistor. Output is proportional to the time derivative of the input.

**Operation:** Capacitor current I = C × dVin/dt. This flows through Rf: Vout = −Rf × C × dVin/dt. Triangle in → square wave out. Sine in → 90° phase lead, amplitude proportional to frequency.

**Noise problem:** Differentiation emphasizes high frequencies — a differentiator amplifies noise. Adding a small Rin in series with the input capacitor (RC filter) limits high-frequency gain and keeps the circuit stable.

**Applications:** Edge detection circuits, velocity/acceleration measurement, frequency-dependent gain circuits.`,
    formulas: [
      {
        label_tr: 'Türev Denklemi',
        label_en: 'Differentiation Equation',
        expr: 'Vout(t) = −Rf × C × dVin/dt',
        vars: 'Rf — geri besleme direnci\nC  — giriş kondansatörü',
      },
      {
        label_tr: 'Frekans Domeni (AC)',
        label_en: 'Frequency Domain (AC)',
        expr: 'Av(f) = −j·2π·f·Rf·C',
        vars: '|Av| = 2πfRfC — frekansla orantılı artar\n+20 dB/dekad eğim (HP filtre)',
      },
      {
        label_tr: 'Gürültü Sınırlama Direnci',
        label_en: 'Noise-Limiting Resistor',
        expr: 'fc_max = 1 / (2π × Rin × C)',
        vars: 'Rin — giriş kondansatörüne seri direnç\nfc_max üstünde kazanç sabitlenir (−Rf/Rin)',
      },
    ],
    example_tr: `Rf = 10 kΩ, C = 10 nF → RfC = 100 μs.
Üçgen dalga: genlik ±1 V, frekans 1 kHz.
dV/dt = 2×1V / (0.5ms) = 4000 V/s.
Vout = −100μs × 4000 = −0.4 V → kare dalga ±0.4 V çıkışı.`,
    example_en: `Rf = 10 kΩ, C = 10 nF → RfC = 100 μs.
Triangle wave: ±1 V amplitude, 1 kHz.
dV/dt = 2×1V / (0.5ms) = 4000 V/s.
Vout = −100μs × 4000 = −0.4 V → square wave ±0.4 V output.`,
  },

  // ── 09 ──────────────────────────────────────────────────────────────────
  {
    slug: 'open-loop-gain',
    title_tr: 'Açık Çevrim Kazancı',
    title_en: 'Open-Loop Gain',
    readTime: 4,
    simLink: '/simulator?c=comp',
    body_tr: `Gerçek bir op-amp'ın açık çevrim kazancı (Aol) 10⁵ ile 10⁶ arasındadır — 100.000× ila 1.000.000×. Bu devasa kazanç geri besleme olmadan pratikte kullanılamaz.

Neden? Vin = 1 mV olsa bile, geri besleme yoksa Vout = 100.000 mV = 100 V olurdu — ancak besleme gerilimi ±15 V ile sınırlı. Çıkış anında +Vcc veya −Vee'ye "yapışır". **Karşılaştırıcı** tam da bunu kullanır.

Geri besleme eklediğinde bu devasa kazanç, tahmin edilebilir küçük bir değere "ehlileşir". Kazanç artık yalnızca dış direnç oranına bağlıdır — op-amp'ın iç yapısına değil.

**Frekansla düşüş:** Açık çevrim kazancı DC'de maksimumda olup frekans arttıkça azalır. Genellikle ~10 Hz'de bozulmaya başlar ve her dekatta 20 dB düşer (1. dereceden alçak geçiren davranış).`,
    body_en: `A real op-amp's open-loop gain (Aol) is between 10⁵ and 10⁶ — 100,000× to 1,000,000×. This enormous gain is practically unusable without feedback.

Why? Even Vin = 1 mV would produce Vout = 100,000 mV = 100 V — but the supply is only ±15 V. The output instantly slams to +Vcc or −Vee. This is exactly what a **comparator** exploits.

Add feedback and this enormous gain is "tamed" into a predictable, small value. The gain now depends only on external resistor ratios — not the op-amp's internal properties.

**Frequency rolloff:** Open-loop gain is maximum at DC and decreases with frequency, typically starting to roll off around 10 Hz, dropping 20 dB per decade (first-order low-pass behavior).`,
    formulas: [
      {
        label_tr: 'Açık Çevrim Kazancı',
        label_en: 'Open-Loop Gain',
        expr: 'Vout = Aol × (V⁺ − V⁻)',
        vars: 'Aol ≈ 10⁵ … 10⁶ (tipik)\nGeri besleme yoksa çıkış raya vurur',
      },
      {
        label_tr: 'Frekans ile Kazanç (LP modeli)',
        label_en: 'Gain vs. Frequency (LP model)',
        expr: 'Aol(f) ≈ GBW / f',
        vars: 'GBW — kazanç-bant genişliği çarpımı\nf   — işaret frekansı\n(f >> fp, birinci kutup frekansı için)',
      },
    ],
    example_tr: `Karşılaştırıcı: Vin = 1.001 V, Vref = 1 V → fark = 1 mV.
Aol = 100,000: teorik Vout = 100 V → gerçekte +15 V (Vcc'ye yapışır).
Vin = 0.999 V → teorik Vout = −100 V → gerçekte −15 V (Vee'ye yapışır).
Karşılaştırıcı çıkışı: 0/1 (dijital sinyal üretici).`,
    example_en: `Comparator: Vin = 1.001 V, Vref = 1 V → difference = 1 mV.
Aol = 100,000: theoretical Vout = 100 V → actual +15 V (slams to Vcc).
Vin = 0.999 V → theoretical Vout = −100 V → actual −15 V (slams to Vee).
Comparator output: 0/1 (digital signal generator).`,
  },

  // ── 10 ──────────────────────────────────────────────────────────────────
  {
    slug: 'negative-feedback',
    title_tr: 'Negatif Geri Besleme',
    title_en: 'Negative Feedback',
    readTime: 6,
    simLink: '/simulator?c=noninv&rin=10000&rf=47000',
    body_tr: `Geri besleme, çıkışın bir kısmını girişe geri döndürmektir. "Negatif" terimi, geri dönen sinyalin girişi azaltacak şekilde uygulanmasını ifade eder.

Eviren yükseltecin geri besleme döngüsünü izle: Vout yükseldiğinde Rf üzerinden eksi girişe iletilen sinyal de yükselir. Eksi giriş artı girişi geçince op-amp çıkışı düşürür. Bu kendi kendini dengeleyen mekanizma, kazancı −Rf/Rin'e kilitleyen şeydir.

**Negatif geri beslemenin faydaları:**
- Kazanç, op-amp parametrelerine değil direnç oranına bağlı → üretimden bağımsız
- Bant genişliği artar (GBW / Av)
- Doğrusal olmayan bozulma azalır
- Giriş ve çıkış empedansları düzelir

**Pozitif geri beslemeyle karşılaştırma:** Çıkış eksi yerine artı girişe bağlanırsa pozitif geri besleme oluşur → devre ya osilatör ya da karşılaştırıcı (Schmitt trigger) davranışı gösterir.`,
    body_en: `Feedback is returning a fraction of the output back to the input. "Negative" means this returned signal opposes the input change.

Follow the inverting amplifier's feedback loop: when Vout rises, the signal fed back through Rf to the minus input also rises. When the minus input exceeds the plus input, the op-amp drives the output down. This self-correcting mechanism locks gain to −Rf/Rin.

**Benefits of negative feedback:**
- Gain depends on resistor ratio, not op-amp parameters → manufacturing independent
- Bandwidth increases (GBW / Av)
- Nonlinear distortion is reduced
- Input and output impedances are corrected

**Comparison with positive feedback:** Connecting the output to the plus input instead creates positive feedback → the circuit behaves as either an oscillator or comparator (Schmitt trigger).`,
    formulas: [
      {
        label_tr: 'Kapalı Çevrim Kazancı (Genel)',
        label_en: 'Closed-Loop Gain (General)',
        expr: 'Acl = Aol / (1 + Aol × β)',
        vars: 'Aol — açık çevrim kazancı\nβ   — geri besleme faktörü\nAol·β >> 1 ise Acl ≈ 1/β',
      },
      {
        label_tr: 'Geri Besleme Faktörü (Eviren)',
        label_en: 'Feedback Factor (Inverting)',
        expr: 'β = Rin / (Rin + Rf)',
        vars: 'Acl = −Rf/Rin (ideal, Aol → ∞)',
      },
    ],
    example_tr: `Rin = 10 kΩ, Rf = 100 kΩ → Acl = −100k/10k = −10×
Vin = 0.5 V → Vout = −5 V (Vcc ≥ 5 V ise klipleme yok)
Op-amp değiştir: LM741 → TL071 — kazanç hâlâ −10× (direnç oranı değişmedi).`,
    example_en: `Rin = 10 kΩ, Rf = 100 kΩ → Acl = −100k/10k = −10×
Vin = 0.5 V → Vout = −5 V (no clipping if Vcc ≥ 5 V)
Swap chip: LM741 → TL071 — gain still −10× (resistor ratio unchanged).`,
  },

  // ── 11 ──────────────────────────────────────────────────────────────────
  {
    slug: 'cmrr',
    title_tr: 'Ortak Mod Reddi (CMRR)',
    title_en: 'Common-Mode Rejection (CMRR)',
    readTime: 5,
    body_tr: `Op-amp iki giriş arasındaki farkı yükseltir, her iki girişte aynı anda var olan sinyali (ortak mod) ise yok sayar. Bu özelliğin ölçüsü **CMRR**'dir.

**Matematiksel tanım:** CMRR = Ad / Acm. Ad diferansiyel kazanç, Acm ise ortak mod kazancı. İdeal op-amp'ta Acm = 0, yani CMRR = ∞. Gerçek op-amp'larda 60–120 dB (1,000× – 1,000,000×) arasında değişir.

**Pratik önemi:** EKG elektrodu kola yerleştirildiğinde 50 Hz şebeke gürültüsü her iki elektroda da eşit biner. Op-amp bunu ortak mod olarak görür ve reddeder. Geriye yalnız iki elektrot arasındaki fark — kalp atışı — kalır.

**Frekansla bozulma:** CMRR frekans arttıkça düşer. Datasheet'te frekans-CMRR grafiğini kontrol et.`,
    body_en: `An op-amp amplifies the difference between its two inputs while rejecting any signal present on both inputs simultaneously (common mode). **CMRR** measures how well it does this.

**Mathematical definition:** CMRR = Ad / Acm. Ad is differential gain, Acm is common-mode gain. In an ideal op-amp Acm = 0, so CMRR = ∞. Real op-amps range from 60–120 dB (1,000× – 1,000,000×).

**Practical importance:** EKG electrodes on the arm pick up 50 Hz mains noise equally on both. The op-amp sees this as common-mode and rejects it. Only the difference — the heartbeat — remains.

**Frequency degradation:** CMRR decreases as frequency rises. Always check the frequency vs. CMRR plot in the datasheet.`,
    formulas: [
      {
        label_tr: 'CMRR Tanımı',
        label_en: 'CMRR Definition',
        expr: 'CMRR = Ad / Acm',
        vars: 'Ad  — diferansiyel kazanç\nAcm — ortak mod kazancı\ndB cinsinden: CMRR_dB = 20·log₁₀(Ad/Acm)',
      },
      {
        label_tr: 'Çıkışa Yansıyan Ortak Mod Hatası',
        label_en: 'Output Error from Common-Mode',
        expr: 'Verror = Vcm / CMRR_linear',
        vars: 'Vcm        — ortak mod gerilimi\nCMRR_linear — doğrusal CMRR değeri (10^(dB/20))',
      },
    ],
    example_tr: `CMRR = 80 dB → CMRR_linear = 10,000.
Ortak mod gürültüsü Vcm = 1 V (50 Hz şebeke).
Çıkışa yansıyan gürültü = 1 V / 10,000 = 0.1 mV → ihmal edilebilir.
Diferansiyel sinyal (kalp atışı) = 1 mV → tam yükseltilir, S/N = 10,000 : 1.`,
    example_en: `CMRR = 80 dB → CMRR_linear = 10,000.
Common-mode noise Vcm = 1 V (50 Hz mains).
Output error = 1 V / 10,000 = 0.1 mV → negligible.
Differential signal (heartbeat) = 1 mV → fully amplified, S/N = 10,000 : 1.`,
  },

  // ── 12 ──────────────────────────────────────────────────────────────────
  {
    slug: 'gbw',
    title_tr: 'Bant Genişliği & GBW',
    title_en: 'Bandwidth & GBW',
    readTime: 5,
    simLink: '/simulator?c=inverting&freq=10000',
    body_tr: `Op-amp'ın **kazanç-bant genişliği çarpımı (GBW)** sabittir. Kazancı artırırsan bant genişliği düşer; bant genişliğini artırmak istersen kazançtan fedakarlık etmen gerekir.

Tipik bir op-amp (LM741) için GBW ≈ 1 MHz. Kazanç = 1 (buffer) → bant genişliği = 1 MHz. Kazanç = 10× → bant genişliği = 100 kHz. Kazanç = 100× → bant genişliği = 10 kHz.

**Ses tasarımı örneği:** Sesin 20 kHz'e kadar gittiğini düşün. Kazancı 100× olan bir eviren yükselteç, 10 kHz'in üzerinde zayıflamaya başlar ve yüksek frekanslardaki ses kalitesi bozulur. Çözüm: GBW'si daha yüksek bir op-amp seç (ör. TL071: GBW = 3 MHz, OPA2134: 8 MHz).

**Çok katlı devreler:** Kaskad bağlı iki op-amp'ın toplam bant genişliği, tek katın bant genişliğinden önemli ölçüde düşüktür. n eşit katlı kaskad: BW_toplam ≈ BW_tek × √(2^(1/n) − 1).`,
    body_en: `An op-amp's **gain-bandwidth product (GBW)** is constant. Increase gain and bandwidth drops; want more bandwidth, sacrifice gain.

Typical op-amp (LM741): GBW ≈ 1 MHz. Gain = 1 (buffer) → bandwidth = 1 MHz. Gain = 10× → bandwidth = 100 kHz. Gain = 100× → bandwidth = 10 kHz.

**Audio design example:** Audio goes to 20 kHz. An inverting amp with 100× gain starts rolling off at 10 kHz — audible quality degradation. Solution: choose an op-amp with higher GBW (e.g. TL071: GBW = 3 MHz, OPA2134: 8 MHz).

**Multi-stage circuits:** Two cascaded op-amps have much less total bandwidth than a single stage. For n identical cascaded stages: BW_total ≈ BW_single × √(2^(1/n) − 1).`,
    formulas: [
      {
        label_tr: 'Kazanç-Bant Genişliği Çarpımı',
        label_en: 'Gain-Bandwidth Product',
        expr: 'GBW = |Av| × BW = sabit',
        vars: 'Av  — kapalı çevrim kazancı\nBW  — −3 dB bant genişliği\nGBW — op-amp datasheet\'indeki sabit değer',
      },
      {
        label_tr: 'Kullanılabilir Bant Genişliği',
        label_en: 'Usable Bandwidth',
        expr: 'BW = GBW / |Av|',
        vars: '|Av| — istenen kazanç büyüklüğü',
      },
    ],
    example_tr: `GBW = 1 MHz, hedef kazanç = 47×.
BW = 1,000,000 / 47 ≈ 21.3 kHz — ses için yeterince geniş.
Kazancı 100×'e çıkarırsan: BW = 10 kHz — tizler kesilir.
Çözüm: GBW ≥ 100 × 20 kHz = 2 MHz olan bir op-amp seç (TL071 = 3 MHz ✓).`,
    example_en: `GBW = 1 MHz, desired gain = 47×.
BW = 1,000,000 / 47 ≈ 21.3 kHz — sufficient for full-range audio.
Raise gain to 100×: BW = 10 kHz — highs are cut.
Solution: choose op-amp with GBW ≥ 100 × 20 kHz = 2 MHz (TL071 = 3 MHz ✓).`,
  },

  // ── 13 ──────────────────────────────────────────────────────────────────
  {
    slug: 'slew-rate',
    title_tr: 'Slew Rate (Gerilim Değişim Hızı)',
    title_en: 'Slew Rate',
    readTime: 4,
    simLink: '/simulator?c=buffer&w=square&freq=10000',
    body_tr: `**Slew rate**, op-amp çıkışının birim zamandaki maksimum değişim hızıdır (V/μs). Bu hız aşılırsa, girişte hızlı bir değişiklik olsa bile çıkış yetişemez ve sinyal bozulur.

Tipik değerler:
- LM741: 0.5 V/μs
- TL071: 13 V/μs
- OP37: 17 V/μs
- AD811: 2500 V/μs (video op-amp)

**Görsel etki:** Kare dalga yüksek frekanslarda keskin köşelerini kaybeder; sinüs ise üçgene dönüşmeye başlar. Osiloskopda eğim sabit bir rampa görürsen slew rate ile sınırlanıyorsun demektir.

**GBW ile farkı:** GBW küçük sinyal özelliğidir (lineer bölge). Slew rate büyük sinyal özelliğidir ve daha düşük frekanslarda bozulmaya yol açabilir.`,
    body_en: `**Slew rate** is the maximum rate of output voltage change (V/μs). Exceed it and the output simply cannot keep up with a fast input — the signal distorts.

Typical values:
- LM741: 0.5 V/μs
- TL071: 13 V/μs
- OP37: 17 V/μs
- AD811: 2500 V/μs (video op-amp)

**Visual effect:** Square waves lose sharp edges at high frequency; sine waves start looking triangular. If you see a constant-slope ramp on the oscilloscope, you're slew-rate limited.

**Difference from GBW:** GBW is a small-signal spec (linear region). Slew rate is a large-signal spec and can cause distortion at lower frequencies.`,
    formulas: [
      {
        label_tr: 'Slew Rate Tanımı',
        label_en: 'Slew Rate Definition',
        expr: 'SR = ΔVout / Δt   [V/μs]',
        vars: 'SR — Slew Rate (datasheet\'den)\nΔVout — çıkış gerilim değişimi\nΔt   — bu değişimin süresi',
      },
      {
        label_tr: 'Maksimum Bozulmasız Sinüs Frekansı',
        label_en: 'Maximum Undistorted Sine Frequency',
        expr: 'f_max = SR / (2π × Vout_pk)',
        vars: 'SR      — Slew Rate (V/s cinsinden, yani ×10⁶)\nVout_pk — tepe çıkış gerilimi (V)',
      },
    ],
    example_tr: `LM741: SR = 0.5 V/μs = 500,000 V/s, Vout_pk = 10 V.
f_max = 500,000 / (2π × 10) ≈ 7,958 Hz ≈ 8 kHz.
8 kHz üzerindeki sinüsler üçgen dalga gibi görünür — ses için yetersiz.
TL071 kullanırsan: f_max = 13,000,000 / (2π × 10) ≈ 207 kHz ✓`,
    example_en: `LM741: SR = 0.5 V/μs = 500,000 V/s, Vout_pk = 10 V.
f_max = 500,000 / (2π × 10) ≈ 7,958 Hz ≈ 8 kHz.
Sine waves above 8 kHz look triangular — inadequate for audio.
Using TL071: f_max = 13,000,000 / (2π × 10) ≈ 207 kHz ✓`,
  },

  // ── 14 ──────────────────────────────────────────────────────────────────
  {
    slug: 'impedance',
    title_tr: 'Giriş / Çıkış Empedansı',
    title_en: 'Input / Output Impedance',
    readTime: 4,
    simLink: '/simulator?c=buffer',
    body_tr: `**Giriş empedansı:** İdeal op-amp'ta sonsuz, gerçekte megaohm mertebesinde (JFET girişli: ~10¹² Ω, BJT girişli: ~10⁶–10⁸ Ω). Op-amp kaynağa yük bindirmez.

**Çıkış empedansı:** İdeal sıfır, gerçekte çok düşük (onlarca ohm). Negatif geri besleme çıkış empedansını daha da azaltır: Zout_cl = Zout_ol / (1 + Aol × β).

**Buffer (gerilim izleyici)** bu kavramları en açık sergileyen devredir: yüksek giriş empedansıyla kaynağa yük bindirmez, düşük çıkış empedansıyla herhangi bir yük veya kablo kapasitansını sürer.

**Empedans uyumu neden önemli?** Kaynak empedansı yüksek, yük empedansı düşük olduğunda doğrudan bağlantı gerilim bölücü oluşturur. Buffer araya girince bu problem ortadan kalkar.`,
    body_en: `**Input impedance:** Ideally infinite, realistically in the megaohm range (JFET-input: ~10¹² Ω, BJT-input: ~10⁶–10⁸ Ω). Op-amp doesn't load the source.

**Output impedance:** Ideally zero, realistically very low (tens of ohms). Negative feedback reduces it further: Zout_cl = Zout_ol / (1 + Aol × β).

**Buffer (voltage follower)** best demonstrates these properties: high input impedance doesn't load the source; low output impedance can drive any load or cable capacitance.

**Why does impedance matching matter?** When source impedance is high and load impedance is low, direct connection creates a voltage divider. A buffer eliminates this problem.`,
    formulas: [
      {
        label_tr: 'Kapalı Çevrim Çıkış Empedansı',
        label_en: 'Closed-Loop Output Impedance',
        expr: 'Zout_cl = Zout_ol / (1 + Aol × β)',
        vars: 'Zout_ol — açık çevrim çıkış empedansı (~75 Ω LM741)\nAol     — açık çevrim kazancı\nβ       — geri besleme faktörü',
      },
      {
        label_tr: 'Yük Bölücü Etkisi (Buffer Olmadan)',
        label_en: 'Load Divider Effect (Without Buffer)',
        expr: 'Vload = Vin × Rload / (Rsource + Rload)',
        vars: 'Rsource — kaynak empedansı\nRload   — yük direnci',
      },
    ],
    example_tr: `Kaynak empedansı Rsource = 100 kΩ, yük Rload = 100 Ω.
Buffer olmadan: Vload = Vin × 100/(100,000+100) ≈ 0.001 × Vin (-%99.9 kayıp!).
Buffer ile: çıkış ≈ Vin. Kaynak hiç zorlanmaz.
Zout_cl (buffer, Aol=100k, β=1): ≈ 75Ω / 100,001 ≈ 0.00075 Ω → pratik sıfır.`,
    example_en: `Source impedance Rsource = 100 kΩ, load Rload = 100 Ω.
Without buffer: Vload = Vin × 100/(100,000+100) ≈ 0.001 × Vin (99.9% lost!).
With buffer: output ≈ Vin. Source is never loaded.
Zout_cl (buffer, Aol=100k, β=1): ≈ 75Ω / 100,001 ≈ 0.00075 Ω → practically zero.`,
  },

  // ── 15 ──────────────────────────────────────────────────────────────────
  {
    slug: 'real-parameters',
    title_tr: 'Gerçek Op-Amp Parametreleri',
    title_en: 'Real Op-Amp Parameters',
    readTime: 6,
    body_tr: `İdeal op-amp bir matematiksel soyutlamadır. Gerçek cihazlar birkaç kritik sapma gösterir.

**Ofset Gerilimi (Vos):** Giriş kısa devre olsa bile çıkış sıfırdan farklıdır. LM741: ±1–5 mV (tipik). OPA177: 10 μV (hassas). Kapalı çevrim sistemde Vos × Av kadar hata üretir. Trimpot veya oto-sıfırlamalı op-amp ile giderilir.

**Bias Akımı (Ib):** Her giriş pininden küçük bir akım akar. JFET: pA mertebesinde. BJT: nA–μA mertebesinde. Yüksek kaynak empedanslı devrelerde hata gerilimi oluşturur.

**Ofset Akımı (Ios):** İki bias akımı arasındaki fark. Differential bağlantılarda, her iki girişe eşit direnç koyarsak Ib etkisi büyük ölçüde iptal olur, Ios kalır.

**Gürültü:** Termal (Johnson) gürültü ve 1/f (flicker) gürültüsü. Düşük gürültü isteyenler için: AD797 (0.9 nV/√Hz), LT1028, OP27.

**Sıcaklık Katsayısı (TC):** Tüm parametreler sıcaklıkla kayar. Hassas devreler için sıcaklık aralığındaki toplam hata hesaplanmalıdır.`,
    body_en: `The ideal op-amp is a mathematical abstraction. Real devices show several critical deviations.

**Offset Voltage (Vos):** Even with inputs shorted, the output isn't zero. LM741: ±1–5 mV (typical). OPA177: 10 μV (precision). In a closed-loop system, it generates Vos × Av of error. Removed with a trimpot or auto-zeroing op-amp.

**Bias Current (Ib):** Small currents flow into each input pin. JFET: picoamp level. BJT: nanoamp–microamp level. Creates error voltages in high-source-impedance circuits.

**Offset Current (Ios):** The difference between two bias currents. With equal resistors at both inputs, Ib effects cancel; Ios remains.

**Noise:** Thermal (Johnson) noise and 1/f (flicker) noise. For low-noise: AD797 (0.9 nV/√Hz), LT1028, OP27.

**Temperature Coefficient (TC):** All parameters drift with temperature. Precision designs must budget total error over the operating temperature range.`,
    formulas: [
      {
        label_tr: 'Ofset Kaynaklı Çıkış Hatası',
        label_en: 'Output Error from Offset',
        expr: 'Verror_out = Vos × (1 + Rf/Rin)',
        vars: 'Vos     — giriş ofset gerilimi\nRf/Rin  — devre kazancı\nEvirmeyen config için geçerli',
      },
      {
        label_tr: 'Bias Akımı Hata Gerilimi',
        label_en: 'Bias Current Error Voltage',
        expr: 'Verror_bias = Ib × Rsource',
        vars: 'Ib      — giriş bias akımı\nRsource — kaynak empedansı',
      },
      {
        label_tr: 'Gürültü Gerilimi (RMS)',
        label_en: 'Noise Voltage (RMS)',
        expr: 'Vn = en × √BW',
        vars: 'en  — gürültü yoğunluğu (nV/√Hz, datasheetten)\nBW  — devre bant genişliği (Hz)',
      },
    ],
    example_tr: `Hassas DC yükselteci: Vos = 1 mV, Av = 100×.
Çıkış offset = 1 mV × (1+100) ≈ 100 mV — fark edilir hata.
Çözüm A: OPA177 kullan → Vos = 10 μV → hata = 1 mV ✓
Çözüm B: LM741 + ofset ayar potansiyometresi → elle sıfırla.
Gürültü: AD797, BW = 20 kHz → Vn = 0.9 nV/√Hz × √20,000 ≈ 127 nV_rms.`,
    example_en: `Precision DC amplifier: Vos = 1 mV, Av = 100×.
Output offset = 1 mV × (1+100) ≈ 100 mV — noticeable error.
Solution A: use OPA177 → Vos = 10 μV → error = 1 mV ✓
Solution B: LM741 + offset trim potentiometer → manual null.
Noise: AD797, BW = 20 kHz → Vn = 0.9 nV/√Hz × √20,000 ≈ 127 nV_rms.`,
  },
];
