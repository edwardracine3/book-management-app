import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import apiClient from '../services/api';
import { useAuth } from './AuthContext';

import { Book } from '../types/bookTypes';

export interface BookContextType {
  books: Book[];
  fetchBooks: () => Promise<void>;
  addBook: (bookData: FormData) => Promise<void>;
  updateBook: (id: string, bookData: FormData) => Promise<void>;
  deleteBook: (id: string) => Promise<void>;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const BookProvider = ({ children }: { children: ReactNode }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const { token } = useAuth();

  const fetchBooks = async () => {
    try {
      const res = await apiClient.get('/books');
      setBooks(res.data);
    } catch (error) {
      console.error('Error fetching books', error);
    }
  };

  const addBook = async (bookData: FormData) => {
    try {
      const res = await apiClient.post('/books', bookData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setBooks(prev => [...prev, res.data]);
    } catch (error) {
      console.error('Error adding book', error);
    }
  };

  const updateBook = async (id: string, bookData: FormData) => {
    try {
      const res = await apiClient.put(`/books/${id}`, bookData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setBooks(prev => prev.map(book => (book._id === id ? res.data : book)));
    } catch (error) {
      console.error('Error updating book', error);
    }
  };

  const deleteBook = async (id: string) => {
    try {
      await apiClient.delete(`/books/${id}`);
      setBooks(prev => prev.filter(book => book._id !== id));
    } catch (error) {
      console.error('Error deleting book', error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchBooks();
    }
  }, [token]);

  return (
    <BookContext.Provider value={{ books, fetchBooks, addBook, updateBook, deleteBook }}>
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
};
