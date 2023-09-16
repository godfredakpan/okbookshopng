"use client";
import React, { useState, useEffect } from "react";
import { getAllOrders, getUser } from "@/services";
import Footer from "@/components/footer";
import ReactPaginate from 'react-paginate';

const Orders = () => {
  const [allOrders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // State to store the search term
  const [sortBy, setSortBy] = useState(""); // State to store the selected sort option
  const [currentPage, setCurrentPage] = useState(0);
  const ordersPerPage = 10; // Number of orders to display per page

  useEffect(() => {
    if (!getUser()) {
      window.location.href = "/login";
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const orders = await getAllOrders();
      setOrders(orders);
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
  };

  const handleSortChange = (e) => {
    const selectedOption = e.target.value;
    setSortBy(selectedOption);
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  // Filter and sort orders based on search and sort criteria
  const filteredAndSortedOrders = allOrders
    .filter((order) =>
      order?.buyerName?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "buyerName") {
        return a.buyerName?.localeCompare(b.buyerName);
      } else if (sortBy === "totalAmount") {
        return a.amount - b.amount;
      }
      return 0; // Default sorting order
    });

  // Paginate orders
  const indexOfLastOrder = (currentPage + 1) * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredAndSortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);

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
        <h1 className="text-3xl font-bold mb-4">Orders</h1>

        {/* Search input */}
        <div style={{ marginBottom: 20 }}>
          <input
            type="text"
            placeholder="Search by buyer name"
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ marginRight: 20 }}
            className="border rounded-lg p-2 text-black"
          />

          {/* Sorting dropdown */}
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="border rounded-lg p-2 text-black"
          >
            <option value="">Sort by</option>
            <option value="buyerName">Buyer Name</option>
            <option value="totalAmount">Total Amount</option>
          </select>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs uppercase text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3"></th>
                <th scope="col" className="px-6 py-3">Buyer</th>
                <th scope="col" className="px-6 py-3">Orders</th>
                <th scope="col" className="px-6 py-3">Total Amount</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={order.id}>
                  <td></td>
                  <td className="px-6 py-4">
                    <div>
                      <p>Name: {order.buyerName}</p>
                      <p>Email: {order.buyerEmail}</p>
                      <p>Address: {order.buyerAddress}</p>
                      <p>Phone: {order.buyerPhone}</p>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div>
                      {order.books.map((book) => (
                        <div key={book.id}>
                          <p>Name: {book.title}</p>
                          <p>Author: {book.author}</p>
                          <p>Price: {book.price}</p>
                          <br />
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">NGN{order.amount.toFixed(2)}</td>
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

        {/* Pagination */}
        <ReactPaginate
          pageCount={Math.ceil(filteredAndSortedOrders.length / ordersPerPage)}
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

export default Orders;
