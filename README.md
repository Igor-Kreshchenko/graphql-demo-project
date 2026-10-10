# GraphQL Demo Project

A small full-stack movie catalog demonstrating a GraphQL API backed by MongoDB and a React client that consumes the API with Apollo Client.

The project has two parts:

- **API** — Node.js, Apollo Server, GraphQL, and Mongoose. It serves movie and author data and supports movie mutations.
- **Web app** — React and Vite. It queries the API for movies and displays each movie's title, year, rating, and author.

## Features

- Query movies and authors, or retrieve an individual movie or author by ID.
- Filter movies by year.
- Create, update, and delete movies.
- Resolve relationships between movies and their authors, and authors and their movies.
- Display movie data in a browser using Apollo Client.

The GraphQL schema also declares a `topRatedMovies(minRating: Float!)` query. Its resolver currently reads an argument named `rating` instead of `minRating`, so this query may not filter results as intended.

## Requirements

- Node.js 20.19+ or 22.12+
- npm
- A MongoDB instance (local or hosted)

## Setup

Clone the repository and install the API dependencies from the project root:

```sh
git clone https://github.com/Igor-Kreshchenko/graphql-demo-project.git
cd graphql-demo-project
npm install
```

Configure the MongoDB connection string in a root-level `.env` file:

```dotenv
DB_CONNECTION_STRING=mongodb://127.0.0.1:27017/graphql-demo-project
```

Replace the value with your MongoDB connection string if you use a different local setup or a hosted database. The `.env` file is ignored by Git; do not commit database credentials.

Install the web app dependencies in a separate terminal:

```sh
cd app
npm install
```

## Run locally

Start MongoDB first. Then, from the repository root, start the GraphQL API:

```sh
node index.js
```

The API connects to MongoDB and listens at **http://localhost:4000/**. Open that URL to explore and run GraphQL operations in Apollo Server's landing page.

In a second terminal, start the React development server:

```sh
cd app
npm run dev
```

Open the local URL printed by Vite (usually **http://localhost:5173/**). The web app sends GraphQL requests to `http://localhost:4000/`.

## GraphQL API

The schema is defined in `schema.js`, with its operations implemented in `resolvers.js`.

### Queries

- `movies` — list all movies.
- `authors` — list all authors.
- `movie(id: ID!)` — find a movie by its ID.
- `author(id: ID!)` — find an author by their ID.
- `moviesByYear(year: Int!)` — list movies released in a given year.
- `topRatedMovies(minRating: Float!)` — declared to find movies at or above a rating; see the resolver note in [Features](#features).

Example query:

```graphql
query {
  movies {
    id
    title
    year
    rating
    author {
      name
    }
  }
}
```

### Mutations

- `addMovie(title, filmed, year, rating, authorId)` — create a movie associated with an author.
- `updateMovie(id, title, filmed, year, rating, authorId)` — update a movie by ID.
- `deleteMovie(id)` — delete a movie by ID; returns `true` if a movie was deleted and `false` otherwise.

## Project structure

```text
.
├── index.js              # Apollo Server startup and MongoDB connection
├── schema.js             # GraphQL type definitions
├── resolvers.js          # Queries, mutations, and relationship resolvers
├── models/
│   ├── Author.js         # Mongoose author model
│   └── Movie.js          # Mongoose movie model
└── app/
    ├── src/
    │   ├── App.jsx       # Movie query and page rendering
    │   └── main.jsx      # React entry point and Apollo Client setup
    └── package.json      # Web app scripts and dependencies
```

## Available scripts

Run these commands from the relevant directory:

| Directory | Command | Purpose |
| --- | --- | --- |
| `app/` | `npm run dev` | Start the Vite development server. |
| `app/` | `npm run build` | Build the web app for production into `app/dist/`. |
| `app/` | `npm run preview` | Preview the production build locally. |
| `app/` | `npm run lint` | Run ESLint on the web app. |

The root `package.json` does not currently define an API start script, so start the API with `node index.js`. Its `npm test` script is a placeholder and does not run a test suite.
