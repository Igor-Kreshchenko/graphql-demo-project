import { MovieModel } from './models/Movie.js';
import { AuthorModel } from './models/Author.js';

export const resolvers = {
  Query: {
    movies: async () => await MovieModel.find(),
    authors: async () => await AuthorModel.find(),
    movie: async (_, { id }) => await MovieModel.findById(id),
    author: async (_, { id }) => await AuthorModel.findById(id),
    moviesByYear: async (_, { year }) => await MovieModel.find({ year: year }),
    topRatedMovies: async (_, { rating }) =>
      await MovieModel.find({ rating: { $gte: rating } }).sort({
        rating: -1,
      }),
  },
  Movie: {
    author: async parent => await AuthorModel.findById(parent.authorId),
  },
  Author: {
    movies: async parent => await MovieModel.find({ authorId: parent._id }),
  },
  Mutation: {
    addMovie: async (_, { title, filmed, year, rating, authorId }) => {
      const newMovie = new MovieModel({
        title,
        filmed,
        year,
        rating,
        authorId,
      });
      await newMovie.save();
      return newMovie;
    },
    deleteMovie: async (_, { id }) => {
      const result = await MovieModel.findByIdAndDelete(id);
      return result ? true : false;
    },
    updateMovie: async (_, { id, ...args }) => {
      const movie = await MovieModel.findByIdAndUpdate(id, args, { new: true });
      return movie;
    },
  },
};
