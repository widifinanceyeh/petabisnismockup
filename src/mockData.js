/**
 * MOCKUP OFFLINE: satu-satunya sumber data aplikasi.
 * Semua teks dan identitas contoh adalah FIKTIF, bukan salinan Google Sheets/Docs.
 * Hanya lima ayat rancangan (B...) dan lima peta urusan berikut yang tersedia.
 */
export const CONTOH_AYAT = [
  { id: 'B001.01', pasal: 1, nomor: '1', urutan: 1, teks: '[CONTOH — BUKAN NASKAH RESMI] Penyelenggaraan pendidikan dilaksanakan berdasarkan prinsip mutu, akuntabilitas, dan tata kelola yang baik.' },
  { id: 'B001.02', pasal: 1, nomor: '2', urutan: 2, teks: '[CONTOH — BUKAN NASKAH RESMI] Rektor mengoordinasikan penyusunan dan evaluasi rencana pengembangan akademik universitas.' },
  { id: 'B002.01', pasal: 2, nomor: '1', urutan: 1, teks: '[CONTOH — BUKAN NASKAH RESMI] Unit kerja mengusulkan rencana kegiatan kepada pimpinan sesuai kewenangan masing-masing.' },
  { id: 'B002.02', pasal: 2, nomor: '2', urutan: 2, teks: '[CONTOH — BUKAN NASKAH RESMI] Rencana kegiatan ditelaah dan disahkan sesuai alur persetujuan internal yang berlaku.' },
  { id: 'B003.01', pasal: 3, nomor: '1', urutan: 1, teks: '[CONTOH — BUKAN NASKAH RESMI] Pelaksanaan dan tindak lanjut kegiatan dilaporkan secara berkala untuk keperluan evaluasi.' }
];

const AKSI = [
  { kode: 'USUL', nama: 'Pengusul', urut: 1 },
  { kode: 'TELAAH', nama: 'Penelaah', urut: 2 },
  { kode: 'SETUJU', nama: 'Persetujuan', urut: 3 },
  { kode: 'TETAP', nama: 'Penetapan', urut: 4 },
  { kode: 'SAH', nama: 'Pengesahan', urut: 5 }
];
const ORGAN = [
  { kode: 'UNIT', nama: 'Unit Kerja', padanan: 'UNIT', warnaLatar: '#dbeafe', warnaTeks: '#1e40af' },
  { kode: 'DEKAN', nama: 'Dekan', padanan: 'DEKAN', warnaLatar: '#dcfce7', warnaTeks: '#166534' },
  { kode: 'REKTOR', nama: 'Rektor', padanan: 'REKTOR', warnaLatar: '#fef3c7', warnaTeks: '#92400e' },
  { kode: 'YAYASAN', nama: 'Yayasan', padanan: 'YAYASAN', warnaLatar: '#fce7f3', warnaTeks: '#9d174d' }
];
const URUSAN_ASLI = [
  ['A1.1', 'Perencanaan program akademik', 'A1', 'B001.01', 1, '1', ['Unit Kerja', 'Dekan', 'Rektor', 'Rektor', 'Yayasan']],
  ['A1.2', 'Evaluasi pengembangan akademik', 'A1', 'B001.02', 1, '2', ['Unit Kerja', 'Dekan', 'Rektor', 'Rektor', 'Yayasan']],
  ['B1.1', 'Pengusulan program unit kerja', 'B1', 'B002.01', 2, '1', ['Unit Kerja', 'Dekan', 'Rektor', 'Rektor', 'Yayasan']],
  ['B1.2', 'Telaah dan pengesahan kegiatan', 'B1', 'B002.02', 2, '2', ['Unit Kerja', 'Dekan', 'Rektor', 'Yayasan', 'Yayasan']],
  ['C1.1', 'Pelaporan dan evaluasi kegiatan', 'C1', 'B003.01', 3, '1', ['Unit Kerja', 'Dekan', 'Rektor', 'Rektor', 'Yayasan']]
];
export const CONTOH_PETA = URUSAN_ASLI.map(([id, urusan, kelompok, idAyat, pasal, nomor, pelaksana], idx) => ({
  id, urusan, kelompok, bidang: ['Akademik', 'Akademik', 'Operasional', 'Operasional', 'Evaluasi'][idx],
  muatan: 'SIMULASI', jenisBaris: 'ALUR', adaDiSumber: false, adaDiRancangan: true,
  pasal: '', pasalBaru: `Pasal ${pasal} ayat (${nomor})`,
  status: 'SIMULASI', statusBahasan: idx === 3 ? 'Perlu Telaah' : 'Contoh', penuangan: 'Contoh',
  monev: '', catatan: 'Data simulasi untuk demonstrasi — bukan hasil rapat.',
  dasarMuatan: 'Contoh saja; belum diverifikasi terhadap peraturan.', alasanMuatan: '',
  lama: {}, baru: {}, riwayat: '', arahan: '',
  aras: Object.fromEntries(AKSI.map((a, j) => [a.kode, { organ: pelaksana[j], unit: '', pasal: `Pasal ${pasal} ayat (${nomor})` }])),
  idAyat
}));

const KELOMPOK = [
  { kode: 'A', judul: 'Penyelenggaraan Akademik' }, { kode: 'A1', judul: 'Perencanaan Akademik' },
  { kode: 'B', judul: 'Tata Kelola Operasional' }, { kode: 'B1', judul: 'Perencanaan Kegiatan' },
  { kode: 'C', judul: 'Pengendalian' }, { kode: 'C1', judul: 'Monitoring dan Evaluasi' }
];
const KOMBINASI = ORGAN.flatMap(o => AKSI.map(a => `${o.kode}|${a.kode}`));
export const MOCK_CFG = {
  app: {
    NAMA_APLIKASI: 'Peta Bisnis Proses UNEKA · MOCKUP',
    SUB_JUDUL: 'DEMO OFFLINE · 5 ayat dan 5 peta fiktif',
    JUDUL_MODUL_PETA: 'Peta', JUDUL_MODUL_NASKAH: 'Naskah',
    JUDUL_MODUL_TELAAH: 'Telaah', JUDUL_MODUL_TURUNAN: 'Dokumen Turunan',
    PEMISAH_GANDA: '/', TEKS_KOSONG: '—', LABEL_BLOK_LAMA: 'STATUTA 2025 (TIDAK DIUNGGAH)',
    LABEL_BLOK_BARU: 'RANCANGAN · DATA CONTOH', MODE_URUSAN: 'SEMUA', ORGAN_SOROT: '',
    RANC_JUDUL_PASALARAS: 'Dasar Ayat', RANC_KOLOM_TULIS: '', JEDA_SIMPAN_MS: 0,
    ORGAN_LUAR_STATUTA: '', MUATAN_LUAR_STATUTA: ''
  },
  aksi: AKSI, organ: ORGAN, kelompok: KELOMPOK,
  kombinasi: { SUMBER: KOMBINASI, RANCANGAN: KOMBINASI },
  format: 'ARAS'
};

const INDEKS26 = { 1: [['B001.01', '1'], ['B001.02', '2']], 2: [['B002.01', '1'], ['B002.02', '2']], 3: [['B003.01', '1']] };
const DAFTAR_PASAL = [
  [1, 'Prinsip dan Perencanaan'], [2, 'Pengusulan dan Persetujuan'], [3, 'Pelaporan dan Evaluasi']
].map(([pasal, judul]) => ({
  pasal, judul, bab: 'I', asal: null, redaksi: pasal === 1 ? 1 : 0, rapat: pasal === 1 ? 1 : 0, hapus: 0, sorot: 0, masalah: 0,
  jenis: { substansi: pasal === 3 ? 1 : 2, baru: 0, hapus: 0 }
}));
export const MOCK_NASKAH_INIT = {
  siap: true, adaJejak: true, bab: [{ bab: 'I', judulBab: 'CONTOH SIMULASI NASKAH', lama: [] }],
  daftar: DAFTAR_PASAL, indeks26: INDEKS26, indeks25: {}, rujukan25: {},
  cfg: {
    labelLama: 'STATUTA 2025 (TIDAK DIMUAT)', labelBaru: 'RANCANGAN · CONTOH',
    label: { TETAP: 'TETAP', UBAH: 'UBAH', HAPUS: 'DIHAPUS', BARU: 'BARU', PINDAH: 'PINDAH' },
    warna: {}, status: [{nilai:'BARU',warna:'#eaf1fd'}, {nilai:'UBAH',warna:'#fdf5dd'}, {nilai:'TETAP',warna:'#e5f6eb'}, {nilai:'DIHAPUS',warna:'#fce0e0'}],
    wajibAlasan:['DIHAPUS','UBAH'], jedaSimpanMs:0
  }
};
export const MOCK_PASAL = Object.fromEntries([1,2,3].map(pasal => {
  const ayat26 = CONTOH_AYAT.filter(a => a.pasal === pasal);
  return [pasal, {
    pasal, bab: 'I', ayat25: [], ayat26,
    jejak: ayat26.map((a,i) => ({ id: `J${String(pasal).padStart(3,'0')}.${i+1}`, id25: '', id26: a.id,
      status: 'BARU', alasan: 'Data contoh untuk demonstrasi saja.', dikonfirmasi: true })),
    catatan: { sumber: 'DATA SIMULASI. Untuk melihat referensi, klik rujukan dasar hukum.',
      perubahan: '', hukum: 'Permendikbud Nomor 14 Tahun 2014 Pasal 1',
      hukumUrai: [{ t: 'Permendikbud Nomor 14 Tahun 2014 Pasal 1 · KUTIPAN SIMULASI (bukan bunyi resmi)',
        q: 'Permendikbud Nomor 14 Tahun 2014 Pasal 1' }] },
    redaksi: pasal === 1 ? [{id:'RD-DEMO-01',id26:'B001.02',status:'USULAN',lama:ayat26[1].teks,
       baru:ayat26[1].teks.replace('mengoordinasikan','memfasilitasi'),alasan:'Usulan contoh untuk diskusi rapat.',tgl:'2026-10-13',oleh:'Tim Mockup'}] : [],
    rapat: pasal === 1 ? [{ id:'CR-DEMO-01',id26:'B001.02',teks:'Pertimbangkan indikator evaluasi tahunan (contoh).',status:'TERBUKA',oleh:'Tim Mockup',dibuat:'2026-10-13 10:00',diubah:'2026-10-13 10:00' }] : [], luar: {}
  }];
}));
export const MOCK_TELAAH = {
  urusan: CONTOH_PETA.map((u,ix) => ({
    id: u.id, letak: [u.pasalBaru],
    hitung: ix === 3 ? { PERIKSA: 1 } : { SESUAI: 1 },
    aras: AKSI.map(a => ({ A: a.kode, i: a.kode === 'USUL' ? [u.idAyat] : [], p: [], t: ix === 3 && a.kode === 'SETUJU' ? 'PERIKSA' : 'SESUAI', k: 'Hanya contoh.' }))
  })),
  monev: [{butir:'1',alamat:'Pasal 1 ayat (2)',tertuju:'B001.02',status:'Belum ada',dokumen:'Peraturan Rektor tentang evaluasi akademik (contoh)',ids:['B001.02']}],
  mirip: [], silang: [], kembar: [], putusan: {}, bilah: [],
  kerja: { permen: { SEBAGIAN: 2, 'BELUM ADA': 0 }, jejakBelum: 0 }
};
export const MOCK_TURUNAN = {
  ada: true, perAyat: true, penetap: ['Rektor', 'Yayasan'],
  dokumen: [
    {id:'DT01', dokumen:'Peraturan Rektor tentang Evaluasi Program Akademik (CONTOH)',
      penetap:'Rektor', status:'Penyusunan', catatan:'Dokumen fiktif, tidak tersambung Google Docs.',
      dasar:'Pasal 1 ayat (2)', pokok:'Evaluasi program akademik', drafJudul:'', drafTautan:'',
      baris:[{id:'B001.02',pokok:'Mekanisme evaluasi akademik'}], patahId:[]},
    {id:'DT02', dokumen:'Peraturan Yayasan tentang Tata Kelola Kegiatan (CONTOH)',
      penetap:'Yayasan', status:'Contoh', catatan:'Dokumen simulasi baca-saja.',
      dasar:'Pasal 2 ayat (2)', pokok:'Pengesahan kegiatan', drafJudul:'', drafTautan:'',
      baris:[{id:'B002.02',pokok:'Persetujuan dan pengesahan kegiatan'}], patahId:[]}
  ], lepas: [], bentrok: [], delegasi: {}
};
export const MOCK_LUAR = { baris: [], pilihan: ['Dipertahankan', 'Masukkan ke urusan', 'Dihapus'], rekap: { dibawa:0, baru:0, dihapus:0, diputus:0, pasal:0, pasalBelum:0, hapusBelum:0 } };
export const MOCK_TEKS = { ayat: CONTOH_AYAT.map(a => [a.id, a.pasal, a.nomor, a.teks]) };
export const MOCK_PAKET = {
  init: MOCK_NASKAH_INIT, pasal: MOCK_PASAL, telaah: MOCK_TELAAH,
  kepatuhan: { ada:true, tab:'04C-MOCKUP', butir:[
    {k:'SIM-01',g:'CONTOH BUTIR PERMEN · BUKAN KUTIPAN RESMI',s:'Kepatuhan A', b:'[SIMULASI] Perguruan tinggi mengembangkan mekanisme penjaminan mutu internal.',p:'Pasal 1 ayat (1)',u:'A1.1',patah:[],uh:[],st:'TERPENUHI',c:'Terwakili dalam contoh ayat.'},
    {k:'SIM-02',g:'CONTOH BUTIR PERMEN · BUKAN KUTIPAN RESMI',s:'Kepatuhan B', b:'[SIMULASI] Evaluasi program dilakukan secara berkala oleh pihak yang berwenang.',p:'Pasal 1 ayat (2)',u:'A1.2',patah:[],uh:[],st:'SEBAGIAN',c:'Indikator rinci belum tertulis.'},
    {k:'SIM-03',g:'CONTOH BUTIR PERMEN · BUKAN KUTIPAN RESMI',s:'Kepatuhan C', b:'[SIMULASI] Rencana kegiatan unit dikaji sebelum dilaksanakan.',p:'Pasal 2 ayat (1); Pasal 2 ayat (2)',u:'B1.1; B1.2',patah:[],uh:[],st:'SEBAGIAN',c:'Alur persetujuan disimulasikan.'}
  ] }, luar: MOCK_LUAR,
  hasilRapat: { hasil: { 'A1.2': { hasil: 'Perlu Revisi', catatan:'Perlu contoh indikator evaluasi yang terukur.', tanggal: '2026-10-13', oleh:'Tim Mockup' } }, pilihan: ['Setuju','Perlu Revisi','Ditunda'] }, turunan: MOCK_TURUNAN, teks: MOCK_TEKS
};
/** Guard agar data contoh tidak dapat diperluas lewat parameter input. */
export const ID_AYAT_DIIZINKAN = new Set(CONTOH_AYAT.map(a => a.id));
export const ID_PETA_DIIZINKAN = new Set(CONTOH_PETA.map(u => u.id));

/** Terbatas pada satu kutipan peraturan untuk demonstrasi panel Dasar Hukum. */
export const MOCK_RUJUKAN = 'Permendikbud Nomor 14 Tahun 2014 Pasal 1';
export const MOCK_HUKUM = {
  [MOCK_RUJUKAN]: { ada: true, kunci: 'Permendikbud Nomor 14 Tahun 2014', tab: 'PUSTAKA-MOCK',
    alasan:'KUTIPAN SIMULASI — tidak dapat dijadikan rujukan hukum.',
    alamat:[{ada:true,teks:'Pasal 1'}], baris:[['Pasal 1 (SIMULASI)', '[BUKAN TEKS RESMI] Contoh ketentuan mengenai kerja sama perguruan tinggi untuk memperlihatkan bagaimana panel peraturan dapat dibuka dan ditelusuri.']],
    lain:[1,2,3] }
};
export const MOCK_REKAP = {
  tanggal:'2026-10-13', tersedia:[{tanggal:'2026-10-13',jumlah:2}],
  butir: [
    { pasal:1,letak:'Ayat (2)',jenis:'catatan',teks:'Evaluasi akademik memerlukan indikator terukur (CONTOH).',alasan:'Catatan simulasi.',status:'Terbuka',oleh:'Tim Mockup'},
    { pasal:2,letak:'Ayat (1)',jenis:'jejak',teks:'Perencanaan kegiatan unit (CONTOH).',alasan:'Ditinjau pada sesi simulasi.',status:'Dikonfirmasi',oleh:'Tim Mockup'}
  ]
};
export const MOCK_VERSI = {label:'Rapat contoh 2026-10-13',tanggal:'2026-10-13',jumlah:5};
