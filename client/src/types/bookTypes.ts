export interface Book {
  _id: string;
  title: string;
  author: string;
  description?: string;
  publishedYear?: number;
  genre?: string;
  coverUrl?: string;
  pages?: number;
}

export interface BookFormData extends FormData {
  append(name: keyof Book, value: string | Blob, fileName?: string): void;
}