import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiTrash2, FiBook, FiStar, FiSearch, FiGrid, FiList, FiFilter, FiX, FiShoppingCart } from 'react-icons/fi';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      bookId: 'book1',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      price: 12.99,
      cover: '📖',
      addedDate: '2024-01-15',
      rating: 5,
      notes: 'Beautiful prose, captures the Jazz Age perfectly'
    },
    {
      id: 2,
      bookId: 'book2',
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      price: 14.99,
      cover: '📕',
      addedDate: '2024-01-20',
      rating: 4,
      notes: 'Powerful story about racial injustice and moral growth'
    },
    {
      id: 3,
      bookId: 'book3',
      title: '1984',
      author: 'George Orwell',
      price: 13.99,
      cover: '📘',
      addedDate: '2024-01-10',
      rating: 5,
      notes: 'Dystopian masterpiece about totalitarianism'
    },
    {
      id: 4,
      bookId: 'book4',
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      price: 11.99,
      cover: '💕',
      addedDate: '2024-01-25',
      rating: 4,
      notes: 'Classic romance with social commentary'
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState('grid');
  const [showNotesModal, setShowNotesModal] = useState(null);
  const [editingNotes, setEditingNotes] = useState('');

  useEffect(() => {
    // In real app, fetch favorites from API
    // For demo, using mock data
  }, []);

  const handleAddToFavorites = (bookId) => {
    // In real app, this would call API to add to favorites
    alert('Added to favorites!');
  };

  const handleRemoveFromFavorites = (favoriteId) => {
    if (window.confirm('Are you sure you want to remove this from your favorites?')) {
      setFavorites(favorites.filter(fav => fav.id !== favoriteId));
      // In real app, this would call API to remove from favorites
      alert('Removed from favorites!');
    }
  };

  const handleUpdateNotes = (favoriteId) => {
    const favorite = favorites.find(fav => fav.id === favoriteId);
    if (favorite) {
      const updatedFavorites = favorites.map(fav => 
        fav.id === favoriteId 
          ? { ...fav, notes: editingNotes }
          : fav
      );
      setFavorites(updatedFavorites);
      setShowNotesModal(null);
      setEditingNotes('');
      alert('Notes updated successfully!');
    }
  };

  const openNotesModal = (favorite) => {
    setShowNotesModal(favorite);
    setEditingNotes(favorite.notes || '');
  };

  const closeNotesModal = () => {
    setShowNotesModal(null);
    setEditingNotes('');
  };

  const filteredFavorites = favorites.filter(favorite =>
    favorite.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedFavorites = [...filteredFavorites].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.addedDate) - new Date(a.addedDate);
      case 'title':
        return a.title.localeCompare(b.title);
      case 'title-desc':
        return b.title.localeCompare(a.title);
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  const getTotalValue = () => {
    return favorites.reduce((sum, fav) => sum + fav.price, 0).toFixed(2);
  };

  const getAverageRating = () => {
    const ratedFavorites = favorites.filter(fav => fav.rating);
    if (ratedFavorites.length === 0) return '0.0';
    const totalRating = ratedFavorites.reduce((sum, fav) => sum + fav.rating, 0);
    return (totalRating / ratedFavorites.length).toFixed(1);
  };

  return (
    <div style={{ backgroundColor: '#f0ead6', minHeight: '100vh' }}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            <FiHeart className="inline mr-3 text-red-500" />
            My Favorites & Wishlist
          </h1>
          <p className="text-gray-600 text-lg">Books you love and want to read again</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <FiHeart className="text-4xl text-red-500 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-800">{favorites.length}</h3>
            <p className="text-gray-600">Total Favorites</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <FiStar className="text-4xl text-yellow-500 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-800">{getAverageRating()}</h3>
            <p className="text-gray-600">Average Rating</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <FiShoppingCart className="text-4xl text-green-600 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-800">₹{getTotalValue()}</h3>
            <p className="text-gray-600">Total Value</p>
          </div>
        </div>

        {/* Search and Controls */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              My Favorites
            </h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search favorites..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex space-x-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="recent">Recently Added</option>
                  <option value="title">Title (A-Z)</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price (Low to High)</option>
                  <option value="price-high">Price (High to Low)</option>
                </select>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-3 rounded-lg font-medium transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <FiGrid />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-3 rounded-lg font-medium transition-colors ${
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

          {/* Results Count */}
          <div className="text-center text-gray-600">
            {sortedFavorites.length} of {favorites.length} favorites shown
          </div>
        </div>

        {/* Favorites Grid/List */}
        {sortedFavorites.length > 0 ? (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
            {sortedFavorites.map((favorite) => (
              <div
                key={favorite.id}
                className={viewMode === 'grid' 
                  ? 'bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group'
                  : 'bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300'
                }
              >
                {viewMode === 'grid' ? (
                  <>
                    {/* Book Cover */}
                    <div className="h-64 bg-gradient-to-br from-red-400 to-pink-600 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl">{favorite.cover}</span>
                      </div>
                      {/* Floating Actions */}
                      <div className="absolute top-4 right-4 flex space-x-2">
                        <button
                          onClick={() => handleRemoveFromFavorites(favorite.id)}
                          className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all"
                        >
                          <FiX />
                        </button>
                        <button
                          onClick={() => openNotesModal(favorite)}
                          className="bg-white text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-all"
                        >
                          <FiStar />
                        </button>
                      </div>
                      {/* Rating Badge */}
                      <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 rounded px-2 py-1">
                        <span className="text-white text-xs font-semibold">⭐ {favorite.rating}.0</span>
                      </div>
                    </div>

                    {/* Book Info */}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-1 truncate">{favorite.title}</h3>
                      <p className="text-gray-600 text-sm truncate">{favorite.author}</p>
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-lg font-bold text-blue-600">₹{favorite.price}</div>
                        <div className="text-sm text-gray-500">
                          Added: {new Date(favorite.addedDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    {/* Notes Preview */}
                    {favorite.notes && (
                      <div className="mt-3 pt-3 border-t">
                        <p className="text-sm text-gray-600 line-clamp-2">{favorite.notes}</p>
                      </div>
                    )}
                  </>
                ) : (
                  /* List View */
                  <div className="flex items-start space-x-4">
                    <div className="w-20 h-28 bg-gradient-to-br from-red-400 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-3xl">{favorite.cover}</span>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-800 text-lg">{favorite.title}</h3>
                          <p className="text-gray-600">{favorite.author}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-blue-600">₹{favorite.price}</div>
                          <div className="flex items-center text-xs text-gray-500">
                            Added: {new Date(favorite.addedDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                          <FiStar className="inline mr-1" />
                          {favorite.rating}.0
                        </span>
                        {favorite.notes && (
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs ml-2">
                            📝 {favorite.notes.length > 20 ? 'Has notes' : 'Has notes'}
                          </span>
                        )}
                      </div>

                      {favorite.notes && (
                        <p className="text-gray-600 text-sm line-clamp-2 mt-2">{favorite.notes}</p>
                      )}

                      <div className="flex space-x-2 mt-3">
                        <Link
                          to={`/book/${favorite.bookId}`}
                          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                        >
                          View Details
                        </Link>
                        <button
                          onClick={() => handleRemoveFromFavorites(favorite.id)}
                          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                        >
                          <FiTrash2 />
                        </button>
                        <button
                          onClick={() => openNotesModal(favorite)}
                          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors"
                        >
                          <FiStar />
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
                <FiHeart className="text-6xl text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                No favorites yet
              </h3>
              <p className="text-gray-500 mb-6">
                Start adding books to your favorites to see them here!
              </p>
              <div className="flex space-x-4 justify-center">
                <Link to="/gallery" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  <FiBook className="inline mr-2" />
                  Browse Books
                </Link>
                <Link to="/search" className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors">
                  <FiSearch className="inline mr-2" />
                  Search Books
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="text-center mt-8">
          <Link to="/gallery" className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-300 transition-colors">
            Back to Gallery
          </Link>
        </div>
      </div>

      {/* Notes Modal */}
      {showNotesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                Edit Notes for "{showNotesModal.title}"
              </h3>
              <button
                onClick={closeNotesModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX />
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleUpdateNotes(showNotesModal.id); }}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Notes
                </label>
                <textarea
                  value={editingNotes}
                  onChange={(e) => setEditingNotes(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Add your personal notes about this book..."
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Notes
                </button>
                <button
                  type="button"
                  onClick={closeNotesModal}
                  className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
