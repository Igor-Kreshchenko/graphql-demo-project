import { movies, authors } from './data.js';

export const resolvers = {
    Query: {
        movies: () => movies,
        authors: () => authors,
        movie: (_, args) => movies.find((movie) => movie.id === args.id),
        author: (_, args) => authors.find((author) => author.id === args.id),
    }
}