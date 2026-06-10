# Obscure Hollywood

> Documentation for the **Node.js backend** of [obscurehollywood.net](https://obscurehollywood.net).

## About

### Description

`obscurehollywood.com` is a content-driven website that features reviews, research and commentary about little-known Hollywood films and artists, particularly of the silent and early sound eras, that are worth revisiting. This application is a REST API handling requests various data types, including full-text documents with HTML, entity (film, people) metadata, and relational data.

### Tech Stack

- Language: `TypeScript`
- Framework: `NestJS`
- Database: `PostgreSQL`
- ORM: `TypeORM`
- Lint &amp; Format: `ESLint`, `Prettier`, `Husky`
- Testing: `Vitest`
- Logging: `NestJS`, `Sentry`
- Deploy: `Heroku`

## Endpoints

The API exposes the following routes:

```
/articles
/features
/films
/people
/quiz
/studios
/tags
/users
```

Complete documentation of all endpoints with request and response DTOs, and response schemas, is available at the Swagger API documentation site.

## Security

- **CORS**: restricts resource sharing.
- **Helmet**: adds security headers to HTTP responses.
- **Rate Limiter**: throttles incoming request speeds.

## Additional Information

### Links

- [Frontend repository](https://github.com/tdkent/ObscureHollywood-Frontend)
- [Visit obscurehollywood.net](https://obscurehollywood.net)

### Local Development

> How to run the application locally. Requires Node and PostgreSQL.

#### Requirements

- Node.js installed
- PostgreSQL access
  - Connection string

#### Environment variables

```txt
DATABASE_URL=<db connection string>
FRONTEND_URL=<local dev site or prod url>
SENTRY_DSN=<sentry dsn string>
```

#### Installation steps

```bash
# Install deps
npm install

# Run app in dev mode
npm run start:dev

# Access Swagger Documentation Site
http://localhost:3000/api

# Format and lint
npm run format
npm run lint

# Run tests
npm run test
npm run test:watch # tests in watch more

# Build and run prod site
npm run build
npm run start
```
