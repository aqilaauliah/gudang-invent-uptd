# Design System & UI/UX

## SIGUDIN

### Sistem Informasi Gudang dan Inventaris

**UPTD Pengawasan Ketenagakerjaan Wilayah II Karawang**

---

# 1. Design Concept

SIGUDIN menggunakan konsep:

> **Modern Government SaaS Dashboard**

Desain menggabungkan karakteristik aplikasi administrasi pemerintahan dengan gaya dashboard SaaS modern.

Tujuan visual:

* Profesional
* Modern
* Bersih
* Terstruktur
* Mudah digunakan
* Terpercaya
* Tidak kaku
* Fokus pada data

Desain tidak boleh terlihat seperti website pemerintahan lama yang penuh tabel dan warna.

---

# 2. Brand Identity

## Logo

Gunakan logo resmi DISNAKERTRANS yang diberikan.

File logo:

```text
/public/assets/logo-disnakertrans.png
```

Logo digunakan pada:

* Sidebar
* Login page
* Header branding
* Halaman autentikasi
* Dokumen/laporan jika diperlukan

Jangan mengubah bentuk, proporsi, atau warna asli logo.

---

# 3. Application Branding

Nama aplikasi:

**SIGUDIN**

Subjudul:

**Sistem Informasi Gudang dan Inventaris**

Identitas instansi:

**UPTD Pengawasan Ketenagakerjaan Wilayah II Karawang**

Contoh:

```text
SIGUDIN
Sistem Informasi Gudang dan Inventaris

UPTD Pengawasan Ketenagakerjaan
Wilayah II Karawang
```

---

# 4. Color Palette

## Primary — Navy

```text
#0B1F3A
```

Digunakan untuk:

* Sidebar
* Heading penting
* Primary branding
* Navigation
* Elemen utama

---

## Navy Secondary

```text
#102A43
```

Digunakan untuk:

* Sidebar secondary
* Hover
* Dark section
* Header tertentu

---

## Blue

```text
#2563EB
```

Digunakan untuk:

* Primary button
* Link
* Active state
* Icon
* Grafik

---

## Soft Blue

```text
#E8F0FF
```

Digunakan untuk:

* Background icon
* Active navigation
* Informasi
* Secondary badge

---

## Yellow / Gold

```text
#F5B700
```

Digunakan untuk:

* Highlight
* Warning
* Stok menipis
* Accent
* Notification indicator

Jangan menggunakan kuning sebagai background utama.

---

## Soft Yellow

```text
#FFF7D6
```

Digunakan untuk:

* Warning card
* Low-stock notification
* Warning badge background

---

## Green

```text
#16A34A
```

Digunakan untuk:

* Stok aman
* Kondisi baik
* Success
* Status aktif

---

## Soft Green

```text
#EAF8EF
```

Digunakan sebagai background status berhasil/aman.

---

## Red

```text
#DC2626
```

Digunakan untuk:

* Stok habis
* Rusak berat
* Error
* Delete action

---

## Neutral

```text
White       #FFFFFF
Background  #F7F9FC
Text        #172033
Muted       #64748B
Border      #E2E8F0
```

---

# 5. Typography

Gunakan:

### Primary Font

**Inter**

Digunakan untuk:

* Body
* Table
* Form
* Navigation
* Data

### Alternative

**Plus Jakarta Sans**

Dapat digunakan untuk heading dan branding.

---

## Typography Scale

```text
Page Title     28px / 32px
Section Title  20px / 28px
Card Title     16px / 24px
Body           14px / 22px
Small Text     12px / 18px
```

Gunakan font-weight:

```text
Regular    400
Medium     500
Semibold   600
Bold       700
```

---

# 6. Layout

Desktop menggunakan:

```text
Sidebar
   +
Topbar
   +
Main Content
```

Sidebar:

```text
Width: 250px
```

Main content:

```text
Width: Flexible
Padding: 24px - 32px
```

Background utama:

```text
#F7F9FC
```

---

# 7. Sidebar

Sidebar menggunakan warna:

```text
#0B1F3A
```

Layout:

```text
Logo
SIGUDIN
Sistem Informasi Gudang dan Inventaris

MAIN
Dashboard

INVENTORY
Data Barang
Persediaan
Barang Masuk
Barang Keluar
Mutasi Barang

ASSET
Inventaris / Aset
Lokasi

REPORT
Laporan

SYSTEM
Pengguna
Pengaturan
```

Menu aktif:

* Background soft blue/navy-blue
* Text putih
* Accent kecil warna yellow
* Icon blue/yellow sesuai kebutuhan

---

# 8. Topbar

Topbar menggunakan:

```text
Background: White
Height: 72px
Border: #E2E8F0
```

Isi:

### Left

* Breadcrumb
* Page title

### Right

* Search
* Notification
* User profile
* Dropdown

Notification menggunakan badge.

Contoh:

```text
🔔 12
```

Angka menunjukkan jumlah peringatan atau notifikasi yang belum dibaca.

---

# 9. Dashboard

Dashboard harus menjadi halaman yang paling informatif.

Header:

```text
Selamat datang, Admin 👋

Kelola persediaan dan inventaris UPTD
dengan lebih mudah dan terstruktur.
```

Tambahkan:

```text
+ Tambah Barang
```

sebagai quick action.

---

# 10. Statistic Cards

Gunakan 6 card:

```text
Total Jenis Barang
245

Total Stok
1,248

Total Inventaris
38

Total Lokasi
6

Barang Menipis
12

Inventaris Bermasalah
5
```

Card:

```text
Background: White
Border Radius: 16px
Shadow: subtle
Padding: 20px
```

Gunakan icon dengan background soft color.

---

# 11. Status System

## Aman

```text
Green
#16A34A
```

Label:

```text
AMAN
```

## Menipis

```text
Yellow
#F5B700
```

Label:

```text
MENIPIS
```

## Habis

```text
Red
#DC2626
```

Label:

```text
HABIS
```

## Inventaris Baik

Green

## Rusak Ringan

Yellow

## Rusak Berat

Red

---

# 12. Low Stock Alert

Buat card khusus:

```text
⚠ Peringatan Stok Menipis

Beberapa barang telah mencapai
batas stok minimum.
```

Contoh:

```text
Pulpen
7 pcs / minimum 10 pcs

Kertas A4
3 rim / minimum 5 rim

Tinta Printer
1 pcs / minimum 2 pcs
```

Gunakan:

* Soft yellow background
* Yellow icon
* Navy text
* Red indicator untuk stok habis

---

# 13. Data Table

Table harus clean dan mudah dibaca.

Header:

```text
Kode
Nama Barang
Kategori
Lokasi
Stok
Minimum
Status
Action
```

Style:

```text
Header background: #F7F9FC
Border: #E2E8F0
Row hover: #F8FAFC
```

Action:

```text
View
Edit
Delete
More
```

Gunakan icon daripada teks panjang jika memungkinkan.

---

# 14. Forms

Form harus menggunakan layout yang sederhana.

Input:

```text
Label
Input
Helper text
Validation
```

Input:

```text
Height: 44px - 48px
Border radius: 10px
Border: #E2E8F0
```

Focus:

```text
Border: #2563EB
```

Error:

```text
Border: #DC2626
```

---

# 15. Buttons

## Primary

```text
Background: #2563EB
Text: White
```

Contoh:

```text
+ Tambah Barang
Simpan
Proses Mutasi
```

## Secondary

```text
Background: White
Border: #E2E8F0
Text: #172033
```

## Warning

```text
Background: #F5B700
Text: Navy
```

## Danger

```text
Background: #DC2626
Text: White
```

---

# 16. Inventory Page

Halaman persediaan harus memiliki:

* Search
* Filter kategori
* Filter lokasi
* Filter status
* Add item button
* Table
* Pagination

Tambahkan summary:

```text
Total Barang
Barang Aman
Barang Menipis
Barang Habis
```

---

# 17. Barang Masuk

Gunakan form dengan struktur:

```text
Tanggal
Nomor Transaksi
Barang
Jumlah
Satuan
Lokasi Tujuan
Sumber / Supplier
Nomor Dokumen
Keterangan
```

Button:

```text
Simpan Barang Masuk
```

---

# 18. Barang Keluar

Karena tidak ada pengajuan, halaman harus dibuat sederhana dan langsung.

Form:

```text
Tanggal
Barang
Lokasi Asal
Jumlah
Pengambil
Keperluan
Keterangan
```

Button:

```text
Simpan Barang Keluar
```

Tambahkan informasi stok:

```text
Stok tersedia:
25 pcs
```

Saat jumlah yang dimasukkan lebih besar dari stok:

```text
Stok tidak mencukupi.
```

---

# 19. Mutasi Barang

Gunakan desain visual transfer:

```text
┌─────────────────┐
│ Gudang Utama    │
│ 100 pcs         │
└────────┬────────┘
         ↓
┌─────────────────┐
│ Ruang TU        │
│ 20 pcs          │
└─────────────────┘
```

Form:

```text
Barang
Lokasi Asal
Lokasi Tujuan
Jumlah
Keterangan
```

Tampilkan stok sebelum dan sesudah.

---

# 20. Inventaris / Aset

Gunakan table atau card.

Informasi:

```text
Kode Inventaris
Nama
Kategori
Merk
Nomor Seri
Lokasi
Penanggung Jawab
Kondisi
Status
```

Tambahkan thumbnail foto aset.

---

# 21. Asset Detail

Detail aset menggunakan layout:

```text
┌──────────────────┬──────────────────────────┐
│                  │ Nama Aset                │
│   FOTO ASET      │ Kode Inventaris          │
│                  │ Merk                     │
│                  │ Model                    │
│                  │ Nomor Seri               │
│                  │ Lokasi                   │
│                  │ Penanggung Jawab         │
│                  │ Kondisi                  │
└──────────────────┴──────────────────────────┘
```

Di bawahnya:

```text
Riwayat Inventaris
```

Gunakan timeline.

---

# 22. Location Management

Gunakan card untuk setiap lokasi.

Contoh:

```text
Gudang Utama

32 jenis barang
428 total stok
18 inventaris

[ Lihat Detail ]
```

Lokasi harus dapat menampilkan:

* Barang
* Jumlah stok
* Inventaris
* Penanggung jawab jika diperlukan

---

# 23. Charts

Gunakan chart yang sederhana dan tidak terlalu dekoratif.

### Barang Masuk vs Keluar

Line chart atau bar chart.

### Stok Berdasarkan Kategori

Donut chart.

### Inventaris Berdasarkan Kondisi

Donut chart.

### Barang Berdasarkan Lokasi

Bar chart.

Gunakan warna:

* Navy
* Blue
* Yellow
* Green

Jangan menggunakan terlalu banyak warna.

---

# 24. Notification

Notification dibagi menjadi:

### Warning

```text
Stok Pulpen menipis.
Sisa 7 pcs dari minimum 10 pcs.
```

### Critical

```text
Stok Tinta Printer habis.
```

### Success

```text
Barang masuk berhasil dicatat.
```

### Info

```text
Barang berhasil dipindahkan ke Ruang Administrasi.
```

---

# 25. Responsive Design

## Desktop

Sidebar tetap terbuka.

## Tablet

Sidebar dapat collapse.

## Mobile

Sidebar menjadi drawer.

Navigation dapat menggunakan:

```text
☰ Menu
```

Table berubah menjadi card list apabila layar terlalu kecil.

---

# 26. UX Principles

Prioritaskan:

1. Data mudah dibaca.
2. Informasi penting terlihat tanpa banyak klik.
3. Status stok mudah dikenali.
4. Form tidak terlalu panjang.
5. Action utama selalu jelas.
6. Hindari modal berlebihan.
7. Gunakan confirmation hanya untuk tindakan penting.
8. Berikan feedback setelah transaksi.
9. Validasi input secara langsung.
10. Jangan menyembunyikan informasi penting.

---

# 27. Iconography

Gunakan icon set yang konsisten.

Rekomendasi:

**Lucide Icons**

Contoh:

```text
Dashboard      LayoutDashboard
Barang         Package
Barang Masuk   PackagePlus
Barang Keluar  PackageMinus
Mutasi         ArrowLeftRight
Inventaris     MonitorSmartphone
Lokasi         MapPin
Laporan        FileText
Notifikasi     Bell
Pengguna       Users
Pengaturan     Settings
```

---

# 28. Border Radius

Gunakan:

```text
Button: 10px
Input: 10px
Card: 16px
Modal: 16px
Badge: 999px
```

---

# 29. Shadow

Gunakan shadow yang sangat halus.

Hindari shadow terlalu gelap.

Contoh:

```text
0 4px 20px rgba(15, 23, 42, 0.06)
```

---

# 30. Spacing

Gunakan sistem spacing yang konsisten:

```text
4px
8px
12px
16px
20px
24px
32px
40px
48px
```

Dashboard menggunakan spacing yang cukup luas agar tidak terlihat penuh.

---

# 31. Login Page

Login menggunakan desain minimal dan profesional.

Layout:

```text
┌───────────────────────┬──────────────────────┐
│                       │                      │
│       LOGO            │      LOGIN           │
│                       │                      │
│       SIGUDIN         │   Email              │
│                       │   Password           │
│   UPTD Pengawasan     │                      │
│   Ketenagakerjaan     │   [ Masuk ]          │
│                       │                      │
└───────────────────────┴──────────────────────┘
```

Gunakan navy sebagai warna utama.

Tambahkan aksen yellow dan green secara minimal.

---

# 32. Empty State

Jika belum ada data:

```text
Belum Ada Data

Belum ada barang yang tersedia.
Tambahkan barang untuk mulai mengelola persediaan.

[ + Tambah Barang ]
```

Gunakan illustration sederhana.

---

# 33. Loading State

Gunakan skeleton loading untuk:

* Cards
* Table
* Charts
* Detail page

Hindari spinner yang terlalu sering.

---

# 34. Error State

Contoh:

```text
Terjadi Kesalahan

Data tidak dapat dimuat.
Silakan coba kembali.

[ Coba Lagi ]
```

---

# 35. Overall Visual Direction

Visual akhir harus terasa seperti:

```text
Modern
      +
Professional
      +
Government
      +
SaaS Dashboard
```

Bukan:

```text
Old Government Website
      atau
Generic Warehouse Template
```

Gunakan logo DISNAKERTRANS sebagai identitas utama dan pertahankan warna asli logo.

Dominasi visual:

```text
Navy  ██████████
Blue  ██████
White ██████████
Green ███
Yellow ██
```

Navy menjadi identitas utama, blue menjadi warna interaksi, green menjadi indikator aman/success, dan yellow menjadi accent/warning.

---

# 36. Frontend Implementation Direction

Design harus mudah diimplementasikan menggunakan:

```text
Laravel
React
Tailwind CSS
Lucide Icons
```

Gunakan reusable components:

```text
Sidebar
Topbar
StatCard
DataTable
StatusBadge
SearchBar
FilterDropdown
Modal
FormInput
Select
Button
Notification
EmptyState
Pagination
ChartCard
```

Pastikan seluruh komponen memiliki desain yang konsisten.

---

# 37. Design Goal

Tujuan akhir desain SIGUDIN adalah membuat admin dapat memahami kondisi gudang dan inventaris hanya dalam beberapa detik setelah membuka dashboard.

Informasi yang harus paling mudah ditemukan:

1. Berapa total stok?
2. Barang apa yang menipis?
3. Barang apa yang habis?
4. Barang berada di lokasi mana?
5. Apa saja inventaris yang dimiliki?
6. Inventaris mana yang bermasalah?
7. Aktivitas barang terbaru apa?
8. Bagaimana kondisi persediaan saat ini?

SIGUDIN harus mengutamakan **clarity, efficiency, consistency, dan data visibility**.
