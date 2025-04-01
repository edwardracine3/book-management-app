import React, { useState, useEffect } from 'react';
import { useBooks } from '../context/BookContext';
import { Book } from '../types/bookTypes';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import apiClient from '../services/api';

const BookForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addBook, updateBook } = useBooks();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    publishedYear: '',
    genre: '',
    pages: '',
  });
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string>('');
  const [error, setError] = useState('');

  const backendUrl = import.meta.env.VITE_API_BASE_IMAGE_URL;

  useEffect(() => {
    if (id) {
      const fetchBook = async () => {
        try {
          const res = await apiClient.get(`/books/${id}`);
          const book: Book = res.data;
          setFormData({
            title: book.title,
            author: book.author,
            description: book.description || '',
            publishedYear: book.publishedYear ? String(book.publishedYear) : '',
            genre: book.genre || '',
            pages: book.pages ? String(book.pages) : '',
          });
          if (book.coverUrl) {
            setCoverPreview(`${backendUrl}${book.coverUrl}`);
          }
        } catch (err) {
          setError('Failed to fetch book details');
        }
      };
      fetchBook();
    }
  }, [id, backendUrl]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCoverFile(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('author', formData.author);
    data.append('description', formData.description);
    data.append('publishedYear', formData.publishedYear);
    data.append('genre', formData.genre);
    data.append('pages', formData.pages);
    if (coverFile) {
      data.append('coverImage', coverFile);
    }
    try {
      if (id) {
        await updateBook(id, data);
      } else {
        await addBook(data);
      }
      navigate('/dashboard');
    } catch (err: any) {
      setError('Failed to save book');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 text-center">{id ? 'Edit Book' : 'Add Book'}</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Two-column grid for most inputs */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Input 
              label="Title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <Input 
              label="Author"
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
            />
            <Input 
              label="Published Year"
              type="number"
              name="publishedYear"
              value={formData.publishedYear}
              onChange={handleChange}
            />
          </div>
          <div>
            <Input 
              label="Genre"
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
            />
            <Input 
              label="Pages"
              type="number"
              name="pages"
              value={formData.pages}
              onChange={handleChange}
            />
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Cover Image</label>
              <input type="file" onChange={handleFileChange} />
            </div>
            {/* Show cover preview if available */}
            {coverPreview && (
              <div className="mb-4">
                <img src={coverPreview} alt="Cover Preview" className="h-32 w-auto object-cover" />
              </div>
            )}
          </div>
        </div>

        {/* Full-width textarea for description */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows={4}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-center space-x-4">
          <Button type="submit">{id ? 'Update Book' : 'Add Book'}</Button>
          <Button type="button" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;
