/**
 * config.js — HANYA konfigurasi teknis yang stabil.
 * Dilarang menaruh konfigurasi bisnis di sini (daftar organ, aras, status,
 * label kolom, judul halaman). Semuanya berasal dari sheet Cfg_*.
 */

export const APP_VERSION = '5.22.0';

/**
 * Mockup berdiri sendiri: tidak menerima URL API dari konfigurasi ataupun environment.
 * Jangan menambahkan endpoint produksi ke repo demonstrasi.
 */
export const MOCK_READ_ONLY = true;
export const API_URL = '';
export const STORAGE_KEY = {
  FILTER: 'pb-mockup-2026.filter.v42',
  HALAMAN: 'pb-mockup-2026.halaman.v2',
  RINGKAS: 'pb-mockup-2026.ringkas.v2',
  OLEH: 'pb-mockup-2026.oleh.v2',
  LAMA: 'pb-mockup-2026.blok2025.v4',
  PASAL: 'pb-mockup-2026.pasal2026.v41',
  TUTUP: 'pb-mockup-2026.kelompokTutup.v42',
  NASKAH_PASAL: 'pb-mockup-2026.naskahPasal.v49',
  NASKAH_SOROT: 'pb-mockup-2026.naskahSorot.v49',
  NASKAH_JENIS: 'pb-mockup-2026.naskahJenis.v513',
  NASKAH_BERUBAH: 'pb-mockup-2026.naskahBerubah.v49',
  NASKAH_MODE: 'pb-mockup-2026.naskahMode.v50',
  NASKAH_PITA: 'pb-mockup-2026.naskahPita.v50',
  NASKAH_CIUT: 'pb-mockup-2026.naskahCiut.v50',
  NASKAH_SARING: 'pb-mockup-2026.naskahSaring.v50',
  TELAAH_SEL: 'pb-mockup-2026.telaahSel.v50',
  RUANG: 'pb-mockup-2026.ruang.v53',
  CACHE_NASKAH: 'pb-mockup-2026.nkCache.v54',
  REL_CIUT: 'pb-mockup-2026.relCiut.v55',
  POSISI: 'pb-mockup-2026.posisi.v58',          // v5.8: alamat halaman terakhir (dibuka tanpa alamat = lanjut dari sini)
  LIHAT: 'pb-mockup-2026.lihatPasal.v58',       // v5.8: sidik pasal saat terakhir dibuka (tanda berubah)
  MAKS_LANGKAH: 'pb-mockup-2026.maksLangkah.v522' // v5.22: riwayat navigasi mockup, sessionStorage
};

export const TIMEOUT_MS = 60000;

/**
 * Jeda simpan otomatis, milidetik. Nilai ini hanya cadangan.
 * Yang berlaku adalah Cfg_App!JEDA_SIMPAN_MS bila kuncinya ada.
 */
export const JEDA_SIMPAN_MS = 800;
