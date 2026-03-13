import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiEdit, FiTrash2, FiBook, FiGrid, FiList, FiTag, FiSave, FiX, FiFilter, FiSearch } from 'react-icons/fi';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Fiction', description: 'Novels, stories, and fictional narratives', icon: '📖', color: 'purple', bookCount: 24 },
    { id: 2, name: 'Programming', description: 'Computer science, coding, and technical books', icon: '💻', color: 'blue', bookCount: 18 },
    { id: 3, name: 'Science', description: 'Scientific research and educational content', icon: '🔬', color: 'green', bookCount: 32 },
    { id: 4, name: 'History', description: 'Historical events and biographical works', icon: '📜', color: 'yellow', bookCount: 15 },
    { id: 5, name: 'Biography', description: 'Life stories and personal accounts', icon: '👤', color: 'pink', bookCount: 21 },
    { id: 6, name: 'Self-Help', description: 'Personal development and motivational content', icon: '🎯', color: 'indigo', bookCount: 28 },
    { id: 7, name: 'Business', description: 'Business, finance, and entrepreneurship', icon: '💼', color: 'red', bookCount: 19 },
    { id: 8, name: 'Art & Design', description: 'Creative arts and design principles', icon: '🎨', color: 'orange', bookCount: 12 }
  ]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '', icon: '📚', color: 'blue' });
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedColor, setSelectedColor] = useState('all');

  const colorClasses = {
    purple: 'from-purple-400 to-purple-600',
    blue: 'from-blue-400 to-blue-600',
    green: 'from-green-400 to-green-600',
    yellow: 'from-yellow-400 to-yellow-600',
    pink: 'from-pink-400 to-pink-600',
    indigo: 'from-indigo-400 to-indigo-600',
    red: 'from-red-400 to-red-600',
    orange: 'from-orange-400 to-orange-600'
  };

  const colors = [
    { id: 'purple', name: 'Purple', class: 'from-purple-400 to-purple-600' },
    { id: 'blue', name: 'Blue', class: 'from-blue-400 to-blue-600' },
    { id: 'green', name: 'Green', class: 'from-green-400 to-green-600' },
    { id: 'yellow', name: 'Yellow', class: 'from-yellow-400 to-yellow-600' },
    { id: 'pink', name: 'Pink', class: 'from-pink-400 to-pink-600' },
    { id: 'indigo', name: 'Indigo', class: 'from-indigo-400 to-indigo-600' },
    { id: 'red', name: 'Red', class: 'from-red-400 to-red-600' },
    { id: 'orange', name: 'Orange', class: 'from-orange-400 to-orange-600' }
  ];

  const icons = ['📚', '📖', '📕', '📗', '📘', '📙', '📔', '📓', '📰', '📜', '🔬', '💻', '🎨', '🎯', '💼', '👤', '🌟', '🚀', '🔥', '💎'];

  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesColor = selectedColor === 'all' || category.color === selectedColor;
    return matchesSearch && matchesColor;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (editingCategory) {
      setCategories(categories.map(cat => 
        cat.id === editingCategory.id 
          ? { ...cat, ...formData }
          : cat
      ));
    } else {
      const newCategory = {
        id: Date.now(),
        ...formData,
        bookCount: 0
      };
      setCategories([...categories, newCategory]);
    }

    setLoading(false);
    setShowAddForm(false);
    setEditingCategory(null);
    setFormData({ name: '', description: '', icon: '📚', color: 'blue' });
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      icon: category.icon,
      color: category.color
    });
    setShowAddForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  const totalBooks = categories.reduce((sum, cat) => sum + cat.bookCount, 0);

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
          <p className="text-gray-800 text-lg mt-4">Loading categories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="creative-container">
        {/* Header */}
        <div className="creative-header mb-8">
          <h1>Category Management</h1>
          <p>Organize your books with custom categories</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-card text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{categories.length}</div>
            <p className="text-gray-600">Total Categories</p>
          </div>
          <div className="glass-card text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{totalBooks}</div>
            <p className="text-gray-600">Total Books</p>
          </div>
          <div className="glass-card text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {Math.round(totalBooks / categories.length)}
            </div>
            <p className="text-gray-600">Avg Books per Category</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="glass-card mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="search-creative flex-1">
              <FiSearch size={20} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input-creative"
              />
            </div>
            <div className="form-group-creative mb-0">
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="form-input-creative"
              >
                <option value="all">All Colors</option>
                {colors.map(color => (
                  <option key={color.id} value={color.id}>{color.name}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`btn-creative ${viewMode === 'grid' ? 'btn-primary-creative' : 'btn-secondary-creative'}`}
              >
                <FiGrid size={20} />
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`btn-creative ${viewMode === 'list' ? 'btn-primary-creative' : 'btn-secondary-creative'}`}
              >
                <FiList size={20} />
                List
              </button>
            </div>
          </div>
        </div>

        {/* Add Category Button */}
        <div className="mb-8">
          <button
            onClick={() => setShowAddForm(true)}
            className="btn-creative btn-primary-creative"
          >
            <FiPlus size={20} />
            Add New Category
          </button>
        </div>

        {/* Categories Display */}
        {filteredCategories.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="creative-grid">
              {filteredCategories.map((category) => (
                <div key={category.id} className="book-card-creative">
                  <div className={`book-cover-creative bg-gradient-to-br ${colorClasses[category.color]}`}>
                    <span className="text-4xl">{category.icon}</span>
                    <div className="absolute top-2 right-2 bg-white bg-opacity-90 rounded-full px-2 py-1">
                      <span className="text-xs font-semibold">{category.bookCount} books</span>
                    </div>
                  </div>
                  <div className="book-info-creative">
                    <h3 className="book-title-creative">{category.name}</h3>
                    <p className="book-author-creative text-sm">{category.description}</p>
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => handleEdit(category)}
                        className="btn-creative btn-secondary-creative flex-1"
                      >
                        <FiEdit size={16} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
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
              {filteredCategories.map((category) => (
                <div key={category.id} className="glass-card">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${colorClasses[category.color]} flex items-center justify-center`}>
                        <span className="text-2xl">{category.icon}</span>
                      </div>
                      <div>
                        <h3 className="book-title-creative">{category.name}</h3>
                        <p className="book-author-creative text-sm">{category.description}</p>
                        <div className="text-sm text-gray-500 mt-1">{category.bookCount} books</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(category)}
                        className="btn-creative btn-secondary-creative"
                      >
                        <FiEdit size={16} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
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
              <FiTag size={48} className="text-gray-400 mb-6" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No categories found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your search or add a new category</p>
              <button
                onClick={() => setShowAddForm(true)}
                className="btn-creative btn-primary-creative"
              >
                <FiPlus size={20} />
                Add First Category
              </button>
            </div>
          </div>
        )}

        {/* Add/Edit Category Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="glass-card max-w-md w-full m-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {editingCategory ? 'Edit Category' : 'Add New Category'}
                </h2>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingCategory(null);
                    setFormData({ name: '', description: '', icon: '📚', color: 'blue' });
                  }}
                  className="btn-creative btn-secondary-creative"
                >
                  <FiX size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-group-creative">
                  <label>Category Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    className="form-input-creative"
                    placeholder="Enter category name"
                  />
                </div>

                <div className="form-group-creative">
                  <label>Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                    className="form-input-creative"
                    placeholder="Enter category description"
                    rows="3"
                  />
                </div>

                <div className="form-group-creative">
                  <label>Icon</label>
                  <div className="grid grid-cols-10 gap-2">
                    {icons.map((icon, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setFormData({...formData, icon})}
                        className={`p-2 rounded-lg border-2 transition-all ${
                          formData.icon === icon 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group-creative">
                  <label>Color</label>
                  <div className="grid grid-cols-4 gap-2">
                    {colors.map((color) => (
                      <button
                        key={color.id}
                        type="button"
                        onClick={() => setFormData({...formData, color: color.id})}
                        className={`p-3 rounded-lg bg-gradient-to-br ${color.class} text-white font-semibold transition-all ${
                          formData.color === color.id 
                            ? 'ring-2 ring-offset-2 ring-blue-500' 
                            : 'hover:scale-105'
                        }`}
                      >
                        {color.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-creative btn-primary-creative flex-1"
                  >
                    {loading ? (
                      <>
                        <div className="loading-spinner-creative w-5 h-5 mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <FiSave size={20} />
                        {editingCategory ? 'Update' : 'Add'} Category
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingCategory(null);
                      setFormData({ name: '', description: '', icon: '📚', color: 'blue' });
                    }}
                    className="btn-creative btn-secondary-creative"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryManagement;
