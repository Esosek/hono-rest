# Hono REST API + React Client

## About

This project is a proof of concept for an OpenAPI-compliant **REST API backend built with Hono**, paired with a simple React frontend to test the Hono RPC client.

## Features

- Example backend API with CRUD endpoints
- **Zod** schema validation for requests and responses
- Auto-generated **OpenAPI documentation**
- **Hono RPC client** integration for the frontend
- **Prisma ORM** for database management

---

## How to Run the Server

1. Install dependencies:
   `npm install`

2. Set up Prisma:

   ```
   npm run generate
   npm run migrate
   npm run prisma:seed
   ```

3. Start the server:
   `npm run dev`

---

## How to Run the Client

1. Install dependencies:
   `npm install`

2. Start the client:
   `npm run dev`

---

## API Documentation

The API documentation is available at:
http://localhost:3000/docs

---

## Technologies Used

| Area     | Technologies                                 |
| -------- | -------------------------------------------- |
| Backend  | [Hono](https://hono.dev/), Prisma, npm       |
| Frontend | React, Vite, [PicoCSS](https://picocss.com/) |
| Database | SQLite                                       |
| API Docs | OpenAPI (Swagger UI)                         |
