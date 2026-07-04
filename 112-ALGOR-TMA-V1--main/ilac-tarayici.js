// ilac-tarayici.js — Kamera ile İlaç Tanıma Modülü v3.0
// Bağımsız modül — mevcut hiçbir işleyişe dokunmaz

const ILAC_VERITABANI = [
  // ── ACİL İLAÇLAR ──────────────────────────────────────────
  { ad:["aspirin","asetilsalisilik asit","coraspin","ascard","ecopirin"], baslik:"💊 Aspirin", grup:"Acil", sinif:"Antiplatelet", endikasyonlar:["AKS — ilk doz çiğnetilir","STEMI / NSTEMI","İskemik inme profilaksisi"], doz:"AKS: 300 mg çiğnetilerek", uyarilar:["Aktif ülserde kontrendike","Sağ MI + nitrat kombinasyonunda dikkat","Çocuklarda Reye sendromu"], renk:"#dc2626" },
  { ad:["adrenalin","epinefrin","epipen","anapen","fastjekt","adrenaline"], baslik:"💉 Adrenalin (Epinefrin)", grup:"Acil", sinif:"Sempatomimetik", endikasyonlar:["Anafilaksi (IM — ilk tercih)","Kardiyak arrest","Ağır bronkospazm"], doz:"Anafilaksi: 0.3–0.5 mg IM\nArrest: 1 mg IV/IO her 3–5 dk", uyarilar:["Anafilakside IM — IV değil","Beta-bloker kullananlar: glukagon ekle"], renk:"#b91c1c" },
  { ad:["atropin","atropine","atropinsulfat"], baslik:"💊 Atropin", grup:"Acil", sinif:"Antikolinerjik", endikasyonlar:["Semptomatik bradikardi","Organofosfor zehirlenmesi","AV blok"], doz:"Bradikardi: 0.5 mg IV, maks 3 mg\nZehirlenme: 1–3 mg IV tekrar", uyarilar:["0.5 mg altı paradoksal bradikardi","Kalp naklinde etkisiz olabilir"], renk:"#7c3aed" },
  { ad:["amiodaron","cordarone","amiodarone","aritmal"], baslik:"💊 Amiodaron", grup:"Acil", sinif:"Antiaritmik Sınıf III", endikasyonlar:["VF / Nabızsız VT","Stabil VT","AF hız kontrolü"], doz:"Arrest: 300 mg IV (%5 Dx içinde)\nStabil VT: 150–300 mg IV 10–20 dk", uyarilar:["SADECE %5 Dekstroz ile — SF ile çöker!","Hipotansiyon yapabilir"], renk:"#1d4ed8" },
  { ad:["midazolam","dormicum","versed"], baslik:"💊 Midazolam", grup:"Acil", sinif:"Benzodiazepin", endikasyonlar:["Nöbet / Status epilepticus","Sedasyon / RSI"], doz:"10 mg IM (>70 kg)\n5 mg IV yavaş\nÇocuk: 0.2 mg/kg", uyarilar:["Solunum depresyonu — BVM hazır","Antidot: Flumazenil"], renk:"#0891b2" },
  { ad:["diazepam","valium","desitin","diazepoxide"], baslik:"💊 Diazepam", grup:"Acil", sinif:"Benzodiazepin", endikasyonlar:["Aktif nöbet","Alkol yoksunluğu","Kas spazmı"], doz:"5–10 mg IV yavaş\nRektal: 0.5 mg/kg", uyarilar:["Plastik enjektörde bekletme","Solunum depresyonu izle"], renk:"#0891b2" },
  { ad:["morfin","morphine","morphin"], baslik:"💊 Morfin", grup:"Acil", sinif:"Opioid Analjezik", endikasyonlar:["AKS ağrısı","Ağır travma","Akciğer ödemi adjuvan"], doz:"2–4 mg IV yavaş\nÇocuk: 0.1–0.2 mg/kg", uyarilar:["Antidot: Naloksan","KOAH/solunum yetmezliğinde dikkat"], renk:"#7c3aed" },
  { ad:["fentanil","fentanyl","fentanest","durogesic"], baslik:"💊 Fentanil", grup:"Acil", sinif:"Opioid (Güçlü)", endikasyonlar:["RSI premedikasyon","Travma ağrısı"], doz:"1–2 mcg/kg IV", uyarilar:["Morfinden 100x güçlü","Antidot: Naloksan","Göğüs rijiditesi"], renk:"#7c3aed" },
  { ad:["naloksan","naloxone","narcan","naloxon"], baslik:"💊 Naloksan", grup:"Acil", sinif:"Opioid Antagonisti", endikasyonlar:["Opioid zehirlenmesi","Solunum depresyonu","Bilinç kaybı + miyozis"], doz:"0.4–2 mg IV/IM\nÇocuk: 0.01 mg/kg", uyarilar:["Kısa yarılanma — tekrar doz","Yoksunluk tetikler"], renk:"#059669" },
  { ad:["flumazenil","anexate","romazicon"], baslik:"💊 Flumazenil (Anexate)", grup:"Acil", sinif:"Benzodiazepin Antagonisti", endikasyonlar:["Benzodiazepin aşırı dozu","Sedasyon reversal"], doz:"0.2 mg IV, 1 dk arayla maks 1 mg", uyarilar:["Nöbet öyküsünde KONTRENDİKE","Kısa etki — sedasyon geri dönebilir"], renk:"#059669" },
  { ad:["magnezyum","magnezyumsulfat","mgso4","magnesium","magnezya"], baslik:"💊 Magnezyum Sülfat", grup:"Acil", sinif:"Elektrolit / Antikonvülzan", endikasyonlar:["Preeklampsi / Eklampsi","Torsades de Pointes","Ağır astım"], doz:"Eklampsi: 4–6 g IV 15–20 dk\nAstım: 2 g IV 20 dk", uyarilar:["Puşe yapma!","Diz refleksini izle","Antidot: Kalsiyum Glukonat"], renk:"#0891b2" },
  { ad:["salbutamol","ventolin","albuterol","salamol","sultanol"], baslik:"💊 Salbutamol (Ventolin)", grup:"Acil", sinif:"Beta-2 Agonist", endikasyonlar:["Astım","KOAH alevlenmesi","Bronkospazm"], doz:"Nebül: 2.5–5 mg\nÇocuk <20 kg: 2.5 mg", uyarilar:["Taşikardi","Tek başına ağır atakta yetersiz — steroid ekle"], renk:"#059669" },
  { ad:["metilprednizolon","prednol","solumedrol","methylprednisolone"], baslik:"💊 Metilprednizolon (Prednol)", grup:"Acil", sinif:"Kortikosteroid", endikasyonlar:["Astım / KOAH","Anafilaksi","Alerjik reaksiyon"], doz:"1–2 mg/kg IV (maks 125 mg)", uyarilar:["Hiperglisemi","Adrenal baskılanma (uzun)"], renk:"#d97706" },
  { ad:["noradrenalin","norepinefrin","norepinephrine","levophed"], baslik:"💊 Noradrenalin", grup:"Acil", sinif:"Vazopresör", endikasyonlar:["Septik şok","Kardiyojenik şok","Post-ROSC hipotansiyon"], doz:"0.01–3 mcg/kg/dk IV", uyarilar:["Büyük ven gerekli","Dışarı çıkarsa nekroz"], renk:"#dc2626" },
  { ad:["dopamin","dopamine","intropin"], baslik:"💊 Dopamin", grup:"Acil", sinif:"İnotrop-Vazopresör", endikasyonlar:["Kardiyojenik şok","Bradikardi (atropin yanıtsız)"], doz:"2–20 mcg/kg/dk IV (doza göre etki değişir)", uyarilar:["Doz bağımlı etki","Taşikardi ve aritmiler"], renk:"#1d4ed8" },
  { ad:["dobutamin","dobutamine","dobutrex"], baslik:"💊 Dobutamin", grup:"Acil", sinif:"İnotrop", endikasyonlar:["Kardiyojenik şok (KB >80)","Kalp yetmezliği"], doz:"2–20 mcg/kg/dk IV", uyarilar:["Hipotansiyon varsa noradrenalin ekle"], renk:"#1d4ed8" },
  { ad:["adenozin","adenosine","adenocor"], baslik:"💊 Adenozin", grup:"Acil", sinif:"Antiaritmik", endikasyonlar:["SVT","Dar QRS taşikardi"], doz:"6 mg IV hızlı → 12 mg → 12 mg\n(Her doz sonrası 20 ml SF flush)", uyarilar:["5–10 sn yarılanma — çok hızlı ver","Astımda kontrendike"], renk:"#7c3aed" },
  { ad:["dekstroz","dextrose","glikoz","glucose"], baslik:"💊 Dekstroz (%50/%20)", grup:"Acil", sinif:"Hipoglisemi Antidotu", endikasyonlar:["Hipoglisemi (bilinç kapalı)","Kan şekeri <60 + semptom"], doz:"%50: 50 ml IV yavaş\n%20: 100 ml IV", uyarilar:["Damar dışı → doku hasarı","15 dk sonra KŞ tekrar ölç"], renk:"#d97706" },
  { ad:["kalsiyumglukonat","calcium gluconate","kalsiyum klorür"], baslik:"💊 Kalsiyum Glukonat", grup:"Acil", sinif:"Elektrolit", endikasyonlar:["Hiperkalemi (EKG değişikliği)","MgSO4 toksisitesi antidotu","Ca kanal blokörü zehirlenmesi"], doz:"%10: 10–20 ml IV yavaş (3 dk)", uyarilar:["Çok yavaş ver — arrest riski","Damar dışı → nekroz"], renk:"#d97706" },
  { ad:["izotonik","serum fizyolojik","sf","nacl","ringer","normal salin","ringer laktat"], baslik:"💊 İzotonik SF / Ringer Laktat", grup:"Acil", sinif:"Kristaloid Sıvı", endikasyonlar:["Hipovolemik şok","Damar yolu açıklığı","İlaç sulandırma"], doz:"Şok: 1 L hızlı (erişkin)\n20 ml/kg (çocuk)", uyarilar:["Kardiyojenik şokta kısıtlı","Aşırı → asidoz ve koagülopati"], renk:"#0891b2" },
  { ad:["ketamin","ketamine","ketalar"], baslik:"💊 Ketamin", grup:"Acil", sinif:"Disosiyatif Anestezik", endikasyonlar:["Hızlı seri entübasyon (RSI)","Prosedürel sedasyon","Bronkospazm + sedasyon gereken"], doz:"RSI: 1–2 mg/kg IV\nSedasyon: 0.5–1 mg/kg", uyarilar:["Laringospazm yapabilir","Kan basıncı yükseltir","Halüsinasyon (benzodiazepin ekle)"], renk:"#0891b2" },
  { ad:["lidokain","lignocaine","xylocaine","lidocaine"], baslik:"💊 Lidokain", grup:"Acil", sinif:"Antiaritmik / Lokal Anestezik", endikasyonlar:["VT (amiodaron alternatifi)","Lokal anestezi","RSI premedikasyonu (KİBAS)"], doz:"VT: 1–1.5 mg/kg IV bolus\nİnfüzyon: 1–4 mg/dk", uyarilar:["Toksisitede nöbet ve aritmi","Amiodaron ile birlikte verme"], renk:"#1d4ed8" },
  { ad:["metoklopramid","primperan","maxolon","metpamid"], baslik:"💊 Metoklopramid (Primperan)", grup:"Acil", sinif:"Prokinetik / Antiemetik", endikasyonlar:["Bulantı ve kusma","Gastroparezi","Migren bulantısı"], doz:"10 mg IV/IM/PO (günde 3 kez)", uyarilar:["Distoni — antidot: Biperiden","Tardif diskinezi (uzun kullanım)"], renk:"#d97706" },
  { ad:["ondansetron","zofran","emeset","ondem"], baslik:"💊 Ondansetron (Zofran)", grup:"Acil", sinif:"5-HT3 Antagonisti / Antiemetik", endikasyonlar:["Bulantı-kusma (kemoterapi, cerrahi, genel)","Acil serviste bulantı"], doz:"4–8 mg IV/IM yavaş\nÇocuk: 0.1–0.15 mg/kg", uyarilar:["QT uzaması riski","Serotonin sendromu (SSRI ile)"], renk:"#d97706" },
  { ad:["traneksamik asit","tranexamic acid","cyklokapron","transamin"], baslik:"💊 Traneksamik Asit (Transamin)", grup:"Acil", sinif:"Antifibrinolitik / Hemostatik", endikasyonlar:["Travma kanaması (ilk 3 saat)","Postpartum hemoraji","Cerrahi kanama kontrolü"], doz:"1 g IV 10 dk içinde → 1 g 8 saatte infüzyon", uyarilar:["Tromboz riski","3 saatten sonra etkinlik azalır","Hematüride dikkat"], renk:"#dc2626" },
  { ad:["hidrokortizon","hydrocortisone","cortef","solu-cortef"], baslik:"💊 Hidrokortizon", grup:"Acil", sinif:"Kortikosteroid", endikasyonlar:["Adrenal kriz (Addison krizi)","Septik şok (refrakter)","Ağır alerjik reaksiyon"], doz:"Adrenal kriz: 100 mg IV bolus\nSeptik şok: 200 mg/gün infüzyon", uyarilar:["Hiperglisemi","Enfeksiyonları maskeleyebilir"], renk:"#d97706" },
  { ad:["nitroglycerine","nitrogliserin","nitrolingual","isordil","monokat","monoket"], baslik:"💊 Nitrat (Nitrolingual / İsordil / Monoket)", grup:"Acil", sinif:"Vazodilatör", endikasyonlar:["AKS ağrısı (sistolik >90)","Akut kalp yetmezliği","Hipertansif acil"], doz:"SL: 0.4 mg sprey veya 5 mg tablet\n5 dk arayla maks 3 doz", uyarilar:["⚠️ Sağ ventriküler MI'da KONTRENDİKE","PDE5 inhibitörü (Viagra) son 48 saatte → KONTRENDİKE"], renk:"#dc2626" },
  { ad:["furosemid","lasix","furosemide"], baslik:"💊 Furosemid (Lasix)", grup:"Acil", sinif:"Loop Diüretik", endikasyonlar:["Akciğer ödemi","Hipertansif acil","Hiperkalsemi"], doz:"20–80 mg IV yavaş", uyarilar:["Hipokalemi","Dehidrasyon ve hipotansiyon"], renk:"#059669" },
  { ad:["deksametazon","dexamethasone","dekort","oradexon"], baslik:"💊 Deksametazon", grup:"Acil", sinif:"Kortikosteroid", endikasyonlar:["Krup — tek doz","Beyin ödemi","Ağır alerjik reaksiyon"], doz:"Krup: 0.6 mg/kg PO/IV\nBeyin ödemi: 8–10 mg IV", uyarilar:["Hiperglisemi","Krup etkisi 30–60 dk sonra"], renk:"#d97706" },
  { ad:["glukagon","glucagon","glucagen"], baslik:"💊 Glukagon", grup:"Acil", sinif:"Antihipoglisemik", endikasyonlar:["Hipoglisemi (damar yolu yoksa)","Beta-bloker zehirlenmesi"], doz:"1 mg IM/SC\n3–10 mg IV (zehirlenme)", uyarilar:["Bulantı-kusma sık","Feokromositomada kontre"], renk:"#d97706" },
  { ad:["metoprolol","beloc","lopressor","betaloc"], baslik:"💊 Metoprolol (Beloc)", grup:"Acil", sinif:"Beta-1 Blokör", endikasyonlar:["Hızlı AF hız kontrolü","SVT","AKS"], doz:"5 mg IV yavaş (2–5 dk)", uyarilar:["Hipotansiyon / bradikardi","Astım/KOAH kontrendike"], renk:"#1d4ed8" },

  // ── AĞRI KESİCİ / ATEŞ DÜŞÜRÜCÜ ──────────────────────────
  { ad:["parol","parasetamol","minoset","calpol","dolorex","tylol","panadol","acetaminophen"], baslik:"💊 Parasetamol (Parol / Minoset / Calpol)", grup:"Ağrı-Ateş", sinif:"Analjezik / Antipiretik", endikasyonlar:["Hafif-orta ağrı","Ateş","NSAİİ kullanamayanlarda tercih"], doz:"500–1000 mg 4–6 saatte bir\nGünlük maks: 4 g", uyarilar:["Karaciğer yetmezliğinde kontrendike","Aşırı doz → KC hasarı — antidot: NAC","Alkol + parasetamol hepatotoksisite"], renk:"#d97706" },
  { ad:["arveles","voltaren","dikloron","cataflam","diklofenak","diclofenac","voltarol"], baslik:"💊 Diklofenak (Voltaren / Arveles / Cataflam)", grup:"Ağrı-Ateş", sinif:"NSAİİ / Analjezik", endikasyonlar:["Kas-iskelet ağrısı","Gut atağı","Dismenore","Osteoartrit"], doz:"50 mg 2-3x/gün PO (yemekle)\n75 mg IM", uyarilar:["Mide ülseri riski — PPI ekle","Böbrek fonksiyonunu bozabilir","Warfarin ile kanama artar"], renk:"#d97706" },
  { ad:["majezik","flurbiprofen","majezik-s"], baslik:"💊 Majezik (Flurbiprofen)", grup:"Ağrı-Ateş", sinif:"NSAİİ / Analjezik", endikasyonlar:["Ağrı ve ateş","Boğaz ağrısı (pastil form)","Diş ağrısı"], doz:"50–100 mg 2-3x/gün PO", uyarilar:["Mide mukozasını tahriş eder","Gebelikte kontrendike"], renk:"#d97706" },
  { ad:["apranax","naproksen","naprosyn","naxen","naproxen"], baslik:"💊 Naproksen (Apranax / Naprosyn)", grup:"Ağrı-Ateş", sinif:"NSAİİ / Analjezik", endikasyonlar:["Kas-iskelet ağrısı","Gut","Dismenore","Artrit"], doz:"250–500 mg 2x/gün PO (yemekle)", uyarilar:["Mide koruması gerekebilir","Böbrek fonksiyonu izle","Kardiyovasküler risk"], renk:"#d97706" },
  { ad:["aferin","vermidon","aspirin kofein","analjin","gripin"], baslik:"💊 Aferin / Vermidon (Kombine Analjezik)", grup:"Ağrı-Ateş", sinif:"Kombine Analjezik", endikasyonlar:["Baş ağrısı","Soğuk algınlığı semptomları","Ateş"], doz:"1–2 tablet 4–6 saatte bir PO", uyarilar:["Kafein içerir","Aspirin içerenlerde mide ülseri riski"], renk:"#d97706" },

  // ── ANTİBİYOTİKLER ────────────────────────────────────────
  { ad:["augmentin","amoklavin","klamoks","amoksiklav","co-amoxiclav","clavulanate","amoksisilin klavulanat"], baslik:"💊 Amoksisilin-Klavulanat (Augmentin / Amoklavin)", grup:"Antibiyotik", sinif:"Penisilin + Beta-Laktamaz İnhibitörü", endikasyonlar:["Sinüzit, otit, bademcik iltihabı","Pnömoni","İdrar yolu enfeksiyonu","Cilt enfeksiyonları","Isırık yaraları"], doz:"625–1000 mg 2x/gün PO (yemekle)\nIV: 1.2 g 8 saatte bir", uyarilar:["Penisilin alerjisi → anafilaksi riski!","İshal sık yan etki","Karaciğer toksisitesi"], renk:"#059669" },
  { ad:["cefaks","sefaleksin","cephalexin","keflex","ceporex"], baslik:"💊 Sefaleksin (Cefaks / Keflex)", grup:"Antibiyotik", sinif:"1. Kuşak Sefalosporin", endikasyonlar:["Cilt ve yumuşak doku enfeksiyonları","Basit idrar yolu enfeksiyonu","Boğaz-kulak enfeksiyonu"], doz:"250–500 mg 4x/gün PO", uyarilar:["Penisilin alerjisinde çapraz reaksiyon (düşük)","Böbrek yetmezliğinde doz azalt"], renk:"#059669" },
  { ad:["rocephin","seftriakson","ceftriaxone","cefamisin"], baslik:"💊 Seftriakson (Rocephin / Cefamisin)", grup:"Antibiyotik", sinif:"3. Kuşak Sefalosporin (IV/IM)", endikasyonlar:["Pnömoni","Menenjit","Sepsis","İdrar yolu enfeksiyonu (komplike)","Gonore"], doz:"1–2 g/gün IV/IM (tek doz)", uyarilar:["Kalsiyum içeren solüsyonlarla KOMBİNE ETME!","Safra taşı (uzun kullanım)"], renk:"#059669" },
  { ad:["cefamezin","cefazolin","kefzol","sefazolin"], baslik:"💊 Sefazolin (Cefamezin / Kefzol)", grup:"Antibiyotik", sinif:"1. Kuşak Sefalosporin (IV/IM)", endikasyonlar:["Cerrahi profilaksi","Cilt enfeksiyonları","Kemik enfeksiyonları"], doz:"1–2 g IV/IM 8 saatte bir\nProfilaksi: 1–2 g tek doz", uyarilar:["Penisilin alerjisinde çapraz reaksiyon","Böbrek yetmezliğinde doz ayarı"], renk:"#059669" },
  { ad:["cipro","ciproxin","siprofloksasin","ciprofloxacin","ciprobay"], baslik:"💊 Siprofloksasin (Cipro / Ciproxin)", grup:"Antibiyotik", sinif:"Florokinolon", endikasyonlar:["İdrar yolu enfeksiyonları","Gastroenterit","Pnömoni","Kemik-eklem enfeksiyonları"], doz:"250–750 mg 2x/gün PO\n400 mg IV 12 saatte bir", uyarilar:["Tendon rüptürü riski","QT uzaması","18 yaş altı rutin değil"], renk:"#059669" },
  { ad:["klacid","klaritromisin","clarithromycin","klaritro"], baslik:"💊 Klaritromisin (Klacid)", grup:"Antibiyotik", sinif:"Makrolid", endikasyonlar:["Üst solunum yolu enfeksiyonları","Atipik pnömoni","H. pylori eradikasyonu"], doz:"250–500 mg 2x/gün PO 7–14 gün", uyarilar:["QT uzaması","Çok fazla ilaç etkileşimi (CYP3A4)","Gebelikte dikkat"], renk:"#059669" },
  { ad:["zinnat","sefuroksim","cefuroxime","zinacef"], baslik:"💊 Sefuroksim (Zinnat / Zinacef)", grup:"Antibiyotik", sinif:"2. Kuşak Sefalosporin", endikasyonlar:["Üst/alt solunum yolu enfeksiyonları","Sinüzit, otit","İdrar yolu enfeksiyonu","Lyme hastalığı"], doz:"250–500 mg 2x/gün PO (yemekle)\n750 mg–1.5 g IV 8 saatte bir", uyarilar:["Penisilin alerjisinde dikkat","Böbrek yetmezliğinde doz ayarı"], renk:"#059669" },
  { ad:["monodox","doksisiklin","doxycycline","doxylin","vibramycin"], baslik:"💊 Doksisiklin (Monodox / Vibramycin)", grup:"Antibiyotik", sinif:"Tetrasiklin", endikasyonlar:["Atipik pnömoni","Lyme hastalığı","Sıtma profilaksisi","Akne"], doz:"100 mg 2x/gün PO (bol su ile dik oturarak)", uyarilar:["Özofajit riski — yatmayın","8 yaş altı kontrendike","Güneşe hassasiyet"], renk:"#059669" },
  { ad:["flagyl","metronidazol","metronidazole","metrogyl"], baslik:"💊 Metronidazol (Flagyl)", grup:"Antibiyotik", sinif:"Nitroimidazol / Anaerobik Antibiyotik", endikasyonlar:["Anaerobik enfeksiyonlar","C. difficile","Trikomoniyazis","H. pylori eradikasyonu","Dental enfeksiyonlar"], doz:"400–500 mg 3x/gün PO\n500 mg IV 8 saatte bir", uyarilar:["Alkol ile KESİNLİKLE KULLANMA — disülfiram reaksiyon","Metalik tat sık yan etki"], renk:"#059669" },
  { ad:["unasyn","sulcid","ampisilin sulbaktam"], baslik:"💊 Ampisilin-Sulbaktam (Unasyn / Sulcid)", grup:"Antibiyotik", sinif:"Penisilin + Beta-Laktamaz İnhibitörü (IV)", endikasyonlar:["Karın içi enfeksiyonlar","Pelvik enfeksiyonlar","Nozokomiyal pnömoni"], doz:"1.5–3 g IV/IM 6–8 saatte bir", uyarilar:["Penisilin alerjisinde kontrendike","Böbrek yetmezliğinde doz ayarı"], renk:"#059669" },
  { ad:["tazocin","pip-tazo","piperasilin tazobaktam","piperacillin tazobactam"], baslik:"💊 Piperasilin-Tazobaktam (Tazocin)", grup:"Antibiyotik", sinif:"Geniş Spektrumlu Penisilin (IV)", endikasyonlar:["Ciddi hastane kaynaklı enfeksiyonlar","Sepsis","Febril nötropeni"], doz:"4.5 g IV 6–8 saatte bir", uyarilar:["Penisilin alerjisinde kontrendike","Hipokalemi yapabilir"], renk:"#059669" },
  { ad:["meronem","meropenem","merrem"], baslik:"💊 Meropenem (Meronem)", grup:"Antibiyotik", sinif:"Karbapenem (IV)", endikasyonlar:["Çoklu dirençli bakteri","Sepsis","Menenjit","Ciddi nozokomiyal enfeksiyonlar"], doz:"500 mg–2 g IV 8 saatte bir", uyarilar:["Son çare antibiyotik","Nöbet eşiğini düşürür","Böbrek yetmezliğinde doz ayarı"], renk:"#dc2626" },
  { ad:["vankomisin","vancomycin","vancoled"], baslik:"💊 Vankomisin", grup:"Antibiyotik", sinif:"Glikopeptid (IV)", endikasyonlar:["MRSA enfeksiyonları","C. difficile (oral)","Penisiline dirençli menenjit","Endokardit"], doz:"1 g IV 12 saatte bir (60 dk infüzyon)", uyarilar:["Red man sendromu — çok yavaş infüzyon","Nefrotoksisite","Trough düzeyi takibi şart"], renk:"#dc2626" },

  // ── KALP / TANSİYON / KOLESTEROL ──────────────────────────
  { ad:["concor","bisoprolol","bisoblock","bisocor","emconcor"], baslik:"💊 Bisoprolol (Concor / BisoBlock)", grup:"Kalp-Tansiyon", sinif:"Beta-1 Blokör", endikasyonlar:["Hipertansiyon","Kronik kalp yetmezliği","Anjina","AF hız kontrolü"], doz:"2.5–10 mg/gün PO", uyarilar:["Ani kesme tehlikeli","Astım/KOAH'ta dikkat","Bradikardi izle"], renk:"#1d4ed8" },
  { ad:["norvasc","amlodipin","amlodipine","amlopin","tenox"], baslik:"💊 Amlodipin (Norvasc / Amlopin)", grup:"Kalp-Tansiyon", sinif:"Kalsiyum Kanal Blokörü", endikasyonlar:["Hipertansiyon","Kararlı anjina","Vasospastik anjina"], doz:"5–10 mg/gün PO (sabah)", uyarilar:["Ayak bileği ödemi (ilacın etkisi)","Kalp bloğunda dikkat"], renk:"#0284c7" },
  { ad:["coversyl","perindopril","perineva","prestarium"], baslik:"💊 Perindopril (Coversyl / Perineva)", grup:"Kalp-Tansiyon", sinif:"ACE İnhibitörü", endikasyonlar:["Hipertansiyon","Kalp yetmezliği","Koroner arter hastalığı"], doz:"4–8 mg/gün PO (sabah)", uyarilar:["Kuru öksürük (sık)","Anjiyoödem — dil/boğaz şişmesi → ACİL","Gebelikte kontrendike"], renk:"#0284c7" },
  { ad:["micardis","telmisartan","pritor","kinzal"], baslik:"💊 Telmisartan (Micardis / Pritor)", grup:"Kalp-Tansiyon", sinif:"ARB", endikasyonlar:["Hipertansiyon","Kardiyovasküler risk azaltma","Diyabetik nefropati"], doz:"40–80 mg/gün PO", uyarilar:["Gebelikte kontrendike","Karaciğer yetmezliğinde kontre"], renk:"#0284c7" },
  { ad:["atacand","kandesartan","candesartan"], baslik:"💊 Kandesartan (Atacand)", grup:"Kalp-Tansiyon", sinif:"ARB", endikasyonlar:["Hipertansiyon","Kalp yetmezliği"], doz:"4–32 mg/gün PO", uyarilar:["Gebelikte kontrendike","Hiperkalemi riski"], renk:"#0284c7" },
  { ad:["co-diovan","diovan","valsartan","valsar"], baslik:"💊 Valsartan (Diovan / Co-Diovan)", grup:"Kalp-Tansiyon", sinif:"ARB", endikasyonlar:["Hipertansiyon","Kalp yetmezliği","Post-MI"], doz:"80–320 mg/gün PO", uyarilar:["ACE ile birlikte kullanma","Gebelikte kontrendike"], renk:"#0284c7" },
  { ad:["ramipril","tritace","delix","ramace"], baslik:"💊 Ramipril (Tritace / Delix)", grup:"Kalp-Tansiyon", sinif:"ACE İnhibitörü", endikasyonlar:["Hipertansiyon","Kalp yetmezliği","Post-MI","Diyabetik nefropati"], doz:"2.5–10 mg/gün PO", uyarilar:["Kuru öksürük (çok sık)","Anjiyoödem → ACİL","GEBELİKTE KESİNLİKLE KONTRENDİKE"], renk:"#0284c7" },
  { ad:["coraspin","klopidogrel","plavix","clopidogrel","clopilet","iscover"], baslik:"💊 Klopidogrel (Plavix / Coraspin)", grup:"Kalp-Tansiyon", sinif:"Antiplatelet", endikasyonlar:["AKS — dual antiplatelet","Stent sonrası","İskemik inme / TİA"], doz:"75 mg/gün PO\nYükleme: 300–600 mg", uyarilar:["Kanama riski artar","Stent sonrası kesmek tromboza yol açar!","Omeprazol etkisini azaltır"], renk:"#dc2626" },
  { ad:["brilinta","tikagrelor","ticagrelor"], baslik:"💊 Tikagrelor (Brilinta)", grup:"Kalp-Tansiyon", sinif:"Antiplatelet (P2Y12)", endikasyonlar:["AKS — klopidogrel yerine daha güçlü seçenek","STEMI / NSTEMI","Stent sonrası"], doz:"180 mg yükleme → 90 mg 2x/gün", uyarilar:["Kanama riski","Nefes darlığı (ilaç yan etkisi)","Klopidogrelden daha güçlü — doz atlama tehlikeli"], renk:"#dc2626" },
  { ad:["isordil","monoket","monokat","izosorbid","isosorbide"], baslik:"💊 İsordil / Monoket (Nitrat)", grup:"Kalp-Tansiyon", sinif:"Uzun Etkili Nitrat", endikasyonlar:["Anjina profilaksisi","Kronik kalp yetmezliği","Hipertansif acil"], doz:"20–40 mg 2x/gün PO (idame)", uyarilar:["⚠️ Sağ ventriküler MI'da KONTRENDİKE","PDE5 inhibitörü ile kombine etme","Baş ağrısı sık (tolerans gelişir)"], renk:"#dc2626" },
  { ad:["lasix","furosemide","furosemid"], baslik:"💊 Furosemid (Lasix)", grup:"Kalp-Tansiyon", sinif:"Loop Diüretik", endikasyonlar:["Akciğer ödemi","Kalp yetmezliği ödemi","Hipertansif acil","Hiperkalsemi"], doz:"20–80 mg IV/PO", uyarilar:["Hipokalemi","Dehidrasyon","Hipovolemi düzeltilmeden kullanma"], renk:"#059669" },
  { ad:["warfarin","coumadin","orfarin","wafarin"], baslik:"💊 Warfarin (Coumadin / Orfarin)", grup:"Kalp-Tansiyon", sinif:"Oral Antikoagülan", endikasyonlar:["Atriyal fibrilasyon","DVT / PE","Mekanik kalp kapağı"], doz:"Kişiye özel — INR hedefine göre", uyarilar:["🚨 Kanama riski — antidot: K vitamini veya PCC","112: Kafa travması + warfarin = beyin kanaması riski!","Çok fazla ilaç etkileşimi"], renk:"#dc2626" },
  { ad:["clexane","enoksaparin","lovenox","enoxaparin"], baslik:"💊 Enoksaparin (Clexane)", grup:"Kalp-Tansiyon", sinif:"Düşük Moleküler Ağırlıklı Heparin (DMAH)", endikasyonlar:["DVT tedavi ve profilaksi","AKS — antikoagülasyon","PE tedavisi","Cerrahi tromboprofilaksi"], doz:"1 mg/kg SC 12 saatte bir (tedavi)\n40 mg SC/gün (profilaksi)", uyarilar:["Kanama riski","Böbrek yetmezliğinde doz azalt","Trombositopeni (HIT) riski"], renk:"#dc2626" },
  { ad:["oksapar","nadroparin","fraxiparine","nadroparine"], baslik:"💊 Nadroparin (Oksapar / Fraxiparine)", grup:"Kalp-Tansiyon", sinif:"DMAH", endikasyonlar:["DVT profilaksi ve tedavisi","AKS"], doz:"Profilaksi: 2850 IU SC/gün\nTedavi: 86 IU/kg SC 12 saatte bir", uyarilar:["Kanama riski","Böbrek yetmezliğinde dikkat"], renk:"#dc2626" },
  { ad:["xarelto","rivaroksaban","rivaroxaban"], baslik:"💊 Rivaroksaban (Xarelto)", grup:"Kalp-Tansiyon", sinif:"DOAK (Faktör Xa İnhibitörü)", endikasyonlar:["Atriyal fibrilasyon","DVT / PE tedavi ve profilaksi"], doz:"15–20 mg/gün PO (yemekle)", uyarilar:["Kanama riski — antidot: Andeksanet alfa","INR takibi gerekmez","Böbrek yetmezliğinde doz ayarı"], renk:"#dc2626" },
  { ad:["eliquis","apiksaban","apixaban"], baslik:"💊 Apiksaban (Eliquis)", grup:"Kalp-Tansiyon", sinif:"DOAK (Faktör Xa İnhibitörü)", endikasyonlar:["Atriyal fibrilasyon","DVT / PE tedavi ve profilaksi"], doz:"2.5–5 mg 2x/gün PO", uyarilar:["Kanama riski","Antidot: Andeksanet alfa","Böbrek yetmezliğinde dikkat"], renk:"#dc2626" },
  { ad:["pradaxa","dabigatran","dabigatrane"], baslik:"💊 Dabigatran (Pradaxa)", grup:"Kalp-Tansiyon", sinif:"DOAK (Direkt Trombin İnhibitörü)", endikasyonlar:["Atriyal fibrilasyon","DVT / PE"], doz:"150 mg 2x/gün PO", uyarilar:["Kanama riski — antidot: İdarusizumab (Praxbind)","Böbrek yetmezliğinde kontrendike","Kapsül kırılmamalı"], renk:"#dc2626" },
  { ad:["fragmin","dalteparin","dalteparine"], baslik:"💊 Dalteparin (Fragmin)", grup:"Kalp-Tansiyon", sinif:"DMAH", endikasyonlar:["DVT profilaksi ve tedavisi","Kanser hastalarında antikoagülasyon"], doz:"2500–5000 IU SC/gün (profilaksi)", uyarilar:["Kanama riski","Böbrek yetmezliğinde dikkat"], renk:"#dc2626" },

  // ── DİYABET İLAÇLARI ──────────────────────────────────────
  { ad:["glifor","glucophage","metformin","diaformin","glukofaj"], baslik:"💊 Metformin (Glifor / Glucophage)", grup:"Diyabet", sinif:"Oral Antidiyabetik", endikasyonlar:["Tip 2 diyabet — ilk tercih","İnsülin direnci","PKOS"], doz:"500–2000 mg/gün PO (yemekle)", uyarilar:["Böbrek yetmezliğinde kontre (GFR<30)","Kontrast madde öncesi kes","Hipoglisemi yapmaz"], renk:"#059669" },
  { ad:["diamicron","gliklazid","gliclazide","glikron"], baslik:"💊 Gliklazid (Diamicron)", grup:"Diyabet", sinif:"Sülfonilüre", endikasyonlar:["Tip 2 diyabet"], doz:"30–120 mg/gün MR PO (kahvaltıda)", uyarilar:["🚨 HİPOGLİSEMİ — öğün atlama","112: Bilinç kaybı + diyabet = KAN ŞEKERİ ÖL!"], renk:"#059669" },
  { ad:["januvia","janumet","sitagliptin","xelevia"], baslik:"💊 Sitagliptin (Januvia / Xelevia)", grup:"Diyabet", sinif:"DPP-4 İnhibitörü", endikasyonlar:["Tip 2 diyabet","Metformin ek tedavisi"], doz:"100 mg/gün PO", uyarilar:["Hipoglisemi riski düşük","Pankreatit riski","Böbrek yetmezliğinde doz ayarı"], renk:"#059669" },
  { ad:["jardiance","empagliflozin","jardians"], baslik:"💊 Empagliflozin (Jardiance)", grup:"Diyabet", sinif:"SGLT-2 İnhibitörü", endikasyonlar:["Tip 2 diyabet","Kalp yetmezliği","Kronik böbrek hastalığı"], doz:"10–25 mg/gün PO", uyarilar:["DKA riski","Ürogenital enfeksiyon","Dehidrasyon"], renk:"#059669" },
  { ad:["forxiga","dapagliflozin"], baslik:"💊 Dapagliflozin (Forxiga)", grup:"Diyabet", sinif:"SGLT-2 İnhibitörü", endikasyonlar:["Tip 2 diyabet","Kalp yetmezliği (EF azalmış)","Böbrek hastalığı"], doz:"10 mg/gün PO", uyarilar:["DKA riski","Ürogenital enfeksiyon","Dehidrasyon"], renk:"#059669" },
  { ad:["victoza","liraglutide","liraglutid"], baslik:"💊 Liraglutid (Victoza)", grup:"Diyabet", sinif:"GLP-1 Agonisti", endikasyonlar:["Tip 2 diyabet","Kardiyovasküler risk azaltma","Obezite (Saxenda)"], doz:"0.6–1.8 mg/gün SC enjeksiyon", uyarilar:["Bulantı-kusma (başlangıçta)","Pankreatit riski","Kilo kaybı sağlar"], renk:"#059669" },
  { ad:["ozempic","semaglutid","semaglutide","wegovy","rybelsus"], baslik:"💊 Semaglutid (Ozempic / Wegovy)", grup:"Diyabet", sinif:"GLP-1 Agonisti", endikasyonlar:["Tip 2 diyabet","Obezite","Kardiyovasküler risk azaltma"], doz:"0.25–1 mg SC haftada 1 kez", uyarilar:["Bulantı sık","Pankreatit riski","Kilo kaybı belirgin"], renk:"#059669" },
  { ad:["tresiba","degludek","degludec","insulin degludec"], baslik:"💊 Tresiba (Degludek — Bazal İnsülin)", grup:"Diyabet", sinif:"Ultra Uzun Etkili İnsülin", endikasyonlar:["Tip 1 ve 2 diyabet bazal insülin"], doz:"Günde 1 kez SC (herhangi bir saatte)", uyarilar:["🚨 HİPOGLİSEMİ riski","Soğuk zincir gerekli"], renk:"#dc2626" },
  { ad:["lantus","glarjin","glargine","basaglar","toujeo"], baslik:"💊 Lantus / Toujeo (İnsülin Glarjin)", grup:"Diyabet", sinif:"Uzun Etkili İnsülin", endikasyonlar:["Tip 1 ve 2 diyabet bazal insülin"], doz:"Günde 1 kez SC (akşam)", uyarilar:["HİPOGLİSEMİ riski","Soğuk zincir","SF veya diğer insülinlerle KARIŞTIRILABİLİR DEĞİL"], renk:"#dc2626" },
  { ad:["levemir","detemir","insulin detemir"], baslik:"💊 Levemir (İnsülin Detemir)", grup:"Diyabet", sinif:"Uzun Etkili İnsülin", endikasyonlar:["Tip 1 ve 2 diyabet bazal insülin"], doz:"1–2x/gün SC", uyarilar:["HİPOGLİSEMİ riski","Soğuk zincir","Kilo artışı Lantus'tan az"], renk:"#dc2626" },
  { ad:["humalog","lispro","insulin lispro"], baslik:"💊 Humalog (İnsülin Lispro — Hızlı Etkili)", grup:"Diyabet", sinif:"Hızlı Etkili İnsülin", endikasyonlar:["Tip 1 ve 2 diyabette yemek öncesi"], doz:"Yemekten hemen önce SC", uyarilar:["🚨 HİPOGLİSEMİ — 15 dk içinde etkisi başlar","Soğuk zincir"], renk:"#dc2626" },
  { ad:["novorapid","aspart","insulin aspart","novolog"], baslik:"💊 NovoRapid (İnsülin Aspart)", grup:"Diyabet", sinif:"Hızlı Etkili İnsülin", endikasyonlar:["Tip 1 ve 2 diyabette yemek öncesi","DKA tedavisi (IV)"], doz:"Yemekten hemen önce SC\nDKA: 0.1 Ü/kg/saat IV", uyarilar:["🚨 HİPOGLİSEMİ","Soğuk zincir","IV sadece seyreltilmiş form"], renk:"#dc2626" },
  { ad:["apidra","glulisine","insulin glulisine"], baslik:"💊 Apidra (İnsülin Glulisin)", grup:"Diyabet", sinif:"Hızlı Etkili İnsülin", endikasyonlar:["Tip 1 ve 2 diyabette yemek öncesi"], doz:"Yemekten 0–15 dk önce SC", uyarilar:["HİPOGLİSEMİ riski","Soğuk zincir"], renk:"#dc2626" },

  // ── ASTIM / KOAH ──────────────────────────────────────────
  { ad:["pulmicort","budesonid","budesonide","rhinocort"], baslik:"💊 Pulmicort (Budesonid)", grup:"Astım-KOAH", sinif:"İnhale Kortikosteroid", endikasyonlar:["Astım idame tedavisi","KOAH (ağır-çok ağır)","Krup (nebül formu)"], doz:"200–800 mcg/gün inhaler\nKrup nebül: 2 mg", uyarilar:["Oral kandida — çalkalama ver","Sistemik etki düşük ama yüksek dozda dikkat"], renk:"#7c3aed" },
  { ad:["symbicort","budesonid formoterol","budesonide formoterol"], baslik:"💊 Symbicort (Budesonid + Formoterol)", grup:"Astım-KOAH", sinif:"İKS + LABA Kombinasyon", endikasyonlar:["Astım (orta-ağır, idame)","KOAH (ağır)"], doz:"1–2 inhalasyon 2x/gün", uyarilar:["Oral kandida","LABA tek başına astımda kullanılmaz","Düzenli kullanım — gerektiğinde için değil"], renk:"#7c3aed" },
  { ad:["foster","beclometasone formoterol","beclometasone"], baslik:"💊 Foster (Beklometazon + Formoterol)", grup:"Astım-KOAH", sinif:"İKS + LABA Kombinasyon", endikasyonlar:["Astım idame","KOAH"], doz:"1–2 inhalasyon 2x/gün", uyarilar:["Oral kandida","Düzenli kullanım"], renk:"#7c3aed" },
  { ad:["seretide","salmeterol fluticasone","fluticasone salmeterol","advair"], baslik:"💊 Seretide (Flutikason + Salmeterol)", grup:"Astım-KOAH", sinif:"İKS + LABA Kombinasyon", endikasyonlar:["Astım idame","KOAH"], doz:"1 inhalasyon 2x/gün", uyarilar:["Oral kandida","LABA astımda tek başına kontrendike"], renk:"#7c3aed" },
  { ad:["spiriva","tiotropium","tiotropyum"], baslik:"💊 Spiriva (Tiotropyum)", grup:"Astım-KOAH", sinif:"Uzun Etkili Antikolinerjik (LAMA)", endikasyonlar:["KOAH idame tedavisi","Ağır astım (ek tedavi)"], doz:"18 mcg/gün inhaler (Handihaler)", uyarilar:["Ağız kuruluğu çok sık","Glokomda dikkat","Mesane çıkım obstrüksiyonunda dikkat"], renk:"#0891b2" },
  { ad:["atrovent","ipratropium","ipravent","ipratropiyum"], baslik:"💊 Atrovent (İpratropiyum)", grup:"Astım-KOAH", sinif:"Kısa Etkili Antikolinerjik (SAMA)", endikasyonlar:["KOAH atağı","Astım (orta-ağır atakta salbutamole ek)","Bronkospazm"], doz:"500 mcg nebül (yetişkin)\nÇocuk <20 kg: 250 mcg", uyarilar:["Ağız kuruluğu","Glokomda nebülü gözden uzak tut"], renk:"#0891b2" },
  { ad:["combivent","salbutamol ipratropium","ipramol"], baslik:"💊 Combivent (Salbutamol + İpratropiyum)", grup:"Astım-KOAH", sinif:"SABA + SAMA Kombinasyon", endikasyonlar:["KOAH akut atağı","Astım akut atağı (ağır)"], doz:"1 nebül 6–8 saatte bir veya akut atakta 20 dk arayla", uyarilar:["Taşikardi yapabilir","Glokomda dikkat"], renk:"#0891b2" },
  { ad:["flixotide","flutikason","fluticasone","flovent"], baslik:"💊 Flixotide (Flutikason)", grup:"Astım-KOAH", sinif:"İnhale Kortikosteroid", endikasyonlar:["Astım idame tedavisi","KOAH (steroid bileşeni)"], doz:"100–500 mcg 2x/gün inhaler", uyarilar:["Oral kandida — ağız çalkala","Yüksek doz sistemik etkiler"], renk:"#7c3aed" },

  // ── ALERJİ ────────────────────────────────────────────────
  { ad:["avil","feniramin","phenergan","prometazin"], baslik:"💊 Avil / Feniramin (Prometazin)", grup:"Alerji", sinif:"1. Kuşak Antihistaminik (Sedatif)", endikasyonlar:["Alerjik reaksiyon","Anafilaksi (ek tedavi — adrenalin sonrası)","Uyku bozukluğu","Hareket hastalığı"], doz:"25–50 mg IV/IM/PO", uyarilar:["Belirgin sedasyon — araç kullanmayın","Antikolinerjik etkiler","Yaşlılarda konfüzyon"], renk:"#d97706" },
  { ad:["fenistil","dimetinden","dimetindene"], baslik:"💊 Fenistil (Dimetinden)", grup:"Alerji", sinif:"1. Kuşak Antihistaminik", endikasyonlar:["Alerjik döküntü ve kaşıntı","Böcek sokması","Ürtiker"], doz:"4 mg PO 3x/gün veya 0.1 mg/kg IV yavaş", uyarilar:["Sedasyon","6 ay altı çocuklarda kontrendike"], renk:"#d97706" },
  { ad:["zyrtec","setirizin","cetirizine","cetrin","virlix"], baslik:"💊 Zyrtec (Setirizin)", grup:"Alerji", sinif:"2. Kuşak Antihistaminik (Düşük Sedatif)", endikasyonlar:["Alerjik rinit","Ürtiker","Egzama kaşıntısı","Mevsimsel alerjiler"], doz:"10 mg/gün PO", uyarilar:["Düşük sedasyon","Böbrek yetmezliğinde doz azalt"], renk:"#d97706" },
  { ad:["aerius","desloratadin","desloratadine","deslorat"], baslik:"💊 Aerius (Desloratadin)", grup:"Alerji", sinif:"2. Kuşak Antihistaminik", endikasyonlar:["Alerjik rinit","Kronik ürtiker"], doz:"5 mg/gün PO", uyarilar:["Sedasyon çok az","Böbrek/karaciğer yetmezliğinde dikkat"], renk:"#d97706" },
  { ad:["telfast","feksofenadin","fexofenadine","allegra"], baslik:"💊 Telfast (Feksofenadin)", grup:"Alerji", sinif:"2. Kuşak Antihistaminik (Sedatif Yok)", endikasyonlar:["Alerjik rinit","Ürtiker"], doz:"120–180 mg/gün PO", uyarilar:["Sedasyon yok","Meyve suyu emilimi azaltır"], renk:"#d97706" },
  { ad:["claritine","loratadin","loratadine","clarityn"], baslik:"💊 Claritine (Loratadin)", grup:"Alerji", sinif:"2. Kuşak Antihistaminik", endikasyonlar:["Alerjik rinit","Ürtiker","Mevsimsel alerjiler"], doz:"10 mg/gün PO", uyarilar:["Düşük sedasyon","Karaciğer yetmezliğinde gün aşırı"], renk:"#d97706" },
  { ad:["xyzal","levocetirizin","levocetirizine","levocet"], baslik:"💊 Xyzal (Levosetrizin)", grup:"Alerji", sinif:"2. Kuşak Antihistaminik", endikasyonlar:["Alerjik rinit","Kronik ürtiker"], doz:"5 mg/gün PO (akşam)", uyarilar:["Hafif sedasyon (akşam alınması önerilir)","Böbrek yetmezliğinde doz azalt"], renk:"#d97706" },
  { ad:["rupafin","rupatadin","rupatadine"], baslik:"💊 Rupafin (Rupatadin)", grup:"Alerji", sinif:"2. Kuşak Antihistaminik + PAF Blokörü", endikasyonlar:["Alerjik rinit","Kronik ürtiker"], doz:"10 mg/gün PO", uyarilar:["Hafif sedasyon","Greyfurt suyu etkisini artırır"], renk:"#d97706" },

  // ── MİDE İLAÇLARI ────────────────────────────────────────
  { ad:["lansor","lansoprazol","lansoprazole","lanzor","ogast"], baslik:"💊 Lansoprazol (Lansor)", grup:"Mide", sinif:"Proton Pompa İnhibitörü (PPI)", endikasyonlar:["GERD / Reflü","Peptik ülser","H. pylori eradikasyonu","NSAİİ ülser koruması"], doz:"15–30 mg/gün PO (sabah aç karnına)", uyarilar:["Uzun kullanım: Mg, B12, Ca eksikliği","Klopidogrel ile dikkat"], renk:"#d97706" },
  { ad:["nexium","esomeprazol","esomeprazole","nexium mups"], baslik:"💊 Nexium (Esomeprazol)", grup:"Mide", sinif:"Proton Pompa İnhibitörü (PPI)", endikasyonlar:["GERD / Reflü","Peptik ülser","H. pylori eradikasyonu","Zollinger-Ellison"], doz:"20–40 mg/gün PO", uyarilar:["Klopidogrel ile dikkat — pantoprazol tercih et","Uzun kullanım elektrolit izlemi"], renk:"#d97706" },
  { ad:["pantpas","pantoprazol","pantoloc","kontroloc","pantactive"], baslik:"💊 Pantoprazol (Pantpas / Pantoloc)", grup:"Mide", sinif:"Proton Pompa İnhibitörü (PPI)", endikasyonlar:["GERD","Peptik ülser","Klopidogrel ile güvenli kombinasyon"], doz:"20–40 mg/gün PO\nIV: 40 mg", uyarilar:["PPI içinde klopidogrel etkileşimi en az","Uzun kullanım elektrolit izlemi"], renk:"#d97706" },
  { ad:["omeprazol","losec","prilosec","omeran","ulcozol"], baslik:"💊 Omeprazol (Losec / Omeran)", grup:"Mide", sinif:"Proton Pompa İnhibitörü (PPI)", endikasyonlar:["GERD","Peptik ülser","H. pylori eradikasyonu"], doz:"20–40 mg/gün PO (sabah aç karnına)", uyarilar:["Klopidogrel etkisini azaltır — pantoprazol tercih et","Uzun kullanım: B12, Ca eksikliği"], renk:"#d97706" },
  { ad:["gaviscon","sodyum aljinat","alginic acid"], baslik:"💊 Gaviscon", grup:"Mide", sinif:"Antasit / Aljinat Bariyer", endikasyonlar:["Reflü semptomları","Mide yanması","Gebelikte mide yanması (güvenli)"], doz:"10–20 ml veya 2 tablet yemek sonrası ve yatmadan önce", uyarilar:["Aktif madde emilimini azaltabilir — ilaçlardan 2 saat arayla","Böbrek yetmezliğinde Na içeriği"], renk:"#d97706" },
  { ad:["rennie","kalsiyum karbonat","calcium carbonate","tums"], baslik:"💊 Rennie (Kalsiyum Karbonat)", grup:"Mide", sinif:"Antasit", endikasyonlar:["Mide yanması","Hazımsızlık","Asit reflü"], doz:"1–2 çiğneme tableti gerektiğinde", uyarilar:["Uzun kullanım: hiperkalsemi","Diğer ilaçları 2 saat önce veya sonra al","Böbrek taşı riski"], renk:"#d97706" },
  { ad:["talcid","hidrotalkit","hydrotalcite"], baslik:"💊 Talcid (Hidrotalkit)", grup:"Mide", sinif:"Antasit", endikasyonlar:["Mide yanması","Peptik ülser","Gastrit"], doz:"1–2 çiğneme tableti yemekten 1 saat sonra ve yatmadan önce", uyarilar:["Diğer ilaçlarla 2 saat arayla al","Böbrek yetmezliğinde dikkat"], renk:"#d97706" },
  { ad:["famodin","famotidin","famotidine","pepcid"], baslik:"💊 Famotidin (Famodin / Pepcid)", grup:"Mide", sinif:"H2 Reseptör Antagonisti", endikasyonlar:["Peptik ülser","GERD","Zollinger-Ellison","Anafilaksi (ek tedavi — H2 blokörü)"], doz:"20–40 mg/gün PO", uyarilar:["PPI kadar güçlü değil","Böbrek yetmezliğinde doz azalt"], renk:"#d97706" },

  // ── NÖROLOJİ ─────────────────────────────────────────────
  { ad:["keppra","levetirasetam","levetiracetam","kepra"], baslik:"💊 Keppra (Levetirasetam)", grup:"Nöroloji", sinif:"Antiepileptik", endikasyonlar:["Fokal ve jeneralize nöbetler","Status epilepticus (IV)","Miyoklonik nöbetler"], doz:"500–3000 mg/gün PO (2 bölünmüş doz)\nIV: 60 mg/dk hızla", uyarilar:["Ajitasyon ve davranış değişikliği sık","Böbrek yetmezliğinde doz ayarı","Ani kesme = nöbet riski"], renk:"#8b5cf6" },
  { ad:["tegretol","karbamazepin","carbamazepine","carbatol","timonil"], baslik:"💊 Tegretol (Karbamazepin)", grup:"Nöroloji", sinif:"Antiepileptik / Duygudurum", endikasyonlar:["Trigeminal nevralji","Fokal epilepsi","Bipolar bozukluk","Nöropatik ağrı"], doz:"200–1600 mg/gün PO", uyarilar:["Stevens-Johnson sendromu riski","Çok fazla ilaç etkileşimi (CYP450)","Hiponatremi"], renk:"#8b5cf6" },
  { ad:["depakine","valproat","valproic acid","epilim","sodyum valproat"], baslik:"💊 Depakine (Valproat)", grup:"Nöroloji", sinif:"Antiepileptik / Duygudurum", endikasyonlar:["Epilepsi (jeneralize ve fokal)","Bipolar bozukluk","Migren profilaksisi","Status epilepticus (IV)"], doz:"500–2000 mg/gün PO\nIV: 20–30 mg/kg (status)", uyarilar:["🚨 GEBELİKTE KESİNLİKLE KONTRENDİKE","Karaciğer toksisitesi","Trombositopeni"], renk:"#8b5cf6" },
  { ad:["lamictal","lamotrijin","lamotrigine","lamotrin"], baslik:"💊 Lamictal (Lamotrijin)", grup:"Nöroloji", sinif:"Antiepileptik", endikasyonlar:["Fokal ve jeneralize epilepsi","Bipolar depresyon (ek)","Lennox-Gastaut sendromu"], doz:"25–400 mg/gün PO (yavaş titre)", uyarilar:["Deri döküntüsü ve Steven-Johnson riski — çok yavaş titre et!","Valproat ile kombine dozunu azalt"], renk:"#8b5cf6" },
  { ad:["trileptal","okskarbazepin","oxcarbazepine","oxcarb"], baslik:"💊 Trileptal (Okskarbazepin)", grup:"Nöroloji", sinif:"Antiepileptik", endikasyonlar:["Fokal epilepsi","Trigeminal nevralji"], doz:"600–2400 mg/gün PO (2 bölünmüş doz)", uyarilar:["Hiponatremi (karbamazepinden daha fazla)","Deri döküntüsü","Karbamazepine çapraz alerji"], renk:"#8b5cf6" },
  { ad:["lyrica","pregabalin","lyrika"], baslik:"💊 Lyrica (Pregabalin)", grup:"Nöroloji", sinif:"Antiepileptik / Analjezik", endikasyonlar:["Nöropatik ağrı","Generalize anksiyete","Epilepsi (ek)","Fibromiyalji"], doz:"75–600 mg/gün PO", uyarilar:["Sedasyon ve baş dönmesi","Bağımlılık var (kontrollü ilaç)","Solunum depresyonu (opioidlerle)"], renk:"#8b5cf6" },
  { ad:["neurontin","gabapentin","gabateva"], baslik:"💊 Neurontin (Gabapentin)", grup:"Nöroloji", sinif:"Antiepileptik / Analjezik", endikasyonlar:["Nöropatik ağrı","Fokal epilepsi","Huzursuz bacak sendromu"], doz:"300–3600 mg/gün PO (3 bölünmüş doz)", uyarilar:["Sedasyon belirgin","Böbrek yetmezliğinde doz azalt","Ani kesme = nöbet riski"], renk:"#8b5cf6" },

  // ── PSİKİYATRİ ────────────────────────────────────────────
  { ad:["lustral","sertralin","zoloft","serteva","serenata","asentra"], baslik:"💊 Lustral (Sertralin)", grup:"Psikiyatri", sinif:"SSRI / Antidepresan", endikasyonlar:["Majör depresyon","Panik bozukluğu","OKB","PTSD"], doz:"50–200 mg/gün PO", uyarilar:["MAO inhibitörleriyle KOMBİNE ETME","İlk 2 haftada ajitasyon artabilir","Ani kesme sendromu"], renk:"#ec4899" },
  { ad:["cipralex","essitalopram","escitalopram","lexapro"], baslik:"💊 Cipralex (Essitalopram)", grup:"Psikiyatri", sinif:"SSRI / Antidepresan", endikasyonlar:["Majör depresyon","Generalize anksiyete","Panik bozukluğu"], doz:"10–20 mg/gün PO", uyarilar:["QT uzaması (20 mg üstünde)","Serotonin sendromu riski"], renk:"#ec4899" },
  { ad:["prozac","fluoksetin","fluctin","depreks"], baslik:"💊 Prozac (Fluoksetin)", grup:"Psikiyatri", sinif:"SSRI / Antidepresan", endikasyonlar:["Majör depresyon","OKB","Bulimia nervoza"], doz:"20–60 mg/gün PO (sabah)", uyarilar:["MAO inhibitörleriyle KOMBİNE ETME","Uzun yarılanma — etkileşim riski"], renk:"#ec4899" },
  { ad:["selectra","essitalopram","cipralex"], baslik:"💊 Selectra (Essitalopram)", grup:"Psikiyatri", sinif:"SSRI / Antidepresan", endikasyonlar:["Majör depresyon","Anksiyete"], doz:"10–20 mg/gün PO", uyarilar:["QT uzaması riski","Serotonin sendromu"], renk:"#ec4899" },
  { ad:["xanax","alprazolam","xanor","frontal","alprox"], baslik:"💊 Xanax (Alprazolam)", grup:"Psikiyatri", sinif:"Benzodiazepin / Anksiyolitik", endikasyonlar:["Panik bozukluğu","Generalize anksiyete"], doz:"0.25–1 mg 2-3x/gün PO", uyarilar:["Yüksek bağımlılık potansiyeli","Solunum depresyonu — opioidlerle kombine etme","Ani kesme = nöbet riski"], renk:"#8b5cf6" },
  { ad:["atarax","hidroksizin","hydroxyzine","ucerax"], baslik:"💊 Atarax (Hidroksizin)", grup:"Psikiyatri", sinif:"Antihistaminik / Anksiyolitik", endikasyonlar:["Anksiyete","Kaşıntı","Sedasyon (preoperatif)"], doz:"25–100 mg/gün PO veya IM", uyarilar:["Sedasyon belirgin","QT uzaması","Antikolinerjik etkiler"], renk:"#8b5cf6" },
  { ad:["efexor","venlafaksin","venladex","effexor"], baslik:"💊 Efexor (Venlafaksin)", grup:"Psikiyatri", sinif:"SNRI / Antidepresan", endikasyonlar:["Majör depresyon","Generalize anksiyete","Nöropatik ağrı"], doz:"75–225 mg/gün PO (yemekle)", uyarilar:["Kan basıncı artışı","Ani kesme: elektrik şoku hissi","Serotonin sendromu riski"], renk:"#ec4899" },
  { ad:["rexapin","olanzapin","zyprexa","olan","zalasta"], baslik:"💊 Rexapin / Zyprexa (Olanzapin)", grup:"Psikiyatri", sinif:"Atipik Antipsikotik", endikasyonlar:["Şizofreni","Bipolar mani","Ajitasyon (IM form)"], doz:"5–20 mg/gün PO\nIM: 5–10 mg", uyarilar:["🚨 IM Olanzapin + Lorazepam AYNI ANDA VERİLMEZ!","Kilo artışı en fazla antipsikotik","Diyabetogenik"], renk:"#8b5cf6" },
  { ad:["risperdal","risperidon","risperidone","risperon"], baslik:"💊 Risperdal (Risperidon)", grup:"Psikiyatri", sinif:"Atipik Antipsikotik", endikasyonlar:["Şizofreni","Bipolar mani","Otizmde irritabilite"], doz:"2–16 mg/gün PO", uyarilar:["Ekstrapiramidal yan etkiler","QT uzaması","Yaşlı demans hastalarında mortalite artışı"], renk:"#8b5cf6" },
  { ad:["seroquel","ketiapin","quetiapine","ketipinor"], baslik:"💊 Seroquel (Ketiapin)", grup:"Psikiyatri", sinif:"Atipik Antipsikotik", endikasyonlar:["Şizofreni","Bipolar bozukluk","Tedaviye dirençli depresyon (ek)"], doz:"25–800 mg/gün PO", uyarilar:["Sedasyon","QT uzaması","Hiperglisemi ve kilo artışı"], renk:"#8b5cf6" },
  { ad:["zedprex","ziprasidon","ziprasidone","geodon"], baslik:"💊 Zedprex (Ziprasidon)", grup:"Psikiyatri", sinif:"Atipik Antipsikotik", endikasyonlar:["Şizofreni","Bipolar mani"], doz:"20–80 mg 2x/gün PO (yemekle)", uyarilar:["QT uzaması (antipsikotikler içinde en fazla)","Yemekle alınmalı (emilim için)"], renk:"#8b5cf6" },

  // ── TİROİD ────────────────────────────────────────────────
  { ad:["euthyrox","levotiroksin","l-tiroksin","levaxin","letrox"], baslik:"💊 Euthyrox (Levotiroksin)", grup:"Tiroid", sinif:"Tiroid Hormonu", endikasyonlar:["Hipotiroidizm","Hashimoto tiroiditi","Guatr","Tiroid kanseri sonrası"], doz:"50–200 mcg/gün PO (sabah aç karnına, 30 dk önce)", uyarilar:["Doz fazlası: çarpıntı, aritmi, tremor","Kalp hastalarında düşük dozla başla","Demir/kalsiyum/süt 4 saat arayla"], renk:"#7c3aed" },
  { ad:["tefor","metimazol","thyrozol","methimazole","strumazol"], baslik:"💊 Tefor / Thyrozol (Metimazol)", grup:"Tiroid", sinif:"Antitiroid", endikasyonlar:["Hipertiroidizm","Graves hastalığı"], doz:"10–40 mg/gün PO", uyarilar:["Agranülositoz — ateş + boğaz ağrısı = ACİL!","Cilt döküntüsü sık"], renk:"#7c3aed" },
  { ad:["thyromazol","propiltiourasil","ptu","propylthiouracil"], baslik:"💊 Thyromazol / PTU (Propiltiourasil)", grup:"Tiroid", sinif:"Antitiroid", endikasyonlar:["Hipertiroidizm","Graves hastalığı","Tiroid fırtınası","Gebelikte ilk trimester hipertiroidi"], doz:"100–300 mg 2-3x/gün PO", uyarilar:["Agranülositoz riski","Karaciğer hasarı","Tiroid fırtınasında beta-bloker + steroid ile kombine"], renk:"#7c3aed" },

  // ── KADIN DOĞUM ───────────────────────────────────────────
  { ad:["cyclo-progynova","östrojen progesteron","kombine hrt"], baslik:"💊 Cyclo-Progynova (HRT)", grup:"Kadın Doğum", sinif:"Hormon Replasman Tedavisi", endikasyonlar:["Menopoz semptomları (ateş basması, terleme)","Osteoporoz önleme","Erken menopoz"], doz:"Günde 1 tablet (siklik reçim)", uyarilar:["DVT / PE riski","Meme kanseri riski (uzun kullanım)","Migrenli kadınlarda dikkat"], renk:"#ec4899" },
  { ad:["primolut","noretisteron","norethisterone"], baslik:"💊 Primolut (Noretisteron)", grup:"Kadın Doğum", sinif:"Progestin", endikasyonlar:["Adet ertelemesi","Endometriozis","Dismenore","Menoraji"], doz:"5–10 mg/gün PO (endikasyona göre)","uyarilar":["DVT riski","Hormon duyarlı kanserlerde dikkat"], renk:"#ec4899" },
  { ad:["yasmin","etinilestradiol drospirenon","yaz","yasminelle"], baslik:"💊 Yasmin (Etinilestradiol + Drospirenon)", grup:"Kadın Doğum", sinif:"Oral Kontraseptif", endikasyonlar:["Kontrasepsiyon","PKOS","Akne (Yasmin'in antiandrojenik etkisi)","Dismenore"], doz:"Günde 1 tablet (21 gün)", uyarilar:["DVT / PE riski — sigara + 35 yaş tehlikeli","Migren aura'lı hastalarda kontrendike","Hipertansiyonda kontrendike"], renk:"#ec4899" },
  { ad:["diane","diane 35","siproteron asetat","cyproterone"], baslik:"💊 Diane 35 (Siproteron + Etinilestradiol)", grup:"Kadın Doğum", sinif:"Antiandrojen + OKS", endikasyonlar:["Akne (androjenik)","PKOS","Hirsutism (aşırı kıllanma)"], doz:"Günde 1 tablet (21 gün)", uyarilar:["DVT riski (Yasmin'den yüksek)","Karaciğer tümörü riski (nadir)","Primer kontrasepsiyon için değil"], renk:"#ec4899" },
  { ad:["cerazette","desogestrel","norlevo","cerazet"], baslik:"💊 Cerazette (Desogestrel — Mini Hap)", grup:"Kadın Doğum", sinif:"Progesteron Sadece OKS", endikasyonlar:["Kontrasepsiyon (östrojen kontrendike olanlarda)","Emziren annelerde güvenli"], doz:"Günde 1 tablet (sürekli)", uyarilar:["Düzensiz kanama sık","Yüksek etkinlik için saate dikkat","DVT riski çok düşük"], renk:"#ec4899" },

  // ── VİTAMİNLER / MİNERALLER ──────────────────────────────
  { ad:["bemiks","b kompleks","b vitamini kompleks"], baslik:"💊 Bemiks (B Vitamini Kompleks)", grup:"Vitamin", sinif:"B Vitamini Grubu", endikasyonlar:["B vitamini eksikliği","Periferik nöropati","Alkolizm ve malnütrisyon"], doz:"1–3 tablet/gün PO veya IM/IV", uyarilar:["İdrar sarı-turuncu renk (normal)","Yüksek B6 dozu nöropati yapabilir"], renk:"#d97706" },
  { ad:["bevit","b12","sianokobalamin","cyanocobalamin","methylcobalamin"], baslik:"💊 Bevit B12 (Siyanokobalamin)", grup:"Vitamin", sinif:"B12 Vitamini", endikasyonlar:["B12 eksikliği (megaloblastik anemi)","Vejetaryen/vegan diyet","Pernisiyöz anemi","Metformin kullananlar (B12 düşürür)"], doz:"1000 mcg IM haftada 1 kez (başlangıç)\nIdame: 1000 mcg/ay IM veya 1000 mcg/gün PO", uyarilar:["İM uygulama ağrılı","Folat eksikliği eşlik edebilir — birlikte tedavi"], renk:"#d97706" },
  { ad:["devit","vitamin d","kolekalsiferol","d3 vitamini","cholecalciferol"], baslik:"💊 Devit-3 (Kolekalsiferol / D3 Vitamini)", grup:"Vitamin", sinif:"Yağda Çözünen Vitamin", endikasyonlar:["D vitamini eksikliği","Osteoporoz önleme","Raşitizm","Kalsiyum emilimini artırma"], doz:"1000–4000 IU/gün PO (eksiklikte 50.000 IU/hafta)", uyarilar:["Aşırı doz hiperkalsemi","Böbrek taşı riski (Ca ile birlikte)"], renk:"#d97706" },
  { ad:["d-colefor","colecalciferol","dekristol","oleovit"], baslik:"💊 D-Colefor (Kolekalsiferol)", grup:"Vitamin", sinif:"D3 Vitamini", endikasyonlar:["D vitamini eksikliği","Osteoporoz","Raşitizm"], doz:"Kişiye özel — kan düzeyine göre", uyarilar:["Hiperkalsemi (aşırı doz)","Sarkoidoz ve granülamatöz hastalıklarda dikkat"], renk:"#d97706" },
  { ad:["supradyn","multivitamin","pharmaton"], baslik:"💊 Supradyn / Pharmaton (Multivitamin)", grup:"Vitamin", sinif:"Multivitamin + Mineral", endikasyonlar:["Vitamin-mineral eksikliği","Enerji desteği","Spor ve yoğun çalışma"], doz:"1 tablet/gün PO (sabah)", uyarilar:["İlaç emilimini etkileyebilir — 2 saat arayla al","A vitamini aşırı dozu toksik"], renk:"#d97706" },
  { ad:["redoxon","c vitamini","askorbik asit","ascorbic acid"], baslik:"💊 Redoxon (C Vitamini / Askorbik Asit)", grup:"Vitamin", sinif:"Suda Çözünen Vitamin", endikasyonlar:["C vitamini eksikliği (skorbüt)","Bağışıklık desteği","Demir emilimini artırma"], doz:"500–2000 mg/gün PO", uyarilar:["Yüksek doz: böbrek taşı (oksalat) riski","İshal (yüksek doz)"], renk:"#d97706" },
  { ad:["ferro sanol","ferrosanol","ferröz sülfat","iron sulfate","demir sülfat"], baslik:"💊 Ferro Sanol (Demir Sülfat)", grup:"Vitamin", sinif:"Demir Takviyesi", endikasyonlar:["Demir eksikliği anemisi","Gebelikte demir eksikliği"], doz:"100–200 mg/gün PO (elementer demir — aç karnına)", uyarilar:["Mide bulantısı ve kabızlık sık","C vitamini ile birlikte alınması emilimi artırır","Süt ve çay emilimi azaltır","Dışkı siyah renk (normal)"], renk:"#d97706" },
  { ad:["maltofer","demir polimaltoz","ferric polymaltose","maltofer fol"], baslik:"💊 Maltofer (Demir Polimaltoz)", grup:"Vitamin", sinif:"Demir Takviyesi", endikasyonlar:["Demir eksikliği anemisi","Gebelikte demir desteği","Mide toleransı düşük hastalarda (ferro sanoldan iyi tolere edilir)"], doz:"1–3 tablet veya 10–30 ml şurup/gün", uyarilar:["Ferro sanoldan daha iyi tolere edilir","Dışkı rengi koyulaşabilir","Çay ve kahve emilimi azaltır"], renk:"#d97706" },

  // ── GÖZ İLAÇLARI ─────────────────────────────────────────
  { ad:["refresh","suni gözyaşı","artificial tears","hypromellose"], baslik:"💊 Refresh (Suni Gözyaşı)", grup:"Göz", sinif:"Göz Nemlendirici", endikasyonlar:["Kuru göz sendromu","Göz yorgunluğu","Kontak lens ile kullanım"], doz:"Gerektiğinde 1–2 damla (sıklık sınırsız)", uyarilar:["Konservan içerenleri 6 kezden fazla kullanma","Kontak lens takılıyken bazı formlar uygunsuz"], renk:"#0891b2" },
  { ad:["tobradex","tobramycin dexamethasone","tobradeks"], baslik:"💊 Tobradex (Tobramisin + Deksametazon)", grup:"Göz", sinif:"Antibiyotik + Steroid Göz Damlası", endikasyonlar:["Bakteri kaynaklı göz iltihabı + enflamasyon","Göz cerrahisi sonrası"], doz:"1–2 damla 4–6x/gün (en fazla 7 gün)", uyarilar:["Uzun kullanım: glokom ve katarakt riski","Tobramisin alerjisi kontrendike","Herpetik göz enfeksiyonunda kontrendike"], renk:"#059669" },
  { ad:["vigamox","moksifloksasin","moxifloxacin göz","vigamox göz"], baslik:"💊 Vigamox (Moksifloksasin Göz Damlası)", grup:"Göz", sinif:"Florokinolon Antibiyotik Göz Damlası", endikasyonlar:["Bakteriyel konjonktivit","Kornea ülseri (bakteri)","Cerrahi profilaksi"], doz:"1 damla 3x/gün 7 gün", uyarilar:["Kontakt lens takılıyken kullanma","Sadece topikal kullanım"], renk:"#059669" },
  { ad:["travatan","travoprost","göz tansiyonu"], baslik:"💊 Travatan (Travoprost)", grup:"Göz", sinif:"Prostaglandin Analoğu / Glokom", endikasyonlar:["Glokom","Yüksek göz içi basıncı"], doz:"Akşam 1 damla (her göze)", uyarilar:["Göz çevresinde pigmentasyon","Kirpik uzaması (yan etki)","Göz rengi değişebilir (kahverengi artışı)"], renk:"#7c3aed" },
  { ad:["xalatan","latanoprost","latanoprost"], baslik:"💊 Xalatan (Latanoprost)", grup:"Göz", sinif:"Prostaglandin Analoğu / Glokom", endikasyonlar:["Glokom","Yüksek göz içi basıncı"], doz:"Akşam 1 damla (her göze)", uyarilar:["Göz rengi değişimi (kahverengi artışı)","Kirpik uzaması","Buzdolabında saklanmalı"], renk:"#7c3aed" },

  // ── KULAK İLAÇLARI ────────────────────────────────────────
  { ad:["otipax","fenazon lidokain","ear drops pain"], baslik:"💊 Otipax (Fenazon + Lidokain Kulak Damlası)", grup:"Kulak", sinif:"Analjezik Kulak Damlası", endikasyonlar:["Akut otitis media ağrısı","Kulak ağrısı (geçici rahatlama)"], doz:"3–4 damla 2-3x/gün kulağa", uyarilar:["Kulak zarı deliğinde kontrendike!","Kalıcı tedavi değil — antibiyotik eşlik etmeli"], renk:"#d97706" },
  { ad:["siprogut","sipro göz kulak","siprofloksasin kulak"], baslik:"💊 Siprogut (Siprofloksasin Kulak Damlası)", grup:"Kulak", sinif:"Antibiyotik Kulak Damlası", endikasyonlar:["Dış kulak yolu iltihabı (otitis externa)","Kronik otitis media (tüp ile)"], doz:"4 damla 2x/gün (7 gün)", uyarilar:["Kulak zarı sağlamsa güvenli","Sadece topikal — sistemik değil"], renk:"#059669" },

  // ── DERMATOLOJİ ───────────────────────────────────────────
  { ad:["fucidin","fusidik asit","fucicort","fucidin krem","fusidic acid"], baslik:"💊 Fucidin (Fusidik Asit Krem)", grup:"Dermatoloji", sinif:"Topikal Antibiyotik", endikasyonlar:["Stafilokok kaynaklı cilt enfeksiyonları","İmpetigo","Enfekte egzama"], doz:"Günde 2–3 kez temiz cilte uygula", uyarilar:["Uzun kullanım direnç geliştirir","Göz çevresinde dikkat"], renk:"#059669" },
  { ad:["bactroban","mupirosin","mupirocin","bactroban krem"], baslik:"💊 Bactroban (Mupirosin)", grup:"Dermatoloji", sinif:"Topikal Antibiyotik", endikasyonlar:["Stafilokok enfeksiyonları (MRSA dahil)","İmpetigo","Burun MRSA taşıyıcılığı eradikasyonu (nazal pomad)"], doz:"Günde 3 kez 5–10 gün", uyarilar:["Uzun kullanım direnç geliştirir","Göz kontağından kaçın"], renk:"#059669" },
  { ad:["travazol","nistatin","nystatin","tinavazol","tinazol"], baslik:"💊 Travazol / Tinazol (Topikal Antifungal)", grup:"Dermatoloji", sinif:"Topikal Antifungal", endikasyonlar:["Mantar enfeksiyonları (tinea, pityriasis)","Vajinal mantar (bazı formlar)"], doz:"Günde 1–2 kez ciltle uygula", uyarilar:["Mukoza tahrişi","Uzun kullanım için dermatolog önerilir"], renk:"#d97706" },
  { ad:["canesten","klotrimazol","clotrimazole","lotrimin"], baslik:"💊 Canesten (Klotrimazol)", grup:"Dermatoloji", sinif:"Topikal Antifungal", endikasyonlar:["Vajinal mantar (Candida)","Ayak mantarı","Deri mantar enfeksiyonları"], doz:"Krem: günde 2–3 kez\nVajinal ovül: akşam tek doz veya 3 gün", uyarilar:["Kondom ve diyaframı bozabilir","Göz kontağından kaçın"], renk:"#d97706" },
  { ad:["advantan","metilprednizolon aseponat","methylprednisolone aceponate"], baslik:"💊 Advantan (Topikal Kortikosteroid)", grup:"Dermatoloji", sinif:"Güçlü Topikal Steroid", endikasyonlar:["Atopik dermatit (egzama)","Psoriasis","Lichen planus","Kontakt dermatit"], doz:"Günde 1 kez ince tabaka uygula (maks 12 hafta yetişkin)", uyarilar:["Yüzde ve katlantı bölgelerinde kısa süreli kullan","Uzun kullanım: deri incelmes, çatlak","Çocuklarda daha az süre"], renk:"#7c3aed" },
  { ad:["elocon","mometazon","mometasone","elocon krem"], baslik:"💊 Elocon (Mometazon)", grup:"Dermatoloji", sinif:"Orta Güçlü Topikal Steroid", endikasyonlar:["Atopik dermatit","Psoriasis","Alerjik kontakt dermatit"], doz:"Günde 1 kez ince tabaka uygula", uyarilar:["Yüzde dikkat (deri incelmesi)","Uzun kullanımdan kaçın","Çocuklarda daha az süre"], renk:"#7c3aed" },
  { ad:["dermovate","klobetazol","clobetasol","temovate"], baslik:"💊 Dermovate (Klobetazol)", grup:"Dermatoloji", sinif:"Çok Güçlü Topikal Steroid", endikasyonlar:["Dirençli psoriasis","Lichen sclerosus","Ağır dermatit"], doz:"Günde 1–2 kez ince tabaka (maks 4 hafta)", uyarilar:["EN GÜÇLÜ topikal steroid — kısa süreli kullan","Yüzde KESİNLİKLE kullanma","Adrenal baskılanma (geniş alan uzun kullanım)"], renk:"#dc2626" },
];

// ─── İLAÇ ARAMA FONKSİYONU ──────────────────────────────────
function ilacAra(metin) {
  if (!metin || metin.trim().length < 2) return [];
  const temizMetin = metin.toLowerCase().replace(/[^a-züğışçöıâ\s]/g, ' ').replace(/\s+/g, ' ').trim();
  const kelimeler = temizMetin.split(' ').filter(k => k.length > 2);
  const sonuclar = [];
  ILAC_VERITABANI.forEach(ilac => {
    let eslesme = false, puan = 0;
    ilac.ad.forEach(anahtar => {
      if (temizMetin.includes(anahtar)) { eslesme = true; puan += 10; }
      kelimeler.forEach(kelime => {
        if (anahtar.includes(kelime) || kelime.includes(anahtar)) { eslesme = true; puan += 3; }
        if (kelime.length >= 4 && anahtar.length >= 4 && kelime.substring(0,5) === anahtar.substring(0,5)) { eslesme = true; puan += 5; }
      });
    });
    if (eslesme) sonuclar.push({ ilac, puan });
  });
  return sonuclar.sort((a, b) => b.puan - a.puan).slice(0, 3).map(s => s.ilac);
}

// ─── ANA MODAL ───────────────────────────────────────────────
function showIlacTarayici() {
  if (typeof stopAllSounds === 'function') stopAllSounds();
  const eskiModal = document.getElementById('ilac-tarayici-modal');
  if (eskiModal) eskiModal.remove();
  const modal = document.createElement('div');
  modal.id = 'ilac-tarayici-modal';
  modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.92);z-index:9000;display:flex;flex-direction:column;align-items:center;overflow-y:auto;-webkit-overflow-scrolling:touch;';
  modal.innerHTML = `
    <div style="width:100%;background:linear-gradient(135deg,#1e293b,#334155);padding:16px 20px 14px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:10;box-shadow:0 2px 12px rgba(0,0,0,0.5);">
      <div style="display:flex;align-items:center;gap:12px;">
        <div style="width:42px;height:42px;background:linear-gradient(135deg,#0284c7,#0369a1);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:22px;">🔬</div>
        <div><div style="color:white;font-weight:800;font-size:17px;">İlaç Tanıma</div><div style="color:#94a3b8;font-size:11px;">${ILAC_VERITABANI.length}+ ilaç veritabanı</div></div>
      </div>
      <button onclick="document.getElementById('ilac-tarayici-modal').remove()" style="background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);color:white;width:40px;height:40px;border-radius:50%;font-size:18px;cursor:pointer;">✕</button>
    </div>
    <div style="width:100%;max-width:600px;padding:20px 16px 40px;">
      <div style="background:rgba(245,158,11,0.12);border:1px solid rgba(245,158,11,0.35);border-radius:12px;padding:11px 14px;margin-bottom:18px;display:flex;align-items:flex-start;gap:8px;">
        <span style="font-size:16px;flex-shrink:0;">⚕️</span>
        <div style="color:#fbbf24;font-size:12px;line-height:1.5;">Sağlık profesyonelleri için bilgi amaçlıdır. Klinik karar için güncel Sağlık Bakanlığı protokolleri esas alınmalıdır.</div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:20px;">
        <button id="tab-kamera" onclick="switchIlacTab('kamera')" style="padding:13px 10px;border-radius:12px;border:2px solid #3b82f6;background:linear-gradient(135deg,#3b82f6,#2563eb);color:white;font-size:14px;font-weight:700;cursor:pointer;">📷 Kamera ile Tara</button>
        <button id="tab-metin" onclick="switchIlacTab('metin')" style="padding:13px 10px;border-radius:12px;border:2px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.08);color:#94a3b8;font-size:14px;font-weight:700;cursor:pointer;">⌨️ İsim ile Ara</button>
      </div>
      <div id="panel-kamera">
        <div style="background:rgba(255,255,255,0.05);border:2px dashed rgba(255,255,255,0.15);border-radius:16px;padding:20px;margin-bottom:16px;text-align:center;">
          <video id="ilac-video" autoplay playsinline muted style="width:100%;max-height:260px;border-radius:12px;display:none;background:#000;object-fit:cover;"></video>
          <canvas id="ilac-canvas" style="display:none;width:100%;border-radius:12px;"></canvas>
          <div id="kamera-placeholder" style="padding:30px 0;"><div style="font-size:56px;margin-bottom:12px;">📷</div><div style="color:#94a3b8;font-size:14px;font-weight:600;">Kamerayı Aç</div><div style="color:#64748b;font-size:12px;margin-top:4px;">İlaç kutusunu veya ambalajını tara</div></div>
        </div>
        <div id="kamera-butonlari" style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px;">
          <button onclick="ilacKameraAc()" style="background:linear-gradient(135deg,#10b981,#059669);color:white;padding:14px;border-radius:12px;border:none;font-size:14px;font-weight:700;cursor:pointer;">📷 Kamerayı Aç</button>
          <button onclick="ilacGaleriden()" style="background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);color:white;padding:14px;border-radius:12px;font-size:14px;font-weight:700;cursor:pointer;">🖼️ Galeriden Seç</button>
        </div>
        <div id="kamera-kaydet-buton" style="display:none;">
          <button onclick="ilacKameraFotoSec()" style="width:100%;background:linear-gradient(135deg,#0284c7,#0369a1);color:white;padding:16px;border-radius:14px;border:none;font-size:16px;font-weight:800;cursor:pointer;">🔬 Fotoğraf Çek ve Analiz Et</button>
          <button onclick="ilacKameraKapat()" style="width:100%;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);color:#94a3b8;padding:10px;border-radius:10px;margin-top:8px;font-size:13px;cursor:pointer;">İptal</button>
        </div>
        <input type="file" id="ilac-file-input" accept="image/*" style="display:none" onchange="ilacDosyaSecildi(event)">
      </div>
      <div id="panel-metin" style="display:none;">
        <div style="position:relative;margin-bottom:8px;">
          <div style="position:absolute;left:16px;top:50%;transform:translateY(-50%);font-size:20px;pointer-events:none;">💊</div>
          <input type="text" id="ilac-metin-input" placeholder="İlaç adını yazın... (aspirin, ventolin, concor, lustral...)" oninput="ilacMetinAra(this.value)" style="width:100%;padding:16px 16px 16px 52px;border-radius:14px;border:2px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.08);color:white;font-size:15px;box-sizing:border-box;outline:none;">
        </div>
        <div style="color:#64748b;font-size:12px;text-align:center;margin-bottom:16px;">Etken madde veya ticari ad yazabilirsiniz</div>
      </div>
      <div id="ilac-ocr-durum" style="display:none;border-radius:12px;padding:14px 16px;margin-bottom:16px;font-size:13px;font-weight:600;text-align:center;border:1px solid;"></div>
      <div id="ilac-sonuclar"></div>
    </div>`;
  document.body.appendChild(modal);
}

// ─── SEKME DEĞİŞTİRME ───────────────────────────────────────
function switchIlacTab(tab) {
  const pk=document.getElementById('panel-kamera'), pm=document.getElementById('panel-metin');
  const tk=document.getElementById('tab-kamera'), tm=document.getElementById('tab-metin');
  const s=document.getElementById('ilac-sonuclar'), d=document.getElementById('ilac-ocr-durum');
  if(!pk) return;
  if(tab==='kamera'){
    pk.style.display='block'; pm.style.display='none';
    tk.style.cssText+='background:linear-gradient(135deg,#3b82f6,#2563eb);color:white;border:2px solid #3b82f6;';
    tm.style.cssText+='background:rgba(255,255,255,0.08);color:#94a3b8;border:2px solid rgba(255,255,255,0.15);';
  } else {
    ilacKameraKapat(); pk.style.display='none'; pm.style.display='block';
    tm.style.cssText+='background:linear-gradient(135deg,#3b82f6,#2563eb);color:white;border:2px solid #3b82f6;';
    tk.style.cssText+='background:rgba(255,255,255,0.08);color:#94a3b8;border:2px solid rgba(255,255,255,0.15);';
  }
  if(s) s.innerHTML=''; if(d) d.style.display='none';
}

// ─── KAMERA ──────────────────────────────────────────────────
let ilacStream=null;
async function ilacKameraAc(){
  const v=document.getElementById('ilac-video'), ph=document.getElementById('kamera-placeholder');
  const kb=document.getElementById('kamera-butonlari'), kk=document.getElementById('kamera-kaydet-buton');
  try {
    ilacStream=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:'environment'},width:{ideal:1920},height:{ideal:1080}}});
    v.srcObject=ilacStream; v.style.display='block';
    if(ph) ph.style.display='none'; if(kb) kb.style.display='none'; if(kk) kk.style.display='block';
  } catch(err){ ilacOcrDurum('⚠️ Kamera erişimi reddedildi. Galeriden Seç ile devam edebilirsiniz.','hata'); }
}
function ilacKameraKapat(){
  if(ilacStream){ilacStream.getTracks().forEach(t=>t.stop());ilacStream=null;}
  const v=document.getElementById('ilac-video'), c=document.getElementById('ilac-canvas');
  const ph=document.getElementById('kamera-placeholder'), kb=document.getElementById('kamera-butonlari'), kk=document.getElementById('kamera-kaydet-buton');
  if(v){v.srcObject=null;v.style.display='none';} if(c) c.style.display='none';
  if(ph) ph.style.display='block'; if(kb) kb.style.display='grid'; if(kk) kk.style.display='none';
}
function ilacKameraFotoSec(){
  const v=document.getElementById('ilac-video'), c=document.getElementById('ilac-canvas');
  if(!v||!c) return;
  c.width=v.videoWidth||640; c.height=v.videoHeight||480;
  c.getContext('2d').drawImage(v,0,0,c.width,c.height);
  ilacKameraKapat(); c.style.display='block';
  const ph=document.getElementById('kamera-placeholder'), kb=document.getElementById('kamera-butonlari');
  if(ph) ph.style.display='none'; if(kb) kb.style.display='none';
  c.toBlob(blob=>ilacOcrBaslat(blob),'image/jpeg',0.92);
}
function ilacGaleriden(){ const i=document.getElementById('ilac-file-input'); if(i) i.click(); }
function ilacDosyaSecildi(e){
  const f=e.target.files[0]; if(!f) return;
  const c=document.getElementById('ilac-canvas'), ph=document.getElementById('kamera-placeholder'), kb=document.getElementById('kamera-butonlari');
  const r=new FileReader();
  r.onload=function(ev){
    const img=new Image();
    img.onload=function(){
      if(c){c.width=img.width;c.height=img.height;c.getContext('2d').drawImage(img,0,0);c.style.display='block';}
      if(ph) ph.style.display='none'; if(kb) kb.style.display='none';
      ilacOcrBaslat(f);
    };
    img.src=ev.target.result;
  };
  r.readAsDataURL(f);
}

// ─── OCR ─────────────────────────────────────────────────────
async function ilacOcrBaslat(gorsel){
  ilacOcrDurum('🔍 Görüntü analiz ediliyor...','bilgi');
  const sd=document.getElementById('ilac-sonuclar'); if(sd) sd.innerHTML='';
  if(typeof Tesseract==='undefined'){
    ilacOcrDurum('⏳ OCR motoru yükleniyor...','bilgi');
    await new Promise((res,rej)=>{const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/tesseract.js@4/dist/tesseract.min.js';s.onload=res;s.onerror=rej;document.head.appendChild(s);});
  }
  try{
    ilacOcrDurum('🔍 Metin okunuyor... (%0)','bilgi');
    const{data:{text}}=await Tesseract.recognize(gorsel,'tur+eng',{logger:m=>{if(m.status==='recognizing text') ilacOcrDurum('🔍 Metin okunuyor... (%'+Math.round(m.progress*100)+')','bilgi');}});
    ilacOcrDurum('','gizle');
    if(!text||text.trim().length<3){ilacSonucGoster([],'Görüntüden metin okunamadı. Daha net fotoğraf çekin veya "İsim ile Ara" kullanın.');return;}
    ilacSonucGoster(ilacAra(text.trim()),null,text.trim());
  }catch(err){ilacOcrDurum('❌ Analiz sırasında hata oluştu. Tekrar deneyin.','hata');}
  if(sd){const btn=document.createElement('button');btn.textContent='🔄 Yeni Fotoğraf Çek';btn.onclick=function(){ilacKameraKapat();const c=document.getElementById('ilac-canvas');if(c)c.style.display='none';const ph=document.getElementById('kamera-placeholder');if(ph)ph.style.display='block';const kb=document.getElementById('kamera-butonlari');if(kb)kb.style.display='grid';const d=document.getElementById('ilac-ocr-durum');if(d)d.style.display='none';sd.innerHTML='';};btn.style.cssText='width:100%;margin-top:16px;padding:14px;border-radius:12px;border:none;background:rgba(255,255,255,0.1);color:white;font-size:14px;font-weight:600;cursor:pointer;';sd.appendChild(btn);}
}
function ilacMetinAra(d){const el=document.getElementById('ilac-sonuclar');if(!el)return;if(!d||d.trim().length<2){el.innerHTML='';return;}ilacSonucGoster(ilacAra(d));}

// ─── SONUÇ GÖSTERME ──────────────────────────────────────────
function ilacSonucGoster(bulunanlar,hataMesaji,okunanMetin){
  const div=document.getElementById('ilac-sonuclar'); if(!div) return;
  let html='';
  if(okunanMetin){const k=okunanMetin.substring(0,120).replace(/\n/g,' ');html+=`<div style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:10px 14px;margin-bottom:14px;"><div style="color:#64748b;font-size:11px;font-weight:600;margin-bottom:4px;text-transform:uppercase;">📝 Okunan Metin</div><div style="color:#94a3b8;font-size:12px;line-height:1.4;font-style:italic;">"${k}${okunanMetin.length>120?'...':''}"</div></div>`;}
  if(hataMesaji||!bulunanlar||bulunanlar.length===0){html+=`<div style="background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.3);border-radius:14px;padding:20px;text-align:center;"><div style="font-size:36px;margin-bottom:10px;">🔎</div><div style="color:#fca5a5;font-size:14px;font-weight:600;">${hataMesaji||'İlaç bulunamadı'}</div><div style="color:#94a3b8;font-size:12px;margin-top:6px;">Farklı yazım veya etken madde adı ile deneyin</div></div>`;div.innerHTML=html;return;}
  html+=`<div style="color:#94a3b8;font-size:12px;font-weight:600;margin-bottom:10px;text-align:center;">${bulunanlar.length} ilaç bilgisi bulundu</div>`;
  bulunanlar.forEach(ilac=>{
    const endHtml=ilac.endikasyonlar.map(e=>`<div style="display:flex;align-items:flex-start;gap:8px;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.06);"><span style="color:#34d399;font-size:12px;flex-shrink:0;margin-top:1px;">✓</span><span style="color:#e2e8f0;font-size:13px;line-height:1.4;">${e}</span></div>`).join('');
    const uyHtml=ilac.uyarilar.map(u=>`<div style="display:flex;align-items:flex-start;gap:8px;padding:8px 10px;background:rgba(239,68,68,0.1);border-radius:8px;margin-bottom:6px;border-left:3px solid #ef4444;"><span style="color:#f87171;font-size:14px;flex-shrink:0;">⚠️</span><span style="color:#fca5a5;font-size:12px;line-height:1.4;">${u}</span></div>`).join('');
    html+=`<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-top:3px solid ${ilac.renk};border-radius:16px;margin-bottom:16px;overflow:hidden;">
      <div style="padding:14px 16px 12px;background:linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02));border-bottom:1px solid rgba(255,255,255,0.08);">
        <div style="font-size:16px;font-weight:800;color:white;margin-bottom:6px;">${ilac.baslik}</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;">
          <span style="background:${ilac.renk}22;border:1px solid ${ilac.renk}44;color:${ilac.renk};padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;">${ilac.sinif}</span>
          ${ilac.grup?`<span style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);color:#94a3b8;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600;">${ilac.grup}</span>`:''}
        </div>
      </div>
      <div style="padding:12px 16px 8px;"><div style="color:#64748b;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:8px;">🏥 Kullanım Alanları</div>${endHtml}</div>
      <div style="margin:0 16px 12px;background:rgba(59,130,246,0.1);border:1px solid rgba(59,130,246,0.25);border-radius:10px;padding:11px 14px;">
        <div style="color:#64748b;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:5px;">💉 Doz</div>
        <div style="color:#93c5fd;font-size:13px;font-weight:600;white-space:pre-line;line-height:1.5;">${ilac.doz}</div>
      </div>
      ${ilac.uyarilar.length>0?`<div style="padding:0 16px 14px;"><div style="color:#64748b;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:8px;">⚠️ Uyarılar</div>${uyHtml}</div>`:''}
    </div>`;
  });
  div.innerHTML=html;
}

// ─── DURUM MESAJI ─────────────────────────────────────────────
function ilacOcrDurum(mesaj,tip){
  const el=document.getElementById('ilac-ocr-durum'); if(!el) return;
  if(tip==='gizle'||!mesaj){el.style.display='none';return;}
  el.textContent=mesaj;
  if(tip==='hata'){el.style.background='rgba(239,68,68,0.15)';el.style.borderColor='rgba(239,68,68,0.3)';el.style.color='#fca5a5';}
  else{el.style.background='rgba(59,130,246,0.15)';el.style.borderColor='rgba(59,130,246,0.3)';el.style.color='#93c5fd';}
  el.style.display='block';
}
// ─── SON ─────────────────────────────────────────────────────
