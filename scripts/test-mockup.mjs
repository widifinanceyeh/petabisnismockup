/** Tests runtime model without React dependencies: node scripts/test-mockup.mjs */
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const source = (p) => fs.readFileSync(path.join(process.cwd(),p),'utf8');
const dataUri = (s) => 'data:text/javascript;base64,'+Buffer.from(s).toString('base64');
const demoUrl = dataUri(source('src/mockData.js'));
const data = await import(demoUrl);
const apiCode = source('src/api.js').replace(/from '\.\/mockData';/,`from '${demoUrl}';`);
assert.notEqual(apiCode, source('src/api.js'), 'API import must be isolated');
const {api,apiGet,apiPost} = await import(dataUri(apiCode));
let n = 0;
function pass(condition, description) {assert.ok(condition, description); n++}
pass(data.CONTOH_AYAT.length===5, 'five local ayat');
pass(data.CONTOH_PETA.length===5, 'five local peta');
pass(new Set(data.CONTOH_AYAT.map(a=>a.id)).size===5,'unique ayat');
pass(new Set(data.CONTOH_PETA.map(a=>a.id)).size===5,'unique peta');
for(const p of data.CONTOH_PETA) pass(data.CONTOH_AYAT.some(a=>a.id===p.idAyat), 'peta linked to allowed ayat '+p.id);
const all=await api.init();
pass(all.urusan.length===5 && all.format==='ARAS', 'complete hardcoded map list');
const paket=await api.paket('n');
const ids=Object.values(paket.isi.pasal).flatMap(p=>(p.ayat26||[]).map(a=>a.id));
pass(ids.length===5 && ids.every(id=>data.ID_AYAT_DIIZINKAN.has(id)),'only five passages sent');
const allText=await api.naskahTeks();
pass(allText.ayat.length===5, 'only five text bodies searchable');
pass((await api.naskahPasal(1)).ayat26.length===2,'pasal 1');
pass((await api.naskahPasal(2)).ayat26.length===2,'pasal 2');
pass((await api.naskahPasal(3)).ayat26.length===1,'pasal 3');
pass((await api.naskahPasal(4))===null,'other pasal unavailable');
pass((await api.detail('A1.1')).id==='A1.1','valid business detail');
pass((await api.detail('UNLISTED'))===null,'other peta unavailable');
pass((await api.naskahKepatuhan()).butir.length===3,'mockup permen visible');
pass((await api.dasarHukum(data.MOCK_RUJUKAN)).baris.length>0,'aturan sim visible');
pass((await api.dasarHukum('other')).ada===false,'other rules unavailable');
pass((await api.rekapRapat('2026-10-13')).butir.length>0, 'meeting log');
pass((await api.bandingVersi('')).daftar.length===1,'snapshot comparison list');
const turun=await api.naskahTurunan();
pass(turun.dokumen.length===3,'three derived document examples');
pass(Array.isArray(turun.pilihanStatus) && turun.pilihanStatus.length>=3,'status dropdown has options (prevents blank page)');
pass(turun.penetap.every(p=>typeof p==='string'),'valid document issuer options');
for (const d of turun.dokumen) {
  pass(d.baris.length>0 && d.baris.every(b=>data.ID_AYAT_DIIZINKAN.has(b.id)), 'derived docs cite only allowed ayat '+d.id);
  pass(d.urusan.length>0 && d.urusan.every(id=>data.ID_PETA_DIIZINKAN.has(id)), 'derived docs map only allowed peta '+d.id);
  if (d.drafTautan) {
    pass(/^\.\/contoh-dokumen\/dt0[12]\.html$/.test(d.drafTautan), 'document preview uses local link '+d.id);
    pass(fs.existsSync(path.join(process.cwd(),'public',d.drafTautan)), 'offline document exists '+d.id);
  }
}
pass(source('src/pages/TurunanPage.js').includes('T.pilihanStatus.map'), 'original status form retained');
pass((await api.naskahTelaah()).urusan.length===5,'telaah covers all five peta');
pass((await api.naskahHasilRapat()).pilihan.length>0,'meeting results available');
const writes=['saveUrusan','saveJejak','createJejak','savePutusan','saveKembar','saveRedaksi','terapkanRedaksi','saveTurunan','savePutusanPasal','saveHasilRapat','saveCatatanRapat','bekukanVersi'];
for(const act of writes) {
  await assert.rejects(api[act]({id:'A1.1'}),/MOCKUP BACA SAJA/);
  n++;
}
await assert.rejects(apiPost('saveUrusan',{}),/MOCKUP BACA SAJA/);n++;
await assert.rejects(apiGet('readMoreUnlistedAyat'),/Aksi tidak tersedia/);n++;
// Test real link parser and deep-link helper, with hardcoded naskah as its only backing data
const rujukanUrl=dataUri(source('src/utils/rujukan.js'));
const tUrl=dataUri(source('src/utils/telaah.js').replace(/from '\.\/rujukan';/,`from '${rujukanUrl}';`));
const stubNaskah=dataUri(`export const ambilNaskah=()=>({init:${JSON.stringify(data.MOCK_NASKAH_INIT)}});`);
const bCode=source('src/utils/bukaAyat.js')
  .replace(/from '\.\.\/naskah';/,`from '${stubNaskah}';`)
  .replace(/from '\.\/rujukan';/,`from '${rujukanUrl}';`)
  .replace(/from '\.\/telaah';/,`from '${tUrl}';`);
const {bukaIdAyat,bukaRujukan,ambilSasaran}=await import(dataUri(bCode));
let opened=null;
pass(bukaIdAyat('B001.02',p=>{opened=p}) && opened===1 && ambilSasaran().id==='B001.02','permen points at exact ayat');
pass(!bukaIdAyat('B001.99',()=>{}),'unknown ayat cannot open');
pass(bukaRujukan('2026',{pasal:2,ayat:[2]},p=>{opened=p}) && opened===2 && ambilSasaran().id==='B002.02','peta reference selects exact ayat');
// Sanity UI: same primary menu components and both modes remain present
const ui=source('src/App.js');
for(const key of ['NaskahPage','PetaPage','TelaahPage','TurunanPage','DaftarKerjaPage','EditorArasPage','EditorPage','TopBar']) pass(ui.includes(key),'original UI component '+key);
pass(ui.includes('setRuangState') && ui.includes('onRuang={setRuang}'),'both modes selectable');
pass(ui.includes('window.history.back()') && ui.includes('popstate'),'app back navigation present');
const jejak=source('src/components/BarisJejak.js');
pass(!/setTimeout\(\(\)\s*=>\s*kirim/.test(jejak),'no baris jejak autosave timer');
pass(!/setInterval\s*\(/.test(source('src/naskah.js')),'no periodic re-sync timer');
pass(!/indexedDB\./.test(source('src/simpanan.js')),'no local IndexedDB data persistence');
console.log(`LULUS: ${n} uji perilaku mockup (data, navigasi, menu, penolakan tulis)`);
