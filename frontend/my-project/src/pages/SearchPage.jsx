import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiFilter, FiBook, FiX, FiGrid, FiList, FiSliders, FiCalendar, FiTrendingUp, FiDollarSign, FiTag } from 'react-icons/fi';
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
          
          // Extract unique authors
          const uniqueAuthors = [...new Set(booksList.map(book => book.BookAuthor))].sort();
          setAuthors(uniqueAuthors);
        }
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    let filtered = books;
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(book =>
        book.BookTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.BookAuthor?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(book => book.genre?.toLowerCase() === selectedCategory);
    }
    
    // Apply author filter
    if (selectedAuthor !== 'all') {
      filtered = filtered.filter(book => book.BookAuthor === selectedAuthor);
    }
    
    // Apply price range filter
    filtered = filtered.filter(book => 
      book.Price >= priceRange.min && book.Price <= priceRange.max
    );
    
    // Apply sorting
    switch (sortBy) {
      case 'recent':
        filtered.sort((a, b) => new Date(b.PublishDate) - new Date(a.PublishDate));
        break;
      case 'title':
        filtered.sort((a, b) => a.BookTitle.localeCompare(b.BookTitle));
        break;
      case 'title-desc':
        filtered.sort((a, b) => b.BookTitle.localeCompare(a.BookTitle));
        break;
      case 'author':
        filtered.sort((a, b) => a.BookAuthor.localeCompare(b.BookAuthor));
        break;
      case 'author-desc':
        filtered.sort((a, b) => b.BookAuthor.localeCompare(a.BookAuthor));
        break;
      case 'price-low':
        filtered.sort((a, b) => a.Price - b.Price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.Price - a.Price);
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'popular':
        filtered.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
        break;
    }
    
    setFilteredBooks(filtered);
  }, [books, searchTerm, selectedCategory, selectedAuthor, priceRange, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedAuthor('all');
    setPriceRange({ min: 0, max: 10000 });
    setSortBy('recent');
  };

  const activeFiltersCount = [
    searchTerm,
    selectedCategory !== 'all',
    selectedAuthor !== 'all',
    priceRange.min > 0 || priceRange.max < 10000
  ].filter(Boolean).length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f0ead6' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-800 text-lg">Loading search results...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#f0ead6', minHeight: '100vh' }}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            <FiSearch className="inline mr-3 text-blue-600" />
            Advanced Search & Filter
          </h1>
          <p className="text-gray-600 text-lg">Find your perfect book with powerful search and filters</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Search by book title, author, or ISBN..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-12 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <FiX />
              </button>
            )}
          </div>
        </div>

        {/* Advanced Filters Toggle */}
        <div className="text-center mb-6">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiSliders className="inline mr-2" />
            {showAdvanced ? 'Hide' : 'Show'} Advanced Filters
          </button>
        </div>

        {/* Advanced Filters */}
        {showAdvanced && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FiFilter className="inline mr-2" />
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.icon} {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Author Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FiBook className="inline mr-2" />
                  Author
                </label>
                <select
                  value={selectedAuthor}
                  onChange={(e) => setSelectedAuthor(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Authors</option>
                  {authors.map(author => (
                    <option key={author} value={author}>{author}</option>
                  ))}
                </select>
              </div>

              {/* Sort Options */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FiTrendingUp className="inline mr-2" />
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {sortOptions.map(option => (
                    <option key={option.id} value={option.id}>
                      {option.icon} {option.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FiDollarSign className="inline mr-2" />
                  Price Range
                </label>
                <div className="flex space-x-4">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({...priceRange, min: parseFloat(e.target.value) || 0})}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="self-center text-gray-500">to</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({...priceRange, max: parseFloat(e.target.value) || 10000})}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Clear Filters */}
            <div className="mt-6 pt-6 border-t">
              <button
                onClick={clearFilters}
                className="w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}

        {/* Active Filters Display */}
        {activeFiltersCount > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-blue-800 font-medium">Active Filters:</span>
              {searchTerm && (
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  <FiSearch className="inline mr-1" />
                  "{searchTerm}"
                </span>
              )}
              {selectedCategory !== 'all' && (
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                  <FiFilter className="inline mr-1" />
                  {categories.find(c => c.id === selectedCategory)?.name}
                </span>
              )}
              {selectedAuthor !== 'all' && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  <FiBook className="inline mr-1" />
                  {selectedAuthor}
                </span>
              )}
              <button
                onClick={clearFilters}
                className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm hover:bg-red-200 transition-colors"
              >
                <FiX className="inline mr-1" />
                Clear
              </button>
            </div>
          </div>
        )}

        {/* Results Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">
              Search Results
            </h3>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">
                {filteredBooks.length} books found
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <FiGrid />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <FiList />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Search Results */}
        {filteredBooks.length > 0 ? (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
            {filteredBooks.map((book) => (
              <div
                key={book._id}
                className={viewMode === 'grid' 
                  ? 'bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group'
                  : 'bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300'
                }
              >
                {viewMode === 'grid' ? (
                  <>
                    {/* Book Cover */}
                    <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-600 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <FiBook className="text-white text-3xl" />
                      </div>
                      {/* Quick Info */}
                      <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 rounded px-2 py-1">
                        <span className="text-white text-xs font-semibold">₹{book.Price}</span>
                      </div>
                    </div>

                    {/* Book Info */}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-1 truncate">{book.BookTitle}</h3>
                      <p className="text-gray-600 text-sm truncate">{book.BookAuthor}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <FiCalendar className="mr-1" />
                        {new Date(book.PublishDate).getFullYear()}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2 mt-3">
                      <Link
                        to={`/book/${book._id}`}
                        className="flex-1 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition-colors text-center text-sm"
                      >
                        View Details
                      </Link>
                      <button className="bg-red-100 text-red-600 p-2 rounded hover:bg-red-200 transition-colors">
                        <FiHeart className="inline" />
                      </button>
                    </div>
                  </>
                ) : (
                  /* List View */
                  <div className="flex items-start space-x-4">
                    <div className="w-20 h-28 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FiBook className="text-white text-2xl" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-800 text-lg">{book.BookTitle}</h3>
                          <p className="text-gray-600">{book.BookAuthor}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-blue-600">₹{book.Price}</div>
                          <div className="flex items-center text-xs text-gray-500">
                            <FiCalendar className="mr-1" />
                            {new Date(book.PublishDate).getFullYear()}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                          <FiTag className="inline mr-1" />
                          {book.genre || 'General'}
                        </span>
                        {book.rating && (
                          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs ml-2">
                            <FiStar className="inline mr-1" />
                            {book.rating}.0
                          </span>
                        )}
                      </div>

                      {book.Description && (
                        <p className="text-gray-600 text-sm line-clamp-2">{book.Description}</p>
                      )}

                      <div className="flex space-x-2 mt-3">
                        <Link
                          to={`/book/${book._id}`}
                          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                        >
                          View Details
                        </Link>
                        <button className="bg-red-100 text-red-600 px-4 py-2 rounded hover:bg-red-200 transition-colors">
                          <FiHeart className="inline mr-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          /* No Results */
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="bg-gray-100 rounded-full p-8 mb-6 inline-block">
                <FiSearch className="text-6xl text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                {searchTerm ? 'No books found' : 'No books available'}
              </h3>
              <p className="text-gray-500 mb-6">
                {searchTerm 
                  ? 'Try adjusting your search terms or filters'
                  : 'Start by adding some amazing books to your collection'
                }
              </p>
              <div className="flex space-x-4 justify-center">
                <Link to="/add-book" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  <FiBook className="inline mr-2" />
                  Add Your First Book
                </Link>
                <Link to="/gallery" className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors">
                  Back to Gallery
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
