"use client";
import React from "react";
import Footer from "@/components/footer";
import { getAllOrders } from "@/services";

const Orders = () => {
  const [allOrders, setOrders] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

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
        <div className="z-10 w-full max-w-10xl items-center justify-between font-mono text-sm lg:flex">
          <table className="table-auto min-w-full divide-y divide-x divide-gray-200">
            <thead>
              <tr>
                <th></th>
                <th>Buyer</th>
                <th>Orders</th>
                <th>Total Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allOrders.map((order) => (
                <tr key={order.id}>
                  <td></td>
                  <td>
                    <p>Name: {order.buyerName}</p>
                    <p>Email: {order.buyerEmail}</p>
                    <p>Address: {order.buyerAddress}</p>
                    <p>Phone: {order.buyerPhone}</p>
                  </td>
                  <td>
                    {Array.from(
                      new Set(allOrders.map((order) => order.books).flat())
                    ).map((book) => (
                      <>
                        <p key={book.id}>Name: {book.title}</p>
                        <p key={book.id}>Author: {book.author}</p>
                        <p key={book.id}>Price: {book.price}</p>
                        <br></br>
                      </>
                    ))}
                  </td>
                  <td>NGN{order.amount.toFixed(2)}</td>
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

export default Orders;
