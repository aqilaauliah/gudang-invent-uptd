BAB I
PENDAHULUAN
1.1	Latar Belakang
Pengelolaan persediaan barang habis pakai dan inventaris atau aset kantor merupakan bagian penting dalam mendukung kelancaran operasional UPTD Pengawasan Ketenagakerjaan Wilayah II Karawang. Barang persediaan, seperti alat tulis kantor, membutuhkan pemantauan jumlah dan lokasi penyimpanan secara berkala karena satu jenis barang dapat disimpan di beberapa lokasi dan terus berubah akibat transaksi barang masuk, barang keluar, mutasi antarlokasi, maupun penyesuaian stok. Apabila pencatatan tersebut belum terpusat dan tidak diperbarui secara konsisten, petugas akan mengalami kesulitan dalam mengetahui ketersediaan stok aktual di setiap lokasi. Penelitian menunjukkan bahwa pengelolaan persediaan yang belum terintegrasi berisiko menimbulkan ketidaksesuaian perhitungan stok, memperlambat pencarian data, serta menghambat pemantauan barang yang telah mencapai batas minimum (Nugroho & Hermawan, 2025).
Selain persediaan, pendataan aset kantor seperti komputer, pencetak (printer), meja, dan peralatan kerja lainnya memerlukan penanganan secara individual yang mencakup kode inventaris, kondisi, lokasi, serta penanggung jawab. Tanpa sistem pencatatan dan pelacakan riwayat perubahan yang terstruktur, pemantauan keberadaan maupun kondisi aset menjadi kurang optimal karena perubahan status barang tidak tercatat secara mutakhir (No et al., 2026). Di samping itu, penyusunan laporan persediaan dan inventaris untuk kebutuhan administrasi maupun evaluasi memerlukan waktu lebih lama apabila petugas harus mengumpulkan dan merekapitulasi data dari berbagai catatan yang terpisah.
Berdasarkan permasalahan tersebut, dikembangkan INVENTRA (Inventory & Asset Management System) berbasis web sebagai solusi teknologi untuk mengelola data persediaan dan aset secara terpusat. Sistem ini mengintegrasikan pencatatan transaksi barang masuk, barang keluar, mutasi antarlokasi, penyesuaian stok, peringatan batas stok minimum, pelacakan riwayat aset, hingga fitur ekspor laporan. Penerapan sistem informasi berbasis web ini dirancang untuk meningkatkan efektivitas, efisiensi, dan akurasi pengolahan data operasional, sekaligus mendukung pengambilan keputusan manajemen dalam merencanakan pengadaan barang, distribusi stok, serta pemeliharaan aset.



1.2	Tujuan Proyek
Secara umum, proyek ini bertujuan untuk mengembangkan INVENTRA (Inventory & Asset Management System) berbasis web yang sesuai dengan kebutuhan UPTD Pengawasan Ketenagakerjaan Wilayah II Karawang dalam mengelola persediaan barang dan inventaris/aset secara terstruktur, akurat, serta mudah diakses. Adapun lima tujuan khusus yang ingin dicapai melalui pengembangan sistem ini adalah sebagai berikut:
1.	Menyediakan fasilitas pengelolaan data master dan pencatatan transaksi persediaan (barang masuk, barang keluar, mutasi antarlokasi, serta penyesuaian stok) secara terpusat dan akurat.
2.	Menampilkan informasi ketersediaan stok barang berdasarkan lokasi penyimpanan beserta peringatan batas stok minimum guna mencegah keterlambatan pemenuhan persediaan.
3.	Memfasilitasi pendataan inventaris atau aset kantor secara individual yang mencakup kode inventaris, kondisi, lokasi, dan penanggung jawab.
4.	Menyimpan riwayat transaksi persediaan serta perubahan status maupun lokasi aset sehingga seluruh aktivitas operasional dapat ditelusuri kembali dengan mudah.
5.	Menyediakan dashboard pemantauan dan fitur penyusunan laporan yang dapat diekspor untuk mempercepat proses administrasi serta mendukung pengambilan keputusan organisasi.
1.3	Ruang Lingkup
Proyek ini mencakup pengembangan INVENTRA (Inventory & Asset Management System) berbasis web guna mendukung proses pencatatan, pemantauan, dan pelaporan persediaan barang serta inventaris/aset di UPTD Pengawasan Ketenagakerjaan Wilayah II Karawang. Modul dan fitur yang dikembangkan meliputi dashboard ringkasan operasional, pengelolaan data master persediaan (barang, kategori, satuan, stok minimum, dan lokasi penyimpanan), pencatatan transaksi persediaan (barang masuk, barang keluar, mutasi antarlokasi, dan penyesuaian stok), pemantauan stok per lokasi beserta indikator stok menipis, pengelolaan data inventaris/aset secara individual, penelusuran riwayat transaksi dan aset, pengelolaan hak akses pengguna, serta penyusunan laporan. Proses bisnis yang didukung berfokus pada pencatatan langsung setiap aktivitas keluar-masuk barang, perpindahan lokasi, dan pembaruan aset oleh pengguna yang berwenang.
Pengguna sistem dibagi menjadi dua peran berdasarkan hak akses, yaitu Admin dan Petugas Gudang. Admin memiliki hak akses penuh untuk mengelola data master barang, lokasi, inventaris, akun pengguna, transaksi persediaan, penyesuaian stok, serta pencetakan atau ekspor laporan. Sementara itu, Petugas Gudang memiliki hak akses operasional terbatas untuk melihat informasi ketersediaan persediaan maupun aset serta mencatat transaksi barang masuk, barang keluar, dan mutasi antarlokasi, tanpa wewenang untuk mengubah data master, melakukan penyesuaian stok, menyunting transaksi yang telah tersimpan, mengelola pengguna, ataupun mengekspor laporan.
Dari sisi teknologi, INVENTRA dibangun menggunakan kerangka kerja Laravel sebagai backend, React yang diintegrasikan melalui Inertia.js sebagai frontend, Tailwind CSS untuk perancangan antarmuka pengguna, serta MySQL sebagai sistem manajemen basis data relasional, dilengkapi fasilitas ekspor laporan ke dalam format Excel dan PDF. Ruang lingkup pengembangan sistem ini dibatasi pada pengelolaan data operasional internal UPTD dan tidak mencakup proses pengadaan barang secara menyeluruh, alur pengajuan maupun persetujuan permintaan barang keluar, serta integrasi dengan sistem informasi eksternal.
1.4	Manfaat Proyek
Pengembangan dan penerapan INVENTRA diharapkan memberikan dampak positif bagi pengguna, organisasi, serta pengembang sistem (mahasiswa), dengan rincian sebagai berikut:
1.	Bagi Pengguna
a.	Mempermudah admin dan petugas gudang dalam mencatat transaksi barang masuk, barang keluar, mutasi antarlokasi, serta pendataan inventaris kantor.
b.	Mempercepat pencarian informasi mengenai jumlah stok tersedia, lokasi penyimpanan, dan kondisi terkini dari setiap aset.
c.	Membantu petugas memantau persediaan yang menipis atau habis secara tepat waktu melalui informasi peringatan batas stok minimum.
d.	Memudahkan penelusuran riwayat transaksi persediaan maupun riwayat perubahan lokasi dan kondisi aset.
2.	Bagi Organisasi
a.	Mewujudkan pengelolaan data persediaan dan aset kantor yang lebih terstruktur, terpusat, dan akuntabel di lingkungan UPTD Pengawasan Ketenagakerjaan Wilayah II Karawang.
b.	Mengurangi risiko kesalahan perhitungan serta ketidaksesuaian data melalui pencatatan transaksi dan riwayat perubahan yang tersimpan di dalam satu basis data.
c.	Meningkatkan efisiensi waktu dalam pelaksanaan administrasi gudang, pemantauan aset, dan penyusunan laporan berkala.
d.	Menyediakan informasi operasional yang akurat dan mudah diakses sebagai landasan evaluasi serta pengambilan keputusan terkait pengadaan, distribusi barang, dan pemeliharaan aset.
3.	Bagi Pengembang (Mahasiswa)
a.	Memberikan pengalaman nyata dalam menerapkan tahapan analisis kebutuhan, perancangan, implementasi, dan pengujian sistem informasi untuk menyelesaikan permasalahan instansi.
b.	Meningkatkan kompetensi teknis dalam membangun aplikasi web modern menggunakan teknologi Laravel, React, Inertia.js, Tailwind CSS, dan basis data MySQL.
c.	Menjadi sarana penerapan konsep perancangan basis data relasional, manajemen hak akses berbasis peran (role-based access control), serta perancangan antarmuka pengguna yang sesuai dengan kebutuhan proses bisnis nyata.




















 BAB II
ANALISIS KEBUTUHAN

2.1	Analisis Kebutuhan Fungsional & Non-Fungsional
Analisis kebutuhan INVENTRA disusun berdasarkan proses pengelolaan persediaan dan inventaris/aset di UPTD Pengawasan Ketenagakerjaan Wilayah II Karawang. Sistem melibatkan dua aktor, yaitu Admin dan Petugas Gudang, dengan hak akses yang berbeda. Kebutuhan dibagi menjadi kebutuhan fungsional, yang menjelaskan layanan sistem, dan kebutuhan non-fungsional, yang menjelaskan kualitas yang harus dipenuhi sistem.
2.1.1	Kebutuhan Funsional
Kebutuhan fungsional adalah pernyataan tentang layanan, fitur, atau fungsi spesifik apa yang harus dilakukan oleh sistem ketika berinteraksi dengan pengguna maupun memproses data.
Pada proyek INVENTRA, kebutuhan fungsional mencakup seluruh alur kerja operasional harian:
Tabel 1 Kebutuhan Fungsional
Kode	Kebutuhan Fungsional
KF-01	Sistem menyediakan autentikasi agar pengguna dapat masuk menggunakan akun yang terdaftar.
KF-02	Sistem membedakan hak akses Admin dan Petugas Gudang. Admin dapat mengelola seluruh data dan pengguna, sedangkan Petugas Gudang memiliki akses terbatas sesuai tugas operasionalnya.
KF-03	Sistem menampilkan dashboard berisi ringkasan jenis barang, total stok, jumlah inventaris dan lokasi, barang menipis atau habis, aset bermasalah, aktivitas terbaru, serta informasi distribusi dan kondisi aset.
KF-04	Admin dapat menambah, melihat, mengubah, dan menghapus data barang, termasuk kode, nama, kategori, satuan, stok minimum, deskripsi, dan status aktif. Petugas Gudang hanya dapat melihat data barang.
KF-05	Admin dapat mengelola data kategori barang, satuan, dan lokasi penyimpanan. Petugas Gudang hanya dapat melihat informasi lokasi.
KF-06	Sistem mendukung penyimpanan stok barang pada lebih dari satu lokasi dan menampilkan jumlah stok per lokasi serta total stok barang.
KF-07	Admin dan Petugas Gudang dapat mencatat transaksi barang masuk dengan informasi seperti tanggal, barang, jumlah, lokasi tujuan, sumber atau pemasok, nomor dokumen, keterangan, dan pencatat. Setelah transaksi disimpan, stok di lokasi tujuan bertambah.
KF-08	Admin dan Petugas Gudang dapat mencatat transaksi barang keluar dengan informasi seperti tanggal, barang, lokasi asal, jumlah, pengambil, dan keperluan. Sistem menolak transaksi jika jumlah yang dikeluarkan melebihi stok tersedia di lokasi tersebut. Barang keluar dicatat langsung tanpa proses pengajuan atau persetujuan.
KF-09	Admin dan Petugas Gudang dapat mencatat mutasi barang dari satu lokasi ke lokasi lain. Sistem mengurangi stok dari lokasi asal, menambah stok di lokasi tujuan, dan menyimpan riwayat mutasi.
KF-10	Admin dapat melakukan penyesuaian stok berdasarkan hasil pemeriksaan fisik. Penyesuaian harus mencatat stok sebelum dan sesudah, selisih, alasan, tanggal, lokasi, dan admin yang melakukan perubahan.
KF-11	Sistem membandingkan total stok barang dengan batas stok minimum dan menampilkan status Aman, Menipis, atau Habis. Informasi stok menipis atau habis ditampilkan pada dashboard, halaman persediaan, dan laporan terkait.
KF-12	Admin dapat mengelola data inventaris/aset secara individual, termasuk kode inventaris, nama, kategori, merek, model, nomor seri, tahun dan sumber perolehan, nilai perolehan, lokasi, penanggung jawab, kondisi, status, foto, dan keterangan. Petugas Gudang hanya dapat melihat data aset.
KF-13	Sistem menyimpan riwayat perubahan penting aset, terutama perubahan lokasi dan kondisi, sehingga riwayat aset dapat ditelusuri.
KF-14	Sistem menyediakan laporan persediaan, barang masuk, barang keluar, mutasi, inventaris, barang berdasarkan lokasi, dan stok menipis. Pengguna dapat mencari dan memfilter laporan; Admin dapat mencetak dan mengekspor laporan ke Excel atau PDF.
KF-15	Sistem mencatat aktivitas penting yang dilakukan Admin, termasuk perubahan data dan transaksi, beserta pengguna dan waktu aktivitas. Petugas Gudang tidak dapat mengakses riwayat aktivitas Admin.
KF-16	Petugas Gudang dapat mengelola profilnya sendiri, tetapi tidak dapat mengelola pengguna, mengubah data master, menyesuaikan stok, atau mengubah dan menghapus transaksi yang telah disimpan.

2.1.2	Kebutuhan Non-Fungsional
Kebutuhan non-fungsional adalah pernyataan tentang standar kualitas, batasan teknis, atau karakteristik performa yang harus dipenuhi oleh sistem dalam menjalankan fungsi-fungsinya.
Pada proyek INVENTRA, kebutuhan non-fungsional berfokus pada kualitas sistem di balik layar:
Tabel 2 Kebutuhan Non-Fungsional
Aspek	Kebutuhan Non-Fungsional

Keamanan	Sistem harus mengautentikasi pengguna dan membatasi akses berdasarkan peran. Input harus divalidasi, kata sandi disimpan dalam bentuk hash, dan perlindungan CSRF diterapkan pada proses yang sesuai.

Keakuratan dan integritas data	Perhitungan stok harus konsisten dengan transaksi masuk, keluar, mutasi, dan penyesuaian. Sistem harus mencegah stok keluar melebihi jumlah yang tersedia dan menyimpan riwayat perubahan stok.

Kemudahan penggunaan	Antarmuka harus mudah dipahami oleh Admin dan Petugas Gudang, termasuk pengguna non-teknis. Formulir, status stok, pesan validasi, dan informasi laporan perlu disajikan dengan jelas.

Kinerja	Dashboard, tabel data, dan laporan harus dapat memuat informasi dengan waktu respons yang wajar. Pencarian dan filter harus membantu pengguna menemukan data tanpa harus menelusuri seluruh daftar secara manual.

Keandalan	Sistem harus memproses transaksi secara konsisten agar perubahan stok tidak menghasilkan data yang saling bertentangan. Informasi transaksi dan aktivitas penting harus tersedia untuk penelusuran.

Kompatibilitas dan responsivitas	Sistem berbasis web harus dapat digunakan melalui browser pada desktop, laptop, tablet, dan perangkat mobile. Tata letak perlu menyesuaikan ukuran layar agar fungsi utama tetap dapat diakses.

Kemudahan pemeliharaan	Struktur aplikasi dan pengelolaan modul harus memungkinkan sistem diperbaiki dan dikembangkan lebih lanjut, misalnya ketika ada perubahan kebutuhan pengelolaan barang atau laporan.

Kesesuaian teknologi	Sistem dikembangkan menggunakan Laravel sebagai backend, React dan Inertia.js untuk antarmuka, Tailwind CSS untuk styling, serta basis data relasional. Sistem juga mendukung ekspor laporan ke Excel dan PDF.

2.2	Stake Holder Yang Terlibat
Pemangku kepentingan (stakeholder) INVENTRA merupakan pihak-pihak yang memiliki kepentingan, menggunakan, mengelola, maupun terlibat langsung dalam perancangan dan implementasi sistem. Identifikasi pemangku kepentingan bertujuan untuk memastikan bahwa fungsionalitas sistem selaras dengan proses bisnis operasional serta menjaga efektivitas komunikasi selama proses pengembangan berlangsung.
Tabel 3 Stake Holder Yang Terlibat
Kategori	Pemangku Kepentingan	Peran dan Kepentingan Dalam Sistem

Internal	
Admin	Bertindak sebagai pengguna utama dengan hak akses penuh (full access) untuk mengelola data master (barang, kategori, satuan, lokasi penyimpanan), akun pengguna, pendataan aset kantor, pencatatan transaksi persediaan, penyesuaian stok (stock opname), penelusuran riwayat aktivitas, serta pembuatan dan ekspor laporan.

Internal	
Petugas Gudang	Bertindak sebagai pengguna operasional harian yang memiliki hak akses terbatas untuk melihat informasi ketersediaan barang dan aset, serta mencatat transaksi barang masuk, barang keluar, dan mutasi antarlokasi.

Internal	
Pengelola Persediaan dan Aset	Berperan sebagai penerima manfaat informasi manajerial dari ringkasan dasbor (dashboard) dan laporan berkala guna memonitor perputaran barang serta dijadikan dasar pertimbangan dalam pengambilan keputusan (bukan pengguna sistem langsung).

Eksternal	
Pengembang Sistem (Mahasiswa)	Melakukan analisis kebutuhan, perancangan arsitektur, penulisan kode program (development), serta pengujian sistem agar sesuai dengan kebutuhan operasional UPTD.

Eksternal	
Dukungan Teknis (Infrastruktur TI)	Mendukung ketersediaan lingkungan operasional sistem, seperti pemeliharaan server lokal/hosting, konfigurasi basis data, dan jaringan kerja instansi.

Secara operasional, Admin dan Petugas Gudang merupakan aktor yang berinteraksi langsung (direct user) dengan antarmuka INVENTRA. Sementara itu, Pimpinan UPTD dan Pengelola Aset berkepentingan terhadap validitas data serta hasil laporan, dan Pengembang Sistem bertanggung jawab memastikan seluruh kebutuhan tersebut dapat diimplementasikan ke dalam sistem secara andal.



2.3	Identifikasi Masalah dan Solusi yang Diusulkan
Pengelolaan persediaan dan inventaris di UPTD Pengawasan Ketenagakerjaan Wilayah II Karawang membutuhkan pencatatan yang konsisten dan terintegrasi. Hal ini disebabkan oleh pergerakan stok yang dinamis serta persebaran barang dan aset di beberapa lokasi penyimpanan. Kendala utama yang dihadapi saat ini adalah belum tersedianya media pencatatan terpusat, sehingga pencarian data memerlukan waktu lebih lama, risiko ketidaksesuaian perhitungan fisik meningkat, dan pemantauan kondisi aset menjadi kurang optimal.
Tabel berikut menyajikan pemetaan antara permasalahan operasional yang teridentifikasi dan solusi sistem yang diusulkan melalui pengembangan INVENTRA (Sistem Informasi Gudang dan Inventaris):
Tabel 4 Identifikasi Masalah dan Solusi Yang Diusulkan
No	Masalah yang Diidentifikasi	Solusi yang Diusulkan
1.	Informasi stok belum mutakhir dan berisiko tidak akurat karena barang tersimpan di beberapa lokasi serta perubahannya belum tercatat secara terpusat.	Menyediakan fasilitas pencatatan transaksi terpusat (barang masuk, barang keluar, mutasi antarlokasi, dan penyesuaian stok) serta menampilkan ketersediaan stok aktual berdasarkan lokasi penyimpanan.
2.	Petugas mengalami kesulitan dalam mengetahui status ketersediaan barang secara cepat, terutama untuk barang yang jumlahnya menipis atau habis.	Menyajikan ringkasan persediaan pada dasbor (dashboard) utama dan menampilkan indikator status stok otomatis berdasarkan ambang batas minimum.
3.	Perubahan stok sulit ditelusuri kembali karena belum tersedianya riwayat transaksi operasional yang runtut.	Menyimpan catatan riwayat (log history) setiap transaksi masuk, keluar, mutasi, dan penyesuaian stok, lengkap dengan data waktu serta identitas pengguna pencatat.
4.	Pendataan aset kantor belum terpantau secara teratur, sehingga informasi fisik, kondisi, dan lokasi terkini sulit diverifikasi.	Menyediakan modul pendataan inventaris secara individual yang mencakup kode aset, lokasi, penanggung jawab, kondisi fisik, status pemakaian, dan riwayat mutasi aset.
5.	Rekapitulasi data untuk kebutuhan administrasi dan pemantauan memerlukan waktu lama karena data masih tersebar di berbagai catatan terpisah.	Menyediakan fitur pelaporan terintegrasi untuk data persediaan, transaksi, mutasi, dan inventaris yang dilengkapi fasilitas pencarian, penyaringan (filter), pencetakan, serta ekspor dokumen ke format Excel dan PDF.
6.	Pengelolaan data operasional belum memiliki batasan wewenang yang jelas antara fungsi pengawasan dan fungsi pencatatan harian.	Menerapkan manajemen hak akses berbasis peran (role-based access control) dengan membedakan hak kelola penuh untuk Admin dan hak operasional terbatas untuk Petugas Gudang.

Melalui penerapan solusi tersebut, INVENTRA mengintegrasikan seluruh alur pengelolaan barang habis pakai dan aset kantor ke dalam satu basis data terpusat. Pengembangan difokuskan pada pemenuhan kebutuhan operasional internal sesuai ruang lingkup proyek yang telah ditetapkan, tanpa mencakup alur pengadaan barang secara menyeluruh maupun mekanisme persetujuan berjenjang untuk barang keluar.















BAB III
PEMBAHASAN PROYEK AKHIR

3.1	Deksripsi Proyek Akhir
Proyek akhir ini berjudul INVENTRA (Inventory & Asset Management System), yaitu sistem informasi manajemen berbasis web yang dikembangkan untuk mendukung pengelolaan persediaan barang habis pakai dan inventaris/aset kantor di lingkungan UPTD Pengawasan Ketenagakerjaan Wilayah II Karawang. Sistem ini dirancang untuk memfasilitasi interaksi dua peran pengguna, yaitu Admin dan Petugas Gudang, dalam menjalankan aktivitas pencatatan operasional, pemantauan ketersediaan barang, serta penyusunan laporan data secara terstruktur sesuai dengan pembagian hak akses masing-masing.
Fungsi utama INVENTRA mencakup pengelolaan data master barang dan lokasi penyimpanan bertingkat (multi-location), pencatatan transaksi barang masuk dan keluar, mutasi antarlokasi, penyesuaian stok (stock opname), pemantauan ambang batas stok minimum, serta pendataan aset kantor secara individual. Selain itu, sistem menyediakan pencatatan riwayat transaksi dan log perubahan kondisi aset, dasbor (dashboard) ringkasan operasional harian, serta modul laporan yang dilengkapi fasilitas pencarian, penyaringan (filter), pencetakan, dan ekspor dokumen ke format Excel maupun PDF.
Proyek ini dipilih karena pengelolaan persediaan dan aset pada instansi membutuhkan data yang akurat, mutakhir, dan mudah ditelusuri. Sebagaimana diuraikan dalam analisis kebutuhan pada Bab II, sistem pencatatan konvensional yang belum terpusat dapat menimbulkan ketidaksesuaian perhitungan stok fisik, menghambat penelusuran riwayat transaksi, memperlambat pembaruan informasi kondisi aset, serta menyita waktu dalam penyusunan laporan administrasi. Penelitian terdahulu membuktikan bahwa implementasi sistem informasi manajemen persediaan dan aset berbasis web mampu mengintegrasikan pencatatan secara terpusat, meminimalkan perbedaan data fisik, serta meningkatkan efektivitas pemantauan barang secara real-time (Tarigan, 2024). Oleh karena itu, kehadiran INVENTRA menjadi solusi tepat guna menyatukan seluruh proses bisnis tersebut dalam satu platform terpadu guna mendukung efisiensi pemantauan dan pengambilan keputusan manajerial organisasi.


3.2	Tujuan Spesifik Proyek
Tujuan spesifik proyek merupakan penjabaran dari tujuan umum pengembangan INVENTRA (Inventory & Asset Management System) yang dirumuskan secara terarah dan terukur. Perumusan target capaian ini berfungsi sebagai tolok ukur dalam mengevaluasi keberhasilan implementasi sistem pada tahap pengujian akhir. Target spesifik yang ingin diwujudkan melalui penerapan INVENTRA di UPTD Pengawasan Ketenagakerjaan Wilayah II Karawang meliputi:
1.	Peningkatan Efisiensi Waktu Proses Operasional
Mempercepat proses pencatatan transaksi barang masuk, barang keluar, mutasi antarlokasi, dan penyesuaian stok (stock opname), serta memangkas waktu pencarian data ketersediaan barang dan aset kantor dari proses manual yang memakan waktu lama menjadi penyajian data instan secara real-time.
2.	Pengurangan Kesalahan Pengolahan Data dan Pencegahan Selisih Stok
Meminimalkan kesalahan pencatatan manual (human error) melalui validasi otomatis pada antarmuka sistem, termasuk mencegah terjadinya stok bernilai negatif (negative stock) saat pengeluaran barang melebihi kuantitas yang tersedia di lokasi penyimpanan.
3.	Penyediaan Informasi Stok yang Akurat dan Tepat Waktu
Menyajikan data ketersediaan persediaan barang secara mutakhir di setiap lokasi penyimpanan serta memberikan indikator peringatan otomatis untuk status stok aman, menipis, atau habis guna mencegah keterlambatan dalam pengadaan barang persediaan.
4.	Peningkatan Ketertelusuran (Traceability) dan Akuntabilitas Aset Kantor
Menyediakan pencatatan data aset kantor secara individual (kode inventaris, penanggung jawab, lokasi, dan kondisi fisik) yang dilengkapi dengan riwayat perubahan (log history), sehingga riwayat pergerakan dan pembaruan kondisi aset dapat dipantau dan diaudit secara transparan.
5.	Peningkatan Kualitas Layanan Administrasi dan Kecepatan Pelaporan
Mempermudah staf administrasi dalam merekapitulasi data operasional melalui modul pelaporan terpadu yang dapat disaring berdasarkan kriteria tertentu, dicetak, serta diekspor ke dalam format dokumen (Excel dan PDF) secara cepat dan mandiri sesuai dengan wewenang hak akses masing-masing.
3.3	Konteks Bisnis atau Organisasi yang Relevan
UPTD Pengawasan Ketenagakerjaan Wilayah II Karawang merupakan unit pelaksana teknis dinas yang bertugas melaksanakan pengawasan norma ketenagakerjaan serta penegakan regulasi Keselamatan dan Kesehatan Kerja (K3) di wilayah kerjanya. Dalam menjalankan tugas operasional dan pelayanan publik tersebut, kelancaran administrasi internal instansi sangat bergantung pada ketersediaan logistik barang habis pakai serta keandalan sarana dan prasarana kerja, seperti alat tulis kantor, komputer, pencetak (printer), meja kerja, dan peralatan operasional lainnya.
Proses bisnis pengelolaan logistik di lingkungan UPTD memiliki karakteristik tersendiri yang terbagi ke dalam dua kelompok barang:
1.	Barang Persediaan (Habis Pakai): Memiliki pergerakan kuantitas yang dinamis dan dapat disimpan di beberapa lokasi penyimpanan. Jumlah stok terus mengalami perubahan akibat transaksi barang masuk, barang keluar, mutasi antarlokasi, maupun penyesuaian fisik stok (stock opname).
2.	Aset Kantor (Inventaris Tetap): Memerlukan pendataan secara individual dengan pencatatan kode inventaris, penempatan lokasi, kondisi fisik, status penggunaan, dan penanggung jawab barang.
Pengelolaan proses tersebut dijalankan melalui pembagian peran kerja yang jelas: Admin bertanggung jawab memelihara data master dan mengawasi seluruh aktivitas persediaan, sedangkan Petugas Gudang bertindak sebagai pelaksana pencatatan operasional harian sesuai hak akses yang diberikan.
Dalam konteks operasional ini, INVENTRA (Inventory & Asset Management System) berperan sebagai sistem pendukung administrasi (operational support system), bukan sebagai pengganti proses utama pengawasan ketenagakerjaan di lapangan. Kehadiran INVENTRA memberikan nilai strategis bagi organisasi dengan memusatkan data pencatatan, memfasilitasi pelacakan riwayat aset, menyajikan indikator batas stok minimum, serta menghasilkan laporan yang dapat disaring dan diekspor. Penerapan sistem pencatatan berbasis digital ini terbukti mampu memangkas kendala pencatatan manual, meningkatkan integrasi data secara real-time, serta menyajikan informasi operasional yang mutakhir guna mendukung koordinasi kerja dan pengambilan keputusan organisasi secara cepat dan akurat (Jernih et al., 2024).




