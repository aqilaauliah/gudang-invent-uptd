# INVENTRA (Inventory & Asset Management System)

**UPTD Pengawasan Ketenagakerjaan Wilayah II Karawang**

---

## 1. Pendahuluan

INVENTRA adalah sistem informasi berbasis web untuk mengelola persediaan barang dan inventaris/aset UPTD Pengawasan Ketenagakerjaan Wilayah II Karawang. Pengguna masuk ke aplikasi untuk mengakses fitur sesuai perannya.

Alur utama aplikasi:

1. Pengguna masuk ke INVENTRA; pengguna yang lupa kata sandi dapat meminta kode verifikasi melalui email untuk mengatur kata sandi baru.
2. Setelah masuk, pengguna melihat dashboard dan menu yang tersedia sesuai izin akunnya.
3. Petugas mengelola transaksi persediaan dan aset sesuai kewenangan, sedangkan Admin juga mengelola data master, pengguna, dan aktivitas.
4. Pengguna memantau persediaan, lokasi, aset, dan laporan. Ekspor laporan hanya tersedia bagi pengguna yang memiliki izin.
5. Pengguna dapat mengelola profil, mengganti kata sandi, serta mengganti email dengan kode verifikasi.

Persediaan dicatat per barang dan per lokasi. Barang keluar dicatat oleh petugas yang memiliki izin melalui aplikasi. Aset dicatat satu per satu dan memiliki riwayat kondisi serta perpindahan lokasi.

---

## 2. Tujuan Sistem

INVENTRA bertujuan untuk:

1. Menyediakan alur terpusat untuk pencatatan persediaan dan inventaris/aset.
2. Menampilkan stok barang secara keseluruhan maupun berdasarkan lokasi.
3. Mencatat barang masuk, barang keluar, dan perpindahan stok antar lokasi.
4. Menampilkan status stok aman, menipis, atau habis berdasarkan stok minimum.
5. Mencatat identitas, kondisi, lokasi, dan riwayat aset.
6. Menyediakan ringkasan dashboard dan laporan operasional.
7. Mengatur akses fitur berdasarkan peran dan izin pengguna.
8. Mendukung ekspor laporan ke Excel dan PDF bagi pengguna berizin.
9. Mendukung pencatatan barang keluar tanpa proses pengajuan atau persetujuan.

---

## 3. Ruang Lingkup

INVENTRA mencakup modul persediaan, aset, lokasi, pelaporan, pengguna, aktivitas, dan pengaturan profil.

### 3.1 Persediaan / Inventory

Digunakan untuk mengelola barang yang jumlahnya berubah akibat transaksi. Data barang mencakup kode, nama, kategori, satuan, stok minimum, deskripsi, dan status aktif/nonaktif.

Fitur yang tersedia:

* Melihat dan mengelola data barang sesuai izin.
* Melihat stok per barang dan per lokasi.
* Mencatat barang masuk dan barang keluar dengan nomor transaksi otomatis.
* Memindahkan stok antar lokasi melalui transaksi mutasi.
* Memantau status aman, menipis, dan habis.
* Mencari serta memfilter data barang dan persediaan.
* Melihat riwayat transaksi melalui laporan.

Kategori dan satuan merupakan atribut pada data barang, bukan modul pengelolaan terpisah. Penyesuaian stok manual belum tersedia pada alur aplikasi.

### 3.2 Inventaris / Aset

Digunakan untuk mencatat aset secara individual. Data aset mencakup kode, nama, kategori, merk, tipe/model, nomor seri, tahun dan sumber perolehan, nilai perolehan, lokasi, penanggung jawab, kondisi, status, foto, dan keterangan.

Fitur yang tersedia:

* Melihat, mencari, memfilter, dan mengelola data aset sesuai izin.
* Melihat detail aset, foto, kondisi, status, lokasi, dan penanggung jawab.
* Memperbarui kondisi aset sesuai izin, termasuk mengunggah foto kondisi.
* Memindahkan aset ke lokasi lain dan mencatat penanggung jawab baru bila diperlukan.
* Melihat riwayat perubahan serta riwayat mutasi aset.
* Meninjau daftar aset pada setiap lokasi.

---

## 4. Pengguna Sistem

Akses menu dan tindakan ditentukan oleh izin pada akun. Peran yang tersedia pada aplikasi adalah Admin dan Petugas Gudang.

### Admin

Admin memiliki izin penuh pada modul aplikasi. Admin dapat:

* Melihat dashboard, persediaan, data barang, aset, lokasi, laporan, dan aktivitas.
* Menambah, mengubah, dan menghapus data barang, aset, lokasi, dan pengguna.
* Mencatat barang masuk, barang keluar, dan mutasi barang.
* Memperbarui kondisi aset dan mencatat mutasi aset.
* Mengekspor laporan ke Excel dan PDF.
* Mengelola profil, email, dan kata sandi sendiri.

### Petugas Gudang

Petugas Gudang memiliki akses operasional sesuai izin yang diberikan. Petugas dapat:

* Melihat dashboard, data barang, persediaan, aset, dan lokasi.
* Mencatat barang masuk, barang keluar, dan mutasi barang.
* Memperbarui kondisi aset serta mencatat mutasi aset.
* Melihat laporan operasional yang diizinkan.
* Mengelola profil, email, dan kata sandi sendiri.

Petugas Gudang tidak memiliki izin untuk mengelola master data barang, aset, lokasi, atau pengguna, serta tidak dapat mengekspor laporan maupun melihat halaman aktivitas. Pengelolaan peran dan pemberian izin dilakukan melalui akun Admin.

---

# 5. Kebutuhan Fungsional

## 5.1 Dashboard

Dashboard adalah halaman utama bagi pengguna yang berhak mengaksesnya. Dashboard menampilkan:

* Total jenis barang dan total stok.
* Total aset dan total lokasi.
* Jumlah barang menipis, barang habis, dan aset dengan kondisi selain baik.
* Grafik barang masuk dan keluar selama enam bulan terakhir.
* Distribusi stok berdasarkan kategori dan lokasi.
* Ringkasan kondisi aset.
* Peringatan barang menipis dan habis dengan tautan menuju persediaan.
* Sepuluh aktivitas terbaru bagi pengguna yang memiliki izin melihat aktivitas.
* Tombol tambah barang bagi pengguna yang memiliki izin mengelola barang.

## 5.2 Master Data Barang

Data barang dapat dilihat oleh pengguna dengan izin melihat barang dan ditambah, diubah, atau dihapus oleh pengguna dengan izin mengelola barang.

Data barang terdiri dari:

* Kode barang (unik)
* Nama barang
* Kategori
* Satuan
* Stok minimum
* Deskripsi (opsional)
* Status aktif atau nonaktif

Halaman data barang menyediakan pencarian berdasarkan kode atau nama, filter kategori dan status, informasi total stok serta status stok, dan paginasi.

Contoh:

```text
Kode        : ATK-001
Nama        : Kertas A4
Kategori    : ATK
Satuan      : Rim
Stok Min.   : 5
Status      : Aktif
```

## 5.3 Kategori Barang

Kategori disimpan sebagai atribut pada data barang dan digunakan untuk mengelompokkan serta memfilter barang, termasuk pada ringkasan grafik dashboard. Tidak tersedia halaman khusus untuk mengelola daftar kategori; nilai kategori diisikan saat mengelola data barang.

Contoh kategori: ATK, Elektronik, Perlengkapan Kantor, Kebersihan, Peralatan Pengawasan, dan Lainnya.

## 5.4 Satuan

Satuan dicatat sebagai atribut pada setiap barang dan ditampilkan dalam data barang, transaksi, serta persediaan. Tidak tersedia halaman khusus untuk mengelola daftar satuan.

Contoh: Pcs, Rim, Box, Unit, Set, Botol, dan Buah.

## 5.5 Lokasi Penyimpanan

Sistem mendukung banyak lokasi. Pengguna berizin dapat melihat lokasi, sedangkan pengelolaan lokasi dibatasi untuk pengguna dengan izin yang sesuai.

Data lokasi mencakup nama, penanggung jawab, dan keterangan. Halaman daftar lokasi merangkum jumlah jenis barang, total stok, dan jumlah aset. Halaman detail lokasi menampilkan barang yang tersedia serta aset yang berada di lokasi tersebut.

Satu jenis barang dapat memiliki stok di beberapa lokasi. Stok di setiap lokasi diperbarui melalui transaksi barang masuk, barang keluar, dan mutasi.

---

# 6. Barang Masuk

Pengguna dengan izin mengelola transaksi dapat mencatat barang yang masuk. Formulir mencakup:

* Tanggal
* Nomor transaksi yang dibuat otomatis oleh sistem
* Barang
* Jumlah dan satuan
* Lokasi tujuan
* Sumber/supplier
* Nomor dokumen
* Keterangan (opsional)

Setelah transaksi berhasil disimpan, stok barang pada lokasi tujuan bertambah sesuai jumlah masuk. Transaksi tercatat untuk kebutuhan riwayat, laporan, dan aktivitas.

```text
Stok lokasi setelah transaksi = stok sebelumnya + jumlah masuk
```

---

# 7. Barang Keluar

Barang keluar tidak memerlukan pengajuan atau persetujuan. Pengguna berizin dapat mencatat pengambilan melalui halaman barang keluar setelah memilih tanggal, barang, lokasi asal, jumlah, pengambil, dan keperluan. Nomor transaksi dibuat otomatis; keterangan dapat ditambahkan.

Sistem menampilkan stok lokasi terpilih dan menolak jumlah yang melebihi ketersediaan.

```text
Stok lokasi setelah transaksi = stok sebelumnya - jumlah keluar
```

---

# 8. Deteksi Stok Menipis

Setiap barang memiliki nilai `stok_minimum`. Sistem menghitung total stok dari seluruh lokasi untuk menentukan status barang.

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
Status        : Menipis
```

Barang menipis dan habis ditampilkan pada ringkasan persediaan dan dashboard. Keduanya juga dapat dilihat pada jenis laporan Stok Menipis. Aplikasi tidak menampilkan notifikasi push atau email khusus untuk perubahan status stok.

---

# 9. Mutasi Barang

Mutasi digunakan untuk memindahkan stok barang dari satu lokasi ke lokasi lain. Formulir mencakup tanggal, nomor transaksi otomatis, barang, lokasi asal, lokasi tujuan, jumlah, dan keterangan opsional.

Lokasi asal dan tujuan harus berbeda dan stok lokasi asal harus mencukupi. Sistem mengurangi stok pada lokasi asal dan menambahkan jumlah yang sama pada lokasi tujuan dalam satu transaksi.

```text
Stok lokasi asal setelah mutasi   = stok sebelumnya - jumlah mutasi
Stok lokasi tujuan setelah mutasi = stok sebelumnya + jumlah mutasi
```

Mutasi tercatat sebagai transaksi dan dapat ditampilkan pada laporan mutasi.

---

# 10. Penyesuaian Stok

Penyesuaian stok berdasarkan hasil stock opname belum tersedia sebagai fitur tersendiri pada aplikasi. Tidak ada formulir atau transaksi penyesuaian manual. Perubahan stok saat ini dilakukan melalui transaksi barang masuk, barang keluar, dan mutasi barang.

---

# 11. Inventaris / Aset

Inventaris dicatat secara individual. Pengelolaan tambah, ubah, dan hapus aset memerlukan izin mengelola aset; akses melihat aset diberikan secara terpisah.

Data inventaris meliputi:

* Kode inventaris (unik)
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

Daftar aset dapat dicari dan difilter menurut kategori, kondisi, status, lokasi, dan rentang tahun perolehan. Detail aset menampilkan informasi tersebut beserta riwayat aset dan riwayat mutasinya.

---

# 12. Kondisi Inventaris

Kondisi aset yang digunakan pada aplikasi:

* Baik
* Rusak Ringan
* Rusak Berat

Kondisi dapat diperbarui oleh pengguna yang memiliki izin khusus. Perubahan dapat disertai unggahan foto kondisi dan dicatat dalam riwayat aset.

Status aset dicatat pada data aset, terpisah dari kondisi. Contoh status yang digunakan meliputi Digunakan, Tersimpan, Dalam Perbaikan, dan Tidak Digunakan.

---

# 13. Riwayat Inventaris

Halaman detail aset menampilkan riwayat pencatatan dan perubahan penting, seperti aset pertama kali dicatat, perubahan lokasi, kondisi, atau status. Riwayat mutasi aset disajikan terpisah dan mencakup lokasi asal dan tujuan, tanggal, penanggung jawab baru bila diisi, serta keterangan.

Pencatatan mutasi aset mencakup pilihan aset, lokasi tujuan, tanggal, penanggung jawab baru (opsional), dan keterangan (opsional). Lokasi tujuan harus berbeda dari lokasi asal.

---

# 14. Laporan

Halaman laporan menyediakan pilihan jenis laporan, filter tahun serta rentang tanggal, visualisasi ringkasan data, dan tabel hasil.

Jenis laporan yang tersedia:

### Laporan Persediaan

Menampilkan kode, nama barang, kategori, total stok, stok minimum, dan status.

### Laporan Barang Masuk

Menampilkan transaksi masuk berdasarkan periode, termasuk nomor, tanggal, barang, jumlah, satuan, lokasi, sumber, nomor dokumen, dan petugas.

### Laporan Barang Keluar

Menampilkan transaksi keluar berdasarkan periode, termasuk nomor, tanggal, barang, jumlah, satuan, lokasi, pengambil, keperluan, dan petugas atau sumber pencatatan.

### Laporan Mutasi

Menampilkan transaksi perpindahan barang berdasarkan periode, termasuk barang, jumlah, lokasi asal dan tujuan, tanggal, serta petugas.

### Laporan Inventaris

Menampilkan kode, nama, kategori, merk, nomor seri, lokasi, penanggung jawab, kondisi, dan status aset.

### Laporan Berdasarkan Lokasi

Informasi stok barang dan aset pada lokasi tertentu tersedia pada halaman daftar dan detail lokasi. Laporan tersendiri dengan filter lokasi tidak tersedia sebagai jenis laporan ekspor.

### Laporan Stok Menipis

Menampilkan barang dengan status menipis atau habis.

Laporan dapat ditinjau pada halaman aplikasi dan difilter menurut jenis laporan serta tahun/rentang tanggal. Pengguna yang memiliki izin ekspor dapat:

* Mengekspor laporan ke Excel.
* Mengekspor laporan ke PDF.
* Memilih kolom yang disertakan dalam PDF.
* Memilih orientasi portrait atau landscape.
* Mengisi nama, jabatan, dan NIP penandatangan pada PDF.

---

# 15. Audit Trail

Aktivitas penting dicatat dan ditampilkan pada halaman Aktivitas bagi pengguna berizin. Catatan dapat memuat pengguna atau sumber aktivitas, deskripsi, waktu, dan data terkait. Halaman aktivitas mendukung pencarian deskripsi, pengurutan, dan paginasi.

Aktivitas yang dicatat mencakup tindakan pada data barang, lokasi, aset, transaksi, dan ekspor laporan PDF. Dashboard juga menampilkan aktivitas terbaru bagi pengguna yang memiliki izin melihat aktivitas.

---

# 16. Aturan Bisnis

1. Persediaan dan aset merupakan dua jenis data yang dikelola melalui alur berbeda.
2. Satu barang persediaan dapat memiliki stok pada beberapa lokasi.
3. Total stok barang merupakan jumlah stok pada seluruh lokasi.
4. Status stok dihitung dari total stok dan stok minimum: aman, menipis, atau habis.
5. Barang keluar tidak memerlukan proses pengajuan atau persetujuan.
6. Barang keluar hanya dapat dicatat apabila stok pada lokasi asal mencukupi.
8. Mutasi barang mengurangi stok lokasi asal dan menambah stok lokasi tujuan dengan jumlah yang sama.
9. Lokasi asal dan tujuan pada mutasi harus berbeda.
10. Transaksi stok dicatat dengan nomor yang dibuat otomatis oleh sistem.
11. Penyesuaian stok manual belum tersedia.
12. Aset dicatat satu per satu dengan kode inventaris unik.
13. Kondisi, status, lokasi, dan penanggung jawab aset dapat dipantau; perpindahan aset dicatat melalui mutasi aset.
14. Perubahan kondisi aset memerlukan izin khusus.
15. Akses menu dan tindakan ditentukan oleh izin pengguna, bukan hanya tampilan menu.
16. Ekspor laporan, pengelolaan data, dan akses aktivitas hanya tersedia bagi pengguna dengan izin terkait.

---

# 17. Kebutuhan Non-Fungsional

### Usability

Antarmuka menggunakan bahasa Indonesia dan menyediakan navigasi, formulir, pencarian, filter, paginasi, serta indikator status agar mudah digunakan dalam kegiatan administrasi.

### Performance

Dashboard, daftar data, dan laporan perlu menampilkan informasi secara responsif. Daftar barang dan aset menggunakan paginasi untuk mendukung pengelolaan data.

### Security

* Autentikasi pengguna untuk area operasional.
* Otorisasi berbasis peran dan izin pada menu maupun tindakan.
* Validasi input transaksi dan data master.
* Perlindungan CSRF dan penyimpanan kata sandi yang aman.
* Pencatatan aktivitas penting.

### Responsive

Antarmuka dirancang untuk digunakan pada desktop, laptop, tablet, dan perangkat mobile.

### Maintainability

Modul persediaan, aset, lokasi, transaksi, laporan, autentikasi, dan pengguna dipisahkan agar aplikasi dapat dipelihara dan dikembangkan.

---

# 18. Teknologi

Teknologi yang digunakan oleh aplikasi:

* Backend: PHP dengan Laravel
* Frontend: React dengan Inertia.js
* Styling: Tailwind CSS
* Build frontend: Vite
* Database: konfigurasi basis data Laravel pada lingkungan deployment
* Autentikasi dan otorisasi: autentikasi Laravel serta peran/izin
* Pencatatan aktivitas: Laravel Activitylog
* Ekspor Excel: Laravel Excel
* Ekspor PDF: DomPDF
* Grafik: Recharts
* Version Control: Git

---

# 19. Struktur Modul

```text
INVENTRA
│
├── Autentikasi
│   ├── Masuk
│   ├── Lupa dan atur ulang kata sandi dengan kode email
│   └── Keluar
│
├── Dashboard
│   ├── Ringkasan persediaan, aset, dan lokasi
│   ├── Grafik operasional
│   ├── Peringatan stok
│   └── Aktivitas terbaru (sesuai izin)
│
├── Inventory
│   ├── Data Barang
│   ├── Persediaan per Lokasi
│   ├── Barang Masuk
│   ├── Barang Keluar
│   └── Mutasi Barang
│
├── Aset
│   ├── Data dan Detail Inventaris
│   ├── Kondisi dan Riwayat
│   ├── Lokasi
│   └── Mutasi Aset
│
├── Laporan
│   ├── Persediaan
│   ├── Barang Masuk
│   ├── Barang Keluar
│   ├── Mutasi Barang
│   ├── Inventaris
│   └── Stok Menipis
│
└── Sistem
    ├── Pengguna dan Peran
    ├── Aktivitas
    └── Pengaturan Profil, Email, dan Kata Sandi
```

---

# 20. Success Criteria

INVENTRA mendukung alur operasional yang tersedia apabila:

* Pengguna dapat masuk dan mengakses fitur sesuai izin.
* Pengguna dapat memulihkan kata sandi melalui kode verifikasi email.
* Dashboard menampilkan ringkasan barang, stok, aset, lokasi, grafik, dan peringatan stok.
* Pengguna berizin dapat mencari dan mengelola data barang.
* Persediaan menampilkan jumlah per lokasi dan status stok berdasarkan stok minimum.
* Barang masuk dan barang keluar dapat dicatat dengan nomor transaksi otomatis.
* Barang keluar dapat dicatat oleh petugas yang memiliki izin melalui aplikasi.
* Sistem menolak barang keluar yang melebihi stok pada lokasi asal.
* Mutasi barang antar lokasi memperbarui stok pada kedua lokasi secara konsisten.
* Pengguna berizin dapat mengelola lokasi dan melihat stok serta aset di lokasi tersebut.
* Aset dapat dicatat secara individual, dilihat detailnya, diperbarui kondisinya, dan dimutasi antar lokasi.
* Riwayat perubahan penting aset dan aktivitas operasional dapat ditinjau sesuai izin.
* Laporan persediaan, transaksi, inventaris, dan stok menipis dapat ditinjau; pengguna berizin dapat mengekspor ke Excel dan PDF.
* Profil, email, dan kata sandi dapat dikelola melalui pengaturan akun.
