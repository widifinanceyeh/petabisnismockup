# Peta Bisnis UNEKA — Mockup Interaktif Offline

Repo demonstrasi dari UI asli v5.21.0: **Mode Kerja dan Mode Rapat**, seluruh menu, tabel, navigasi, alat rapat, form dan panel tetap diikutkan. Hanya dataset contoh yang digunakan (5 ayat rancangan, 5 peta bisnis). **Setiap aksi simpan, autosave, dan penerapan ke Google Docs diblokir pada lapisan API**. Ketikan form hanya simulasi sementara; tidak disimpan ke dokumen, Sheets, IndexedDB, atau cache draf. Preferensi tampilan tetap bisa diingat di browser. Klik tombol Simpan menampilkan penolakan; bukan keberhasilan.

* Klik rujukan ayat dalam pita peta / daftar hasil cari untuk membuka Pasal dan menyorot ayat. Tombol Kembali menggunakan riwayat navigasi aplikasi.
* Panel Dasar Hukum serta Butir Permen memuat teks SIMULASI dan **bukan bunyi aturan resmi**. Bukalah melalui Naskah > Dasar Hukum atau Periksa > Butir Permen.
* Data di `src/mockData.js` merupakan fiktif. Google Sheets, Apps Script dan Google Docs asli **tidak diakses**.
* Mode Kerja/Rapat masih membedakan fitur UI seperti aplikasi semula; aksi perubahan tidak dapat disimpan.

Lihat `PANDUAN_PEMASANGAN.md` untuk GitHub Pages dan pengujian.
