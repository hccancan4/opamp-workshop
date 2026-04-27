export type Lang = 'tr' | 'en';

export type I18nStrings = {
  // Nav
  nav_whatis: string; nav_journey: string; nav_circuits: string;
  nav_apps: string; nav_audience: string; nav_launch: string;
  // Hero
  hero_stamp: string;
  hero_h1_1: string; hero_h1_2: string; hero_h1_3: string;
  hero_h1_4: string; hero_h1_5: string;
  hero_lede: string;
  hero_cta_1: string; hero_cta_2: string;
  hm1_l: string; hm2_l: string; hm3_l: string;
  bp_title: string; bp_f1: string; bp_f2: string; bp_f3: string;
  // What is
  whatis_eye: string;
  whatis_h1: string; whatis_h2: string; whatis_h3: string;
  whatis_lede: string;
  pn_1: string; pd_1: string;
  pn_2: string; pd_2: string;
  pn_3: string; pd_3: string;
  pn_4: string; pd_4: string;
  pn_5: string; pd_5: string;
  pn_6: string; pd_6: string;
  card_stamp: string; card_h: string; card_p: string;
  // Journey
  journey_eye: string; journey_h1: string; journey_h2: string; journey_lede: string;
  js1_h: string; js1_p: string;
  js2_h: string; js2_p: string;
  js3_h: string; js3_p: string;
  // Circuits
  circ_eye: string;
  circ_h1: string; circ_h2: string; circ_h3: string;
  circ_lede: string;
  ct_inv: string; ct_non: string; ct_buf: string; ct_cmp: string; ct_csc: string;
  form_label: string;
  // Apps
  apps_eye: string; apps_h1: string; apps_h2: string; apps_h3: string; apps_lede: string;
  a_mode: string; a_role: string;
  ac_1: string; a1_h: string; a1_d: string; a1_role: string;
  ac_2: string; a2_h: string; a2_d: string; a2_role: string;
  ac_3: string; a3_h: string; a3_d: string; a3_role: string;
  // Audience
  aud_eye: string; aud_h1: string; aud_h2: string; aud_h3: string;
  ad1_h: string; ad1_p: string;
  ad2_h: string; ad2_p: string;
  ad3_h: string; ad3_p: string;
  ad4_h: string; ad4_p: string;
  // Features
  feat_eye: string; feat_h1: string; feat_h2: string;
  f1_h: string; f1_p: string;
  f2_h: string; f2_p: string;
  f3_h: string; f3_p: string;
  f4_h: string; f4_p: string;
  // CTA
  cta_eye: string; cta_h1: string; cta_h2: string; cta_h3: string;
  cta_p: string; cta_b1: string; cta_b2: string;
  // Footer
  footer_desc: string;
  footer_h1: string; footer_h2: string; footer_h3: string;
  footer_theory: string; footer_chat: string;
  footer_sim: string; footer_apps: string;
  footer_about: string; footer_credits: string; footer_feedback: string;
  footer_edu: string;
  // Simulator page
  sim_title: string; sim_lede: string;
  sim_circuit: string; sim_params: string; sim_scope: string;
  sim_freeze: string; sim_unfreeze: string; sim_download: string; sim_share: string;
  sim_gain: string; sim_vout_amp: string; sim_phase: string; sim_saturated: string;
  sim_waveform: string; sim_sine: string; sim_square: string; sim_triangle: string; sim_sawtooth: string;
  sim_rin: string; sim_rf: string; sim_vcc: string; sim_vin_amp: string; sim_freq: string; sim_vref: string;
  // Theory page
  theory_title: string; theory_lede: string;
  theory_progress: string; theory_read_time: string; theory_try_sim: string;
  theory_chapters: string; theory_read_chapter: string;
  // Applications page
  appspage_title: string; appspage_lede: string;
  app_preamp_title: string; app_preamp_lede: string;
  app_schmitt_title: string; app_schmitt_lede: string;
  app_filter_title: string; app_filter_lede: string;
};

const tr: I18nStrings = {
  nav_whatis: 'Nedir?', nav_journey: 'Yöntem', nav_circuits: 'Devreler',
  nav_apps: 'Uygulamalar', nav_audience: 'Kimler için?', nav_launch: 'Simülatöre gir',
  hero_stamp: 'Canlı devre · Tarayıcıda simülasyon',
  hero_h1_1: 'İşlemsel yükselteci', hero_h1_2: 'sezgiyle', hero_h1_3: 'öğrenmek,',
  hero_h1_4: 'çizimden ölçüme', hero_h1_5: 'bir adım.',
  hero_lede: 'Op-Amp Atölyesi; kitaplardaki formülleri tarayıcıda dokunabileceğin bir devreye dönüştürür. Direnç değerini çevir, dalga formunu değiştir — şemadaki akım oku ve osiloskoptaki çıkış anında cevap versin.',
  hero_cta_1: 'Simülatörü başlat', hero_cta_2: 'Konuyu tanıt',
  hm1_l: 'Devre mimarisi', hm2_l: 'Teori bölümü', hm3_l: 'Canlı uygulama',
  bp_title: 'Eviren Yükselteç — Canlı Ölçüm',
  bp_f1: 'Giriş', bp_f2: 'Çıkış', bp_f3: 'Besleme',
  whatis_eye: 'Tanım',
  whatis_h1: 'Op-amp,', whatis_h2: 'yalnız iki giriş ile', whatis_h3: 'analog dünyayı biçimlendiren devredir.',
  whatis_lede: 'Yüksek kazançlı bir diferansiyel yükselteç. Dışına eklenen birkaç dirençle aynı entegre; yükseltici, karşılaştırıcı, filtre, toplayıcı ya da türev alıcı olur. Onu anlamak, analog elektroniği anlamaktır.',
  pn_1: 'Açık çevrim kazancı', pd_1: 'Geri besleme yokken çıkış/giriş oranı.',
  pn_2: 'Giriş empedansı', pd_2: 'Girişten hiç akım akmaz kabul edilir.',
  pn_3: 'Çıkış empedansı', pd_3: 'Her yükü gerilim düşmesi olmadan sürebilir.',
  pn_4: 'Bant genişliği', pd_4: 'Her frekansta kazanç aynı kalır.',
  pn_5: 'CMRR', pd_5: 'Ortak mod gürültüsünü yok sayma.',
  pn_6: 'Slew rate', pd_6: 'Çıkışın anlık değişim hızı.',
  card_stamp: 'Sembol · IEC',
  card_h: 'Üçgen + iki giriş = sonsuz devre',
  card_p: 'Vout = A × (V+ − V−). İki giriş arasındaki farkı devasa bir kazançla yükseltir. Geri besleme yoluyla bu devasa kazanç "evcilleşir" ve tahmin edilebilir bir oran olur.',
  journey_eye: 'Yöntem',
  journey_h1: 'Oku, dene, uygula —', journey_h2: 'tek ekranda.',
  journey_lede: 'Teorik kavramı okuduğun pencerede devresini kurup çalıştırabilirsin; sonra aynı topolojiyi gerçek bir cihazın içinde görürsün.',
  js1_h: 'Kavramı oku', js1_p: 'Sanal topraklamadan CMRR\'a; özenli, örnekli, adım adım bölümler. Her parça bir cümleyle başlar: "Burada ne oluyor?"',
  js2_h: 'Devreyi kur', js2_p: 'Rin, Rf, Rload, Vcc/Vee, dalga türü — her parametre bir sürgüdür. Şematikte akım yönü, osiloskopta çıkış anında değişir.',
  js3_h: 'Gerçekte dene', js3_p: 'Formüller somut cihazlara dönüşür: ışık sensörlü lamba, ses mikseri, EKG monitörü. Her biri bir topolojiyi ete kemiğe büründürür.',
  circ_eye: 'Devre mimarileri',
  circ_h1: 'Beş topoloji.', circ_h2: 'Bir op-amp.', circ_h3: 'Sonsuz farklı davranış.',
  circ_lede: 'Aynı entegreyi farklı bağlama biçimleri — simülatördeki beş temel mod. Bir sekme seç; şemasını, formülünü, nerelerde kullanıldığını gör.',
  ct_inv: 'Eviren', ct_non: 'Evirmeyen', ct_buf: 'İzleyici', ct_cmp: 'Karşılaştırıcı', ct_csc: 'Kaskad',
  form_label: 'Kazanç formülü',
  apps_eye: 'Gerçek dünyada',
  apps_h1: 'Formülün', apps_h2: 'ete kemiğe bürünmüş', apps_h3: 'hali.',
  apps_lede: 'Her topoloji, günlük hayatta bir cihazın içinde yaşar. Üç örnek uygulama — hepsi simülatörün "Uygulamalar" sekmesinde canlı.',
  a_mode: 'Mod:', a_role: 'Rol:',
  ac_1: 'Karşılaştırıcı · Comparator',
  a1_h: 'Akıllı sokak lambası',
  a1_d: 'LDR\'den gelen voltaj trimpotla belirlenen eşiği aşınca op-amp ±Vcc\'ye satüre olur, röleyi tetikler, lamba yanar.',
  a1_role: 'Eşik tespiti',
  ac_2: 'Toplayıcı · Summing Amp',
  a2_h: 'Ses mikseri',
  a2_d: 'Vokal, gitar, davul — her biri kendi direnciyle eviren girişe akar. Sanal toprak noktası onları birleştirir.',
  a2_role: 'Sanal toprak',
  ac_3: 'Fark alıcı · Instrumentation',
  a3_h: 'EKG monitörü',
  a3_d: 'Sağ ve sol kol elektrotları fark yükseltecine bağlanır. 50 Hz şebeke gürültüsü CMRR ile süzülür.',
  a3_role: 'Gürültü reddi',
  aud_eye: 'Kimler için',
  aud_h1: 'Kitabı kapatıp', aud_h2: 'devreye dokunmak', aud_h3: 'isteyen herkese.',
  ad1_h: 'Üniversite öğrencileri', ad1_p: 'Analog devreler ve sinyal işleme derslerindeki formülleri canlı bir devreyle eşleştir.',
  ad2_h: 'Hobistler, maker\'lar', ad2_p: 'Lehim havyası açmadan fikrini dene. Hangi direnç ne yapar, hemen gör.',
  ad3_h: 'Öğretmenler', ad3_p: 'Sınıfta canlı gösteri: şema + dalga + formül tek ekranda.',
  ad4_h: 'Meraklı herkes', ad4_p: 'Lise seviyesinden başla, kademeli olarak derinleş. TR ve EN arası tek tıkla geçiş.',
  feat_eye: 'Platform',
  feat_h1: 'Derin öğrenme için', feat_h2: 'doğru araçlar.',
  f1_h: 'Canlı şematik', f1_p: 'Devre çiziminin üstündeki etiketler, akım yönleri ve giriş-çıkış değerleri her slider hareketinde güncellenir.',
  f2_h: 'Zaman alanlı osiloskop', f2_p: 'Giriş ve çıkış dalgalarını aynı ızgarada gör. Vcc/Vee ref. çizgilerinde satürasyonu izle.',
  f3_h: 'Tam parametrik kontrol', f3_p: 'Rin, Rf, Rload, besleme gerilimleri, dalga türü, genlik — her değer sürgüyle ayarlanır.',
  f4_h: 'Op-Amp asistanı', f4_p: 'Takıldığın yerde yardımcı bir bilgi kartı: kazanç, CMRR, doyum, filtreler.',
  cta_eye: 'Başla',
  cta_h1: 'Op-amp\'ı kitaptan değil,', cta_h2: 'dokunarak', cta_h3: 'öğren.',
  cta_p: 'Kurulum yok, kayıt yok. Tarayıcında aç, devreyi kur, sürgüleri çevir. Beş temel topoloji, dokuzdan fazla teori bölümü, üç canlı uygulama.',
  cta_b1: 'Simülatöre gir', cta_b2: 'Konuyu oku',
  footer_desc: 'İşlemsel yükselteçlerin görsel, etkileşimli ve iki dilli öğrenme atölyesi.',
  footer_h1: 'Keşfet', footer_h2: 'Araçlar', footer_h3: 'Hakkında',
  footer_theory: 'Teori Bölümleri', footer_chat: 'Simülatör',
  footer_sim: 'Simülatör', footer_apps: 'Uygulamalar',
  footer_about: 'Atölye hakkında', footer_credits: 'Katkıda bulunanlar', footer_feedback: 'Geri bildirim',
  footer_edu: 'Eğitim amaçlı',
  sim_title: 'Op-Amp Simülatörü', sim_lede: 'Parametreleri ayarla, çıkışı anlık gör.',
  sim_circuit: 'Devre', sim_params: 'Parametreler', sim_scope: 'Osiloskop',
  sim_freeze: 'Dondur', sim_unfreeze: 'Devam et', sim_download: 'PNG indir', sim_share: 'Bağlantıyı kopyala',
  sim_gain: 'Kazanç', sim_vout_amp: 'Vout genlik', sim_phase: 'Faz', sim_saturated: 'SATURASYON',
  sim_waveform: 'Dalga formu', sim_sine: 'Sinüs', sim_square: 'Kare', sim_triangle: 'Üçgen', sim_sawtooth: 'Testere',
  sim_rin: 'Rin', sim_rf: 'Rf', sim_vcc: 'Vcc / Vee', sim_vin_amp: 'Vin genlik', sim_freq: 'Frekans', sim_vref: 'Vref',
  theory_title: 'Teori Bölümleri', theory_lede: 'Op-amp fiziğini adım adım incele.',
  theory_progress: 'tamamlandı', theory_read_time: 'dk okuma', theory_try_sim: 'Simülatörde dene →',
  theory_chapters: 'Bölümler', theory_read_chapter: 'Bölümü oku',
  appspage_title: 'Gerçek Dünya Uygulamaları', appspage_lede: 'Formüllerin hayata geçtiği üç interaktif demo.',
  app_preamp_title: 'Ses Preamp\'i', app_preamp_lede: 'Mikrofon sinyali yükseltme zinciri.',
  app_schmitt_title: 'Schmitt Tetikleyici', app_schmitt_lede: 'Histerezisli karşılaştırıcı.',
  app_filter_title: 'Aktif Alçak Geçiren Filtre', app_filter_lede: 'Sallen-Key topolojisi, Bode diyagramı.',
};

const en: I18nStrings = {
  nav_whatis: 'What?', nav_journey: 'Method', nav_circuits: 'Circuits',
  nav_apps: 'Applications', nav_audience: 'For whom?', nav_launch: 'Open simulator',
  hero_stamp: 'Live circuit · In-browser simulation',
  hero_h1_1: 'Learn the op-amp', hero_h1_2: 'by intuition,', hero_h1_3: '',
  hero_h1_4: 'from drawing to measurement', hero_h1_5: '— one step.',
  hero_lede: 'Op-Amp Workshop turns textbook formulas into a circuit you can touch in the browser. Turn a resistor, switch the waveform — let the current arrow and scope trace answer instantly.',
  hero_cta_1: 'Launch simulator', hero_cta_2: 'Introduce the topic',
  hm1_l: 'Circuit topologies', hm2_l: 'Theory sections', hm3_l: 'Live applications',
  bp_title: 'Inverting Amplifier — Live Measurement',
  bp_f1: 'Input', bp_f2: 'Output', bp_f3: 'Supply',
  whatis_eye: 'Definition',
  whatis_h1: 'The op-amp,', whatis_h2: 'with just two inputs,', whatis_h3: 'shapes the analog world.',
  whatis_lede: 'A high-gain differential amplifier. A few external resistors turn the same chip into an amplifier, comparator, filter, summer or differentiator. Understanding it is understanding analog electronics.',
  pn_1: 'Open-loop gain', pd_1: 'Output-to-input ratio without feedback.',
  pn_2: 'Input impedance', pd_2: 'Assumes zero input current drawn.',
  pn_3: 'Output impedance', pd_3: 'Drives any load without voltage drop.',
  pn_4: 'Bandwidth', pd_4: 'Gain preserved at every frequency.',
  pn_5: 'CMRR', pd_5: 'Common-mode noise rejection ratio.',
  pn_6: 'Slew rate', pd_6: 'Instantaneous rate of output change.',
  card_stamp: 'Symbol · IEC',
  card_h: 'A triangle + two inputs = endless circuits',
  card_p: 'Vout = A × (V+ − V−). The device amplifies the difference with huge gain. Feedback tames that gain into a predictable ratio you can design with.',
  journey_eye: 'Method',
  journey_h1: 'Read, try, apply —', journey_h2: 'on one screen.',
  journey_lede: 'Read a concept and build its circuit in the same window; then see the same topology living inside a real device.',
  js1_h: 'Read the concept', js1_p: 'From virtual ground to CMRR — careful, example-led, step-by-step sections. Each piece opens with: "what is happening here?"',
  js2_h: 'Build the circuit', js2_p: 'Rin, Rf, Rload, Vcc/Vee, waveform — every parameter is a slider. Current directions and scope traces update as you move.',
  js3_h: 'Apply in the wild', js3_p: 'Formulas become concrete devices: light-triggered lamp, audio mixer, EKG monitor. Each application grounds one topology.',
  circ_eye: 'Circuit topologies',
  circ_h1: 'Five topologies.', circ_h2: 'One op-amp.', circ_h3: 'Endless different behaviors.',
  circ_lede: 'Different ways to wire the same chip — the five core modes of the simulator. Pick a tab to inspect its schematic, formula and uses.',
  ct_inv: 'Inverting', ct_non: 'Non-Inverting', ct_buf: 'Follower', ct_cmp: 'Comparator', ct_csc: 'Cascade',
  form_label: 'Gain formula',
  apps_eye: 'In the wild',
  apps_h1: 'A formula', apps_h2: 'brought to life', apps_h3: 'as a device.',
  apps_lede: 'Every topology lives inside a real device. Three example applications — all live in the Applications page.',
  a_mode: 'Mode:', a_role: 'Role:',
  ac_1: 'Comparator',
  a1_h: 'Smart street lamp',
  a1_d: 'When the LDR voltage crosses a trimpot threshold, the op-amp saturates to ±Vcc, trips the relay, and the lamp comes on.',
  a1_role: 'Threshold detect',
  ac_2: 'Summing Amp',
  a2_h: 'Audio mixer',
  a2_d: 'Vocals, guitar, drums — each channel flows into the inverting input through its own resistor. The virtual ground node sums them.',
  a2_role: 'Virtual ground',
  ac_3: 'Instrumentation',
  a3_h: 'EKG monitor',
  a3_d: 'Left and right arm electrodes feed a difference amp. The 50 Hz mains noise is common to both and gets rejected by CMRR.',
  a3_role: 'Noise rejection',
  aud_eye: 'For whom',
  aud_h1: 'For anyone who wants to', aud_h2: 'close the book and', aud_h3: 'touch the circuit.',
  ad1_h: 'University students', ad1_p: 'Pair the abstract formulas from analog-circuits and signal-processing classes with a live circuit.',
  ad2_h: 'Hobbyists, makers', ad2_p: 'Prototype before the soldering iron. See what every resistor value does, instantly.',
  ad3_h: 'Teachers', ad3_p: 'Classroom demo: schematic + waveform + formula on a single screen. Tweak parameters together.',
  ad4_h: 'The curious', ad4_p: 'Start at high-school level and go deeper gradually. Switch between TR and EN anytime.',
  feat_eye: 'Platform',
  feat_h1: 'The right tools for', feat_h2: 'deep learning.',
  f1_h: 'Live schematic', f1_p: 'Labels, current directions and input/output readings on the drawing update with every slider move.',
  f2_h: 'Time-domain scope', f2_p: 'Input and output waves on the same grid. Watch clipping against Vcc/Vee rails.',
  f3_h: 'Fully parametric', f3_p: 'Rin, Rf, Rload, supply, waveform, amplitude — every value on a slider. Changes compute instantly.',
  f4_h: 'Op-Amp assistant', f4_p: 'An info card for when you\'re stuck: gain, CMRR, saturation, filters. Answers the concept.',
  cta_eye: 'Get started',
  cta_h1: 'Learn the op-amp not from a book,', cta_h2: 'but by touch.', cta_h3: '',
  cta_p: 'No install, no signup. Open it in your browser, wire the circuit, move the sliders. Five topologies, nine-plus theory sections, three live applications.',
  cta_b1: 'Open simulator', cta_b2: 'Read the theory',
  footer_desc: 'A visual, interactive, bilingual workshop for operational amplifiers.',
  footer_h1: 'Explore', footer_h2: 'Tools', footer_h3: 'About',
  footer_theory: 'Theory Sections', footer_chat: 'Simulator',
  footer_sim: 'Simulator', footer_apps: 'Applications',
  footer_about: 'About the workshop', footer_credits: 'Contributors', footer_feedback: 'Feedback',
  footer_edu: 'For educational use',
  sim_title: 'Op-Amp Simulator', sim_lede: 'Adjust parameters, see output instantly.',
  sim_circuit: 'Circuit', sim_params: 'Parameters', sim_scope: 'Oscilloscope',
  sim_freeze: 'Freeze', sim_unfreeze: 'Resume', sim_download: 'Download PNG', sim_share: 'Copy link',
  sim_gain: 'Gain', sim_vout_amp: 'Vout amplitude', sim_phase: 'Phase', sim_saturated: 'SATURATED',
  sim_waveform: 'Waveform', sim_sine: 'Sine', sim_square: 'Square', sim_triangle: 'Triangle', sim_sawtooth: 'Sawtooth',
  sim_rin: 'Rin', sim_rf: 'Rf', sim_vcc: 'Vcc / Vee', sim_vin_amp: 'Vin amplitude', sim_freq: 'Frequency', sim_vref: 'Vref',
  theory_title: 'Theory Sections', theory_lede: 'Explore op-amp physics step by step.',
  theory_progress: 'complete', theory_read_time: 'min read', theory_try_sim: 'Try in simulator →',
  theory_chapters: 'Chapters', theory_read_chapter: 'Read chapter',
  appspage_title: 'Real-World Applications', appspage_lede: 'Three interactive demos where formulas come alive.',
  app_preamp_title: 'Audio Preamp', app_preamp_lede: 'Microphone signal amplification chain.',
  app_schmitt_title: 'Schmitt Trigger', app_schmitt_lede: 'Hysteresis comparator.',
  app_filter_title: 'Active Low-Pass Filter', app_filter_lede: 'Sallen-Key topology, Bode plot.',
};

export const strings: Record<Lang, I18nStrings> = { tr, en };
