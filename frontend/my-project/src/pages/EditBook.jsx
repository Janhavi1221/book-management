import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiEdit2, FiBook, FiUser, FiCalendar, FiDollarSign, FiArrowLeft } from 'react-icons/fi';
import { bookAPI } from '../services/api';

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    publishDate: "",
    price: "",
    description: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await bookAPI.findBook(id);
        if (response.Success && response.Book.length > 0) {
          const book = response.Book[0];
          setBookData({
            title: book.BookTitle || '',
            author: book.BookAuthor || '',
            publishDate: book.PublishDate ? new Date(book.PublishDate).toISOString().split('T')[0] : '',
            price: book.Price?.toString() || '',
            description: book.Description || ''
          });
        } else {
          setError('Book not found');
        }
      } catch (err) {
        setError('Failed to load book details');
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    setBookData({
      ...bookData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const response = await bookAPI.updateBook(id, bookData);
      if (response.Success) {
        alert('Book updated successfully!');
        navigate('/view-books');
      } else {
        setError(response.Message || 'Failed to update book');
      }
    } catch (err) {
      setError('Failed to connect to server');
      console.error('API Error:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-gradient flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading book details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient">
      <div className="container">
        {/* Back Button */}
        <button
          onClick={() => navigate('/view-books')}
          className="inline-flex items-center space-x-2 text-white hover:text-blue-200 mb-6 transition-all duration-300 hover:transform hover:translateX-2"
        >
          <FiArrowLeft />
          <span>Back to Books</span>
        </button>

        {/* Form Card */}
        <div className="max-w-lg mx-auto">
          <div className="card hover-lift">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
                  <FiEdit2 className="text-4xl text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-3">Edit Book</h1>
              <p className="text-gray-600 text-lg">Update book details in your collection</p>
            </div>

            {/* Book Info */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4 mb-6">
              <p className="text-sm text-blue-800 font-semibold">
                <span className="flex items-center">
                  <FiBook className="mr-2" />
                  Editing Book ID: {id}
                </span>
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
                <p className="font-semibold">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-7">
              {/* Book Title */}
              <div className="form-group">
                <label className="form-label">
                  Book Title
                </label>
                <div className="input-icon" data-icon="📚">
                  <input
                    type="text"
                    name="title"
                    value={bookData.title}
                    onChange={handleChange}
                    required
                    disabled={saving}
                    className="form-input"
                    placeholder="Enter book title"
                  />
                </div>
              </div>

              {/* Author Name */}
              <div className="form-group">
                <label className="form-label">
                  Author Name
                </label>
                <div className="input-icon" data-icon="✍️">
                  <input
                    type="text"
                    name="author"
                    value={bookData.author}
                    onChange={handleChange}
                    required
                    disabled={saving}
                    className="form-input"
                    placeholder="Enter author name"
                  />
                </div>
              </div>

              {/* Publish Date */}
              <div className="form-group">
                <label className="form-label">
                  Publish Date
                </label>
                <div className="input-icon" data-icon="📅">
                  <input
                    type="date"
                    name="publishDate"
                    value={bookData.publishDate}
                    onChange={handleChange}
                    required
                    disabled={saving}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Price */}
              <div className="form-group">
                <label className="form-label">
                  Price
                </label>
                <div className="input-icon" data-icon="💰">
                  <input
                    type="number"
                    name="price"
                    value={bookData.price}
                    onChange={handleChange}
                    required
                    step="0.01"
                    min="0"
                    disabled={saving}
                    className="form-input"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Description (Optional) */}
              <div className="form-group">
                <label className="form-label">
                  Description (Optional)
                </label>
                <div className="input-icon" data-icon="📝">
                  <textarea
                    name="description"
                    value={bookData.description}
                    onChange={handleChange}
                    disabled={saving}
                    className="form-input min-h-[100px] resize-none"
                    placeholder="Enter book description (optional)"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 btn-secondary glow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Updating...
                    </>
                  ) : (
                    <>
                      <FiEdit2 />
                      Update Book
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/view-books')}
                  disabled={saving}
                  className="flex-1 bg-gray-200 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-300 transition-all duration-200 font-semibold disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </form>

            {/* Additional Options */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex justify-between text-sm">
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this book?')) {
                      bookAPI.deleteBook(id).then(() => {
                        alert('Book deleted successfully!');
                        navigate('/view-books');
                      }).catch(() => {
                        alert('Delete functionality not available in backend yet');
                      });
                    }
                  }}
                  className="text-red-600 hover:text-red-700 font-semibold transition-colors duration-200"
                >
                  🗑️ Delete Book
                </button>
                <button
                  onClick={() => navigate('/view-books')}
                  className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
                >
                  📚 View All Books
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBook;
