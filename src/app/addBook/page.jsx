/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import Uploadcare from 'uploadcare-widget';

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [summary, setSummary] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");

  const [image, setImage] = useState(null);

  // Function to handle image selection
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  // Remove the selected image
  const removeImage = () => {
    setImage(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBook = {
      title,
      author,
      price: parseFloat(price),
      summary,
      categories,
      image,
      id: Date.now(),
    };

    // TODO: Send the new book data to your backend or storage

    console.log('new Book', newBook)

    setTitle("");
    setAuthor("");
    setPrice("");
    setSummary("");
    setCategories([]);
    setCategoryId("");
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    if (!categories.includes(selectedCategory)) {
      setCategories([...categories, selectedCategory]);
    }
    setCategoryId("");
  };

  const removeCategory = (index) => {
    const updatedCategories = [...categories];
    updatedCategories.splice(index, 1);
    setCategories(updatedCategories);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-600 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-12">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white-900">
            Add Book
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="title" className="sr-only text-white-200">
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Title"
              />
            </div>
            <div>
              <label htmlFor="author" className="sr-only">
                Author
              </label>
              <input
                id="author"
                name="author"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Author"
              />
            </div>
            <div>
              <label htmlFor="price" className="sr-only">
                Price
              </label>
              <input
                id="price"
                name="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Price"
              />
            </div>
            <div>
              <label htmlFor="summary" className="sr-only">
                Summary
              </label>
              <textarea
                id="summary"
                name="summary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Summary"
                rows="4"
              />
            </div>
            <div>
              <label htmlFor="category" className="sr-only">
                Categories
              </label>
              <select
                id="category"
                name="category"
                value={categoryId}
                onChange={handleCategoryChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              >
                <option value="" disabled>
                  Select a category
                </option>
                <option value="Fiction">Fiction</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Science Fiction">Science Fiction</option>
                {/* Add more categories as needed */}
              </select>
            </div>
            <div className="text-white-700">
              Selected Categories:
              {categories.map((category, index) => (
                <span
                  key={index}
                  className="ml-2 text-white-900 cursor-pointer clickable-category underline"
                  onClick={() => removeCategory(index)}
                >
                  {category} (x)
                </span>
              ))}
            </div>
          </div>
          <div>
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-white-700"
              >
                Image Upload:
              </label>
              {image ? (
                <div className="mt-2 flex items-center space-x-2">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Selected Image"
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="mt-2 border-gray-300 border rounded-md"
                />
              )}
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              style={{ marginTop: 20 }}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Book
            </button>
            <a
            style={{marginTop: 20}}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            href="/adminBooks"
            rel="noopener noreferrer"
          >Go back</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
