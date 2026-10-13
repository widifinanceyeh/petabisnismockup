import {
  CONTOH_PETA, CONTOH_AYAT, MOCK_CFG, MOCK_PASAL, MOCK_NASKAH_INIT, MOCK_TELAAH,
  MOCK_TURUNAN, MOCK_LUAR, MOCK_TEKS, MOCK_PAKET, ID_PETA_DIIZINKAN, MOCK_HUKUM, MOCK_REKAP, MOCK_VERSI
} from './mockData';
/**
 * MOCKUP BACA-SAJA (OFFLINE).
 * TIDAK mengimpor API_URL. TIDAK memakai fetch/XHR/beacon.
 * Seluruh permintaan baca dilayani dari 5 ayat dan 5 peta di mockData.js.
 * Seluruh fungsi tulis selalu ditolak, termasuk fallback GET yang dulu dipakai backend.
 */
const clone = x => JSON.parse(JSON.stringify(x));
const TIDAK_BOLEH = 'MOCKUP BACA SAJA: menyimpan, autosave, dan perubahan Google Sheets/Docs tidak diizinkan.';
const tolak = async () => { throw new Error(TIDAK_BOLEH); };
const versi = 'MOCK-2026-10-13-5AYAT-5PETA';

export async function apiGet(action, params = {}) {
  const p = params || {};
  switch (action) {
    case 'ping': return { mode: 'MOCKUP_OFFLINE', terhubung: false };
    case 'init': case 'readAll': return clone({ cfg: MOCK_CFG, urusan: CONTOH_PETA, format: 'ARAS',
      kelompok: MOCK_CFG.kelompok, pilihan: { ORGAN: MOCK_CFG.organ.map(o => o.nama), STATUS: ['Contoh','Perlu Telaah'],
      PENUANGAN: ['Contoh'] }, ts: 'MOCKUP', versi });
    case 'bootstrap': return clone(MOCK_CFG);
    case 'teks': return { urusan: [] };
    case 'versi': case 'getVersion': return { versi };
    case 'clearCache': return { dibersihkan: true, catatan: 'Hanya cache lokal contoh' };
    case 'detail': return ID_PETA_DIIZINKAN.has(String(p.id)) ? clone(CONTOH_PETA.find(u => u.id === String(p.id))) : null;
    case 'diagnosa': return { mode: 'MOCKUP BACA SAJA', sumber: 'Data statis lokal', ayat: CONTOH_AYAT.length,
      peta: CONTOH_PETA.length, googleSheet: false, googleDocs: false, edit: false, versiKode: 'MOCKUP-OFFLINE',
      kesimpulan: 'Aman: data lokal saja, tanpa koneksi dan tanpa kemampuan simpan.',
      periksa: [
        {nama: 'Sumber data', lulus: true, catatan: 'Hanya mockData.js, tidak terhubung Sheet' },
        {nama: 'Akses tulis', lulus: true, catatan: 'Seluruh aksi simpan ditolak' },
        {nama: 'Ayat yang tersedia', lulus: true, catatan: 'Tepat 5 ayat contoh' },
        {nama: 'Peta bisnis', lulus: true, catatan: 'Tepat 5 peta contoh terkait' },
        {nama: 'Google Docs', lulus: true, catatan: 'Tidak ada akses dokumen asli' }
      ] };
    case 'naskahInit': return clone(MOCK_NASKAH_INIT);
    case 'naskahBab': return { pasal: Object.values(MOCK_PASAL).filter(x => x.bab === p.bab).map(clone) };
    case 'naskahPasal': return MOCK_PASAL[Number(p.pasal)] ? clone(MOCK_PASAL[Number(p.pasal)]) : null;
    case 'naskahTelaah': return clone(MOCK_TELAAH);
    case 'naskahYatim': return { baris: [], putusan: {} };
    case 'dasarHukum': return clone(MOCK_HUKUM[String(p.t)] || { ada:false,alasan:'Kutipan di luar contoh tidak tersedia.',alamat:[],baris:[],lain:[] });
    case 'dasarHukumPasal': return { hukum: [1,2,3].includes(Number(p.pasal)) ? clone(MOCK_HUKUM) : {} };
    case 'naskahKepatuhan': return clone(MOCK_PAKET.kepatuhan);
    case 'naskahLuar': return clone(MOCK_LUAR);
    case 'naskahHasilRapat': return clone(MOCK_PAKET.hasilRapat);
    case 'naskahTurunan': return clone(MOCK_TURUNAN);
    case 'naskahTeks': return clone(MOCK_TEKS);
    case 'paketVersi': return { n: versi, h: versi };
    case 'paket':
      return { v: versi, isi: p.j === 'h' ? { hukum: clone(MOCK_HUKUM) } : clone(MOCK_PAKET) };
    case 'rekapRapat': return clone(!p.tanggal || p.tanggal === MOCK_REKAP.tanggal ? MOCK_REKAP : { tanggal:p.tanggal, tersedia:MOCK_REKAP.tersedia, butir:[] });
    case 'bandingVersi': return p.label ? clone(p.label === MOCK_VERSI.label ? {label:p.label,berubah:['B001.02'],baru:[]} : {label:'',berubah:[],baru:[]}) : {daftar:[clone(MOCK_VERSI)]};
    default: throw new Error('Aksi tidak tersedia dalam mockup: ' + String(action));
  }
}
export const apiPost = tolak;
const baca = (aksi, params) => () => apiGet(aksi, params);
export const api = {
  ping: baca('ping'), init: baca('init'), teks: baca('teks'), versi: baca('versi'),
  bootstrap: baca('bootstrap'), readAll: baca('readAll'), getVersion: baca('getVersion'),
  clearCache: baca('clearCache'), diagnosa: baca('diagnosa'),
  detail: id => apiGet('detail',{id}),
  naskahInit: baca('naskahInit'), naskahBab: bab => apiGet('naskahBab',{bab}),
  naskahPasal: pasal => apiGet('naskahPasal',{pasal}),
  naskahTelaah: baca('naskahTelaah'), naskahYatim: baca('naskahYatim'),
  dasarHukum: t => apiGet('dasarHukum',{t}), dasarHukumPasal: pasal => apiGet('dasarHukumPasal',{pasal}),
  naskahKepatuhan: baca('naskahKepatuhan'), naskahLuar: baca('naskahLuar'),
  naskahHasilRapat: baca('naskahHasilRapat'), naskahTurunan: baca('naskahTurunan'),
  naskahTeks: baca('naskahTeks'), paketVersi: baca('paketVersi'),
  paket: (j,v,bangun) => apiGet('paket',{j,v,bangun}),
  rekapRapat: tanggal => apiGet('rekapRapat',{tanggal}),
  bandingVersi: label => apiGet('bandingVersi',{label}),
  saveUrusan: tolak, saveJejak: tolak, createJejak: tolak, savePutusan: tolak,
  saveKembar: tolak, saveRedaksi: tolak, terapkanRedaksi: tolak,
  saveTurunan: tolak, savePutusanPasal: tolak, saveHasilRapat: tolak,
  saveCatatanRapat: tolak, bekukanVersi: tolak
};
