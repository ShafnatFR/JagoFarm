# Product Requirements Document (PRD)
<!--
  Template ini dirancang sebagai source of truth untuk project aplikasi.
  Dibaca oleh AI coding assistant (Cline, Cursor, Claude) dan tim developer.
  Hapus semua komentar setelah template selesai diisi.
  Versi: 3.0 — Full Edition
-->

---

## Document Info

| Field | Value |
|-------|-------|
| **Project Name** | `JagoFarm` |
| **Version** | `v1.0` |
| **Status** | `In Review` |
| **Author** | `Tim JagoFarm & Antigravity AI` |
| **Team** | `JagoFarm Engineering & Product Team` |
| **Created** | `10/07/2026` |
| **Last Updated** | `10/07/2026` |
| **Target Launch** | `Q4 2026` |

---

## 1. Overview

### 1.1 Problem Statement

> Mayoritas peternak dan petani di Indonesia menghadapi biaya input (pakan ternak dan pupuk kimia) yang terus melonjak hingga 60-70% dari total biaya operasional, serta minimnya sistem pemantauan kondisi lingkungan secara real-time. Akibatnya, tingkat mortalitas ternak tinggi, kualitas panen fluktuatif, dan limbah organik buangan terbuang sia-sia mencemari lingkungan karena belum terintegrasi dengan ekosistem sirkular modern.

**Core Pain Points:**
- **Biaya Pakan & Pupuk Sangat Tinggi:** Peternak ikan/ayam dan petani sangat bergantung pada pakan komersial dan pupuk kimia yang mahal serta rentan fluktuasi harga pasar.
- **Minimnya Real-Time Visibility & Pemantauan Presisi:** Ketergantungan pada pengecekan manual menyebabkan keterlambatan dalam mendeteksi penurunan kualitas air kolam (pH, DO) atau anomali suhu/kelembapan greenhouse, memicu mortalitas dan gagal panen.
- **Limbah Organik Tidak Terkelola (Linear Farming):** Sisa panen, limbah organik sayuran, dan air buangan kolam terbuang tanpa dimanfaatkan kembali menjadi sumber daya baru yang bernilai ekonomis.
- **Akses Pasar & Manajemen Data Terfragmentasi:** Petani/peternak kesulitan memantau riwayat produksi, efisiensi konversi pakan (FCR), dan mendistribusikan produk berkualitas tinggi langsung ke pembeli/mitra komersial.

### 1.2 Proposed Solution

JagoFarm adalah platform terintegrasi **Ekosistem Pangan Sirkular & Smart Farming berbasis AI dan IoT** yang menghubungkan siklus pengolahan limbah organik (melalui budidaya *maggot* BSF sebagai pakan protein tinggi dan pupuk cair alami), manajemen air kolam sirkular (akuaponik), dan otomasi pemantauan lingkungan farm secara *real-time*. Platform ini dihadirkan melalui aplikasi mobile & web SaaS yang dilengkapi dashboard analitik AI untuk prediksi panen dan deteksi anomali, serta *marketplace* produk pertanian & peternakan premium.

### 1.3 Value Proposition

| Untuk | Yang | Kami menawarkan | Tidak seperti | Karena |
|-------|-------|-----------------|---------------|--------|
| Petani modern, peternak ikan/ayam, dan agropreneur | Menghadapi tingginya biaya pakan/pupuk dan risiko mortalitas tinggi | **JagoFarm Ecosystem & Smart Monitoring App** | Platform monitoring konvensional yang terpisah atau budidaya tradisional | Kami memadukan **teknologi sensor IoT real-time, prediksi AI**, dan **ekosistem sirkular zero-waste** yang menurunkan biaya input sekaligus meningkatkan yield hingga 30%+ |

### 1.4 Competitive Landscape

| Kompetitor | Kelebihan Mereka | Kelemahan Mereka | Differensiasi Kita |
|-----------|-----------------|-----------------|-------------------|
| **Penyedia IoT Pertanian Konvensional** | Hardware sensor teruji untuk satu jenis tanaman (misal khusus green house atau khusus kolam ikan) | Hanya menyediakan data sensor linear tanpa solusi penurunan biaya pakan/pupuk berbasis ekosistem sirkular | **Full-Stack Circular Ecosystem:** Menggabungkan otomasi IoT dengan integrasi maggot BSF, pupuk cair alami, dan sirkulasi air akuaponik |
| **Aplikasi Manajemen Farm (Agri-Tech general)** | Fitur pencatatan keuangan dan jadwal panen cukup lengkap | Tidak terhubung langsung ke sensor perangkat keras (IoT) secara real-time dan tidak memfasilitasi siklus zero-waste | **Hardware-Software Integration + AI Analytics:** Data sensor otomatis dianalisis AI untuk memberikan rekomendasi tindakan, deteksi anomali, & prediksi panen 98% |
| **Pencatatan Manual / Excel & Farming Tradisional** | Tanpa biaya subscription, sudah familiar bagi mayoritas petani konvensional | Sangat rawan kesalahan (error-prone), tidak ada peringatan dini (no alerts), tidak real-time, dan biaya input tidak efisien | **Otomasi & Peringatan Dini (Smart Alerts):** Notifikasi instan saat parameter air/suhu kritis, penghematan pakan alami, & peningkatan margin laba |

**Positioning Statement:**
> "JagoFarm adalah platform *Smart Farming & Circular Agri-Ecosystem* untuk petani dan peternak modern yang ingin menurunkan biaya produksi dan meningkatkan hasil panen berkualitas tinggi, tidak seperti penyedia IoT tunggal atau cara konvensional yang boros biaya dan minim pengawasan, kami memadukan pemantauan IoT real-time, analitik AI presisi, dan siklus zero-waste terintegrasi."

### 1.5 Monetization Model

**Model Bisnis:** `Freemium` + `Subscription (SaaS)` + `Hardware / Product Commerce`

| Tier | Harga | Fitur yang Diakses | Batasan |
|------|-------|-------------------|---------|
| **Free (Petani Pemula)** | Gratis | Pencatatan manual produksi, akses katalog & marketplace JagoFarm, panduan dasar ekosistem sirkular | Max 1 project farm, max 50 catatan log/bulan, tanpa koneksi sensor IoT live |
| **Starter (Smart Farm)** | Rp 149.000 / bulan | Semua fitur Free + koneksi hingga 5 sensor keras IoT live, notifikasi alert real-time, grafik riwayat 30 hari | Max 3 kolam/greenhouse, max 5 user/mitra |
| **Pro (Circular Ecosystem)** | Rp 399.000 / bulan | `[PAID]` Semua fitur Starter + koneksi sensor IoT unlimited, AI Harvest Prediction & Anomaly Detection, kalkulator konversi maggot & nutrisi sirkular, export laporan PDF/Excel | Unlimited kolam/greenhouse, priority support |
| **Enterprise / B2B Mitra** | Custom / Revenue Share | Full instalasi hardware IoT JagoFarm, pendampingan agronomis, integrasi sistem suplemen pakan/pupuk sirkular, dedicated SLA | Custom hardware & dashboard khusus |

**Revenue Assumptions:**
- Target MRR bulan ke-6: Rp 75.000.000 (gabungan subscription SaaS & penjualan paket sensor IoT/produk farm)
- Target paying customer bulan ke-3: 150 customer (petani/mitra aktif)
- Expected conversion Free-to-Paid: 12%

**Catatan untuk Feature Gating:**
- Fitur analitik AI, riwayat data > 30 hari, dan koneksi sensor IoT > 5 device di-flag di Feature List dengan label `[PAID]`
- Paywall UI terintegrasi ke dalam dashboard monitoring MVP — user yang mencoba mengakses AI Harvest Prediction atau Export Laporan diarahkan ke halaman upgrade Langganan Pro.

### 1.6 Assumptions

| ID | Asumsi | Dampak jika Salah | Verifikasi By |
|----|--------|-------------------|---------------|
| A-01 | Petani & peternak mitra di lapangan mayoritas menggunakan smartphone Android di area farm | Harus memprioritaskan optimasi Progressive Web App (PWA) atau aplikasi ringan hemat kuota | Survey lapangan mitra JagoFarm |
| A-02 | Area greenhouse dan kolam ikan memiliki konektivitas internet (Cellular 4G atau Wi-Fi local gateway) minimal untuk pengiriman data IoT | Perlu menambahkan modul *Edge Storage / Offline Caching* pada gateway IoT agar data tersimpan saat offline dan sync saat online | Uji coba konektivitas lokasi pilot farm |
| A-03 | Penggunaan pakan maggot BSF dan pupuk cair alami terbukti secara teknis dapat menggantikan minimal 30-50% pakan/pupuk komersial tanpa menurunkan bobot/kualitas panen | Margin penghematan biaya user lebih kecil dari klaim, perlu penyesuaian formulasi pakan sirkular | Uji klinis agronomis & data panen internal |
| A-04 | User bersedia membayar biaya langganan bulanan (SaaS) apabila terbukti perangkat IoT dan dashboard membantu menurunkan mortalitas dan menghemat biaya input | Perlu menyesuaikan skema bundling (jual beli produk hasil panen / pakan sebagai pengganti biaya SaaS) | Wawancara mendalam & *pilot testing* B2B |
| A-05 | Ketersediaan API pihak ketiga (payment gateway Midtrans, WhatsApp Business Alert, dan OpenAI/LLM API) stabil dan sesuai anggaran | Perlu disiapkan mekanisme *fallback / retry* untuk notifikasi alert (FCM + SMS/WA) dan pembatasan kuota token AI | Load testing & monitoring biaya API |

---

## 2. Goals & Success Metrics

### 2.1 Goals (In Scope)

- [ ] **Efisiensi Biaya Input:** Mengurangi biaya operasional pakan dan pupuk bagi petani/peternak mitra hingga minimal 30% dalam 6 bulan pertama implementasi ekosistem sirkular JagoFarm (maggot BSF & pupuk cair alami).
- [ ] **Pemantauan Real-Time Presisi:** Menyediakan pemantauan kondisi lingkungan farm berbasis sensor IoT (suhu, kelembapan, intensitas cahaya, pH kolam, DO/oksigen terlarut, dan otomatisasi pakan) dengan latensi pengiriman data di bawah 3 detik.
- [ ] **Prediksi & Peringatan Dini AI:** Membangun dashboard analitik AI (*Harvest Prediction & Anomaly Alert*) dengan tingkat akurasi prediksi minimal 95% guna menekan angka mortalitas ternak dan gagal panen hingga di bawah 2%.
- [ ] **Kinerja Sirkular & Zero-Waste:** Mendaur ulang minimal 1.000.000 liter air kolam per hari via sistem akuaponik dan mengelola minimal 50 ton limbah organik per bulan menjadi maggot dan pupuk organik di seluruh jaringan mitra JagoFarm.

### 2.2 Non-Goals (Out of Scope)

- **Manufaktur Chip/Microcontroller Internal:** Pembuatan chip perangkat keras sensor IoT dari nol tidak dilakukan pada MVP (menggunakan modul sensor standar industri bersertifikasi berbasis ESP32/LoRaWAN yang diprogram ulang dan dikalibrasi oleh tim JagoFarm).
- **Logistik & Cold-Chain Fleet Sendiri:** Layanan armada pengiriman fisik dan *cold-chain storage* milik sendiri ditunda ke fase berikutnya (di MVP integrasi pengiriman produk dilakukan via kurir logistik pihak ketiga / 3PL API).
- **Transaksi Cryptocurrency / Valas:** Platform tidak mendukung pembayaran menggunakan *crypto* atau valuta asing internasional pada MVP (pembayaran disentralisasi menggunakan IDR via Midtrans / QRIS / Virtual Account bank lokal).

### 2.3 MVP Boundary

#### Yang MASUK MVP (harus selesai sebelum launch):

| Feature | Alasan Masuk MVP |
|---------|-----------------|
| **Authentication & Role Access** | Gate utama pemisah hak akses antara Petani/Mitra, Agronomis JagoFarm, dan Admin sistem |
| **Real-Time IoT Dashboard** | Core value utama untuk pemantauan live suhu, kelembapan, pH, DO, & jadwal pakan di kolam/greenhouse |
| **Circular Ecosystem Log** | Pencatatan alur limbah organik masuk, produksi maggot BSF, penghematan pakan komersial, & aplikasi pupuk cair |
| **Smart Alerting System** | Notifikasi instan via Push Notif & WhatsApp saat parameter air/suhu melewati ambang batas kritis |
| **E-Commerce / Katalog Produk** | Marketplace komersil untuk penjualan produk JagoFarm (Melon Premium, Sayuran Hijau, Ayam/Telur, Ikan, & Sensor IoT) |
| **Paywall / Upgrade UI** | Wajib untuk konversi monetisasi tier Starter & Pro (SaaS subscription billing) |

#### Yang TIDAK masuk MVP (ditunda ke iterasi berikutnya):

| Feature | Alasan Ditunda | Target Fase |
|---------|---------------|-------------|
| **Drone Aerial Crop Monitoring** | Membutuhkan integrasi perangkat keras drone spesifik dan pemrosesan citra berat | Phase 3 |
| **Automated Blockchain Traceability** | Fitur verifikasi jejak organik di blockchain bersifat nice-to-have untuk ekspor B2B premium | Phase 3 |
| **Multi-language Support (EN/CN)** | Target user awal 100% berada di Indonesia sehingga fokus bahasa Indonesia (ID) | Phase 2 |

> **Aturan MVP:** Fitur baru yang muncul saat development otomatis masuk backlog Phase 2
> kecuali ada approval eksplisit dari Product Owner disertai trade-off yang jelas (fitur lain keluar).

### 2.4 Product Metrics (Business KPI)

| Metrik | Baseline | Target (30 hari) | Target (90 hari) | Cara Ukur |
|--------|----------|------------------|------------------|-----------|
| Daily Active Users (DAU) | 0 | 300 user | 1.500 user | Firebase Analytics / Mixpanel |
| Monthly Active Users (MAU) | 0 | 1.000 user | 5.000 user | Firebase Analytics / Mixpanel |
| Retention Rate (D7) | 0% | > 45% | > 60% | Cohort analysis |
| Feature Adoption Rate (IoT & Circular Log) | 0% | > 50% | > 75% | Event tracking (`iot_view_live`, `log_circular`) |
| Activation Rate (Setup 1 Kolam/Greenhouse) | 0% | > 40% | > 65% | Funnel tracking |
| Churn Rate | 0% | < 8% | < 5% | Subscription analytics |
| NPS Score | 0 | > 45 | > 60 | In-app survey (petani & mitra) |
| MRR (SaaS + Hardware Bundling) | Rp 0 | Rp 15.000.000 | Rp 75.000.000 | Midtrans / Payment dashboard |
| Free-to-Paid Conversion | 0% | > 8% | > 12% | Funnel tracking |

### 2.5 Technical Metrics (Engineering KPI)

| Metrik | Target | Cara Ukur |
|--------|--------|-----------|
| API Response Time (p50) | < 120ms | APM / structured logging (FastAPI middleware) |
| API Response Time (p95) | < 350ms | APM / structured logging |
| API Response Time (p99) | < 800ms | APM / structured logging |
| IoT Telemetry Ingestion Latency | < 1 detik | MQTT Broker timestamp vs DB insert time |
| App Crash Rate | < 0.05% | Sentry / Firebase Crashlytics |
| App / PWA Cold Start Time | < 2.5 detik | Chrome DevTools / Lighthouse / Mobile Profiler |
| API Error Rate (5xx) | < 0.2% | Server monitoring & Sentry alerts |
| Test Coverage (Unit & Service) | > 75% | pytest-cov (backend) & vitest (frontend) |
| Build Success Rate (CI) | > 98% | GitHub Actions CI workflow |
| Backend & MQTT Broker Uptime | > 99.8% | UptimeRobot / Prometheus monitoring |
| DB Query Time (avg) | < 50ms | PostgreSQL slow query log |

---

## 3. User & Stakeholder

### 3.1 Target Users

#### Persona 1: Pak Hendra (Peternak Ikan & Ayam Mitra JagoFarm)
```
Nama         : Pak Hendra
Umur         : 42 tahun
Pekerjaan    : Pemilik peternakan ikan gurame/lele dan kandang ayam petelur di Jawa Barat
Tech Savvy   : Medium (terbiasa dengan WhatsApp, YouTube, dan m-Banking)
Goals        : Menurunkan pengeluaran biaya pakan yang terus meningkat, mencegah kematian massal ikan/ayam akibat cuaca ekstrem, dan mendapatkan pembeli tetap dengan harga wajar.
Frustrations : Pengecekan kolam manual melelahkan, peringatan kualitas air sering terlambat hingga ikan sudah mati mengambang, harga pakan pabrik yang mencekik margin.
Device       : Android Smartphone (Xiaomi / Samsung mid-range, koneksi 4G)
Context      : Digunakan langsung di area farm/kolam berkala 3-4 kali sehari saat jadwal pemberian pakan dan pengecekan sensor air.
```

#### Persona 2: Rina (Agropreneur & Pengelola Greenhouse Melon Premium)
```
Nama         : Rina
Umur         : 29 tahun
Pekerjaan    : Founder modern greenhouse melon premium & sayuran hidroponik di Banten
Tech Savvy   : High (terbiasa dengan dashboard SaaS, spreadsheet modern, dan e-commerce)
Goals        : Memaksimalkan tingkat kemanisan (Brix > 14) melon, menjaga stabilitas suhu & kelembapan greenhouse 24/7 secara otomatis, dan memberikan jaminan kualitas serta traceability organik kepada buyer supermarket super-premium.
Frustrations : Data sensor dari berbagai alat tidak terkumpul dalam satu dashboard terpusat, analitik prediksi masa panen masih manual di Excel, kurangnya dokumentasi sirkular zero-waste untuk kampanye marketing.
Device       : Laptop / iPad / iPhone high-end
Context      : Digunakan di kantor pengelola farm untuk analisis data harian dan dipantau secara remote dari rumah saat malam hari atau akhir pekan.
```

### 3.2 Stakeholders

| Role | Nama/Tim | Kepentingan |
|------|----------|-------------|
| Product Owner | Shafnat (Lead PO) | Decision maker prioritas fitur roadmap, kepuasan mitra petani, dan pencapaian target MRR |
| Tech Lead & AI Specialist | Tim Engineering JagoFarm | Arsitektur cloud, skalabilitas ingestion MQTT IoT, akurasi model AI, dan stabilitas API |
| Full-Stack Developer | Tim Dev JagoFarm | Implementasi frontend React/Vite, aplikasi mobile Flutter, dan backend FastAPI |
| Agronomis & Hardware Specialist | Tim Agronomi JagoFarm | Kalibrasi sensor IoT, standar nutrisi pakan maggot BSF, dan validasi agronomi model AI |
| QA Engineer | Tim QA JagoFarm | Quality assurance pengujian skenario otomatisasi IoT alert dan transaksi e-commerce |
| Mitra Petani & Investor | Komunitas & Investor | ROI implementasi sistem JagoFarm, kemudahan adopsi di lapangan, dan margin laba panen |

### 3.3 RACI Matrix

| Aktivitas | Product Owner | Tech Lead | Developer | Agronomis / Hardware | QA |
|-----------|:---:|:---:|:---:|:---:|:---:|
| Mendefinisikan requirements & SOP agronomis | A | C | C | C | I |
| Prioritas fitur & penentuan batas MVP scope | A | C | I | C | I |
| Keputusan arsitektur cloud, IoT broker, & DB | C | A | C | C | I |
| Pemilihan tech stack & sensor hardware | C | A | C | C | I |
| Implementasi backend FastAPI & MQTT ingestion | I | C | A | I | I |
| Implementasi frontend React/Vite & Flutter app | I | C | A | I | I |
| Kalibrasi sensor fisik & uji coba nutrisi sirkular | C | I | I | A | I |
| Code review & arsitektur review | I | A | R | I | I |
| Testing automated, load test, & QA manual | I | C | C | I | A |
| Deployment ke staging & kalibrasi device pilot | I | A | R | C | C |
| Deployment ke production cloud | A | C | R | I | C |
| Dokumentasi API & panduan pemasangan sensor | I | C | A | C | I |
| Demo & on-boarding ke petani mitra | A | C | I | C | I |

---

## 4. Features & Requirements

### 4.1 Feature Priority (MoSCoW)

| Priority | Label | Arti |
|----------|-------|------|
| P0 | **Must Have** | Wajib ada — tanpa ini MVP tidak bisa dirilis |
| P1 | **Should Have** | Penting, tapi bisa dirilis tanpa ini di fase pertama |
| P2 | **Could Have** | Nice-to-have, masuk backlog setelah MVP |
| P3 | **Won't Have** | Di-skip untuk saat ini |

### 4.2 Feature List

| ID | Feature | Priority | Tier | Status | PIC | Notes |
|----|---------|----------|------|--------|-----|-------|
| F-01 | Authentication & Role Based Access | P0 | Free | Todo | Tim Dev | Email + Google OAuth, pemisahan Role Petani, Agronomis, & Admin |
| F-02 | Real-Time IoT Monitoring Dashboard | P0 | Free / Starter | Todo | Tim Dev | Live telemetry suhu, kelembapan, cahaya, pH kolam, & DO oksigen |
| F-03 | Circular Ecosystem Log & Resource Calculator | P0 | Free / Starter | Todo | Tim Dev | Log limbah masuk, panen maggot BSF, dan subtitusi pakan/pupuk |
| F-04 | Smart Alerting System (Push & WA Notification) | P0 | Starter | Todo | Tim Dev | Peringatan instan jika parameter air/greenhouse kritis |
| F-05 | AI Harvest Prediction & Anomaly Detection | P0 | Pro | Todo | Tim Dev | `[PAID]` Prediksi panen akurasi 98% dan rekomendasi tindakan AI |
| F-06 | Marketplace & E-Commerce Katalog JagoFarm | P0 | Free | Todo | Tim Dev | Katalog jual beli Melon, Sayuran, Ikan, Ayam/Telur, & Sensor IoT |
| F-07 | Paywall UI & Subscription Billing | P0 | - | Todo | Tim Dev | Wajib untuk aktivasi langganan Starter & Pro (Midtrans API) |
| F-08 | Export Laporan Agronomi & Keuangan Sirkular | P1 | Pro | Backlog | Tim Dev | `[PAID]` Export otomatis ke PDF dan Excel untuk pelaporan mitra |

### 4.3 Functional Requirements

#### F-01: Authentication & Role Based Access
**Deskripsi:** User bisa register, login, logout, dan sistem membedakan akses berdasarkan peran (Petani/Mitra, Agronomis, dan Admin).

**Requirements:**
- [ ] User bisa register dengan email/password atau login cepat via Google OAuth
- [ ] Session tersimpan aman (auto-login) selama 7 hari via refresh token rotation
- [ ] Reset password melalui link validasi via email
- [ ] Role `user` (petani/mitra) hanya bisa mengakses data farm milik sendiri
- [ ] Role `agronomist` bisa memantau data seluruh mitra untuk konsultasi teknis
- [ ] Password wajib di-hash dengan bcrypt (cost factor >= 12)

**Acceptance Criteria:**
```gherkin
Scenario: Login berhasil sebagai petani mitra
  GIVEN user sudah terdaftar dengan email valid dan role "user"
  WHEN user memasukkan email dan password yang benar
  THEN user diarahkan ke halaman Dashboard Farm milik user
  AND access token dan refresh token disimpan secara aman

Scenario: Login gagal akibat credentials salah
  GIVEN user memasukkan password yang tidak sesuai
  WHEN user tap tombol login
  THEN muncul error message "Email atau password tidak valid"
  AND user tetap berada di halaman login

Scenario: Lockout setelah percobaan berulang
  GIVEN user sudah gagal login 5 kali berturut-turut
  WHEN user mencoba login kembali
  THEN akun terkunci sementara selama 15 menit
  AND user mendapat email peringatan keamanan

Scenario: Token rotation saat refresh
  GIVEN access token user sudah expired (1 jam)
  WHEN client mengirimkan refresh token ke endpoint /auth/refresh
  THEN sistem menerbitkan access token & refresh token baru sekaligus membatalkan token lama
```

---

#### F-02: Real-Time IoT Monitoring Dashboard
**Deskripsi:** Menampilkan data telemetry sensor lapangan (greenhouse & kolam ikan) secara live dan visual grafik interaktif.

**Requirements:**
- [ ] Menerima dan menampilkan data telemetri live via WebSocket / Polling (Suhu, Kelembapan, pH, DO, Intensitas Cahaya)
- [ ] Menampilkan status node perangkat IoT (Online / Offline / Low Battery)
- [ ] Menyediakan grafik riwayat pembacaan sensor (24 jam untuk Free, 30 hari untuk Starter, Unlimited untuk Pro)
- [ ] Opsi filter visualisasi berdasarkan lokasi farm/kolam

**Acceptance Criteria:**
```gherkin
Scenario: Pembacaan sensor live masuk dari broker MQTT
  GIVEN perangkat sensor IoT aktif dan mengirim telemetri ke MQTT broker
  WHEN dashboard terbuka di browser atau aplikasi mobile user
  THEN kartu metrik (misal: Suhu Kolam 28°C, pH 7.2) terupdate secara real-time tanpa reload halaman

Scenario: Perangkat sensor offline atau terputus koneksinya
  GIVEN perangkat IoT tidak mengirimkan detak jantung (heartbeat) selama lebih dari 5 menit
  WHEN user melihat daftar perangkat di dashboard
  THEN status perangkat berubah menjadi badge merah "Offline"
  AND sistem memunculkan tooltip waktu terakhir aktif (Last Seen)
```

---

#### F-03: Circular Ecosystem Log & Resource Calculator
**Deskripsi:** Modul pencatatan sirkular dan kalkulator penghematan biaya dari pemanfaatan maggot BSF serta pupuk cair alami.

**Requirements:**
- [ ] Form pencatatan input limbah organik (kg), hasil panen maggot (kg), dan produksi pupuk cair (liter)
- [ ] Kalkulator otomatis penghematan biaya berdasar rasio substitusi pakan komersial dan pupuk kimia
- [ ] Indikator grafik kontribusi sirkular (Zero-Waste Index %) untuk tiap farm mitra

**Acceptance Criteria:**
```gherkin
Scenario: Peternak mencatat input limbah dan panen maggot bulanan
  GIVEN peternak berada di modul Circular Log
  WHEN user memasukkan input 100 kg limbah sayuran dan menghasilkan 25 kg maggot basah
  THEN sistem menyimpan log dan menghitung penghematan setara Rp 375.000 pakan ikan komersial
  AND Zero-Waste Index pada dashboard mitra bertambah sesuai rasio pengolahan
```

---

#### F-05: AI Harvest Prediction & Anomaly Detection (`[PAID]`)
**Deskripsi:** Analitik cerdas berbasis AI untuk memprediksi tanggal optimal panen, estimasi bobot/Brix, serta deteksi anomali kesehatan ternak/tanaman.

**Requirements:**
- [ ] Memproses data tren sensor IoT (suhu/pH) + riwayat pemberian pakan untuk menghitung estimasi masa panen
- [ ] Memberikan skor akurasi prediksi (misal: "Prediksi Panen Melon: 14 hari lagi, Kualitas Brix 14.5 (98% confidence)")
- [ ] Memicu alert AI otomatis jika pola data menunjukkan gejala penyakit (misal DO drop cepat + konsumsi pakan menurun pada ikan)

**Acceptance Criteria:**
```gherkin
Scenario: User tier Pro melihat rekomendasi AI di dashboard
  GIVEN user berlangganan tier Pro dan memiliki data sensor minimal 14 hari
  WHEN user membuka tab AI Analytics
  THEN sistem menampilkan prediksi tanggal panen dan estimasi bobot total panen
  AND memunculkan saran tindakan agronomis ("Tingkatkan aerasi malam hari sebesar 20%")

Scenario: User tier Free atau Starter mencoba mengakses fitur AI
  GIVEN user dengan langganan tier Free atau Starter
  WHEN user mengklik tombol "Lihat Prediksi AI Panen"
  THEN sistem memunculkan modal Paywall UI dengan penawaran upgrade ke tier Pro
```

---

### 4.4 Non-Functional Requirements

| Kategori | Requirement | Target | Priority |
|----------|-------------|--------|----------|
| **Performance** | API response time (p95) | < 350ms | P0 |
| **Performance** | App cold start time | < 2.5 detik | P0 |
| **Availability** | Backend & MQTT Broker uptime | > 99.8% | P0 |
| **Security** | Password hashing | bcrypt, cost factor >= 12 | P0 |
| **Security** | JWT access token expiry | 1 jam | P0 |
| **Security** | JWT refresh token expiry (Rotation) | 7 hari | P0 |
| **Security** | HTTPS / TLS Only (production & MQTT over TLS) | Wajib (TLS 1.3) | P0 |
| **Security** | Rate limiting API Gateway | 100 req/min per IP | P0 |
| **Scalability** | Concurrent IoT telemetry insertion | > 5.000 msg/detik tanpa degradasi | P1 |
| **Compatibility** | Min Android version (Mobile App / PWA) | Android 8.0 (API 26) / Chrome 100+ | P0 |
| **Compatibility** | Min iOS version | iOS 13.0 / Safari 15+ | P0 |
| **Offline** | Edge Gateway offline caching | Simpan telemetri max 48 jam saat internet putus | P1 |

---

## 5. User Stories

### Epic 1: Authentication, Role, & Farm Profile Setup

| ID | User Story | Priority | Story Points |
|----|-----------|----------|-------------|
| US-01 | As a **mitra petani baru**, I want to **register using email or Google OAuth** so that **I can quickly create a JagoFarm account** | P0 | 3 |
| US-02 | As a **registered user**, I want to **setup my farm profile (tipe kolam/greenhouse & lokasi)** so that **the system calibrates the right agronomic thresholds** | P0 | 3 |
| US-03 | As an **agronomist JagoFarm**, I want to **log in with agronomist role** so that **I can view all assigned mitra farms for technical troubleshooting** | P0 | 2 |

### Epic 2: Real-Time IoT Monitoring & Smart Alerting

| ID | User Story | Priority | Story Points |
|----|-----------|----------|-------------|
| US-04 | As a **peternak ikan/ayam**, I want to **view live water pH, DO, & temperature charts** so that **I know exact pond conditions at any second** | P0 | 5 |
| US-05 | As a **petani greenhouse**, I want to **receive instant Push & WhatsApp alerts when temperature exceeds 32°C** so that **I can immediately turn on ventilation before crops dry out** | P0 | 5 |
| US-06 | As a **mitra**, I want to **check the connection status (Online/Offline/Battery) of my IoT sensors** so that **I can fix disconnected or dead sensors** | P1 | 2 |

### Epic 3: Circular Ecosystem Log & Cost Savings

| ID | User Story | Priority | Story Points |
|----|-----------|----------|-------------|
| US-07 | As a **peternak**, I want to **input monthly organic waste feed & maggot harvest logs** so that **I can track how much commercial feed I substituted** | P0 | 3 |
| US-08 | As a **mitra**, I want to **see my total calculated cost savings (IDR) & Zero-Waste Index** so that **I can measure the financial & environmental benefits** | P0 | 3 |

### Epic 4: AI Harvest Prediction & Marketplace E-Commerce

| ID | User Story | Priority | Story Points |
|----|-----------|----------|-------------|
| US-09 | As a **Pro subscriber**, I want to **view AI predicted harvest date, Brix score, & anomaly alerts** so that **I can plan marketing and prevent crop failure** | P0 | 8 |
| US-10 | As a **buyer/user**, I want to **browse the JagoFarm marketplace catalog (Melon, Sayuran, Ikan, Ayam, & IoT Sensors)** so that **I can purchase premium circular farm products directly** | P0 | 5 |
| US-11 | As a **Starter/Free user**, I want to **upgrade my plan seamlessly via Midtrans payment paywall** so that **I can unlock unlimited sensors and AI predictions** | P0 | 5 |

---

## 6. Technical Architecture

> **Note for AI:** Section ini adalah referensi utama untuk semua keputusan teknis.
> Selalu konsisten dengan tech stack, naming convention, pola arsitektur,
> struktur folder, dan format API response yang didefinisikan di sini.

### 6.1 Tech Stack

| Layer | Technology | Version | Keterangan |
|-------|-----------|---------|------------|
| **Mobile App** | Flutter | 3.x | Aplikasi mobile Android + iOS untuk petani di lapangan |
| **Web Dashboard & Portal** | React + Vite | ^18.3.1 / ^6.0.5 | Dashboard admin, agronomis, & e-commerce (GSAP + Three.js) |
| **Backend API** | FastAPI | 0.110+ | REST API utama, Python 3.11+ async |
| **IoT Ingestion & Broker** | EMQX / Mosquitto MQTT | 5.x | MQTT Broker over TLS untuk penerimaan telemetri sensor live |
| **Database** | PostgreSQL | 16.x | Primary relational data store |
| **Time-Series DB / Table** | TimescaleDB Extension | 2.x | Partisi time-series untuk log telemetri sensor IoT |
| **Cache & Queue** | Redis | 7.x | Token rotation, rate limiting, & Celery/RQ task queue |
| **Auth** | JWT (python-jose) | 3.3+ | Access token (1 jam) + Refresh token rotation (7 hari) |
| **Storage** | Cloudflare R2 / AWS S3 | - | Object storage untuk foto bukti panen maggot & avatar |
| **AI/ML Engine** | OpenAI API / LangChain | gpt-4o | Prediksi tanggal panen, Brix score, & rekomendasi tindakan agronomis |
| **Push Notif** | Firebase Cloud Messaging (FCM) | v1 API | Notifikasi alert Android + iOS |
| **Monitoring** | Sentry & Prometheus | - | Error tracking full-stack & server metrics |
| **Deployment** | Docker & Railway / AWS ECS | - | Containerized deployment untuk staging & production |

### 6.2 System Architecture

```
+-----------------------------------------------------------------------------+
|                                 CLIENT LAYER                                |
|        Flutter App (Android/iOS)      |      React + Vite Web Dashboard     |
+----------------------+----------------+--------------------------+----------+
                       | HTTPS / REST                              | HTTPS
                       v                                           v
+-----------------------------------------------------------------------------+
|                                 API GATEWAY                                 |
|               (Rate Limiting, JWT Middleware, CORS, Logging)                |
+----------------------+-------------------------------------------+----------+
                       | REST API                                  | WebSocket
+----------------------v-------------------------------------------v----------+
|                              APPLICATION LAYER                              |
|                               FastAPI Backend                               |
|   /auth   |   /users   |   /telemetry   |   /circular-logs   |   /ai/predict|
+-------+-------------------------+--------------------------------+----------+
        |                         |                                |
        v                         v                                v
+---------------+         +---------------+                 +-----------------+
|  PostgreSQL   |         |     Redis     |                 |  OpenAI Service |
| (+TimescaleDB)|         | Cache / Queue |                 | (gpt-4o Engine) |
+---------------+         +---------------+                 +-----------------+
        ^
        | Insert Telemetry (Background Consumer)
+-------+---------------------------------------------------------------------+
|                          MQTT INGESTION LAYER (EMQX)                        |
|   Topic: jagofarm/{farm_id}/{device_id}/telemetry (JSON Payload over TLS)   |
+-----------------------------------------^-----------------------------------+
                                          | MQTT / MQTTS
+-----------------------------------------+-----------------------------------+
|                              FIELD HARDWARE LAYER                           |
|       ESP32 / LoRaWAN Gateways Connected to Pond & Greenhouse Sensors       |
|    (Water pH, DO Oxygen, Pond Temp, Air Temp, Humidity, Light Intensity)    |
+-----------------------------------------------------------------------------+
```

### 6.3 Database Schema

#### Design Decisions:
- **Soft Delete:** Semua tabel menggunakan soft delete (`deleted_at`), bukan hard delete
- **Audit Fields:** Semua tabel wajib punya `created_at`, `updated_at`, `created_by`, `updated_by`
- **UUID:** Semua primary key menggunakan UUID v4
- **Naming:** snake_case untuk semua nama tabel dan kolom
- **Charset:** UTF-8 (utf8mb4 untuk MySQL, default untuk PostgreSQL)

#### DDL Schema:

```sql
-- ================================================================
-- TABLE: users
-- ================================================================
CREATE TABLE users (
    id              UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    name            VARCHAR(100)    NOT NULL,
    email           VARCHAR(255)    NOT NULL,
    password        VARCHAR(255)    NOT NULL,                   -- bcrypt hash
    role            VARCHAR(20)     NOT NULL DEFAULT 'user'
                    CHECK (role IN ('admin', 'user', 'moderator')),
    avatar_url      TEXT            NULL,
    is_active       BOOLEAN         NOT NULL DEFAULT true,
    last_login_at   TIMESTAMP       NULL,

    -- Soft delete
    deleted_at      TIMESTAMP       NULL,

    -- Audit fields
    created_at      TIMESTAMP       NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP       NOT NULL DEFAULT NOW(),
    created_by      UUID            NULL,
    updated_by      UUID            NULL,

    CONSTRAINT uq_users_email UNIQUE (email)
);

CREATE INDEX idx_users_email       ON users(email);
CREATE INDEX idx_users_role        ON users(role);
CREATE INDEX idx_users_is_active   ON users(is_active);
CREATE INDEX idx_users_deleted_at  ON users(deleted_at) WHERE deleted_at IS NULL;


-- ================================================================
-- TABLE: refresh_tokens  (token rotation pattern)
-- ================================================================
CREATE TABLE refresh_tokens (
    id              UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID            NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash      VARCHAR(255)    NOT NULL,                   -- SHA-256 hash dari token
    expires_at      TIMESTAMP       NOT NULL,
    revoked_at      TIMESTAMP       NULL,                       -- NULL = masih valid
    created_at      TIMESTAMP       NOT NULL DEFAULT NOW(),

    CONSTRAINT uq_refresh_tokens_hash UNIQUE (token_hash)
);

CREATE INDEX idx_refresh_tokens_user_id    ON refresh_tokens(user_id);
CREATE INDEX idx_refresh_tokens_token_hash ON refresh_tokens(token_hash);


-- ================================================================
-- TABLE: farms
-- ================================================================
CREATE TABLE farms (
    id              UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID            NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    name            VARCHAR(150)    NOT NULL,
    farm_type       VARCHAR(50)     NOT NULL
                    CHECK (farm_type IN ('greenhouse_melon', 'greenhouse_sayur', 'kolam_ikan', 'kandang_ayam')),
    location_city   VARCHAR(100)    NOT NULL,
    area_size_m2    DECIMAL(10, 2)  NULL,
    status          VARCHAR(30)     NOT NULL DEFAULT 'active'
                    CHECK (status IN ('active', 'inactive', 'maintenance')),

    -- Soft delete
    deleted_at      TIMESTAMP       NULL,

    -- Audit fields
    created_at      TIMESTAMP       NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP       NOT NULL DEFAULT NOW(),
    created_by      UUID            NULL REFERENCES users(id),
    updated_by      UUID            NULL REFERENCES users(id)
);

CREATE INDEX idx_farms_user_id     ON farms(user_id);
CREATE INDEX idx_farms_farm_type   ON farms(farm_type);
CREATE INDEX idx_farms_deleted_at  ON farms(deleted_at) WHERE deleted_at IS NULL;


-- ================================================================
-- TABLE: iot_devices
-- ================================================================
CREATE TABLE iot_devices (
    id              UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    farm_id         UUID            NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
    device_serial   VARCHAR(100)    NOT NULL,
    device_name     VARCHAR(100)    NOT NULL,
    status          VARCHAR(30)     NOT NULL DEFAULT 'online'
                    CHECK (status IN ('online', 'offline', 'error')),
    battery_level   INTEGER         NULL,
    last_seen_at    TIMESTAMP       NULL,

    deleted_at      TIMESTAMP       NULL,
    created_at      TIMESTAMP       NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP       NOT NULL DEFAULT NOW(),

    CONSTRAINT uq_device_serial UNIQUE (device_serial)
);

CREATE INDEX idx_iot_devices_farm_id   ON iot_devices(farm_id);
CREATE INDEX idx_iot_devices_serial    ON iot_devices(device_serial);


-- ================================================================
-- TABLE: circular_logs (pencatatan limbah & substitusi maggot)
-- ================================================================
CREATE TABLE circular_logs (
    id                 UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    farm_id            UUID            NOT NULL REFERENCES farms(id) ON DELETE RESTRICT,
    user_id            UUID            NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    log_date           DATE            NOT NULL,
    organic_waste_kg   DECIMAL(10, 2)  NOT NULL DEFAULT 0,
    maggot_harvest_kg  DECIMAL(10, 2)  NOT NULL DEFAULT 0,
    liquid_fertilizer_l DECIMAL(10, 2) NOT NULL DEFAULT 0,
    commercial_feed_saved_kg DECIMAL(10, 2) NOT NULL DEFAULT 0,
    cost_saved_idr     DECIMAL(15, 2)  NOT NULL DEFAULT 0,
    notes              TEXT            NULL,

    deleted_at         TIMESTAMP       NULL,
    created_at         TIMESTAMP       NOT NULL DEFAULT NOW(),
    updated_at         TIMESTAMP       NOT NULL DEFAULT NOW(),
    created_by         UUID            NULL REFERENCES users(id)
);

CREATE INDEX idx_circular_logs_farm_id   ON circular_logs(farm_id);
CREATE INDEX idx_circular_logs_date      ON circular_logs(log_date DESC);
```

#### Table Relationships:

| Tabel | Relasi | Tabel | Tipe | On Delete |
|-------|--------|-------|------|-----------|
| `users` | has many | `farms` | 1:N | RESTRICT |
| `users` | has many | `refresh_tokens` | 1:N | CASCADE |
| `farms` | has many | `iot_devices` | 1:N | CASCADE |
| `farms` | has many | `circular_logs` | 1:N | RESTRICT |

#### ERD (Mermaid):

```mermaid
erDiagram
    users {
        UUID id PK
        VARCHAR name
        VARCHAR email UK "NOT NULL"
        VARCHAR password "NOT NULL, bcrypt"
        VARCHAR role "DEFAULT user"
        BOOLEAN is_active "DEFAULT true"
        TIMESTAMP last_login_at
        TIMESTAMP deleted_at "soft delete"
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }

    refresh_tokens {
        UUID id PK
        UUID user_id FK
        VARCHAR token_hash UK "SHA-256"
        TIMESTAMP expires_at "NOT NULL"
        TIMESTAMP revoked_at "NULL = valid"
    }

    farms {
        UUID id PK
        UUID user_id FK
        VARCHAR name "NOT NULL"
        VARCHAR farm_type "greenhouse/kolam"
        VARCHAR location_city
        DECIMAL area_size_m2
        TIMESTAMP deleted_at
    }

    iot_devices {
        UUID id PK
        UUID farm_id FK
        VARCHAR device_serial UK
        VARCHAR device_name
        VARCHAR status "online/offline"
        INTEGER battery_level
        TIMESTAMP last_seen_at
    }

    circular_logs {
        UUID id PK
        UUID farm_id FK
        UUID user_id FK
        DATE log_date
        DECIMAL organic_waste_kg
        DECIMAL maggot_harvest_kg
        DECIMAL cost_saved_idr
        TIMESTAMP created_at
    }

    users ||--o{ refresh_tokens : "has"
    users ||--o{ farms : "owns"
    farms ||--o{ iot_devices : "contains"
    farms ||--o{ circular_logs : "records"
```

#### Migration Management (Alembic):

```bash
# Apply migration
alembic upgrade head          # apply semua pending
alembic upgrade +1            # apply satu migration berikutnya
alembic current               # lihat posisi saat ini
alembic history               # lihat riwayat

# Rollback
alembic downgrade -1          # rollback satu migration
alembic downgrade [revision]  # rollback ke revision tertentu
```

**Aturan wajib migration:**
1. Jangan edit migration file yang sudah pernah di-run di production
2. Satu migration per PR — mudah di-review dan di-rollback
3. Selalu test fungsi `downgrade()` sebelum merge ke `main`
4. Kolom baru di tabel yang sudah ada data: tambah sebagai `NULL` dulu, isi data, baru set `NOT NULL` (3 langkah terpisah)
5. Jangan `DROP` kolom atau tabel langsung — soft-deprecate minimal 1 release dulu

**Rollback Procedure (Production Emergency):**
```
1. Alert tim via Slack/WA bahwa ada rollback
2. alembic downgrade -1
3. Deploy image backend versi sebelumnya
4. Verifikasi health check endpoint kembali 200
5. Baru cari root cause sebelum re-deploy
```

---

### 6.4 API Contract

#### Standard Response Format

```json
// Success — Single Resource
{
  "status": "success",
  "message": "Human-readable success message",
  "data": {}
}

// Success — Paginated List
{
  "status": "success",
  "message": "Data retrieved successfully",
  "data": [],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "total_pages": 5,
    "has_next": true,
    "has_prev": false
  }
}

// Error
{
  "status": "error",
  "message": "Human-readable error message",
  "error_code": "SNAKE_CASE_ERROR_CODE",
  "errors": {
    "field_name": ["Pesan error untuk field ini"]
  }
}
```

#### Rate Limit Response Headers

Setiap response wajib menyertakan header berikut agar client bisa handle throttling dengan benar:

```
X-RateLimit-Limit: 100          // maksimum request per window
X-RateLimit-Remaining: 87       // sisa request yang boleh dibuat
X-RateLimit-Reset: 1706097600   // Unix timestamp kapan window reset
```

Saat limit tercapai (429 Too Many Requests):
```json
HTTP/1.1 429 Too Many Requests
Retry-After: 45

{
  "status": "error",
  "message": "Too many requests. Please try again in 45 seconds.",
  "error_code": "RATE_LIMIT_EXCEEDED"
}
```

**Mobile client wajib handle ini:** Baca header `Retry-After` dan tunda request, jangan langsung retry.

#### HTTP Status Code Reference

| Status | Digunakan untuk |
|--------|----------------|
| `200 OK` | GET, PUT, PATCH, DELETE berhasil |
| `201 Created` | POST berhasil membuat resource baru |
| `204 No Content` | DELETE tanpa response body |
| `400 Bad Request` | Validation error, request tidak valid |
| `401 Unauthorized` | Token tidak ada, invalid, atau expired |
| `403 Forbidden` | Token valid tapi role tidak punya akses ke resource ini |
| `404 Not Found` | Resource tidak ditemukan |
| `409 Conflict` | Duplikat data |
| `422 Unprocessable` | Business logic error (stok habis, saldo tidak cukup) |
| `429 Too Many Requests` | Rate limit tercapai |
| `500 Internal Server Error` | Unhandled server error |

#### API Versioning Strategy

- Semua endpoint menggunakan prefix `/api/v1/`
- **Breaking change** (ubah response field, hapus endpoint, ubah behavior) → naik ke `/api/v2/`
- **Non-breaking change** (tambah field baru, tambah endpoint) → tetap di `/api/v1/`
- `/v1` tidak langsung di-deprecated saat `/v2` rilis — minimal jalan paralel selama **3 bulan**
- Tambahkan header `Deprecation: true` dan `Sunset: [tanggal]` di endpoint yang akan dihapus
- Mobile app harus bisa hit `/api/v1/meta/version` untuk tahu minimum app version yang masih disupport

```
BASE URL: https://api.[project].com/api/v1
```

---

#### Endpoint: POST /api/v1/auth/register

**Description:** Register user baru
**Auth Required:** No (Public)
**Role Access:** -

**Headers:**
| Header | Value | Required |
|--------|-------|----------|
| Content-Type | application/json | Yes |

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "password_confirm": "string"
}
```

**Validation Rules:**
| Field | Type | Required | Rules |
|-------|------|----------|-------|
| name | string | Yes | min:2, max:100 |
| email | string | Yes | email format, max:255, unique:users |
| password | string | Yes | min:8, harus ada 1 uppercase + 1 angka |
| password_confirm | string | Yes | harus sama dengan password |

**Response 201:**
```json
{
  "status": "success",
  "message": "Registration successful",
  "data": {
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "created_at": "2024-01-15T10:00:00Z"
    },
    "access_token": "eyJhbGci...",
    "refresh_token": "eyJhbGci...",
    "token_type": "bearer",
    "expires_in": 3600
  }
}
```

**Error Responses:**
| Status | Error Code | Kondisi |
|--------|-----------|---------|
| 400 | `VALIDATION_ERROR` | Field tidak valid |
| 409 | `EMAIL_EXISTS` | Email sudah terdaftar |
| 500 | `INTERNAL_ERROR` | Server error |

---

#### Endpoint: POST /api/v1/auth/login

**Description:** Login, dapatkan access + refresh token
**Auth Required:** No (Public)

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Validation Rules:**
| Field | Type | Required | Rules |
|-------|------|----------|-------|
| email | string | Yes | email format |
| password | string | Yes | min:1 |

**Response 200:**
```json
{
  "status": "success",
  "message": "Login successful",
  "data": {
    "user": { "id": "...", "name": "...", "email": "...", "role": "..." },
    "access_token": "eyJhbGci...",
    "refresh_token": "eyJhbGci...",
    "token_type": "bearer",
    "expires_in": 3600
  }
}
```

**Error Responses:**
| Status | Error Code | Kondisi |
|--------|-----------|---------|
| 400 | `VALIDATION_ERROR` | Field kosong / format salah |
| 401 | `INVALID_CREDENTIALS` | Email atau password salah |
| 423 | `ACCOUNT_LOCKED` | Terkunci setelah 5x percobaan gagal |
| 403 | `ACCOUNT_INACTIVE` | Akun dinonaktifkan admin |

---

#### Endpoint: POST /api/v1/auth/refresh

**Description:** Tukar refresh token dengan access token baru (token rotation)
**Auth Required:** No — gunakan refresh token, bukan access token
**Role Access:** -

**Request Body:**
```json
{
  "refresh_token": "string"
}
```

**Validation Rules:**
| Field | Type | Required | Rules |
|-------|------|----------|-------|
| refresh_token | string | Yes | Non-empty JWT string |

**Response 200:**
```json
{
  "status": "success",
  "message": "Token refreshed successfully",
  "data": {
    "access_token": "eyJhbGci... (baru)",
    "refresh_token": "eyJhbGci... (baru — token lama langsung invalid)",
    "token_type": "bearer",
    "expires_in": 3600
  }
}
```

> **Token Rotation:** Setiap kali `/auth/refresh` dipanggil, refresh token lama langsung di-revoke
> dan refresh token baru diterbitkan. Mobile app wajib simpan refresh token baru dari response ini.

**Error Responses:**
| Status | Error Code | Kondisi |
|--------|-----------|---------|
| 401 | `REFRESH_TOKEN_INVALID` | Token tidak valid / tidak ditemukan di DB |
| 401 | `REFRESH_TOKEN_EXPIRED` | Token sudah melewati masa berlaku — user harus login ulang |
| 401 | `REFRESH_TOKEN_REVOKED` | Token sudah di-revoke (logout device lain / security breach) |

---

#### Endpoint: GET /api/v1/circular-logs

**Description:** List catatan ekosistem sirkular milik user dengan pagination
**Auth Required:** Yes (Bearer Token)
**Role Access:** `admin`, `agronomist`, `user` (hanya milik sendiri)

**Headers:**
| Header | Value | Required |
|--------|-------|----------|
| Authorization | Bearer {access_token} | Yes |

**Query Parameters:**
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| page | integer | 1 | Halaman ke- |
| limit | integer | 20 | Item per halaman (max: 100) |
| farm_id | UUID | - | Filter berdasarkan farm/kolam spesifik |
| sort_by | string | `log_date` | Field untuk sorting (`log_date`, `cost_saved_idr`) |
| sort_order | string | `desc` | `asc` atau `desc` |

**Response 200:** (paginated format — lihat Standard Response Format)

**Error Responses:**
| Status | Error Code | Kondisi |
|--------|-----------|---------|
| 401 | `UNAUTHORIZED` | Token tidak ada / expired |
| 403 | `FORBIDDEN` | Role tidak punya akses |

---

#### Endpoint: POST /api/v1/circular-logs

**Description:** Buat catatan sirkular baru & hitung otomatis penghematan biaya input
**Auth Required:** Yes
**Role Access:** `admin`, `agronomist`, `user`

**Request Body:**
```json
{
  "farm_id": "550e8400-e29b-41d4-a716-446655440001",
  "log_date": "2026-07-10",
  "organic_waste_kg": 100.5,
  "maggot_harvest_kg": 25.0,
  "liquid_fertilizer_l": 15.0,
  "notes": "Panen maggot untuk pakan kolam lele A"
}
```

**Validation Rules:**
| Field | Type | Required | Rules |
|-------|------|----------|-------|
| farm_id | UUID | Yes | Harus milik user yang login |
| log_date | string (YYYY-MM-DD) | Yes | Tidak boleh masa depan |
| organic_waste_kg | number | Yes | >= 0 |
| maggot_harvest_kg | number | Yes | >= 0 |

**Response 201:** (single resource format, dilengkapi perhitungan `cost_saved_idr` otomatis oleh server)

---

#### Endpoint: POST /api/v1/ai/predict-harvest (`[PAID]`)

**Description:** Prediksi tanggal panen & Brix score berdasarkan tren sensor IoT + log pakan
**Auth Required:** Yes
**Role Access:** `admin`, `agronomist`, `user` (Wajib Tier `Pro`)

**Request Body:**
```json
{
  "farm_id": "550e8400-e29b-41d4-a716-446655440001",
  "target_commodity": "melon_premium"
}
```

**Response 200:**
```json
{
  "status": "success",
  "message": "AI Harvest Prediction generated successfully",
  "data": {
    "farm_id": "550e8400-e29b-41d4-a716-446655440001",
    "predicted_harvest_date": "2026-07-25",
    "days_remaining": 15,
    "predicted_brix_score": 14.8,
    "confidence_level": "98%",
    "ai_recommendations": [
      "Pertahankan suhu malam di kisaran 24°C untuk memaksimalkan akumulasi gula (Brix).",
      "Kurangi penyiraman air sebesar 15% mulai H-7 sebelum panen."
    ]
  }
}
```

**Error Responses:**
| Status | Error Code | Kondisi |
|--------|-----------|---------|
| 403 | `PAYWALL_UPGRADE_REQUIRED` | User masih di tier Free atau Starter (harus upgrade Pro) |
| 422 | `INSUFFICIENT_TELEMETRY_DATA` | Data sensor kurang dari 7 hari untuk dianalisis AI |

---

### 6.5 Project Structure

```
jagofarm/
├── web/                             # React + Vite Web Dashboard & Portal (GSAP + Three.js)
│   ├── src/
│   │   ├── assets/                  # WebP images & 3D floating assets
│   │   ├── components/              # Reusable UI components & 3D canvas (Hero, Navbar, Ecosystem)
│   │   ├── data/                    # Static content & icon maps
│   │   ├── pages/                   # Route screens (Home, Katalog, Dashboard, CircularLog)
│   │   ├── App.jsx                  # Root router & motion logic
│   │   ├── main.jsx                 # Entry point
│   │   └── styles.css               # Design system tokens & animations
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── mobile/                          # Flutter Mobile App (Petani & Mitra di lapangan)
│   ├── lib/
│   │   ├── core/
│   │   │   ├── constants/           # AppColors, AppStrings, AppRoutes
│   │   │   ├── network/             # Dio client, interceptors, token refresh
│   │   │   └── theme/               # AppTheme, TextStyles
│   │   ├── data/
│   │   │   ├── datasources/         # Remote API & Local SQLite/SharedPrefs
│   │   │   └── models/              # Telemetry & Circular Log models
│   │   ├── domain/                  # Use cases & abstract repositories
│   │   └── presentation/            # Screens & Riverpod state management
│   └── pubspec.yaml
│
├── backend/                         # FastAPI Backend Engine
│   ├── app/
│   │   ├── api/
│   │   │   ├── v1/
│   │   │   │   ├── auth.py          # Register, login, refresh endpoints
│   │   │   │   ├── circular_logs.py # Circular ecosystem log endpoints
│   │   │   │   ├── telemetry.py     # Live sensor reading queries
│   │   │   │   └── ai.py            # Harvest prediction & anomaly AI
│   │   │   └── deps.py              # get_db, require_role, rate limiter
│   │   ├── core/
│   │   │   ├── config.py            # Pydantic BaseSettings from .env
│   │   │   ├── security.py          # JWT & bcrypt password hashing
│   │   │   └── logging.py           # Structured JSON logger
│   │   ├── db/                      # SQLAlchemy ORM models & Alembic migrations
│   │   ├── schemas/                 # Pydantic request & response models
│   │   └── services/                # Business logic & OpenAI API wrapper
│   ├── tests/                       # pytest unit, integration, & locust load scripts
│   ├── main.py
│   └── requirements.txt
│
└── iot-gateway/                     # MQTT Bridge & Edge Ingestion Scripts
    ├── bridge.py                    # MQTT consumer to FastAPI/PostgreSQL inserter
    └── requirements.txt
```

#### Environment Variables (.env.example)

```bash
# ================================================================
# APPLICATION
# ================================================================
APP_NAME=JagoFarm
APP_ENV=development                    # development | staging | production
APP_DEBUG=true                         # false di production
APP_SECRET_KEY=your-secret-key-here    # min 32 char, random, JANGAN share

# ================================================================
# DATABASE & TIMESCALEDB
# ================================================================
DATABASE_URL=postgresql://user:password@localhost:5432/jagofarm_db
# DATABASE_URL=sqlite:///./dev.db      # alternatif untuk development lokal

# ================================================================
# REDIS & MQTT BROKER
# ================================================================
REDIS_URL=redis://localhost:6379/0
MQTT_BROKER_HOST=mqtt.jagofarm.com
MQTT_BROKER_PORT=8883
MQTT_BROKER_USER=backend_ingester
MQTT_BROKER_PASS=secret_mqtt_password

# ================================================================
# JWT / AUTH
# ================================================================
JWT_SECRET_KEY=your-jwt-secret-here    # BERBEDA dari APP_SECRET_KEY
JWT_ALGORITHM=HS256
JWT_ACCESS_TOKEN_EXPIRE_MINUTES=60     # 1 jam
JWT_REFRESH_TOKEN_EXPIRE_DAYS=7        # 7 hari

# ================================================================
# THIRD-PARTY SERVICES
# ================================================================
# Firebase Cloud Messaging
FIREBASE_PROJECT_ID=jagofarm-prod
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=

# OpenAI / AI Harvest Engine
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o

# Payment Gateway (Midtrans)
MIDTRANS_SERVER_KEY=SB-Mid-server-...
MIDTRANS_CLIENT_KEY=SB-Mid-client-...
MIDTRANS_IS_PRODUCTION=false

# WhatsApp Business Alerts
WA_API_URL=https://graph.facebook.com/v18.0/...
WA_API_TOKEN=
WA_PHONE_NUMBER_ID=

# ================================================================
# MONITORING
# ================================================================
SENTRY_DSN=https://...@sentry.io/...
```

---

### 6.6 Third-Party Integrations

| Service | Tujuan | SDK / Library | Env | Notes |
|---------|--------|---------------|-----|-------|
| Firebase Auth & FCM | Google OAuth + Push Notif | firebase_admin / firebase_messaging | All | Pengiriman alert kritis sensor lapangan |
| EMQX MQTT Cloud | Broker telemetri IoT ribuan sensor | paho-mqtt / asyncio | All | Wajib enkripsi TLS port 8883 |
| OpenAI API | AI Harvest Prediction & Anomaly | openai / langchain | All | Model `gpt-4o` untuk analitik agronomis |
| Midtrans API | Payment Gateway QRIS & VA | midtranspy | Staging + Prod | Billing langganan tier Starter & Pro |
| WhatsApp Business API | Peringatan darurat via WA | httpx / REST API | Prod | Notifikasi ke nomor HP petani saat DO/suhu kritis |
| Sentry | Error monitoring | sentry-sdk[fastapi] | All | DSN terkonfigurasi di `.env` |

---

## 7. Coding Standards

> **Note for AI:** Semua kode yang digenerate WAJIB mengikuti aturan di section ini.

### 7.1 General Principles

- **Clean Architecture** — Pisahkan concerns: presentation, domain, data. Jangan bypass layer.
- **Single Responsibility** — Satu class/function, satu tanggung jawab.
- **DRY** — Extract fungsi yang dipakai lebih dari 2 kali.
- **KISS** — Jangan over-engineer sebelum ada kebutuhan nyata.
- **Fail Fast** — Validasi input di awal, jangan biarkan data invalid masuk ke business logic.
- **No Magic Numbers** — Semua konstanta harus diberi nama.
- **Priority Rule** — Jangan implement fitur P1 sebelum semua P0 selesai dan di-test.
- **File Structure Rule** — Jangan membuat file di luar struktur yang sudah ditentukan di Section 6.5.

### 7.2 Backend Standards (Python / FastAPI)

```python
# Naming Conventions
snake_case        # variabel, fungsi, nama file, folder, kolom DB
PascalCase        # class, Pydantic schema, SQLAlchemy model
SCREAMING_SNAKE   # konstanta
kebab-case        # URL endpoint (/user-profile bukan /userProfile)

# Rules
# - Semua fungsi harus punya type annotation (parameter + return type)
# - Semua public function harus punya docstring minimal satu baris
# - Jangan return raw dict — selalu pakai Pydantic response schema
# - Jangan query DB langsung di router — selalu lewat service/repository
# - Soft delete: update deleted_at = NOW(), jangan DELETE FROM
# - Semua config dari .env via pydantic BaseSettings, jangan hardcode
# - Custom exception via AppException, bukan raise generic Exception
```

### 7.3 Frontend/Mobile Standards (Flutter / Dart)

```dart
// Naming Conventions
camelCase         // variabel, parameter, method
PascalCase        // class, Widget, enum
snake_case        // nama file, nama folder, asset name
SCREAMING_SNAKE   // konstanta

// Rules
// - Extract widget kalau ada lebih dari 3 level nesting
// - Gunakan const constructor di mana memungkinkan (performance)
// - Jangan taruh business logic di dalam Widget build()
// - Semua API call melalui repository, jangan langsung di widget
// - Handle 3 state: loading, success, error — jangan biarkan state limbo
// - Semua string yang tampil ke user harus bisa di-localize (siapkan dari awal)
```

### 7.4 API Response Format Standard

```python
# Gunakan response helper ini di semua endpoint — jangan return dict manual

from app.schemas.response import success_response, error_response, paginated_response

# Single resource
return success_response(data=user_schema, message="User retrieved")

# Paginated list
return paginated_response(data=users, total=100, page=1, limit=20)

# Error — biasanya di-raise via AppException, ditangkap global handler
raise AppException(status_code=404, error_code="NOT_FOUND", message="User not found")
```

### 7.5 Git Workflow

```
Branch Naming:
  main                     # production — protected, merge via PR only
  develop                  # staging — integration branch
  feature/[F-ID]-[desc]    # feature/F03-user-profile
  fix/[desc]               # fix/login-token-null
  hotfix/[desc]            # urgent fix ke production

Commit Message (Conventional Commits):
  feat(auth): add Google OAuth login
  fix(api): handle null response from payment gateway
  chore(deps): update flutter to 3.19.0
  refactor(user): extract validation to service layer
  test(auth): add unit tests for login use case
  docs(api): update endpoint documentation

Pull Request:
  - Wajib ada deskripsi singkat apa yang berubah dan kenapa
  - Link ke task / issue (GitHub Issues, Linear, Notion)
  - Minimal 1 approval sebelum merge
  - Semua CI checks harus hijau
  - Squash merge ke develop, regular merge ke main
```

### 7.6 Linting & Formatting Tools

**Backend (Python):**

| Tool | Tujuan | Config |
|------|--------|--------|
| `black` | Auto code formatter — standarisasi whitespace dan style | `pyproject.toml` |
| `isort` | Auto sort import secara konsisten | `pyproject.toml` |
| `ruff` | Linter cepat (gantikan flake8 + pylint) | `pyproject.toml` |
| `mypy` | Static type checker | `pyproject.toml` |

```toml
# pyproject.toml
[tool.black]
line-length = 88
target-version = ["py311"]

[tool.isort]
profile = "black"
line_length = 88

[tool.ruff]
line-length = 88
select = ["E", "F", "W", "I"]
ignore = ["E501"]

[tool.mypy]
python_version = "3.11"
strict = true
```

Wajib dijalankan sebelum commit:
```bash
black app/ tests/
isort app/ tests/
ruff check app/ tests/
mypy app/
```

**Mobile (Flutter/Dart):**

```bash
dart format lib/ test/
dart analyze lib/ test/
```

```yaml
# analysis_options.yaml
analyzer:
  strong-mode:
    implicit-casts: false
    implicit-dynamic: false
  errors:
    missing_required_param: error
    missing_return: error
    dead_code: warning
linter:
  rules:
    - prefer_const_constructors
    - prefer_final_fields
    - avoid_print
    - always_declare_return_types
```

**Pre-commit hook (sangat direkomendasikan):**
```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/psf/black
    rev: 23.12.0
    hooks:
      - id: black
  - repo: https://github.com/pycqa/isort
    rev: 5.13.0
    hooks:
      - id: isort
  - repo: https://github.com/astral-sh/ruff-pre-commit
    rev: v0.3.0
    hooks:
      - id: ruff
```

---

## 8. Testing Strategy

### 8.1 Testing Pyramid

```
         /\
        /E2E\          <- Sedikit, lambat — hanya critical happy path
       /------\
      /  Integ  \      <- Medium — API endpoint + DB interaction
     /------------\
    /  Unit Tests  \   <- Banyak, cepat — logic, functions, use cases
   /----------------\
```

### 8.2 Unit Testing

**Yang di-test:** Business logic, service layer, use cases, utility functions, validasi

```python
# tests/unit/test_user_service.py
def test_register_success(mock_repo, valid_user_data):
    result = user_service.register(valid_user_data)
    assert result.email == valid_user_data["email"]
    mock_repo.create.assert_called_once()

def test_register_duplicate_email_raises(mock_repo, existing_user):
    mock_repo.get_by_email.return_value = existing_user
    with pytest.raises(EmailAlreadyExistsError):
        user_service.register({"email": existing_user.email, ...})
```

```dart
// test/domain/usecases/login_usecase_test.dart
void main() {
  group('LoginUseCase', () {
    test('returns User on success', () async {
      when(mockRepo.login(any)).thenAnswer((_) async => Right(tUser));
      final result = await loginUseCase(LoginParams(email: '...', password: '...'));
      expect(result, Right(tUser));
    });
  });
}
```

### 8.3 Integration Testing

**Yang di-test:** API endpoints end-to-end, termasuk DB interaction

```python
# tests/integration/test_auth_api.py
def test_register_success(client, db_session):
    response = client.post("/api/v1/auth/register", json={
        "name": "Test User",
        "email": "test@example.com",
        "password": "Test1234!",
        "password_confirm": "Test1234!"
    })
    assert response.status_code == 201
    assert response.json()["status"] == "success"
    assert "access_token" in response.json()["data"]
    assert "refresh_token" in response.json()["data"]

def test_refresh_token_rotation(client, authenticated_user):
    old_refresh = authenticated_user["refresh_token"]
    response = client.post("/api/v1/auth/refresh", json={"refresh_token": old_refresh})
    assert response.status_code == 200
    new_refresh = response.json()["data"]["refresh_token"]
    assert new_refresh != old_refresh  # token baru harus berbeda

    # token lama harus sudah tidak bisa dipakai
    retry = client.post("/api/v1/auth/refresh", json={"refresh_token": old_refresh})
    assert retry.status_code == 401
    assert retry.json()["error_code"] == "REFRESH_TOKEN_REVOKED"
```

### 8.4 UI / Widget Testing (Flutter)

```dart
testWidgets('shows error when login fails', (tester) async {
  await tester.pumpWidget(const LoginPage());
  await tester.enterText(find.byKey(const Key('email_field')), 'wrong@email.com');
  await tester.tap(find.byKey(const Key('login_button')));
  await tester.pumpAndSettle();
  expect(find.text('Email atau password tidak valid'), findsOneWidget);
});
```

### 8.5 Coverage Targets

| Layer | Minimum Coverage | Tool |
|-------|-----------------|------|
| Backend Unit | 70% | pytest-cov |
| Backend Integration | Semua P0 endpoint | pytest |
| Flutter Unit | 60% | flutter test --coverage |
| Flutter Widget | Screen P0 | flutter test |

### 8.6 Testing Tools

| Tool | Platform | Tujuan |
|------|----------|--------|
| pytest | Python | Unit + integration |
| pytest-cov | Python | Coverage report |
| factory-boy | Python | Test data factory |
| respx / responses | Python | Mock HTTP requests |
| flutter_test | Flutter | Unit + widget |
| mocktail | Flutter | Mocking dependencies |

### 8.7 Load & Performance Testing

**Tujuan:** Verifikasi bahwa API memenuhi target di Section 2.5 sebelum naik ke production.

**Tools:**

| Tool | Tujuan | Install |
|------|--------|---------|
| `locust` | Load testing berbasis Python — skenario realistis | `pip install locust` |
| `k6` | Modern load testing, scripting JS, CI-friendly | `brew install k6` |
| Flutter DevTools | App performance profiling, widget rebuild tracking | built-in |

**Skenario Wajib (jalankan di staging, bukan production):**

| Skenario | Concurrent Users | Duration | Expected |
|----------|-----------------|----------|---------|
| Baseline Load | [X] users normal | 10 menit | p95 < 500ms, error < 0.5% |
| Spike Test | 3x normal, naik tiba-tiba | 5 menit | Sistem recover dalam 60 detik |
| Endurance | [X] users normal | 30 menit | Tidak ada memory leak, latency stabil |
| AI Endpoint | [X] concurrent AI calls | 5 menit | Timeout < 30s, ada fallback response |

**Cara Jalankan (locust):**
```bash
locust -f tests/load/locustfile.py \
  --host=https://staging-api.[domain].com \
  --users=100 \
  --spawn-rate=10 \
  --run-time=10m
```

**Kapan Dijalankan:**
- Wajib sebelum setiap release ke production
- Setelah ada perubahan signifikan di query DB atau modul AI
- Saat DB index baru ditambahkan (verifikasi improvement)

---

## 9. Logging, Monitoring & Error Handling

### 9.1 Log Levels

| Level | Kapan | Contoh |
|-------|-------|--------|
| `DEBUG` | Detail teknis, development only — jangan di production | Raw query, payload |
| `INFO` | Event normal penting | User login, order created |
| `WARNING` | Tidak ideal tapi tidak error | Retry ke-2, deprecated endpoint |
| `ERROR` | Error tertangani — app masih jalan | Payment failed, email tidak terkirim |
| `CRITICAL` | Error fatal | DB connection lost, disk full |

### 9.2 Log Format (Structured JSON)

```json
{
  "timestamp": "2024-01-15T10:30:00.000Z",
  "level": "INFO",
  "service": "api",
  "request_id": "req_550e8400",
  "user_id": "uuid-or-null",
  "method": "POST",
  "path": "/api/v1/auth/login",
  "status_code": 200,
  "duration_ms": 145,
  "message": "User login successful",
  "extra": {}
}
```

### 9.3 Yang Wajib Di-log

**Log ini:**
- Setiap incoming HTTP request (method, path, status, duration)
- Setiap error dengan full stack trace
- Aksi kritis: register, login, logout, perubahan data penting, payment
- External service calls + response time (OpenAI, payment, WA)

**Jangan log ini (sensitive data):**
- Password dalam bentuk apapun
- Access token dan refresh token (log hanya `user_id`)
- Data pribadi sensitif (nomor KTP, data medis)
- Full request body kalau ada field password/token — mask dulu

### 9.4 Error Handling Pattern

```python
# app/core/exceptions.py
class AppException(Exception):
    def __init__(self, status_code: int, error_code: str, message: str, errors: dict = None):
        self.status_code = status_code
        self.error_code = error_code
        self.message = message
        self.errors = errors or {}

# main.py — global exception handler
@app.exception_handler(AppException)
async def app_exception_handler(request, exc: AppException):
    logger.error(f"{exc.error_code}: {exc.message}", extra={"errors": exc.errors})
    return JSONResponse(status_code=exc.status_code, content={
        "status": "error",
        "message": exc.message,
        "error_code": exc.error_code,
        "errors": exc.errors
    })

@app.exception_handler(Exception)
async def unhandled_exception_handler(request, exc: Exception):
    logger.critical(f"Unhandled exception: {exc}", exc_info=True)
    return JSONResponse(status_code=500, content={
        "status": "error",
        "message": "Internal server error",
        "error_code": "INTERNAL_ERROR"
    })
```

### 9.5 Monitoring & Alerting

| Tool | Tujuan | Alert Trigger |
|------|--------|---------------|
| Sentry | Error tracking backend + mobile | New error type, error rate > 1% |
| Firebase Crashlytics | Mobile crash reporting | Crash rate > 0.5% |
| [Uptime Robot] | Uptime monitoring | Downtime > 1 menit |
| [Grafana / Datadog] | Metrics dashboard (advanced) | p95 latency > 1s, 5xx rate > 0.5% |

**Health Check Endpoint (wajib ada):**
```
GET /health
```
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "timestamp": "2024-01-15T10:00:00Z",
  "services": {
    "database": "healthy",
    "redis": "healthy",
    "storage": "healthy"
  }
}
```

---

## 10. Data Privacy & Compliance

<!--
  Penting untuk semua app yang mengumpulkan data user di Indonesia.
  Relevan ke UU PDP (Undang-undang Perlindungan Data Pribadi No. 27 Tahun 2022)
  yang berlaku penuh sejak Oktober 2024.
  Kalau ini internal tool tanpa data user nyata, tandai section ini sebagai N/A.
-->

### 10.1 Data Inventory

| Data yang Dikumpulkan | Tujuan | Disimpan Di | Retention | Sensitif? |
|----------------------|--------|-------------|-----------|-----------|
| Nama, email, nomor WA | Identifikasi akun & notifikasi darurat | PostgreSQL | Selama akun aktif + 1 tahun | No (PII kontak) |
| Password (bcrypt hash) | Autentikasi keamanan | PostgreSQL | Selama akun aktif | Yes (Sangat Sensitif) |
| Telemetri Sensor IoT (pH, DO, Suhu, Kelembaban) | Analitik real-time & AI harvest prediction | PostgreSQL (TimescaleDB) | 3 tahun (rolling compression) | No |
| Log Sirkular (Limbah organik, panen maggot, penghematan) | Perhitungan efisiensi zero-waste & karbon | PostgreSQL | Selama farm aktif + 5 tahun | No |
| Foto Bukti Panen & Maggot | Verifikasi kualitas pakan & E-Commerce | Cloud Storage (R2/S3) | 2 tahun | No |
| Device token (FCM) | Push notification alert kondisi kritis | PostgreSQL | Selama akun & device aktif | No |
| Log aktivitas & transaksi | Audit trail & history e-commerce | PostgreSQL & Logging service | 5 tahun (UU KUP/Keuangan) | No |

### 10.2 User Rights (UU PDP)

User berhak mendapatkan:

| Hak | Implementasi di Produk |
|-----|----------------------|
| **Hak akses** (tahu data apa yang disimpan) | Endpoint `GET /api/v1/users/me/data` — return semua data user |
| **Hak koreksi** (perbaiki data yang salah) | Endpoint `PATCH /api/v1/users/me` |
| **Hak penghapusan** | Endpoint `DELETE /api/v1/users/me` — soft delete + anonymize PII |
| **Hak portabilitas** (export data) | Endpoint `GET /api/v1/users/me/export` — return JSON |
| **Hak keberatan** (opt-out processing) | Settings: opt-out analytics, marketing |

### 10.3 Data Security Checklist

- [ ] Password di-hash dengan bcrypt (cost factor >= 12)
- [ ] Semua komunikasi menggunakan HTTPS
- [ ] Data di-encrypt at rest (jika cloud provider support, aktifkan)
- [ ] PII tidak pernah muncul di log
- [ ] Access ke data production dibatasi — hanya via role yang perlu
- [ ] Regular backup dengan encryption
- [ ] Breach response plan tersedia (siapa yang dihubungi kalau ada data leak)

### 10.4 Privacy Policy & Terms of Service

- [ ] Privacy Policy sudah ditulis dan bisa diakses dari app
- [ ] Terms of Service sudah tersedia
- [ ] User wajib setuju sebelum bisa register (checkbox, bukan pre-checked)
- [ ] Halaman Privacy Policy dan ToS punya URL permanen (tidak boleh berubah)

---

## 11. UI/UX Requirements

### 11.1 Screen List

| ID | Screen | Persona | Priority | Notes |
|----|--------|---------|----------|-------|
| S-01 | Splash Screen | Semua | P0 | Cek status token JWT & animasi logo JagoFarm |
| S-02 | Onboarding Smart Farming | Petani / Mitra | P1 | 3 slide pengenalan IoT, Maggot Zero-Waste, & AI |
| S-03 | Login | Semua | P0 | Email + Google OAuth dengan pemantauan sesi |
| S-04 | Register | Semua | P0 | Registrasi akun baru & pemilihan tipe lahan awal |
| S-05 | Forgot Password | Semua | P0 | Pemulihan akses via link verifikasi email |
| S-06 | Dashboard Farm Overview | Petani / Agronomis | P0 | Ringkasan metrik kolam/greenhouse & status sensor live |
| S-07 | IoT Live Monitoring & Chart | Petani / Agronomis | P0 | Grafik telemetri real-time (pH, DO, Suhu) & indikator kritis |
| S-08 | Circular Ecosystem Log | Petani / Peternak | P0 | Form input limbah organik, panen maggot, & kalkulator hemat |
| S-09 | AI Harvest Prediction (`[Pro]`) | Agronomis / Petani | P1 | Estimasi tanggal panen, Brix score, & rekomendasi AI |
| S-10 | Marketplace Katalog B2B | Pembeli / Mitra | P1 | Katalog melon premium, maggot kering, & pupuk cair |
| S-11 | Profile & Paywall Upgrade | Semua | P0 | Pilihan langganan tier Starter/Pro via QRIS/VA Midtrans |

### 11.2 Design References

- **Design Tool:** Figma & Three.js Web Canvas (Vite)
- **Design System:** Material 3 (Flutter Mobile) + Custom Glassmorphism UI (React Web Dashboard)
- **Primary (Forest Green):** `#1B4D3E` — Melambangkan pertanian modern & keberlanjutan ekosistem
- **Secondary (Solar Gold/Orange):** `#F5A623` — Melambangkan energi, panen premium, & peringatan aktif
- **Background Dark Mode:** `#0A0F0D` — Sleek OLED dark mode untuk penghematan baterai di lapangan
- **Background Light Mode:** `#F8FAF9` — Clean organic light background
- **Error / Alert Critical:** `#E63946` — Peringatan saat DO kolam anjlok atau suhu melebihi ambang batas

### 11.3 User Flow Utama

```
User Buka Aplikasi / Portal Web
  +-- [Belum Login] -> Splash -> Login / Register
  |                                 +-- Berhasil -> Dashboard Farm Overview (S-06)
  +-- [Sudah Login] -> Splash -> Dashboard Farm Overview (S-06)
                                   +-- Cek Sensor Telemetri Real-Time -> IoT Monitoring (S-07)
                                   +-- Catat Limbah & Panen Maggot -> Circular Log (S-08)
                                   +-- Cek Prediksi Panen AI -> AI Harvest Engine (S-09)
                                   +-- Belanja Produk Organik -> Marketplace Katalog (S-10)
```

---

## 12. Sprint Planning & Timeline

### 12.1 Communication Cadence

| Meeting | Frekuensi | Durasi | Peserta | Output |
|---------|-----------|--------|---------|--------|
| Daily Standup | Setiap hari kerja | 15 menit max | Semua developer + PM | Update progress, blocker |
| Sprint Planning | Setiap awal sprint | 1-2 jam | Semua tim | Sprint backlog, commitment |
| Sprint Review / Demo | Setiap akhir sprint | 1 jam | Semua tim + stakeholder | Demo fitur, feedback |
| Sprint Retrospective | Setiap akhir sprint | 45 menit | Semua developer + PM | Action items improvement |
| Weekly Sync | Setiap Jumat | 30 menit | PM + stakeholder | Progress update, blockers |

**Format Daily Standup (async via teks juga OK):**
```
1. Kemarin ngerjain apa?
2. Hari ini mau ngerjain apa?
3. Ada blocker?
```

**Reporting ke Stakeholder:**
- Weekly summary setiap Jumat via email/Notion
- Demo setiap akhir sprint (bukan hanya laporan teks)
- Kalau ada risiko atau perubahan timeline, langsung escalate — jangan tunggu meeting

### 12.2 Phases / Milestones

| Phase | Deliverable | Durasi | Target Date |
|-------|------------|--------|-------------|
| **Phase 0** | Setup: repo, CI/CD, boilerplate, DB, staging env | 1 minggu | 17/07/2026 |
| **Phase 1** | MVP — semua P0 selesai (Auth, IoT Live Chart, Circular Log), tested di staging | 4 minggu | 14/08/2026 |
| **Phase 2** | Beta — P1 features (AI Harvest Prediction, Marketplace B2B) + bug fix | 3 minggu | 04/09/2026 |
| **Phase 3** | Production launch + monitoring & stress test | 1 minggu | 11/09/2026 |
| **Phase 4** | Post-launch iteration — P2 features (Community Forum & Advanced Analytics) | Ongoing | Q4 2026 |

### 12.3 Sprint Breakdown

#### Sprint 1 — (13/07/2026 - 24/07/2026)
**Goal:** Environment siap, setup arsitektur dasar, dan sistem otentikasi lengkap

| Task | PIC | Estimasi | Status |
|------|-----|----------|--------|
| Init repo + branch strategy (Gitflow) | Shafnat / Tech Lead | 0.5 hari | Todo |
| Setup Flutter & React Vite project (Clean Arch) | Tim Frontend | 1 hari | Todo |
| Setup FastAPI boilerplate + Alembic migration awal | Tim Backend | 1 hari | Todo |
| Setup PostgreSQL + TimescaleDB & Redis | Tim DevOps | 1 hari | Todo |
| Setup EMQX MQTT Broker over TLS | Tim IoT | 1 hari | Todo |
| Backend & Frontend Auth flow (Register, Login, JWT Rotation) | Fullstack Dev | 3 hari | Todo |
| Setup GitHub Actions CI/CD & Sentry monitoring | Tim DevOps | 1 hari | Todo |

#### Sprint 2 — (27/07/2026 - 07/08/2026)
**Goal:** Telemetri IoT Ingestion, Live Monitoring Chart, & Circular Ecosystem Log (MVP Core)

| Task | PIC | Estimasi | Status |
|------|-----|----------|--------|
| Backend: MQTT consumer bridge ke TimescaleDB | Tim IoT / Backend | 2 hari | Todo |
| Backend: Endpoint `/api/v1/telemetry` & `/api/v1/circular-logs` | Tim Backend | 2 hari | Todo |
| Frontend Mobile: Live Chart IoT (pH, DO, Suhu) & Alerting UI | Tim Mobile | 3 hari | Todo |
| Frontend Web Dashboard: 3D Ecosystem overview & Circular Log form | Tim Web | 3 hari | Todo |
| Test: End-to-end integration tests untuk IoT telemetry & log | QA Engineer | 2 hari | Todo |

---

## 13. Dependencies

### 13.1 Internal Dependencies

| Task / Feature | Depends On | Notes |
|----------------|-----------|-------|
| Semua feature lain | F-01 Auth selesai | Gate utama |
| Frontend feature X | Backend endpoint X tersedia | Bisa paralel dengan mock data |
| Paywall / gating | Payment gateway terintegrasi | Blokir kalau payment belum siap |
| AI feature | AI API key tersedia + ditest | Jangan assume langsung jalan |
| Deploy production | Semua P0 done + load test passed | Urutan tidak bisa dibalik |

### 13.2 External Dependencies

| Dependency | Provider | Status | PIC | Deadline | Risk |
|-----------|---------|--------|-----|----------|------|
| Payment gateway API key & QRIS | Midtrans | Pending | Tim DevOps | 24/07/2026 | High |
| WhatsApp Business approval | Meta / Cloud API | Pending | Tim Backend | 31/07/2026 | Medium |
| Design final UI/UX & 3D Assets | Tim Internal | In Progress | Product Designer | 17/07/2026 | Medium |
| Cloud Server & Database Cluster | Railway / AWS ECS | Todo | Tim DevOps | 17/07/2026 | High |
| Firebase Cloud Messaging setup | Google | Todo | Tim Mobile | 24/07/2026 | Low |

### 13.3 Library Dependencies

**Backend (requirements.txt):**
```
fastapi>=0.110.0
uvicorn[standard]>=0.27.0
sqlalchemy>=2.0.0
alembic>=1.13.0
pydantic[email]>=2.6.0
pydantic-settings>=2.2.0
python-jose[cryptography]>=3.3.0
passlib[bcrypt]>=1.7.4
httpx>=0.27.0
redis>=5.0.0
sentry-sdk[fastapi]>=1.45.0
pytest>=8.0.0
pytest-asyncio>=0.23.0
pytest-cov>=4.1.0
locust>=2.24.0
black>=24.0.0
isort>=5.13.0
ruff>=0.3.0
```

**Flutter (pubspec.yaml):**
```yaml
dependencies:
  flutter_riverpod: ^2.5.1
  dio: ^5.4.3
  go_router: ^13.2.0
  flutter_secure_storage: ^9.0.0
  cached_network_image: ^3.3.1
  firebase_core: ^2.27.0
  firebase_auth: ^4.17.8
  firebase_messaging: ^14.7.15
  firebase_crashlytics: ^3.4.15

dev_dependencies:
  flutter_test:
    sdk: flutter
  mocktail: ^1.0.3
  build_runner: ^2.4.8
```

---

## 14. Risks & Mitigations

| ID | Risk | Likelihood | Impact | Mitigation | Owner |
|----|------|-----------|--------|------------|-------|
| R-01 | External API (payment/WA/OpenAI) tidak stabil atau limit | High | High | Buat mock response & sirkuit breaker di FastAPI | Shafnat / Backend Lead |
| R-02 | Koneksi internet putus-nyambung di kolam/greenhouse terpencil | High | High | Fitur offline cache SQLite di mobile app & edge queue di IoT Gateway | Tim Mobile & IoT |
| R-03 | Performance bottleneck saat jutaan baris telemetri masuk | Medium | High | Gunakan TimescaleDB hypertable dengan partisi bulanan + kompresi | Tim DevOps / DB |
| R-04 | Anggota tim tidak available mendadak | Medium | Medium | Dokumentasi PRD/API lengkap, code review wajib, & standar arsitektur | Shafnat / PM |
| R-05 | Security vulnerability pada endpoint telemetri IoT | Low | Critical | Wajib autentikasi TLS & JWT device certificate per sensor | Tech Lead |
| R-06 | Budget cloud membengkak akibat penyimpanan foto proof | Low | Medium | Gunakan Cloudflare R2 (zero egress fee) + kompresi WebP otomatis | Tim DevOps |
| R-07 | DB migration gagal di production | Low | Critical | Test `downgrade()` di staging, backup snapshot sebelum migrate | Tech Lead |
| R-08 | Data breach / kebocoran data user & transaksi | Low | Critical | Enkripsi bcrypt untuk password, log tanpa PII, & audit trail | Tech Lead + PM |

---

## 15. Definition of Done (DoD)

### Feature Level

- [ ] Semua acceptance criteria (Section 4.3) terpenuhi
- [ ] Unit test ditulis dan passing (Backend >= 70%, Flutter >= 60%)
- [ ] Integration test untuk endpoint terkait passing
- [ ] Tidak ada breaking change di feature lain
- [ ] Dokumentasi API di-update jika ada perubahan endpoint
- [ ] Sudah di-test di staging dan device nyata (Android & iOS)
- [ ] Tidak ada unhandled error di log Sentry
- [ ] Code sudah di-review minimal 1 orang, semua comment resolved
- [ ] PR sudah di-merge ke `develop`

### Sprint Level

- [ ] Semua task sprint selesai (atau ada justifikasi yang jelas)
- [ ] Demo bisa dijalankan di staging tanpa error
- [ ] Sprint retrospective sudah dilakukan
- [ ] Backlog sprint berikutnya sudah di-groom

### Release Level (Production)

- [ ] Semua DoD feature level terpenuhi untuk P0 features
- [ ] Load test passed sesuai target di Section 2.5 (p95 < 500ms)
- [ ] Security review selesai & tidak ada celah di MQTT broker
- [ ] Rollback plan sudah disiapkan (termasuk DB rollback)
- [ ] Monitoring aktif (Sentry, uptime monitor, Prometheus)
- [ ] Privacy Policy dan ToS tersedia dari app & portal web
- [ ] README dan deployment guide sudah di-update

---

## 16. Open Questions

| ID | Pertanyaan | Owner | Deadline | Status |
|----|-----------|-------|----------|--------|
| Q-01 | Apakah perlu dukungan offline sync untuk input log sirkular maggot di kolam yang sama sekali tidak ada sinyal cellular? | Shafnat / Product Lead | 17/07/2026 | Open (Disiapkan di desain lokal SQLite) |
| Q-02 | Apakah Midtrans QRIS/VA cukup untuk langganan tier B2B atau perlu tambahan metode Invoice 14 hari kerja? | Tim Business | 24/07/2026 | Open |
| Q-03 | Apakah model AI Harvest Prediction cukup memakai `gpt-4o` dengan prompt engineering atau perlu fine-tuning model khusus di masa depan? | AI Engineer | 31/07/2026 | Resolved: MVP pakai `gpt-4o` dengan context rag dari TimescaleDB |
| Q-04 | Siapa PIC yang menangani onboarding perangkat keras IoT ke kebun mitra saat pertama kali instalasi? | Tim Ops / Field Engineering | 24/07/2026 | Open |

---

## 17. Changelog

| Versi | Tanggal | Perubahan | Author |
|-------|---------|-----------|--------|
| v1.0 | 10/07/2026 | Full PRD JagoFarm — Smart Farming & Circular Agri-Ecosystem (Zero-waste & IoT) melengkapi keseluruhan Bab 1 hingga 18 | Shafnat & AI Architect |

---

## 18. Appendix

### Glossary

| Term | Definisi |
|------|---------|
| MVP | Minimum Viable Product — versi paling minimal yang memberikan nilai ke user |
| PRD | Product Requirements Document — dokumen ini |
| P0/P1/P2/P3 | Priority level — P0 paling kritis, P3 di-skip |
| DoD | Definition of Done |
| RACI | Responsible, Accountable, Consulted, Informed |
| AC | Acceptance Criteria |
| Soft Delete | Record tidak dihapus dari DB, hanya `deleted_at` diisi |
| p95 | Percentile 95 — 95% request lebih cepat dari angka ini |
| Token Rotation | Setiap refresh menghasilkan token baru, token lama langsung invalid |
| PII | Personally Identifiable Information — nama, email, nomor HP, dsb |
| UU PDP | Undang-undang Perlindungan Data Pribadi No. 27 Tahun 2022 (Indonesia) |
| MRR | Monthly Recurring Revenue |
| Brix | Satuan ukuran kandungan gula terlarut dalam buah (cth: melon premium >= 14 Brix) |
| DO (Dissolved Oxygen) | Kadar oksigen terlarut dalam air kolam ikan (kritis jika < 4.0 mg/L) |
| BSF / Maggot | Black Soldier Fly — larva lalat yang biokonversi limbah organik menjadi protein tinggi |
| TimescaleDB | Ekstensi PostgreSQL untuk manajemen data time-series (telemetri sensor IoT) |
| MQTT | Message Queuing Telemetry Transport — protokol komunikasi ringan untuk IoT |

### References
- [JagoFarm Research & Competitor Analysis (eFishery / EdenFarm / Maggot Zero-Waste)](file:///c:/Users/shafnats/Development/JagoFarm/docs/research_notes.md)
- [JagoFarm Design Brief & 3D Interactive Web Canvas POC](file:///c:/Users/shafnats/Development/JagoFarm/web/src/App.jsx)
- [FastAPI & TimescaleDB Telemetry Architectural Spec](file:///c:/Users/shafnats/Development/JagoFarm/docs/ARCHITECTURE.md)
- [Midtrans QRIS & Virtual Account Integration Docs](https://docs.midtrans.com)
- [OpenAI gpt-4o Agronomy Prompting Guide](https://platform.openai.com/docs)

---

> **AI Context Note — BACA INI SEBELUM GENERATE KODE:**
>
> Dokumen ini adalah single source of truth untuk project ini.
> Saat generate atau memodifikasi kode, selalu refer ke:
>
> - **Section 6.1** — Tech stack (versi library, framework)
> - **Section 6.3** — Database schema (tabel, kolom, tipe, relasi, index)
> - **Section 6.4** — API contract (format request/response, status code, error code, rate limit headers)
> - **Section 6.5** — Project structure + .env.example
> - **Section 7** — Coding standards (naming, pattern, linting tools)
> - **Section 4.3** — Acceptance criteria per feature
> - **Section 2.3** — MVP boundary (jangan implement yang belum masuk MVP)
> - **Section 10** — Data privacy (jangan log PII, mask sensitive field)
>
> Jangan buat file di luar struktur Section 6.5.
> Jangan pakai tech stack yang tidak ada di Section 6.1 tanpa konfirmasi.
> Semua API response WAJIB pakai format standar di Section 6.4.
> Semua endpoint WAJIB sertakan rate limit response headers.
