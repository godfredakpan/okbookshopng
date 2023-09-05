
"use client";
import React, { useState } from 'react';
import { books } from '../../data/books.json'

const Books = () => {
  const [myBooks, setBooks] =  useState(books); 

  const editBook = (bookId) => {

  };


  const deleteBook = (bookId) => {

  };

  return (
    <main className="min-h-screen flex-col items-center justify-between p-10">
        <h1 className="text-3xl font-bold mb-4">Books List</h1>
      <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="/addBook"
            target="_blank"
            rel="noopener noreferrer"
          >Create Book</a>
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
      
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {myBooks.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>${book.price.toFixed(2)}</td>
              <td>
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-1"
                  onClick={() => editBook(book.id)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => deleteBook(book.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </main>
  );
};

export default Books;