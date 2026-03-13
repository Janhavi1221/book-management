import { Link } from 'react-router-dom';
import { FiBook, FiHome, FiPlusCircle, FiList, FiSearch, FiTag, FiHeart } from 'react-icons/fi';

const Header = () => {
  return (
    <header className="nav-creative">
      <div className="creative-container py-3">
        <Link to="/" className="logo">
          <FiBook className="text-2xl text-purple-600 mr-2" />
          <span className="text-xl font-bold text-purple-600">BookShelf</span>
        </Link>
        
        <nav className="nav-links">
          <Link to="/">
            <FiHome className="text-sm" />
            <span className="text-sm">Home</span>
          </Link>
          <Link to="/add-book">
            <FiPlusCircle className="text-sm" />
            <span className="text-sm">Add</span>
          </Link>
          <Link to="/view-books">
            <FiList className="text-sm" />
            <span className="text-sm">Books</span>
          </Link>
          <Link to="/search">
            <FiSearch className="text-sm" />
            <span className="text-sm">Search</span>
          </Link>
          <Link to="/categories">
            <FiTag className="text-sm" />
            <span className="text-sm">Categories</span>
          </Link>
          <Link to="/favorites">
            <FiHeart className="text-sm" />
            <span className="text-sm">Favorites</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
