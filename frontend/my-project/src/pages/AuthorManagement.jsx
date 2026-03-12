import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiEdit, FiTrash2, FiUser, FiBook, FiGrid, FiList, FiMail, FiGlobe, FiSave, FiX, FiSearch } from 'react-icons/fi';

const AuthorManagement = () => {
  const [authors, setAuthors] = useState([
    { 
      id: 1, 
      name: 'J.K. Rowling', 
      bio: 'British author, best known for the Harry Potter series. Born in 1965.',
      books: 7,
      avatar: '👩‍♀️',
      email: 'jk.rowling@example.com',
      website: 'www.jkrowling.com'
    },
    { 
      id: 2, 
      name: 'Stephen King', 
      bio: 'American author of horror, supernatural fiction, and fantasy novels. Over 350 million books sold.',
      books: 63,
      avatar: '👨‍🦱',
      email: 'stephen.king@example.com',
      website: 'www.stephenking.com'
    },
    { 
      id: 3, 
      name: 'Agatha Christie', 
      bio: 'English writer known for her detective novels featuring Hercule Poirot.',
      books: 66,
      avatar: '👩‍♀️',
      email: 'agatha.christie@example.com',
      website: 'www.agathachristie.com'
    },
    { 
      id: 4, 
      name: 'George Orwell', 
      bio: 'English novelist and essayist, journalist, and critic. Famous for 1984 and Animal Farm.',
      books: 6,
      avatar: '👨‍🦱',
      email: 'george.orwell@example.com',
      website: 'N/A'
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState(null);
  const [formData, setFormData] = useState({ name: '', bio: '', email: '', website: '', avatar: '👤' });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // In real app, fetch authors from API
    // For demo, using mock data
  }, []);

  const handleAddAuthor = () => {
    setEditingAuthor(null);
    setFormData({ name: '', bio: '', email: '', website: '', avatar: '👤' });
    setShowAddForm(true);
  };

  const handleEditAuthor = (author) => {
    setEditingAuthor(author);
    setFormData({
      name: author.name,
      bio: author.bio,
      email: author.email,
      website: author.website,
      avatar: author.avatar
    });
    setShowAddForm(true);
  };

  const handleDeleteAuthor = (authorId) => {
    if (window.confirm('Are you sure you want to delete this author?')) {
      setAuthors(authors.filter(author => author.id !== authorId));
      // In real app, this would call API to delete author
      alert('Author deleted successfully!');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (editingAuthor) {
      // Update existing author
      setAuthors(authors.map(author => 
        author.id === editingAuthor.id 
          ? { ...formData, id: editingAuthor.id }
          : author
      ));
      alert('Author updated successfully!');
    } else {
      // Add new author
      const newAuthor = {
        id: Math.max(...authors.map(author => author.id), 0) + 1,
        ...formData,
        books: 0
      };
      setAuthors([...authors, newAuthor]);
      alert('Author added successfully!');
    }

    // Reset form
    setFormData({ name: '', bio: '', email: '', website: '', avatar: '👤' });
    setShowAddForm(false);
    setEditingAuthor(null);
    setLoading(false);
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingAuthor(null);
    setFormData({ name: '', bio: '', email: '', website: '', avatar: '👤' });
  };

  const filteredAuthors = authors.filter(author =>
    author.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAuthorStats = () => {
    return {
      total: authors.length,
      totalBooks: authors.reduce((sum, author) => sum + author.books, 0),
      averageBooks: authors.length > 0 ? (authors.reduce((sum, author) => sum + author.books, 0) / authors.length).toFixed(1) : '0'
    };
  };

  return (
    <div style={{ backgroundColor: '#f0ead6', minHeight: '100vh' }}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            <FiUser className="inline mr-3 text-blue-600" />
            Author Management
          </h1>
          <p className="text-gray-600 text-lg">Manage authors and their book collections</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <FiUser className="text-4xl text-blue-600 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-800">{getAuthorStats().total}</h3>
            <p className="text-gray-600">Total Authors</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <FiBook className="text-4xl text-green-600 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-800">{getAuthorStats().totalBooks}</h3>
            <p className="text-gray-600">Total Books</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <FiGrid className="text-4xl text-purple-600 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-800">{getAuthorStats().averageBooks}</h3>
            <p className="text-gray-600">Average Books/Author</p>
          </div>
        </div>

        {/* Search and Add */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {editingAuthor ? 'Edit Author' : 'Add New Author'}
            </h2>
            <button
              onClick={handleAddAuthor}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FiPlus />
              Add Author
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search authors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Author Form */}
          {showAddForm && (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Author Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Author Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter author name"
                />
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Biography
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter author biography"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="author@example.com"
                />
              </div>

              {/* Website */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({...formData, website: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com"
                />
              </div>

              {/* Avatar Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Avatar
                </label>
                <div className="grid grid-cols-8 gap-2">
                  {['👤', '👨‍🦱', '👩‍♀️', '🧑‍🦱', '👨‍💼', '👩‍💼', '🧑‍🎓', '👨‍🎓', '🧑‍🏫', '👴‍🏫', '🧑‍⚕️'].map(avatar => (
                    <button
                      key={avatar}
                      type="button"
                      onClick={() => setFormData({...formData, avatar})}
                      className={`p-3 rounded-lg border-2 transition-all text-2xl ${
                        formData.avatar === avatar
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {avatar}
                    </button>
                  ))}
                </div>
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
                      {editingAuthor ? 'Updating...' : 'Adding...'}
                    </>
                  ) : (
                    <>
                      <FiSave className="inline mr-2" />
                      {editingAuthor ? 'Update Author' : 'Add Author'}
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Authors List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAuthors.map((author) => (
            <div key={author.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
              {/* Author Header */}
              <div className="p-6 border-b">
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{author.avatar}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800">{author.name}</h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <FiMail className="mr-2" />
                      {author.email}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditAuthor(author)}
                      className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteAuthor(author.id)}
                      className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition-colors"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              </div>

              {/* Author Bio */}
              <div className="p-6">
                <p className="text-gray-600 leading-relaxed">{author.bio}</p>
              </div>

              {/* Author Stats */}
              <div className="p-6 bg-gray-50">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <FiBook className="text-3xl text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-800">{author.books}</p>
                    <p className="text-sm text-gray-500">Books Published</p>
                  </div>
                  <div>
                    <FiGlobe className="text-3xl text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-800">Website</p>
                    <p className="text-sm text-gray-500 break-all">{author.website || 'No website'}</p>
                  </div>
                  <div>
                    <FiGrid className="text-3xl text-purple-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-800">View Books</p>
                    <Link 
                      to={`/search?author=${encodeURIComponent(author.name)}`}
                      className="text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      Browse Collection
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

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

export default AuthorManagement;
