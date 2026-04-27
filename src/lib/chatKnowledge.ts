export interface BotResponse {
  text_tr: string;
  text_en: string;
  link?: { to: string; label_tr: string; label_en: string };
  chips_tr?: string[];
  chips_en?: string[];
}

export interface Intent {
  id: string;
  /** Combined TR + EN keywords — check against lowercased user input */
  keywords: string[];
  response: BotResponse;
}

// ─── Knowledge base ──────────────────────────────────────────────────────────

export const INTENTS: Intent[] = [
  // ── Greeting / help ────────────────────────────────────────────────────
  {
    id: 'greeting',
    keywords: ['merhaba', 'selam', 'hello', 'hi', 'hey', 'naber', 'nasılsın'],
    response: {
      text_tr: 'Merhaba! Op-Amp Atölyesi asistanıyım. Teori soruları, devre formülleri veya sayfada nerede ne olduğu hakkında yardımcı olabilirim.',
      text_en: 'Hello! I\'m the Op-Amp Workshop assistant. I can help with theory questions, circuit formulas, or finding your way around the site.',
      chips_tr: ['Op-amp nedir?', 'Simülatörü nasıl kullanırım?', 'Eviren yükselteç nedir?', 'CMRR nedir?'],
      chips_en: ['What is an op-amp?', 'How do I use the simulator?', 'What is an inverting amplifier?', 'What is CMRR?'],
    },
  },
  {
    id: 'help',
    keywords: ['yardım', 'help', 'ne yapabilirsin', 'what can you do', 'neler sorabilirsin', 'what can you help'],
    response: {
      text_tr: 'Şunları sorabilirsin:\n• Op-amp temelleri ("nedir", "ne işe yarar", "nasıl çalışır")\n• Kavramlar (kazanç, CMRR, slew rate, GBW…)\n• Devre formülleri (eviren, evirmeyen, toplayıcı…)\n• Yaygın entegreler (LM741, TL072…)\n• Sayfada bir şeyi nasıl bulurum?',
      text_en: 'You can ask about:\n• Op-amp basics ("what is", "what does it do", "how it works")\n• Concepts (gain, CMRR, slew rate, GBW…)\n• Circuit formulas (inverting, non-inverting, summing…)\n• Popular chips (LM741, TL072…)\n• How to find something on the site?',
      chips_tr: ['Op-amp nedir?', 'Hangi op-amp seçeyim?', 'Kazanç formülü nedir?', 'Simülatöre git'],
      chips_en: ['What is an op-amp?', 'Which op-amp to use?', 'What is the gain formula?', 'Go to simulator'],
    },
  },

  // ── Site navigation ─────────────────────────────────────────────────────
  {
    id: 'nav_simulator',
    keywords: ['simülatör', 'simulator', 'simülasyon', 'simulation', 'devre kur', 'build circuit',
               'nerede', 'where', 'nasıl açarım', 'how to open', 'osiloskop', 'oscilloscope'],
    response: {
      text_tr: 'Simülatör sayfasında beş farklı op-amp devresi kurabilirsin. Dirençleri, dalga formunu ve Vcc\'yi sürgülerle ayarla — osiloskop anlık güncellenir.',
      text_en: 'In the Simulator you can build five different op-amp circuits. Adjust resistors, waveform and Vcc with sliders — the oscilloscope updates instantly.',
      link: { to: '/simulator', label_tr: 'Simülatörü aç →', label_en: 'Open simulator →' },
      chips_tr: ['Eviren yükselteç formülü', 'Hız kontrolü nasıl çalışır?', 'Kazanç nedir?'],
      chips_en: ['Inverting amp formula', 'How does speed control work?', 'What is gain?'],
    },
  },
  {
    id: 'nav_theory',
    keywords: ['teori', 'theory', 'bölüm', 'chapter', 'oku', 'read', 'kavram', 'concept',
               'öğren', 'learn', 'anlatım', 'explanation', 'konu'],
    response: {
      text_tr: 'Teori bölümünde 15 konu var: ideal model, sanal toprak, eviren/evirmeyen yükselteç, toplayıcı, fark yükselteci, integratör, CMRR, GBW ve daha fazlası.',
      text_en: 'The Theory section has 15 chapters: ideal model, virtual ground, inverting/non-inverting amp, summing amp, difference amp, integrator, CMRR, GBW and more.',
      link: { to: '/theory', label_tr: 'Teori bölümüne git →', label_en: 'Go to theory →' },
      chips_tr: ['Sanal toprak nedir?', 'CMRR nedir?', 'GBW nedir?'],
      chips_en: ['What is virtual ground?', 'What is CMRR?', 'What is GBW?'],
    },
  },
  {
    id: 'nav_applications',
    keywords: ['uygulama', 'application', 'demo', 'örnek', 'example', 'preamp', 'schmitt',
               'filtre', 'filter', 'mikser', 'mixer', 'ekg', 'ekg', 'lamba', 'lamp'],
    response: {
      text_tr: 'Uygulamalar sayfasında üç interaktif demo var: Ses Preamp\'i, Schmitt Tetikleyici ve Sallen-Key Aktif Filtre. Her birinde Vin/Vout grafikleri canlı değişir.',
      text_en: 'The Applications page has three interactive demos: Audio Preamp, Schmitt Trigger and Sallen-Key Active Filter. Vin/Vout plots update live in each.',
      link: { to: '/applications', label_tr: 'Uygulamalara git →', label_en: 'Go to applications →' },
      chips_tr: ['Ses preamp nedir?', 'Schmitt tetikleyici nedir?', 'Alçak geçiren filtre nedir?'],
      chips_en: ['What is an audio preamp?', 'What is a Schmitt trigger?', 'What is a low-pass filter?'],
    },
  },

  // ── Op-amp definition (general "what is op-amp") ────────────────────────
  {
    id: 'opamp_definition',
    keywords: ['op-amp nedir', 'opamp nedir', 'op amp nedir', 'işlemsel yükselteç nedir', 'operational amplifier',
               'op-amp ne demek', 'opamp ne demek', 'tanım', 'definition', 'what is op-amp',
               'what is opamp', 'what is an op-amp', 'what is an opamp', 'op-amp ne'],
    response: {
      text_tr: 'Op-amp (işlemsel yükselteç): iki giriş ve bir çıkışı olan, devasa kazançlı (10⁵–10⁶) bir DC yükselteçtir. Vout = A × (V+ − V−). Tek başına nadiren kullanılır; geri besleme ile birlikte yükselteç, karşılaştırıcı, filtre, integratör ya da toplayıcı haline gelir. Tek bir entegre, sayısız analog devrenin yapı taşıdır.',
      text_en: 'An op-amp (operational amplifier) is a DC amplifier with two inputs and one output, with huge gain (10⁵–10⁶). Vout = A × (V+ − V−). Rarely used alone; combined with feedback it becomes an amplifier, comparator, filter, integrator or summer. A single chip is the building block of countless analog circuits.',
      link: { to: '/theory/ideal-opamp', label_tr: 'İdeal model bölümü →', label_en: 'Ideal model chapter →' },
      chips_tr: ['Nasıl çalışır?', 'Ne işe yarar?', 'Hangi op-amp seçeyim?', 'Sanal toprak nedir?'],
      chips_en: ['How does it work?', 'What is it used for?', 'Which op-amp to use?', 'What is virtual ground?'],
    },
  },

  // ── What is op-amp used for ────────────────────────────────────────────
  {
    id: 'opamp_uses',
    keywords: ['ne işe yarar', 'nerede kullanılır', 'kullanım alanları', 'kullanım alanı', 'ne işe yarıyor',
               'what is it used for', 'what are op-amps used for', 'common uses', 'applications of op-amp',
               'nereler kullanılır'],
    response: {
      text_tr: 'Op-amp neredeyse her analog devrede vardır:\n• Ses sistemleri (preamp, mikser, ekolayzer)\n• Sensör arayüzleri (termokupl, basınç, ışık)\n• Ölçüm cihazları (EKG, multimetre, osiloskop)\n• Sinyal işleme (filtre, integratör, türev)\n• Güç elektroniği (DC-DC kontrolü, motor sürücü)\n• Karşılaştırma/eşik tespiti (Schmitt, sokak lambası)',
      text_en: 'Op-amps appear in nearly every analog circuit:\n• Audio (preamps, mixers, equalisers)\n• Sensor interfaces (thermocouple, pressure, light)\n• Test instruments (EKG, multimeters, scopes)\n• Signal processing (filters, integrators, differentiators)\n• Power electronics (DC-DC control, motor drivers)\n• Threshold detection (Schmitt, smart streetlight)',
      link: { to: '/applications', label_tr: 'Uygulama örneklerini gör →', label_en: 'See application examples →' },
      chips_tr: ['Ses preamp nedir?', 'EKG nasıl çalışır?', 'Aktif filtre nedir?'],
      chips_en: ['What is an audio preamp?', 'How does EKG work?', 'What is an active filter?'],
    },
  },

  // ── How does op-amp work ───────────────────────────────────────────────
  {
    id: 'how_works',
    keywords: ['nasıl çalışır', 'çalışma prensibi', 'çalışma mantığı', 'nasıl çalışıyor',
               'how does it work', 'how do op-amps work', 'how an op-amp works', 'working principle'],
    response: {
      text_tr: 'Op-amp iki girişin (V+ ve V−) farkını çok büyük bir kazançla yükseltir: Vout = A × (V+ − V−). Tek başına 1 mV bile çıkışı raya vurur — bu nedenle pratikte negatif geri besleme kullanılır. Geri besleme, çıkışın bir kısmını V−\'ye geri döndürür ve devre, V+ ile V−\'yi eşit tutmaya çalışır. Bu "sanal kısa devre" sayesinde kazanç yalnızca dış dirençlere bağlı olur (örn. −Rf/Rin).',
      text_en: 'An op-amp amplifies the difference between its two inputs (V+ and V−) with enormous gain: Vout = A × (V+ − V−). Even 1 mV alone slams the output to the rail — so in practice we use negative feedback. Feedback returns part of the output to V−, and the circuit works to keep V+ and V− equal. Thanks to this "virtual short", the gain depends only on external resistors (e.g. −Rf/Rin).',
      link: { to: '/theory/negative-feedback', label_tr: 'Geri besleme bölümü →', label_en: 'Feedback chapter →' },
      chips_tr: ['Sanal toprak nedir?', 'Negatif geri besleme', 'Açık çevrim kazancı'],
      chips_en: ['What is virtual ground?', 'Negative feedback', 'Open-loop gain'],
    },
  },

  // ── Op-amp chips (LM741, TL072, etc) ───────────────────────────────────
  {
    id: 'opamp_chips',
    keywords: ['lm741', '741', 'tl071', 'tl072', 'tl081', 'tl082', 'lm358', 'lm324',
               'ne5532', 'opa177', 'opa2134', 'opa627', 'mcp6002', 'lmv358',
               'hangi opamp', 'hangi op-amp', 'hangi op amp', 'popüler entegre', 'popüler op-amp',
               'which op-amp', 'which opamp', 'common op-amp', 'popular op-amp', 'opamp chip',
               'op-amp chip', 'önerebilir', 'recommend'],
    response: {
      text_tr: 'Yaygın op-amp\'lar:\n• **LM741** — klasik, eğitim için. Vos≈3 mV, GBW=1 MHz, çift besleme.\n• **TL071/TL072** — JFET girişli, düşük gürültü. Ses için iyi.\n• **LM358/LM324** — tek besleme çalışır (sadece +5V), pille uyumlu.\n• **NE5532** — düşük gürültü, hi-fi audio.\n• **OPA177** — precision, Vos≈10 μV, ölçüm için.\n• **MCP6002** — mikrokontrolör, rail-to-rail, düşük güç.\nNe için lazım söyle, daha spesifik öneririm.',
      text_en: 'Common op-amps:\n• **LM741** — classic, for learning. Vos≈3 mV, GBW=1 MHz, dual supply.\n• **TL071/TL072** — JFET input, low noise. Good for audio.\n• **LM358/LM324** — single supply (just +5V), battery friendly.\n• **NE5532** — low noise, hi-fi audio.\n• **OPA177** — precision, Vos≈10 μV, for instrumentation.\n• **MCP6002** — microcontroller, rail-to-rail, low power.\nTell me your use case and I\'ll narrow it down.',
      chips_tr: ['Tek besleme nedir?', 'Rail-to-rail nedir?', 'Precision op-amp ne?'],
      chips_en: ['What is single supply?', 'What is rail-to-rail?', 'What is precision op-amp?'],
    },
  },

  // ── Op-amp pinout ──────────────────────────────────────────────────────
  {
    id: 'opamp_pins',
    keywords: ['bacak', 'pin', 'pinout', 'pin out', 'pin diyagramı', 'dip-8', 'dip 8', 'soic-8',
               'kılıf', 'package', 'bacak sırası', 'pin order', 'hangi bacak'],
    response: {
      text_tr: 'Standart tek op-amp pinout (DIP-8 / SOIC-8):\n• 1 = Offset null\n• 2 = V− (eviren giriş)\n• 3 = V+ (evirmeyen giriş)\n• 4 = Vee (− besleme)\n• 5 = Offset null\n• 6 = Vout\n• 7 = Vcc (+ besleme)\n• 8 = NC (boş)\nÇift op-amp\'ta (TL072, NE5532) pin 8 = Vcc, 4 = Vee, kalanlar iki kanal arasında bölünür.',
      text_en: 'Standard single op-amp pinout (DIP-8 / SOIC-8):\n• 1 = Offset null\n• 2 = V− (inverting input)\n• 3 = V+ (non-inverting input)\n• 4 = Vee (negative supply)\n• 5 = Offset null\n• 6 = Vout\n• 7 = Vcc (positive supply)\n• 8 = NC (no connect)\nDual op-amps (TL072, NE5532) put Vcc on 8, Vee on 4, with the rest split between two channels.',
      chips_tr: ['Hangi op-amp seçeyim?', 'Çift besleme nedir?', 'Ofset nedir?'],
      chips_en: ['Which op-amp to use?', 'What is dual supply?', 'What is offset?'],
    },
  },

  // ── Power supply ───────────────────────────────────────────────────────
  {
    id: 'power_supply',
    keywords: ['besleme nasıl', 'güç nasıl', 'supply nasıl', 'power supply', '+12v', '-12v', '+5v',
               '+15v', '-15v', '±12v', '±15v', 'kaç volt', 'how many volts', 'supply voltage',
               'besleme gerilimi'],
    response: {
      text_tr: 'Op-amp\'lar tipik olarak ±12 V veya ±15 V çift besleme ile çalışır. Pin 7\'ye Vcc (örn +12V), pin 4\'e Vee (örn −12V), referans GND. Çıkış ancak Vee\'den ~1V yukarı, Vcc\'den ~1V aşağı kadar çıkabilir (klasikler için). Tek besleme istiyorsan LM358 / MCP6002 gibi "single-supply rated" op-amp seç.',
      text_en: 'Op-amps typically run on dual supply ±12 V or ±15 V. Pin 7 takes Vcc (e.g. +12V), pin 4 takes Vee (e.g. −12V), reference GND. Output can swing only to ~1V above Vee and ~1V below Vcc (for classic parts). For single supply use a "single-supply rated" op-amp like LM358 or MCP6002.',
      chips_tr: ['Tek besleme nedir?', 'Rail-to-rail nedir?', 'Saturasyon ne demek?'],
      chips_en: ['What is single supply?', 'What is rail-to-rail?', 'What is saturation?'],
    },
  },

  // ── Single vs dual supply ──────────────────────────────────────────────
  {
    id: 'single_dual_supply',
    keywords: ['tek besleme', 'çift besleme', 'single supply', 'dual supply', 'split supply',
               'tek kaynak', 'iki kaynak', 'sadece pozitif', 'only positive', 'pille çalışır',
               'battery powered'],
    response: {
      text_tr: '• **Çift besleme** (±Vcc, örn ±12V): Sinyal GND etrafında salınır, çıkış hem pozitif hem negatif olabilir. Klasik eğitim devresi.\n• **Tek besleme** (sadece +Vcc, örn +5V): Pille / mikrokontrolörle uyumlu. Sinyal Vcc/2 etrafında "biaslandırılmalı". Op-amp tek besleme rated olmalı (LM358, LM324, MCP6002…). Klasik LM741 buna uygun değildir.',
      text_en: '• **Dual supply** (±Vcc, e.g. ±12V): Signal swings around GND, output can be positive or negative. Classic textbook setup.\n• **Single supply** (only +Vcc, e.g. +5V): Battery / microcontroller friendly. Signal must be biased around Vcc/2. Op-amp must be single-supply rated (LM358, LM324, MCP6002…). Classic LM741 is NOT suitable.',
      chips_tr: ['Hangi op-amp seçeyim?', 'Rail-to-rail nedir?', 'Vref nedir?'],
      chips_en: ['Which op-amp to use?', 'What is rail-to-rail?', 'What is Vref?'],
    },
  },

  // ── AC vs DC signal ────────────────────────────────────────────────────
  {
    id: 'signal_ac_dc',
    keywords: ['ac dc', 'ac/dc', 'ac sinyal', 'dc sinyal', 'alternatif akım', 'doğru akım',
               'alternating current', 'direct current', 'ac coupling', 'dc coupling', 'ac vs dc',
               'kuplaj'],
    response: {
      text_tr: 'DC (doğru akım): zamanla değişmeyen, sabit bir gerilim. Pil çıkışı, sensör seviyesi.\nAC (alternatif akım): zamanla değişen, sıfır etrafında salınan sinyal. Ses, şebeke, sinüs.\n\nOp-amp her ikisini de işleyebilir. Girişe seri kondansatör koyarsan DC bileşeni bloklanır → yalnızca AC geçer ("AC kuplajlı"). Doğrudan bağlanırsa "DC kuplajlı" denir — sıcaklık ofseti veya sensör seviyesi ölçmek için DC kuplajlı olmak şart.',
      text_en: 'DC (direct current): a steady, time-invariant voltage. Battery output, sensor level.\nAC (alternating current): a time-varying signal swinging around zero. Audio, mains, sine.\n\nOp-amps handle both. A series input capacitor blocks DC and lets only AC through ("AC coupled"). A direct connection is "DC coupled" — required for measuring temperature offset or sensor level.',
      chips_tr: ['Kondansatör nedir?', 'Yüksek geçiren filtre', 'Bant genişliği'],
      chips_en: ['What is a capacitor?', 'High-pass filter', 'Bandwidth'],
    },
  },

  // ── Decibel ────────────────────────────────────────────────────────────
  {
    id: 'db_decibel',
    keywords: ['desibel', 'decibel', 'logaritmik', 'logarithmic', 'db', 'dbv', 'db kaç',
               'how many db', 'db cinsinden', 'log scale'],
    response: {
      text_tr: 'Desibel (dB) logaritmik bir orandır. Gerilim için: dB = 20·log₁₀(Vout/Vin).\n\n• 6 dB ≈ 2× kazanç\n• 20 dB = 10×\n• 40 dB = 100×\n• 60 dB = 1000×\n• 80 dB = 10.000×\n• 100 dB = 100.000×\n\nOp-amp\'ın açık çevrim kazancı 100 dB civarındadır. CMRR genellikle 80–100 dB ile belirtilir.',
      text_en: 'Decibel (dB) is a logarithmic ratio. For voltage: dB = 20·log₁₀(Vout/Vin).\n\n• 6 dB ≈ 2× gain\n• 20 dB = 10×\n• 40 dB = 100×\n• 60 dB = 1000×\n• 80 dB = 10,000×\n• 100 dB = 100,000×\n\nOp-amp open-loop gain is around 100 dB. CMRR is usually quoted in 80–100 dB.',
      chips_tr: ['Açık çevrim kazancı', 'CMRR nedir?', 'GBW nedir?'],
      chips_en: ['Open-loop gain', 'What is CMRR?', 'What is GBW?'],
    },
  },

  // ── Oscillation ────────────────────────────────────────────────────────
  {
    id: 'oscillation',
    keywords: ['osilasyon', 'salınım', 'kararsız', 'kararsızlık', 'titreşim',
               'oscillation', 'oscillating', 'unstable', 'instability', 'ringing', 'çıngırıyor'],
    response: {
      text_tr: 'Op-amp osilasyonun nedenleri:\n• Yüksek kazançta yetersiz GBW (faz marjı azalır)\n• Yük kapasitesi (uzun kablo, MOSFET kapısı) çıkış empedansıyla rezonans\n• Besleme bypassing yok (Vcc/Vee\'den 100 nF seramik direkt op-amp\'a)\n• Layout/yer kaçağı, breadboard parazitik kapasitansı\n• Pozitif geri besleme yanlış uygulanmış\n\nÇözüm: 100 nF besleme bypass ekle, kazancı düşür, çıkışa seri 50 Ω ile kapasitif yükten izole et.',
      text_en: 'Causes of op-amp oscillation:\n• High gain with insufficient GBW (low phase margin)\n• Capacitive load (long cable, MOSFET gate) resonating with output impedance\n• Missing supply bypass (100 nF ceramic direct on Vcc/Vee pins)\n• Layout/leakage, breadboard parasitic capacitance\n• Misapplied positive feedback\n\nFix: add 100 nF supply bypass, lower the gain, isolate capacitive loads with a 50 Ω series resistor.',
      chips_tr: ['Çalışmıyor, neden?', 'GBW nedir?', 'Pozitif geri besleme'],
      chips_en: ['Doesn\'t work, why?', 'What is GBW?', 'Positive feedback'],
    },
  },

  // ── Troubleshooting ────────────────────────────────────────────────────
  {
    id: 'troubleshooting',
    keywords: ['çalışmıyor', 'hata', 'yanlış', 'sorun', 'neden olmuyor', 'neden çalışmıyor',
               'problem', 'not working', 'doesn\'t work', 'broken', 'wrong output', 'no output',
               'çıkış yok', 'çıkış sıfır', 'çıkış düz', 'output stuck'],
    response: {
      text_tr: 'Op-amp çalışmıyorsa kontrol et:\n1. **Besleme**: Vcc/Vee bağlı mı? Multimetre ile ölç (≥±5V).\n2. **Saturasyon**: Çıkış raya vurmuş olabilir. Vin × Av < Vcc mi?\n3. **Geri besleme**: Rf gerçekten V− ile çıkış arasında mı? Kopuk mu?\n4. **+ ve − karışmış**: Pin 2 = V−, pin 3 = V+. Tersine bağlarsan eviren olur.\n5. **Bypass**: Vcc/Vee\'den GND\'ye 100 nF seramik koyduğundan emin ol.\n6. **Yük çok ağır**: Düşük empedans yük (8 Ω hoparlör vs) op-amp\'ı eziyor olabilir.\n\nDaha spesifik bilgi ver, daha iyi yardım edeyim.',
      text_en: 'If your op-amp won\'t work, check:\n1. **Supply**: Is Vcc/Vee connected? Measure with a multimeter (≥±5V).\n2. **Saturation**: Output may be at the rail. Is Vin × Av < Vcc?\n3. **Feedback**: Is Rf actually between V− and output? Broken trace?\n4. **+ and − swapped**: Pin 2 = V−, pin 3 = V+. Reversed = inverting behaviour.\n5. **Bypass**: Add a 100 nF ceramic from Vcc/Vee to GND.\n6. **Load too heavy**: A low-impedance load (8 Ω speaker, etc.) may be crushing the op-amp.\n\nShare more details for a more targeted answer.',
      chips_tr: ['Saturasyon ne demek?', 'Osilasyon neden olur?', 'Pinout nedir?'],
      chips_en: ['What is saturation?', 'Why does it oscillate?', 'What is the pinout?'],
    },
  },

  // ── Learning path ──────────────────────────────────────────────────────
  {
    id: 'learning_path',
    keywords: ['nereden başla', 'nereden başlasam', 'yeni başlayan', 'başlangıç', 'sıfırdan',
               'where to start', 'beginner', 'getting started', 'how to learn', 'nasıl öğrenirim',
               'learning path', 'roadmap', 'önerebilir misin'],
    response: {
      text_tr: 'Önerilen yol:\n1. **İdeal model** (Teori → İdeal Op-amp): Beş altın kuralı oku.\n2. **Sanal toprak**: Negatif geri beslemeyi anlamanın anahtarı.\n3. **Eviren ve evirmeyen** yükselteç formüllerini kavra.\n4. **Simülatörü aç**: Rin/Rf değerlerini değiştir, kazancın nasıl değiştiğini gör.\n5. **Buffer, toplayıcı, fark yükselteci** ile devam et.\n6. **Gerçek parametreler** (CMRR, slew rate, GBW) — datasheet okumayı öğren.\n7. **Uygulamalar** sayfasında her topolojinin gerçekteki halini gör.',
      text_en: 'Suggested path:\n1. **Ideal model** (Theory → Ideal Op-amp): read the five golden rules.\n2. **Virtual ground**: the key to understanding negative feedback.\n3. Master the **inverting and non-inverting** formulas.\n4. **Open the simulator**: change Rin/Rf and watch the gain shift.\n5. Move on to **buffer, summing, difference** amps.\n6. **Real parameters** (CMRR, slew rate, GBW) — learn to read a datasheet.\n7. See each topology in real life on the **Applications** page.',
      link: { to: '/theory', label_tr: 'Teori bölümünden başla →', label_en: 'Start with theory →' },
      chips_tr: ['Op-amp nedir?', 'Sanal toprak nedir?', 'Simülatöre git'],
      chips_en: ['What is an op-amp?', 'What is virtual ground?', 'Go to simulator'],
    },
  },

  // ── Simulation tools (SPICE etc) ───────────────────────────────────────
  {
    id: 'simulation_vs_real',
    keywords: ['spice', 'ltspice', 'pspice', 'multisim', 'proteus', 'tinkercad', 'falstad',
               'simülasyon aracı', 'simulation tool', 'gerçek devre', 'real circuit',
               'farkı ne', 'difference between'],
    response: {
      text_tr: 'Op-Amp Atölyesi tarayıcıda çalışan, ideal model üzerine kurulu eğitim simülatörüdür. Daha derin analiz için:\n• **LTspice** (ücretsiz, profesyonel SPICE) — gerçek datasheet modelleri, AC/DC/transient analizi.\n• **Multisim / Proteus** — şematik + simülasyon + PCB.\n• **Falstad** — tarayıcıda hızlı analog simülasyon.\n\nBu sitenin avantajı: kavramları anlamak için minimal arayüz. Üretime hazırlanmak için LTspice gerekir.',
      text_en: 'Op-Amp Workshop is an in-browser teaching simulator built on the ideal model. For deeper analysis:\n• **LTspice** (free, professional SPICE) — real datasheet models, AC/DC/transient.\n• **Multisim / Proteus** — schematic + simulation + PCB.\n• **Falstad** — quick browser analog sim.\n\nThis site\'s strength: a minimal UI for grasping concepts. For production design use LTspice.',
      chips_tr: ['Simülatöre git', 'Teori bölümleri', 'Gerçek parametreler'],
      chips_en: ['Go to simulator', 'Theory chapters', 'Real parameters'],
    },
  },

  // ── PCB / Breadboard ───────────────────────────────────────────────────
  {
    id: 'pcb_breadboard',
    keywords: ['breadboard', 'deney kartı', 'devre tahtası', 'lehim', 'lehimle', 'lehimleme',
               'pcb', 'baskı devre', 'prototype', 'prototip', 'soldering'],
    response: {
      text_tr: 'Op-amp\'ı kurarken pratik tavsiyeler:\n• **Breadboard**: hızlı denemeler için iyi. Ama yüksek kazançta parazitik kapasitans osilasyona yol açabilir.\n• **Bypass kondansatörü**: 100 nF seramiği Vcc–GND ve Vee–GND arasına op-amp\'a en yakın yere koy.\n• **Toprak düzlemi**: PCB tasarlıyorsan kesintisiz GND plane kullan.\n• **Kısa yollar**: Eviren girişe (V−) gelen yolları olabildiğince kısa tut — gürültü yakalar.\n• **Lehim**: ucu ısınmamış havyayla aşırı ısınmayı önle (özellikle MOSFET\'li tasarımlarda).',
      text_en: 'Practical tips when wiring an op-amp:\n• **Breadboard**: fine for quick tests. At high gain, parasitic capacitance can cause oscillation.\n• **Bypass cap**: place a 100 nF ceramic between Vcc–GND and Vee–GND, as close to the chip as possible.\n• **Ground plane**: when designing a PCB use a solid uninterrupted ground plane.\n• **Short traces**: keep the inverting input (V−) traces short — they pick up noise.\n• **Soldering**: avoid overheating with a properly tinned tip (especially with MOSFET designs).',
      chips_tr: ['Osilasyon nedir?', 'Pinout nedir?', 'Çalışmıyor neden?'],
      chips_en: ['What is oscillation?', 'What is the pinout?', 'Why doesn\'t it work?'],
    },
  },

  // ── Feedback types (positive vs negative) ──────────────────────────────
  {
    id: 'feedback_types',
    keywords: ['pozitif geri besleme', 'positive feedback', 'pozitif besleme', 'negatif vs pozitif',
               'feedback türleri', 'feedback types', 'geri besleme türleri', 'iki tür feedback'],
    response: {
      text_tr: 'İki temel geri besleme türü:\n\n**Negatif geri besleme** (V−\'ye döner): Kazancı kararlı kılar, dış dirençlere bağlı yapar. Yükselteçlerin temeli. Hata azaltır, bant genişletir.\n\n**Pozitif geri besleme** (V+\'ya döner): Devreyi histerezis veya osilatöre dönüştürür. Schmitt tetikleyici, multivibratör, sinüs osilatörü buna örnek. Yanlışlıkla uygulanırsa kararsızlık (osilasyon) yaratır.',
      text_en: 'Two fundamental feedback types:\n\n**Negative feedback** (returns to V−): Stabilises gain, makes it depend on external resistors. Foundation of amplifiers. Reduces error, extends bandwidth.\n\n**Positive feedback** (returns to V+): Turns the circuit into hysteresis or oscillator. Schmitt trigger, multivibrator, sine oscillator are examples. Accidentally applied = instability (oscillation).',
      chips_tr: ['Schmitt tetikleyici', 'Negatif geri besleme', 'Osilasyon neden?'],
      chips_en: ['Schmitt trigger', 'Negative feedback', 'Why oscillation?'],
    },
  },

  // ── Op-amp vs comparator ───────────────────────────────────────────────
  {
    id: 'op_vs_comparator',
    keywords: ['opamp vs comparator', 'op-amp vs comparator', 'karşılaştırıcı op-amp fark',
               'karşılaştırıcı nedir', 'comparator nedir', 'comparator ne', 'karşılaştırıcı ne',
               'karşılaştırıcı', 'comparator', 'lm339', 'lm393', 'dedicated comparator',
               'comparator entegre', 'opamp ile karşılaştırıcı',
               'fark nedir', 'difference between op-amp and comparator'],
    response: {
      text_tr: 'Op-amp da karşılaştırıcı gibi kullanılabilir, ama dedicated comparator (LM339, LM393) bazı işler için daha iyidir:\n• **Hız**: Comparator çıkışı ns mertebesinde geçiş yapar. Op-amp slew rate ile sınırlıdır.\n• **Açık kollektör çıkış**: Comparator tipik olarak open-collector → farklı gerilimlere pull-up koyabilirsin (mantık seviyesi dönüşümü).\n• **Faz dengeleme yok**: Comparator dahili kompansasyon olmaz çünkü hep doyumda çalışır.\n\nKısa: hızlı/dijital eşik tespiti için **comparator**, lineer yükseltme için **op-amp**. Schmitt tetikleyici her ikisiyle de yapılabilir.',
      text_en: 'You can use an op-amp as a comparator, but dedicated comparators (LM339, LM393) are better for some tasks:\n• **Speed**: Comparator output transitions in nanoseconds. Op-amp is slew-rate limited.\n• **Open-collector output**: Comparators typically have open-collector → pull-up to any voltage (logic-level conversion).\n• **No frequency compensation**: Comparators have no internal compensation since they always operate in saturation.\n\nShort: **comparator** for fast/digital threshold detection, **op-amp** for linear amplification. Schmitt trigger works with either.',
      chips_tr: ['Schmitt tetikleyici', 'Slew rate', 'Saturasyon'],
      chips_en: ['Schmitt trigger', 'Slew rate', 'Saturation'],
    },
  },

  // ── Precision op-amp ───────────────────────────────────────────────────
  {
    id: 'precision_amp',
    keywords: ['presizyon', 'precision', 'hassas op-amp', 'hassas opamp', 'düşük ofset',
               'low offset', 'opa177', 'opa2188', 'lt1012', 'ad8551', 'ölçüm op-amp',
               'instrumentation grade'],
    response: {
      text_tr: '"Precision" op-amp\'lar, ölçüm uygulamalarında kullanılan, ofset gerilimi ve sıcaklık katsayısı çok düşük (Vos < 50 μV) ailelerdir. Örnekler:\n• **OPA177** — Vos≈10 μV, klasik precision\n• **AD8551 / OPA2188** — chopper-stabilized, Vos < 1 μV\n• **LT1012** — düşük bias akımı\n\nNe zaman gerekir? Termokupl (μV mertebesi sinyal), strain-gauge köprüsü, hassas voltaj referansı, EKG/EEG ön katı. Genel amaçlı (LM358) Vos = 2–7 mV — sensör seviyesinde fazla hata olur.',
      text_en: 'Precision op-amps are families with very low offset and tempco (Vos < 50 μV), used in instrumentation. Examples:\n• **OPA177** — Vos≈10 μV, classic precision\n• **AD8551 / OPA2188** — chopper-stabilised, Vos < 1 μV\n• **LT1012** — low bias current\n\nWhen needed? Thermocouples (μV-level signals), strain-gauge bridges, precise voltage references, EKG/EEG front-ends. General-purpose parts (LM358) have Vos = 2–7 mV — too much error at sensor level.',
      chips_tr: ['Ofset nedir?', 'EKG nasıl çalışır?', 'Hangi op-amp seçeyim?'],
      chips_en: ['What is offset?', 'How does EKG work?', 'Which op-amp to use?'],
    },
  },

  // ── Rail-to-rail ───────────────────────────────────────────────────────
  {
    id: 'rail_to_rail',
    keywords: ['rail-to-rail', 'rail to rail', 'rrio', 'rro', 'rri', 'tam rail', 'tam swing',
               'output swing', 'çıkış salınımı'],
    response: {
      text_tr: '"Rail-to-rail" op-amp\'lar besleme raylarına çok yakın çalışabilir:\n• **R2R Output (RRO)**: Çıkış Vee\'den ~10 mV yukarı, Vcc\'den ~10 mV aşağıya kadar gidebilir (klasiklerde ~1V mesafe vardır). Tek besleme uygulamalarında çok değerli.\n• **R2R Input (RRI)**: Giriş common-mode aralığı Vee–Vcc\'ye uzanır.\n• **R2RIO**: Hem giriş hem çıkış rail-to-rail.\n\nÖrnekler: MCP6002, OPA340, LMV358, LM6132. Mikrokontrolör + tek besleme tasarımlarında neredeyse zorunlu.',
      text_en: '"Rail-to-rail" op-amps swing close to the supply rails:\n• **R2R Output (RRO)**: Output reaches within ~10 mV of Vee/Vcc (classics leave ~1V headroom). Crucial for single-supply designs.\n• **R2R Input (RRI)**: Input common-mode range extends to Vee–Vcc.\n• **R2RIO**: Both input and output rail-to-rail.\n\nExamples: MCP6002, OPA340, LMV358, LM6132. Almost mandatory for MCU + single-supply designs.',
      chips_tr: ['Tek besleme nedir?', 'Saturasyon ne demek?', 'Hangi op-amp?'],
      chips_en: ['What is single supply?', 'What is saturation?', 'Which op-amp?'],
    },
  },

  // ── Current amp / TIA ──────────────────────────────────────────────────
  {
    id: 'current_amp',
    keywords: ['akım yükselteci', 'akım gerilim', 'transimpedance', 'tia', 'i to v', 'i-to-v',
               'fotodiyot', 'photodiode', 'akımı gerilime', 'current to voltage'],
    response: {
      text_tr: 'Transimpedance yükselteç (TIA): Akımı gerilime çevirir. Vout = −I × Rf. Eviren konfigürasyondan farklı olarak Rin yoktur, akım kaynağı doğrudan V−\'ye bağlanır. Fotodiyot devresinin temelidir (lazer alıcılar, optik sensörler, pulse oksimetre). Düşük gürültü ve düşük bias akımı (FET girişli) kritik. Rf paralel küçük bir Cf (pF) ile osilasyon engellenir.',
      text_en: 'Transimpedance amplifier (TIA): Converts current to voltage. Vout = −I × Rf. Unlike inverting, there\'s no Rin — the current source ties directly to V−. The basis of photodiode circuits (laser receivers, optical sensors, pulse oximeter). Low noise and low bias current (FET input) are critical. A small Cf (pF) in parallel with Rf suppresses oscillation.',
      chips_tr: ['Eviren yükselteç', 'Sanal toprak', 'Osilasyon nedir?'],
      chips_en: ['Inverting amp', 'Virtual ground', 'What is oscillation?'],
    },
  },

  // ── Noise ──────────────────────────────────────────────────────────────
  {
    id: 'noise_basics',
    keywords: ['gürültü', 'noise', 'snr', 'sinyal gürültü oranı', 'thermal noise', 'şot gürültü',
               'shot noise', 'flicker', '1/f', 'voltage noise', 'current noise', 'nv/√hz'],
    response: {
      text_tr: 'Op-amp gürültüsünün üç ana bileşeni:\n• **Termal gürültü** (Johnson): Tüm dirençlerde sıcaklığa bağlı — düşük direnç = düşük gürültü.\n• **Şot gürültü** (Schottky): Bias akımıyla orantılı — FET girişli op-amp\'larda ihmal edilebilir.\n• **1/f (flicker) gürültü**: Düşük frekanslarda baskın. DC ölçümlerde kritik.\n\nDatasheet\'te en (gerilim gürültüsü, nV/√Hz) ve in (akım gürültüsü, fA/√Hz) belirtilir. Audio için NE5532 (5 nV/√Hz), precision için OPA277 (8 nV/√Hz).',
      text_en: 'Three main op-amp noise sources:\n• **Thermal noise** (Johnson): present in every resistor, depends on temperature — low resistance = low noise.\n• **Shot noise** (Schottky): proportional to bias current — negligible in FET-input op-amps.\n• **1/f (flicker)**: dominates at low frequencies. Critical for DC measurements.\n\nDatasheets quote en (voltage noise, nV/√Hz) and in (current noise, fA/√Hz). For audio: NE5532 (5 nV/√Hz), for precision: OPA277 (8 nV/√Hz).',
      chips_tr: ['CMRR nedir?', 'Hangi op-amp seçeyim?', 'Bant genişliği'],
      chips_en: ['What is CMRR?', 'Which op-amp to use?', 'Bandwidth'],
    },
  },

  // ── Phase basics ───────────────────────────────────────────────────────
  {
    id: 'phase_basics',
    keywords: ['faz nedir', 'faz ne', 'faz kayması', 'phase nedir', 'phase shift', 'phase delay',
               '180 derece', '90 derece', '180 degrees', '90 degrees', 'faz farkı', 'phase difference'],
    response: {
      text_tr: 'Faz, periyodik bir sinyalin "ne kadar geciktiğinin" derece cinsinden ölçüsüdür. 360° = bir tam periyot.\n\n• **Eviren yükselteç**: çıkış girişe göre 180° kaymıştır (ters faz).\n• **Evirmeyen yükselteç**: 0° (aynı faz).\n• **İntegratör**: −90° (kosinüs sinüse döner).\n• **Diferansiyatör**: +90°.\n• **RC alçak geçiren filtre**: kesim frekansında −45°.\n\nFaz kayması yüksek frekanslarda kararlılık (osilasyon riski) için kritiktir; "faz marjı" terimine bak.',
      text_en: 'Phase measures how much a periodic signal is "delayed" in degrees. 360° = one full period.\n\n• **Inverting amp**: output is 180° shifted (opposite phase).\n• **Non-inverting amp**: 0° (same phase).\n• **Integrator**: −90° (cosine becomes sine).\n• **Differentiator**: +90°.\n• **RC low-pass filter**: −45° at the cutoff frequency.\n\nPhase shift matters at high frequencies for stability (oscillation risk); look up "phase margin".',
      chips_tr: ['Eviren yükselteç', 'İntegratör', 'Bant genişliği'],
      chips_en: ['Inverting amp', 'Integrator', 'Bandwidth'],
    },
  },

  // ── Transfer function ──────────────────────────────────────────────────
  {
    id: 'transfer_function',
    keywords: ['transfer fonksiyonu', 'transfer function', 'h(s)', 'h(jw)', 'h(f)', 's-domain',
               'laplace', 'frekans cevabı', 'frequency response'],
    response: {
      text_tr: 'Transfer fonksiyonu H(s) = Vout(s)/Vin(s), bir devrenin frekans alanındaki davranışını anlatır. s = jω = j(2πf).\n\n• **Eviren yükselteç**: H(s) = −Rf/Rin (frekanstan bağımsız, ideal kabul).\n• **İntegratör**: H(s) = −1/(sRC).\n• **Birinci dereceden alçak geçiren**: H(s) = 1/(1 + sRC).\n• **Sallen-Key 2. dereceden**: H(s) = 1/(1 + sRC + s²R²C²).\n\n|H(jω)| → kazanç, ∠H(jω) → faz. Bode diyagramı bu ikisini logaritmik olarak çizer.',
      text_en: 'Transfer function H(s) = Vout(s)/Vin(s) describes a circuit\'s behaviour in the frequency domain. s = jω = j(2πf).\n\n• **Inverting amp**: H(s) = −Rf/Rin (frequency-independent, ideal).\n• **Integrator**: H(s) = −1/(sRC).\n• **First-order low-pass**: H(s) = 1/(1 + sRC).\n• **Sallen-Key 2nd-order**: H(s) = 1/(1 + sRC + s²R²C²).\n\n|H(jω)| → magnitude, ∠H(jω) → phase. Bode plots show both on log axes.',
      chips_tr: ['Bant genişliği nedir?', 'Aktif filtre', 'Faz nedir?'],
      chips_en: ['What is bandwidth?', 'Active filter', 'What is phase?'],
    },
  },

  // ── SI units ───────────────────────────────────────────────────────────
  {
    id: 'units_basics',
    keywords: ['ohm', 'volt', 'amper', 'ampère', 'watt', 'farad', 'henry', 'birim', 'birimler',
               'unit', 'units', 'si birimi', 'kohm', 'mohm', 'µf', 'uf', 'nf', 'pf'],
    response: {
      text_tr: 'Op-amp devrelerinde kullanılan başlıca SI birimleri:\n• **V (volt)** — gerilim. mV (10⁻³), μV (10⁻⁶).\n• **A (amper)** — akım. mA, μA, nA (bias akımı seviyesi).\n• **Ω (ohm)** — direnç. kΩ (10³), MΩ (10⁶).\n• **F (farad)** — kapasite. μF (10⁻⁶), nF (10⁻⁹), pF (10⁻¹²).\n• **H (henry)** — endüktans (op-amp\'larda nadir).\n• **Hz (hertz)** — frekans. kHz, MHz.\n• **W (watt)** — güç. P = V·I.',
      text_en: 'Main SI units in op-amp circuits:\n• **V (volt)** — voltage. mV (10⁻³), μV (10⁻⁶).\n• **A (ampere)** — current. mA, μA, nA (bias-current scale).\n• **Ω (ohm)** — resistance. kΩ (10³), MΩ (10⁶).\n• **F (farad)** — capacitance. μF (10⁻⁶), nF (10⁻⁹), pF (10⁻¹²).\n• **H (henry)** — inductance (rare in op-amp work).\n• **Hz (hertz)** — frequency. kHz, MHz.\n• **W (watt)** — power. P = V·I.',
      chips_tr: ['Direnç temel', 'Kondansatör temel', 'Desibel nedir?'],
      chips_en: ['Resistor basics', 'Capacitor basics', 'What is decibel?'],
    },
  },

  // ── Resistor basics ────────────────────────────────────────────────────
  {
    id: 'resistor_basics',
    keywords: ['direnç temel', 'direnç nedir', 'resistor basics', 'what is resistor', 'renk kodu',
               'color code', 'direnç değeri', 'direnç hesap', 'ohm yasası', 'ohm\'s law'],
    response: {
      text_tr: 'Direnç (R), elektriksel akıma karşı koyma. Birimi ohm (Ω). **Ohm yasası**: V = I × R.\n\n• Renk kodu (4 bant): 1. ve 2. bant → rakam, 3. → çarpan, 4. → tolerans.\n  Örnek: kahve-siyah-kırmızı-altın = 1·0·100 ±5% = 1 kΩ.\n• Standart E12 değerleri: 10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82.\n• Op-amp devresinde tipik aralık: 1 kΩ – 1 MΩ. Çok düşük (parazit akım) ve çok yüksek (gürültü, bias akımı sapması) tehlikelidir.',
      text_en: 'A resistor (R) opposes electric current. Unit: ohm (Ω). **Ohm\'s law**: V = I × R.\n\n• Color code (4 bands): bands 1 & 2 → digit, 3 → multiplier, 4 → tolerance.\n  Example: brown-black-red-gold = 1·0·100 ±5% = 1 kΩ.\n• Standard E12 values: 10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82.\n• Typical range in op-amp circuits: 1 kΩ – 1 MΩ. Too low (parasitic current) and too high (noise, bias-current error) are risky.',
      chips_tr: ['Kazanç formülü', 'Birimler', 'Gerilim bölücü'],
      chips_en: ['Gain formula', 'Units', 'Voltage divider'],
    },
  },

  // ── Capacitor basics ───────────────────────────────────────────────────
  {
    id: 'capacitor_basics',
    keywords: ['kondansatör', 'kapasitör', 'kondansatör nedir', 'kapasitör nedir', 'kondansatör temel',
               'capacitor', 'capacitor basics', 'what is capacitor', 'what is a capacitor',
               'kapasite', 'capacitance', 'farad', 'kondansatör türü',
               'seramik kondansatör', 'elektrolitik', 'tantalum', 'film kondansatör', 'bypass cap'],
    response: {
      text_tr: 'Kondansatör (C), elektriksel enerjiyi alan içinde depolar. Birim: farad (F). DC\'yi engeller, AC\'yi geçirir.\n\n• **Seramik** (pF–μF): bypass için ideal, Vcc–GND arasına 100 nF.\n• **Elektrolitik** (μF–mF): büyük değer, polariteli (+ ve − tarafı vardır), güç kaynağında kullanılır.\n• **Film** (nF–μF): hassas ve düşük distorsiyon, audio sinyal yolunda.\n• **Tantalum**: kompakt, polariteli, ters bağlanırsa patlar.\n\nFormüller: Q = C·V (yük). XC = 1/(2πfC) (reaktans). RC zaman sabiti τ = R·C.',
      text_en: 'A capacitor (C) stores energy in an electric field. Unit: farad (F). Blocks DC, passes AC.\n\n• **Ceramic** (pF–μF): perfect for bypass, 100 nF between Vcc–GND.\n• **Electrolytic** (μF–mF): large value, polarised (+ and − sides), used in power supplies.\n• **Film** (nF–μF): precise and low-distortion, in audio signal paths.\n• **Tantalum**: compact, polarised, explodes if reversed.\n\nFormulas: Q = C·V (charge). XC = 1/(2πfC) (reactance). RC time constant τ = R·C.',
      chips_tr: ['İntegratör', 'Aktif filtre', 'AC ve DC nedir?'],
      chips_en: ['Integrator', 'Active filter', 'What is AC and DC?'],
    },
  },

  // ── Voltage divider ────────────────────────────────────────────────────
  {
    id: 'voltage_divider',
    keywords: ['gerilim bölücü', 'voltage divider', 'potansiyel bölücü', 'gerilim bölme',
               'iki direnç gerilim', 'r1 r2 vout'],
    response: {
      text_tr: 'Gerilim bölücü: iki direnç seri bağlanır, çıkış aralarındaki noktadan alınır.\n\n**Vout = Vin × R2 / (R1 + R2)**\n\nÖrnek: 12V → 6V için R1 = R2 = 10 kΩ.\nDikkat: Bölücü yüksek empedansa sahiptir; düşük empedanslı yük doğrudan bağlanırsa çıkış düşer. Çözüm: arkaya bir buffer (op-amp izleyici) koy → sinyal çekilirken bölücü etkilenmez. Tek besleme tasarımlarında "Vcc/2 referansı" üretmek için yaygın kullanılır.',
      text_en: 'A voltage divider uses two series resistors with the output tapped between them.\n\n**Vout = Vin × R2 / (R1 + R2)**\n\nExample: 12V → 6V with R1 = R2 = 10 kΩ.\nCaution: the divider has high source impedance; a low-impedance load directly attached drags the output down. Fix: place a buffer (op-amp follower) after it → the divider is undisturbed when current is drawn. Commonly used to make a "Vcc/2 reference" in single-supply designs.',
      chips_tr: ['Buffer nedir?', 'Empedans nedir?', 'Tek besleme'],
      chips_en: ['What is a buffer?', 'What is impedance?', 'Single supply'],
    },
  },

  // ── Bandwidth basics ───────────────────────────────────────────────────
  {
    id: 'bandwidth_basics',
    keywords: ['bant genişliği nedir', 'bant genişliği ne', 'what is bandwidth', 'bandwidth nedir',
               'fc', 'kesim frekansı', 'cutoff frequency', '-3 db', '3db', 'cut-off'],
    response: {
      text_tr: 'Bant genişliği: bir devrenin "düz" cevap verdiği frekans aralığı. Tipik tanım: kazanç maksimumdan 3 dB (yaklaşık 0.707×) düştüğü noktaya kadar olan aralık.\n\n• **Alçak geçiren** filtrenin BW\'i kesim frekansı fc\'ye eşittir.\n• **Op-amp\'ın kapalı çevrim** BW\'si: BW = GBW / Av. Örn. GBW=1 MHz, Av=10 → BW=100 kHz.\n• **Sallen-Key 2. dereceden** filtre: fc civarında -40 dB/decade rolloff.\n\nGörsel: kazancın frekansa karşı çizimine **Bode diyagramı** denir.',
      text_en: 'Bandwidth: the frequency range over which a circuit responds "flat". Typical definition: the range up to where gain drops 3 dB (≈0.707×) from peak.\n\n• A **low-pass filter\'s** BW equals its cutoff frequency fc.\n• Op-amp **closed-loop** BW: BW = GBW / Av. e.g. GBW=1 MHz, Av=10 → BW=100 kHz.\n• Sallen-Key 2nd-order filter: −40 dB/decade rolloff around fc.\n\nGraph: gain vs. frequency = a **Bode plot**.',
      chips_tr: ['GBW nedir?', 'Aktif filtre', 'Faz nedir?'],
      chips_en: ['What is GBW?', 'Active filter', 'What is phase?'],
    },
  },

  // ── Simulator help ─────────────────────────────────────────────────────
  {
    id: 'simulator_help',
    keywords: ['simülatörü nasıl kullanırım', 'simülatörü nasıl kullanabilirim', 'simülatör nasıl kullanılır',
               'simülatörü nasıl', 'simülatör nasıl kullan', 'how do i use the simulator',
               'how to use the simulator', 'how to use simulator', 'simulator nasıl', 'simülator help',
               'simulator help', 'simülatör rehber', 'simulator guide', 'kullanım rehberi'],
    response: {
      text_tr: 'Simülatör rehberi:\n1. **Sol sütun**: Beş devreden birini seç (eviren, evirmeyen, buffer, karşılaştırıcı, kaskad). Şematik ve formül anlık güncellenir.\n2. **Orta sütun**: Sürgülerle parametreleri ayarla (Rin, Rf, Vcc, dalga formu, frekans, genlik). Her değere tıklayıp elle de yazabilirsin.\n3. **Sağ sütun**: Osiloskop. Mavi = Vin, copper = Vout. Üzerine fareyle gel → spesifik anki değerleri gör. Altta ⏸ Statik (dondur) ve ¼×–4× hız.\n4. Sağ üstte **PNG indir** ve **Bağlantıyı paylaş**: tüm parametreler URL\'ye gömülür, paylaşılan kişi aynı devreyi görür.',
      text_en: 'Simulator guide:\n1. **Left column**: pick one of five circuits (inverting, non-inv, buffer, comparator, cascade). Schematic and formula update instantly.\n2. **Middle column**: adjust parameters with sliders (Rin, Rf, Vcc, waveform, frequency, amplitude). Click any value to type one in directly.\n3. **Right column**: oscilloscope. Blue = Vin, copper = Vout. Hover for instantaneous values. Below: ⏸ Static (freeze) and ¼×–4× speed.\n4. Top right: **Download PNG** and **Share link**: all parameters get embedded in the URL so the recipient sees the same circuit.',
      link: { to: '/simulator', label_tr: 'Simülatöre git →', label_en: 'Open simulator →' },
      chips_tr: ['Hız kontrolü', 'Saturasyon', 'Kazanç formülü'],
      chips_en: ['Speed control', 'Saturation', 'Gain formula'],
    },
  },

  // ── Ideal model ────────────────────────────────────────────────────────
  {
    id: 'ideal_model',
    keywords: ['ideal', 'altın kural', 'golden rule', 'sonsuz kazanç', 'infinite gain',
               'ideal op-amp', 'mükemmel'],
    response: {
      text_tr: 'İdeal op-amp beş kurala uyar: Aol = ∞, Zin = ∞ (giriş akımı = 0), Zout = 0, bant genişliği = ∞, ofset = 0. Bu kabuller gerçek hesaplamalar için gayet yeterlidir.',
      text_en: 'The ideal op-amp obeys five rules: Aol = ∞, Zin = ∞ (no input current), Zout = 0, bandwidth = ∞, offset = 0. These assumptions give excellent real-world results.',
      link: { to: '/theory/ideal-opamp', label_tr: 'İdeal model bölümü →', label_en: 'Ideal model chapter →' },
      chips_tr: ['Sanal toprak nedir?', 'Gerçek op-amp parametreleri', 'Açık çevrim kazancı'],
      chips_en: ['What is virtual ground?', 'Real op-amp parameters', 'Open-loop gain'],
    },
  },

  // ── Virtual ground ──────────────────────────────────────────────────────
  {
    id: 'virtual_ground',
    keywords: ['sanal toprak', 'virtual ground', 'eksi giriş', 'minus input',
               'neden sıfır', 'why zero', '0v', 'sıfır volt'],
    response: {
      text_tr: 'Sanal toprak: eviren yükseltecin eksi girişi negatif geri besleme sayesinde 0 V\'da "sabitlenir". Akım oraya girmez — Rin\'den gelen akımın tamamı Rf\'e akar.',
      text_en: 'Virtual ground: the inverting amp\'s minus input is held at 0 V by negative feedback. No current flows into it — all current from Rin must flow through Rf.',
      link: { to: '/theory/virtual-ground', label_tr: 'Sanal toprak bölümü →', label_en: 'Virtual ground chapter →' },
      chips_tr: ['Eviren yükselteç formülü', 'Negatif geri besleme nedir?', 'Toplayıcı yükselteç'],
      chips_en: ['Inverting amp formula', 'What is negative feedback?', 'Summing amplifier'],
    },
  },

  // ── Open-loop gain ──────────────────────────────────────────────────────
  {
    id: 'open_loop',
    keywords: ['açık çevrim', 'open loop', 'aol', 'open-loop', 'açık çevrim kazancı',
               'büyük kazanç', 'huge gain', 'open loop gain', 'raya vurur', 'slams rail'],
    response: {
      text_tr: 'Açık çevrim kazancı (Aol) tipik olarak 10⁵–10⁶. Geri besleme olmadan 1 mV bile çıkışı raya vurur. Karşılaştırıcı bunu kullanır; kapalı çevrimde bu kazanç ehlileşir.',
      text_en: 'Open-loop gain (Aol) is typically 10⁵–10⁶. Without feedback even 1 mV drives the output to the rail. A comparator exploits this; closed-loop feedback tames it.',
      link: { to: '/theory/open-loop-gain', label_tr: 'Açık çevrim bölümü →', label_en: 'Open-loop gain chapter →' },
      chips_tr: ['Negatif geri besleme nedir?', 'Karşılaştırıcıyı simüle et', 'GBW nedir?'],
      chips_en: ['What is negative feedback?', 'Simulate comparator', 'What is GBW?'],
    },
  },

  // ── Negative feedback ───────────────────────────────────────────────────
  {
    id: 'negative_feedback',
    keywords: ['negatif geri besleme', 'negative feedback', 'geri besleme', 'feedback',
               'kapalı çevrim', 'closed loop', 'dengeler', 'self-correcting'],
    response: {
      text_tr: 'Negatif geri besleme çıkışın bir kısmını eksi girişe döndürür. Bu sayede kazanç yalnızca dış direnç oranına bağlı olur (−Rf/Rin) — op-amp\'ın kendi parametreleri önemini yitirir.',
      text_en: 'Negative feedback returns a fraction of the output to the minus input. This makes gain depend only on external resistor ratio (−Rf/Rin) — the op-amp\'s own parameters become irrelevant.',
      link: { to: '/theory/negative-feedback', label_tr: 'Geri besleme bölümü →', label_en: 'Feedback chapter →' },
      chips_tr: ['Eviren yükselteç formülü', 'Evirmeyen yükselteç nedir?', 'Kazanç nasıl hesaplanır?'],
      chips_en: ['Inverting amp formula', 'What is non-inverting amp?', 'How to calculate gain?'],
    },
  },

  // ── Gain ────────────────────────────────────────────────────────────────
  {
    id: 'gain',
    keywords: ['kazanç', 'gain', 'formül', 'formula', 'hesapla', 'calculate', 'rf', 'rin',
               'amplification', 'yükseltme', 'kez', 'times', 'katsayı'],
    response: {
      text_tr: 'Kazanç formülleri:\n• Eviren: Av = −Rf / Rin\n• Evirmeyen: Av = 1 + Rf / Rin\n• Buffer: Av = 1\nSimülatörde sol altta anlık hesaplanmış değeri görebilirsin.',
      text_en: 'Gain formulas:\n• Inverting: Av = −Rf / Rin\n• Non-inverting: Av = 1 + Rf / Rin\n• Buffer: Av = 1\nThe simulator shows the computed value live in the bottom-left.',
      link: { to: '/simulator', label_tr: 'Simülatörde dene →', label_en: 'Try in simulator →' },
      chips_tr: ['Sanal toprak nedir?', 'GBW nedir?', 'Saturasyon ne demek?'],
      chips_en: ['What is virtual ground?', 'What is GBW?', 'What is saturation?'],
    },
  },

  // ── Inverting amp ───────────────────────────────────────────────────────
  {
    id: 'inverting',
    keywords: ['eviren', 'inverting', 'ters fazlı', 'inverted phase', 'ev. yük', 'minus input rin'],
    response: {
      text_tr: 'Eviren yükselteç: Vin, Rin üzerinden eksi girişe bağlanır. Rf geri besleme sağlar. Kazanç = −Rf/Rin (eksi işaret: 180° faz terslemesi). Giriş empedansı ≈ Rin.',
      text_en: 'Inverting amplifier: Vin connects to minus input through Rin. Rf provides feedback. Gain = −Rf/Rin (minus sign = 180° phase inversion). Input impedance ≈ Rin.',
      link: { to: '/theory/inverting-amp', label_tr: 'Eviren yükselteç bölümü →', label_en: 'Inverting amp chapter →' },
      chips_tr: ['Sanal toprak nedir?', 'Toplayıcı yükselteç', 'Simülatörde dene'],
      chips_en: ['What is virtual ground?', 'Summing amplifier', 'Try in simulator'],
    },
  },

  // ── Non-inverting amp ───────────────────────────────────────────────────
  {
    id: 'noninverting',
    keywords: ['evirmeyen', 'non-inverting', 'noninv', 'non inverting', 'artı giriş', 'plus input',
               'eş fazlı', 'in phase', 'aynı fazda'],
    response: {
      text_tr: 'Evirmeyen yükselteç: Vin artı girişe bağlanır. Kazanç = 1 + Rf/Rin (her zaman ≥ 1, faz terslemesi yok). Giriş empedansı çok yüksektir.',
      text_en: 'Non-inverting amplifier: Vin connects to plus input. Gain = 1 + Rf/Rin (always ≥ 1, no phase inversion). Input impedance is very high.',
      link: { to: '/theory/noninverting-amp', label_tr: 'Evirmeyen yükselteç bölümü →', label_en: 'Non-inverting amp chapter →' },
      chips_tr: ['Buffer nedir?', 'Eviren ile fark ne?', 'Kazanç nasıl hesaplanır?'],
      chips_en: ['What is a buffer?', 'Difference from inverting?', 'How to calculate gain?'],
    },
  },

  // ── Buffer / voltage follower ────────────────────────────────────────────
  {
    id: 'buffer',
    keywords: ['buffer', 'izleyici', 'voltage follower', 'gerilim izleyici', 'av=1', 'av = 1',
               'unity gain', 'birlik kazanç', 'empedans uyumu', 'impedance matching'],
    response: {
      text_tr: 'Buffer (gerilim izleyici): Rf=0, Rin=∞ → Av=1. Çıkış girişi aynen taklit eder. Yüksek giriş empedansı + düşük çıkış empedansı sayesinde kaynağa yük bindirmez.',
      text_en: 'Buffer (voltage follower): Rf=0, Rin=∞ → Av=1. Output copies input exactly. High input impedance + low output impedance means it doesn\'t load the source.',
      link: { to: '/theory/impedance', label_tr: 'Empedans bölümü →', label_en: 'Impedance chapter →' },
      chips_tr: ['Empedans neden önemli?', 'Simülatörde buffer', 'Evirmeyen yükselteç'],
      chips_en: ['Why does impedance matter?', 'Buffer in simulator', 'Non-inverting amp'],
    },
  },

  // ── Summing amp ─────────────────────────────────────────────────────────
  {
    id: 'summing',
    keywords: ['toplayıcı', 'summing', 'toplama', 'sum', 'mikser', 'mixer', 'ses mikseri',
               'audio mixer', 'birden fazla giriş', 'multiple inputs', 'dac'],
    response: {
      text_tr: 'Toplayıcı yükselteç: birden fazla giriş sanal toprak noktasında toplanır. Vout = −Rf × (V1/R1 + V2/R2 + …). Ses mikserinin temel devresidir.',
      text_en: 'Summing amplifier: multiple inputs sum at the virtual ground node. Vout = −Rf × (V1/R1 + V2/R2 + …). The core circuit of an audio mixer.',
      link: { to: '/theory/summing-amp', label_tr: 'Toplayıcı yükselteç bölümü →', label_en: 'Summing amp chapter →' },
      chips_tr: ['Sanal toprak nedir?', 'Fark yükselteci nedir?', 'Ses preamp uygulaması'],
      chips_en: ['What is virtual ground?', 'What is a difference amp?', 'Audio preamp application'],
    },
  },

  // ── Difference amp ──────────────────────────────────────────────────────
  {
    id: 'difference',
    keywords: ['fark yükselteci', 'difference amplifier', 'differential', 'fark', 'diferansiyel',
               'eksi artı', 'subtractor', 'çıkarıcı', 'enstrümantasyon', 'instrumentation'],
    response: {
      text_tr: 'Fark yükselteci sadece iki giriş arasındaki farkı yükseltir, ortak gürültüyü reddeder. Dört eşit direnç kullanılırsa: Vout = V2 − V1. EKG ve köprü sensörlerinde kullanılır.',
      text_en: 'Difference amplifier only amplifies the difference between two inputs, rejecting common noise. With four equal resistors: Vout = V2 − V1. Used in EKG and bridge sensors.',
      link: { to: '/theory/difference-amp', label_tr: 'Fark yükselteci bölümü →', label_en: 'Difference amp chapter →' },
      chips_tr: ['CMRR nedir?', 'EKG uygulaması', 'Toplayıcı yükselteç'],
      chips_en: ['What is CMRR?', 'EKG application', 'Summing amplifier'],
    },
  },

  // ── Integrator ──────────────────────────────────────────────────────────
  {
    id: 'integrator',
    keywords: ['integratör', 'integrator', 'integral', 'rc integral', 'op-amp integratör',
               'alçak geçiren op-amp', 'low pass op-amp', 'üçgen dalga', 'triangle wave',
               'kare dalga integre', 'integral devresi'],
    response: {
      text_tr: 'İntegratör: Rf yerine kondansatör. Vout = −(1/RC) × ∫Vin dt. Kare dalga → üçgen dalga. Yavaş frekansları geçirir. DC kararsızlığını önlemek için Rf\'e paralel büyük direnç eklenir.',
      text_en: 'Integrator: capacitor instead of Rf. Vout = −(1/RC) × ∫Vin dt. Square wave → triangle wave. Passes low frequencies. Add a large resistor parallel to C to prevent DC drift.',
      link: { to: '/theory/integrator', label_tr: 'İntegratör bölümü →', label_en: 'Integrator chapter →' },
      chips_tr: ['Diferansiyatör nedir?', 'Aktif filtre uygulaması', 'RC zaman sabiti'],
      chips_en: ['What is a differentiator?', 'Active filter application', 'RC time constant'],
    },
  },

  // ── Differentiator ──────────────────────────────────────────────────────
  {
    id: 'differentiator',
    keywords: ['diferansiyatör', 'differentiator', 'türev', 'derivative', 'yüksek geçiren',
               'high pass', 'kare dalga', 'square', 'kenar algılama', 'edge detection'],
    response: {
      text_tr: 'Diferansiyatör: giriş kondansatör, geri besleme direnç. Vout = −Rf×C×dVin/dt. Üçgen dalga → kare dalga. Yüksek frekanslara çok duyarlıdır (gürültü sorunları olabilir).',
      text_en: 'Differentiator: input capacitor, feedback resistor. Vout = −Rf×C×dVin/dt. Triangle wave → square wave. Very sensitive to high frequencies (noise can be a problem).',
      link: { to: '/theory/differentiator', label_tr: 'Diferansiyatör bölümü →', label_en: 'Differentiator chapter →' },
      chips_tr: ['İntegratör nedir?', 'Aktif filtre uygulaması'],
      chips_en: ['What is an integrator?', 'Active filter application'],
    },
  },

  // ── CMRR ────────────────────────────────────────────────────────────────
  {
    id: 'cmrr',
    keywords: ['cmrr', 'ortak mod', 'common mode', 'gürültü reddi', 'noise rejection',
               'şebeke gürültüsü', 'mains noise', '50hz', 'ekart', 'rejection'],
    response: {
      text_tr: 'CMRR = Ad/Acm. Her iki girişte aynı anda bulunan gürültüyü bastırma oranı. 80 dB CMRR → gürültü 10.000\'de 1 bastırılır. EKG devresindeki 50 Hz gürültüsü bu şekilde süzülür.',
      text_en: 'CMRR = Ad/Acm. How well common-mode noise (present on both inputs equally) is suppressed. 80 dB CMRR → noise suppressed 10,000:1. This is how EKG rejects 50 Hz mains noise.',
      link: { to: '/theory/cmrr', label_tr: 'CMRR bölümü →', label_en: 'CMRR chapter →' },
      chips_tr: ['Fark yükselteci nedir?', 'EKG uygulaması', 'Gerçek op-amp parametreleri'],
      chips_en: ['What is a difference amp?', 'EKG application', 'Real op-amp parameters'],
    },
  },

  // ── GBW ─────────────────────────────────────────────────────────────────
  {
    id: 'gbw',
    keywords: ['gbw', 'bant genişliği', 'bandwidth', 'gain bandwidth', 'kazanç bant',
               'frekans', 'frequency', 'kesim', 'cutoff', 'mhz', 'khz'],
    response: {
      text_tr: 'GBW (kazanç-bant genişliği çarpımı) sabittir. Kazanç artarsa bant genişliği düşer. Tipik LM741: GBW=1 MHz. Av=10× → BW=100 kHz. Av=100× → BW=10 kHz.',
      text_en: 'GBW (gain-bandwidth product) is constant. Increase gain, bandwidth drops. Typical LM741: GBW=1 MHz. Av=10× → BW=100 kHz. Av=100× → BW=10 kHz.',
      link: { to: '/theory/gbw', label_tr: 'GBW bölümü →', label_en: 'GBW chapter →' },
      chips_tr: ['Slew rate nedir?', 'Simülatörde frekans ayarla', 'Aktif filtre'],
      chips_en: ['What is slew rate?', 'Adjust frequency in simulator', 'Active filter'],
    },
  },

  // ── Slew rate ───────────────────────────────────────────────────────────
  {
    id: 'slew_rate',
    keywords: ['slew rate', 'slew', 'değişim hızı', 'rate of change', 'v/μs', 'v/us',
               'bozulma', 'distortion', 'yüksek frekans', 'high frequency'],
    response: {
      text_tr: 'Slew rate: çıkışın maksimum değişim hızı (V/μs). LM741=0.5 V/μs, TL071=13 V/μs. Aşılırsa sinüs üçgene dönüşür. f_max = SR/(2π×Vout_pk) formülüyle hesaplanır.',
      text_en: 'Slew rate: maximum output rate of change (V/μs). LM741=0.5 V/μs, TL071=13 V/μs. Exceed it and sine waves go triangular. f_max = SR/(2π×Vout_pk).',
      link: { to: '/theory/slew-rate', label_tr: 'Slew rate bölümü →', label_en: 'Slew rate chapter →' },
      chips_tr: ['GBW nedir?', 'Kare dalga simülasyonu', 'Gerçek op-amp parametreleri'],
      chips_en: ['What is GBW?', 'Square wave simulation', 'Real op-amp parameters'],
    },
  },

  // ── Impedance ───────────────────────────────────────────────────────────
  {
    id: 'impedance',
    keywords: ['empedans', 'impedance', 'giriş empedansı', 'input impedance', 'çıkış empedansı',
               'output impedance', 'yük', 'load', 'kaynak', 'source', 'megaohm'],
    response: {
      text_tr: 'İdeal op-amp: giriş empedansı = ∞ (akım girmez), çıkış empedansı = 0 (her yükü sürer). Buffer bu özellikleri en iyi kullanır: yüksek Zin ile kaynağa yük bindirmez.',
      text_en: 'Ideal op-amp: input impedance = ∞ (no current drawn), output impedance = 0 (drives any load). A buffer best exploits these: high Zin means it never loads the source.',
      link: { to: '/theory/impedance', label_tr: 'Empedans bölümü →', label_en: 'Impedance chapter →' },
      chips_tr: ['Buffer nedir?', 'Giriş akımı neden sıfır?', 'CMRR ile ilişkisi?'],
      chips_en: ['What is a buffer?', 'Why zero input current?', 'Relation to CMRR?'],
    },
  },

  // ── Saturation ──────────────────────────────────────────────────────────
  {
    id: 'saturation',
    keywords: ['saturasyon', 'saturation', 'klipleme', 'clipping', 'raya vurur', 'slams',
               'vcc', 'vee', 'besleme', 'supply', 'kısılma', 'rail'],
    response: {
      text_tr: 'Saturasyon: kazanç × Vin > Vcc olduğunda çıkış raya vurur ve kare dalga şeklini alır. Simülatörde kırmızı SATURASYON göstergesi yanar. Çözüm: kazancı düşür veya Vcc\'yi artır.',
      text_en: 'Saturation: when Gain × Vin > Vcc the output hits the rail and becomes a square wave. The simulator shows a red SATURATED indicator. Fix: lower the gain or raise Vcc.',
      link: { to: '/simulator', label_tr: 'Simülatörde izle →', label_en: 'Watch in simulator →' },
      chips_tr: ['Açık çevrim kazancı', 'Vcc nasıl ayarlanır?', 'Karşılaştırıcı modu'],
      chips_en: ['Open-loop gain', 'How to set Vcc?', 'Comparator mode'],
    },
  },

  // ── Offset voltage / real params ────────────────────────────────────────
  {
    id: 'real_params',
    keywords: ['ofset', 'offset', 'vos', 'bias akımı', 'bias current', 'noise tempco',
               'gerçek', 'real', 'datasheet', 'sıcaklık', 'temperature', 'drift', 'ib'],
    response: {
      text_tr: 'Gerçek op-amp\'ın önemli sapmaları: Ofset gerilimi (Vos), bias akımı (Ib), gürültü ve sıcaklık katsayısı. LM741 için Vos≈1–5 mV; OPA177 gibi hassas op-amp\'larda 10 μV.',
      text_en: 'Real op-amp deviations: offset voltage (Vos), bias current (Ib), noise and temperature coefficient. LM741 Vos≈1–5 mV; precision op-amps like OPA177 reach 10 μV.',
      link: { to: '/theory/real-parameters', label_tr: 'Gerçek parametreler bölümü →', label_en: 'Real parameters chapter →' },
      chips_tr: ['Slew rate nedir?', 'GBW nedir?', 'CMRR nedir?'],
      chips_en: ['What is slew rate?', 'What is GBW?', 'What is CMRR?'],
    },
  },

  // ── Schmitt trigger ─────────────────────────────────────────────────────
  {
    id: 'schmitt',
    keywords: ['schmitt', 'histerezis', 'hysteresis', 'tetikleyici', 'trigger',
               'eşik', 'threshold'],
    response: {
      text_tr: 'Schmitt tetikleyici pozitif geri besleme kullanır. İki farklı eşik (üst/alt) sayesinde gürültüye karşı bağışıklık kazanır. Kapı devreleri ve osilatörlerde kullanılır.',
      text_en: 'A Schmitt trigger uses positive feedback. Two separate thresholds (upper/lower) give it immunity to noise. Used in gate circuits and oscillators.',
      link: { to: '/applications', label_tr: 'Schmitt demo →', label_en: 'Schmitt demo →' },
      chips_tr: ['Karşılaştırıcı nedir?', 'Histerezis ne demek?', 'Simülatörde karşılaştırıcı'],
      chips_en: ['What is a comparator?', 'What is hysteresis?', 'Comparator in simulator'],
    },
  },

  // ── Active filter / Sallen-Key ─────────────────────────────────────────
  {
    id: 'active_filter',
    keywords: ['aktif filtre', 'active filter', 'sallen-key', 'sallen key', 'butterworth', 'chebyshev',
               'bessel', 'ikinci dereceden', 'second order', '2. dereceden', 'bant durduran',
               'band pass', 'bant geçiren', 'notch', 'q faktörü', 'q factor', 'rezonans'],
    response: {
      text_tr: 'Aktif filtre: op-amp + R + C ile op-amp kazancını da içeren filtre topolojileri. Pasif RC filtreden farkı: kazanç sağlar ve yük etkisini önler.\n\nYaygın topolojiler:\n• **Sallen-Key** — 2. dereceden, düşük bileşen sayısı. Uygulamalar sayfasındaki demo budur.\n• **Multiple Feedback (MFB)** — düşük gürültü, yüksek Q.\n• **State Variable** — aynı anda LP/HP/BP çıkışı.\n\nTasarım parametreleri: kesim frekansı fc = 1/(2π√(R₁R₂C₁C₂)), Q faktörü.',
      text_en: 'Active filter: op-amp + R + C filter topologies that also provide gain. Advantage over passive RC: provides gain and prevents loading.\n\nCommon topologies:\n• **Sallen-Key** — 2nd order, low component count. This is what the Applications page demo uses.\n• **Multiple Feedback (MFB)** — low noise, high Q.\n• **State Variable** — simultaneous LP/HP/BP outputs.\n\nDesign parameters: cutoff fc = 1/(2π√(R₁R₂C₁C₂)), Q factor.',
      link: { to: '/applications', label_tr: 'Filtre demosuna git →', label_en: 'Go to filter demo →' },
      chips_tr: ['Kesim frekansı nedir?', 'Bant genişliği', 'İntegratör nedir?'],
      chips_en: ['What is cutoff frequency?', 'Bandwidth', 'What is an integrator?'],
    },
  },

  // ── Audio preamp application ────────────────────────────────────────────
  {
    id: 'audio_preamp_app',
    keywords: ['ses preamp', 'audio preamp', 'mikrofon yükselteci', 'microphone amp', 'phono preamp',
               'ses ön kat', 'preamplifier', 'kayıt stüdyo', 'recording studio', 'ses devresi',
               'audio circuit', 'müzik elektroniği', 'music electronics'],
    response: {
      text_tr: 'Ses preamp\'i (ön yükselteç): mikrofon veya enstrümandan gelen zayıf sinyali (mV seviyesi) hat seviyesine (1 V civarı) yükseltir.\n\nTemel yapı: evirmeyen yükselteç veya fark yükselteci. Önemli parametreler:\n• **Kazanç**: 20–60 dB arası tipik.\n• **Gürültü**: NE5532 gibi düşük gürültülü op-amp.\n• **Frekans cevabı**: 20 Hz–20 kHz düz olmalı.\n• **Bant sınırlama**: düşük geçiren filtre ile VHF gürültüsünü kes.\n• **Fantom güç** (kondenser mikrofon için): +48V, ayrı devre gerektirir.\n\nAtölye demosu: sol kanal mono preamp, kazanç 20×–200×, düşük geçiren filtre entegre.',
      text_en: 'Audio preamp (preamplifier): boosts the weak signal from a microphone or instrument (mV level) to line level (~1 V).\n\nBasic structure: non-inverting or difference amp. Key parameters:\n• **Gain**: typically 20–60 dB.\n• **Noise**: low-noise op-amp like NE5532.\n• **Frequency response**: flat 20 Hz–20 kHz.\n• **Band limiting**: low-pass filter to cut VHF noise.\n• **Phantom power** (condenser mic): +48V, separate circuit needed.\n\nWorkshop demo: mono preamp, gain 20×–200×, integrated low-pass filter.',
      link: { to: '/applications', label_tr: 'Ses preamp demosuna git →', label_en: 'Go to audio preamp demo →' },
      chips_tr: ['Hangi op-amp seçeyim?', 'Aktif filtre', 'Kazanç formülü'],
      chips_en: ['Which op-amp to use?', 'Active filter', 'Gain formula'],
    },
  },

  // ── EKG / biomedical application ───────────────────────────────────────
  {
    id: 'ekg_app',
    keywords: ['ekg', 'ecg', 'elektrokardiyogram', 'electrocardiogram', 'biyomedikal', 'biomedical',
               'tıbbi', 'medical', 'kalp sinyali', 'heart signal', 'iha', 'iaa', 'biyopotansiyel',
               'biopotential', 'eeg', 'emg', 'vücut sinyali'],
    response: {
      text_tr: 'EKG (elektrokardiyogram): kalp kasının elektrik aktivitesini vücut yüzeyinden ölçen sistem. Op-amp devresinin tıbbi uygulaması.\n\nDevre zinciri:\n1. **Fark yükselteci** (enstrümantasyon amp, INA128): iki elektrot arasındaki farkı alır, ortak 50 Hz şebeke gürültüsünü reddeder (CMRR > 80 dB şart).\n2. **Yüksek geçiren filtre** (fc ≈ 0.05 Hz): DC offset ve elektroyama potansiyelini kaldırır.\n3. **Yükseltme**: 1000× kadar kazanç.\n4. **Alçak geçiren filtre** (fc ≈ 150 Hz): kas gürültüsünü keser.\n5. **Sağ bacak sürücüsü** (RLD): aktif gürültü geri besleme, güvenlik.',
      text_en: 'ECG (electrocardiogram): a system that measures the heart muscle\'s electrical activity from the body surface. The medical application of op-amp circuits.\n\nSignal chain:\n1. **Differential amp** (instrumentation amp, INA128): takes the difference between two electrodes, rejects common 50 Hz mains noise (CMRR > 80 dB required).\n2. **High-pass filter** (fc ≈ 0.05 Hz): removes DC offset and electrode half-cell potential.\n3. **Amplification**: up to 1000× gain.\n4. **Low-pass filter** (fc ≈ 150 Hz): cuts muscle noise.\n5. **Right-leg driver (RLD)**: active noise feedback, safety.',
      chips_tr: ['CMRR nedir?', 'Fark yükselteci', 'Enstrümantasyon amp'],
      chips_en: ['What is CMRR?', 'Difference amplifier', 'Instrumentation amp'],
    },
  },

  // ── Instrumentation amplifier ──────────────────────────────────────────
  {
    id: 'instrumentation_amp',
    keywords: ['enstrümantasyon yükselteci', 'instrumentation amplifier', 'ina', 'ina128', 'ina126',
               'ina118', 'ad620', 'ad8221', 'üç op-amp', 'three op-amp', 'hassas fark',
               'precise differential', 'köprü sensör', 'bridge sensor', 'strain gauge', 'gerilme ölçer'],
    response: {
      text_tr: 'Enstrümantasyon yükselteci (INA): üç op-amp\'tan oluşan özel fark yükselteci. Standart fark yükseltecinden farkı:\n• Çok yüksek giriş empedansı (Zin → ∞)\n• Tek direnç (Rgain) ile kazanç ayarı\n• Çok yüksek CMRR (> 100 dB)\n• Güvenilir kazanç hassasiyeti\n\nFormül: Vout = (1 + 50kΩ/Rgain) × (V+ − V−) [INA128 için]\n\nKullanım: EKG, köprü sensörü (wheatstone), termokupl, load cell. Tek entegre (INA128, AD620) hem ucuz hem kolay.',
      text_en: 'Instrumentation amplifier (INA): a specialized difference amp built from three op-amps. Advantages over a standard difference amp:\n• Very high input impedance (Zin → ∞)\n• Single resistor (Rgain) sets gain\n• Very high CMRR (> 100 dB)\n• Reliable gain accuracy\n\nFormula: Vout = (1 + 50kΩ/Rgain) × (V+ − V−) [for INA128]\n\nUse cases: ECG, bridge sensors (Wheatstone), thermocouples, load cells. A single IC (INA128, AD620) is both cheap and easy.',
      chips_tr: ['EKG uygulaması', 'CMRR nedir?', 'Fark yükselteci nedir?'],
      chips_en: ['ECG application', 'What is CMRR?', 'What is a difference amp?'],
    },
  },

  // ── RC time constant ───────────────────────────────────────────────────
  {
    id: 'rc_time_constant',
    keywords: ['rc zaman sabiti', 'rc time constant', 'tau', 'τ', 'zaman sabiti', 'time constant',
               'şarj süresi', 'charge time', 'deşarj', 'discharge', '63 yüzde', '63%',
               'rc hesap', 'rc formula', 'rc devresi', 'rc circuit'],
    response: {
      text_tr: 'RC zaman sabiti τ = R × C (saniye, R=Ω, C=F).\n\nKondansatör τ süresinde %63\'üne şarj olur; 5τ sonunda %99 — tam şarj sayılır.\n\n• τ = 1ms → R=1kΩ, C=1μF\n• τ = 1ms → R=10kΩ, C=100nF (aynı τ, farklı bileşenler)\n\nOp-amp bağlamında:\n• İntegratör: Vout = −(1/RC)∫Vin dt → τ = RC\n• Alçak geçiren filtre: kesim fc = 1/(2πRC)\n• Diferansiyatör: Vout = −RC × dVin/dt',
      text_en: 'RC time constant τ = R × C (seconds, R in Ω, C in F).\n\nA capacitor charges to 63% in time τ; after 5τ it\'s at 99% — considered fully charged.\n\n• τ = 1ms → R=1kΩ, C=1μF\n• τ = 1ms → R=10kΩ, C=100nF (same τ, different parts)\n\nIn op-amp context:\n• Integrator: Vout = −(1/RC)∫Vin dt → τ = RC\n• Low-pass filter: cutoff fc = 1/(2πRC)\n• Differentiator: Vout = −RC × dVin/dt',
      chips_tr: ['İntegratör nedir?', 'Aktif filtre', 'Kondansatör nedir?'],
      chips_en: ['What is an integrator?', 'Active filter', 'What is a capacitor?'],
    },
  },

  // ── Precision rectifier ────────────────────────────────────────────────
  {
    id: 'precision_rectifier',
    keywords: ['hassas doğrultucu', 'precision rectifier', 'yarım dalga', 'half wave',
               'tam dalga doğrultucu', 'full wave rectifier', 'diyot op-amp', 'superdiode',
               'süper diyot', 'ac rms', 'doğrultucu devre', 'rectifier circuit'],
    response: {
      text_tr: 'Hassas doğrultucu (süper diyot): op-amp diyotun gerilim düşümünü (~0.6V) telafi eder, böylece milivolt seviyeli AC sinyaller bile doğrulur.\n\nYarım dalga: diyot geri besleme içinde → pozitif yarım geçer, negatif bloklanır. Çıkış eşiği ≈ 0V (ideal).\n\nTam dalga: iki op-amp + dört diyot veya toplayıcı + ağırlıklı fark yapısı.\n\nKullanım: gerçek RMS ölçer, sinyal dedektörü, envelope detektörü, peak dedektörü.',
      text_en: 'Precision rectifier (super diode): the op-amp compensates for the diode\'s forward voltage (~0.6V), so even millivolt-level AC signals are rectified.\n\nHalf-wave: diode in the feedback path → positive half passes, negative blocked. Output threshold ≈ 0V (ideal).\n\nFull-wave: two op-amps + four diodes or summing + weighted difference topology.\n\nUse cases: true RMS meter, signal detector, envelope detector, peak detector.',
      chips_tr: ['Diode nedir?', 'Fark yükselteci', 'Op-amp nedir?'],
      chips_en: ['What is a diode?', 'Difference amplifier', 'What is an op-amp?'],
    },
  },

  // ── Vcc/2 bias for single supply ───────────────────────────────────────
  {
    id: 'vref_bias',
    keywords: ['vcc/2', 'vcc bölü iki', 'orta nokta', 'midpoint', 'sanal orta', 'virtual mid',
               'tek besleme bias', 'single supply bias', 'orta gerilim', 'mid supply',
               'vref üretimi', 'vref generation', 'bias devre', 'bias circuit', 'yapay toprak'],
    response: {
      text_tr: 'Tek beslemede (sadece +Vcc) sinyalin etrafında salınacağı bir referans noktası üretmek gerekir: Vcc/2.\n\n**Yöntem 1 — Gerilim bölücü + buffer:**\nR1=R2 ile Vcc/2 üret, arkasına buffer op-amp koy → yük altında kararlı referans.\n\n**Yöntem 2 — Referans entegresi:**\nTL431, REF02 gibi dedicated voltaj referansı. Daha hassas.\n\n**Yöntem 3 — Güç kaynağında bölücü:**\nLarger RC filtreli bölücü; düşük frekanslarda yeterli.\n\nAtölye simülatöründeki Vref parametresi karşılaştırıcı modunda bu kavramı gösterir.',
      text_en: 'With a single supply (only +Vcc) you need to create a reference point for the signal to swing around: Vcc/2.\n\n**Method 1 — Voltage divider + buffer:**\nR1=R2 to generate Vcc/2, then a unity-gain buffer op-amp → stable reference under load.\n\n**Method 2 — Reference IC:**\nDedicated voltage reference like TL431 or REF02. More precise.\n\n**Method 3 — Supply divider:**\nLarger RC-filtered divider; adequate for low frequencies.\n\nThe simulator\'s Vref parameter in comparator mode demonstrates this concept.',
      chips_tr: ['Tek besleme nedir?', 'Buffer nedir?', 'Gerilim bölücü'],
      chips_en: ['What is single supply?', 'What is a buffer?', 'Voltage divider'],
    },
  },

  // ── Theory overview ────────────────────────────────────────────────────
  {
    id: 'theory_overview',
    keywords: ['teori bölümleri', 'theory chapters', 'hangi konular', 'which topics', 'konu listesi',
               'chapter list', 'müfredat', 'syllabus', 'içerik', 'content', 'neler var teori',
               'what is in theory', 'teori içeriği', 'theory content'],
    response: {
      text_tr: 'Teori bölümündeki 15 konu:\n1. İdeal Op-Amp (5 altın kural)\n2. Sanal Toprak\n3. Açık Çevrim Kazancı\n4. Negatif Geri Besleme\n5. Eviren Yükselteç\n6. Evirmeyen Yükselteç\n7. Buffer / Gerilim İzleyici\n8. Toplayıcı Yükselteç\n9. Fark Yükselteci\n10. İntegratör\n11. Diferansiyatör\n12. CMRR\n13. GBW\n14. Slew Rate\n15. Empedans & Gerçek Parametreler',
      text_en: 'Theory section has 15 chapters:\n1. Ideal Op-Amp (5 golden rules)\n2. Virtual Ground\n3. Open-Loop Gain\n4. Negative Feedback\n5. Inverting Amplifier\n6. Non-Inverting Amplifier\n7. Buffer / Voltage Follower\n8. Summing Amplifier\n9. Difference Amplifier\n10. Integrator\n11. Differentiator\n12. CMRR\n13. GBW\n14. Slew Rate\n15. Impedance & Real Parameters',
      link: { to: '/theory', label_tr: 'Teori bölümüne git →', label_en: 'Go to theory →' },
      chips_tr: ['Nereden başlasam?', 'İdeal op-amp nedir?', 'Sanal toprak nedir?'],
      chips_en: ['Where to start?', 'What is the ideal op-amp?', 'What is virtual ground?'],
    },
  },

  // ── Op-amp history ─────────────────────────────────────────────────────
  {
    id: 'opamp_history',
    keywords: ['tarih', 'history', 'op-amp tarihi', 'ilk op-amp', 'first op-amp', 'george philbrick',
               'μa741', 'ua741', 'fairchild', 'bob widlar', 'analog computer', 'analog bilgisayar',
               'köken', 'origin', 'ne zaman icat', 'when invented'],
    response: {
      text_tr: 'Op-amp tarihi:\n• **1941** — Karl Swartzel, vakumlu tüplerle ilk işlemsel yükselteç (Bell Labs).\n• **1950\'ler** — George Philbrick Researches: modüler analog hesap makinesi op-amp\'ları.\n• **1963** — Bob Widlar (Fairchild), ilk monolitik IC op-amp: μA702.\n• **1968** — μA741: Fairchild\'ın ikonu. İç frekans kompansasyonlu, sağlam. Hâlâ üretiliyor.\n• **1970–80\'ler** — JFET girişli (TL071), CMOS, düşük güç aileleri.\n• **Günümüz** — nano-amper bias akımı, GHz GBW, rail-to-rail, single-supply op-amp\'lar.',
      text_en: 'Op-amp history:\n• **1941** — Karl Swartzel, first operational amplifier with vacuum tubes (Bell Labs).\n• **1950s** — George Philbrick Researches: modular analog computing op-amp modules.\n• **1963** — Bob Widlar (Fairchild), first monolithic IC op-amp: μA702.\n• **1968** — μA741: Fairchild\'s icon. Internally compensated, robust. Still manufactured.\n• **1970–80s** — JFET-input (TL071), CMOS, low-power families.\n• **Today** — nanoamp bias current, GHz GBW, rail-to-rail, single-supply op-amps.',
      chips_tr: ['Op-amp nedir?', 'LM741 nedir?', 'Hangi op-amp seçeyim?'],
      chips_en: ['What is an op-amp?', 'What is LM741?', 'Which op-amp to use?'],
    },
  },

  // ── SMD / package types ────────────────────────────────────────────────
  {
    id: 'chip_package',
    keywords: ['smd', 'surface mount', 'dip', 'soic', 'sop', 'tssop', 'msop', 'sot-23',
               'kılıf türleri', 'package types', 'through hole', 'delik geçişli', 'lehim paketi',
               'smt', 'entegre paket', 'ic package', 'chip package'],
    response: {
      text_tr: 'Op-amp için yaygın IC paketleri:\n\n• **DIP-8** (Through-hole): prototip, breadboard için ideal. Bacak aralığı 2.54mm.\n• **SOIC-8** (SMD): DIP\'in yüzey montaj versiyonu. 1.27mm adım. Lehimlenebilir.\n• **TSSOP-8**: SOIC\'den daha küçük, yoğun PCB\'ler için.\n• **SOT-23-5**: Tek op-amp, çok küçük (mini devreler, akıllı cihazlar).\n• **MSOP-8**: Ultra kompakt, hassas ölçüm ekipmanları.\n\nProtoTip için DIP-8 önerilir (breakout board ile SMD de çalışır). Üretim için SOIC veya TSSOP.',
      text_en: 'Common IC packages for op-amps:\n\n• **DIP-8** (Through-hole): ideal for prototyping and breadboards. 2.54mm pin pitch.\n• **SOIC-8** (SMD): surface-mount version of DIP. 1.27mm pitch. Solderable.\n• **TSSOP-8**: smaller than SOIC, for dense PCBs.\n• **SOT-23-5**: single op-amp, very small (mini circuits, smart devices).\n• **MSOP-8**: ultra-compact, precision measurement equipment.\n\nFor prototyping: DIP-8 recommended (SMD also works with breakout board). Production: SOIC or TSSOP.',
      chips_tr: ['Pinout nedir?', 'Breadboard nasıl kullanılır?', 'Hangi op-amp seçeyim?'],
      chips_en: ['What is the pinout?', 'How to use breadboard?', 'Which op-amp to use?'],
    },
  },

  // ── Power bandwidth ─────────────────────────────────────────────────────
  {
    id: 'power_bandwidth',
    keywords: ['güç bant genişliği', 'power bandwidth', 'full power bandwidth', 'fpbw',
               'büyük sinyal', 'large signal', 'küçük sinyal', 'small signal bandwidth',
               'slew rate bant', 'yüksek genlik frekans'],
    response: {
      text_tr: 'Güç bant genişliği (FPBW): çıkışın tam genlikte (bozulmadan) salınabildiği maksimum frekans.\n\nFormül: FPBW = SR / (2π × Vout_pk)\n\nÖrnek: SR=0.5 V/μs (LM741), Vout=10Vpk:\nFPBW = 0.5×10⁶ / (2π × 10) ≈ 7.9 kHz\n\nYani LM741 10V genlikli sinyali yalnızca ~8 kHz\'e kadar bozulmadan yükseltir!\nSmall-signal bandwidth (GBW/Av) farklıdır — küçük sinyaller slew rate sınırına takılmaz.',
      text_en: 'Full Power Bandwidth (FPBW): the maximum frequency at which the output can swing at full amplitude without distortion.\n\nFormula: FPBW = SR / (2π × Vout_pk)\n\nExample: SR=0.5 V/μs (LM741), Vout=10Vpk:\nFPBW = 0.5×10⁶ / (2π × 10) ≈ 7.9 kHz\n\nSo the LM741 can only amplify 10V-amplitude signals up to ~8 kHz without distortion!\nSmall-signal bandwidth (GBW/Av) is different — small signals don\'t hit the slew-rate limit.',
      chips_tr: ['Slew rate nedir?', 'GBW nedir?', 'Hangi op-amp seçeyim?'],
      chips_en: ['What is slew rate?', 'What is GBW?', 'Which op-amp to use?'],
    },
  },

  // ── About the site ──────────────────────────────────────────────────────
  {
    id: 'site_about',
    keywords: ['site hakkında', 'about the site', 'proje hakkında', 'about this project',
               'kim yaptı', 'who made this', 'katkıda bulunan', 'contributors', 'açık kaynak',
               'open source', 'github', 'lisans', 'license', 'iletişim', 'contact', 'feedback gönder'],
    response: {
      text_tr: 'Op-Amp Atölyesi: tarayıcıda çalışan, ücretsiz ve açık kaynaklı bir analog elektronik öğrenme platformu.\n\n• **Teknoloji**: React + TypeScript + Vite\n• **Simülatör**: canvas tabanlı, ideal op-amp modeli\n• **Teori**: 15 interaktif bölüm\n• **Uygulamalar**: 3 canlı demo\n• **Katkı / geri bildirim**: Feedback sayfasından yazabilirsin.\n• **Destek**: Ko-fi üzerinden kahve ısmarlayabilirsin ☕\n\nProjenin gelişmesine katkıda bulunmak istersen GitHub\'daki repo\'ya bakabilirsin.',
      text_en: 'Op-Amp Workshop: a free, open-source browser-based analog electronics learning platform.\n\n• **Technology**: React + TypeScript + Vite\n• **Simulator**: canvas-based, ideal op-amp model\n• **Theory**: 15 interactive chapters\n• **Applications**: 3 live demos\n• **Contribution / feedback**: use the Feedback page.\n• **Support**: buy a coffee on Ko-fi ☕\n\nIf you\'d like to contribute to the project, check the GitHub repo.',
      link: { to: '/about', label_tr: 'Hakkında sayfası →', label_en: 'About page →' },
      chips_tr: ['Katkıda bulunmak istiyorum', 'Simülatöre git', 'Teori bölümleri'],
      chips_en: ['I want to contribute', 'Go to simulator', 'Theory chapters'],
    },
  },

  // ── Speed / oscilloscope controls ───────────────────────────────────────
  {
    id: 'scope_controls',
    keywords: ['hız', 'speed', 'statik', 'static', 'dinamik', 'dynamic', 'dondur', 'freeze',
               'osiloskop kontrol', 'scope control', 'yavaş', 'slow', 'hızlı', 'fast'],
    response: {
      text_tr: 'Simülatör osiloskopunda canvas\'ın altında kontroller var: ⏸ Statik (dondurur, faz=0\'dan gösterir) ve hız seçenekleri ¼× ½× 1× 2× 4×. Değerlerin üstüne tıklayarak da sayı girebilirsin.',
      text_en: 'Below the oscilloscope canvas there are controls: ⏸ Static (freezes at phase=0) and speed options ¼× ½× 1× 2× 4×. You can also click any value to type a number directly.',
      link: { to: '/simulator', label_tr: 'Simülatöre git →', label_en: 'Go to simulator →' },
      chips_tr: ['Slider değeri nasıl girilir?', 'PNG indir', 'Bağlantıyı paylaş'],
      chips_en: ['How to enter slider value?', 'Download PNG', 'Share link'],
    },
  },
];

// ─── Matching ────────────────────────────────────────────────────────────────

const FALLBACK: BotResponse = {
  text_tr: 'Bu konuyu tam anlayamadım. Aşağıdaki başlıklardan birini sorabilir ya da şunları deneyebilirsin:',
  text_en: 'I didn\'t quite catch that. Try one of the topics below or ask something like:',
  chips_tr: ['Op-amp nedir?', 'Nasıl çalışır?', 'Simülatörü nasıl kullanırım?', 'Hangi op-amp seçeyim?', 'Nereden başlasam?'],
  chips_en: ['What is an op-amp?', 'How does it work?', 'How to use the simulator?', 'Which op-amp to use?', 'Where to start?'],
};

/**
 * Match a user message to the best intent.
 * Scoring: each matched keyword adds points equal to its word count
 * (so "op-amp nedir" scores 2 vs. a one-word match scoring 1).
 */
export function matchIntent(text: string): BotResponse {
  const lower = text.toLowerCase();
  let best: Intent | null = null;
  let bestScore = 0;

  for (const intent of INTENTS) {
    let score = 0;
    for (const kw of intent.keywords) {
      if (lower.includes(kw)) {
        // Multi-word keyword phrases get higher weight than single words.
        score += kw.split(/\s+/).length;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      best = intent;
    }
  }

  return bestScore > 0 ? best!.response : FALLBACK;
}

export const INITIAL_CHIPS = {
  tr: ['Op-amp nedir?', 'Nasıl çalışır?', 'Simülatörü nasıl kullanırım?', 'Hangi op-amp seçeyim?', 'Nereden başlasam?'],
  en: ['What is an op-amp?', 'How does it work?', 'How to use the simulator?', 'Which op-amp to use?', 'Where to start?'],
};

export const WELCOME: BotResponse = {
  text_tr: 'Merhaba! Op-Amp Atölyesi asistanıyım. Op-amp temellerinden yaygın entegrelere, formüllerden uygulama örneklerine kadar pek çok soruya cevap verebilirim.',
  text_en: 'Hi! I\'m the Op-Amp Workshop assistant. I can help with op-amp basics, common chips, formulas, application examples and finding things on the site.',
};
