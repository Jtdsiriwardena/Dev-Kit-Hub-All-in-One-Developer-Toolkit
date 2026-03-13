# 🚀 Dev-Kit-Hub — All-in-One Developer Toolkit

A full-stack web application providing developers with essential utility tools in a centralized, secure, and user-friendly environment.

> Built with Next.js, NestJS, MongoDB — demonstrating real-world implementation of modern full-stack architecture.

---

![Image Alt](https://github.com/Jtdsiriwardena/Dev-Kit-Hub-All-in-One-Developer-Toolkit/blob/7a003669ffa0f558720d1d9da0defee2ef698407/Home_page.png) 

## 📌 Project Overview

Dev-Kit-Hub allows users to:

- Register and authenticate securely using **JWT**
- Access a suite of **developer-focused utility tools** from one place

The project demonstrates real-world implementation of authentication, authorization, REST APIs, database integration, and modern UI development.

---

## 🔧 Core Utilities

| # | Tool | Description |
|---|---|---|
| 1 | **JSON Beautifier** | Format, validate, and highlight JSON data |
| 2 | **UUID Generator** | Generate RFC-compliant UUIDs |
| 3 | **Slug Generator** | Create SEO-friendly URL slugs from any text |
| 4 | **Regex Tester** | Test and debug regular expressions in real time |
| 5 | **API Tester** | Send custom API requests and view responses |
| 6 | **Base64 Encoder/Decoder** | Encode/decode strings and files |
| 7 | **JWT Decoder** | Decode and validate JWTs securely |
| 8 | **Color Converter** | Convert between HEX, RGB, and HSL formats |
| 9 | **Timestamp Converter** | Convert Unix timestamps to readable dates |
| 10 | **Password Generator** | Create secure, customizable passwords |
| 11 | **Hash Generator** | Generate MD5, SHA-1, and SHA-256 hashes |
| 12 | **URL Encoder/Decoder** | Encode and decode URLs safely |

---

## 🔐 Authentication System

- User registration with input validation
- Secure password hashing using **bcrypt**
- JWT-based login authentication
- Protected API routes via **Bearer Token** authorization
- Profile data fetched securely using token validation

---

## 🛠 Tech Stack

### 🖥 Frontend
| Technology | Purpose |
|---|---|
| Next.js 16 (App Router) | React framework with SSR/SSG |
| React 19 | Component-based UI |
| TypeScript | Type-safe development |
| Tailwind CSS v4 | Utility-first styling |

### ⚙️ Backend
| Technology | Purpose |
|---|---|
| NestJS v11 | Scalable Node.js framework |
| MongoDB + Mongoose v9 | Database & ODM |
| Passport + @nestjs/jwt | JWT authentication strategy |
| bcrypt | Password hashing |

### 🗄️ Database
| Technology | Details |
|---|---|
| MongoDB | Primary database |
| User Schema | Role-based support |

---

## 🏗 System Architecture

```
     Client (Next.js App Router)
              │
         Axios / Fetch
              │
              ▼
       NestJS REST API
              │
     ┌────────┴────────┐
     ▼                 ▼
JWT Auth Guard     Controllers
     │                 │
     ▼                 ▼
Passport Strategy   Services
                      │
                      ▼
                   MongoDB
               (Mongoose ODM)
```

---

## ⚙️ Installation

**1. Clone the repository**

```bash
git clone https://github.com/yourusername/dev-kit-hub.git
```

**2. Install dependencies**

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

---

## 🔑 Environment Variables

### Backend — create a `.env` file in `/backend`:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRY=7d
```

### Frontend — create a `.env.local` file in `/frontend`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

---

## ▶️ Running the Application

**Start the backend**

```bash
cd backend
npm run start:dev
```

**Start the frontend**

```bash
cd frontend
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

---

## 🧪 Running Tests

```bash
cd backend
npm test

```

---


## 📸 Screenshots

### Dashboard & Tools

**Regex Tester**

![Image Alt](https://github.com/Jtdsiriwardena/Dev-Kit-Hub-All-in-One-Developer-Toolkit/blob/c6f22a139adc35b9a79a8f850437883948d80d92/Regex_tester.png) 

**JSON Beautifier**

![Image Alt](https://github.com/Jtdsiriwardena/Dev-Kit-Hub-All-in-One-Developer-Toolkit/blob/c6f22a139adc35b9a79a8f850437883948d80d92/Json_beautifier.png) 

**Uuid Generator**

![Image Alt](https://github.com/Jtdsiriwardena/Dev-Kit-Hub-All-in-One-Developer-Toolkit/blob/c6f22a139adc35b9a79a8f850437883948d80d92/Uuid_generator.png) 

**Base64 Encoder Decoder**

![Image Alt](https://github.com/Jtdsiriwardena/Dev-Kit-Hub-All-in-One-Developer-Toolkit/blob/c6f22a139adc35b9a79a8f850437883948d80d92/Base64_encoder_decoder.png) 

---

---
