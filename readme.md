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

### 1. Tambah Barang (POST)
**Request**
```http
POST /api/items
Content-Type: application/json
{
  "name": "Nike Air Max",
  "brand": "Nike",
  "owner_name": "Budi Santoso",
  "note": "Cuci + Repaint"
}
```
**Response**
```
{
  "id": 12,
  "name": "Nike Air Max",
  "brand": "Nike",
  "owner_name": "Budi Santoso",
  "status": "Dalam Proses",
  "note": "Cuci + Repaint",
  "date_in": "2025-10-21T07:00:00.000Z",
  "created_at": "2025-10-21T07:00:00.000Z"
}
```
### 2. Barang Masuk
**Request**
```http
POST /api/items/12/masuk
```
**Response**
```
{
  "message": "Barang telah masuk",
  "item": {
    "id": 12,
    "status": "Masuk",
    "date_in": "2025-10-21T07:10:00.000Z"
  }
}
```
### 3. Barang Keluar
**Request**
```http
POST /api/items/12/keluar
```
**Response**
```
{
  "message": "Barang telah keluar",
  "item": {
    "id": 12,
    "status": "Keluar",
    "date_out": "2025-10-21T08:00:00.000Z"
  }
}
```
### 4. Ambil Semua Barang
**Request**
```http
GET /api/items
```
**Response**
```
[
  {
    "id": 12,
    "name": "Nike Air Max",
    "status": "Dalam Proses",
    "owner_name": "Budi Santoso"
  }
]
```
### 5. Filter Status
**Request**
```http
GET /api/items?status=Keluar
```
**Response**
```
[
  {
    "id": 15,
    "name": "Converse All Star",
    "status": "Keluar",
    "owner_name": "Rian Nugraha"
  }
]
```
### 6. Hapus Barang
**Request**
```http
DELETE /api/items/12
```
**Response**
```
{ "message": "Item berhasil dihapus" }
```

🧩 Struktur Folder Proyek
```
shoe-laundry-api/
├── api/
│   └── index.js          # Entry point untuk Vercel
├── src/
│   ├── app.js            # Setup Express App
│   ├── db/
│   │   └── supabaseClient.js
│   └── routes/
│       └── items.js
├── package.json
├── vercel.json
├── .env
└── README.md
```
⚙️ Instalasi & Menjalankan Secara Lokal
1️⃣ Clone Repository
git clone https://github.com/batisszz/shoes-laundry-rest-api.git
cd shoes-laundry-api

2️⃣ Install Dependencies
npm install

3️⃣ Setup Environment Variables

Buat file .env dan isi:
```
SUPABASE_URL=https://imzbdqwqmhvvfrcwhnwy.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltemJkcXdxbWh2dmZyY3dobnd5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDk5NjYxOCwiZXhwIjoyMDc2NTcyNjE4fQ.uN_z1dsjXUQpBzwg1NF-aerXEr4hjB5DjAWLtXOU_cw
```
PORT=3000

4️⃣ Jalankan Server
npm run dev

API akan berjalan di:
👉 http://localhost:3000

🌐 Deploy ke Vercel
1. Commit proyek ke GitHub.
2. Buka Vercel Dashboard
3. Import repository dari GitHub.
4. Tambahkan variabel environment di menu Project Settings → Environment Variables:
```
SUPABASE_URL=https://imzbdqwqmhvvfrcwhnwy.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltemJkcXdxbWh2dmZyY3dobnd5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDk5NjYxOCwiZXhwIjoyMDc2NTcyNjE4fQ.uN_z1dsjXUQpBzwg1NF-aerXEr4hjB5DjAWLtXOU_cw
```
5. Klik Deploy 🚀
