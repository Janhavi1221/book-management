import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiFilter, FiBook, FiX, FiGrid, FiList, FiHeart } from 'react-icons/fi';
import { bookAPI } from '../services/api';

const SearchPage = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAuthor, setSelectedAuthor] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [viewMode, setViewMode] = useState('grid');
  const [authors, setAuthors] = useState([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const categories = [
    { id: 'all', name: 'All Categories', icon: '📚' },
    { id: 'fiction', name: 'Fiction', icon: '📖' },
    { id: 'non-fiction', name: 'Non-Fiction', icon: '📰' },
    { id: 'science', name: 'Science', icon: '🔬' },
    { id: 'technology', name: 'Technology', icon: '💻' },
    { id: 'history', name: 'History', icon: '📜' },
    { id: 'biography', name: 'Biography', icon: '👤' },
    { id: 'self-help', name: 'Self-Help', icon: '🎯' },
    { id: 'programming', name: 'Programming', icon: '💻' },
    { id: 'business', name: 'Business', icon: '💼' },
    { id: 'art', name: 'Art & Design', icon: '🎨' }
  ];

  const sortOptions = [
    { id: 'recent', name: 'Most Recent', icon: '🕐' },
    { id: 'title', name: 'Title (A-Z)', icon: '🔤' },
    { id: 'title-desc', name: 'Title (Z-A)', icon: '🔤' },
    { id: 'author', name: 'Author (A-Z)', icon: '👤' },
    { id: 'author-desc', name: 'Author (Z-A)', icon: '👤' },
    { id: 'price-low', name: 'Price (Low to High)', icon: '💰' },
    { id: 'price-high', name: 'Price (High to Low)', icon: '💰' },
    { id: 'rating', name: 'Highest Rated', icon: '⭐' },
    { id: 'popular', name: 'Most Popular', icon: '🔥' }
  ];

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await bookAPI.getAllBooks();
        if (data.Success) {
          const booksList = data.BookList || [];
          setBooks(booksList);
          setFilteredBooks(booksList);
          
          const uniqueAuthors = [...new Set(booksList.map(book => book.BookAuthor))].sort();
          setAuthors(uniqueAuthors);
        }
      } catch (error) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    let filtered = books;
    
    if (searchTerm) {
      filtered = filtered.filter(book =>
        book.BookTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.BookAuthor?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.Description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(book => book.genre === selectedCategory);
    }
    
    if (selectedAuthor !== 'all') {
      filtered = filtered.filter(book => book.BookAuthor === selectedAuthor);
    }
    
    filtered = filtered.filter(book => 
      (book.Price || 0) >= priceRange.min && (book.Price || 0) <= priceRange.max
    );
    
    switch (sortBy) {
      case 'title':
        filtered.sort((a, b) => (a.BookTitle || '').localeCompare(b.BookTitle || ''));
        break;
      case 'title-desc':
        filtered.sort((a, b) => (b.BookTitle || '').localeCompare(a.BookTitle || ''));
        break;
      case 'author':
        filtered.sort((a, b) => (a.BookAuthor || '').localeCompare(b.BookAuthor || ''));
        break;
      case 'author-desc':
        filtered.sort((a, b) => (b.BookAuthor || '').localeCompare(a.BookAuthor || ''));
        break;
      case 'price-low':
        filtered.sort((a, b) => (a.Price || 0) - (b.Price || 0));
        break;
      case 'price-high':
        filtered.sort((a, b) => (b.Price || 0) - (a.Price || 0));
        break;
      default:
        break;
    }
    
    setFilteredBooks(filtered);
  }, [books, searchTerm, selectedCategory, selectedAuthor, sortBy, priceRange]);

  const toggleFavorite = (bookId) => {
    setFavorites(prev => 
      prev.includes(bookId) 
        ? prev.filter(id => id !== bookId)
        : [...prev, bookId]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedAuthor('all');
    setSortBy('recent');
    setPriceRange({ min: 0, max: 10000 });
  };

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
          <p className="text-gray-800 text-lg mt-4">Loading amazing books...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="creative-container">
        {/* Header */}
        <div className="creative-header mb-8">
          <h1>Advanced Search</h1>
          <p>Find your perfect book with powerful search and filters</p>
        </div>

        {/* Search Bar */}
        <div className="search-creative mb-8">
          <FiSearch size={20} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search by title, author, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input-creative"
          />
          <button 
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="btn-creative btn-secondary-creative"
          >
            <FiFilter size={20} />
            {showAdvanced ? 'Hide Filters' : 'Advanced Filters'}
          </button>
        </div>

        {/* Advanced Filters */}
        {showAdvanced && (
          <div className="glass-card mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="form-group-creative">
                <label>Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="form-input-creative"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.icon} {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group-creative">
                <label>Author</label>
                <select
                  value={selectedAuthor}
                  onChange={(e) => setSelectedAuthor(e.target.value)}
                  className="form-input-creative"
                >
                  <option value="all">All Authors</option>
                  {authors.map(author => (
                    <option key={author} value={author}>{author}</option>
                  ))}
                </select>
              </div>

              <div className="form-group-creative">
                <label>Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="form-input-creative"
                >
                  {sortOptions.map(option => (
                    <option key={option.id} value={option.id}>
                      {option.icon} {option.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group-creative">
                <label>Price Range</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: parseInt(e.target.value) || 0 }))}
                    className="form-input-creative"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) || 10000 }))}
                    className="form-input-creative"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button onClick={clearFilters} className="btn-creative btn-secondary-creative">
                <FiX size={20} />
                Clear All Filters
              </button>
            </div>
          </div>
        )}

        {/* View Mode Toggle */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`btn-creative ${viewMode === 'grid' ? 'btn-primary-creative' : 'btn-secondary-creative'}`}
            >
              <FiGrid size={20} />
              Grid View
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`btn-creative ${viewMode === 'list' ? 'btn-primary-creative' : 'btn-secondary-creative'}`}
            >
              <FiList size={20} />
              List View
            </button>
          </div>
          <div className="text-gray-600">
            Found {filteredBooks.length} books
          </div>
        </div>

        {/* Books Container */}
        <div className="books-container">
          {filteredBooks.length > 0 ? (
            viewMode === 'grid' ? (
              <div className="creative-grid">
                {filteredBooks.map((book) => (
                  <div key={book._id} className="book-card-creative">
                    <div className="book-cover-creative">
                      {book.image ? (
                        <img src={book.image} alt={book.BookTitle} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-4xl">📚</span>
                      )}
                    </div>
                    <div className="book-info-creative">
                      <h3 className="book-title-creative">{book.BookTitle}</h3>
                      <p className="book-author-creative">by {book.BookAuthor}</p>
                      <div className="book-price-creative">₹{book.Price}</div>
                      <div className="flex gap-2 mt-4">
                        <Link to={`/book/${book._id}`} className="btn-creative btn-primary-creative flex-1">
                          View Details
                        </Link>
                        <button
                          onClick={() => toggleFavorite(book._id)}
                          className={`btn-creative ${favorites.includes(book._id) ? 'btn-primary-creative' : 'btn-secondary-creative'}`}
                        >
                          <FiHeart size={16} className={favorites.includes(book._id) ? 'fill-current' : ''} />
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
                        <div className="book-cover-creative w-20 h-20">
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
                        <Link to={`/book/${book._id}`} className="btn-creative btn-primary-creative">
                          View Details
                        </Link>
                        <button
                          onClick={() => toggleFavorite(book._id)}
                          className={`btn-creative ${favorites.includes(book._id) ? 'btn-primary-creative' : 'btn-secondary-creative'}`}
                        >
                          <FiHeart size={16} className={favorites.includes(book._id) ? 'fill-current' : ''} />
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
                <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
                <button onClick={clearFilters} className="btn-creative btn-primary-creative">
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
