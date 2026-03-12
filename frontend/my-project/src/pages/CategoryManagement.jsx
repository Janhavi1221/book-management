import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiEdit, FiTrash2, FiBook, FiGrid, FiList, FiTag, FiSave, FiX } from 'react-icons/fi';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Fiction', description: 'Novels, stories, and fictional narratives', icon: '📖', color: 'purple' },
    { id: 2, name: 'Programming', description: 'Computer science, coding, and technical books', icon: '💻', color: 'blue' },
    { id: 3, name: 'Science', description: 'Scientific research and educational content', icon: '🔬', color: 'green' },
    { id: 4, name: 'History', description: 'Historical events and biographical works', icon: '📜', color: 'yellow' },
    { id: 5, name: 'Biography', description: 'Life stories and personal accounts', icon: '👤', color: 'pink' },
    { id: 6, name: 'Self-Help', description: 'Personal development and motivational content', icon: '🎯', color: 'indigo' },
    { id: 7, name: 'Business', description: 'Business, finance, and entrepreneurship', icon: '💼', color: 'red' },
    { id: 8, name: 'Art & Design', description: 'Creative arts and design principles', icon: '🎨', color: 'orange' }
  ]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '', icon: '📚', color: 'blue' });

  const colorClasses = {
    purple: 'bg-purple-100 text-purple-800 border-purple-300',
    blue: 'bg-blue-100 text-blue-800 border-blue-300',
    green: 'bg-green-100 text-green-800 border-green-300',
    yellow: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    pink: 'bg-pink-100 text-pink-800 border-pink-300',
    indigo: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    red: 'bg-red-100 text-red-800 border-red-300',
    orange: 'bg-orange-100 text-orange-800 border-orange-300'
  };

  const handleAddCategory = () => {
    setEditingCategory(null);
    setFormData({ name: '', description: '', icon: '📚', color: 'blue' });
    setShowAddForm(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      icon: category.icon,
      color: category.color
    });
    setShowAddForm(true);
  };

  const handleDeleteCategory = (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category? Books in this category will be moved to "General".')) {
      setCategories(categories.filter(cat => cat.id !== categoryId));
      // In real app, this would call API to delete category
      alert('Category deleted successfully!');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (editingCategory) {
      // Update existing category
      setCategories(categories.map(cat => 
        cat.id === editingCategory.id 
          ? { ...formData, id: editingCategory.id }
          : cat
      ));
      alert('Category updated successfully!');
    } else {
      // Add new category
      const newCategory = {
        id: Math.max(...categories.map(cat => cat.id), 0) + 1,
        ...formData
      };
      setCategories([...categories, newCategory]);
      alert('Category added successfully!');
    }

    // Reset form
    setFormData({ name: '', description: '', icon: '📚', color: 'blue' });
    setShowAddForm(false);
    setEditingCategory(null);
    setLoading(false);
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingCategory(null);
    setFormData({ name: '', description: '', icon: '📚', color: 'blue' });
  };

  const getCategoryStats = () => {
    return {
      total: categories.length,
      fiction: categories.filter(cat => cat.name === 'Fiction').length,
      programming: categories.filter(cat => cat.name === 'Programming').length,
      science: categories.filter(cat => cat.name === 'Science').length,
      history: categories.filter(cat => cat.name === 'History').length,
      other: categories.filter(cat => !['Fiction', 'Programming', 'Science', 'History'].includes(cat.name)).length
    };
  };

  return (
    <div style={{ backgroundColor: '#f0ead6', minHeight: '100vh' }}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            <FiTag className="inline mr-3 text-blue-600" />
            Category Management
          </h1>
          <p className="text-gray-600 text-lg">Manage book categories for better organization</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <FiGrid className="text-4xl text-blue-600 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-800">{getCategoryStats().total}</h3>
            <p className="text-gray-600">Total Categories</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <FiBook className="text-4xl text-purple-600 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-800">{getCategoryStats().fiction}</h3>
            <p className="text-gray-600">Fiction</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <FiBook className="text-4xl text-green-600 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-800">{getCategoryStats().programming}</h3>
            <p className="text-gray-600">Programming</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <FiBook className="text-4xl text-yellow-600 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-800">{getCategoryStats().science}</h3>
            <p className="text-gray-600">Science</p>
          </div>
        </div>

        {/* Add Category Button */}
        <div className="text-center mb-8">
          <button
            onClick={handleAddCategory}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center text-lg font-semibold"
          >
            <FiPlus className="mr-3" />
            Add New Category
          </button>
        </div>

        {/* Category Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </h2>
              <button
                onClick={handleCancel}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <FiX />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Category Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter category name"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter category description"
                />
              </div>

              {/* Icon Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Icon
                </label>
                <div className="grid grid-cols-8 gap-2">
                  {['📚', '📖', '💻', '🔬', '📜', '👤', '🎯', '💼', '🎨'].map(icon => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setFormData({...formData, icon})}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        formData.icon === icon
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <span className="text-2xl">{icon}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color Theme
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {Object.keys(colorClasses).map(color => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setFormData({...formData, color})}
                      className={`p-3 rounded-lg border-2 transition-all capitalize ${
                        formData.color === color
                          ? `${colorClasses[color]} border-current`
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded ${formData.color === color ? colorClasses[color] : 'bg-gray-100'}`}></div>
                      <span className="text-sm font-medium">{color}</span>
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
                      {editingCategory ? 'Updating...' : 'Adding...'}
                    </>
                  ) : (
                    <>
                      <FiSave className="inline mr-2" />
                      {editingCategory ? 'Update Category' : 'Add Category'}
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
          </div>
        )}

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group">
              {/* Category Header */}
              <div className={`p-6 ${colorClasses[category.color]}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <span className="text-4xl mr-3">{category.icon}</span>
                    <h3 className="text-xl font-bold text-gray-800">{category.name}</h3>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditCategory(category)}
                      className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition-colors"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{category.description}</p>
              </div>

              {/* Preview */}
              <div className="bg-gray-50 p-4">
                <p className="text-sm text-gray-500">
                  <strong>Example books:</strong> The Great Gatsby, To Kill a Mockingbird, 1984
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">Fiction</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Classic</span>
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">Literature</span>
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

export default CategoryManagement;
