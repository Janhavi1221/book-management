import { useState, useEffect } from 'react';
import { FiBook, FiSearch, FiFilter, FiGrid, FiList, FiHeart, FiStar, FiCalendar, FiUser, FiTag, FiTrendingUp } from 'react-icons/fi';
import { bookAPI } from '../services/api';

const BookGallery = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await bookAPI.getAllBooks();
        if (data.Success) {
          setBooks(data.BookList || []);
          setFilteredBooks(data.BookList || []);
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
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(book =>
        book.BookTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.BookAuthor?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by genre
    if (selectedGenre !== 'all') {
      filtered = filtered.filter(book => book.genre === selectedGenre);
    }
    
    // Sort books
    switch (sortBy) {
      case 'recent':
        filtered.sort((a, b) => new Date(b.PublishDate) - new Date(a.PublishDate));
        break;
      case 'title':
        filtered.sort((a, b) => a.BookTitle.localeCompare(b.BookTitle));
        break;
      case 'author':
        filtered.sort((a, b) => a.BookAuthor.localeCompare(b.BookAuthor));
        break;
      case 'price-low':
        filtered.sort((a, b) => a.Price - b.Price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.Price - a.Price);
        break;
    }
    
    setFilteredBooks(filtered);
  }, [books, searchTerm, selectedGenre, sortBy]);

  const genres = ['all', 'Fiction', 'Non-Fiction', 'Science', 'Technology', 'History', 'Biography', 'Self-Help'];
  const genreColors = {
    'Fiction': 'bg-purple-100 text-purple-800',
    'Non-Fiction': 'bg-blue-100 text-blue-800',
    'Science': 'bg-green-100 text-green-800',
    'Technology': 'bg-red-100 text-red-800',
    'History': 'bg-yellow-100 text-yellow-800',
    'Biography': 'bg-pink-100 text-pink-800',
    'Self-Help': 'bg-indigo-100 text-indigo-800'
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f0ead6' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-800 text-lg">Loading amazing books...</p>
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
            <FiBook className="inline-block mr-3 text-blue-600" />
            Book Gallery
          </h1>
          <p className="text-gray-600 text-lg">Discover your amazing book collection with advanced features</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {/* Search */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FiSearch className="inline mr-2" />
                Search Books
              </label>
              <input
                type="text"
                placeholder="Search by title or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Genre Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FiFilter className="inline mr-2" />
                Genre
              </label>
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {genres.map(genre => (
                  <option key={genre} value={genre}>
                    {genre === 'all' ? 'All Genres' : genre}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FiTrendingUp className="inline mr-2" />
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="recent">Most Recent</option>
                <option value="title">Title (A-Z)</option>
                <option value="author">Author (A-Z)</option>
                <option value="price-low">Price (Low to High)</option>
                <option value="price-high">Price (High to Low)</option>
              </select>
            </div>

            {/* View Mode */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FiGrid className="inline mr-2" />
                View Mode
              </label>
              <div className="flex space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <FiGrid className="inline mr-1" />
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <FiList className="inline mr-1" />
                  List
                </button>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          <div className="flex flex-wrap gap-2">
            {searchTerm && (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                <FiSearch className="inline mr-1" />
                Searching: "{searchTerm}"
              </span>
            )}
            {selectedGenre !== 'all' && (
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                <FiFilter className="inline mr-1" />
                {selectedGenre}
              </span>
            )}
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              {filteredBooks.length} books found
            </span>
          </div>
        </div>

        {/* Books Display */}
        {filteredBooks.length > 0 ? (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
            {filteredBooks.map((book, index) => (
              <div
                key={book._id}
                className={viewMode === 'grid' 
                  ? 'bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 group'
                  : 'bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300'
                }
              >
                {viewMode === 'grid' ? (
                  <>
                    {/* Book Cover Image Placeholder */}
                    <div className="h-64 bg-gradient-to-br from-blue-400 to-purple-600 relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <FiBook className="text-white text-4xl" />
                      </div>
                      {/* Genre Badge */}
                      {book.genre && (
                        <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold ${genreColors[book.genre] || 'bg-gray-100 text-gray-800'}`}>
                          {book.genre}
                        </div>
                      )}
                      {/* Rating */}
                      <div className="absolute bottom-2 left-2 flex items-center">
                        <div className="bg-black bg-opacity-60 rounded px-2 py-1 flex items-center">
                          <FiStar className="text-yellow-400 mr-1" />
                          <span className="text-white text-sm font-semibold">{book.rating || 4.5}</span>
                        </div>
                      </div>
                    </div>

                    {/* Book Info */}
                    <div className="p-4">
                      <h3 className="font-bold text-gray-800 mb-2 truncate">{book.BookTitle}</h3>
                      <p className="text-gray-600 text-sm mb-2 truncate">by {book.BookAuthor}</p>
                      
                      {/* Metadata */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center text-sm text-gray-500">
                          <FiCalendar className="mr-1" />
                          {book.PublishDate ? new Date(book.PublishDate).getFullYear() : 'N/A'}
                        </div>
                        <div className="text-lg font-bold text-blue-600">
                          ₹{book.Price}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-2">
                        <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                          <FiBook className="inline mr-1" />
                          View Details
                        </button>
                        <button className="bg-red-100 text-red-600 p-2 rounded-lg hover:bg-red-200 transition-colors">
                          <FiHeart className="inline" />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  /* List View */
                  <div className="flex items-start space-x-4">
                    {/* Book Cover */}
                    <div className="w-24 h-32 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FiBook className="text-white text-2xl" />
                    </div>
                    
                    {/* Book Details */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-gray-800 text-lg">{book.BookTitle}</h3>
                          <p className="text-gray-600">by {book.BookAuthor}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-blue-600">₹{book.Price}</div>
                          {book.PublishDate && (
                            <div className="text-sm text-gray-500">
                              <FiCalendar className="inline mr-1" />
                              {new Date(book.PublishDate).getFullYear()}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {book.genre && (
                          <span className={`px-2 py-1 rounded-full text-xs ${genreColors[book.genre] || 'bg-gray-100 text-gray-800'}`}>
                            <FiTag className="inline mr-1" />
                            {book.genre}
                          </span>
                        )}
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                          ISBN: {book.isbn || 'N/A'}
                        </span>
                      </div>

                      {/* Description */}
                      {book.Description && (
                        <p className="text-gray-600 text-sm line-clamp-2">{book.Description}</p>
                      )}

                      {/* Actions */}
                      <div className="flex space-x-2">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                          View Details
                        </button>
                        <button className="bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors">
                          <FiHeart className="inline mr-1" />
                          Add to Favorites
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="bg-gray-100 rounded-full p-8 mb-6 inline-block">
                <FiBook className="text-6xl text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                {searchTerm ? 'No books found' : 'No books in your gallery'}
              </h3>
              <p className="text-gray-500 mb-6">
                {searchTerm 
                  ? 'Try adjusting your search or filters'
                  : 'Start by adding some amazing books to your collection'
                }
              </p>
              <div className="flex space-x-4 justify-center">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  <FiBook className="inline mr-2" />
                  Add Your First Book
                </button>
                <button className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors">
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Floating Action Button */}
        <div className="fixed bottom-8 right-8 z-50">
          <button className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all hover:scale-110 group">
            <FiBook className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookGallery;
