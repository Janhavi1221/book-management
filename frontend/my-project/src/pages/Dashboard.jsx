import { Link } from 'react-router-dom';
import { FiBookOpen, FiPlusCircle, FiTrendingUp, FiCalendar } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { bookAPI } from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalBooks: 0,
    recentlyAdded: 0,
    thisMonth: 0,
    totalValue: 0
  });
  const [recentBooks, setRecentBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH BOOK DATA
  useEffect(() => {

    const fetchData = async () => {

      try {

        console.log('Fetching books from API...');
        const response = await bookAPI.getAllBooks();
        console.log('API Response:', response);

        if (response.Success) {

          const books = response.BookList || [];
          console.log('Books found:', books.length);
          console.log('Books data:', books);

          const totalBooks = books.length;

          const totalValue = books.reduce(
            (sum, book) => sum + (book.Price || 0),
            0
          );

          const thisMonth = books.filter(book => {

            const bookDate = new Date(book.PublishDate);
            const now = new Date();

            return (
              bookDate.getMonth() === now.getMonth() &&
              bookDate.getFullYear() === now.getFullYear()
            );

          }).length;

          const recentBooks = books.slice(-3).reverse();

          setStats({
            totalBooks,
            recentlyAdded: Math.min(3, totalBooks),
            thisMonth,
            totalValue
          });

          setRecentBooks(recentBooks);

        } else {
          console.log('API Response failed:', response);
        }

      } catch (error) {
        console.error('Dashboard fetch error:', error);
        console.log('Backend might not be running or CORS issue');
      } finally {
        setLoading(false);
      }

    };

    fetchData();

  }, []);

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f0ead6' }}>

        <div className="text-center">

          <div className="spinner mx-auto mb-4"></div>

          <p className="text-gray-800 text-lg">Loading dashboard...</p>

        </div>

      </div>

    );

  }

  return (

    <div className="min-h-screen" style={{ backgroundColor: '#f0ead6' }}>

      <div className="container">

        {/* Welcome */}

        <div className="text-center mb-6">

          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to BookShelf
          </h1>

          <p className="text-lg text-gray-600">
            Discover amazing books and expand your library
          </p>

        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2">
          <Link to="/add-book" className="card text-center group hover:transform hover:scale-105 transition-all duration-200">
            <FiPlusCircle className="text-4xl text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Add New Book</h3>
            <p className="text-gray-600">Add a new book to your collection</p>
          </Link>

          <Link to="/view-books" className="card text-center group hover:transform hover:scale-105 transition-all duration-200">
            <FiBookOpen className="text-4xl text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">View All Books</h3>
            <p className="text-gray-600">Browse and manage your book collection</p>
          </Link>
        </div>

        {/* Gallery Preview */}
        <div className="card mb-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              <FiGrid className="inline mr-3 text-blue-600" />
              Book Gallery
            </h2>
            <p className="text-gray-600 mb-6">View your books in a beautiful gallery layout with advanced filtering</p>
            <Link 
              to="/gallery" 
              className="btn-primary glow inline-flex items-center"
            >
              <FiGrid />
              Open Gallery
            </Link>
          </div>
        </div>

        {/* STATISTICS */}

        <div className="grid grid-cols-4 mb-8">

          <div className="stat-card">

            <FiBookOpen className="text-3xl text-blue-600 mb-3" />

            <h3 className="text-2xl font-bold">{stats.totalBooks}</h3>

            <p className="text-gray-600">Total Books</p>

          </div>

          <div className="stat-card">

            <FiPlusCircle className="text-3xl text-green-600 mb-3" />

            <h3 className="text-2xl font-bold">{stats.recentlyAdded}</h3>

            <p className="text-gray-600">Recently Added</p>

          </div>

          <div className="stat-card">

            <FiCalendar className="text-3xl text-purple-600 mb-3" />

            <h3 className="text-2xl font-bold">{stats.thisMonth}</h3>

            <p className="text-gray-600">This Month</p>

          </div>

          <div className="stat-card">

            <FiTrendingUp className="text-3xl text-purple-600 mb-3" />

            <h3 className="text-2xl font-bold">
              ₹{stats.totalValue.toFixed(2)}
            </h3>

            <p className="text-gray-600">Total Value</p>

          </div>

        </div>


        {/* RECENT BOOKS */}

        <div className="card mb-8">

          <div className="flex justify-between mb-6">

            <h2 className="text-2xl font-bold">Recently Added Books</h2>

            <Link to="/view-books" className="text-blue-600">
              View All →
            </Link>

          </div>

          {recentBooks.length > 0 ? (

            recentBooks.map((book) => (

              <div
                key={book._id}
                className="flex justify-between p-4 bg-gray-50 rounded-lg mb-3"
              >

                <div>

                  <h3 className="font-semibold">{book.BookTitle}</h3>

                  <p className="text-gray-600">
                    by {book.BookAuthor}
                  </p>

                </div>

                <div>

                  {book.PublishDate
                    ? new Date(book.PublishDate).toLocaleDateString()
                    : "N/A"}

                </div>

              </div>

            ))

          ) : (

            <div className="text-center py-8">

              <p>No books added yet</p>

              <Link to="/add-book" className="btn-primary mt-4 inline-flex">

                <FiPlusCircle />

                Add First Book

              </Link>

            </div>

          )}

        </div>

      </div>

    </div>

  );

};

export default Dashboard;