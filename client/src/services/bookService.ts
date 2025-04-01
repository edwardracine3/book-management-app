import apiClient from './api';

export const getBooks = async () => {
  return apiClient.get('/books');
};

export const createBook = async (bookData: FormData) => {
  return apiClient.post('/books', bookData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const updateBook = async (id: string, bookData: FormData) => {
  return apiClient.put(`/books/${id}`, bookData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const deleteBook = async (id: string) => {
  return apiClient.delete(`/books/${id}`);
};
