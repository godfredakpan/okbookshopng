import request from 'umi-request';

const API_URL = 'https://hrmaneja.eu-4.evennode.com/api/v1'
const USER_TOKEN = process.env.USER_TOKEN

export async function loginUser(credentials) {
    return request(`${API_URL}/user/auth/login`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
      body: JSON.stringify(credentials),
    });
  }

  export async function getAllBooks() {
    return request(`${API_URL}/api/bookshop/books`, {
      method: 'get',
      headers: {
         'Content-Type': 'application/json',
         'Authorization': USER_TOKEN,
      },
    });
  }


export async function createBook(body) {
    return request(`${API_URL}/bookshop/books/create`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
      body: JSON.stringify(body),
    });
  }


export async function updateBook(body, bookId) {
    return request(`${API_URL}/bookshop/books/update/${bookId}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': USER_TOKEN,
      },
      body: JSON.stringify(body),
    });
  }
  
  
  export async function deleteBook(bookId) {
    return request(`${API_URL}/bookshop/books/delete/${bookId}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Authorization': USER_TOKEN,
      },
    });
  }