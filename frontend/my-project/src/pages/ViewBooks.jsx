import { useState, useEffect } from 'react';
import { FiSearch, FiEdit2, FiTrash2, FiBook, FiUser, FiCalendar, FiDollarSign, FiPlusCircle, FiTrendingUp, FiGrid, FiList, FiHeart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { bookAPI } from '../services/api';

const ViewBooks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [favorites, setFavorites] = useState([]);

  // Fetch books from API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        console.log('ViewBooks: Fetching books...');
        const data = await bookAPI.getAllBooks();
        console.log('ViewBooks: API Response:', data);
        
        if (data.Success) {
          setBooks(data.BookList || []);
          
          // Load favorites
          const favoriteIds = JSON.parse(localStorage.getItem('favorites') || '[]');
          setFavorites(favoriteIds);
        } else {
          setError(data.Message || 'Failed to fetch books');
        }
      } catch (err) {
        console.error('ViewBooks: Error fetching books:', err);
        setError('Failed to connect to server');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const toggleFavorite = (bookId) => {
    const newFavorites = favorites.includes(bookId)
      ? favorites.filter(id => id !== bookId)
      : [...favorites, bookId];
    
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        const response = await bookAPI.deleteBook(id);
        if (response.Success) {
          setBooks(books.filter(book => book._id !== id));
        } else {
          alert('Failed to delete book');
        }
      } catch (err) {
        alert('Failed to connect to server');
      }
    }
  };

  const filteredBooks = books.filter(book =>
    book.BookTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.BookAuthor?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalValue = books.reduce((sum, book) => sum + (book.Price || 0), 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-creative">
          <div className="loading-spinner-creative"></div>
          <div className="loading-dots-creative">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <p className="text-gray-800 text-lg mt-4">Loading books...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-card text-center">
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <Link to="/" className="btn-creative btn-primary-creative">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="creative-container">
        {/* Header */}
        <div className="creative-header mb-8">
          <div className="flex justify-center mb-6">
            <div className="glass-card p-6 inline-flex">
              <FiBook className="text-4xl text-blue-600" />
            </div>
          </div>
          <h1>View All Books</h1>
          <p>Browse and manage your complete book collection</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-card text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{books.length}</div>
            <p className="text-gray-600">Total Books</p>
          </div>
          <div className="glass-card text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">₹{totalValue.toFixed(2)}</div>
            <p className="text-gray-600">Total Value</p>
          </div>
          <div className="glass-card text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">{favorites.length}</div>
            <p className="text-gray-600">Favorites</p>
          </div>
        </div>

        {/* Search and Controls */}
        <div className="glass-card mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="search-creative flex-1">
              <FiSearch size={20} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search books by title or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input-creative"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`btn-creative ${viewMode === 'grid' ? 'btn-primary-creative' : 'btn-secondary-creative'}`}
              >
                <FiGrid size={20} />
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`btn-creative ${viewMode === 'list' ? 'btn-primary-creative' : 'btn-secondary-creative'}`}
              >
                <FiList size={20} />
                List
              </button>
            </div>
            <Link to="/add-book" className="btn-creative btn-primary-creative">
              <FiPlusCircle size={20} />
              Add Book
            </Link>
          </div>
        </div>

        {/* Books Display */}
        {filteredBooks.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="creative-grid">
              {filteredBooks.map((book) => (
                <div key={book._id} className="book-card-creative">
                  <div className="book-cover-creative bg-gradient-to-br from-blue-400 to-purple-600 relative">
                    {book.image ? (
                      <img src={book.image} alt={book.BookTitle} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-4xl">📚</span>
                    )}
                    <button
                      onClick={() => toggleFavorite(book._id)}
                      className="absolute top-2 right-2 bg-white bg-opacity-90 rounded-full p-2 hover:bg-opacity-100 transition-all"
                    >
                      <FiHeart size={16} className={favorites.includes(book._id) ? 'text-red-600 fill-current' : 'text-gray-600'} />
                    </button>
                  </div>
                  <div className="book-info-creative">
                    <h3 className="book-title-creative">{book.BookTitle}</h3>
                    <p className="book-author-creative">by {book.BookAuthor}</p>
                    <div className="book-price-creative">₹{book.Price}</div>
                    <div className="flex gap-2 mt-4">
                      <Link to={`/book/${book._id}`} className="btn-creative btn-primary-creative flex-1">
                        View Details
                      </Link>
                      <Link to={`/edit-book/${book._id}`} className="btn-creative btn-secondary-creative">
                        <FiEdit2 size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(book._id)}
                        className="btn-creative btn-secondary-creative"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBooks.map((book) => (
                <div key={book._id} className="glass-card">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="book-cover-creative w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-600">
                        {book.image ? (
                          <img src={book.image} alt={book.BookTitle} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-2xl">📚</span>
                        )}
                      </div>
                      <div>
                        <h3 className="book-title-creative">{book.BookTitle}</h3>
                        <p className="book-author-creative">by {book.BookAuthor}</p>
                        <div className="book-price-creative">₹{book.Price}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleFavorite(book._id)}
                        className={`btn-creative ${favorites.includes(book._id) ? 'btn-primary-creative' : 'btn-secondary-creative'}`}
                      >
                        <FiHeart size={16} className={favorites.includes(book._id) ? 'fill-current' : ''} />
                      </button>
                      <Link to={`/book/${book._id}`} className="btn-creative btn-primary-creative">
                        View Details
                      </Link>
                      <Link to={`/edit-book/${book._id}`} className="btn-creative btn-secondary-creative">
                        <FiEdit2 size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(book._id)}
                        className="btn-creative btn-secondary-creative"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex flex-col items-center">
              <FiBook size={48} className="text-gray-400 mb-6" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No books found</h3>
              <p className="text-gray-500 mb-6">
                {searchTerm ? 'Try adjusting your search' : 'Start by adding some books to your collection'}
              </p>
              {searchTerm ? (
                <button
                  onClick={() => setSearchTerm('')}
                  className="btn-creative btn-secondary-creative"
                >
                  Clear Search
                </button>
              ) : (
                <Link to="/add-book" className="btn-creative btn-primary-creative">
                  <FiPlusCircle size={20} />
                  Add First Book
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewBooks;
