'use client'
import React, { useState, useEffect } from "react";
import { getAllBooks, getUser } from "@/services";
import ReactPaginate from 'react-paginate';
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer";

const Books = () => {
  const [allBooks, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [booksPerPage] = useState(10); // Number of books to display per page
  const [searchTerm, setSearchTerm] = useState(""); // State to store the search term
  const [filteredBooks, setFilteredBooks] = useState([]); // State to store filtered books
  const [sortBy, setSortBy] = useState(""); // State to store the selected sort option
  const [sortByCategory, setSortByCategory] = useState(""); // State to store the selected category for sorting

  useEffect(() => {
    if (!getUser()) {
      window.location.href = "/login";
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const books = await getAllBooks();
      setBooks(books);
      setLoading(false);
    }
    fetchData();
  }, []);

  const deleteBook = (bookId) => {
    // Implement book deletion logic here
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  useEffect(() => {
    // Filter books based on the search term
    const filtered = allBooks.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort books based on the selected option
    let sortedBooks = [...filtered];

    if (sortBy === "title") {
      sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "author") {
      sortedBooks.sort((a, b) => a.author.localeCompare(b.author));
    } else if (sortBy === "price") {
      sortedBooks.sort((a, b) => a.price - b.price);
    } else if (sortBy === "category") {
      sortedBooks.sort((a, b) => a.category.localeCompare(b.category));
    }

    setFilteredBooks(sortedBooks);
  }, [searchTerm, sortBy, allBooks]);

  const indexOfLastBook = (currentPage + 1) * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  // Function to handle search input change
  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
  };

  // Function to handle sorting by title, author, price, or category
  const handleSortChange = (e) => {
    const selectedOption = e.target.value;
    setSortBy(selectedOption);

    if (selectedOption === "category") {
      // If sorting by category, set the sortByCategory state
      const selectedCategory = e.target.options[e.target.selectedIndex].getAttribute("data-category");
      setSortByCategory(selectedCategory);
    } else {
      setSortByCategory(""); // Reset category sorting
    }
  };

  return (
    <>
      <main className="min-h-screen flex-col items-center justify-between" style={{ margin: 20 }}>
        <nav className="items-center space-x-4 justify-center" style={{ marginTop: 20, marginBottom: 20 }}>
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
        <h1 className="text-3xl font-bold mb-4">Books List</h1>

        {/* Search input */}
        <div style={{marginBottom: 20}}>
        <input
          type="text"
          placeholder="Search by title or author"
          value={searchTerm}
          style={{marginRight: 20}}
          onChange={handleSearchChange}
          className="border rounded-lg p-2 text-black"
        />

        {/* Sorting dropdown */}
        <select
          value={sortBy}
          onChange={handleSortChange}
          className="border rounded-lg p-2 text-black"
        >
          <option value="">Sort by</option>
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="price">Price</option>
          {/* <option value="category">Category</option> */}
        </select>

        {/* Category dropdown (only visible when sorting by category) */}
        {sortBy === "category" && (
          <select
            value={sortByCategory}
            onChange={(e) => setSortByCategory(e.target.value)}
            className="border rounded-lg p-2"
          >
            <option value="">Select a category</option>
            {Array.from(new Set(allBooks.map((book) => book.category))).map((category) => (
              <option key={category} value={category} data-category={category}>
                {category}
              </option>
            ))}
          </select>
        )}
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs uppercase text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Title</th>
                <th scope="col" className="px-6 py-3">Author</th>
                <th scope="col" className="px-6 py-3">Price</th>
                <th scope="col" className="px-6 py-3">Category</th>
                <th scope="col" className="px-6 py-3">Picture</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentBooks.map((book) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={book.id}>
                  <td className="px-6 py-4">{book.title}</td>
                  <td className="px-6 py-4">{book.author}</td>
                  <td className="px-6 py-4">NGN{book.price.toFixed(2)}</td>
                  <td className="px-6 py-4">{book.category}</td>
                  <td className="px-6 py-4">
                    <Image
                      src={book.image}
                      alt={book.title}
                      width={100}
                      height={100}
                      style={{ resizeMode: 'cover' }}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      className="bg-blue-500 text-white px-2 py-1 rounded mr-1"
                      href={{
                        pathname: 'editBook',
                        query: { id: book.id },
                      }}
                    >Edit</Link>
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

        <ReactPaginate
          pageCount={Math.ceil(filteredBooks.length / booksPerPage)}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          onPageChange={handlePageChange}
          containerClassName={"flex justify-center space-x-2 mt-4"} // Style the container
          pageClassName={"bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"} // Style the page button
          activeClassName={"bg-blue-600"} // Style the active page button
          previousClassName={"bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"} // Style the previous button
          nextClassName={"bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"} // Style the next button
          breakClassName={"bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"} // Style the break button
          disabledClassName={"bg-gray-300 text-gray-500 cursor-not-allowed"} // Style the disabled button
        />
      </main>
      <Footer />
    </>
  );
};

export default Books;