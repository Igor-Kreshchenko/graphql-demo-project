import { movies, authors } from './data.js';

export const resolvers = {
    Query: {
        movies: () => movies,
        authors: () => authors,
        movie: (_, args) => movies.find((movie) => movie.id === args.id),
        author: (_, args) => authors.find((author) => author.id === args.id),
        moviesByYear: (_, args) => movies.filter((movie) => movie.year === args.year),
        topRatedMovies: (_, args) => movies.filter((movie) => movie.rating >= args.minRating),
    },
    Movie: {
        author: (parent) => authors.find((author) => author.id === parent.authorId),
    },
    Author: {
        movies: (parent) => movies.filter((movie) => movie.authorId === parent.id),
    },
    Mutation: {
        addMovie: (_, args) => {
            const newMovie = {
                id: String(movies.length + 1),
                title: args.title,
                filmed: args.filmed,
                year: args.year,
                rating: args.rating,
                authorId: args.authorId,
            };
            movies.push(newMovie);
            return newMovie;
        },
        deleteMovie: (_, args) => {
            const index = movies.findIndex((movie) => movie.id === args.id);
            if (index !== -1) {
                movies.splice(index, 1);
                return true;
            }
            return false;
        },
        updateMovie: (_, args) => {
            const movie = movies.find((movie) => movie.id === args.id);
            if (movie) {
                if (args.title !== undefined) movie.title = args.title;
                if (args.filmed !== undefined) movie.filmed = args.filmed;
                if (args.year !== undefined) movie.year = args.year;
                if (args.rating !== undefined) movie.rating = args.rating;
                if (args.authorId !== undefined) movie.authorId = args.authorId;
                return movie;
            }
            return null;
        },
    },
}