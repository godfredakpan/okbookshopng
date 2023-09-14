"use client";
import React, { useState } from "react";
import { books } from "../../data/books.json";
import Footer from "@/components/footer";
import { getAllBooks, getUser } from "@/services";
import Image from "next/image";

const Books = () => {
  const [allBooks, setBooks] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!getUser()) {
        window.location.href = "/login";
    }
}, []);
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

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs uppercase text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">Title</th>
                <th scope="col" class="px-6 py-3">Author</th>
                <th scope="col" class="px-6 py-3">Price</th>
                <th scope="col" class="px-6 py-3">Picture</th>
                <th scope="col" class="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {allBooks.map((book) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={book.id}>
                  <td className="px-6 py-4">{book.title}</td>
                  <td className="px-6 py-4">{book.author}</td>
                  <td className="px-6 py-4">NGN{book.price.toFixed(2)}</td>
                  <td className="px-6 py-4"> 
                  <Image
                    src={book.image}
                    alt={book.title}
                    // layout="fill"
                    width={100}
                    height={100}
                    style={{ resizeMode: 'cover' }} />
                    </td>
                  <td className="px-6 py-4">
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
