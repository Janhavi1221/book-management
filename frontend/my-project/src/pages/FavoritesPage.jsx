import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiGrid, FiList, FiEdit, FiTrash2, FiStar, FiDollarSign, FiBook } from 'react-icons/fi';
import { bookAPI } from '../services/api';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [showNotes, setShowNotes] = useState(false);
  const [editingNotes, setEditingNotes] = useState(null);
  const [notes, setNotes] = useState({});

  const sortOptions = [
    { id: 'recent', name: 'Most Recent', icon: '🕐' },
    { id: 'title', name: 'Title (A-Z)', icon: '🔤' },
    { id: 'title-desc', name: 'Title (Z-A)', icon: '🔤' },
    { id: 'author', name: 'Author (A-Z)', icon: '👤' },
    { id: 'author-desc', name: 'Author (Z-A)', icon: '👤' },
    { id: 'price-low', name: 'Price (Low to High)', icon: '💰' },
    { id: 'price-high', name: 'Price (High to Low)', icon: '💰' },
    { id: 'rating', name: 'Highest Rated', icon: '⭐' }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('FavoritesPage: Fetching books...');
        const data = await bookAPI.getAllBooks();
        console.log('FavoritesPage: API Response:', data);
        
        if (data.Success) {
          const booksList = data.BookList || [];
          console.log('FavoritesPage: Books found:', booksList);
          setBooks(booksList);
          
          // Simulate favorites (in real app, this would come from backend)
          const favoriteIds = JSON.parse(localStorage.getItem('favorites') || '[]');
          console.log('FavoritesPage: Favorite IDs:', favoriteIds);
          
          const favoriteBooks = booksList.filter(book => favoriteIds.includes(book._id));
          console.log('FavoritesPage: Favorite books:', favoriteBooks);
          setFavorites(favoriteBooks);
          
          // Load notes
          const savedNotes = JSON.parse(localStorage.getItem('bookNotes') || '{}');
          setNotes(savedNotes);
        } else {
          console.log('FavoritesPage: API response failed:', data);
        }
      } catch (error) {
        console.error('FavoritesPage: Error fetching books:', error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleFavorite = (bookId) => {
    const newFavorites = favorites.includes(bookId)
      ? favorites.filter(id => id !== bookId)
      : [...favorites, bookId];
    
    setFavorites(newFavorites);
    
    // Save to localStorage (in real app, this would be API call)
    const favoriteIds = books
      .filter(book => newFavorites.includes(book._id))
      .map(book => book._id);
    localStorage.setItem('favorites', JSON.stringify(favoriteIds));
  };

  const saveNotes = (bookId, noteText) => {
    const newNotes = { ...notes, [bookId]: noteText };
    setNotes(newNotes);
    localStorage.setItem('bookNotes', JSON.stringify(newNotes));
    setEditingNotes(null);
  };

  const removeFavorite = (bookId) => {
    if (window.confirm('Are you sure you want to remove this book from favorites?')) {
      toggleFavorite(bookId);
    }
  };

  // Sort favorites
  const sortedFavorites = [...favorites];

  const totalValue = sortedFavorites.reduce((sum, book) => sum + (book.Price || 0), 0);
  const averageRating = 4.2; // Simulated average rating

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
          <p className="text-gray-800 text-lg mt-4">Loading your favorites...</p>
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
              <FiHeart className="text-4xl text-red-600" />
            </div>
          </div>
          <h1>My Favorites</h1>
          <p>Your personal collection of beloved books</p>
        </div>

        {/* Stats */}
        {favorites.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="stat-card-creative">
              <div className="mb-4">
                <FiHeart size={32} className="text-red-600" />
              </div>
              <div className="stat-number-creative">{favorites.length}</div>
              <p className="text-gray-600 font-semibold">Favorite Books</p>
            </div>
            <div className="stat-card-creative">
              <div className="mb-4">
                <span className="text-4xl text-yellow-600">₹</span>
              </div>
              <div className="stat-number-creative">₹{totalValue.toFixed(2)}</div>
              <p className="text-gray-600 font-semibold">Total Value</p>
            </div>
            <div className="stat-card-creative">
              <div className="mb-4">
                <FiStar size={32} className="text-yellow-600" />
              </div>
              <div className="stat-number-creative">{averageRating}</div>
              <p className="text-gray-600 font-semibold">Avg Rating</p>
            </div>
            <div className="stat-card-creative">
              <div className="mb-4">
                <FiBook size={32} className="text-blue-600" />
              </div>
              <div className="stat-number-creative">
                {Math.round(totalValue / favorites.length)}
              </div>
              <p className="text-gray-600 font-semibold">Avg Price</p>
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
            {favorites.length} favorite books
          </div>
        </div>

        {/* Favorites Display */}
        {sortedFavorites.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="creative-grid">
              {sortedFavorites.map((book) => (
                <div key={book._id} className="book-card-creative">
                  <div className="book-cover-creative bg-gradient-to-br from-red-400 to-pink-600 relative">
                    {book.image ? (
                      <img src={book.image} alt={book.BookTitle} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-4xl">📚</span>
                    )}
                    <button
                      onClick={() => toggleFavorite(book._id)}
                      className="absolute top-2 right-2 bg-white bg-opacity-90 rounded-full p-2 hover:bg-opacity-100 transition-all"
                    >
                      <FiHeart size={16} className="text-red-600 fill-current" />
                    </button>
                  </div>
                  <div className="book-info-creative">
                    <h3 className="book-title-creative">{book.BookTitle}</h3>
                    <p className="book-author-creative">by {book.BookAuthor}</p>
                    <div className="book-price-creative">₹{book.Price}</div>
                    
                    {/* Notes Section */}
                    <div className="mt-4">
                      {editingNotes === book._id ? (
                        <div className="space-y-2">
                          <textarea
                            value={notes[book._id] || ''}
                            onChange={(e) => setNotes({...notes, [book._id]: e.target.value})}
                            className="form-input-creative text-sm"
                            placeholder="Add your notes..."
                            rows="3"
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => saveNotes(book._id, notes[book._id] || '')}
                              className="btn-creative btn-primary-creative text-xs flex-1"
                            >
                              <FiEdit size={12} />
                              Save
                            </button>
                            <button
                              onClick={() => setEditingNotes(null)}
                              className="btn-creative btn-secondary-creative text-xs"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          {notes[book._id] ? (
                            <div className="bg-gray-50 p-2 rounded text-sm text-gray-600 mb-2">
                              {notes[book._id]}
                            </div>
                          ) : (
                            <div className="text-sm text-gray-400 mb-2 italic">No notes yet</div>
                          )}
                          <button
                            onClick={() => setEditingNotes(book._id)}
                            className="btn-creative btn-secondary-creative text-xs"
                          >
                            <FiEdit size={12} />
                            {notes[book._id] ? 'Edit Notes' : 'Add Notes'}
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Link to={`/book/${book._id}`} className="btn-creative btn-primary-creative flex-1">
                        View Details
                      </Link>
                      <button
                        onClick={() => removeFavorite(book._id)}
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
              {sortedFavorites.map((book) => (
                <div key={book._id} className="glass-card">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="book-cover-creative w-20 h-20 bg-gradient-to-br from-red-400 to-pink-600">
                        {book.image ? (
                          <img src={book.image} alt={book.BookTitle} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-2xl">📚</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="book-title-creative">{book.BookTitle}</h3>
                        <p className="book-author-creative">by {book.BookAuthor}</p>
                        <div className="book-price-creative">₹{book.Price}</div>
                        
                        {/* Notes Section */}
                        <div className="mt-2">
                          {editingNotes === book._id ? (
                            <div className="space-y-2">
                              <textarea
                                value={notes[book._id] || ''}
                                onChange={(e) => setNotes({...notes, [book._id]: e.target.value})}
                                className="form-input-creative text-sm"
                                placeholder="Add your notes..."
                                rows="2"
                              />
                              <div className="flex gap-2">
                                <button
                                  onClick={() => saveNotes(book._id, notes[book._id] || '')}
                                  className="btn-creative btn-primary-creative text-xs"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={() => setEditingNotes(null)}
                                  className="btn-creative btn-secondary-creative text-xs"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div>
                              {notes[book._id] ? (
                                <div className="bg-gray-50 p-2 rounded text-sm text-gray-600 mb-2">
                                  {notes[book._id]}
                                </div>
                              ) : null}
                              <button
                                onClick={() => setEditingNotes(book._id)}
                                className="btn-creative btn-secondary-creative text-xs"
                              >
                                <FiEdit size={12} />
                                {notes[book._id] ? 'Edit Notes' : 'Add Notes'}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => toggleFavorite(book._id)}
                        className="btn-creative btn-secondary-creative"
                      >
                        <FiHeart size={16} className="text-red-600 fill-current" />
                      </button>
                      <Link to={`/book/${book._id}`} className="btn-creative btn-primary-creative">
                        View
                      </Link>
                      <button
                        onClick={() => removeFavorite(book._id)}
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
              <FiHeart size={48} className="text-gray-400 mb-6" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No favorite books yet</h3>
              <p className="text-gray-500 mb-6">Start adding books to your favorites collection</p>
              <Link to="/search" className="btn-creative btn-primary-creative">
                <FiSearch size={20} />
                Browse Books
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
