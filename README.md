# Akıllı Alışveriş Listesi — PWA

Mobil uyumlu, macOS/iPadOS estetiğinde (açık tema, glassmorphism) alışveriş listesi uygulaması. Tamamen cihazda çalışır; veriler tarayıcının yerel hafızasında (localStorage) saklanır.

## Özellikler
- Ürün ekle / düzenle (kalem) / sil (çöp) — alışveriş sırasında anlık yönetim
- Ürün satırına dokununca **alındı** olarak işaretleme (üzeri çizilir)
- **Alışverişi Tamamla** → isteğe bağlı toplam tutar → geçmişe bugünün tarihiyle kayıt
- **Geçmiş:** tarih, ürünler ve (girildiyse) toplam tutar
- **Tekrar Yükle:** eski bir kaydı yeni aktif liste olarak açar; tamamlanınca eski kaydı bozmadan yeni kayıt oluşur
- **PDF İndir:** her kaydı PDF olarak indir (html2pdf.js; yüklenemezse tarayıcının "PDF olarak kaydet" yazdırması devreye girer)
- **PWA:** telefona kurulabilir, çevrimdışı çalışır

## Paket içeriği
```
index.html            → uygulama (HTML + CSS + JS birleşik)
manifest.json         → PWA tanımı
sw.js                 → service worker (çevrimdışı)
icon.svg / icon-*.png → ikonlar
apple-touch-icon.png  → iOS ana ekran ikonu
```

## Telefona kurulum (GitHub Pages)
1. github.com/EMRECAN-1907 hesabında yeni bir **public** repo aç, "Add a README file" işaretli.
2. Bu paketteki **tüm dosyaları** repoya yükle (Add file → Upload files → Commit).
3. Settings → Pages → Source: **Deploy from a branch** → Branch: `main` / `/(root)` → Save.
4. 1–2 dk sonra: `https://emrecan-1907.github.io/<repo>/`
5. **Android (Chrome):** ⋮ → Uygulamayı yükle. **iOS (Safari):** Paylaş → Ana Ekrana Ekle.

> Güncelleme yaptığında `sw.js` içindeki `alisveris-v1` → `v2` yap; yoksa telefon eski sürümü önbellekten gösterir.

## Not
- PDF kütüphanesi CDN'den yüklenir; ilk açılışta internet gerekir, sonra service worker onu da önbelleğe alır.
- Veriler cihaza özeldir; tarayıcı verisini temizlersen geçmiş silinir. (İstersen ileride dışa/içe aktarma yedeği eklenebilir.)
