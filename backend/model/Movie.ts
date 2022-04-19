import { model, Schema, Model, Document } from 'mongoose';

interface IMovie extends Document {
    title: string,
    year: number,
    director: string,
    genres: [string],
    description: string,
    poster: string,
    length: string,
    stars: [string],
  }
  
const MovieSchema: Schema = new Schema({
    title: { type: String, required: true },
    year: { type: String, required: true },
    director: { type: String, required: false },
    genres: { type: [], required: false },
    description: { type: String, required: false },
    poster: { type: String, required: false },
    length: { type: String, required: false },
    stars: { type: [], required: false}
  });
  
const Movie: Model<IMovie> = model('Movie', MovieSchema);

export default Movie;
