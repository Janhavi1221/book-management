import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiBook, FiUser, FiCalendar, FiDollarSign, FiEdit, FiHeart, FiShare, FiStar, FiArrowLeft, FiTag, FiClock, FiAward } from 'react-icons/fi';
import { bookAPI } from '../services/api';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await bookAPI.findBook(id);
        if (data.Success && data.Book.length > 0) {
          setBook(data.Book[0]);
          // Mock reviews for demo
          setReviews([
            {
              id: 1,
              user: "John Doe",
              rating: 5,
              comment: "Absolutely amazing book! The character development is incredible.",
              date: "2024-01-15"
            },
            {
              id: 2,
              user: "Jane Smith",
              rating: 4,
              comment: "Great storyline, but felt a bit rushed towards the end.",
              date: "2024-01-20"
            },
            {
              id: 3,
              user: "Mike Johnson",
              rating: 4,
              comment: "Perfect for beginners. Clear explanations and examples.",
              date: "2024-01-22"
            }
          ]);
        } else {
          setError('Book not found');
        }
      } catch (err) {
        setError('Failed to fetch book details');
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    // In real app, this would save to backend
    alert(isFavorite ? 'Removed from favorites' : 'Added to favorites');
  };

  const handleRating = (rating) => {
    setUserRating(rating);
    // In real app, this would save to backend
    alert(`You rated this book ${rating} stars!`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: book.BookTitle,
        text: `Check out "${book.BookTitle}" by ${book.BookAuthor}`,
        url: window.location.href
      });
    } else {
      alert('Share link copied!');
    }
  };

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
          <p className="text-gray-800 text-lg">Loading book details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f0ead6' }}>
        <div className="text-center">
          <div className="bg-red-100 p-6 rounded-full mb-4">
            <FiBook className="text-6xl text-red-600" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Book Not Found</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link to="/gallery" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Back to Gallery
          </Link>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f0ead6' }}>
        <div className="text-center">
          <div className="bg-gray-100 p-6 rounded-full mb-4">
            <FiBook className="text-6xl text-gray-400" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">Book Not Available</h3>
          <p className="text-gray-500">This book might have been removed or is temporarily unavailable.</p>
          <Link to="/gallery" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Back to Gallery
          </Link>
        </div>
      </div>
    );
  }

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  return (
    <div style={{ backgroundColor: '#f0ead6', minHeight: '100vh' }}>
      <div className="container">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link 
            to="/gallery" 
            className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            <FiArrowLeft className="mr-2" />
            Back to Gallery
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Book Cover */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-96 bg-gradient-to-br from-blue-400 to-purple-600 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <FiBook className="text-white text-6xl" />
                </div>
                {/* Floating Actions */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                    onClick={handleFavoriteToggle}
                    className={`p-3 rounded-full transition-all ${
                      isFavorite 
                        ? 'bg-red-500 text-white' 
                        : 'bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <FiHeart className={isFavorite ? 'fill-current' : ''} />
                  </button>
                  <button
                    onClick={handleShare}
                    className="bg-white text-gray-600 p-3 rounded-full hover:bg-gray-100 transition-all"
                  >
                    <FiShare />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Book Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title and Author */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-3">{book.BookTitle}</h1>
              <div className="flex items-center text-gray-600 mb-6">
                <FiUser className="mr-2" />
                <span className="text-lg">by {book.BookAuthor}</span>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <FiCalendar className="text-2xl text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Publish Date</p>
                  <p className="font-semibold text-gray-800">{book.PublishDate ? new Date(book.PublishDate).toLocaleDateString() : 'N/A'}</p>
                </div>
                <div className="text-center">
                  <FiDollarSign className="text-2xl text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="font-semibold text-gray-800">₹{book.Price}</p>
                </div>
                <div className="text-center">
                  <FiTag className="text-2xl text-purple-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Category</p>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${genreColors[book.genre] || 'bg-gray-100 text-gray-800'}`}>
                    {book.genre || 'General'}
                  </span>
                </div>
                <div className="text-center">
                  <FiAward className="text-2xl text-yellow-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">ISBN</p>
                  <p className="font-semibold text-gray-800">{book.isbn || 'N/A'}</p>
                </div>
              </div>

              {/* Description */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {book.Description || 'No description available for this book.'}
                </p>
              </div>
            </div>

            {/* Rating Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Rate & Review This Book</h3>
              
              {/* User Rating */}
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-2">Your Rating</p>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRating(star)}
                      className={`text-2xl transition-all ${
                        star <= userRating 
                          ? 'text-yellow-400' 
                          : 'text-gray-300 hover:text-yellow-400'
                      }`}
                    >
                      <FiStar className={star <= userRating ? 'fill-current' : ''} />
                    </button>
                  ))}
                </div>
                {userRating > 0 && (
                  <p className="text-sm text-gray-600 mt-2">You rated this book {userRating} stars</p>
                )}
              </div>

              {/* Reviews */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Customer Reviews</h4>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b pb-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                            {review.user.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">{review.user}</p>
                            <p className="text-sm text-gray-500">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <FiStar 
                                key={star} 
                                className={`text-sm ${
                                  star <= review.rating 
                                    ? 'text-yellow-400 fill-current' 
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="font-semibold text-gray-800">{review.rating}.0</span>
                        </div>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Average Rating */}
              <div className="mt-6 pt-4 border-t">
                <div className="flex items-center justify-center">
                  <FiStar className="text-3xl text-yellow-400 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-gray-800">{averageRating}</p>
                    <p className="text-sm text-gray-500">Average Rating</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 mt-6">
                <Link 
                  to={`/edit-book/${book._id}`}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-center"
                >
                  <FiEdit className="inline mr-2" />
                  Edit Book
                </Link>
                <button className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                  <FiShare className="inline mr-2" />
                  Share Book
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
