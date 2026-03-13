import { useState } from 'react';
import { FiBook, FiUser, FiCalendar, FiDollarSign, FiArrowLeft, FiImage } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { bookAPI } from '../services/api';

const AddBook = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publishDate: '',
    price: '',
    description: '',
    image: ''
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
          description: '',
          image: ''
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
    <div className="min-h-screen">
      <div className="creative-container">
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
          <div className="form-creative">
            {/* Header */}
            <div className="creative-header mb-8">
              <div className="flex justify-center mb-6">
                <div className="glass-card p-6 inline-flex">
                  <FiBook className="text-4xl text-blue-600" />
                </div>
              </div>
              <h1>Add New Book</h1>
              <p>Fill in details to add a new book to your collection</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="glass-card mb-6 border border-red-300">
                <p className="text-red-600 font-semibold">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* Book Title */}
              <div className="form-group-creative">
                <label>Book Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="form-input-creative"
                  placeholder="Enter book title"
                />
              </div>

              {/* Author Name */}
              <div className="form-group-creative">
                <label>Author Name</label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="form-input-creative"
                  placeholder="Enter author name"
                />
              </div>

              {/* Publish Date */}
              <div className="form-group-creative">
                <label>Publish Date</label>
                <input
                  type="date"
                  name="publishDate"
                  value={formData.publishDate}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="form-input-creative"
                />
              </div>

              {/* Price */}
              <div className="form-group-creative">
                <label>Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="form-input-creative"
                  placeholder="Enter book price"
                  min="0"
                  step="0.01"
                />
              </div>

              {/* Image URL */}
              <div className="form-group-creative">
                <label>Book Cover Image URL (Optional)</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  disabled={loading}
                  className="form-input-creative"
                  placeholder="https://example.com/book-cover.jpg"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Enter a URL for the book cover image. Leave empty to use default icon.
                </p>
              </div>

              {/* Description */}
              <div className="form-group-creative">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  disabled={loading}
                  className="form-input-creative"
                  placeholder="Enter book description"
                  rows="4"
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-creative btn-primary-creative flex-1"
                >
                  {loading ? (
                    <>
                      <div className="loading-spinner-creative w-5 h-5 mr-2"></div>
                      Adding Book...
                    </>
                  ) : (
                    <>
                      <FiBook className="mr-2" />
                      Add Book
                    </>
                  )}
                </button>
                <Link
                  to="/"
                  className="btn-creative btn-secondary-creative"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
