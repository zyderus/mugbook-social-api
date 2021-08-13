<div align="center">
  <h2>Mugbook Social API</h2>
  <strong>Version 0.1.0</strong>
</div>

<p align="center">
  🚀 Entrypoint @ https://mugbook-social-api.herokuapp.com | hosted with <a href="https://id.heroku.com/">Heroku</a>
</p>

## Description

API endpoints for Mugbook Social media app. It handles local login and registration, user dashboard, add friends, view timeline and manage posts.

## Tech

Typescript, Express, Mongoose, MongoDB

## Getting Started

### 🛠 Installation & Set Up

1. Installation

   ```sh
   npm install
   ```

2. Run the development server

   ```sh
   npm run dev
   ```

3. Run Sever

   ```sh
   npm start
   ```

### API Endpoints

```sh
post: /api/auth/register
```

```sh
post: /api/auth/login
```

```sh
get: /api/users/:id
```

```sh
put: /api/users/:id
```

```sh
delete: /api/users/:id
```

```sh
put: /api/users/:id/follow
```

```sh
put: /api/users/:id/unfollow
```

```sh
post: /api/posts
```

```sh
get: /api/posts/:id
```

```sh
put: /api/posts/:id
```

```sh
delete: /api/posts/:id
```

```sh
put: /api/posts/:id/like
```

```sh
get: /api/posts/timeline/show
```

## Contributors

- Rustam Ziyadov

## License & copyright

&copy; Rustam Ziyadov
