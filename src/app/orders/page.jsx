"use client";
import React from "react";
import Footer from "@/components/footer";
import { getAllOrders, getUser } from "@/services";

const Orders = () => {
  const [allOrders, setOrders] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!getUser()) {
        window.location.href = "/login";
    }
}, []);

  React.useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const orders = await getAllOrders();
      setOrders(orders);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <>
     <nav className="flex sm:justify-center space-x-4" style={{marginTop: 20}}>
    {[
        ['Create Book', '/addBook'],
        ['Orders', '/orders'],
        ['Books', '/adminBooks'],
        // ['Reports', '/reports'],
    ].map(([title, url]) => (
        <a key={url} href={url} className="bg-gray-500 rounded-lg px-3 py-2 text-white-700 font-medium hover:bg-slate-100 hover:text-slate-900">{title}</a>
    ))}
    </nav>
      <main className="min-h-screen flex-col items-center justify-between p-20">
        <h1 className="text-3xl font-bold mb-4">Orders</h1>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs uppercase text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3"></th>
                <th scope="col" class="px-6 py-3">Buyer</th>
                <th scope="col" class="px-6 py-3">Orders</th>
                <th scope="col" class="px-6 py-3">Total Amount</th>
                <th scope="col" class="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {allOrders.map((order) => (
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
                  
                  <td  className="px-6 py-4">
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
                  <td  className="px-6 py-4">NGN{order.amount.toFixed(2)}</td>
                  <td  className="px-6 py-4">
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

export default Orders;
