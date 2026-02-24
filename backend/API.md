# API Reference

Base URL: `http://localhost:8000`

## Authentication

All protected endpoints require a Bearer token in the `Authorization` header:

```
Authorization: Bearer <token>
```

Tokens expire after **30 minutes**.

---

## Auth `/auth`

### POST `/auth/user/create`

```
http://localhost:8000/auth/user/create
```

Create a new user. No auth required.

**Body:**

```json
{
  "name": "Ola Nordmann",
  "email": "ola@example.com",
  "password": "secret"
}
```

**Response:** `201 Created`

---

### POST `/auth/token`

```
http://localhost:8000/auth/token
```

Login and receive a JWT token. Uses OAuth2 form data.

**Body (form-data):**
| Field | Value |
|----------|----------------|
| username | user@email.com |
| password | secret |

**Response:** `200 OK`

```json
{
  "access_token": "eyJ...",
  "token_type": "bearer"
}
```

---

## Sites & Stations `/get`

### GET `/get/site` 🔒

```
http://localhost:8000/get/site
```

Get all sites the authenticated user has access to.

**Response:** `200 OK`

```json
[
  {
    "site_id": 1,
    "name": "Site Name",
    "location": "Oslo",
    "station_count": 3,
    "stations": [
      {
        "station_id": 1,
        "site_id": 1,
        "name": "Station A",
        "location_description": "North wing"
      }
    ]
  }
]
```

---

### GET `/get/site/{site_id}/station` 🔒

```
http://localhost:8000/get/site/1/station
```

**Path params:**
| Param | Type | Description |
|---------|------|-------------|
| site_id | int | Site ID |

**Response:** `200 OK`

```json
[
  {
    "station_id": 1,
    "site_id": 1,
    "name": "Station A",
    "location_description": "North wing"
  }
]
```

**Errors:** `403 Forbidden`, `404 Not Found`

---

## Measurements

### GET `/get/site/{site_id}/measurements` 🔒

```
http://localhost:8000/get/site/1/measurements
```

All measurements across all stations for a site. Sorted newest first.

**Path params:**
| Param | Type | Description |
|---------|------|-------------|
| site_id | int | Site ID |

**Response:** `200 OK`

```json
[
  {
    "measurement_id": 1,
    "value": 42.5,
    "unit_id": 1,
    "type": "Manual",
    "time": "2026-02-24T10:00:00",
    "station_id": 2
  }
]
```

**Errors:** `403 Forbidden`, `404 Not Found`

---

### GET `/get/site/{site_id}/station/{station_id}/measurements` 🔒

```
http://localhost:8000/get/site/1/station/1/measurements
```

Measurements for a specific station. Sorted newest first.

**Path params:**
| Param | Type | Description |
|------------|------|-------------|
| site_id | int | Site ID |
| station_id | int | Station ID |

**Response:** `200 OK` — same shape as above

**Errors:** `403 Forbidden`, `404 Not Found`

---

### POST `/post/site/{site_id}/station/{station_id}/measurement` 🔒 Admin only

```
http://localhost:8000/post/site/1/station/1/measurement
```

Add a manual measurement. Requires `Admin` role on the site.

**Path params:**
| Param | Type | Description |
|------------|------|-------------|
| site_id | int | Site ID |
| station_id | int | Station ID |

**Body:**

```json
{
  "value": 42.5,
  "unit_id": 1
}
```

**Response:** `201 Created`

**Errors:** `403 Forbidden`

---

## Units

### GET `/get/units`

```
http://localhost:8000/get/units
```

Fetch all available units. No auth required.

**Response:** `200 OK`

```json
[
  {
    "unit_id": 1,
    "unit": "kg",
    "emission": "CO2"
  }
]
```
