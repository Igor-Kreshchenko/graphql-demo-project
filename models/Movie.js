import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: String,
  filmed: Boolean,
  year: Number,
  rating:Number,
  authorId: { type: mongoose.Types.ObjectId, ref: 'Author' },
});

export const MovieModel = mongoose.model('Movie', movieSchema);
