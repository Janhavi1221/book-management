import { useState, useEffect } from 'react';
import { FiSearch, FiEdit2, FiTrash2, FiBook, FiUser, FiCalendar, FiDollarSign, FiPlusCircle, FiTrendingUp } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { bookAPI } from '../services/api';

const ViewBooks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch books from API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await bookAPI.getAllBooks();
        
        if (data.Success) {
          setBooks(data.BookList || []);
        } else {
          setError(data.Message || 'Failed to fetch books');
        }
      } catch (err) {
        setError('Failed to connect to server');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter(book =>
    book.BookTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.BookAuthor?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (bookId) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        // Note: Backend doesn't have delete endpoint yet, so we'll simulate
        await bookAPI.deleteBook(bookId);
        setBooks(books.filter(book => book._id !== bookId));
        alert('Book deleted successfully!');
      } catch (error) {
        alert('Delete functionality not available in backend yet');
      }
    }
  };

  if (loading) {
    return (
      <div className="bg-gradient flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading books...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ backgroundColor: '#f0ead6', minHeight: '100vh' }} className="flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 p-6 rounded-full mb-4">
            <FiBook className="text-6xl text-red-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Books</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#f0ead6', minHeight: '100vh' }}>
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-3">View Books</h1>
            <p className="text-gray-600 text-lg">Manage and browse your book collection</p>
          </div>
          <Link 
            to="/add-book" 
            className="btn-primary mt-4 md:mt-0 glow"
          >
            <FiPlusCircle />
            Add New Book
          </Link>
        </div>

        {/* Search Bar */}
        <div className="search-container">
          <div className="search-icon">
            <FiSearch />
          </div>
          <input
            type="text"
            placeholder="Search books by title or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Books Table */}
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Publish Date</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book) => (
                  <tr key={book._id}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <FiBook className="text-blue-600" />
                        </div>
                        <span className="font-semibold text-gray-800">{book.BookTitle}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="bg-purple-100 p-2 rounded-lg">
                          <FiUser className="text-purple-600" />
                        </div>
                        <span className="text-gray-700">{book.BookAuthor}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="bg-green-100 p-2 rounded-lg">
                          <FiCalendar className="text-green-600" />
                        </div>
                        <span className="text-gray-700">
                          {book.PublishDate ? new Date(book.PublishDate).toLocaleDateString() : 'N/A'}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="bg-yellow-100 p-2 rounded-lg">
                          <FiDollarSign className="text-yellow-600" />
                        </div>
                        <span className="font-semibold text-gray-800">₹{book.Price}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex space-x-2">
                        <Link
                          to={`/edit-book/${book._id}`}
                          className="action-btn edit-btn"
                          title="Edit Book"
                        >
                          <FiEdit2 />
                        </Link>
                        <button
                          onClick={() => handleDelete(book._id)}
                          className="action-btn delete-btn"
                          title="Delete Book"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-12 text-center">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="bg-gray-100 p-6 rounded-full">
                        <FiBook className="text-6xl text-gray-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                          {searchTerm ? 'No books found' : 'No books in collection'}
                        </h3>
                        <p className="text-gray-500">
                          {searchTerm ? 'Try adjusting your search' : 'Add your first book to get started'}
                        </p>
                        <Link 
                          to="/add-book" 
                          className="btn-primary mt-4"
                        >
                          <FiPlusCircle />
                          {searchTerm ? 'Clear Search' : 'Add Your First Book'}
                        </Link>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-6 mt-8">
          <div className="stat-card hover-lift">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-blue-100 p-4 rounded-full">
                <FiBook className="text-3xl text-blue-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Books</h3>
            <p className="stat-number">{books.length}</p>
          </div>
          <div className="stat-card hover-lift">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-green-100 p-4 rounded-full">
                <FiDollarSign className="text-3xl text-green-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Value</h3>
            <p className="stat-number">
              ₹{books.reduce((sum, book) => sum + (book.Price || 0), 0).toFixed(2)}
            </p>
          </div>
          <div className="stat-card hover-lift">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-purple-100 p-4 rounded-full">
                <FiTrendingUp className="text-3xl text-purple-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Average Price</h3>
            <p className="stat-number">
              ₹{books.length > 0 ? (books.reduce((sum, book) => sum + (book.Price || 0), 0) / books.length).toFixed(2) : '0.00'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBooks;
