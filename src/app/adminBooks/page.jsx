"use client";
import React, { useState } from "react";
import { books } from "../../data/books.json";
import Footer from "@/components/footer";
import { getAllBooks } from "@/services";

const Books = () => {
  const [allBooks, setBooks] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const books = await getAllBooks();
      setBooks(books);
      setLoading(false);
    }
    fetchData();
  }, []);

  const editBook = (bookId) => {};

  const deleteBook = (bookId) => {};

  return (
    <>
      <nav
        className="flex sm:justify-center space-x-4"
        style={{ marginTop: 20 }}
      >
        {[
          ["Create Book", "/addBook"],
          ["Orders", "/orders"],
          ["Books", "/adminBooks"],
        ].map(([title, url]) => (
          <a
            key={url}
            href={url}
            className="bg-gray-500 rounded-lg px-3 py-2 text-white-700 font-medium hover:bg-slate-100 hover:text-slate-900"
          >
            {title}
          </a>
        ))}
      </nav>
      <main className="min-h-screen flex-col items-center justify-between p-20">
        <h1 className="text-3xl font-bold mb-4">Books List</h1>

        <div className="z-10 w-full max-w-10xl items-center justify-between font-mono text-sm lg:flex">
          <table className="table-auto min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allBooks.map((book) => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>NGN{book.price.toFixed(2)}</td>
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
      <Footer />
    </>
  );
};

export default Books;
