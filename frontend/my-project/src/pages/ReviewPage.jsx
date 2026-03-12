import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiStar, FiMessageSquare, FiThumbsUp, FiThumbsDown, FiFilter, FiCalendar, FiUser, FiBook, FiSearch, FiX } from 'react-icons/fi';

const ReviewPage = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      bookId: 'book1',
      bookTitle: 'The Great Gatsby',
      bookAuthor: 'F. Scott Fitzgerald',
      bookCover: '📖',
      reviewerName: 'John Doe',
      reviewerAvatar: '👨',
      rating: 5,
      comment: 'Absolutely beautiful prose that captures the essence of the Jazz Age. Fitzgerald\'s writing is simply magical.',
      date: '2024-01-15',
      helpful: 15,
      verified: true
    },
    {
      id: 2,
      bookId: 'book1',
      bookTitle: 'The Great Gatsby',
      bookAuthor: 'F. Scott Fitzgerald',
      bookCover: '📖',
      reviewerName: 'Jane Smith',
      reviewerAvatar: '👩',
      rating: 4,
      comment: 'Great story, but felt a bit rushed towards the end. Could have been developed more.',
      date: '2024-01-20',
      helpful: 8,
      verified: false
    },
    {
      id: 3,
      bookId: 'book2',
      bookTitle: 'To Kill a Mockingbird',
      bookAuthor: 'Harper Lee',
      bookCover: '📕',
      reviewerName: 'Mike Johnson',
      reviewerAvatar: '👨‍🦱',
      rating: 5,
      comment: 'Powerful commentary on racial injustice and moral growth. Every American should read this book.',
      date: '2024-01-22',
      helpful: 23,
      verified: true
    },
    {
      id: 4,
      bookId: 'book3',
      bookTitle: '1984',
      bookAuthor: 'George Orwell',
      bookCover: '📘',
      reviewerName: 'Sarah Wilson',
      reviewerAvatar: '👩‍♀️',
      rating: 3,
      comment: 'Chilling dystopian vision that feels more relevant today than ever. Masterpiece.',
      date: '2024-01-10',
      helpful: 18,
      verified: false
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [formData, setFormData] = useState({ rating: 5, comment: '' });

  const books = [
    { id: 'book1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 'book2', title: 'To Kill a Mockingbird', author: 'Harper Lee' },
    { id: 'book3', title: '1984', author: 'George Orwell' }
  ];

  useEffect(() => {
    // In real app, fetch reviews from API
    // For demo, using mock data
  }, []);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    setLoading(true);

    const newReview = {
      id: Math.max(...reviews.map(r => r.id), 0) + 1,
      bookId: selectedBook,
      bookTitle: books.find(b => b.id === selectedBook)?.title || 'Unknown Book',
      bookAuthor: books.find(b => b.id === selectedBook)?.author || 'Unknown Author',
      bookCover: books.find(b => b.id === selectedBook)?.id === 'book1' ? '📖' : books.find(b => b.id === selectedBook)?.id === 'book2' ? '📕' : '📘',
      reviewerName: 'Current User',
      reviewerAvatar: '👤',
      rating: formData.rating,
      comment: formData.comment,
      date: new Date().toISOString().split('T')[0],
      helpful: 0,
      verified: false
    };

    setReviews([...reviews, newReview]);
    alert('Review submitted successfully!');
    setFormData({ rating: 5, comment: '' });
    setShowReviewForm(false);
    setLoading(false);
  };

  const handleHelpful = (reviewId) => {
    setReviews(reviews.map(review => 
      review.id === reviewId 
        ? { ...review, helpful: review.helpful + 1 }
        : review
    ));
  };

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       review.comment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBook = selectedBook === 'all' || review.bookId === selectedBook;
    return matchesSearch && matchesBook;
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.date) - new Date(a.date);
      case 'rating-high':
        return (b.rating || 0) - (a.rating || 0);
      case 'rating-low':
        return (a.rating || 0) - (b.rating || 0);
      case 'helpful':
        return b.helpful - a.helpful;
      default:
        return 0;
    }
  });

  const getAverageRating = () => {
    const validReviews = filteredReviews.filter(review => review.rating);
    if (validReviews.length === 0) return '0.0';
    const totalRating = validReviews.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / validReviews.length).toFixed(1);
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    filteredReviews.forEach(review => {
      if (review.rating >= 1 && review.rating <= 5) {
        distribution[review.rating]++;
      }
    });
    return distribution;
  };

  const renderStars = (rating) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map(star => (
          <FiStar
            key={star}
            className={`text-lg ${
              star <= rating 
                ? 'text-yellow-400 fill-current' 
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div style={{ backgroundColor: '#f0ead6', minHeight: '100vh' }}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            <FiMessageSquare className="inline mr-3 text-blue-600" />
            Book Reviews & Ratings
          </h1>
          <p className="text-gray-600 text-lg">Share your thoughts and help others discover great books</p>
        </div>

        {/* Review Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <FiMessageSquare className="text-4xl text-blue-600 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-800">{filteredReviews.length}</h3>
            <p className="text-gray-600">Total Reviews</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <FiStar className="text-4xl text-yellow-500 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-800">{getAverageRating()}</h3>
            <p className="text-gray-600">Average Rating</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <FiThumbsUp className="text-4xl text-green-600 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-800">
              {filteredReviews.reduce((sum, review) => sum + review.helpful, 0)}
            </h3>
            <p className="text-gray-600">Helpful Votes</p>
          </div>
        </div>

        {/* Add Review Button */}
        <div className="text-center mb-8">
          <button
            onClick={() => setShowReviewForm(true)}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center text-lg font-semibold"
          >
            <FiMessageSquare className="mr-3" />
            Write a Review
          </button>
        </div>

        {/* Review Form */}
        {showReviewForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full mx-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Write a Review
                </h2>
                <button
                  onClick={() => setShowReviewForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX />
                </button>
              </div>

              <form onSubmit={handleSubmitReview}>
                {/* Book Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Book
                  </label>
                  <select
                    value={selectedBook}
                    onChange={(e) => setSelectedBook(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Books</option>
                    {books.map(book => (
                      <option key={book.id} value={book.id}>
                        {book.cover} {book.title} by {book.author}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Rating */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Rating
                  </label>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600">Rate this book:</span>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData({...formData, rating: star})}
                          className={`text-2xl transition-all ${
                            formData.rating >= star
                              ? 'text-yellow-400'
                              : 'text-gray-300 hover:text-yellow-400'
                          }`}
                        >
                          <FiStar className={formData.rating >= star ? 'fill-current' : ''} />
                        </button>
                      ))}
                    </div>
                    <span className="text-lg font-semibold text-gray-800 ml-4">
                      {formData.rating}.0 stars
                    </span>
                  </div>
                </div>

                {/* Comment */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Review
                  </label>
                  <textarea
                    value={formData.comment}
                    onChange={(e) => setFormData({...formData, comment: e.target.value})}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Share your thoughts about this book..."
                    required
                  />
                </div>

                {/* Submit Buttons */}
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <FiMessageSquare className="inline mr-2" />
                        Submit Review
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FiSearch className="inline mr-2" />
                Search Reviews
              </label>
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by book title or review content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Book Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FiBook className="inline mr-2" />
                Filter by Book
              </label>
              <select
                value={selectedBook}
                onChange={(e) => setSelectedBook(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Books</option>
                {books.map(book => (
                  <option key={book.id} value={book.id}>
                    {book.cover} {book.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FiFilter className="inline mr-2" />
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="recent">Most Recent</option>
                <option value="rating-high">Highest Rated</option>
                <option value="rating-low">Lowest Rated</option>
                <option value="helpful">Most Helpful</option>
              </select>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating Filter
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map(rating => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => setRatingFilter(rating === ratingFilter ? 'all' : rating)}
                    className={`px-3 py-2 rounded-lg border-2 transition-all ${
                      ratingFilter === rating || (ratingFilter === 'all' && rating === 5)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    ⭐ {rating}
                  </button>
                ))}
                <button
                  onClick={() => setRatingFilter('all')}
                  className={`px-3 py-2 rounded-lg border-2 transition-all ${
                    ratingFilter === 'all'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  All Ratings
                </button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-center text-gray-600 mt-6">
            {sortedReviews.length} of {reviews.length} reviews shown
          </div>
        </div>

        {/* Reviews List */}
        {sortedReviews.length > 0 ? (
          <div className="space-y-6">
            {sortedReviews.map((review) => (
              <div key={review.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300">
                {/* Review Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{review.bookCover}</span>
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg">{review.bookTitle}</h3>
                      <p className="text-gray-600">by {review.bookAuthor}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-sm text-gray-500">
                        <FiCalendar className="mr-1" />
                        {new Date(review.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {review.verified && (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                        ✓ Verified
                      </span>
                    )}
                    <div className="flex items-center space-x-1">
                      <span className="text-gray-600 mr-2">Review by:</span>
                      <div className="flex items-center">
                        <span className="text-2xl mr-2">{review.reviewerAvatar}</span>
                        <span className="font-semibold text-gray-800">{review.reviewerName}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  {renderStars(review.rating)}
                  <span className="ml-2 text-lg font-semibold text-gray-800">{review.rating}.0</span>
                </div>

                {/* Review Comment */}
                <div className="mb-4">
                  <p className="text-gray-600 leading-relaxed">{review.comment}</p>
                </div>

                {/* Review Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <FiThumbsUp className="mr-1" />
                    Helpful ({review.helpful})
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <FiCalendar className="mr-1" />
                    {new Date(review.date).toLocaleDateString()}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleHelpful(review.id)}
                      className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 transition-colors"
                    >
                      <FiThumbsUp />
                      Helpful
                    </button>
                    <button className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition-colors">
                      View Book
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="bg-gray-100 rounded-full p-8 mb-6 inline-block">
                <FiMessageSquare className="text-6xl text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                No reviews yet
              </h3>
              <p className="text-gray-500 mb-6">
                Be the first to share your thoughts about amazing books!
              </p>
              <div className="flex space-x-4 justify-center">
                <Link to="/gallery" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  <FiBook className="inline mr-2" />
                  Browse Books
                </Link>
                <button
                  onClick={() => setShowReviewForm(true)}
                  className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  <FiMessageSquare className="inline mr-2" />
                  Write First Review
                </button>
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
    </div>
  );
};

export default ReviewPage;
