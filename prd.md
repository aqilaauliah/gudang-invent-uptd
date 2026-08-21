### Sistem Informasi Gudang dan Inventaris

**UPTD Pengawasan Ketenagakerjaan Wilayah II Karawang**

---

## 1. Pendahuluan

SIGUDIN (Sistem Informasi Gudang dan Inventaris) adalah sistem informasi berbasis web yang digunakan untuk mengelola data persediaan barang dan inventaris/aset milik UPTD Pengawasan Ketenagakerjaan Wilayah II Karawang.

Sistem dirancang untuk membantu admin dalam melakukan pencatatan, pemantauan, dan pelaporan barang secara terstruktur.

Karakteristik utama sistem:

* Barang tidak hanya ditempatkan pada satu lokasi.
* Satu jenis barang dapat memiliki stok di beberapa lokasi.
* Pengambilan barang tidak menggunakan sistem pengajuan atau approval.
* Barang keluar langsung dicatat oleh admin.
* Sistem dapat mendeteksi barang yang stoknya menipis.
* Sistem dapat mencatat barang inventaris/aset secara individual.
* Sistem menyediakan riwayat barang masuk, barang keluar, dan perpindahan lokasi.
* Sistem menyediakan laporan yang dapat digunakan untuk kebutuhan administrasi dan monitoring.

---

## 2. Tujuan Sistem

SIGUDIN memiliki tujuan:

1. Mempermudah pengelolaan data barang dan inventaris.
2. Mengetahui jumlah stok barang secara akurat.
3. Mengetahui lokasi penyimpanan setiap barang.
4. Mencatat barang masuk dan barang keluar.
5. Mencatat perpindahan barang antar lokasi.
6. Memberikan peringatan ketika stok barang mencapai batas minimum.
7. Mempermudah pendataan inventaris/aset kantor.
8. Mengetahui kondisi dan lokasi setiap aset.
9. Menyediakan riwayat transaksi barang.
10. Menyediakan laporan yang mudah dipahami dan dapat diekspor.

---

## 3. Ruang Lingkup

SIGUDIN terdiri dari dua bagian utama:

### 3.1 Persediaan / Inventory

Digunakan untuk barang yang jumlahnya berubah berdasarkan transaksi masuk dan keluar.

Contoh:

* Kertas
* Pulpen
* Map
* Tinta printer
* Spidol
* ATK
* Barang habis pakai lainnya

Fitur:

* Data barang
* Kategori barang
* Satuan
* Stok
* Stok minimum
* Lokasi penyimpanan
* Barang masuk
* Barang keluar
* Mutasi barang
* Penyesuaian stok
* Deteksi stok menipis
* Riwayat transaksi
* Laporan persediaan

### 3.2 Inventaris / Aset

Digunakan untuk barang/aset yang dimiliki dan digunakan dalam operasional kantor.

Contoh:

* Laptop
* Komputer
* Printer
* Meja
* Kursi
* Lemari
* Proyektor
* AC
* Peralatan kantor lainnya

Fitur:

* Data inventaris
* Kode inventaris
* Kategori aset
* Merk
* Tipe/model
* Nomor seri
* Tahun perolehan
* Nilai perolehan
* Lokasi
* Penanggung jawab
* Kondisi
* Status
* Foto aset
* Riwayat lokasi
* Riwayat kondisi
* Laporan inventaris

---

## 4. Pengguna Sistem

### Admin

Admin memiliki akses penuh terhadap sistem.
Admin dapat:
* Mengelola data barang.
* Mengelola kategori.
* Mengelola satuan.
* Mengelola lokasi.
* Mencatat barang masuk.
* Mencatat barang keluar.
* Melakukan mutasi barang.
* Melakukan penyesuaian stok.
* Mengelola inventaris/aset.
* Melihat laporan.
* Mengelola pengguna.
* Melihat riwayat aktivitas.

Untuk versi awal, sistem dapat menggunakan satu role utama yaitu **Admin**.

---

# 5. Kebutuhan Fungsional

## 5.1 Dashboard

Dashboard menjadi halaman utama setelah admin login.

Dashboard menampilkan:

* Total jenis barang.
* Total stok.
* Total inventaris.
* Total lokasi.
* Jumlah barang menipis.
* Jumlah barang habis.
* Jumlah inventaris bermasalah.
* Aktivitas terbaru.
* Peringatan stok menipis.
* Grafik barang masuk dan keluar.
* Distribusi barang berdasarkan lokasi.
* Kondisi inventaris.

---

## 5.2 Master Data Barang

Admin dapat menambahkan, mengubah, melihat, dan menghapus data barang.

Data barang terdiri dari:

* ID barang
* Kode barang
* Nama barang
* Kategori
* Satuan
* Stok minimum
* Deskripsi
* Status aktif/nonaktif

Contoh:

```text
Kode       : ATK-001
Nama       : Kertas A4
Kategori   : ATK
Satuan     : Rim
Stok Min.  : 5
```

---

## 5.3 Kategori Barang

Admin dapat mengelola kategori barang.

Contoh:

* ATK
* Elektronik
* Perlengkapan Kantor
* Kebersihan
* Peralatan Pengawasan
* Lainnya

---

## 5.4 Satuan

Admin dapat mengelola satuan barang.

Contoh:

* Pcs
* Rim
* Box
* Unit
* Set
* Botol
* Buah

---

## 5.5 Lokasi Penyimpanan

Sistem harus mendukung banyak lokasi.

Contoh:

* Gudang Utama
* Ruang Tata Usaha
* Ruang Administrasi
* Ruang Pengawasan
* Ruang Kepala UPTD
* Ruang Arsip
* Ruang lainnya

Satu barang dapat memiliki stok pada beberapa lokasi.

Contoh:

```text
Pulpen

Gudang Utama          : 20 pcs
Ruang Administrasi    : 10 pcs
Ruang Pengawasan      : 5 pcs

Total                 : 35 pcs
```

---

# 6. Barang Masuk

Admin dapat mencatat barang yang masuk ke sistem.

Data transaksi:

* Tanggal
* Nomor transaksi
* Barang
* Jumlah
* Satuan
* Lokasi tujuan
* Sumber/supplier
* Nomor dokumen
* Keterangan
* Admin pencatat

Setelah transaksi disimpan:

```text
Stok lokasi = stok sebelumnya + jumlah masuk
```

Sistem juga membuat riwayat transaksi.

---

# 7. Barang Keluar

Barang keluar tidak menggunakan sistem pengajuan.

Admin dapat langsung mencatat barang yang diambil.

Data transaksi:

* Tanggal
* Nomor transaksi
* Barang
* Lokasi asal
* Jumlah
* Pengambil
* Keperluan
* Keterangan
* Admin pencatat

Setelah transaksi disimpan:

```text
Stok lokasi = stok sebelumnya - jumlah keluar
```

Sistem harus melakukan validasi agar jumlah barang keluar tidak melebihi stok yang tersedia pada lokasi tersebut.

Contoh:

```text
Stok Ruang Administrasi : 20 pcs
Barang keluar           : 5 pcs
Stok setelah transaksi  : 15 pcs
```

---

# 8. Deteksi Stok Menipis

Setiap barang memiliki nilai `stok_minimum`.

Sistem menghitung total stok barang dari seluruh lokasi.

Status barang:

### Aman

```text
total_stok > stok_minimum
```

### Menipis

```text
total_stok <= stok_minimum
AND
total_stok > 0
```

### Habis

```text
total_stok = 0
```

Contoh:

```text
Pulpen
Total stok    : 7 pcs
Stok minimum  : 10 pcs
Status        : MENIPIS
```

Sistem menampilkan peringatan pada:

* Dashboard
* Halaman persediaan
* Notifikasi
* Laporan stok menipis

---

# 9. Mutasi Barang

Mutasi digunakan untuk memindahkan stok dari satu lokasi ke lokasi lainnya.

Contoh:

```text
Dari:
Gudang Utama

Ke:
Ruang Administrasi

Barang:
Kertas A4

Jumlah:
10 Rim
```

Sistem melakukan:

```text
Gudang Utama
100 → 90

Ruang Administrasi
20 → 30
```

Setiap mutasi harus masuk ke riwayat.

---

# 10. Penyesuaian Stok

Admin dapat melakukan penyesuaian stok apabila jumlah fisik berbeda dengan jumlah yang tercatat dalam sistem.

Contoh:

```text
Stok sistem : 20
Stok fisik  : 18
Selisih     : -2
Alasan      : Hasil stock opname
```

Penyesuaian harus memiliki:

* Tanggal
* Barang
* Lokasi
* Stok sebelum
* Stok sesudah
* Selisih
* Alasan
* Admin

---

# 11. Inventaris / Aset

Inventaris menggunakan pencatatan individual.

Data inventaris:

* Kode inventaris
* Nama aset
* Kategori
* Merk
* Tipe/model
* Nomor seri
* Tahun perolehan
* Sumber perolehan
* Nilai perolehan
* Lokasi
* Penanggung jawab
* Kondisi
* Status
* Foto
* Keterangan

Contoh:

```text
Kode Inventaris : INV-001
Nama            : Laptop
Merk            : Lenovo
Model           : ThinkPad
Nomor Seri      : XXXXX
Tahun           : 2026
Lokasi          : Ruang Tata Usaha
Penanggung Jawab: Admin
Kondisi         : Baik
Status          : Digunakan
```

---

# 12. Kondisi Inventaris

Kondisi aset terdiri dari:

* Baik
* Rusak Ringan
* Rusak Berat

Status aset dapat berupa:

* Digunakan
* Tersimpan
* Dipindahkan
* Dalam Perbaikan
* Tidak Digunakan

---

# 13. Riwayat Inventaris

Sistem mencatat perubahan penting pada aset.

Contoh:

```text
INV-001

2026-08-01
Lokasi: Ruang TU
Kondisi: Baik

2026-08-15
Dipindahkan ke Ruang Pengawasan

2026-08-18
Kondisi berubah menjadi Rusak Ringan
```

---

# 14. Laporan

Sistem menyediakan:

### Laporan Persediaan

Menampilkan:

* Kode barang
* Nama barang
* Kategori
* Total stok
* Stok minimum
* Status

### Laporan Barang Masuk

Menampilkan seluruh transaksi barang masuk berdasarkan periode.

### Laporan Barang Keluar

Menampilkan seluruh transaksi barang keluar berdasarkan periode.

### Laporan Mutasi

Menampilkan perpindahan barang antar lokasi.

### Laporan Inventaris

Menampilkan seluruh aset.

### Laporan Berdasarkan Lokasi

Menampilkan barang yang tersedia pada lokasi tertentu.

### Laporan Stok Menipis

Menampilkan barang yang mencapai batas minimum.

Laporan dapat:

* Difilter
* Dicari
* Dicetak
* Diekspor ke Excel
* Diekspor ke PDF

---

# 15. Audit Trail

Sistem menyimpan aktivitas admin.

Contoh:

```text
Admin menambahkan barang baru
Admin mencatat barang masuk
Admin mencatat barang keluar
Admin melakukan mutasi barang
Admin mengubah data inventaris
Admin melakukan penyesuaian stok
```

Data aktivitas:

* User
* Aktivitas
* Waktu
* Data terkait

---

# 16. Aturan Bisnis

1. Barang persediaan dan inventaris/aset dikelola sebagai dua kategori pengelolaan yang berbeda.
2. Satu jenis barang dapat berada di banyak lokasi.
3. Stok persediaan dihitung berdasarkan lokasi.
4. Barang keluar tidak memerlukan pengajuan.
5. Barang keluar hanya dapat dicatat jika stok pada lokasi mencukupi.
6. Setiap barang memiliki stok minimum.
7. Sistem otomatis mendeteksi barang menipis.
8. Stok habis ditandai sebagai status Habis.
9. Pemindahan barang antar lokasi menggunakan transaksi mutasi.
10. Setiap perubahan stok harus memiliki riwayat transaksi.
11. Penyesuaian stok wajib memiliki alasan.
12. Inventaris/aset memiliki kode inventaris unik.
13. Inventaris dapat memiliki lokasi dan penanggung jawab.
14. Admin dapat melihat seluruh data sistem.

---

# 17. Kebutuhan Non-Fungsional

### Usability

Antarmuka harus mudah digunakan oleh admin non-teknis.

### Performance

Dashboard dan tabel harus dapat memuat data secara cepat.

### Security

* Authentication
* Authorization
* Validasi input
* CSRF protection
* Password hashing
* Audit trail

### Responsive

Sistem harus dapat digunakan pada:

* Desktop
* Laptop
* Tablet
* Mobile

### Maintainability

Struktur aplikasi harus mudah dikembangkan dan dipelihara.

---

# 18. Teknologi

Teknologi yang direkomendasikan:

* Backend: Laravel
* Frontend: React
* Styling: Tailwind CSS
* Database: MySQL
* Authentication: Laravel Breeze / Laravel Sanctum sesuai kebutuhan
* Export: Excel dan PDF
* Version Control: Git

---

# 19. Struktur Modul

```text
SIGUDIN
│
├── Dashboard
│
├── Master Data
│   ├── Barang
│   ├── Kategori
│   ├── Satuan
│   └── Lokasi
│
├── Persediaan
│   ├── Stok
│   ├── Barang Masuk
│   ├── Barang Keluar
│   ├── Mutasi
│   └── Penyesuaian Stok
│
├── Inventaris
│   ├── Data Inventaris
│   ├── Kondisi
│   ├── Lokasi
│   └── Riwayat
│
├── Laporan
│   ├── Persediaan
│   ├── Barang Masuk
│   ├── Barang Keluar
│   ├── Mutasi
│   └── Inventaris
│
└── Sistem
    ├── Pengguna
    ├── Aktivitas
    └── Pengaturan
```

---

# 20. Success Criteria

SIGUDIN dianggap berhasil apabila:

* Admin dapat mengelola data barang.
* Admin dapat mengelola banyak lokasi.
* Stok dapat dihitung berdasarkan lokasi.
* Barang masuk dapat dicatat.
* Barang keluar dapat dicatat tanpa pengajuan.
* Mutasi antar lokasi dapat dilakukan.
* Sistem dapat mendeteksi stok menipis.
* Sistem dapat mendeteksi stok habis.
* Inventaris/aset dapat dicatat secara individual.
* Kondisi dan lokasi aset dapat dipantau.
* Riwayat transaksi dapat dilihat.
* Laporan dapat dibuat dan diekspor.
* Seluruh aktivitas penting dapat dilacak.
