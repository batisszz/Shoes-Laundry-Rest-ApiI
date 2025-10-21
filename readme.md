# 🧼 Shoe Laundry API

REST API sederhana untuk layanan **Cuci Sepatu** menggunakan **Node.js + Express.js** dan **Supabase** sebagai database.  
API ini mendukung operasi CRUD penuh serta fitur tambahan untuk **barang masuk** dan **barang keluar**.

---

## 🚀 Tujuan Proyek

Proyek ini dibuat untuk:
- Menyediakan layanan backend REST API untuk manajemen data sepatu yang sedang dicuci.
- Mendukung integrasi dengan frontend (React, mobile app, dll).
- Menjadi contoh implementasi **Express.js + Supabase** yang mudah di-deploy ke **Vercel**.

---

## ✨ Fitur Utama

| Fitur | Deskripsi |
|-------|------------|
| **Tambah data sepatu** | Menyimpan data sepatu baru yang akan dicuci. |
| **Lihat semua data** | Menampilkan daftar semua sepatu yang sedang/selesai dicuci. |
| **Update data** | Mengubah status atau keterangan sepatu. |
| **Hapus data** | Menghapus data sepatu tertentu. |
| **Filter status** | Mendapatkan data berdasarkan status, misalnya `Selesai`, `Dalam Proses`, `Keluar`. |
| **Barang Masuk / Keluar** | Menandai sepatu saat diterima (`Masuk`) dan saat diambil pelanggan (`Keluar`). |

---

## 🧱 Struktur Data (Tabel Supabase)

Tabel: `items`

| Kolom | Tipe Data | Deskripsi |
|-------|------------|-----------|
| `id` | `int8` | Primary key |
| `name` | `text` | Nama sepatu |
| `brand` | `text` | Merek sepatu |
| `owner_name` | `text` | Nama pemilik |
| `status` | `text` | Status: `Masuk`, `Dalam Proses`, `Selesai`, `Keluar` |
| `note` | `text` | Catatan tambahan |
| `date_in` | `timestamptz` | Waktu barang diterima |
| `date_out` | `timestamptz` | Waktu barang keluar |
| `created_at` | `timestamptz` | Waktu data dibuat |
| `updated_at` | `timestamptz` | Waktu data terakhir diubah |

---

## 🧠 Contoh Request & Response

### 1️⃣ Tambah Barang (POST)
**Request**
```http
POST /api/items
Content-Type: application/json
