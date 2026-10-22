## BAB I PENDAHULUAN
1.1	Latar Belakang
UPTD Pengawasan Ketenagakerjaan Wilayah II Karawang membutuhkan pengelolaan persediaan barang dan inventaris aset yang teratur untuk menunjang kegiatan operasional di berbagai lokasi. Berbeda dengan barang persediaan yang jumlah stoknya terus berubah akibat transaksi masuk, keluar, dan mutasi antar lokasi, inventaris aset perlu dipantau secara individual berdasarkan identitas, kondisi, lokasi, penanggung jawab, serta riwayat perubahannya. Tanpa pemantauan yang terstruktur, petugas berisiko kesulitan memantau ketersediaan stok, mengidentifikasi barang yang menipis atau habis, serta menelusuri keberadaan dan kondisi aset. Hal ini sejalan dengan temuan (Tangon et al., 2024) bahwa pengelolaan persediaan dan aset tetap yang belum terintegrasi dapat menghambat efisiensi kerja, menyulitkan proses inventarisasi, serta menurunkan akurasi data.
Selain ketertiban pencatatan, ketersediaan informasi operasional dan pelaporan yang cepat sangat diperlukan untuk mendukung pengawasan serta pengambilan keputusan. Data stok, transaksi, aset, dan riwayat aktivitas perlu disajikan secara terpusat agar mudah ditinjau oleh pengguna sesuai peran dan kewenangannya dalam merencanakan pengadaan maupun tindak lanjut aset. Penelitian (Sembada, n.d.) membuktikan bahwa penerapan sistem informasi inventaris berbasis web dengan penyimpanan terpusat dan hak akses berbasis peran (role-based access) mampu mengatasi ketidakefisienan pencatatan manual, mempercepat penelusuran data secara real-time, serta mempermudah pengendalian stok dan penyusunan laporan.
Berdasarkan kebutuhan tersebut, dikembangkan INVENTRA (Inventory & Asset Management System), yaitu sistem informasi berbasis web untuk mengelola persediaan barang dan inventaris aset di UPTD Pengawasan Ketenagakerjaan Wilayah II Karawang. Sistem ini mencakup fitur pencatatan barang masuk, barang keluar, dan mutasi stok, pemantauan stok per lokasi beserta statusnya, pengelolaan data dan riwayat aset, dashboard ringkasan, serta ekspor laporan oleh pengguna berwenang. Dengan pengelolaan data terpusat dan pengaturan akses berbasis izin, INVENTRA diharapkan dapat meningkatkan efektivitas serta efisiensi administrasi sekaligus mendukung pengambilan keputusan yang lebih terstruktur.


1.2	Tujuan Proyek
Tujuan umum dari proyek ini adalah membangun INVENTRA (Inventory & Asset Management System) sebagai sistem informasi berbasis web yang sesuai dengan kebutuhan UPTD Pengawasan Ketenagakerjaan Wilayah II Karawang dalam mengelola persediaan barang dan inventaris aset secara terpusat, terstruktur, serta dapat diakses oleh pengguna sesuai dengan peran dan kewenangannya. Adapun lima tujuan khusus yang menjadi fokus utama dalam pelaksanaan proyek ini adalah sebagai berikut:
1.	Mempercepat dan menertibkan proses pencatatan transaksi persediaan—meliputi barang masuk, barang keluar, dan mutasi barang antar lokasi—melalui pembuatan nomor transaksi otomatis serta pembaruan jumlah stok secara langsung guna menjaga akurasi data persediaan di setiap lokasi.
2.	Memudahkan pemantauan ketersediaan barang operasional dengan menampilkan indikator status stok (aman, menipis, atau habis) secara otomatis berdasarkan batas stok minimum yang telah ditetapkan.
3.	Meningkatkan keterlacakan pengelolaan inventaris aset secara individual melalui pencatatan identitas, kondisi, status, lokasi penempatan, penanggung jawab, serta riwayat perubahan dan mutasi setiap aset.
4.	Memudahkan akses informasi operasional serta menjaga keamanan data melalui fitur pencarian, penyaringan (filter), dashboard interaktif, pencatatan jejak aktivitas (audit trail), dan pembatasan hak akses pengguna berdasarkan peran serta izin.
5.	Mendukung penyusunan laporan operasional dan pengambilan keputusan organisasi dengan menyediakan laporan persediaan, transaksi, serta inventaris aset yang terstruktur dan dapat diekspor ke dalam format Excel maupun PDF oleh pengguna yang berwenang.
1.3	Ruang Lingkup
Penetapan ruang lingkup proyek bertujuan untuk mendefinisikan batasan pekerjaan secara tegas agar proses pengembangan sistem informasi tetap fokus, terarah, dan dapat diselesaikan sesuai dengan waktu serta sumber daya yang tersedia (Anzari et al., 2025). Proyek ini mencakup pengembangan INVENTRA (Inventory & Asset Management System) sebagai aplikasi berbasis web yang berfokus pada fungsi pencatatan, pemantauan, pelaporan, dan pengaturan akses pengelolaan persediaan barang serta inventaris aset di UPTD Pengawasan Ketenagakerjaan Wilayah II Karawang. Modul yang dikembangkan meliputi dashboard ringkasan operasional dan peringatan stok, pengelolaan data persediaan barang per lokasi, pencatatan transaksi persediaan (barang masuk, barang keluar, dan mutasi), pengelolaan inventaris aset individual beserta foto dan riwayatnya, manajemen lokasi penyimpanan, penyusunan dan ekspor laporan, pengaturan pengguna dan hak akses, serta pencatatan aktivitas dan pengaturan profil akun. Sistem ini melibatkan dua aktor pengguna dengan cakupan kewenangan berbasis izin, yaitu Admin yang memiliki akses penuh untuk mengelola data utama (master data), pengguna, transaksi, laporan, dan pemantauan aktivitas, serta Petugas Gudang yang menjalankan fungsi operasional seperti mencatat transaksi persediaan, memperbarui kondisi dan mutasi aset, serta meninjau laporan yang diizinkan.
Dari sisi proses bisnis, sistem mendukung alur operasional yang dimulai dari autentikasi pengguna sesuai kewenangan akun, pencatatan barang masuk yang secara otomatis menambah stok pada lokasi tujuan, hingga pencatatan barang keluar secara langsung tanpa alur pengajuan atau persetujuan berjenjang dengan validasi otomatis yang menolak transaksi apabila jumlah barang melebihi stok di lokasi asal. Selain itu, sistem memfasilitasi mutasi barang yang memperbarui stok lokasi asal dan tujuan secara konsisten, pemantauan status ketersediaan barang berdasarkan stok minimum, pengelolaan kondisi serta perpindahan aset beserta riwayatnya, hingga peninjauan dan ekspor laporan operasional ke dalam format Excel atau PDF. Untuk merealisasikan proses bisnis tersebut, pengembangan sistem menggunakan teknologi backend berbasis bahasa pemrograman PHP dengan framework Laravel, frontend menggunakan pustaka React yang diintegrasikan melalui Inertia.js, antarmuka pengguna dengan Tailwind CSS, serta perangkat build Vite. Pengelolaan data didukung oleh basis data relasional pada lingkungan deployment Laravel, mekanisme autentikasi dan otorisasi berbasis peran serta izin, pencatatan jejak aktivitas menggunakan Laravel Activitylog, fitur ekspor laporan dengan Laravel Excel dan DomPDF, visualisasi grafik menggunakan Recharts, serta pengelolaan kode sumber (version control) menggunakan Git.
Untuk menjaga fokus pengerjaan proyek, ditetapkan sejumlah batasan fungsional yang berada di luar ruang lingkup pengembangan sistem saat ini. Sistem belum menyediakan fitur penyesuaian stok manual (stock adjustment) berdasarkan hasil stock opname, sehingga seluruh perubahan jumlah stok hanya terjadi melalui transaksi barang masuk, barang keluar, dan mutasi barang. Proses pencatatan barang keluar juga dibatasi pada pencatatan langsung oleh petugas berizin tanpa melalui mekanisme pengajuan maupun persetujuan berjenjang. Selain itu, data kategori dan satuan dikelola sebagai atribut melekat pada data barang sehingga tidak dibuatkan modul manajemen tersendiri, serta informasi rincian persediaan dan aset berdasarkan lokasi disajikan langsung melalui halaman daftar dan detail lokasi tanpa menjadi jenis laporan ekspor tersendiri.
1.4	Manfaat Proyek
Penerapan sistem informasi INVENTRA (Inventory & Asset Management System) diharapkan memberikan dampak positif secara langsung bagi pengguna, organisasi, maupun pengembang sistem sebagaimana diuraikan berikut ini:
1. Bagi Pengguna
a.	Memudahkan petugas dalam mencatat serta memantau transaksi barang masuk, barang keluar, dan mutasi persediaan antar lokasi penyimpanan secara lebih cepat dan konsisten.
b.	Membantu pengguna memantau jumlah dan status ketersediaan stok—termasuk mengidentifikasi barang yang berstatus menipis atau habis—sehingga kebutuhan pengadaan kembali dapat segera ditindaklanjuti.
c.	Mempercepat pencarian informasi barang, aset, lokasi, dan riwayat transaksi melalui tersedianya fitur pencarian, penyaringan (filter), dashboard ringkasan, serta laporan terpadu.
d.	Memudahkan penelusuran kondisi fisik, status penggunaan, lokasi penempatan, penanggung jawab, serta riwayat perubahan dan perpindahan setiap unit aset.
e.	Mengurangi risiko kesalahan pencatatan melalui pembaruan stok otomatis berbasis transaksi serta validasi ketersediaan stok saat proses pengeluaran dan mutasi barang.
f.	Memberikan kejelasan pembagian kerja melalui pengaturan akses fitur yang disesuaikan dengan peran dan izin masing-masing pengguna.
2. Bagi Organisasi (UPTD Pengawasan Ketenagakerjaan Wilayah II Karawang)
a.	Mendukung tata kelola persediaan barang dan inventaris aset secara lebih terpusat, terstruktur, dan mudah diawasi.
b.	Meningkatkan efisiensi proses administrasi operasional dengan menyatukan pencatatan transaksi persediaan dan pengelolaan data aset ke dalam satu sistem terintegrasi.
c.	Menyediakan informasi operasional yang akurat dan tertata sebagai bahan evaluasi, pemantauan berkala, serta pengambilan keputusan manajerial.
d.	Memudahkan pengawasan distribusi stok barang dan penempatan aset di berbagai lokasi penyimpanan milik instansi.

e.	Meningkatkan akuntabilitas pengelolaan aset melalui tersedianya rekam jejak kondisi, penanggung jawab, riwayat mutasi, serta catatan aktivitas pengguna (audit trail).
f.	Mempermudah pemenuhan kebutuhan pelaporan instansi melalui fitur penyajian laporan operasional yang dapat ditinjau langsung maupun diekspor ke dalam dokumen Excel dan PDF oleh pengguna berwenang.
3. Bagi Pengembang (Mahasiswa)
a.	Memperoleh pengalaman nyata dalam menganalisis kebutuhan pengguna dan memetakan proses bisnis pengelolaan persediaan serta aset pada lingkungan instansi pemerintah.
b.	Menerapkan siklus pengembangan sistem informasi secara utuh, mulai dari tahap analisis kebutuhan, perancangan sistem, implementasi kode program, hingga pengujian fungsional.
c.	Mengasah keterampilan teknis dalam membangun aplikasi web modern menggunakan framework Laravel, React, Inertia.js, Tailwind CSS, serta berbagai pustaka pendukung lainnya.
d.	Memperdalam pemahaman praktis mengenai perancangan basis data relasional, autentikasi, otorisasi berbasis peran dan izin, pencatatan aktivitas (activity logging), manajemen transaksi stok, serta otomatisasi pelaporan dokumen.
e.	Melatih kemampuan pemecahan masalah (problem solving) dalam menerjemahkan aturan bisnis dan batasan proyek menjadi solusi perangkat lunak yang fungsional.
f.	Menghasilkan karya ilmiah dan produk sistem informasi yang dapat menjadi bahan pembelajaran akademis sekaligus portofolio profesional di bidang rekayasa perangkat lunak.

## BAB II ANALISIS KEBUTUHAN

2.1	Analisis Kebutuhan Fungsional & Non-Fungsional
Analisis kebutuhan INVENTRA (Inventory & Asset Management System) disusun berdasarkan proses pengelolaan persediaan barang dan inventaris aset di UPTD Pengawasan Ketenagakerjaan Wilayah II Karawang. Sistem melibatkan dua aktor, yaitu Admin dan Petugas Gudang, dengan hak akses yang berbeda. Kebutuhan sistem dibagi menjadi kebutuhan fungsional, yang menjelaskan layanan utama sistem, dan kebutuhan non-fungsional, yang menjelaskan standar kualitas yang harus dipenuhi agar sistem berjalan optimal.
2.1.1	Kebutuhan Fungsional
Kebutuhan fungsional adalah pernyataan tentang layanan, fitur, atau fungsi spesifik yang harus dilakukan oleh sistem ketika berinteraksi dengan pengguna maupun saat memproses, menyimpan, dan menyajikan data. Pada proyek INVENTRA, kebutuhan fungsional mencakup seluruh alur kerja operasional harian sebagai berikut:
Tabel 1 Kebutuhan Fungsional
Kode	Kebutuhan	Pengguna

KF-01	Sistem menyediakan autentikasi agar pengguna dapat masuk dan mengakses fitur sesuai peran serta izin akun.	
Admin, Petugas Gudang


KF-02	Sistem menyediakan fitur pemulihan kata sandi menggunakan kode verifikasi yang dikirim melalui email.	
Admin, Petugas Gudang

KF-03	Sistem menampilkan dashboard berisi ringkasan barang, stok, aset, lokasi, grafik, serta peringatan stok menipis atau habis.	
Admin, Petugas Gudang


KF-04	Sistem menyediakan pengelolaan data barang, meliputi kode, nama, kategori, satuan, stok minimum, deskripsi, dan status barang.	
Admin atau pengguna berizin

KF-05	Sistem menampilkan jumlah persediaan secara keseluruhan dan berdasarkan lokasi, beserta status stok yang dihitung dari stok minimum.	
Admin, Petugas Gudang

KF-06	Sistem mencatat transaksi barang masuk, termasuk tanggal, barang, jumlah, lokasi tujuan, sumber, nomor dokumen, dan keterangan. Nomor transaksi dibuat otomatis dan stok lokasi tujuan bertambah setelah transaksi disimpan.	
Admin, Petugas Gudang berizin


KF-07	Sistem mencatat transaksi barang keluar, termasuk tanggal, barang, jumlah, lokasi asal, pengambil, dan keperluan. Sistem menolak transaksi apabila jumlah yang diminta melebihi stok di lokasi asal.	
Admin, Petugas Gudang berizin


KF-08	Sistem mencatat mutasi barang antar lokasi. Sistem mengurangi stok di lokasi asal dan menambahkan jumlah yang sama ke lokasi tujuan.	Admin, Petugas Gudang berizin
KF-09	Sistem menyediakan pengelolaan data lokasi serta informasi barang dan aset yang berada pada setiap lokasi.	Admin atau pengguna berizin

KF-10	Sistem menyediakan pengelolaan data aset secara individual, termasuk identitas, kondisi, status, lokasi, penanggung jawab, foto, dan keterangan.	
Admin atau pengguna berizin
KF-11	Sistem mencatat perubahan kondisi dan mutasi aset serta menampilkan riwayat perubahan aset.	Admin, Petugas Gudang berizin

KF-12	Sistem menyediakan laporan persediaan, barang masuk, barang keluar, mutasi, inventaris, dan stok menipis berdasarkan penyaringan (filter) yang tersedia.	
Admin, Petugas Gudang sesuai izin

KF-13	Sistem menyediakan ekspor laporan ke dalam format Excel dan PDF bagi pengguna yang memiliki izin ekspor.	Admin atau pengguna berizin

KF-14	Sistem mencatat dan menampilkan aktivitas operasional bagi pengguna yang memiliki izin melihat aktivitas.	Admin atau pengguna berizin
KF-15	Sistem menyediakan pengaturan profil, email, dan kata sandi pengguna.	Admin, Petugas Gudang

2.1.2	Kebutuhan Non-Fungsional
Kebutuhan non-fungsional adalah pernyataan tentang standar kualitas, batasan teknis, atau karakteristik kinerja yang harus dipenuhi oleh sistem dalam menjalankan fungsi-fungsinya. Pada proyek INVENTRA, kebutuhan non-fungsional berfokus pada kualitas operasional sistem sebagai berikut:
Tabel 2 Kebutuhan Non-Fungsional
Kode	Aspek	Kebutuhan

KNF-01	
Usability	Sistem menggunakan bahasa Indonesia serta menyediakan navigasi, formulir, pencarian, penyaringan (filter), paginasi, dan indikator status yang membantu pengguna menjalankan tugasnya.

KNF-02	
Kinerja	Dashboard, daftar data, dan laporan perlu menampilkan informasi secara responsif. Daftar barang dan aset menggunakan paginasi untuk mendukung pengelolaan data.

KNF-03	
Keamanan	Sistem mengharuskan autentikasi untuk mengakses area operasional dan menerapkan otorisasi berdasarkan peran serta izin pada menu maupun tindakan.

KNF-04	
Keamanan data
	Sistem memvalidasi masukan (input), melindungi formulir menggunakan CSRF, dan menyimpan kata sandi secara aman.

KNF-05	
Keandalan pencatatan	Transaksi barang masuk, barang keluar, dan mutasi harus memperbarui stok sesuai aturan prosesnya. Sistem juga memeriksa kecukupan stok sebelum mencatat barang keluar atau mutasi.

KNF-06	Responsivitas antarmuka	
	Antarmuka dirancang agar dapat digunakan melalui desktop, laptop, tablet, dan perangkat mobile.

KNF-07	
Maintainability	Modul persediaan, aset, lokasi, transaksi, laporan, autentikasi, dan pengguna dipisahkan agar sistem lebih mudah dipelihara dan dikembangkan.

KNF-08	
Auditabilitas
	Aktivitas penting dicatat agar tindakan operasional dapat ditinjau oleh pengguna yang memiliki izin.

Kebutuhan tersebut menjadi acuan dalam perancangan, implementasi, dan pengujian INVENTRA. Setiap kebutuhan fungsional dapat diuji melalui keberhasilan proses dan validasi yang disebutkan, sedangkan kebutuhan non-fungsional dinilai melalui pengujian keamanan, konsistensi data, kinerja, dan penggunaan pada berbagai ukuran layar.
2.2	Stake Holder Yang Terlibat
Pemangku kepentingan (stakeholder) adalah pihak yang memiliki peran atau kepentingan, baik secara langsung maupun tidak langsung, dalam pengembangan maupun penggunaan INVENTRA. Identifikasi stakeholder dari internal organisasi maupun eksternal proyek membantu memastikan kebutuhan tiap pihak dipahami dan komunikasi selama proyek berjalan tetap efektif. Dalam sistem ini, akses operasional diberikan kepada Admin dan Petugas Gudang sesuai izin akun. Pimpinan berkepentingan terhadap informasi dan laporan untuk pemantauan, tetapi tidak ditetapkan sebagai peran pengguna tersendiri dalam sistem.
Tabel 3 Stake Holder Yang Terlibat
Kategori	Pemangku Kepentingan	Peran dan Kepentingan Dalam Sistem
Internal organisasi	
Admin	Mengelola data barang, aset, lokasi, dan pengguna sesuai izin, mengawasi pencatatan transaksi, serta mengakses laporan dan aktivitas untuk mendukung pengelolaan sistem.

Internal organisasi	

Petugas Gudang	Menjalankan kegiatan operasional, seperti melihat persediaan, mencatat barang masuk dan keluar, melakukan mutasi barang, serta memperbarui kondisi atau lokasi aset sesuai izin yang diberikan.

Internal organisasi	
Pimpinan UPTD	Berkepentingan memperoleh gambaran mengenai persediaan, transaksi, kondisi aset, dan laporan sebagai bahan pemantauan serta pertimbangan dalam pengambilan keputusan.

Eksternal proyek	
Pengembang (Mahasiswa)	Menganalisis kebutuhan, merancang, membangun, dan menguji sistem berdasarkan kebutuhan organisasi, berkoordinasi dengan pihak terkait agar hasil pengembangan sesuai ruang lingkup proyek.

Secara operasional, Admin dan Petugas Gudang merupakan aktor yang berinteraksi langsung (direct user) dengan antarmuka INVENTRA. Sementara itu, Pimpinan UPTD dan Pengelola Aset berkepentingan terhadap validitas data serta hasil laporan, dan Pengembang Sistem bertanggung jawab memastikan seluruh kebutuhan tersebut dapat diimplementasikan ke dalam sistem secara andal.
2.3	Identifikasi Masalah dan Solusi yang Diusulkan
Pengelolaan persediaan dan inventaris aset di UPTD Pengawasan Ketenagakerjaan Wilayah II Karawang membutuhkan pencatatan yang konsisten dan terintegrasi. Hal ini disebabkan oleh pergerakan stok yang dinamis serta persebaran barang dan aset di beberapa lokasi penyimpanan. Kendala utama yang dihadapi saat ini adalah belum tersedianya media pencatatan terpusat, sehingga pencarian data memerlukan waktu lebih lama, risiko ketidaksesuaian perhitungan fisik meningkat, dan pemantauan kondisi aset menjadi kurang optimal.
Tabel berikut menyajikan pemetaan antara permasalahan operasional yang teridentifikasi dan solusi sistem yang diusulkan melalui pengembangan INVENTRA (Inventory & Asset Management System):
Tabel 4 Identifikasi Masalah dan Solusi Yang Diusulkan
No	Masalah yang Diidentifikasi	Solusi yang Diusulkan
1.	Informasi jumlah stok barang perlu diketahui secara keseluruhan maupun berdasarkan lokasi, sehingga pencatatan yang tidak terpusat dapat menyulitkan pemantauan ketersediaan.	Menyediakan pencatatan persediaan per barang dan per lokasi, serta menampilkan jumlah stok dan statusnya dalam sistem.
2.	Pencatatan barang masuk, barang keluar, dan mutasi perlu dilakukan secara konsisten agar perubahan jumlah stok dapat ditelusuri.	Menyediakan fitur transaksi dengan nomor otomatis dan memperbarui stok berdasarkan jenis transaksi.
3.	Barang yang menipis atau habis berisiko terlambat diketahui apabila status stok tidak dipantau secara berkala.	Menampilkan status stok berdasarkan nilai stok minimum, termasuk peringatan barang menipis dan habis pada dashboard serta laporan.
4.	Barang keluar atau mutasi dapat menyebabkan ketidaksesuaian stok apabila jumlah yang dicatat melebihi ketersediaan di lokasi asal.	Memeriksa ketersediaan stok sebelum transaksi disimpan dan menolak transaksi jika jumlahnya melebihi stok yang tersedia.
5.	Informasi aset seperti kondisi, lokasi, penanggung jawab, serta riwayat perpindahannya perlu ditelusuri secara teratur.	Mencatat aset secara individual dan menyediakan detail, riwayat perubahan, pembaruan kondisi, serta pencatatan mutasi aset.
6.	Pengumpulan informasi untuk pemantauan dan pelaporan dapat memerlukan waktu apabila data transaksi, persediaan, dan aset sulit ditinjau bersama.	Menyediakan dashboard dan laporan operasional yang dapat disaring (filter), ditinjau, serta diekspor oleh pengguna yang memiliki izin.
7.	Tidak semua pengguna memerlukan akses yang sama terhadap data dan tindakan di dalam sistem.	Menerapkan pengaturan peran dan izin untuk membatasi akses terhadap pengelolaan data, transaksi, aktivitas, dan ekspor laporan.

Melalui penerapan solusi tersebut, INVENTRA mengintegrasikan seluruh alur pengelolaan barang habis pakai dan aset kantor ke dalam satu basis data terpusat. Pengembangan difokuskan pada pemenuhan kebutuhan operasional internal sesuai ruang lingkup proyek yang telah ditetapkan, tanpa mencakup alur pengadaan barang secara menyeluruh maupun mekanisme persetujuan berjenjang untuk barang keluar.

## BAB III PEMBAHASAN PROYEK AKHIR

3.1	Deksripsi Proyek Akhir
Proyek akhir ini berjudul “INVENTRA (Inventory & Asset Management System) pada UPTD Pengawasan Ketenagakerjaan Wilayah II Karawang”, yaitu sistem informasi manajemen berbasis web untuk mengelola persediaan barang habis pakai dan inventaris aset secara terpusat. Fungsi utamanya mencakup pencatatan barang masuk, barang keluar, dan mutasi stok antar lokasi, pemantauan jumlah serta status ketersediaan persediaan, serta pengelolaan data aset individual yang meliputi identitas, kondisi, status, lokasi, penanggung jawab, foto, dan riwayat perubahannya. Selain itu, sistem menyediakan dashboard ringkasan operasional, laporan yang dapat disaring (filter), serta fitur ekspor ke format Excel dan PDF bagi Admin maupun Petugas Gudang sesuai dengan peran dan izin akun masing-masing.
Proyek ini dipilih karena pengelolaan persediaan dan aset memiliki karakteristik berbeda yang membutuhkan rekam jejak informasi yang jelas. Barang persediaan perlu dipantau berdasarkan lokasi dan perubahan transaksi harian, sedangkan aset harus dicatat satu per satu beserta kondisi, lokasi, dan riwayat perpindahannya. Kebutuhan ini menjawab permasalahan pada BAB II, meliputi kendala pemantauan stok antar lokasi, risiko ketidaksesuaian perhitungan transaksi, keterlambatan deteksi stok menipis atau habis, serta belum optimalnya penelusuran riwayat aset dan laporan operasional. Hal tersebut sejalan dengan penelitian (Manurung et al., 2025) bahwa sistem informasi persediaan pada instansi pemerintah berperan penting mengatasi pencatatan yang belum terpusat, meminimalkan kesalahan perhitungan stok, dan mempercepat penyajian laporan untuk pengambilan keputusan.
Melalui penerapan INVENTRA, proses pencatatan dan pemantauan diharapkan berjalan lebih terstruktur, informasi lebih cepat ditemukan, serta laporan operasional lebih mudah disiapkan. Sistem ini dibangun menggunakan framework Laravel pada sisi backend, React dan Inertia.js pada sisi frontend, serta Tailwind CSS untuk antarmuka yang responsif. Pemilihan teknologi ini didukung oleh temuan (Effendri & Ma, 2025) yang membuktikan bahwa aplikasi manajemen aset berbasis web dengan framework Laravel mampu meningkatkan efisiensi operasional, menekan kesalahan pencatatan manusia (human error), serta mempermudah akses informasi dan pelaporan digital secara real-time sesuai ruang lingkup kebutuhan organisasi.
3.2	Tujuan Spesifik Proyek
Tujuan spesifik proyek merupakan penjabaran dari tujuan umum pengembangan INVENTRA (Inventory & Asset Management System) yang dirumuskan secara lebih terarah dan terukur. Perumusan target capaian ini berfungsi sebagai tolok ukur dalam mengevaluasi keberhasilan implementasi sistem pada tahap pengujian akhir. Target spesifik yang ingin diwujudkan melalui penerapan INVENTRA di UPTD Pengawasan Ketenagakerjaan Wilayah II Karawang meliputi:
1.	Peningkatan Efisiensi Waktu Proses Operasional Mempercepat proses pencatatan transaksi persediaan meliputi barang masuk, barang keluar, dan mutasi barang antar lokasi dengan pembuatan nomor transaksi otomatis, serta memangkas waktu pencarian data ketersediaan barang dan aset melalui penyajian informasi terpusat yang dapat diakses secara cepat.
2.	Pengurangan Kesalahan Pengolahan Data dan Pencegahan Selisih Stok Meminimalkan kesalahan pencatatan manual (human error) melalui pembaruan stok otomatis berdasarkan jenis transaksi, validasi ketersediaan stok yang secara otomatis menolak transaksi barang keluar atau mutasi apabila jumlahnya melebihi stok di lokasi asal, serta pembatasan kewenangan pengguna berdasarkan peran dan izin akun.
3.	Penyediaan Informasi Stok yang Akurat dan Tepat Waktu Menyajikan data ketersediaan persediaan barang secara mutakhir, baik secara keseluruhan maupun per lokasi penyimpanan, serta menampilkan indikator status stok (aman, menipis, atau habis) berdasarkan batas stok minimum pada dashboard dan laporan guna mencegah keterlambatan tindak lanjut pengadaan.
4.	Peningkatan Ketertelusuran (Traceability) dan Akuntabilitas Aset Kantor Menyediakan pencatatan data inventaris aset secara individual mencakup kode inventaris, identitas, kondisi, status, lokasi, foto, dan penanggung jawab yang dilengkapi dengan riwayat perubahan kondisi, riwayat mutasi lokasi, serta pencatatan aktivitas operasional (audit trail) sehingga pengelolaan aset dapat dipantau dan ditelusuri dengan jelas.
5.	Peningkatan Kualitas Layanan Administrasi dan Kecepatan Pelaporan Mempermudah pengguna dalam meninjau ringkasan data operasional melalui dashboard interaktif serta menyusun laporan persediaan, transaksi, dan inventaris aset yang dapat disaring (filter) berdasarkan periode tertentu maupun diekspor ke dalam format dokumen Excel dan PDF secara cepat oleh pengguna yang berwenang.
Dengan tercapainya kelima tujuan spesifik tersebut, sistem yang dibangun diharapkan dapat menjadi solusi teknologi yang mendukung efektivitas operasional harian, meningkatkan akurasi data persediaan dan aset, serta memperkuat tata kelola administrasi di UPTD Pengawasan Ketenagakerjaan Wilayah II Karawang.
3.3	Konteks Bisnis atau Organisasi yang Relevan
UPTD Pengawasan Ketenagakerjaan Wilayah II Karawang bertugas melaksanakan pengawasan norma ketenagakerjaan serta penegakan regulasi Keselamatan dan Kesehatan Kerja (K3) di wilayah kerjanya. Kelancaran administrasi dan operasional instansi didukung oleh ketersediaan logistik serta sarana kerja yang terbagi ke dalam dua kelompok pengelolaan utama:
1.	Barang Persediaan (Habis Pakai): Memiliki jumlah stok dinamis di berbagai lokasi yang berubah akibat transaksi barang masuk, barang keluar (dengan validasi kecukupan stok lokasi asal), dan mutasi antar lokasi, disertai pemantauan status stok aman, menipis, atau habis berdasarkan batas stok minimum.
2.	Inventaris Aset (Aset Kantor): Didata secara individual berdasarkan kode inventaris, identitas, lokasi penempatan, kondisi fisik, status penggunaan, dokumentasi foto, dan penanggung jawab, dilengkapi riwayat perubahan kondisi serta mutasi lokasinya.
Pengelolaan tersebut dijalankan sesuai pembagian hak akses: Admin mengelola master data, pengguna, transaksi, catatan aktivitas (audit trail), serta ekspor laporan (Excel dan PDF), sedangkan Petugas Gudang mencatat transaksi harian, memperbarui kondisi atau mutasi aset, serta meninjau laporan operasional guna mendukung pemantauan Pimpinan UPTD. Dalam konteks ini, INVENTRA (Inventory & Asset Management System) berperan sebagai sistem pendukung administrasi (operational support system) yang memusatkan data, menyajikan peringatan stok pada dashboard, menjaga keterlacakan aset, dan mempercepat pelaporan. Sebagaimana dibuktikan oleh (Wahyuning et al., 2026), penerapan sistem informasi persediaan berbasis web yang dilengkapi autentikasi pengguna bertingkat, dokumentasi transaksi masuk-keluar, serta modul pelaporan terintegrasi mampu menekan risiko selisih stok, meningkatkan efisiensi pengelolaan inventaris, dan memfasilitasi pengambilan keputusan organisasi secara akurat.
