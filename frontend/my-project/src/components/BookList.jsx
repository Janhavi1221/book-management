import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function BookList() {

  const [books, setBooks] = useState([]);

  const getBooks = async () => {
    const res = await axios.get("http://localhost:8000/books");
    setBooks(res.data);
  };

  useEffect(() => {
    getBooks();
  }, []);

  const deleteBook = async (id) => {
    await axios.delete(`http://localhost:8000/books/${id}`);
    getBooks();
  };

  return (
    <div style={{ padding: "20px" }}>

      <h2>Book Management System</h2>

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Publish Date</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {books.map((book) => (
            <tr key={book._id}>

              <td>{book.BookTitle}</td>
              <td>{book.BookAuthor}</td>
              <td>{book.PublishDate}</td>
              <td>{book.Price}</td>

              <td>

                <Link to={`/edit/${book._id}`}>
                  <button>Edit</button>
                </Link>

                <button onClick={() => deleteBook(book._id)}>
                  Delete
                </button>

              </td>

            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default BookList;