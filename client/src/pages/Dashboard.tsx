import React from 'react';
import { useBooks } from '../context/BookContext';
import { Book } from '../types/bookTypes';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import defaultImage from '../assets/no-cover.png';


const Dashboard: React.FC = () => {
  const { books, deleteBook } = useBooks();
  const { logout } = useAuth();
  const backendUrl = import.meta.env.VITE_API_BASE_IMAGE_URL;

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      deleteBook(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex justify-between items-center p-4 bg-white shadow">
        <h1 className="text-xl font-bold">Book Management Dashboard</h1>
        <Button onClick={logout}>Logout</Button>
      </header>
      <main className="p-4">
        <div className="mb-4 flex justify-end">
          <Link to="/book/new">
            <Button>Add Book</Button>
          </Link>
        </div>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Cover</th>
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Author</th>
              <th className="py-2 px-4 border-b">Published Year</th>
              <th className="py-2 px-4 border-b">Genre</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book: Book) => (
              <tr key={book._id}>
              <td className="py-2 px-4 border-b">
              <img
                src={book.coverUrl ? `${backendUrl}${book.coverUrl}` : defaultImage}
                alt={book.title}
                className="h-16 w-12 object-cover"
              />
            </td>
                <td className="py-2 px-4 border-b">{book.title}</td>
                <td className="py-2 px-4 border-b">{book.author}</td>
                <td className="py-2 px-4 border-b">{book.publishedYear}</td>
                <td className="py-2 px-4 border-b">{book.genre}</td>
                <td className="py-2 px-4 border-b">
                  <Link to={`/book/edit/${book._id}`}>
                    <Button>Edit</Button>
                  </Link>
                  <Button onClick={() => handleDelete(book._id)}   className="ml-2 bg-red-500 hover:bg-red-700">
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Dashboard;
