# API Dokumentasi Manajemen Antrian Klinik Online

<!-- endpoint register -->

## Endpoint: POST /api/auth/register

### Request Headers

```http
Content-Type: application/json
```

**Request Body**

```json
{
  "name": "your name",
  "username": "your username",
  "password": "your password"
}
```

**Response (200 - success)**

```json
{
  "message": "Registrasi berhasil"
}
```

**Response (400 - error)**

```json
{
  "message": "error message"
}
```

<!-- endpoint login -->

## Endpoint: POST /api/auth/login

### Request Headers

```http
Content-Type: application/json
```

**Request Body**

```json
{
  "username": "your username",
  "password": "your password"
}
```

**Response (200 - success)**

```json
{
  "message": "Login berhasil",
  "token": "secret token"
}
```

**Response (400 - error)**

```json
{
  "message": "error message"
}
```

<!-- route admin -->

<!-- endpoint admin dashboard -->

# Admin Routes

## Endpoint: GET api/admin/dashboard

### Request Headers

```http
Authorization: Bearer <your_jwt_token>
```

**Response (200 - success)**

```json
{
  "message": "Berhasil mengambil data",
  "data": {
    "totalUsers": totalUsers,
    "totalQueues": totalQueues
  }
}
```

<!-- endpoint admin queues -->

## Endpoint: GET api/admin/dashboard/queues

### Request Headers

```http
Authorization: Bearer <your_jwt_token>
```

**Response (200 - success)**

```json
{
  "message": "Data antrian berhasil diambil",
  "data": [
    {
      "_id": "68ae84c592...",
      "userId": "68adc67a3...",
      "nama": "nama",
      "keluhan": "keluhan",
      "status": "Dipanggil",
      "tanggalAntri": "2025-08-27",
      "nomorAntri": 1
    }
  ]
}
```

<!-- endpoint admin update queues -->

## Endpoint: PATCH api/admin/dashboard/queues/edit/:id

### Request Headers

```http
Content-Type: application/json
Authorization: Bearer <your_jwt_token>
```

**Request Body**

```json
{
  "status": "Antri, Dipanggil, Selesai, Batal"
}
```

**Response (200 - success)**

```json
{
  "message": "Status antrian berhasil diperbarui"
}
```

**Response (400 - error)**

```json
{
  "message": "error message"
}
```

**Response (404 - error not found)**

```json
{
  "message": "error message"
}
```

<!-- endpoint admin delete -->

## Endpoint: DELETE api/admin/dashboard/queues/:id

### Request Headers

```http
Authorization: Bearer <your_jwt_token>
```

**Response (200 - success)**

```json
{
  "message": "Antrian berhasil dihapus"
}
```

<!-- user route -->

# User Routes

## Endpoint: GET api/patient/queues

### Request Headers

```http
Authorization: Bearer <your_jwt_token>
```

**Response (200 - success)**

```json
{
  "message": "Data antrian berhasil diambil",
  "data": [
    {
      "_id": "68ae7c7699....",
      "userId": "68adc67a3...",
      "nama": "nama",
      "keluhan": "pusing",
      "status": "Antri",
      "tanggalAntri": "2025-08-28",
      "nomorAntri": 1
    }
  ]
}
```

**Response (400 - error)**

```json
{
  "message": "error message"
}
```

<!-- endpoint create queues -->

## Endpoint: POST api/patient/queues/add

### Request Headers

```http
Content-Type: application/json
Authorization: Bearer <your_jwt_token>
```

**Request Body**

```json
{
  "nama": "nama",
  "keluhan": "pusing",
  "tanggalAntri": "2025-08-27"
}
```

**Response (200 - success)**

```json
{
  "message": "Antrian berhasil dibuat"
}
```

**Response (400 - error)**

```json
{
  "message": "error message"
}
```
