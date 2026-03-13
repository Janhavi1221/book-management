import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdvancedIcons from './AdvancedIcons';
import { bookAPI } from '../services/api';
import '../styles/advanced.css';
import library1 from "../assets/library1.jpg";

const AdvancedDashboard = () => {
  const [stats, setStats] = useState({
    totalBooks: 0,
    recentlyAdded: 0,
    thisMonth: 0,
    totalValue: 0
  });
  const [recentBooks, setRecentBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('AdvancedDashboard: Fetching books...');
        const response = await bookAPI.getAllBooks();
        console.log('AdvancedDashboard: API Response:', response);
        
        if (response.Success) {
          const books = response.BookList || [];
          console.log('AdvancedDashboard: Books found:', books);
          const totalBooks = books.length;
          const totalValue = books.reduce((sum, book) => sum + (book.Price || 0), 0);
          const thisMonth = books.filter(book => {
            const bookDate = new Date(book.PublishDate);
            const now = new Date();
            return (
              bookDate.getMonth() === now.getMonth() &&
              bookDate.getFullYear() === now.getFullYear()
            );
          }).length;
          const recentBooks = books.slice(-3).reverse();

          console.log('AdvancedDashboard: Stats calculated:', { totalBooks, totalValue, thisMonth });
          console.log('AdvancedDashboard: Recent books:', recentBooks);

          setStats({
            totalBooks,
            recentlyAdded: Math.min(3, totalBooks),
            thisMonth,
            totalValue
          });
          setRecentBooks(recentBooks);
        } else {
          console.log('AdvancedDashboard: API response failed:', response);
        }
      } catch (error) {
        console.error('AdvancedDashboard fetch error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredRecentBooks = recentBooks.filter(book =>
    book.BookTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.BookAuthor?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f0ead6' }}>
        <div className="text-center">
          <div className="loading-dots mb-4">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <p className="text-gray-800 text-lg">Loading amazing books...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="creative-container">
        {/* Welcome Section */}
        <div className="creative-header animate-fadeInUp">
          <div className="inline-flex items-center mb-6">
            <div className="glass-card p-6 inline-flex">
              <img 
                src={library1} 
                alt="Book" 
                style={{ width: "60px", height: "60px", objectFit: "contain" }} 
              />
            </div>
          </div>
          <h1>BookShelf</h1>
          <p>Discover amazing books and expand your library</p>
        </div>

        {/* Search Bar */}
        <div className="search-creative mb-8 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          <AdvancedIcons.Search size={20} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search recent books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input-creative"
          />
        </div>

        {/* Statistics Cards */}
        <div className="mb-20">
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'nowrap' }}>
            {/* Total Books */}
            <div style={{ width: '200px', textAlign: 'center', border: '2px solid #60a5fa', padding: '16px', borderRadius: '8px', backgroundColor: '#eff6ff', margin: '0 8px' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>📚</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2563eb' }}>{stats.totalBooks}</div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>Total Books</div>
            </div>

            {/* Recently Added */}
            <div style={{ width: '200px', textAlign: 'center', border: '2px solid #34d399', padding: '16px', borderRadius: '8px', backgroundColor: '#ecfdf5', margin: '0 8px' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>📕</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#059669' }}>{stats.recentlyAdded}</div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>Recently Added</div>
            </div>

            {/* Total Value */}
            <div style={{ width: '200px', textAlign: 'center', border: '2px solid #fbbf24', padding: '16px', borderRadius: '8px', backgroundColor: '#fefce8', margin: '0 8px' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>💰</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#d97706' }}>₹{stats.totalValue.toFixed(2)}</div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>Total Value</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="creative-grid mb-12 mt-8">
          <Link 
            to="/add-book" 
            className="creative-card animate-fadeInUp"
            style={{ animationDelay: '0.7s' }}
          >
            <div className="text-center">
              <div className="glass-card p-6 inline-flex mb-6">
                <AdvancedIcons.BookClosed size={24} className="text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Add New Book</h3>
              <p className="text-gray-600 mb-6">Add a new book to your collection</p>
              <button className="btn-creative btn-primary-creative">
                <AdvancedIcons.BookClosed size={20} />
                Add Book
              </button>
            </div>
          </Link>

          <Link 
            to="/view-books" 
            className="creative-card animate-fadeInUp"
            style={{ animationDelay: '0.8s' }}
          >
            <div className="text-center">
              <div className="glass-card p-6 inline-flex mb-6">
                <AdvancedIcons.BookOpen size={24} className="text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">View All Books</h3>
              <p className="text-gray-600 mb-6">Browse and manage your book collection</p>
              <button className="btn-creative btn-secondary-creative">
                <AdvancedIcons.BookOpen size={20} />
                View Books
              </button>
            </div>
          </Link>
        </div>
      </div>
      {/* Footer */}
      <div className="text-center mt-12 animate-fadeInUp" style={{ animationDelay: '1.2s' }}>
        <div className="glass-card inline-flex items-center space-x-6 text-gray-500">
          <div className="flex items-center">
            <AdvancedIcons.Star size={16} className="text-yellow-500 mr-2" />
            <span>Advanced Book Management System</span>
          </div>
          <div className="flex items-center">
            <span>Powered by</span>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold ml-2">
              React & Node.js
            </span>
            <div className="flex items-center">
              <span>Powered by</span>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold ml-2">
                React & Node.js
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedDashboard;
