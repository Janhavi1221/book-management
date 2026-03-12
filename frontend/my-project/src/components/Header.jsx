import { Link } from 'react-router-dom';
import { FiBook, FiHome, FiPlusCircle, FiList, FiGrid, FiSearch, FiTag, FiHeart, FiFilter, FiUser, FiMessageSquare } from 'react-icons/fi';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <FiBook className="text-3xl" />
          <span>BookShelf</span>
        </Link>
        
        <nav className="nav-links">
          <Link to="/">
            <FiHome />
            <span>Home</span>
          </Link>
          <Link to="/add-book">
            <FiPlusCircle />
            <span>Add Book</span>
          </Link>
          <Link to="/view-books">
            <FiList />
            <span>View Books</span>
          </Link>
          <Link to="/gallery">
            <FiGrid />
            <span>Gallery</span>
          </Link>
          <Link to="/search">
            <FiSearch />
            <span>Search</span>
          </Link>
          <Link to="/categories">
            <FiTag />
            <span>Categories</span>
          </Link>
          <Link to="/authors">
            <FiUser />
            <span>Authors</span>
          </Link>
          <Link to="/favorites">
            <FiHeart />
            <span>Favorites</span>
          </Link>
          <Link to="/reviews">
            <FiMessageSquare />
            <span>Reviews</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
