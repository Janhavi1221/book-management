import { useState } from 'react';
import { FiBook, FiUser, FiCalendar, FiDollarSign, FiArrowLeft } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { bookAPI } from '../services/api';

const AddBook = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publishDate: '',
    price: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await bookAPI.addBook(formData);
      
      if (response.Success) {
        alert('Book added successfully!');
        setFormData({
          title: '',
          author: '',
          publishDate: '',
          price: '',
          description: ''
        });
        navigate('/view-books');
      } else {
        setError(response.Message || 'Failed to add book');
      }
    } catch (err) {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#f0ead6', minHeight: '100vh' }}>
      <div className="container">
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6 transition-all duration-300 hover:transform hover:translateX-2"
        >
          <FiArrowLeft />
          <span>Back to Dashboard</span>
        </Link>

        {/* Form Card */}
        <div className="max-w-lg mx-auto">
          <div className="card hover-lift">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
                  <FiBook className="text-4xl text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-3">Add New Book</h1>
              <p className="text-gray-600 text-lg">Fill in details to add a new book to your collection</p>
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
                    value={formData.title}
                    onChange={handleChange}
                    required
                    disabled={loading}
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
                    value={formData.author}
                    onChange={handleChange}
                    required
                    disabled={loading}
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
                    value={formData.publishDate}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Price */}
              <div className="form-group">
                <label className="form-label">
                  Price (₹)
                </label>
                <div className="input-icon" data-icon="💰">
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    step="0.01"
                    min="0"
                    disabled={loading}
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
                    value={formData.description}
                    onChange={handleChange}
                    disabled={loading}
                    className="form-input min-h-[100px] resize-none"
                    placeholder="Enter book description (optional)"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary glow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Adding Book...
                  </>
                ) : (
                  <>
                    <FiBook />
                    Add Book
                  </>
                )}
              </button>
            </form>

            {/* Additional Options */}
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Want to add multiple books?{' '}
                <Link to="/add-book" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200">
                  Add another book
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
