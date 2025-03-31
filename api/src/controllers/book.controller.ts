import { Request, Response } from 'express';
import { Book } from '../models';
import fs from 'fs';
import path from 'path';

// Get all books for the current user
export const getBooks = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const books = await Book.find({ userId });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error });
  }
};

// Get a single book by ID
export const getBookById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;
    
    // let findby one
    const book = await Book.findOne({ _id: id, userId });
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching book', error });
  }
};

// Create a new book
export const createBook = async (req: Request, res: Response) => {
  try {
    const { title, author, description, publishedYear, genre, pages } = req.body;
    const userId = req.user?.userId;
    
    // Handle the uploaded file
    let coverUrl = req.body.coverUrl;
    
    if (req.file) {
      // If a file was uploaded, use its path
      coverUrl = `/uploads/books/${req.file.filename}`;
    }
    
    const newBook = new Book({
      title,
      author,
      description,
      publishedYear,
      genre,
      coverUrl,
      pages,
      userId
    });
    
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).json({ message: 'Error creating book', error });
  }
};

// Update an existing book
export const updateBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;
    const updates = { ...req.body };
    
    const book = await Book.findOne({ _id: id, userId });
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    // here we 
    // Handle the uploaded file
    if (req.file) {
      // If a file was uploaded, use its path
      updates.coverUrl = `/uploads/books/${req.file.filename}`;
      
      // always Delete the old cover image if it exists
      if (book.coverUrl && book.coverUrl.startsWith('/uploads/books/')) {
        const oldImagePath = path.join(process.cwd(), book.coverUrl);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
    }
    const updatedBook = await Book.findByIdAndUpdate(
      id, 
      updates, 
      { new: true }
    );
    
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: 'Error updating book', error });
  }
};

// this function Delete a book
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;
    
    //alway let chekc b4 we delete
    const book = await Book.findOne({ _id: id, userId });
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    // also Delete the cover image if it exists
    if (book.coverUrl && book.coverUrl.startsWith('/uploads/books/')) {
      const imagePath = path.join(process.cwd(), book.coverUrl);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    
    await Book.findByIdAndDelete(id);
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book', error });
  }
};