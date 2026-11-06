// Kode.gs
// ===== KONFIGURASI =====
const SPREADSHEET_ID = '1rCDqU2HyxAPOEG1INTRRry96y9oZkdIGdkN1zas612w';
const APP_NAME = 'SIKAT';
const TIMEZONE = 'Asia/Jakarta';
const ROOT_FOLDER_ID = '';
const AUTH_SALT = 'SIKAT_PU_SDA_JATIM_2025';
const SESSION_TTL_SECONDS = 21600;
const MAX_UPLOAD_BYTES = 5242880;
const MAX_DATA_ROWS = 5000;
const MAX_IMPORT_ROWS = 2000;
// Jenis pembayaran yang valid pada pencatatan realisasi (disimpan pada kolom JenisBelanja)
const JENIS_PEMBAYARAN = ['GU', 'LS', 'GU_KKPD', 'TUP'];
const SHEET_NAMES = { USERS: 'Users', BUDGETS: 'Anggaran', REALIZATIONS: 'Realisasi', SETTINGS: 'Pengaturan', LOG: 'LogAktivitas', ACCOUNT_CODES: 'KodeRekening', REFERENCE: 'ReferensiKegiatan', PAGU_REKENING: 'PaguRekening' };
const FOLDER_NAMES = { ROOT: 'SIKAT - Dinas PU SDA Provinsi Jawa Timur', EVIDENCE: 'Bukti Realisasi', LOGO: 'Logo Aplikasi' };
const CACHE_KEYS = { APP: 'SIKAT_APP_DATA', USERS: 'SIKAT_USERS_DATA' };
const CACHE_CHUNK_SIZE = 50000;
const SHEET_CACHE_PREFIX = 'SIKAT_SHEET_';
const SHEET_CACHE_SKIP = ['LogAktivitas', 'Users'];
const ALLOWED_ROLES = ['Admin', 'Bendahara', 'Verifikasi'];
const VERIFICATION_STATUSES = ['BELUM_DIVERIFIKASI', 'TERVERIFIKASI', 'PERLU_PERBAIKAN'];
const DEFAULT_USERS = [
  { name: 'Administrator SIKAT', username: 'admin', password: 'Admin@123', role: 'Admin' },
  { name: 'Bendahara SIKAT', username: 'bendahara', password: 'Bendahara@123', role: 'Bendahara' },
  { name: 'Petugas Verifikasi', username: 'verifikasi', password: 'Verifikasi@123', role: 'Verifikasi' }
];
const DEFAULT_REFERENCE = [
  { kodeProgram: '1.03.02', namaProgram: 'PROGRAM PENGELOLAAN SUMBER DAYA AIR (SDA)', kodeKegiatan: '1.03.02.1.02', namaKegiatan: 'Pengembangan dan Pengelolaan Sistem Irigasi Primer dan Sekunder pada Daerah Irigasi yang Luasnya 1000 Ha-3000 Ha dan Daerah Irigasi Lintas Daerah Kabupaten/Kota', kodeSubKegiatan: '1.03.02.1.02.0030', namaSubKegiatan: 'Penguatan Kapasitas Kelembagaan Pengelola Irigasi Kewenangan Provinsi', unit: 'UPT PSDA WS SAMPEAN SETAIL BONDOWOSO' },
  { kodeProgram: '1.03.02', namaProgram: 'PROGRAM PENGELOLAAN SUMBER DAYA AIR (SDA)', kodeKegiatan: '1.03.02.1.02', namaKegiatan: 'Pengembangan dan Pengelolaan Sistem Irigasi Primer dan Sekunder pada Daerah Irigasi yang Luasnya 1000 Ha-3000 Ha dan Daerah Irigasi Lintas Daerah Kabupaten/Kota', kodeSubKegiatan: '1.03.02.1.02.0021', namaSubKegiatan: 'Operasi dan Pemeliharaan Jaringan Irigasi Permukaan', unit: 'UPT PSDA WS SAMPEAN SETAIL BONDOWOSO' },
  { kodeProgram: '1.03.02', namaProgram: 'PROGRAM PENGELOLAAN SUMBER DAYA AIR (SDA)', kodeKegiatan: '1.03.02.1.02', namaKegiatan: 'Pengembangan dan Pengelolaan Sistem Irigasi Primer dan Sekunder pada Daerah Irigasi yang Luasnya 1000 Ha-3000 Ha dan Daerah Irigasi Lintas Daerah Kabupaten/Kota', kodeSubKegiatan: '1.03.02.1.02.0014', namaSubKegiatan: 'Rehabilitasi Jaringan Irigasi Permukaan', unit: 'UPT PSDA WS SAMPEAN SETAIL BONDOWOSO' },
  { kodeProgram: '1.03.02', namaProgram: 'PROGRAM PENGELOLAAN SUMBER DAYA AIR (SDA)', kodeKegiatan: '1.03.02.1.01', namaKegiatan: 'Pengelolaan SDA dan Bangunan Pengaman Pantai pada Wilayah Sungai Lintas Daerah Kabupaten/Kota', kodeSubKegiatan: '1.03.02.1.01.0136', namaSubKegiatan: 'Pengelolaan Sistem Hidrologi dan Kualitas Air Wilayah Sungai Kewenangan Provinsi', unit: 'UPT PSDA WS SAMPEAN SETAIL BONDOWOSO' },
  { kodeProgram: '1.03.02', namaProgram: 'PROGRAM PENGELOLAAN SUMBER DAYA AIR (SDA)', kodeKegiatan: '1.03.02.1.01', namaKegiatan: 'Pengelolaan SDA dan Bangunan Pengaman Pantai pada Wilayah Sungai Lintas Daerah Kabupaten/Kota', kodeSubKegiatan: '1.03.02.1.01.0107', namaSubKegiatan: 'Operasi dan Pemeliharaan Tanggul dan Tebing Sungai', unit: 'UPT PSDA WS SAMPEAN SETAIL BONDOWOSO' },
  { kodeProgram: '1.03.02', namaProgram: 'PROGRAM PENGELOLAAN SUMBER DAYA AIR (SDA)', kodeKegiatan: '1.03.02.1.01', namaKegiatan: 'Pengelolaan SDA dan Bangunan Pengaman Pantai pada Wilayah Sungai Lintas Daerah Kabupaten/Kota', kodeSubKegiatan: '1.03.02.1.01.0090', namaSubKegiatan: 'Pembinaan dan Pemberdayaan Kelembagaan Pengelolaan Sumber Daya Air Kewenangan Provinsi', unit: 'UPT PSDA WS SAMPEAN SETAIL BONDOWOSO' },
  { kodeProgram: '1.03.02', namaProgram: 'PROGRAM PENGELOLAAN SUMBER DAYA AIR (SDA)', kodeKegiatan: '1.03.02.1.01', namaKegiatan: 'Pengelolaan SDA dan Bangunan Pengaman Pantai pada Wilayah Sungai Lintas Daerah Kabupaten/Kota', kodeSubKegiatan: '1.03.02.1.01.0009', namaSubKegiatan: 'Pembangunan Tanggul Sungai', unit: 'UPT PSDA WS SAMPEAN SETAIL BONDOWOSO' }
];
const DEFAULT_ACCOUNT_CODES = [
  { kodeSubKegiatan: '1.03.02.1.02.0030', subKegiatan: 'Penguatan Kapasitas Kelembagaan Pengelola Irigasi Kewenangan Provinsi', accountCode: '5.1.02.01.001.00004', description: 'Belanja Bahan-Bahan Bakar dan Pelumas' },
  { kodeSubKegiatan: '1.03.02.1.02.0030', subKegiatan: 'Penguatan Kapasitas Kelembagaan Pengelola Irigasi Kewenangan Provinsi', accountCode: '5.1.02.01.001.00024', description: 'Belanja Alat/Bahan untuk Kegiatan Kantor-Alat Tulis Kantor' },
  { kodeSubKegiatan: '1.03.02.1.02.0030', subKegiatan: 'Penguatan Kapasitas Kelembagaan Pengelola Irigasi Kewenangan Provinsi', accountCode: '5.1.02.01.001.00025', description: 'Belanja Alat/Bahan untuk Kegiatan Kantor- Kertas dan Cover' },
  { kodeSubKegiatan: '1.03.02.1.02.0030', subKegiatan: 'Penguatan Kapasitas Kelembagaan Pengelola Irigasi Kewenangan Provinsi', accountCode: '5.1.02.01.001.00027', description: 'Belanja Alat/Bahan untuk Kegiatan Kantor-Benda Pos' },
  { kodeSubKegiatan: '1.03.02.1.02.0030', subKegiatan: 'Penguatan Kapasitas Kelembagaan Pengelola Irigasi Kewenangan Provinsi', accountCode: '5.1.02.01.001.00029', description: 'Belanja Alat/Bahan untuk Kegiatan Kantor-Bahan Komputer' },
  { kodeSubKegiatan: '1.03.02.1.02.0030', subKegiatan: 'Penguatan Kapasitas Kelembagaan Pengelola Irigasi Kewenangan Provinsi', accountCode: '5.1.02.01.001.00030', description: 'Belanja Alat/Bahan untuk Kegiatan Kantor-Perabot Kantor' },
  { kodeSubKegiatan: '1.03.02.1.02.0030', subKegiatan: 'Penguatan Kapasitas Kelembagaan Pengelola Irigasi Kewenangan Provinsi', accountCode: '5.1.02.01.001.00031', description: 'Belanja Alat/Bahan untuk Kegiatan Kantor-Alat Listrik' },
  { kodeSubKegiatan: '1.03.02.1.02.0030', subKegiatan: 'Penguatan Kapasitas Kelembagaan Pengelola Irigasi Kewenangan Provinsi', accountCode: '5.1.02.01.001.00032', description: 'Belanja Alat/Bahan untuk Kegiatan Kantor-Perlengkapan Dinas' },
  { kodeSubKegiatan: '1.03.02.1.02.0030', subKegiatan: 'Penguatan Kapasitas Kelembagaan Pengelola Irigasi Kewenangan Provinsi', accountCode: '5.1.02.01.001.00036', description: 'Belanja Alat/Bahan untuk Kegiatan Kantor-Alat/Bahan untuk Kegiatan Kantor Lainnya' },
  { kodeSubKegiatan: '1.03.02.1.02.0030', subKegiatan: 'Penguatan Kapasitas Kelembagaan Pengelola Irigasi Kewenangan Provinsi', accountCode: '5.1.02.01.001.00052', description: 'Belanja Makanan dan Minuman Rapat' },
  { kodeSubKegiatan: '1.03.02.1.02.0030', subKegiatan: 'Penguatan Kapasitas Kelembagaan Pengelola Irigasi Kewenangan Provinsi', accountCode: '5.1.02.02.001.00003', description: 'Honorarium Narasumber atau Pembahas, Moderator, Pembawa Acara, dan Panitia' },
  { kodeSubKegiatan: '1.03.02.1.02.0030', subKegiatan: 'Penguatan Kapasitas Kelembagaan Pengelola Irigasi Kewenangan Provinsi', accountCode: '5.1.02.02.001.00028', description: 'Belanja Jasa Tenaga Pelayanan Umum' },
  { kodeSubKegiatan: '1.03.02.1.02.0030', subKegiatan: 'Penguatan Kapasitas Kelembagaan Pengelola Irigasi Kewenangan Provinsi', accountCode: '5.1.02.02.001.00030', description: 'Belanja Jasa Tenaga Kebersihan' },
  { kodeSubKegiatan: '1.03.02.1.02.0030', subKegiatan: 'Penguatan Kapasitas Kelembagaan Pengelola Irigasi Kewenangan Provinsi', accountCode: '5.1.02.02.001.00031', description: 'Belanja Jasa Tenaga Keamanan' },
  { kodeSubKegiatan: '1.03.02.1.02.0030', subKegiatan: 'Penguatan Kapasitas Kelembagaan Pengelola Irigasi Kewenangan Provinsi', accountCode: '5.1.02.02.001.00055', description: 'Belanja Jasa Iklan/Reklame, Film, dan Pemotretan' },
  { kodeSubKegiatan: '1.03.02.1.02.0030', subKegiatan: 'Penguatan Kapasitas Kelembagaan Pengelola Irigasi Kewenangan Provinsi', accountCode: '5.1.02.02.001.00062', description: 'Belanja Langganan Jurnal/Surat Kabar/Majalah' },
  { kodeSubKegiatan: '1.03.02.1.02.0030', subKegiatan: 'Penguatan Kapasitas Kelembagaan Pengelola Irigasi Kewenangan Provinsi', accountCode: '5.1.02.02.001.00063', description: 'Belanja Kawat/Faksimili/Internet/TV Berlangganan' },
  { kodeSubKegiatan: '1.03.02.1.02.0030', subKegiatan: 'Penguatan Kapasitas Kelembagaan Pengelola Irigasi Kewenangan Provinsi', accountCode: '5.1.02.02.001.00067', description: 'Belanja Pembayaran Pajak, Bea, dan Perizinan' },
  { kodeSubKegiatan: '1.03.02.1.02.0030', subKegiatan: 'Penguatan Kapasitas Kelembagaan Pengelola Irigasi Kewenangan Provinsi', accountCode: '5.1.02.02.001.00080', description: 'Belanja Honorarium Penanggungjawaban Pengelola Keuangan' },
  { kodeSubKegiatan: '1.03.02.1.02.0030', subKegiatan: 'Penguatan Kapasitas Kelembagaan Pengelola Irigasi Kewenangan Provinsi', accountCode: '5.1.02.02.001.00081', description: 'Belanja Honorarium Pengadaan Barang/Jasa' },
  { kodeSubKegiatan: '1.03.02.1.02.0030', subKegiatan: 'Penguatan Kapasitas Kelembagaan Pengelola Irigasi Kewenangan Provinsi', accountCode: '5.1.02.03.002.00036', description: 'Belanja Pemeliharaan Alat Angkutan-Alat Angkutan Darat Bermotor-Kendaraan Bermotor Penumpang' },
  { kodeSubKegiatan: '1.03.02.1.02.0030', subKegiatan: 'Penguatan Kapasitas Kelembagaan Pengelola Irigasi Kewenangan Provinsi', accountCode: '5.1.02.03.002.00038', description: 'Belanja Pemeliharaan Alat Angkutan-Alat Angkutan Darat Bermotor-Kendaraan Bermotor Beroda Dua' },
  { kodeSubKegiatan: '1.03.02.1.02.0030', subKegiatan: 'Penguatan Kapasitas Kelembagaan Pengelola Irigasi Kewenangan Provinsi', accountCode: '5.1.02.03.002.00061', description: 'Belanja Pemeliharaan Alat Bengkel dan Alat Ukur-Alat Bengkel Bermesin-Perkakas Bengkel Listrik' },
  { kodeSubKegiatan: '1.03.02.1.02.0030', subKegiatan: 'Penguatan Kapasitas Kelembagaan Pengelola Irigasi Kewenangan Provinsi', accountCode: '5.1.02.03.002.00121', description: 'Belanja Pemeliharaan Alat Kantor dan Rumah Tangga-Alat Rumah Tangga-Alat Pendingin' },
  { kodeSubKegiatan: '1.03.02.1.02.0030', subKegiatan: 'Penguatan Kapasitas Kelembagaan Pengelola Irigasi Kewenangan Provinsi', accountCode: '5.1.02.03.002.00405', description: 'Belanja Pemeliharaan Komputer-Komputer Unit-Personal Computer' },
  { kodeSubKegiatan: '1.03.02.1.02.0030', subKegiatan: 'Penguatan Kapasitas Kelembagaan Pengelola Irigasi Kewenangan Provinsi', accountCode: '5.1.02.03.002.00409', description: 'Belanja Pemeliharaan Komputer-Peralatan Komputer-Peralatan Personal Computer' },
  { kodeSubKegiatan: '1.03.02.1.02.0030', subKegiatan: 'Penguatan Kapasitas Kelembagaan Pengelola Irigasi Kewenangan Provinsi', accountCode: '5.1.02.03.003.00001', description: 'Belanja Pemeliharaan Bangunan Gedung-Bangunan Gedung Tempat Kerja-Bangunan Gedung Kantor' },
  { kodeSubKegiatan: '1.03.02.1.02.0030', subKegiatan: 'Penguatan Kapasitas Kelembagaan Pengelola Irigasi Kewenangan Provinsi', accountCode: '5.1.02.04.001.00001', description: 'Belanja Perjalanan Dinas Biasa' },
  { kodeSubKegiatan: '1.03.02.1.02.0030', subKegiatan: 'Penguatan Kapasitas Kelembagaan Pengelola Irigasi Kewenangan Provinsi', accountCode: '5.1.02.04.001.00003', description: 'Belanja Perjalanan Dinas Dalam Kota' },
  { kodeSubKegiatan: '1.03.02.1.02.0030', subKegiatan: 'Penguatan Kapasitas Kelembagaan Pengelola Irigasi Kewenangan Provinsi', accountCode: '5.2.02.03.001.00006', description: 'Belanja Modal Perkakas Bengkel Kayu' },
  { kodeSubKegiatan: '1.03.02.1.02.0030', subKegiatan: 'Penguatan Kapasitas Kelembagaan Pengelola Irigasi Kewenangan Provinsi', accountCode: '5.2.02.03.003.00017', description: 'Belanja Modal Alat Pengukur Keadaan Alam' },
  { kodeSubKegiatan: '1.03.02.1.02.0030', subKegiatan: 'Penguatan Kapasitas Kelembagaan Pengelola Irigasi Kewenangan Provinsi', accountCode: '5.2.02.05.001.00005', description: 'Belanja Modal Alat Kantor Lainnya' },
  { kodeSubKegiatan: '1.03.02.1.02.0030', subKegiatan: 'Penguatan Kapasitas Kelembagaan Pengelola Irigasi Kewenangan Provinsi', accountCode: '5.2.02.05.002.00001', description: 'Belanja Modal Mebel' },
  { kodeSubKegiatan: '1.03.02.1.02.0030', subKegiatan: 'Penguatan Kapasitas Kelembagaan Pengelola Irigasi Kewenangan Provinsi', accountCode: '5.2.02.05.002.00003', description: 'Belanja Modal Alat Pembersih' },
  { kodeSubKegiatan: '1.03.02.1.02.0030', subKegiatan: 'Penguatan Kapasitas Kelembagaan Pengelola Irigasi Kewenangan Provinsi', accountCode: '5.2.02.05.002.00004', description: 'Belanja Modal Alat Pendingin' },
  { kodeSubKegiatan: '1.03.02.1.02.0030', subKegiatan: 'Penguatan Kapasitas Kelembagaan Pengelola Irigasi Kewenangan Provinsi', accountCode: '5.2.02.05.002.00006', description: 'Belanja Modal Alat Rumah Tangga Lainnya (Home Use)' },
  { kodeSubKegiatan: '1.03.02.1.02.0030', subKegiatan: 'Penguatan Kapasitas Kelembagaan Pengelola Irigasi Kewenangan Provinsi', accountCode: '5.2.02.06.001.00001', description: 'Belanja Modal Peralatan Studio Audio' },
  { kodeSubKegiatan: '1.03.02.1.02.0030', subKegiatan: 'Penguatan Kapasitas Kelembagaan Pengelola Irigasi Kewenangan Provinsi', accountCode: '5.2.02.06.002.00001', description: 'Belanja Modal Alat Komunikasi Telephone' },
  { kodeSubKegiatan: '1.03.02.1.02.0030', subKegiatan: 'Penguatan Kapasitas Kelembagaan Pengelola Irigasi Kewenangan Provinsi', accountCode: '5.2.02.10.001.00002', description: 'Belanja Modal Personal Computer' },
  { kodeSubKegiatan: '1.03.02.1.02.0030', subKegiatan: 'Penguatan Kapasitas Kelembagaan Pengelola Irigasi Kewenangan Provinsi', accountCode: '5.2.02.10.002.00003', description: 'Belanja Modal Peralatan Personal Computer' },
  { kodeSubKegiatan: '1.03.02.1.02.0021', subKegiatan: 'Operasi dan Pemeliharaan Jaringan Irigasi Permukaan', accountCode: '5.1.02.01.001.00001', description: 'Belanja Bahan-Bahan Bangunan dan Konstruksi' },
  { kodeSubKegiatan: '1.03.02.1.02.0021', subKegiatan: 'Operasi dan Pemeliharaan Jaringan Irigasi Permukaan', accountCode: '5.1.02.01.001.00004', description: 'Belanja Bahan-Bahan Bakar dan Pelumas' },
  { kodeSubKegiatan: '1.03.02.1.02.0021', subKegiatan: 'Operasi dan Pemeliharaan Jaringan Irigasi Permukaan', accountCode: '5.1.02.01.001.00024', description: 'Belanja Alat/Bahan untuk Kegiatan Kantor-Alat Tulis Kantor' },
  { kodeSubKegiatan: '1.03.02.1.02.0021', subKegiatan: 'Operasi dan Pemeliharaan Jaringan Irigasi Permukaan', accountCode: '5.1.02.01.001.00025', description: 'Belanja Alat/Bahan untuk Kegiatan Kantor- Kertas dan Cover' },
  { kodeSubKegiatan: '1.03.02.1.02.0021', subKegiatan: 'Operasi dan Pemeliharaan Jaringan Irigasi Permukaan', accountCode: '5.1.02.01.001.00029', description: 'Belanja Alat/Bahan untuk Kegiatan Kantor-Bahan Komputer' },
  { kodeSubKegiatan: '1.03.02.1.02.0021', subKegiatan: 'Operasi dan Pemeliharaan Jaringan Irigasi Permukaan', accountCode: '5.1.02.01.001.00030', description: 'Belanja Alat/Bahan untuk Kegiatan Kantor-Perabot Kantor' },
  { kodeSubKegiatan: '1.03.02.1.02.0021', subKegiatan: 'Operasi dan Pemeliharaan Jaringan Irigasi Permukaan', accountCode: '5.1.02.01.001.00032', description: 'Belanja Alat/Bahan untuk Kegiatan Kantor-Perlengkapan Dinas' },
  { kodeSubKegiatan: '1.03.02.1.02.0021', subKegiatan: 'Operasi dan Pemeliharaan Jaringan Irigasi Permukaan', accountCode: '5.1.02.01.001.00052', description: 'Belanja Makanan dan Minuman Rapat' },
  { kodeSubKegiatan: '1.03.02.1.02.0021', subKegiatan: 'Operasi dan Pemeliharaan Jaringan Irigasi Permukaan', accountCode: '5.1.02.02.001.00016', description: 'Belanja Jasa Tenaga Penanganan Prasarana dan Sarana Umum' },
  { kodeSubKegiatan: '1.03.02.1.02.0021', subKegiatan: 'Operasi dan Pemeliharaan Jaringan Irigasi Permukaan', accountCode: '5.1.02.03.004.00031', description: 'Belanja Pemeliharaan Bangunan Air-Bangunan Air Irigasi-Bangunan Air Irigasi Lainnya' },
  { kodeSubKegiatan: '1.03.02.1.02.0021', subKegiatan: 'Operasi dan Pemeliharaan Jaringan Irigasi Permukaan', accountCode: '5.1.02.04.001.00001', description: 'Belanja Perjalanan Dinas Biasa' },
  { kodeSubKegiatan: '1.03.02.1.02.0021', subKegiatan: 'Operasi dan Pemeliharaan Jaringan Irigasi Permukaan', accountCode: '5.1.02.04.001.00003', description: 'Belanja Perjalanan Dinas Dalam Kota' },
  { kodeSubKegiatan: '1.03.02.1.02.0014', subKegiatan: 'Rehabilitasi Jaringan Irigasi Permukaan', accountCode: '5.1.02.01.001.00024', description: 'Belanja Alat/Bahan untuk Kegiatan Kantor-Alat Tulis Kantor' },
  { kodeSubKegiatan: '1.03.02.1.02.0014', subKegiatan: 'Rehabilitasi Jaringan Irigasi Permukaan', accountCode: '5.1.02.01.001.00025', description: 'Belanja Alat/Bahan untuk Kegiatan Kantor- Kertas dan Cover' },
  { kodeSubKegiatan: '1.03.02.1.02.0014', subKegiatan: 'Rehabilitasi Jaringan Irigasi Permukaan', accountCode: '5.1.02.01.001.00029', description: 'Belanja Alat/Bahan untuk Kegiatan Kantor-Bahan Komputer' },
  { kodeSubKegiatan: '1.03.02.1.02.0014', subKegiatan: 'Rehabilitasi Jaringan Irigasi Permukaan', accountCode: '5.1.02.01.001.00052', description: 'Belanja Makanan dan Minuman Rapat' },
  { kodeSubKegiatan: '1.03.02.1.02.0014', subKegiatan: 'Rehabilitasi Jaringan Irigasi Permukaan', accountCode: '5.1.02.04.001.00001', description: 'Belanja Perjalanan Dinas Biasa' },
  { kodeSubKegiatan: '1.03.02.1.02.0014', subKegiatan: 'Rehabilitasi Jaringan Irigasi Permukaan', accountCode: '5.1.02.04.001.00003', description: 'Belanja Perjalanan Dinas Dalam Kota' },
  { kodeSubKegiatan: '1.03.02.1.02.0014', subKegiatan: 'Rehabilitasi Jaringan Irigasi Permukaan', accountCode: '5.2.04.02.001.00008', description: 'Belanja Modal Bangunan Air Irigasi Lainnya' },
  { kodeSubKegiatan: '1.03.02.1.01.0136', subKegiatan: 'Pengelolaan Sistem Hidrologi dan Kualitas Air Wilayah Sungai Kewenangan Provinsi', accountCode: '5.1.02.01.001.00008', description: 'Belanja Bahan-Bahan/Bibit Tanaman' },
  { kodeSubKegiatan: '1.03.02.1.01.0136', subKegiatan: 'Pengelolaan Sistem Hidrologi dan Kualitas Air Wilayah Sungai Kewenangan Provinsi', accountCode: '5.1.02.01.001.00024', description: 'Belanja Alat/Bahan untuk Kegiatan Kantor-Alat Tulis Kantor' },
  { kodeSubKegiatan: '1.03.02.1.01.0136', subKegiatan: 'Pengelolaan Sistem Hidrologi dan Kualitas Air Wilayah Sungai Kewenangan Provinsi', accountCode: '5.1.02.01.001.00025', description: 'Belanja Alat/Bahan untuk Kegiatan Kantor- Kertas dan Cover' },
  { kodeSubKegiatan: '1.03.02.1.01.0136', subKegiatan: 'Pengelolaan Sistem Hidrologi dan Kualitas Air Wilayah Sungai Kewenangan Provinsi', accountCode: '5.1.02.01.001.00029', description: 'Belanja Alat/Bahan untuk Kegiatan Kantor-Bahan Komputer' },
  { kodeSubKegiatan: '1.03.02.1.01.0136', subKegiatan: 'Pengelolaan Sistem Hidrologi dan Kualitas Air Wilayah Sungai Kewenangan Provinsi', accountCode: '5.1.02.01.001.00032', description: 'Belanja Alat/Bahan untuk Kegiatan Kantor-Perlengkapan Dinas' },
  { kodeSubKegiatan: '1.03.02.1.01.0136', subKegiatan: 'Pengelolaan Sistem Hidrologi dan Kualitas Air Wilayah Sungai Kewenangan Provinsi', accountCode: '5.1.02.01.001.00052', description: 'Belanja Makanan dan Minuman Rapat' },
  { kodeSubKegiatan: '1.03.02.1.01.0136', subKegiatan: 'Pengelolaan Sistem Hidrologi dan Kualitas Air Wilayah Sungai Kewenangan Provinsi', accountCode: '5.1.02.02.001.00015', description: 'Belanja Jasa Tenaga Laboratorium' },
  { kodeSubKegiatan: '1.03.02.1.01.0136', subKegiatan: 'Pengelolaan Sistem Hidrologi dan Kualitas Air Wilayah Sungai Kewenangan Provinsi', accountCode: '5.1.02.02.001.00021', description: 'Belanja Jasa Tenaga Sumber Daya Air' },
  { kodeSubKegiatan: '1.03.02.1.01.0136', subKegiatan: 'Pengelolaan Sistem Hidrologi dan Kualitas Air Wilayah Sungai Kewenangan Provinsi', accountCode: '5.1.02.04.001.00001', description: 'Belanja Perjalanan Dinas Biasa' },
  { kodeSubKegiatan: '1.03.02.1.01.0136', subKegiatan: 'Pengelolaan Sistem Hidrologi dan Kualitas Air Wilayah Sungai Kewenangan Provinsi', accountCode: '5.1.02.04.001.00003', description: 'Belanja Perjalanan Dinas Dalam Kota' },
  { kodeSubKegiatan: '1.03.02.1.01.0107', subKegiatan: 'Operasi dan Pemeliharaan Tanggul dan Tebing Sungai', accountCode: '5.1.02.01.001.00001', description: 'Belanja Bahan-Bahan Bangunan dan Konstruksi' },
  { kodeSubKegiatan: '1.03.02.1.01.0107', subKegiatan: 'Operasi dan Pemeliharaan Tanggul dan Tebing Sungai', accountCode: '5.1.02.01.001.00004', description: 'Belanja Bahan-Bahan Bakar dan Pelumas' },
  { kodeSubKegiatan: '1.03.02.1.01.0107', subKegiatan: 'Operasi dan Pemeliharaan Tanggul dan Tebing Sungai', accountCode: '5.1.02.01.001.00014', description: 'Belanja Suku Cadang-Suku Cadang Alat Besar' },
  { kodeSubKegiatan: '1.03.02.1.01.0107', subKegiatan: 'Operasi dan Pemeliharaan Tanggul dan Tebing Sungai', accountCode: '5.1.02.01.001.00024', description: 'Belanja Alat/Bahan untuk Kegiatan Kantor-Alat Tulis Kantor' },
  { kodeSubKegiatan: '1.03.02.1.01.0107', subKegiatan: 'Operasi dan Pemeliharaan Tanggul dan Tebing Sungai', accountCode: '5.1.02.01.001.00025', description: 'Belanja Alat/Bahan untuk Kegiatan Kantor- Kertas dan Cover' },
  { kodeSubKegiatan: '1.03.02.1.01.0107', subKegiatan: 'Operasi dan Pemeliharaan Tanggul dan Tebing Sungai', accountCode: '5.1.02.01.001.00029', description: 'Belanja Alat/Bahan untuk Kegiatan Kantor-Bahan Komputer' },
  { kodeSubKegiatan: '1.03.02.1.01.0107', subKegiatan: 'Operasi dan Pemeliharaan Tanggul dan Tebing Sungai', accountCode: '5.1.02.01.001.00030', description: 'Belanja Alat/Bahan untuk Kegiatan Kantor-Perabot Kantor' },
  { kodeSubKegiatan: '1.03.02.1.01.0107', subKegiatan: 'Operasi dan Pemeliharaan Tanggul dan Tebing Sungai', accountCode: '5.1.02.01.001.00032', description: 'Belanja Alat/Bahan untuk Kegiatan Kantor-Perlengkapan Dinas' },
  { kodeSubKegiatan: '1.03.02.1.01.0107', subKegiatan: 'Operasi dan Pemeliharaan Tanggul dan Tebing Sungai', accountCode: '5.1.02.01.001.00036', description: 'Belanja Alat/Bahan untuk Kegiatan Kantor-Alat/Bahan untuk Kegiatan Kantor Lainnya' },
  { kodeSubKegiatan: '1.03.02.1.01.0107', subKegiatan: 'Operasi dan Pemeliharaan Tanggul dan Tebing Sungai', accountCode: '5.1.02.01.001.00052', description: 'Belanja Makanan dan Minuman Rapat' },
  { kodeSubKegiatan: '1.03.02.1.01.0107', subKegiatan: 'Operasi dan Pemeliharaan Tanggul dan Tebing Sungai', accountCode: '5.1.02.02.001.00016', description: 'Belanja Jasa Tenaga Penanganan Prasarana dan Sarana Umum' },
  { kodeSubKegiatan: '1.03.02.1.01.0107', subKegiatan: 'Operasi dan Pemeliharaan Tanggul dan Tebing Sungai', accountCode: '5.1.02.02.001.00021', description: 'Belanja Jasa Tenaga Sumber Daya Air' },
  { kodeSubKegiatan: '1.03.02.1.01.0107', subKegiatan: 'Operasi dan Pemeliharaan Tanggul dan Tebing Sungai', accountCode: '5.1.02.02.004.00003', description: 'Belanja Sewa Excavator' },
  { kodeSubKegiatan: '1.03.02.1.01.0107', subKegiatan: 'Operasi dan Pemeliharaan Tanggul dan Tebing Sungai', accountCode: '5.1.02.02.004.00037', description: 'Belanja Sewa Kendaraan Bermotor Angkutan Barang' },
  { kodeSubKegiatan: '1.03.02.1.01.0107', subKegiatan: 'Operasi dan Pemeliharaan Tanggul dan Tebing Sungai', accountCode: '5.1.02.02.005.00009', description: 'Belanja Sewa Bangunan Gedung Tempat Pertemuan' },
  { kodeSubKegiatan: '1.03.02.1.01.0107', subKegiatan: 'Operasi dan Pemeliharaan Tanggul dan Tebing Sungai', accountCode: '5.1.02.03.004.00031', description: 'Belanja Pemeliharaan Bangunan Air-Bangunan Air Irigasi-Bangunan Air Irigasi Lainnya' },
  { kodeSubKegiatan: '1.03.02.1.01.0107', subKegiatan: 'Operasi dan Pemeliharaan Tanggul dan Tebing Sungai', accountCode: '5.1.02.04.001.00001', description: 'Belanja Perjalanan Dinas Biasa' },
  { kodeSubKegiatan: '1.03.02.1.01.0107', subKegiatan: 'Operasi dan Pemeliharaan Tanggul dan Tebing Sungai', accountCode: '5.1.02.04.001.00003', description: 'Belanja Perjalanan Dinas Dalam Kota' },
  { kodeSubKegiatan: '1.03.02.1.01.0090', subKegiatan: 'Pembinaan dan Pemberdayaan Kelembagaan Pengelolaan Sumber Daya Air Kewenangan Provinsi', accountCode: '5.1.02.01.001.00024', description: 'Belanja Alat/Bahan untuk Kegiatan Kantor-Alat Tulis Kantor' },
  { kodeSubKegiatan: '1.03.02.1.01.0090', subKegiatan: 'Pembinaan dan Pemberdayaan Kelembagaan Pengelolaan Sumber Daya Air Kewenangan Provinsi', accountCode: '5.1.02.01.001.00025', description: 'Belanja Alat/Bahan untuk Kegiatan Kantor- Kertas dan Cover' },
  { kodeSubKegiatan: '1.03.02.1.01.0090', subKegiatan: 'Pembinaan dan Pemberdayaan Kelembagaan Pengelolaan Sumber Daya Air Kewenangan Provinsi', accountCode: '5.1.02.01.001.00029', description: 'Belanja Alat/Bahan untuk Kegiatan Kantor-Bahan Komputer' },
  { kodeSubKegiatan: '1.03.02.1.01.0090', subKegiatan: 'Pembinaan dan Pemberdayaan Kelembagaan Pengelolaan Sumber Daya Air Kewenangan Provinsi', accountCode: '5.1.02.01.001.00035', description: 'Belanja Alat/Bahan untuk Kegiatan Kantor- Suvenir/Cendera Mata' },
  { kodeSubKegiatan: '1.03.02.1.01.0090', subKegiatan: 'Pembinaan dan Pemberdayaan Kelembagaan Pengelolaan Sumber Daya Air Kewenangan Provinsi', accountCode: '5.1.02.01.001.00052', description: 'Belanja Makanan dan Minuman Rapat' },
  { kodeSubKegiatan: '1.03.02.1.01.0090', subKegiatan: 'Pembinaan dan Pemberdayaan Kelembagaan Pengelolaan Sumber Daya Air Kewenangan Provinsi', accountCode: '5.1.02.02.001.00003', description: 'Honorarium Narasumber atau Pembahas, Moderator, Pembawa Acara, dan Panitia' },
  { kodeSubKegiatan: '1.03.02.1.01.0090', subKegiatan: 'Pembinaan dan Pemberdayaan Kelembagaan Pengelolaan Sumber Daya Air Kewenangan Provinsi', accountCode: '5.1.02.02.001.00004', description: 'Honorarium Tim Pelaksana Kegiatan dan Sekretariat Tim Pelaksana Kegiatan' },
  { kodeSubKegiatan: '1.03.02.1.01.0090', subKegiatan: 'Pembinaan dan Pemberdayaan Kelembagaan Pengelolaan Sumber Daya Air Kewenangan Provinsi', accountCode: '5.1.02.02.001.00055', description: 'Belanja Jasa Iklan/Reklame, Film, dan Pemotretan' },
  { kodeSubKegiatan: '1.03.02.1.01.0090', subKegiatan: 'Pembinaan dan Pemberdayaan Kelembagaan Pengelolaan Sumber Daya Air Kewenangan Provinsi', accountCode: '5.1.02.02.005.00009', description: 'Belanja Sewa Bangunan Gedung Tempat Pertemuan' },
  { kodeSubKegiatan: '1.03.02.1.01.0090', subKegiatan: 'Pembinaan dan Pemberdayaan Kelembagaan Pengelolaan Sumber Daya Air Kewenangan Provinsi', accountCode: '5.1.02.04.001.00001', description: 'Belanja Perjalanan Dinas Biasa' },
  { kodeSubKegiatan: '1.03.02.1.01.0090', subKegiatan: 'Pembinaan dan Pemberdayaan Kelembagaan Pengelolaan Sumber Daya Air Kewenangan Provinsi', accountCode: '5.1.02.04.001.00003', description: 'Belanja Perjalanan Dinas Dalam Kota' },
  { kodeSubKegiatan: '1.03.02.1.01.0009', subKegiatan: 'Pembangunan Tanggul Sungai', accountCode: '5.1.02.01.001.00024', description: 'Belanja Alat/Bahan untuk Kegiatan Kantor-Alat Tulis Kantor' },
  { kodeSubKegiatan: '1.03.02.1.01.0009', subKegiatan: 'Pembangunan Tanggul Sungai', accountCode: '5.1.02.01.001.00025', description: 'Belanja Alat/Bahan untuk Kegiatan Kantor- Kertas dan Cover' },
  { kodeSubKegiatan: '1.03.02.1.01.0009', subKegiatan: 'Pembangunan Tanggul Sungai', accountCode: '5.1.02.01.001.00029', description: 'Belanja Alat/Bahan untuk Kegiatan Kantor-Bahan Komputer' },
  { kodeSubKegiatan: '1.03.02.1.01.0009', subKegiatan: 'Pembangunan Tanggul Sungai', accountCode: '5.1.02.01.001.00052', description: 'Belanja Makanan dan Minuman Rapat' },
  { kodeSubKegiatan: '1.03.02.1.01.0009', subKegiatan: 'Pembangunan Tanggul Sungai', accountCode: '5.1.02.04.001.00001', description: 'Belanja Perjalanan Dinas Biasa' },
  { kodeSubKegiatan: '1.03.02.1.01.0009', subKegiatan: 'Pembangunan Tanggul Sungai', accountCode: '5.1.02.04.001.00003', description: 'Belanja Perjalanan Dinas Dalam Kota' },
  { kodeSubKegiatan: '1.03.02.1.01.0009', subKegiatan: 'Pembangunan Tanggul Sungai', accountCode: '5.2.04.02.004.00005', description: 'Belanja Modal Bangunan Pengaman Pengamanan Sungai/Pantai' }
];
// ========================
const SHEET_HEADERS = {};
SHEET_HEADERS[SHEET_NAMES.USERS] = ['ID', 'Nama', 'Username', 'PasswordHash', 'Role', 'Status', 'WajibGantiPassword', 'CreatedAt', 'UpdatedAt'];
SHEET_HEADERS[SHEET_NAMES.BUDGETS] = ['ID', 'Tahun', 'Program', 'KodeProgram', 'KodeKegiatan', 'NamaKegiatan', 'SubKegiatan', 'KodeSubKegiatan', 'Unit', 'Pagu', 'KodeRekeningInfo', 'Keterangan', 'CreatedAt', 'UpdatedAt'];
SHEET_HEADERS[SHEET_NAMES.REALIZATIONS] = ['ID', 'AnggaranID', 'Tanggal', 'NoDokumen', 'Uraian', 'KodeRekening', 'Nilai', 'BuktiFileID', 'BuktiFileName', 'BuktiFileURL', 'StatusVerifikasi', 'CatatanVerifikasi', 'VerifikatorID', 'NamaVerifikator', 'TanggalVerifikasi', 'DibuatOlehID', 'NamaPembuat', 'CreatedAt', 'UpdatedAt', 'JenisBelanja'];
SHEET_HEADERS[SHEET_NAMES.SETTINGS] = ['Key', 'Value', 'UpdatedAt'];
SHEET_HEADERS[SHEET_NAMES.LOG] = ['ID', 'Waktu', 'UserID', 'Nama', 'Role', 'Aksi', 'Entitas', 'EntityID', 'Detail'];
SHEET_HEADERS[SHEET_NAMES.ACCOUNT_CODES] = ['ID', 'KodeSubKegiatan', 'SubKegiatan', 'KodeRekening', 'Uraian', 'CreatedAt', 'UpdatedAt', 'Unit'];
SHEET_HEADERS[SHEET_NAMES.REFERENCE] = ['ID', 'KodeProgram', 'NamaProgram', 'KodeKegiatan', 'NamaKegiatan', 'KodeSubKegiatan', 'NamaSubKegiatan', 'Unit', 'CreatedAt', 'UpdatedAt'];
SHEET_HEADERS[SHEET_NAMES.PAGU_REKENING] = ['ID', 'AnggaranID', 'KodeRekening', 'PaguAwal', 'PaguRevisi', 'CreatedAt', 'UpdatedAt'];
const SHEET_WIDTHS = {};
SHEET_WIDTHS[SHEET_NAMES.USERS] = [150, 220, 160, 300, 120, 110, 170, 170, 170];
SHEET_WIDTHS[SHEET_NAMES.BUDGETS] = [150, 90, 220, 130, 150, 300, 220, 160, 180, 150, 170, 300, 170, 170];
SHEET_WIDTHS[SHEET_NAMES.REALIZATIONS] = [150, 150, 120, 160, 300, 220, 150, 180, 220, 260, 180, 300, 160, 220, 170, 160, 220, 170, 170];
SHEET_WIDTHS[SHEET_NAMES.SETTINGS] = [220, 500, 170];
SHEET_WIDTHS[SHEET_NAMES.LOG] = [150, 170, 160, 220, 120, 180, 150, 160, 350];
SHEET_WIDTHS[SHEET_NAMES.ACCOUNT_CODES] = [150, 170, 300, 220, 320, 170, 170, 260];
SHEET_WIDTHS[SHEET_NAMES.REFERENCE] = [150, 120, 260, 150, 300, 170, 300, 220, 170, 170];

function doGet(e) {
  try {
    return HtmlService.createTemplateFromFile('Index').evaluate().setTitle(APP_NAME + ' — Dinas PU SDA Provinsi Jawa Timur').setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL).addMetaTag('viewport', 'width=device-width, initial-scale=1, maximum-scale=1');
  } catch (err) {
    return HtmlService.createHtmlOutput('<h1>SIKAT</h1><p>' + escapeHtmlServer_(err.message) + '</p>');
  }
}

function doPost(e) {
  try {
    const body = e && e.postData && e.postData.contents ? JSON.parse(e.postData.contents) : {};
    const result = body.action === 'health' ? { success: true, data: { app: APP_NAME, timestamp: now_() }, message: 'SIKAT aktif.' } : { success: false, message: 'Aksi tidak dikenali.' };
    return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, message: err.message })).setMimeType(ContentService.MimeType.JSON);
  }
}

function onOpen() {
  try {
    SpreadsheetApp.getUi().createMenu(APP_NAME).addItem('Setup Database', 'SetupDatabase').addItem('Migrasi Skema (tambah kolom baru)', 'migrateSchema_SIKAT').addItem('Migrasi Data Lama ke Referensi', 'migrateLegacyReferences_SIKAT').addSeparator().addItem('Buka informasi aplikasi', 'showAppInfo').addToUi();
    return { success: true, message: 'Menu SIKAT berhasil dibuat.' };
  } catch (err) {
    return { success: false, message: err.message };
  }
}

function migrateLegacyReferences_SIKAT() {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000);
    const ss = getSpreadsheet_();
    const referensi = getDataObjects_(SHEET_NAMES.REFERENCE);
    const report = [];

    const normalize_ = function(s) {
      return String(s || '').trim().toLowerCase().replace(/\s+/g, ' ');
    };

    // ----- Anggaran (Budgets) -----
    const budgetSh = ss.getSheetByName(SHEET_NAMES.BUDGETS);
    const budgetValues = budgetSh ? budgetSh.getDataRange().getDisplayValues() : [];
    let budgetMatched = 0;
    const unmatchedBudgetRows = [];
    if (budgetValues.length) {
      const headers = budgetValues[0];
      const idxKodeSub = headers.indexOf('KodeSubKegiatan');
      const idxKodeProgram = headers.indexOf('KodeProgram');
      const idxKodeKegiatan = headers.indexOf('KodeKegiatan');
      const idxSubKegiatan = headers.indexOf('SubKegiatan');
      const idxUnit = headers.indexOf('Unit');
      if (idxKodeSub === -1) {
        report.push('Anggaran: kolom KodeSubKegiatan belum ada. Jalankan "Migrasi Skema" terlebih dahulu.');
      } else {
        for (let i = 1; i < budgetValues.length; i++) {
          const row = budgetValues[i];
          const hasData = row.some(function(v) { return v !== ''; });
          if (!hasData) continue;
          if (row[idxKodeSub]) continue;
          const subName = normalize_(row[idxSubKegiatan]);
          const kegiatanCode = String(row[idxKodeKegiatan] || '').trim();
          if (!subName) continue;
          let match = referensi.find(function(r) {
            return normalize_(r.NamaSubKegiatan) === subName && (!kegiatanCode || r.KodeKegiatan === kegiatanCode);
          });
          if (!match) {
            match = referensi.find(function(r) {
              return normalize_(r.NamaSubKegiatan) === subName;
            });
          }
          if (match) {
            budgetSh.getRange(i + 1, idxKodeSub + 1).setValue(match.KodeSubKegiatan);
            if (idxKodeProgram > -1) budgetSh.getRange(i + 1, idxKodeProgram + 1).setValue(match.KodeProgram);
            if (idxUnit > -1 && !row[idxUnit]) budgetSh.getRange(i + 1, idxUnit + 1).setValue(match.Unit);
            budgetMatched++;
          } else {
            unmatchedBudgetRows.push('Baris ' + (i + 1) + ': "' + row[idxSubKegiatan] + '"');
          }
        }
        report.push('Anggaran: ' + budgetMatched + ' baris berhasil dicocokkan ke Referensi, ' + unmatchedBudgetRows.length + ' baris belum cocok.');
      }
    }

    // ----- Kode Rekening (Account Codes) -----
    const accSh = ss.getSheetByName(SHEET_NAMES.ACCOUNT_CODES);
    const accValues = accSh ? accSh.getDataRange().getDisplayValues() : [];
    let accMatched = 0;
    const unmatchedAccRows = [];
    if (accValues.length) {
      const headers = accValues[0];
      const idxKodeSub = headers.indexOf('KodeSubKegiatan');
      const idxSubKegiatan = headers.indexOf('SubKegiatan');
      const idxUraian = headers.indexOf('Uraian');
      const idxKodeRekening = headers.indexOf('KodeRekening');
      if (idxKodeSub === -1) {
        report.push('KodeRekening: kolom KodeSubKegiatan belum ada. Jalankan "Migrasi Skema" terlebih dahulu.');
      } else {
        for (let i = 1; i < accValues.length; i++) {
          const row = accValues[i];
          const hasData = row.some(function(v) { return v !== ''; });
          if (!hasData) continue;
          if (row[idxKodeSub]) continue;
          const subName = normalize_(row[idxSubKegiatan]);
          if (!subName) continue;
          const match = referensi.find(function(r) {
            return normalize_(r.NamaSubKegiatan) === subName;
          });
          if (match) {
            accSh.getRange(i + 1, idxKodeSub + 1).setValue(match.KodeSubKegiatan);
            accSh.getRange(i + 1, idxSubKegiatan + 1).setValue(match.NamaSubKegiatan);
            if (idxUraian > -1 && !row[idxUraian]) accSh.getRange(i + 1, idxUraian + 1).setValue(row[idxSubKegiatan]);
            accMatched++;
          } else {
            unmatchedAccRows.push('Baris ' + (i + 1) + ' (' + row[idxKodeRekening] + '): "' + row[idxSubKegiatan] + '"');
          }
        }
        report.push('KodeRekening: ' + accMatched + ' baris berhasil dicocokkan ke Referensi, ' + unmatchedAccRows.length + ' baris belum cocok.');
      }
    }

    invalidateCache_();
    let message = report.join(' | ');
    if (unmatchedBudgetRows.length) message += '\n\nAnggaran belum cocok (lengkapi manual di sheet Anggaran kolom KodeSubKegiatan, atau tambahkan dulu ke ReferensiKegiatan lalu jalankan ulang menu ini):\n' + unmatchedBudgetRows.slice(0, 25).join('\n');
    if (unmatchedAccRows.length) message += '\n\nKodeRekening belum cocok:\n' + unmatchedAccRows.slice(0, 25).join('\n');
    SpreadsheetApp.getUi().alert(APP_NAME, message, SpreadsheetApp.getUi().ButtonSet.OK);
    return { success: true, message: message };
  } catch (err) {
    try { SpreadsheetApp.getUi().alert(APP_NAME, 'Migrasi gagal: ' + err.message, SpreadsheetApp.getUi().ButtonSet.OK); } catch (ignored) {}
    return { success: false, message: err.message };
  } finally {
    lock.releaseLock();
  }
}

function showAppInfo() {
  try {
    SpreadsheetApp.getUi().alert(APP_NAME, 'Deploy proyek Apps Script sebagai Web App untuk menggunakan aplikasi. Jalankan Setup Database terlebih dahulu.', SpreadsheetApp.getUi().ButtonSet.OK);
    return { success: true, message: 'Informasi ditampilkan.' };
  } catch (err) {
    return { success: false, message: err.message };
  }
}

function fixLegacyBranding_SIKAT() {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000);
    const sh = getSheet_(SHEET_NAMES.USERS);
    const values = sh.getDataRange().getDisplayValues();
    if (!values.length) return { success: true, message: 'Tidak ada data pengguna untuk diperbarui.' };
    const headers = values[0];
    const nameIndex = headers.indexOf('Nama');
    const updatedAtIndex = headers.indexOf('UpdatedAt');
    let updatedCount = 0;
    for (let i = 1; i < values.length; i++) {
      const currentName = values[i][nameIndex];
      if (currentName && currentName.indexOf('SIKARA') > -1) {
        const newName = currentName.replace(/SIKARA/g, 'SIKAT');
        sh.getRange(i + 1, nameIndex + 1).setValue(newName);
        if (updatedAtIndex > -1) sh.getRange(i + 1, updatedAtIndex + 1).setValue(now_());
        updatedCount++;
      }
    }
    invalidateCache_();
    return { success: true, message: updatedCount + ' nama pengguna berhasil diperbarui dari SIKARA menjadi SIKAT.' };
  } catch (err) {
    return { success: false, message: err.message };
  } finally {
    lock.releaseLock();
  }
}

function migrateSchema_SIKAT() {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000);
    const ss = getSpreadsheet_();
    const report = [];
    Object.keys(SHEET_HEADERS).forEach(function(name) {
      let sh = ss.getSheetByName(name);
      if (!sh) sh = ss.insertSheet(name);
      const expectedHeaders = SHEET_HEADERS[name];
      if (sh.getLastRow() === 0) {
        sh.getRange(1, 1, 1, expectedHeaders.length).setValues([expectedHeaders]);
        sh.setFrozenRows(1);
        sh.getRange(1, 1, 1, expectedHeaders.length).setBackground('#0B3B75').setFontColor('#FFFFFF').setFontWeight('bold').setVerticalAlignment('middle');
        SHEET_WIDTHS[name].forEach(function(width, index) {
          sh.setColumnWidth(index + 1, width);
        });
        report.push(name + ': header awal dibuat (' + expectedHeaders.length + ' kolom).');
        return;
      }
      const currentHeaders = sh.getRange(1, 1, 1, sh.getLastColumn()).getDisplayValues()[0];
      const missing = expectedHeaders.filter(function(h) {
        return currentHeaders.indexOf(h) === -1;
      });
      if (missing.length) {
        sh.getRange(1, currentHeaders.length + 1, 1, missing.length).setValues([missing]);
        sh.getRange(1, currentHeaders.length + 1, 1, missing.length).setBackground('#0B3B75').setFontColor('#FFFFFF').setFontWeight('bold').setVerticalAlignment('middle');
        report.push(name + ': kolom baru ditambahkan -> ' + missing.join(', '));
      } else {
        report.push(name + ': sudah lengkap, tidak ada perubahan.');
      }
    });
    const referenceSh = ss.getSheetByName(SHEET_NAMES.REFERENCE);
    if (referenceSh && referenceSh.getLastRow() === 1) {
      const timestamp = now_();
      const rows = DEFAULT_REFERENCE.map(function(item) {
        return [createId_('REF'), item.kodeProgram, item.namaProgram, item.kodeKegiatan, item.namaKegiatan, item.kodeSubKegiatan, item.namaSubKegiatan, item.unit, timestamp, timestamp];
      });
      referenceSh.getRange(2, 1, rows.length, rows[0].length).setValues(rows);
      report.push('ReferensiKegiatan: ' + rows.length + ' data referensi awal ditambahkan.');
    }
    const accountCodesSh = ss.getSheetByName(SHEET_NAMES.ACCOUNT_CODES);
    if (accountCodesSh && accountCodesSh.getLastRow() === 1) {
      const timestamp = now_();
      const rows = DEFAULT_ACCOUNT_CODES.map(function(item) {
        return [createId_('REK'), item.kodeSubKegiatan, item.subKegiatan, item.accountCode, item.description, timestamp, timestamp];
      });
      accountCodesSh.getRange(2, 1, rows.length, rows[0].length).setValues(rows);
      report.push('KodeRekening: ' + rows.length + ' data referensi awal ditambahkan.');
    }
    invalidateCache_();
    return { success: true, message: report.join(' | ') };
  } catch (err) {
    return { success: false, message: err.message };
  } finally {
    lock.releaseLock();
  }
}

function sinkronKodeRekeningDefault_SIKAT() {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000);
    const sh = getSheet_(SHEET_NAMES.ACCOUNT_CODES);
    const timestamp = now_();
    const values = sh.getDataRange().getDisplayValues();
    const headers = values.length ? values[0] : SHEET_HEADERS[SHEET_NAMES.ACCOUNT_CODES];
    if (!values.length) {
      sh.getRange(1, 1, 1, headers.length).setValues([headers]);
    }
    const idxKodeSub = headers.indexOf('KodeSubKegiatan');
    const idxKodeRek = headers.indexOf('KodeRekening');
    const idxUraian = headers.indexOf('Uraian');
    const idxUpdatedAt = headers.indexOf('UpdatedAt');
    const existingKey = {};
    for (let i = 1; i < values.length; i++) {
      const row = values[i];
      if (!row[idxKodeSub] && !row[idxKodeRek]) continue;
      existingKey[row[idxKodeSub] + '||' + row[idxKodeRek]] = i + 1; // nomor baris di sheet
    }
    let added = 0;
    let updated = 0;
    const newRows = [];
    DEFAULT_ACCOUNT_CODES.forEach(function(item) {
      const key = item.kodeSubKegiatan + '||' + item.accountCode;
      const rowNumber = existingKey[key];
      if (rowNumber) {
        const currentUraian = sh.getRange(rowNumber, idxUraian + 1).getDisplayValue();
        if (!currentUraian && item.description) {
          sh.getRange(rowNumber, idxUraian + 1).setValue(item.description);
          if (idxUpdatedAt > -1) sh.getRange(rowNumber, idxUpdatedAt + 1).setValue(timestamp);
          updated++;
        }
        return;
      }
      const row = headers.map(function(h) {
        if (h === 'ID') return createId_('REK');
        if (h === 'KodeSubKegiatan') return item.kodeSubKegiatan;
        if (h === 'SubKegiatan') return item.subKegiatan;
        if (h === 'KodeRekening') return item.accountCode;
        if (h === 'Uraian') return item.description;
        if (h === 'CreatedAt' || h === 'UpdatedAt') return timestamp;
        return '';
      });
      newRows.push(row);
      added++;
    });
    if (newRows.length) {
      sh.getRange(sh.getLastRow() + 1, 1, newRows.length, headers.length).setValues(newRows);
    }
    invalidateCache_();
    return { success: true, message: 'Kode Rekening: ' + added + ' data baru ditambahkan, ' + updated + ' uraian kosong dilengkapi. Data yang sudah ada tidak diubah/dihapus.' };
  } catch (err) {
    return { success: false, message: err.message };
  } finally {
    lock.releaseLock();
  }
}

function SetupDatabase() {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000);
    const ss = getSpreadsheet_();
    Object.keys(SHEET_HEADERS).forEach(function(name) {
      let sh = ss.getSheetByName(name);
      if (!sh) sh = ss.insertSheet(name);
      if (sh.getLastRow() === 0) sh.getRange(1, 1, 1, SHEET_HEADERS[name].length).setValues([SHEET_HEADERS[name]]);
      sh.setFrozenRows(1);
      sh.getRange(1, 1, 1, SHEET_HEADERS[name].length).setBackground('#0B3B75').setFontColor('#FFFFFF').setFontWeight('bold').setVerticalAlignment('middle');
      sh.setRowHeight(1, 34);
      SHEET_WIDTHS[name].forEach(function(width, index) {
        sh.setColumnWidth(index + 1, width);
      });
    });
    const usersSh = ss.getSheetByName(SHEET_NAMES.USERS);
    if (usersSh.getLastRow() === 1) {
      const timestamp = now_();
      const rows = DEFAULT_USERS.map(function(user) {
        return [createId_('USR'), user.name, user.username.toLowerCase(), hashPassword_(user.password), user.role, 'Aktif', 'YA', timestamp, timestamp];
      });
      usersSh.getRange(2, 1, rows.length, rows[0].length).setValues(rows);
    }
    const settingsSh = ss.getSheetByName(SHEET_NAMES.SETTINGS);
    if (settingsSh.getLastRow() === 1) {
      const timestamp = now_();
      settingsSh.getRange(2, 1, 5, 3).setValues([
        ['AppName', APP_NAME, timestamp],
        ['Institution', 'Dinas PU SDA Provinsi Jawa Timur', timestamp],
        ['LogoFileID', '', timestamp],
        ['LogoFileName', '', timestamp],
        ['LogoFileURL', '', timestamp]
      ]);
    }
    const referenceSh = ss.getSheetByName(SHEET_NAMES.REFERENCE);
    if (referenceSh.getLastRow() === 1) {
      const timestamp = now_();
      const rows = DEFAULT_REFERENCE.map(function(item) {
        return [createId_('REF'), item.kodeProgram, item.namaProgram, item.kodeKegiatan, item.namaKegiatan, item.kodeSubKegiatan, item.namaSubKegiatan, item.unit, timestamp, timestamp];
      });
      referenceSh.getRange(2, 1, rows.length, rows[0].length).setValues(rows);
    }
    const accountCodesSh = ss.getSheetByName(SHEET_NAMES.ACCOUNT_CODES);
    if (accountCodesSh.getLastRow() === 1) {
      const timestamp = now_();
      const rows = DEFAULT_ACCOUNT_CODES.map(function(item) {
        return [createId_('REK'), item.kodeSubKegiatan, item.subKegiatan, item.accountCode, item.description, timestamp, timestamp];
      });
      accountCodesSh.getRange(2, 1, rows.length, rows[0].length).setValues(rows);
    }
    getRootFolder_();
    invalidateCache_();
    return { success: true, message: 'Database berhasil di-setup.' };
  } catch (err) {
    return { success: false, message: err.message };
  } finally {
    lock.releaseLock();
  }
}

function login(payload) {
  const lock = LockService.getScriptLock();
  try {
    if (!payload || !clean_(payload.username) || !payload.password) return { success: false, message: 'Username dan kata sandi wajib diisi.' };
    const users = getDataObjects_(SHEET_NAMES.USERS);
    const username = clean_(payload.username).toLowerCase();
    const user = users.find(function(item) {
      return String(item.Username).toLowerCase() === username;
    });
    if (!user || user.Status !== 'Aktif' || user.PasswordHash !== hashPassword_(String(payload.password))) return { success: false, message: 'Username atau kata sandi tidak sesuai.' };
    if (user.Role !== 'Admin') {
      const mv = maintenanceView_();
      if (mv.active) return { success: false, maintenance: mv, message: maintenanceBlockMessage_(mv) };
    }
    lock.waitLock(15000);
    const token = Utilities.getUuid().replace(/-/g, '') + Utilities.getUuid().replace(/-/g, '');
    const expiresAt = Date.now() + SESSION_TTL_SECONDS * 1000;
    PropertiesService.getScriptProperties().setProperty('SESSION_' + token, JSON.stringify({ userId: user.ID, expiresAt: expiresAt }));
    appendAudit_({ ID: user.ID, Nama: user.Nama, Role: user.Role }, 'LOGIN', 'Sesi', token.substring(0, 12), 'Login berhasil');
    return { success: true, data: { token: token, expiresAt: expiresAt, user: toClientUser_(user) }, message: 'Selamat datang, ' + user.Nama + '.' };
  } catch (err) {
    return { success: false, message: err.message };
  } finally {
    lock.releaseLock();
  }
}

function logout(payload) {
  const lock = LockService.getScriptLock();
  try {
    if (!payload || !payload.token) return { success: true, message: 'Sesi telah berakhir.' };
    lock.waitLock(15000);
    let user = null;
    try {
      user = requireAuth_(payload);
    } catch (ignored) {
      user = null;
    }
    PropertiesService.getScriptProperties().deleteProperty('SESSION_' + payload.token);
    if (user) appendAudit_(user, 'LOGOUT', 'Sesi', String(payload.token).substring(0, 12), 'Logout berhasil');
    return { success: true, message: 'Anda berhasil logout.' };
  } catch (err) {
    return { success: false, message: err.message };
  } finally {
    lock.releaseLock();
  }
}

function getBootstrapData(payload) {
  try {
    const user = requireAuth_(payload);
    let common;
    const cachedText = cacheGetLarge_(CACHE_KEYS.APP);
    if (cachedText) {
      common = JSON.parse(cachedText);
    } else {
      ensureAccountUnits_();
      restoreAccountCodesForBudgets_();
      common = {
        budgets: getDataObjects_(SHEET_NAMES.BUDGETS).slice(-MAX_DATA_ROWS),
        realizations: getDataObjects_(SHEET_NAMES.REALIZATIONS).slice(-MAX_DATA_ROWS),
        accountCodes: getDataObjects_(SHEET_NAMES.ACCOUNT_CODES),
        referensi: getDataObjects_(SHEET_NAMES.REFERENCE),
        paguRekening: getDataObjects_(SHEET_NAMES.PAGU_REKENING),
        settings: getSettings_()
      };
      cachePutLarge_(CACHE_KEYS.APP, JSON.stringify(common), 300);
    }
    const users = user.Role === 'Admin' ? getDataObjects_(SHEET_NAMES.USERS).map(toClientUser_) : [];
    return {
      success: true,
      data: {
        user: toClientUser_(user),
        budgets: common.budgets,
        realizations: common.realizations,
        accountCodes: common.accountCodes,
        referensi: common.referensi,
        paguRekening: common.paguRekening,
        settings: common.settings,
        users: users,
        config: { appName: APP_NAME, timezone: TIMEZONE, maxUploadBytes: MAX_UPLOAD_BYTES, roles: ALLOWED_ROLES, statuses: VERIFICATION_STATUSES }
      },
      message: 'Data berhasil dimuat.'
    };
  } catch (err) {
    return { success: false, message: err.message };
  }
}

function saveBudget(payload) {
  const lock = LockService.getScriptLock();
  try {
    const user = requireAuth_(payload, ['Admin']);
    const data = payload && payload.data ? payload.data : {};
    const year = clean_(data.year);
    const refId = clean_(data.refId);
    if (!/^\d{4}$/.test(year) || !refId) return { success: false, message: 'Data anggaran tidak valid. Pastikan tahun diisi dan Program/Kegiatan/Sub Kegiatan dipilih dari referensi.' };
    const ref = getDataObjects_(SHEET_NAMES.REFERENCE).find(function(item) {
      return item.ID === refId;
    });
    if (!ref) return { success: false, message: 'Program/Kegiatan/Sub Kegiatan yang dipilih tidak ditemukan pada Referensi. Pilih ulang dari daftar.' };
    const kodeRekeningInfo = clean_(data.kodeRekeningInfo);
    if (kodeRekeningInfo) {
      const validInfo = getDataObjects_(SHEET_NAMES.ACCOUNT_CODES).some(function(item) {
        return item.KodeRekening === kodeRekeningInfo && accountMatches_(item, ref.KodeSubKegiatan, ref.Unit);
      });
      if (!validInfo) return { success: false, message: 'Kode rekening yang dipilih tidak terdaftar untuk Sub Kegiatan tersebut.' };
    }
    lock.waitLock(15000);
    const sh = getSheet_(SHEET_NAMES.BUDGETS);
    const found = data.id ? findRowById_(sh, data.id) : null;
    if (data.id && !found) return { success: false, message: 'Data anggaran tidak ditemukan.' };
    const sameText_ = function(x, y) { return clean_(x).toLowerCase() === clean_(y).toLowerCase(); };
    const duplicate = getDataObjects_(SHEET_NAMES.BUDGETS).find(function(item) {
      return sameText_(item.KodeSubKegiatan, ref.KodeSubKegiatan) && sameText_(item.Unit, ref.Unit) && clean_(item.Tahun) === year && item.ID !== clean_(data.id);
    });
    if (duplicate) return { success: false, duplicateId: duplicate.ID, message: 'Anggaran untuk Sub Kegiatan ' + ref.KodeSubKegiatan + ' pada ' + ref.Unit + ' tahun ' + year + ' sudah ada (pagu ' + duplicate.Pagu + ').' };
    // Pagu anggaran = jumlah pagu seluruh kode rekening (diisi lewat rincian). Anggaran baru dimulai dari 0.
    let paguTotal = found ? toNumber_(found.object.Pagu) : 0;
    if (found) {
      const rincian = getDataObjects_(SHEET_NAMES.PAGU_REKENING).filter(function(p) { return p.AnggaranID === found.object.ID; });
      if (rincian.length) paguTotal = sumPaguRekening_(rincian);
    }
    const timestamp = now_();
    const obj = {
      ID: found ? found.object.ID : createId_('ANG'),
      Tahun: year,
      Program: ref.NamaProgram,
      KodeProgram: ref.KodeProgram,
      KodeKegiatan: ref.KodeKegiatan,
      NamaKegiatan: ref.NamaKegiatan,
      SubKegiatan: ref.NamaSubKegiatan,
      KodeSubKegiatan: ref.KodeSubKegiatan,
      Unit: ref.Unit,
      Pagu: paguTotal,
      KodeRekeningInfo: kodeRekeningInfo,
      Keterangan: data.notes !== undefined ? clean_(data.notes) : (found ? found.object.Keterangan : ''),
      CreatedAt: found ? found.object.CreatedAt : timestamp,
      UpdatedAt: timestamp
    };
    writeObject_(sh, obj, found ? found.row : 0);
    appendAudit_(user, found ? 'UBAH' : 'TAMBAH', 'Anggaran', obj.ID, obj.KodeKegiatan + ' - ' + obj.NamaKegiatan);
    invalidateCache_([SHEET_NAMES.BUDGETS]);
    return { success: true, data: obj, message: found ? 'Anggaran berhasil diperbarui.' : 'Anggaran berhasil ditambahkan.' };
  } catch (err) {
    return { success: false, message: err.message };
  } finally {
    lock.releaseLock();
  }
}

function deleteBudget(payload) {
  const lock = LockService.getScriptLock();
  try {
    const user = requireAuth_(payload, ['Admin']); // Bendahara hanya mengelola realisasi, tidak boleh menghapus anggaran
    const id = clean_(payload && payload.id);
    if (!id) return { success: false, message: 'ID anggaran tidak valid.' };
    lock.waitLock(15000);
    const sh = getSheet_(SHEET_NAMES.BUDGETS);
    const found = findRowById_(sh, id);
    if (!found) return { success: false, message: 'Anggaran tidak ditemukan.' };
    const realizationRows = getDataObjects_(SHEET_NAMES.REALIZATIONS).filter(function(item) {
      return item.AnggaranID === id;
    });
    if (realizationRows.length && user.Role !== 'Admin') {
      return { success: false, message: 'Anggaran tidak dapat dihapus karena telah memiliki realisasi.' };
    }
    if (realizationRows.length) {
      const realizationSheet = getSheet_(SHEET_NAMES.REALIZATIONS);
      realizationRows.forEach(function(item) {
        if (item.BuktiFileID) trashFile_(item.BuktiFileID);
      });
      deleteRowsWhere_(realizationSheet, 'AnggaranID', id);
    }
    sh.deleteRow(found.row);
    deleteRowsWhere_(getSheet_(SHEET_NAMES.PAGU_REKENING), 'AnggaranID', id);
    appendAudit_(user, 'HAPUS', 'Anggaran', id, found.object.KodeKegiatan + ' - ' + found.object.NamaKegiatan + (realizationRows.length ? ' (beserta ' + realizationRows.length + ' realisasi terkait)' : ''));
    invalidateCache_([SHEET_NAMES.BUDGETS, SHEET_NAMES.REALIZATIONS, SHEET_NAMES.PAGU_REKENING]);
    return { success: true, message: realizationRows.length ? 'Anggaran beserta seluruh realisasi terkait berhasil dihapus.' : 'Anggaran berhasil dihapus.' };
  } catch (err) {
    return { success: false, message: err.message };
  } finally {
    lock.releaseLock();
  }
}

function savePaguRekening(payload) {
  const lock = LockService.getScriptLock();
  try {
    const user = requireAuth_(payload, ['Admin']);
    const data = payload && payload.data ? payload.data : {};
    const anggaranId = clean_(data.anggaranId);
    const items = Array.isArray(data.items) ? data.items : [];
    if (!anggaranId) return { success: false, message: 'Anggaran tidak valid.' };
    const budget = getDataObjects_(SHEET_NAMES.BUDGETS).find(function(b) {
      return b.ID === anggaranId;
    });
    if (!budget) return { success: false, message: 'Data anggaran tidak ditemukan.' };
    lock.waitLock(15000);
    const sh = getSheet_(SHEET_NAMES.PAGU_REKENING);
    const existing = getDataObjects_(SHEET_NAMES.PAGU_REKENING).filter(function(p) {
      return p.AnggaranID === anggaranId;
    });
    // Pagu Murni dikunci bila Sub Kegiatan ini sudah memiliki Pagu Revisi: nilai Pagu Murni lama dipertahankan.
    const murniLocked = hasPaguRevisi_(existing);
    const existingAwal = {};
    existing.forEach(function(p) { existingAwal[codeKey_(p.KodeRekening)] = toNumber_(p.PaguAwal); });
    if (existing.length) deleteRowsWhere_(sh, 'AnggaranID', anggaranId);
    const timestamp = now_();
    const saved = [];
    items.forEach(function(it) {
      const kodeRekening = clean_(it.kodeRekening);
      if (!kodeRekening) return;
      saved.push({
        ID: createId_('PGR'),
        AnggaranID: anggaranId,
        KodeRekening: kodeRekening,
        PaguAwal: murniLocked ? (existingAwal[codeKey_(kodeRekening)] || 0) : toNumber_(it.paguAwal),
        PaguRevisi: toNumber_(it.paguRevisi),
        CreatedAt: timestamp,
        UpdatedAt: timestamp
      });
    });
    if (saved.length) {
      const pagHeaders = sh.getRange(1, 1, 1, sh.getLastColumn()).getDisplayValues()[0];
      const pagRows = saved.map(function(obj) {
        return pagHeaders.map(function(h) { return Object.prototype.hasOwnProperty.call(obj, h) ? obj[h] : ''; });
      });
      sh.getRange(sh.getLastRow() + 1, 1, pagRows.length, pagHeaders.length).setValues(pagRows);
    }
    const paguTotal = sumPaguRekening_(saved);
    const budgetSheet = getSheet_(SHEET_NAMES.BUDGETS);
    const budgetRow = findRowById_(budgetSheet, anggaranId);
    if (budgetRow) {
      budgetRow.object.Pagu = paguTotal;
      budgetRow.object.UpdatedAt = timestamp;
      writeObject_(budgetSheet, budgetRow.object, budgetRow.row);
    }
    appendAudit_(user, 'UBAH', 'PaguRekening', anggaranId, budget.KodeKegiatan + ' - ' + budget.SubKegiatan + ' (' + saved.length + ' rincian kode rekening, total pagu ' + paguTotal + ')');
    invalidateCache_([SHEET_NAMES.PAGU_REKENING, SHEET_NAMES.BUDGETS]);
    return { success: true, data: { items: saved, total: paguTotal }, message: 'Pagu per kode rekening berhasil disimpan. Pagu anggaran sekarang ' + paguTotal + (hasPaguRevisi_(saved) ? ' (jumlah Pagu Revisi; Pagu Murni tidak dihitung).' : ' (jumlah Pagu Murni).') };
  } catch (err) {
    return { success: false, message: err.message };
  } finally {
    lock.releaseLock();
  }
}

// ===== IMPOR PAGU PER KODE REKENING (dari PDF/Excel yang dibaca di browser) =====
// Impor langsung: Unit, Program, Kegiatan, Sub Kegiatan, Kode Rekening, dan Uraian dibaca dari file.
// Yang belum ada di Referensi / Kode Rekening dibuat otomatis di sini, sehingga tidak perlu diisi dua kali.

// Kunci perbandingan kode rekening: ambil pola kode, abaikan spasi/karakter tak terlihat
function codeKey_(value) {
  const s = String(value === null || value === undefined ? '' : value);
  const m = s.match(/\d(?:\.\d{1,3}){4}\.\d{5}/);
  return m ? m[0] : s.replace(/[\s\u00a0\u200b\ufeff]/g, '');
}

// Menambahkan banyak objek sekaligus ke akhir sheet sesuai urutan header
function appendObjects_(sh, objs) {
  if (!objs.length) return;
  const headers = sh.getRange(1, 1, 1, sh.getLastColumn()).getDisplayValues()[0];
  const rows = objs.map(function(obj) {
    return headers.map(function(h) { return Object.prototype.hasOwnProperty.call(obj, h) ? obj[h] : ''; });
  });
  sh.getRange(sh.getLastRow() + 1, 1, rows.length, headers.length).setValues(rows);
}

function importPaguRekening(payload) {
  const lock = LockService.getScriptLock();
  try {
    const user = requireAuth_(payload, ['Admin']);
    const data = payload && payload.data ? payload.data : {};
    const year = clean_(data.year);
    const field = clean_(data.field);
    const items = Array.isArray(data.items) ? data.items : [];
    if (!/^\d{4}$/.test(year)) return { success: false, message: 'Tahun anggaran tidak valid.' };
    if (['paguAwal', 'paguRevisi', 'keduanya'].indexOf(field) === -1) return { success: false, message: 'Jenis pagu tidak valid.' };
    if (!items.length) return { success: false, message: 'Tidak ada data untuk diimpor.' };
    if (items.length > MAX_IMPORT_ROWS) return { success: false, message: 'Jumlah baris impor melebihi batas ' + MAX_IMPORT_ROWS + ' baris. Pecah file menjadi beberapa bagian.' };
    lock.waitLock(30000);

    const timestamp = now_();
    const refByKey = {};
    getDataObjects_(SHEET_NAMES.REFERENCE).forEach(function(r) {
      refByKey[clean_(r.KodeSubKegiatan) + '||' + clean_(r.Unit).toLowerCase()] = r;
    });
    const accByKey = {};
    getDataObjects_(SHEET_NAMES.ACCOUNT_CODES).forEach(function(a) {
      accByKey[clean_(a.KodeSubKegiatan) + '||' + clean_(a.Unit).toLowerCase() + '||' + codeKey_(a.KodeRekening)] = a;
    });

    // 1) Validasi setiap baris; daftarkan Referensi & Kode Rekening yang belum ada (ditulis setelah semua lolos)
    const rejected = [];
    const groups = {};
    const seen = {};
    const newRefs = [];
    const newAccounts = [];
    items.forEach(function(it, idx) {
      it = it || {};
      const code = codeKey_(it.kodeRekening);
      const label = 'Baris ' + (idx + 1) + ' (' + code + ')';
      const unit = clean_(it.unit);
      const sub = clean_(it.kodeSubKegiatan);
      const amount = toNumber_(it.jumlah);
      const amountAwal = field === 'keduanya' ? toNumber_(it.jumlahAwal) : 0;
      if (!unit) { rejected.push(label + ': Unit kosong.'); return; }
      if (!/^\d\.\d{2}\.\d{2}\.\d\.\d{2}\.\d{4}$/.test(sub)) { rejected.push(label + ': kode Sub Kegiatan tidak valid.'); return; }
      if (!/^\d(\.\d{1,3}){4}\.\d{5}$/.test(code)) { rejected.push(label + ': format kode rekening tidak valid.'); return; }
      if (!isFinite(amount) || amount < 0 || !isFinite(amountAwal) || amountAwal < 0) { rejected.push(label + ': jumlah tidak valid.'); return; }
      const refKey = sub + '||' + unit.toLowerCase();
      let ref = refByKey[refKey];
      if (!ref) {
        const kodeProgram = clean_(it.kodeProgram), namaProgram = clean_(it.namaProgram);
        const kodeKegiatan = clean_(it.kodeKegiatan), namaKegiatan = clean_(it.namaKegiatan);
        const namaSub = clean_(it.namaSubKegiatan);
        if (!kodeProgram || !namaProgram || !kodeKegiatan || !namaKegiatan || !namaSub) { rejected.push(label + ': data Program/Kegiatan/Sub Kegiatan baru tidak lengkap.'); return; }
        ref = {
          ID: createId_('REF'), KodeProgram: kodeProgram, NamaProgram: namaProgram, KodeKegiatan: kodeKegiatan, NamaKegiatan: namaKegiatan,
          KodeSubKegiatan: sub, NamaSubKegiatan: namaSub, Unit: unit, CreatedAt: timestamp, UpdatedAt: timestamp
        };
        refByKey[refKey] = ref;
        newRefs.push(ref);
      }
      const accKey = sub + '||' + unit.toLowerCase() + '||' + code;
      let acct = accByKey[accKey];
      if (!acct) {
        const uraian = clean_(it.uraian);
        if (!uraian) { rejected.push(label + ': uraian kode rekening baru kosong.'); return; }
        acct = {
          ID: createId_('REK'), KodeSubKegiatan: ref.KodeSubKegiatan, SubKegiatan: ref.NamaSubKegiatan, KodeRekening: code,
          Uraian: uraian, CreatedAt: timestamp, UpdatedAt: timestamp, Unit: ref.Unit
        };
        accByKey[accKey] = acct;
        newAccounts.push(acct);
      }
      const key = ref.ID + '||' + code;
      if (seen[key]) { rejected.push(label + ': duplikat pada permintaan yang sama.'); return; }
      seen[key] = true;
      if (!groups[ref.ID]) groups[ref.ID] = { ref: ref, rows: [] };
      groups[ref.ID].rows.push({ code: clean_(acct.KodeRekening), amount: amount, amountAwal: amountAwal });
    });
    const groupIds = Object.keys(groups);
    if (!groupIds.length) return { success: false, message: 'Tidak ada baris yang lolos validasi.', data: { rejected: rejected } };
    // Referensi/Kode Rekening baru yang hanya muncul pada baris yang ditolak tidak ikut ditulis
    const usedRefIds = {};
    groupIds.forEach(function(id) { usedRefIds[id] = true; });
    const refsToWrite = newRefs.filter(function(r) { return usedRefIds[r.ID]; });
    const usedAcc = {};
    groupIds.forEach(function(id) { groups[id].rows.forEach(function(r) { usedAcc[clean_(groups[id].ref.KodeSubKegiatan) + '||' + clean_(groups[id].ref.Unit).toLowerCase() + '||' + codeKey_(r.code)] = true; }); });
    let accountsToWrite = newAccounts.filter(function(a) { return usedAcc[clean_(a.KodeSubKegiatan) + '||' + clean_(a.Unit).toLowerCase() + '||' + codeKey_(a.KodeRekening)]; });

    // 2) Cari / siapkan Anggaran (tahun + Sub Kegiatan + Unit)
    const budgetSh = getSheet_(SHEET_NAMES.BUDGETS);
    const budgetValues = budgetSh.getDataRange().getDisplayValues();
    const bHeaders = budgetValues[0];
    const bIdx = {};
    bHeaders.forEach(function(h, i) { bIdx[h] = i; });
    const budgetByKey = {};
    for (let i = 1; i < budgetValues.length; i++) {
      const row = budgetValues[i];
      if (!row[bIdx.ID]) continue;
      budgetByKey[clean_(row[bIdx.Tahun]) + '||' + clean_(row[bIdx.KodeSubKegiatan]) + '||' + clean_(row[bIdx.Unit]).toLowerCase()] = { id: row[bIdx.ID], sheetRow: i + 1 };
    }
    const existingPagu = {};
    getDataObjects_(SHEET_NAMES.PAGU_REKENING).forEach(function(p) {
      if (!existingPagu[p.AnggaranID]) existingPagu[p.AnggaranID] = {};
      existingPagu[p.AnggaranID][p.KodeRekening] = p;
    });

    // 3) Gabungkan dengan pagu yang sudah ada (kode rekening lain tidak disentuh)
    const paguSh = getSheet_(SHEET_NAMES.PAGU_REKENING);
    const paguHeaders = paguSh.getRange(1, 1, 1, paguSh.getLastColumn()).getDisplayValues()[0];
    const newPaguRows = [];
    const newBudgetRows = [];
    let createdBudgets = 0;
    let updatedBudgets = 0;
    let importedRows = 0;
    const affectedIds = [];
    let lockedGroups = 0;
    groupIds.forEach(function(refId) {
      const g = groups[refId];
      const ref = g.ref;
      const key = year + '||' + clean_(ref.KodeSubKegiatan) + '||' + clean_(ref.Unit).toLowerCase();
      let budget = budgetByKey[key];
      let budgetId;
      // Pagu Murni dikunci bila Sub Kegiatan sudah memiliki Pagu Revisi
      if (budget && field === 'paguAwal' && hasPaguRevisi_(Object.keys(existingPagu[budget.id] || {}).map(function(c) { return existingPagu[budget.id][c]; }))) {
        g.rows.forEach(function(r) { rejected.push('Kode ' + r.code + ' (' + ref.KodeSubKegiatan + ' - ' + ref.Unit + '): Pagu Murni dikunci karena Sub Kegiatan ini sudah memiliki Pagu Revisi.'); });
        lockedGroups++;
        const lockedKeys = {};
        g.rows.forEach(function(r) { lockedKeys[clean_(ref.KodeSubKegiatan) + '||' + clean_(ref.Unit).toLowerCase() + '||' + codeKey_(r.code)] = true; });
        accountsToWrite = accountsToWrite.filter(function(a) { return !lockedKeys[clean_(a.KodeSubKegiatan) + '||' + clean_(a.Unit).toLowerCase() + '||' + codeKey_(a.KodeRekening)]; });
        return;
      }
      if (budget) { budgetId = budget.id; updatedBudgets++; }
      else {
        budgetId = createId_('ANG');
        createdBudgets++;
      }
      const merged = {};
      const prev = existingPagu[budgetId] || {};
      Object.keys(prev).forEach(function(code) {
        const p = prev[code];
        merged[codeKey_(code)] = { id: p.ID, kode: p.KodeRekening, awal: toNumber_(p.PaguAwal), revisi: toNumber_(p.PaguRevisi), createdAt: p.CreatedAt || timestamp };
      });
      // Mode 'keduanya': Pagu Murni yang sudah tersimpan dipertahankan bila Sub Kegiatan sudah punya Pagu Revisi
      const prevHasRevisi = hasPaguRevisi_(Object.keys(prev).map(function(c) { return prev[c]; }));
      g.rows.forEach(function(r) {
        const mk = codeKey_(r.code);
        if (!merged[mk]) merged[mk] = { id: createId_('PGR'), kode: r.code, awal: 0, revisi: 0, createdAt: timestamp };
        else merged[mk].kode = r.code;
        if (field === 'keduanya') {
          merged[mk].revisi = r.amount;
          if (!prevHasRevisi) merged[mk].awal = r.amountAwal;
        } else if (field === 'paguRevisi') merged[mk].revisi = r.amount; else merged[mk].awal = r.amount;
        importedRows++;
      });
      const mergedList = Object.keys(merged).map(function(code) {
        const m = merged[code];
        return { ID: m.id, AnggaranID: budgetId, KodeRekening: m.kode, PaguAwal: m.awal, PaguRevisi: m.revisi, CreatedAt: m.createdAt, UpdatedAt: timestamp };
      });
      const total = sumPaguRekening_(mergedList);
      mergedList.forEach(function(obj) {
        newPaguRows.push(paguHeaders.map(function(h) { return Object.prototype.hasOwnProperty.call(obj, h) ? obj[h] : ''; }));
      });
      if (budget) {
        budgetSh.getRange(budget.sheetRow, bIdx.Pagu + 1).setValue(total);
        if (bIdx.UpdatedAt !== undefined) budgetSh.getRange(budget.sheetRow, bIdx.UpdatedAt + 1).setValue(timestamp);
        affectedIds.push(budgetId);
      } else {
        newBudgetRows.push({
          ID: budgetId, Tahun: year, Program: ref.NamaProgram, KodeProgram: ref.KodeProgram,
          KodeKegiatan: ref.KodeKegiatan, NamaKegiatan: ref.NamaKegiatan, SubKegiatan: ref.NamaSubKegiatan,
          KodeSubKegiatan: ref.KodeSubKegiatan, Unit: ref.Unit, Pagu: total, KodeRekeningInfo: '',
          Keterangan: 'Dibuat otomatis melalui impor data', CreatedAt: timestamp, UpdatedAt: timestamp
        });
        affectedIds.push(budgetId);
      }
    });

    if (lockedGroups === groupIds.length) return { success: false, message: 'Semua Sub Kegiatan pada file ini sudah memiliki Pagu Revisi, sehingga Pagu Murni dikunci dan tidak dapat diimpor.', data: { rejected: rejected } };

    // 4) Tulis: Referensi & Kode Rekening baru, lalu rincian pagu (hapus rincian lama milik anggaran terdampak, tulis gabungan sekaligus)
    appendObjects_(getSheet_(SHEET_NAMES.REFERENCE), refsToWrite);
    appendObjects_(getSheet_(SHEET_NAMES.ACCOUNT_CODES), accountsToWrite);
    affectedIds.forEach(function(id) {
      if (existingPagu[id]) deleteRowsWhere_(paguSh, 'AnggaranID', id);
    });
    if (newPaguRows.length) paguSh.getRange(paguSh.getLastRow() + 1, 1, newPaguRows.length, paguHeaders.length).setValues(newPaguRows);
    newBudgetRows.forEach(function(obj) { writeObject_(budgetSh, obj, 0); });

    const auto = (refsToWrite.length ? refsToWrite.length + ' Sub Kegiatan baru, ' : '') + (accountsToWrite.length ? accountsToWrite.length + ' kode rekening baru, ' : '');
    appendAudit_(user, 'IMPOR', 'PaguRekening', year, importedRows + ' kode rekening pada ' + (groupIds.length - lockedGroups) + ' Sub Kegiatan diimpor sebagai ' + (field === 'keduanya' ? 'Pagu Murni dan Pagu Revisi' : (field === 'paguRevisi' ? 'Pagu Revisi' : 'Pagu Murni')) + ' (' + auto + createdBudgets + ' anggaran baru, ' + updatedBudgets + ' diperbarui, ' + rejected.length + ' ditolak)');
    invalidateCache_([SHEET_NAMES.REFERENCE, SHEET_NAMES.ACCOUNT_CODES, SHEET_NAMES.BUDGETS, SHEET_NAMES.PAGU_REKENING]);
    return {
      success: true,
      data: { imported: importedRows, subKegiatan: groupIds.length - lockedGroups, createdBudgets: createdBudgets, updatedBudgets: updatedBudgets, createdReferences: refsToWrite.length, createdAccounts: accountsToWrite.length, rejected: rejected },
      message: importedRows + ' kode rekening pada ' + (groupIds.length - lockedGroups) + ' Sub Kegiatan berhasil diimpor (' + auto + createdBudgets + ' anggaran baru, ' + updatedBudgets + ' diperbarui).'
    };
  } catch (err) {
    return { success: false, message: err.message };
  } finally {
    lock.releaseLock();
  }
}

function accountMatches_(item, kodeSub, unit) {
  return item.KodeSubKegiatan === kodeSub && clean_(item.Unit) === clean_(unit);
}

// Kode rekening kini dicatat per Unit. Baris lama (tanpa Unit) diberikan ke referensi tertua yang memakai
// Kode Sub Kegiatan tersebut; Unit lain yang sudah memakainya (realisasi/pagu rincian) mendapat salinan.
function ensureAccountUnits_() {
  try {
    const quick = getDataObjects_(SHEET_NAMES.ACCOUNT_CODES);
    if (quick.length && !quick.some(function(a) { return !clean_(a.Unit); })) return;
  } catch (ignored) {}
  const lock = LockService.getScriptLock();
  let locked = false;
  try {
    locked = lock.tryLock(5000);
    if (!locked) return;
    const sh = getSheet_(SHEET_NAMES.ACCOUNT_CODES);
    let headers = sh.getRange(1, 1, 1, Math.max(sh.getLastColumn(), 1)).getDisplayValues()[0];
    if (headers.indexOf('Unit') === -1) {
      sh.getRange(1, headers.length + 1).setValue('Unit').setBackground('#0B3B75').setFontColor('#FFFFFF').setFontWeight('bold').setVerticalAlignment('middle');
      headers = sh.getRange(1, 1, 1, sh.getLastColumn()).getDisplayValues()[0];
    }
    const values = sh.getDataRange().getDisplayValues();
    if (values.length < 2) return;
    const idxUnit = headers.indexOf('Unit');
    const idxSub = headers.indexOf('KodeSubKegiatan');
    const idxCode = headers.indexOf('KodeRekening');
    const legacy = [];
    for (let i = 1; i < values.length; i++) {
      const row = values[i];
      if (!row.some(function(v) { return v !== ''; })) continue;
      if (!clean_(row[idxUnit])) legacy.push(i);
    }
    if (!legacy.length) return;
    const refs = getDataObjects_(SHEET_NAMES.REFERENCE);
    const budgetById = {};
    getDataObjects_(SHEET_NAMES.BUDGETS).forEach(function(b) { budgetById[b.ID] = b; });
    const usedUnits = {};
    const markUsed = function(anggaranId, kodeRekening) {
      const b = budgetById[anggaranId];
      if (!b || !kodeRekening) return;
      const key = b.KodeSubKegiatan + '||' + kodeRekening;
      if (!usedUnits[key]) usedUnits[key] = {};
      usedUnits[key][clean_(b.Unit)] = true;
    };
    getDataObjects_(SHEET_NAMES.REALIZATIONS).forEach(function(r) { markUsed(r.AnggaranID, r.KodeRekening); });
    getDataObjects_(SHEET_NAMES.PAGU_REKENING).forEach(function(p) {
      if (toNumber_(p.PaguAwal) || toNumber_(p.PaguRevisi)) markUsed(p.AnggaranID, p.KodeRekening);
    });
    const unitColumn = values.slice(1).map(function(row) { return [row[idxUnit]]; });
    const budgetUnitsBySub = {};
    Object.keys(budgetById).forEach(function(id) {
      const b = budgetById[id];
      if (!budgetUnitsBySub[b.KodeSubKegiatan]) budgetUnitsBySub[b.KodeSubKegiatan] = {};
      budgetUnitsBySub[b.KodeSubKegiatan][clean_(b.Unit)] = true;
    });
    const timestamp = now_();
    const copies = [];
    legacy.forEach(function(i) {
      const row = values[i];
      const sub = row[idxSub];
      const candidates = refs.filter(function(r) { return r.KodeSubKegiatan === sub; }).sort(function(a, b) {
        return String(a.CreatedAt).localeCompare(String(b.CreatedAt)) || String(a.ID).localeCompare(String(b.ID));
      });
      if (!candidates.length) return;
      const primary = clean_(candidates[0].Unit);
      unitColumn[i - 1][0] = primary;
      const used = Object.assign({}, usedUnits[sub + '||' + row[idxCode]] || {}, budgetUnitsBySub[sub] || {});
      Object.keys(used).forEach(function(unit) {
        if (unit === primary) return;
        if (!candidates.some(function(c) { return clean_(c.Unit) === unit; })) return;
        const copy = headers.map(function(h, c) {
          if (h === 'ID') return createId_('REK');
          if (h === 'Unit') return unit;
          if (h === 'CreatedAt' || h === 'UpdatedAt') return timestamp;
          return row[c];
        });
        copies.push(copy);
      });
    });
    sh.getRange(2, idxUnit + 1, unitColumn.length, 1).setValues(unitColumn);
    if (copies.length) sh.getRange(sh.getLastRow() + 1, 1, copies.length, headers.length).setValues(copies);
    invalidateCache_();
  } catch (err) {
    Logger.log('ensureAccountUnits_: ' + err.message);
  } finally {
    if (locked) lock.releaseLock();
  }
}

// Pemulihan satu kali: Unit yang sudah punya anggaran untuk suatu Sub Kegiatan tetapi belum punya kode rekening
// sendiri mendapat salinan kode rekening Sub Kegiatan tersebut. Tidak ada data yang dihapus.
function restoreAccountCodesForBudgets_() {
  const props = PropertiesService.getScriptProperties();
  if (props.getProperty('ACCOUNT_RESTORE_V1')) return;
  const lock = LockService.getScriptLock();
  let locked = false;
  try {
    locked = lock.tryLock(5000);
    if (!locked) return;
    const sh = getSheet_(SHEET_NAMES.ACCOUNT_CODES);
    const headers = sh.getRange(1, 1, 1, Math.max(sh.getLastColumn(), 1)).getDisplayValues()[0];
    if (headers.indexOf('Unit') === -1) return;
    const accounts = getDataObjects_(SHEET_NAMES.ACCOUNT_CODES);
    const budgets = getDataObjects_(SHEET_NAMES.BUDGETS);
    const have = {};
    const bySub = {};
    accounts.forEach(function(a) {
      const key = a.KodeSubKegiatan + '||' + clean_(a.Unit);
      if (clean_(a.Unit)) {
        if (!have[key]) have[key] = 0;
        have[key]++;
      }
      if (!bySub[a.KodeSubKegiatan]) bySub[a.KodeSubKegiatan] = {};
      if (!bySub[a.KodeSubKegiatan][a.KodeRekening]) bySub[a.KodeSubKegiatan][a.KodeRekening] = a;
    });
    const timestamp = now_();
    const copies = [];
    const seen = {};
    budgets.forEach(function(b) {
      const key = b.KodeSubKegiatan + '||' + clean_(b.Unit);
      if (seen[key]) return;
      seen[key] = true;
      if (have[key]) return;
      const source = bySub[b.KodeSubKegiatan];
      if (!source) return;
      Object.keys(source).forEach(function(code) {
        const src = source[code];
        copies.push(headers.map(function(h) {
          if (h === 'ID') return createId_('REK');
          if (h === 'Unit') return clean_(b.Unit);
          if (h === 'CreatedAt' || h === 'UpdatedAt') return timestamp;
          return src[h] === undefined ? '' : src[h];
        }));
      });
    });
    if (copies.length) sh.getRange(sh.getLastRow() + 1, 1, copies.length, headers.length).setValues(copies);
    props.setProperty('ACCOUNT_RESTORE_V1', '1');
    invalidateCache_();
  } catch (err) {
    Logger.log('restoreAccountCodesForBudgets_: ' + err.message);
  } finally {
    if (locked) lock.releaseLock();
  }
}

function hasPaguRevisi_(rows) {
  // Sub Kegiatan dianggap sudah direvisi bila ada minimal satu kode rekening dengan Pagu Revisi > 0.
  return (rows || []).some(function(p) { return toNumber_(p.PaguRevisi) > 0; });
}

function sumPaguRekening_(rows) {
  // Bila sudah ada Pagu Revisi, yang dihitung HANYA Pagu Revisi (Pagu Murni dikunci & tidak ikut dijumlahkan).
  // Bila belum ada Pagu Revisi sama sekali, yang dihitung adalah Pagu Murni.
  const useRevisi = hasPaguRevisi_(rows);
  return (rows || []).reduce(function(sum, p) {
    return sum + toNumber_(useRevisi ? p.PaguRevisi : p.PaguAwal);
  }, 0);
}

function saveRealization(payload) {
  const lock = LockService.getScriptLock();
  let newFileId = '';
  try {
    const user = requireAuth_(payload, ['Admin', 'Bendahara']);
    const data = payload && payload.data ? payload.data : {};
    const budgetId = clean_(data.budgetId);
    const date = clean_(data.date);
    const documentNo = clean_(data.documentNo);
    const description = clean_(data.description);
    const accountCode = clean_(data.accountCode);
    const amount = toNumber_(data.amount);
    if (!budgetId || !isIsoDate_(date) || !accountCode || amount <= 0) return { success: false, message: 'Data realisasi tidak valid. Pastikan kode rekening dipilih dan nilai lebih dari nol.' };
    const jenis = clean_(data.jenis).toUpperCase().replace(/[\s-]+/g, '_');
    if (JENIS_PEMBAYARAN.indexOf(jenis) === -1) return { success: false, message: 'Jenis pembayaran (GU, LS, GU KKPD atau TUP) wajib dipilih.' };
    lock.waitLock(15000);
    const budget = getDataObjects_(SHEET_NAMES.BUDGETS).find(function(item) {
      return item.ID === budgetId;
    });
    if (!budget) return { success: false, message: 'Anggaran tujuan tidak ditemukan.' };
    const validAccountCode = getDataObjects_(SHEET_NAMES.ACCOUNT_CODES).some(function(item) {
      return item.KodeRekening === accountCode && accountMatches_(item, budget.KodeSubKegiatan, budget.Unit);
    });
    if (!validAccountCode) return { success: false, message: 'Kode rekening yang dipilih tidak terdaftar untuk Sub Kegiatan pada anggaran ini. Pastikan tidak salah pilih agar realisasi tidak lari dari sub kegiatan/unit yang benar.' };
    const sh = getSheet_(SHEET_NAMES.REALIZATIONS);
    const found = data.id ? findRowById_(sh, data.id) : null;
    if (data.id && !found) return { success: false, message: 'Realisasi tidak ditemukan.' };
    if (found && user.Role === 'Bendahara' && found.object.StatusVerifikasi === 'TERVERIFIKASI') return { success: false, message: 'Realisasi yang sudah terverifikasi tidak dapat diubah oleh Bendahara.' };
    const all = getDataObjects_(SHEET_NAMES.REALIZATIONS);
    const currentTotal = all.filter(function(item) {
      return item.AnggaranID === budgetId && item.ID !== clean_(data.id);
    }).reduce(function(sum, item) {
      return sum + toNumber_(item.Nilai);
    }, 0);
    const projected = currentTotal + amount;
    const ceiling = toNumber_(budget.Pagu);
    if (projected > ceiling && !data.confirmOverBudget) return { success: false, requiresConfirmation: true, data: { projected: projected, ceiling: ceiling, excess: projected - ceiling }, message: 'Realisasi ini akan melebihi pagu anggaran.' };
    let file = found ? { id: found.object.BuktiFileID, name: found.object.BuktiFileName, url: found.object.BuktiFileURL } : { id: '', name: '', url: '' };
    if (data.file) {
      file = saveFile_(data.file, FOLDER_NAMES.EVIDENCE, ['application/pdf', 'image/jpeg', 'image/png', 'image/webp']);
      newFileId = file.id;
    }
    const timestamp = now_();
    const obj = {
      ID: found ? found.object.ID : createId_('REA'),
      AnggaranID: budgetId,
      Tanggal: date,
      NoDokumen: documentNo,
      Uraian: description,
      KodeRekening: accountCode,
      Nilai: amount,
      BuktiFileID: file.id,
      BuktiFileName: file.name,
      BuktiFileURL: file.url,
      StatusVerifikasi: 'BELUM_DIVERIFIKASI',
      CatatanVerifikasi: '',
      VerifikatorID: '',
      NamaVerifikator: '',
      TanggalVerifikasi: '',
      DibuatOlehID: found ? found.object.DibuatOlehID : user.ID,
      NamaPembuat: found ? found.object.NamaPembuat : user.Nama,
      CreatedAt: found ? found.object.CreatedAt : timestamp,
      UpdatedAt: timestamp,
      JenisBelanja: jenis
    };
    ensureSheetColumn_(sh, 'JenisBelanja');
    writeObject_(sh, obj, found ? found.row : 0);
    if (found && data.file && found.object.BuktiFileID && found.object.BuktiFileID !== file.id) trashFile_(found.object.BuktiFileID);
    appendAudit_(user, found ? 'UBAH' : 'TAMBAH', 'Realisasi', obj.ID, (obj.NoDokumen || '-') + ' senilai ' + amount);
    invalidateCache_([SHEET_NAMES.REALIZATIONS]);
    return { success: true, data: { item: obj, overBudget: projected > ceiling, excess: Math.max(0, projected - ceiling) }, message: found ? 'Realisasi berhasil diperbarui dan menunggu verifikasi ulang.' : 'Realisasi berhasil dicatat dan menunggu verifikasi.' };
  } catch (err) {
    if (newFileId) trashFile_(newFileId);
    return { success: false, message: err.message };
  } finally {
    lock.releaseLock();
  }
}

function deleteRealization(payload) {
  const lock = LockService.getScriptLock();
  try {
    const user = requireAuth_(payload, ['Admin', 'Bendahara']);
    const id = clean_(payload && payload.id);
    if (!id) return { success: false, message: 'ID realisasi tidak valid.' };
    lock.waitLock(15000);
    const sh = getSheet_(SHEET_NAMES.REALIZATIONS);
    const found = findRowById_(sh, id);
    if (!found) return { success: false, message: 'Realisasi tidak ditemukan.' };
    if (user.Role === 'Bendahara' && found.object.StatusVerifikasi === 'TERVERIFIKASI') return { success: false, message: 'Realisasi terverifikasi hanya dapat dihapus oleh Admin.' };
    sh.deleteRow(found.row);
    if (found.object.BuktiFileID) trashFile_(found.object.BuktiFileID);
    appendAudit_(user, 'HAPUS', 'Realisasi', id, found.object.NoDokumen);
    invalidateCache_([SHEET_NAMES.REALIZATIONS]);
    return { success: true, message: 'Realisasi berhasil dihapus.' };
  } catch (err) {
    return { success: false, message: err.message };
  } finally {
    lock.releaseLock();
  }
}

function verifyRealization(payload) {
  const lock = LockService.getScriptLock();
  try {
    const user = requireAuth_(payload, ['Admin', 'Verifikasi']);
    const id = clean_(payload && payload.id);
    const status = clean_(payload && payload.status);
    const note = clean_(payload && payload.note);
    const officer = clean_(payload && payload.officer).substring(0, 100) || user.Nama;
    if (!id || ['TERVERIFIKASI', 'PERLU_PERBAIKAN'].indexOf(status) === -1) return { success: false, message: 'Status verifikasi tidak valid.' };
    if (status === 'PERLU_PERBAIKAN' && !note) return { success: false, message: 'Catatan wajib diisi apabila dokumen memerlukan perbaikan.' };
    lock.waitLock(15000);
    const sh = getSheet_(SHEET_NAMES.REALIZATIONS);
    const found = findRowById_(sh, id);
    if (!found) return { success: false, message: 'Realisasi tidak ditemukan.' };
    const obj = found.object;
    obj.StatusVerifikasi = status;
    obj.CatatanVerifikasi = note;
    obj.VerifikatorID = user.ID;
    obj.NamaVerifikator = officer; // nama Petugas Verifikasi (VerifikatorID tetap akun yang login)
    obj.TanggalVerifikasi = now_();
    obj.UpdatedAt = now_();
    writeObject_(sh, obj, found.row);
    appendAudit_(user, 'VERIFIKASI', 'Realisasi', id, status + (officer !== user.Nama ? ' [petugas: ' + officer + ']' : '') + (note ? ' - ' + note : ''));
    invalidateCache_([SHEET_NAMES.REALIZATIONS]);
    return { success: true, data: obj, message: status === 'TERVERIFIKASI' ? 'Realisasi berhasil diverifikasi oleh ' + officer + '.' : 'Realisasi dikembalikan untuk diperbaiki.' };
  } catch (err) {
    return { success: false, message: err.message };
  } finally {
    lock.releaseLock();
  }
}



function saveUser(payload) {
  const lock = LockService.getScriptLock();
  try {
    const admin = requireAuth_(payload, ['Admin']);
    const data = payload && payload.data ? payload.data : {};
    const name = clean_(data.name);
    const username = clean_(data.username).toLowerCase();
    const role = clean_(data.role);
    const status = clean_(data.status) || 'Aktif';
    const password = String(data.password || '');
    if (!name || !/^[a-z0-9._-]{3,30}$/.test(username) || ALLOWED_ROLES.indexOf(role) === -1 || ['Aktif', 'Nonaktif'].indexOf(status) === -1) return { success: false, message: 'Data pengguna tidak valid.' };
    if (!data.id && password.length < 8) return { success: false, message: 'Kata sandi pengguna baru minimal 8 karakter.' };
    if (password && password.length < 8) return { success: false, message: 'Kata sandi minimal 8 karakter.' };
    lock.waitLock(15000);
    const sh = getSheet_(SHEET_NAMES.USERS);
    const found = data.id ? findRowById_(sh, data.id) : null;
    if (data.id && !found) return { success: false, message: 'Pengguna tidak ditemukan.' };
    const duplicate = getDataObjects_(SHEET_NAMES.USERS).find(function(item) {
      return item.Username.toLowerCase() === username && item.ID !== clean_(data.id);
    });
    if (duplicate) return { success: false, message: 'Username sudah digunakan.' };
    if (found && found.object.ID === admin.ID && status !== 'Aktif') return { success: false, message: 'Anda tidak dapat menonaktifkan akun sendiri.' };
    const timestamp = now_();
    const obj = {
      ID: found ? found.object.ID : createId_('USR'),
      Nama: name,
      Username: username,
      PasswordHash: password ? hashPassword_(password) : found.object.PasswordHash,
      Role: role,
      Status: status,
      WajibGantiPassword: password ? 'YA' : found.object.WajibGantiPassword,
      CreatedAt: found ? found.object.CreatedAt : timestamp,
      UpdatedAt: timestamp
    };
    writeObject_(sh, obj, found ? found.row : 0);
    appendAudit_(admin, found ? 'UBAH' : 'TAMBAH', 'Pengguna', obj.ID, obj.Nama + ' - ' + obj.Role);
    invalidateCache_();
    return { success: true, data: toClientUser_(obj), message: found ? 'Pengguna berhasil diperbarui.' : 'Pengguna berhasil ditambahkan.' };
  } catch (err) {
    return { success: false, message: err.message };
  } finally {
    lock.releaseLock();
  }
}

function deleteUser(payload) {
  const lock = LockService.getScriptLock();
  try {
    const admin = requireAuth_(payload, ['Admin']);
    const id = clean_(payload && payload.id);
    if (!id) return { success: false, message: 'ID pengguna tidak valid.' };
    if (id === admin.ID) return { success: false, message: 'Anda tidak dapat menghapus akun sendiri.' };
    lock.waitLock(15000);
    const sh = getSheet_(SHEET_NAMES.USERS);
    const found = findRowById_(sh, id);
    if (!found) return { success: false, message: 'Pengguna tidak ditemukan.' };
    sh.deleteRow(found.row);
    appendAudit_(admin, 'HAPUS', 'Pengguna', id, found.object.Nama);
    invalidateCache_();
    return { success: true, message: 'Pengguna berhasil dihapus.' };
  } catch (err) {
    return { success: false, message: err.message };
  } finally {
    lock.releaseLock();
  }
}

function saveAccountCode(payload) {
  const lock = LockService.getScriptLock();
  try {
    const admin = requireAuth_(payload, ['Admin']);
    const data = payload && payload.data ? payload.data : {};
    const refId = clean_(data.refId);
    const accountCode = clean_(data.accountCode);
    const description = clean_(data.description);
    if (!refId || !accountCode || !description) return { success: false, message: 'Sub Kegiatan, Kode Rekening, dan Uraian wajib diisi.' };
    const ref = getDataObjects_(SHEET_NAMES.REFERENCE).find(function(item) {
      return item.ID === refId;
    });
    if (!ref) return { success: false, message: 'Sub Kegiatan yang dipilih tidak ditemukan pada Referensi. Pilih ulang dari daftar.' };
    lock.waitLock(15000);
    const sh = getSheet_(SHEET_NAMES.ACCOUNT_CODES);
    const found = data.id ? findRowById_(sh, data.id) : null;
    if (data.id && !found) return { success: false, message: 'Kode rekening tidak ditemukan.' };
    const duplicate = getDataObjects_(SHEET_NAMES.ACCOUNT_CODES).find(function(item) {
      return item.KodeRekening === accountCode && accountMatches_(item, ref.KodeSubKegiatan, ref.Unit) && item.ID !== clean_(data.id);
    });
    if (duplicate) return { success: false, message: 'Kode rekening tersebut sudah terdaftar untuk Sub Kegiatan pada Unit ini.' };
    const timestamp = now_();
    const obj = {
      ID: found ? found.object.ID : createId_('REK'),
      KodeSubKegiatan: ref.KodeSubKegiatan,
      SubKegiatan: ref.NamaSubKegiatan,
      KodeRekening: accountCode,
      Uraian: description,
      CreatedAt: found ? found.object.CreatedAt : timestamp,
      UpdatedAt: timestamp,
      Unit: ref.Unit
    };
    writeObject_(sh, obj, found ? found.row : 0);
    appendAudit_(admin, found ? 'UBAH' : 'TAMBAH', 'KodeRekening', obj.ID, obj.KodeRekening + ' - ' + obj.SubKegiatan);
    invalidateCache_([SHEET_NAMES.ACCOUNT_CODES]);
    return { success: true, data: obj, message: found ? 'Kode rekening berhasil diperbarui.' : 'Kode rekening berhasil ditambahkan.' };
  } catch (err) {
    return { success: false, message: err.message };
  } finally {
    lock.releaseLock();
  }
}

function saveReferensi(payload) {
  const lock = LockService.getScriptLock();
  try {
    const admin = requireAuth_(payload, ['Admin']);
    const data = payload && payload.data ? payload.data : {};
    const kodeProgram = clean_(data.kodeProgram);
    const namaProgram = clean_(data.namaProgram);
    const kodeKegiatan = clean_(data.kodeKegiatan);
    const namaKegiatan = clean_(data.namaKegiatan);
    const kodeSubKegiatan = clean_(data.kodeSubKegiatan);
    const namaSubKegiatan = clean_(data.namaSubKegiatan);
    const unit = clean_(data.unit);
    if (!kodeProgram || !namaProgram || !kodeKegiatan || !namaKegiatan || !kodeSubKegiatan || !namaSubKegiatan || !unit) return { success: false, message: 'Semua field Program, Kegiatan, Sub Kegiatan, dan Unit wajib diisi.' };
    lock.waitLock(15000);
    const sh = getSheet_(SHEET_NAMES.REFERENCE);
    const found = data.id ? findRowById_(sh, data.id) : null;
    if (data.id && !found) return { success: false, message: 'Data referensi tidak ditemukan.' };
    const duplicate = getDataObjects_(SHEET_NAMES.REFERENCE).find(function(item) {
      return item.KodeSubKegiatan.toLowerCase() === kodeSubKegiatan.toLowerCase() && item.Unit.toLowerCase() === unit.toLowerCase() && item.ID !== clean_(data.id);
    });
    if (duplicate) return { success: false, message: 'Kode Sub Kegiatan tersebut sudah terdaftar pada Unit ini.' };
    const timestamp = now_();
    const obj = {
      ID: found ? found.object.ID : createId_('REF'),
      KodeProgram: kodeProgram,
      NamaProgram: namaProgram,
      KodeKegiatan: kodeKegiatan,
      NamaKegiatan: namaKegiatan,
      KodeSubKegiatan: kodeSubKegiatan,
      NamaSubKegiatan: namaSubKegiatan,
      Unit: unit,
      CreatedAt: found ? found.object.CreatedAt : timestamp,
      UpdatedAt: timestamp
    };
    writeObject_(sh, obj, found ? found.row : 0);
    appendAudit_(admin, found ? 'UBAH' : 'TAMBAH', 'ReferensiKegiatan', obj.ID, obj.KodeSubKegiatan + ' - ' + obj.NamaSubKegiatan);
    invalidateCache_([SHEET_NAMES.REFERENCE]);
    return { success: true, data: obj, message: found ? 'Referensi berhasil diperbarui.' : 'Referensi berhasil ditambahkan.' };
  } catch (err) {
    return { success: false, message: err.message };
  } finally {
    lock.releaseLock();
  }
}

function deleteReferensi(payload) {
  const lock = LockService.getScriptLock();
  try {
    const admin = requireAuth_(payload, ['Admin']);
    const id = clean_(payload && payload.id);
    if (!id) return { success: false, message: 'ID referensi tidak valid.' };
    lock.waitLock(15000);
    const sh = getSheet_(SHEET_NAMES.REFERENCE);
    const found = findRowById_(sh, id);
    if (!found) return { success: false, message: 'Data referensi tidak ditemukan.' };
    const inUseBudget = getDataObjects_(SHEET_NAMES.BUDGETS).some(function(item) {
      return item.KodeSubKegiatan === found.object.KodeSubKegiatan && item.Unit === found.object.Unit;
    });
    const inUseAccount = getDataObjects_(SHEET_NAMES.ACCOUNT_CODES).some(function(item) {
      return accountMatches_(item, found.object.KodeSubKegiatan, found.object.Unit);
    });
    if (inUseBudget || inUseAccount) return { success: false, message: 'Referensi tidak dapat dihapus karena masih dipakai pada data Anggaran atau Kode Rekening.' };
    sh.deleteRow(found.row);
    appendAudit_(admin, 'HAPUS', 'ReferensiKegiatan', id, found.object.KodeSubKegiatan + ' - ' + found.object.NamaSubKegiatan);
    invalidateCache_([SHEET_NAMES.REFERENCE]);
    return { success: true, message: 'Referensi berhasil dihapus.' };
  } catch (err) {
    return { success: false, message: err.message };
  } finally {
    lock.releaseLock();
  }
}

function deleteAccountCode(payload) {
  const lock = LockService.getScriptLock();
  try {
    const admin = requireAuth_(payload, ['Admin']);
    const id = clean_(payload && payload.id);
    if (!id) return { success: false, message: 'ID kode rekening tidak valid.' };
    lock.waitLock(15000);
    const sh = getSheet_(SHEET_NAMES.ACCOUNT_CODES);
    const found = findRowById_(sh, id);
    if (!found) return { success: false, message: 'Kode rekening tidak ditemukan.' };
    const budgetById = {};
    getDataObjects_(SHEET_NAMES.BUDGETS).forEach(function(b) { budgetById[b.ID] = b; });
    const inUse = getDataObjects_(SHEET_NAMES.REALIZATIONS).some(function(item) {
      const b = budgetById[item.AnggaranID];
      return item.KodeRekening === found.object.KodeRekening && b && b.KodeSubKegiatan === found.object.KodeSubKegiatan && clean_(b.Unit) === clean_(found.object.Unit);
    });
    if (inUse) return { success: false, message: 'Kode rekening tidak dapat dihapus karena sudah dipakai pada data realisasi.' };
    sh.deleteRow(found.row);
    appendAudit_(admin, 'HAPUS', 'KodeRekening', id, found.object.KodeRekening);
    invalidateCache_([SHEET_NAMES.ACCOUNT_CODES]);
    return { success: true, message: 'Kode rekening berhasil dihapus.' };
  } catch (err) {
    return { success: false, message: err.message };
  } finally {
    lock.releaseLock();
  }
}

function changePassword(payload) {
  const lock = LockService.getScriptLock();
  try {
    const user = requireAuth_(payload);
    const currentPassword = String(payload && payload.currentPassword || '');
    const newPassword = String(payload && payload.newPassword || '');
    if (!currentPassword || newPassword.length < 8) return { success: false, message: 'Kata sandi baru minimal 8 karakter.' };
    lock.waitLock(15000);
    const sh = getSheet_(SHEET_NAMES.USERS);
    const found = findRowById_(sh, user.ID);
    if (!found) return { success: false, message: 'Pengguna tidak ditemukan.' };
    if (found.object.PasswordHash !== hashPassword_(currentPassword)) return { success: false, message: 'Kata sandi saat ini tidak sesuai.' };
    if (hashPassword_(newPassword) === found.object.PasswordHash) return { success: false, message: 'Kata sandi baru harus berbeda dari kata sandi saat ini.' };
    found.object.PasswordHash = hashPassword_(newPassword);
    found.object.WajibGantiPassword = 'TIDAK';
    found.object.UpdatedAt = now_();
    writeObject_(sh, found.object, found.row);
    appendAudit_(user, 'UBAH_PASSWORD', 'Pengguna', user.ID, 'Kata sandi diperbarui');
    invalidateCache_();
    return { success: true, message: 'Kata sandi berhasil diperbarui.' };
  } catch (err) {
    return { success: false, message: err.message };
  } finally {
    lock.releaseLock();
  }
}

function uploadLogo(payload) {
  const lock = LockService.getScriptLock();
  let newFileId = '';
  try {
    const user = requireAuth_(payload, ['Admin']);
    if (!payload.file) return { success: false, message: 'Pilih file logo terlebih dahulu.' };
    lock.waitLock(15000);
    const file = saveFile_(payload.file, FOLDER_NAMES.LOGO, ['image/jpeg', 'image/png', 'image/webp']);
    newFileId = file.id;
    const settings = getSettings_();
    const oldFileId = settings.LogoFileID || '';
    setSetting_('LogoFileID', file.id);
    setSetting_('LogoFileName', file.name);
    setSetting_('LogoFileURL', file.url);
    if (oldFileId && oldFileId !== file.id) trashFile_(oldFileId);
    appendAudit_(user, 'UNGGAH_LOGO', 'Pengaturan', file.id, file.name);
    invalidateCache_();
    return { success: true, data: file, message: 'Logo berhasil disimpan.' };
  } catch (err) {
    if (newFileId) trashFile_(newFileId);
    return { success: false, message: err.message };
  } finally {
    lock.releaseLock();
  }
}

function downloadStoredFile(payload) {
  try {
    requireAuth_(payload);
    const fileId = clean_(payload && payload.fileId);
    if (!fileId || !isAllowedFile_(fileId)) return { success: false, message: 'File tidak ditemukan atau tidak diizinkan.' };
    const file = DriveApp.getFileById(fileId);
    if (file.getSize() > MAX_UPLOAD_BYTES) return { success: false, message: 'Ukuran file melampaui batas unduhan aplikasi.' };
    const blob = file.getBlob();
    return { success: true, data: { name: file.getName(), mimeType: blob.getContentType(), base64: Utilities.base64Encode(blob.getBytes()) }, message: 'File berhasil disiapkan.' };
  } catch (err) {
    return { success: false, message: err.message };
  }
}

function getPublicLogo() {
  try {
    const settings = getSettings_();
    const fileId = clean_(settings.LogoFileID);
    if (!fileId) return { success: false, message: 'Logo belum diatur.' };
    const file = DriveApp.getFileById(fileId);
    const blob = file.getBlob();
    return { success: true, data: { id: fileId, name: file.getName(), mimeType: blob.getContentType(), base64: Utilities.base64Encode(blob.getBytes()) }, message: 'Logo berhasil dimuat.' };
  } catch (err) {
    return { success: false, message: err.message };
  }
}

let SPREADSHEET_MEMO_ = null;
function getSpreadsheet_() {
  if (SPREADSHEET_MEMO_) return SPREADSHEET_MEMO_;
  if (!SPREADSHEET_ID || SPREADSHEET_ID === 'ID_SPREADSHEET_DI_SINI') throw new Error('Isi SPREADSHEET_ID pada blok konfigurasi Kode.gs terlebih dahulu.');
  SPREADSHEET_MEMO_ = SpreadsheetApp.openById(SPREADSHEET_ID);
  return SPREADSHEET_MEMO_;
}

function getSheet_(name) {
  const sh = getSpreadsheet_().getSheetByName(name);
  if (!sh) throw new Error('Sheet "' + name + '" belum tersedia. Jalankan SetupDatabase.');
  return sh;
}

function getDataObjects_(name) {
  const useCache = SHEET_CACHE_SKIP.indexOf(name) === -1;
  if (useCache) {
    const cachedText = cacheGetLarge_(SHEET_CACHE_PREFIX + name);
    if (cachedText) {
      try { return JSON.parse(cachedText); } catch (ignored) {}
    }
  }
  const sh = getSheet_(name);
  const values = sh.getDataRange().getDisplayValues();
  let rows = [];
  if (values.length) {
    const headers = values[0];
    rows = values.slice(1).filter(function(row) {
      return row.some(function(value) {
        return value !== '';
      });
    }).map(function(row) {
      const obj = {};
      headers.forEach(function(header, index) {
        obj[header] = row[index] || '';
      });
      return obj;
    });
  }
  if (useCache) cachePutLarge_(SHEET_CACHE_PREFIX + name, JSON.stringify(rows), 300);
  return rows;
}

function findRowById_(sh, id) {
  const values = sh.getDataRange().getDisplayValues();
  if (!values.length) return null;
  const headers = values[0];
  const idIndex = headers.indexOf('ID');
  for (let i = 1; i < values.length; i++) {
    if (values[i][idIndex] === id) {
      const obj = {};
      headers.forEach(function(header, index) {
        obj[header] = values[i][index] || '';
      });
      return { row: i + 1, object: obj };
    }
  }
  return null;
}

// Menambahkan kolom baru di akhir header bila belum ada (dicek sekali, lalu ditandai).
function ensureSheetColumn_(sh, header) {
  const props = PropertiesService.getScriptProperties();
  const flag = 'COL_' + sh.getName() + '_' + header;
  if (props.getProperty(flag)) return;
  const headers = sh.getRange(1, 1, 1, Math.max(sh.getLastColumn(), 1)).getDisplayValues()[0];
  if (headers.indexOf(header) === -1) {
    sh.getRange(1, headers.length + 1).setValue(header).setBackground('#0B3B75').setFontColor('#FFFFFF').setFontWeight('bold').setVerticalAlignment('middle');
  }
  props.setProperty(flag, '1');
}

function writeObject_(sh, obj, row) {
  const headers = sh.getRange(1, 1, 1, sh.getLastColumn()).getDisplayValues()[0];
  const values = headers.map(function(header) {
    return Object.prototype.hasOwnProperty.call(obj, header) ? obj[header] : '';
  });
  if (row) sh.getRange(row, 1, 1, values.length).setValues([values]);
  else sh.appendRow(values);
}

function getSettings_() {
  const rows = getDataObjects_(SHEET_NAMES.SETTINGS);
  const settings = {};
  rows.forEach(function(item) {
    settings[item.Key] = item.Value;
  });
  return settings;
}

function setSetting_(key, value) {
  const sh = getSheet_(SHEET_NAMES.SETTINGS);
  const values = sh.getDataRange().getDisplayValues();
  for (let i = 1; i < values.length; i++) {
    if (values[i][0] === key) {
      sh.getRange(i + 1, 1, 1, 3).setValues([[key, value, now_()]]);
      return;
    }
  }
  sh.appendRow([key, value, now_()]);
}

function requireAuth_(payload, roles) {
  const token = clean_(payload && payload.token);
  if (!token) throw new Error('Sesi tidak tersedia. Silakan login kembali.');
  const props = PropertiesService.getScriptProperties();
  const raw = props.getProperty('SESSION_' + token);
  if (!raw) throw new Error('Sesi telah berakhir. Silakan login kembali.');
  const session = JSON.parse(raw);
  if (!session.expiresAt || session.expiresAt < Date.now()) {
    props.deleteProperty('SESSION_' + token);
    throw new Error('Sesi telah kedaluwarsa. Silakan login kembali.');
  }
  const user = getUsersCached_().find(function(item) {
    return item.ID === session.userId;
  });
  if (!user || user.Status !== 'Aktif') throw new Error('Akun tidak aktif atau tidak ditemukan.');
  if (user.Role !== 'Admin') {
    const mv = maintenanceView_();
    if (mv.active) throw new Error(maintenanceBlockMessage_(mv));
  }
  if (roles && roles.indexOf(user.Role) === -1) throw new Error('Anda tidak memiliki izin untuk melakukan tindakan ini.');
  return user;
}

function toClientUser_(user) {
  return { ID: user.ID, Nama: user.Nama, Username: user.Username, Role: user.Role, Status: user.Status, WajibGantiPassword: user.WajibGantiPassword, CreatedAt: user.CreatedAt, UpdatedAt: user.UpdatedAt };
}

function saveFile_(input, folderName, allowedTypes) {
  if (!input || !input.dataUrl || !input.name || !input.mimeType) throw new Error('Data file tidak lengkap.');
  const mimeType = clean_(input.mimeType).toLowerCase();
  if (allowedTypes.indexOf(mimeType) === -1) throw new Error('Format file tidak didukung.');
  const parts = String(input.dataUrl).split(',');
  if (parts.length !== 2) throw new Error('Format file tidak valid.');
  const bytes = Utilities.base64Decode(parts[1]);
  if (!bytes.length || bytes.length > MAX_UPLOAD_BYTES) throw new Error('Ukuran file maksimal ' + Math.round(MAX_UPLOAD_BYTES / 1048576) + ' MB.');
  const safeName = clean_(input.name).replace(/[\\/:*?"<>|]/g, '_').substring(0, 150);
  const blob = Utilities.newBlob(bytes, mimeType, new Date().getTime() + '_' + safeName);
  const file = getSubfolder_(folderName).createFile(blob);
  return { id: file.getId(), name: file.getName(), url: file.getUrl(), mimeType: mimeType };
}

function getRootFolder_() {
  if (ROOT_FOLDER_ID) {
    try {
      return DriveApp.getFolderById(ROOT_FOLDER_ID);
    } catch (ignored) {
      throw new Error('ROOT_FOLDER_ID tidak valid atau tidak dapat diakses.');
    }
  }
  const props = PropertiesService.getScriptProperties();
  const storedId = props.getProperty('SIKARA_ROOT_FOLDER_ID');
  if (storedId) {
    try {
      return DriveApp.getFolderById(storedId);
    } catch (ignored) {
      props.deleteProperty('SIKARA_ROOT_FOLDER_ID');
    }
  }
  const folders = DriveApp.getFoldersByName(FOLDER_NAMES.ROOT);
  const folder = folders.hasNext() ? folders.next() : DriveApp.createFolder(FOLDER_NAMES.ROOT);
  props.setProperty('SIKARA_ROOT_FOLDER_ID', folder.getId());
  return folder;
}

function getSubfolder_(name) {
  const root = getRootFolder_();
  const folders = root.getFoldersByName(name);
  return folders.hasNext() ? folders.next() : root.createFolder(name);
}

function trashFile_(id) {
  try {
    if (id) DriveApp.getFileById(id).setTrashed(true);
  } catch (err) {
    Logger.log(err.message);
  }
}

function isAllowedFile_(id) {
  const settings = getSettings_();
  if (settings.LogoFileID === id) return true;
  return getDataObjects_(SHEET_NAMES.REALIZATIONS).some(function(item) {
    return item.BuktiFileID === id;
  });
}

function appendAudit_(user, action, entity, entityId, detail) {
  const sh = getSheet_(SHEET_NAMES.LOG);
  sh.appendRow([createId_('LOG'), now_(), user.ID, user.Nama, user.Role, action, entity, entityId, detail]);
}

function hashPassword_(password) {
  const bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, String(password) + AUTH_SALT, Utilities.Charset.UTF_8);
  return bytes.map(function(byte) {
    const value = byte < 0 ? byte + 256 : byte;
    return ('0' + value.toString(16)).slice(-2);
  }).join('');
}

function createId_(prefix) {
  return prefix + '-' + Utilities.formatDate(new Date(), TIMEZONE, 'yyyyMMdd') + '-' + Utilities.getUuid().replace(/-/g, '').substring(0, 10).toUpperCase();
}

// ===== MODE MAINTENANCE =====
// Saat aktif, hanya Admin yang dapat login dan memakai aplikasi. Berakhir otomatis pada batas waktu (bila diisi).
const MAINTENANCE_PROP = 'MAINTENANCE_MODE';
const MAINTENANCE_MARK = '[MAINTENANCE]';
const MAINTENANCE_DEFAULT_MESSAGE = 'Sistem sedang dalam pemeliharaan. Silakan kembali beberapa saat lagi.';

function readMaintenance_() {
  try {
    const raw = PropertiesService.getScriptProperties().getProperty(MAINTENANCE_PROP);
    return raw ? JSON.parse(raw) : { enabled: false, until: 0, message: '' };
  } catch (err) {
    return { enabled: false, until: 0, message: '' };
  }
}

function maintenanceView_() {
  const m = readMaintenance_();
  const until = Number(m.until) || 0;
  const enabled = !!m.enabled;
  const active = enabled && (!until || until > Date.now());
  return {
    enabled: enabled,
    active: active,
    until: until,
    untilText: until ? Utilities.formatDate(new Date(until), TIMEZONE, 'dd/MM/yyyy HH:mm') + ' WIB' : '',
    untilInput: until ? Utilities.formatDate(new Date(until), TIMEZONE, "yyyy-MM-dd'T'HH:mm") : '',
    nowInput: Utilities.formatDate(new Date(), TIMEZONE, "yyyy-MM-dd'T'HH:mm"),
    message: m.message || MAINTENANCE_DEFAULT_MESSAGE,
    serverNow: Date.now()
  };
}

function maintenanceBlockMessage_(view) {
  return MAINTENANCE_MARK + ' ' + view.message + (view.untilText ? ' Perkiraan selesai: ' + view.untilText + '.' : '');
}

// Publik (tanpa login): dipakai halaman login dan pemeriksaan berkala di aplikasi
function getMaintenanceStatus() {
  try {
    return { success: true, data: maintenanceView_() };
  } catch (err) {
    return { success: false, message: err.message };
  }
}

function saveMaintenance(payload) {
  const lock = LockService.getScriptLock();
  try {
    const admin = requireAuth_(payload, ['Admin']);
    const data = payload && payload.data ? payload.data : {};
    const enabled = data.enabled === true || data.enabled === 'true';
    const message = clean_(data.message).substring(0, 300);
    const untilText = clean_(data.until);
    let until = 0;
    if (untilText) {
      try {
        until = Utilities.parseDate(untilText, TIMEZONE, "yyyy-MM-dd'T'HH:mm").getTime();
      } catch (parseErr) {
        return { success: false, message: 'Format batas waktu tidak valid.' };
      }
      if (enabled && until <= Date.now()) return { success: false, message: 'Batas waktu harus lebih dari waktu sekarang.' };
    }
    lock.waitLock(15000);
    PropertiesService.getScriptProperties().setProperty(MAINTENANCE_PROP, JSON.stringify({
      enabled: enabled, until: until, message: message, updatedBy: admin.Nama, updatedAt: now_()
    }));
    appendAudit_(admin, 'MAINTENANCE', 'Sistem', '-', enabled ? 'Maintenance diaktifkan' + (until ? ' sampai ' + untilText.replace('T', ' ') : ' tanpa batas waktu') : 'Maintenance dinonaktifkan');
    return { success: true, data: maintenanceView_(), message: enabled ? 'Mode maintenance diaktifkan. Pengguna selain Admin tidak dapat memakai aplikasi.' : 'Mode maintenance dinonaktifkan.' };
  } catch (err) {
    return { success: false, message: err.message };
  } finally {
    lock.releaseLock();
  }
}

function now_() {
  return Utilities.formatDate(new Date(), TIMEZONE, 'yyyy-MM-dd HH:mm:ss');
}

function clean_(value) {
  return String(value === null || value === undefined ? '' : value).trim();
}

function toNumber_(value) {
  if (typeof value === 'number') return isFinite(value) ? value : 0;
  const normalized = String(value === null || value === undefined ? '' : value).replace(/\s/g, '').replace(/[^\d,.-]/g, '');
  if (!normalized) return 0;
  if (normalized.indexOf(',') > -1 && normalized.indexOf('.') > -1) return Number(normalized.replace(/\./g, '').replace(',', '.')) || 0;
  if ((normalized.match(/\./g) || []).length > 1) return Number(normalized.replace(/\./g, '')) || 0;
  if ((normalized.match(/,/g) || []).length > 1) return Number(normalized.replace(/,/g, '')) || 0;
  return Number(normalized.replace(',', '.')) || 0;
}

function isIsoDate_(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function cachePutLarge_(key, text, ttl) {
  try {
    const parts = Math.ceil(text.length / CACHE_CHUNK_SIZE);
    if (parts < 1 || parts > 40) return;
    const bundle = {};
    for (let i = 0; i < parts; i++) bundle[key + '_' + i] = text.substring(i * CACHE_CHUNK_SIZE, (i + 1) * CACHE_CHUNK_SIZE);
    bundle[key + '_N'] = String(parts);
    CacheService.getScriptCache().putAll(bundle, ttl);
  } catch (ignored) {}
}

function cacheGetLarge_(key) {
  try {
    const cache = CacheService.getScriptCache();
    const count = Number(cache.get(key + '_N') || 0);
    if (!count) return null;
    const keys = [];
    for (let i = 0; i < count; i++) keys.push(key + '_' + i);
    const got = cache.getAll(keys);
    let text = '';
    for (let i = 0; i < count; i++) {
      const part = got[key + '_' + i];
      if (part === undefined || part === null) return null;
      text += part;
    }
    return text;
  } catch (ignored) {
    return null;
  }
}

function cacheRemoveLarge_(key) {
  try {
    const cache = CacheService.getScriptCache();
    const count = Number(cache.get(key + '_N') || 0);
    const keys = [key + '_N'];
    for (let i = 0; i < count; i++) keys.push(key + '_' + i);
    cache.removeAll(keys);
  } catch (ignored) {}
}

function getUsersCached_() {
  const cache = CacheService.getScriptCache();
  const cached = cache.get(CACHE_KEYS.USERS);
  if (cached) return JSON.parse(cached);
  const users = getDataObjects_(SHEET_NAMES.USERS);
  try { cache.put(CACHE_KEYS.USERS, JSON.stringify(users), 300); } catch (ignored) {}
  return users;
}

function deleteRowsWhere_(sh, header, value) {
  const values = sh.getDataRange().getDisplayValues();
  if (values.length < 2) return 0;
  const col = values[0].indexOf(header);
  if (col === -1) return 0;
  const rows = [];
  for (let i = 1; i < values.length; i++) {
    if (values[i][col] === value) rows.push(i + 1);
  }
  let deleted = 0;
  let r = rows.length - 1;
  while (r >= 0) {
    const end = r;
    while (r > 0 && rows[r - 1] === rows[r] - 1) r--;
    const count = rows[end] - rows[r] + 1;
    sh.deleteRows(rows[r], count);
    deleted += count;
    r--;
  }
  return deleted;
}

function invalidateCache_(sheetNames) {
  try {
    const cache = CacheService.getScriptCache();
    const names = Array.isArray(sheetNames) ? sheetNames : Object.keys(SHEET_NAMES).map(function(k) { return SHEET_NAMES[k]; });
    const bases = [CACHE_KEYS.APP].concat(names.map(function(n) { return SHEET_CACHE_PREFIX + n; }));
    const counts = cache.getAll(bases.map(function(b) { return b + '_N'; }));
    const keys = [CACHE_KEYS.USERS];
    bases.forEach(function(b) {
      keys.push(b + '_N');
      const c = Number(counts[b + '_N'] || 0);
      for (let i = 0; i < c; i++) keys.push(b + '_' + i);
    });
    cache.removeAll(keys);
  } catch (ignored) {}
}

// Jalankan manual dari editor bila Anda mengubah data langsung di Google Sheet dan ingin tampil seketika.
function bersihkanCache_SIKAT() {
  invalidateCache_();
}

function escapeHtmlServer_(value) {
  return String(value || '').replace(/[&<>"']/g, function(char) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char];
  });
}
function pulihkanAkunAdmin_SIKAT() {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000);
    const ss = getSpreadsheet_();
    const headers = SHEET_HEADERS[SHEET_NAMES.USERS];

    // 1. Pastikan sheet Users dan headernya ada
    let sh = ss.getSheetByName(SHEET_NAMES.USERS);
    if (!sh) sh = ss.insertSheet(SHEET_NAMES.USERS);
    if (sh.getLastRow() === 0) {
      sh.getRange(1, 1, 1, headers.length).setValues([headers]);
    }
    const currentHeaders = sh.getRange(1, 1, 1, sh.getLastColumn()).getDisplayValues()[0];
    const missing = headers.filter(function(h) { return currentHeaders.indexOf(h) === -1; });
    if (missing.length) {
      sh.getRange(1, currentHeaders.length + 1, 1, missing.length).setValues([missing]);
    }
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, sh.getLastColumn()).setBackground('#0B3B75').setFontColor('#FFFFFF').setFontWeight('bold');

    // 2. Baca data user yang ada
    const values = sh.getDataRange().getDisplayValues();
    const head = values[0];
    const idx = {
      ID: head.indexOf('ID'),
      Nama: head.indexOf('Nama'),
      Username: head.indexOf('Username'),
      PasswordHash: head.indexOf('PasswordHash'),
      Role: head.indexOf('Role'),
      Status: head.indexOf('Status'),
      Wajib: head.indexOf('WajibGantiPassword'),
      CreatedAt: head.indexOf('CreatedAt'),
      UpdatedAt: head.indexOf('UpdatedAt')
    };

    const laporan = [];
    const timestamp = now_();

    // 3. Untuk setiap user default: reset jika ada, buat jika belum ada
    DEFAULT_USERS.forEach(function(u) {
      let barisAda = -1;
      for (let i = 1; i < values.length; i++) {
        if (String(values[i][idx.Username]).trim().toLowerCase() === u.username.toLowerCase()) {
          barisAda = i + 1;
          break;
        }
      }
      if (barisAda > -1) {
        sh.getRange(barisAda, idx.PasswordHash + 1).setValue(hashPassword_(u.password));
        sh.getRange(barisAda, idx.Status + 1).setValue('Aktif');
        sh.getRange(barisAda, idx.Wajib + 1).setValue('YA');
        sh.getRange(barisAda, idx.UpdatedAt + 1).setValue(timestamp);
        laporan.push(u.username + ': password direset ke ' + u.password);
      } else {
        const row = head.map(function(h) {
          if (h === 'ID') return createId_('USR');
          if (h === 'Nama') return u.name;
          if (h === 'Username') return u.username.toLowerCase();
          if (h === 'PasswordHash') return hashPassword_(u.password);
          if (h === 'Role') return u.role;
          if (h === 'Status') return 'Aktif';
          if (h === 'WajibGantiPassword') return 'YA';
          if (h === 'CreatedAt' || h === 'UpdatedAt') return timestamp;
          return '';
        });
        sh.appendRow(row);
        laporan.push(u.username + ': dibuat baru dengan password ' + u.password);
      }
    });

    invalidateCache_();
    Logger.log('SELESAI. ' + laporan.join(' | '));
  } catch (err) {
    Logger.log('GAGAL: ' + err.message);
  } finally {
    lock.releaseLock();
  }
}