import mongoose, { Document, Schema } from 'mongoose';

export interface IBook extends Document {
  title: string;
  author: string;
  description?: string;
  publishedYear?: number;
  genre?: string;
  coverUrl?: string;
  pages?: number;
  userId: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const BookSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String },
    publishedYear: { type: Number },
    genre: { type: String },
    coverUrl: { type: String },
    pages: { type: Number },
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    }
  },
  { timestamps: true }
);

export default mongoose.model<IBook>('Book', BookSchema);